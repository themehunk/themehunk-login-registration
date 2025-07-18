<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles security-related functionalities for TH Login, including:
 * - Brute force protection
 * - Email verification for new registrations
 * - Manual user approval for new registrations
 */
class THLogin_Security {

	/**
	 * Option key for storing failed login attempts.
	 *
	 * @var string
	 */
	const FAILED_ATTEMPTS_OPTION = 'th_login_failed_attempts';

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Brute Force Protection.
		add_action( 'wp_login_failed', array( $this, 'log_failed_login_attempt' ), 10, 1 );
		add_filter( 'authenticate', array( $this, 'check_brute_force_lockout' ), 20, 3 );

		// Email Verification.
		add_action( 'init', array( $this, 'handle_email_verification_request' ) );
		add_filter( 'wp_authenticate_user', array( $this, 'prevent_login_if_unverified' ), 99, 2 );

		// Manual User Approval.
		add_filter( 'wp_authenticate_user', array( $this, 'prevent_login_if_pending_approval' ), 99, 2 );
		add_action( 'user_register', array( $this, 'set_user_pending_approval_status' ), 10, 1 ); // Set initial status.
		add_action( 'profile_update', array( $this, 'update_user_approval_status' ), 10, 2 ); // Admin approval.
		add_action( 'show_user_profile', array( $this, 'add_user_approval_field' ) ); // Add field to user profile.
		add_action( 'edit_user_profile', array( $this, 'add_user_approval_field' ) ); // Add field to user profile.
	}

	/**
	 * Safely decode JSON option.
	 *
	 * @param string $option_key The option key to retrieve.
	 * @param array  $default    The default value if the option is not found or invalid.
	 * @return array Decoded JSON as an associative array, or default.
	 */
	private function safe_json_option( $option_key, $default = array() ) {
		$value = get_option( $option_key );
		if ( ! is_string( $value ) || empty( $value ) ) {
			$value = '{}';
		}
		$decoded = json_decode( $value, true );
		return is_array( $decoded ) ? $decoded : $default;
	}

	/**
	 * --- Brute Force Protection ---
	 */

	/**
	 * Logs failed login attempts.
	 *
	 * @param string $username The username that failed to log in.
	 */
	public function log_failed_login_attempt( $username ) {
		$security_settings = $this->safe_json_option( 'thlogin_security_settings' );
		$brute_force_enabled = $security_settings['brute_force_protection']['enabled'] ?? true;

		if ( ! $brute_force_enabled ) {
			return;
		}

		$ip_address = $this->get_user_ip_address();
		$failed_attempts = get_transient( self::FAILED_ATTEMPTS_OPTION );

		if ( ! is_array( $failed_attempts ) ) {
			$failed_attempts = array();
		}

		// Clean up old attempts (older than lockout duration).
		$lockout_duration_seconds = ( $security_settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 ) * MINUTE_IN_SECONDS;
		foreach ( $failed_attempts as $key => $attempt_data ) {
			if ( ( time() - $attempt_data['time'] ) > $lockout_duration_seconds ) {
				unset( $failed_attempts[ $key ] );
			}
		}

		$failed_attempts[] = array(
			'ip'       => $ip_address,
			'username' => $username,
			'time'     => time(),
		);

		set_transient( self::FAILED_ATTEMPTS_OPTION, $failed_attempts, $lockout_duration_seconds );
	}

	/**
	 * Checks if an IP or username is locked out due to too many failed attempts.
	 *
	 * @param WP_User|WP_Error|null $user     WP_User object if authentication successful.
	 * @param string                $username The username entered.
	 * @param string                $password The password entered.
	 * @return WP_User|WP_Error|null
	 */
	public function check_brute_force_lockout( $user, $username, $password ) {
		// If user is already authenticated or an error occurred, return early.
		if ( is_a( $user, 'WP_User' ) || is_wp_error( $user ) ) {
			return $user;
		}

		$security_settings = $this->safe_json_option( 'thlogin_security_settings' );
		$brute_force_enabled = $security_settings['brute_force_protection']['enabled'] ?? true;

		if ( ! $brute_force_enabled ) {
			return $user;
		}

		$ip_address = $this->get_user_ip_address();
		$max_attempts = $security_settings['brute_force_protection']['max_attempts'] ?? 5;
		$lockout_duration_seconds = ( $security_settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 ) * MINUTE_IN_SECONDS;
		$failed_attempts = get_transient( self::FAILED_ATTEMPTS_OPTION );

		if ( ! is_array( $failed_attempts ) ) {
			$failed_attempts = array();
		}

		$ip_attempts = 0;
		$username_attempts = 0;

		foreach ( $failed_attempts as $attempt_data ) {
			if ( ( time() - $attempt_data['time'] ) < $lockout_duration_seconds ) {
				if ( $attempt_data['ip'] === $ip_address ) {
					$ip_attempts++;
				}
				if ( $attempt_data['username'] === $username ) {
					$username_attempts++;
				}
			}
		}

		if ( $ip_attempts >= $max_attempts || $username_attempts >= $max_attempts ) {
			return new WP_Error(
				'th_login_locked_out',
				sprintf(
					/* translators: %s: duration in minutes */
					esc_html__( 'Too many failed login attempts. Please try again in %s minutes.', 'th-login' ),
					( $security_settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 )
				)
			);
		}

		return $user;
	}

	/**
	 * Gets the user's IP address.
	 *
	 * @return string
	 */
	private function get_user_ip_address() {
		$ip = '';

		if ( isset( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_CLIENT_IP'] ) );
		} elseif ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) );
		} elseif ( isset( $_SERVER['REMOTE_ADDR'] ) ) {
			$ip = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
		}

		return $ip;
	}


	/**
	 * --- Email Verification ---
	 */

	/**
	 * Handles the email verification request when a user clicks the verification link.
	 */
	public function handle_email_verification_request() {
		if ( ! isset( $_GET['th_login_verify_email'] ) || ! isset( $_GET['user_id'] ) ) {
			return;
		}

		$verification_key = sanitize_text_field( wp_unslash( $_GET['th_login_verify_email'] ) );
		$user_id = absint( wp_unslash( $_GET['user_id'] ) );

		$user = get_user_by( 'id', $user_id );

		if ( ! $user ) {
			wp_die( esc_html__( 'Invalid user ID.', 'th-login' ), esc_html__( 'Verification Error', 'th-login' ) );
		}

		$stored_key = get_user_meta( $user_id, 'th_login_email_verification_key', true );

		if ( empty( $stored_key ) || $stored_key !== $verification_key ) {
			wp_die( esc_html__( 'Invalid or expired verification link.', 'th-login' ), esc_html__( 'Verification Error', 'th-login' ) );
		}

		// Mark email as verified.
		update_user_meta( $user_id, 'th_login_email_verified', true );
		delete_user_meta( $user_id, 'th_login_email_verification_key' ); // Remove key after use.

		// Handle redirection after verification.
		$general_settings = $this->safe_json_option( 'thlogin_general_settings' );
		$redirect_type = $general_settings['email_verification']['redirect_after_verification'] ?? 'login_form';
		$redirect_url = home_url(); // Default fallback.

		if ( 'dashboard' === $redirect_type ) {
			$redirect_url = admin_url();
		} elseif ( 'home_page' === $redirect_type ) {
			$redirect_url = home_url();
		} elseif ( 'custom_url' === $redirect_type && ! empty( $general_settings['email_verification']['custom_redirect_url'] ) ) {
			$redirect_url = esc_url_raw( $general_settings['email_verification']['custom_redirect_url'] );
		} elseif ( 'login_form' === $redirect_type ) {
			// Redirect to a page with the login modal.
			// For now, we'll redirect to home page with a success message parameter.
			$redirect_url = add_query_arg( 'th_login_verified', 'true', home_url() );
		}

		// Auto-login if enabled and no manual approval needed.
		$manual_user_approval_enabled = $general_settings['manual_user_approval']['enabled'] ?? false;
		if ( ! $manual_user_approval_enabled ) {
			wp_set_current_user( $user_id );
			wp_set_auth_cookie( $user_id, true );
		}

		wp_safe_redirect( $redirect_url );
		exit;
	}

	/**
	 * Prevents login for users whose email is not verified.
	 *
	 * @param WP_User|WP_Error $user WP_User object or WP_Error.
	 * @param string           $password The password entered.
	 * @return WP_User|WP_Error
	 */
	public function prevent_login_if_unverified( $user, $password ) {
		if ( is_wp_error( $user ) || ! is_a( $user, 'WP_User' ) ) {
			return $user;
		}

		$general_settings = $this->safe_json_option( 'thlogin_general_settings' );
		$email_verification_enabled = $general_settings['email_verification']['enabled'] ?? false;

		if ( ! $email_verification_enabled ) {
			return $user; // Email verification is not enabled, allow login.
		}

		$is_verified = get_user_meta( $user->ID, 'th_login_email_verified', true );

		if ( ! $is_verified ) {
			return new WP_Error(
				'th_login_email_not_verified',
				esc_html__( 'Your email address has not been verified. Please check your inbox for a verification link.', 'th-login' )
			);
		}

		return $user;
	}

	/**
	 * --- Manual User Approval ---
	 */

	/**
	 * Sets a new user's status to pending approval if manual approval is enabled.
	 *
	 * @param int $user_id The ID of the newly registered user.
	 */
	public function set_user_pending_approval_status( $user_id ) {
		$general_settings = $this->safe_json_option( 'thlogin_general_settings' );
		$manual_user_approval_enabled = $general_settings['manual_user_approval']['enabled'] ?? false;

		if ( $manual_user_approval_enabled ) {
			update_user_meta( $user_id, 'th_login_pending_approval', true );
			// Optionally, notify admin.
		}
	}

	/**
	 * Prevents login for users whose account is pending approval.
	 *
	 * @param WP_User|WP_Error $user WP_User object or WP_Error.
	 * @param string           $password The password entered.
	 * @return WP_User|WP_Error
	 */
	public function prevent_login_if_pending_approval( $user, $password ) {
		if ( is_wp_error( $user ) || ! is_a( $user, 'WP_User' ) ) {
			return $user;
		}

		$general_settings = $this->safe_json_option( 'thlogin_general_settings' );
		$manual_user_approval_enabled = $general_settings['manual_user_approval']['enabled'] ?? false;

		if ( ! $manual_user_approval_enabled ) {
			return $user; // Manual approval is not enabled, allow login.
		}

		$is_pending_approval = get_user_meta( $user->ID, 'th_login_pending_approval', true );

		if ( $is_pending_approval ) {
			return new WP_Error(
				'th_login_account_pending_approval',
				esc_html__( 'Your account is pending administrator approval. Please wait for your account to be activated.', 'th-login' )
			);
		}

		return $user;
	}

	/**
	 * Adds a field to the user profile screen for manual approval.
	 *
	 * @param WP_User $user The user object.
	 */
	public function add_user_approval_field( $user ) {
		if ( ! current_user_can( 'edit_users' ) ) {
			return; // Only show for users who can edit other users.
		}

		$general_settings = $this->safe_json_option( 'thlogin_general_settings' );
		$manual_user_approval_enabled = $general_settings['manual_user_approval']['enabled'] ?? false;

		if ( ! $manual_user_approval_enabled ) {
			return; // Only show if manual approval is enabled.
		}

		$is_pending_approval = get_user_meta( $user->ID, 'th_login_pending_approval', true );
		?>
		<h3><?php esc_html_e( 'TH Login Account Status', 'th-login' ); ?></h3>
		<table class="form-table">
			<tr>
				<th><label for="th_login_pending_approval"><?php esc_html_e( 'Account Approval', 'th-login' ); ?></label></th>
				<td>
					<select name="th_login_pending_approval" id="th_login_pending_approval">
						<option value="1" <?php selected( $is_pending_approval, true ); ?>><?php esc_html_e( 'Pending Approval', 'th-login' ); ?></option>
						<option value="0" <?php selected( $is_pending_approval, false ); ?>><?php esc_html_e( 'Approved', 'th-login' ); ?></option>
					</select>
					<p class="description"><?php esc_html_e( 'Set the approval status for this user account.', 'th-login' ); ?></p>
				</td>
			</tr>
		</table>
		<?php
	}

	/**
	 * Updates the user approval status when the profile is updated.
	 *
	 * @param int     $user_id The ID of the user being updated.
	 * @param WP_User $old_user_data The old user data.
	 */
	public function update_user_approval_status( $user_id, $old_user_data ) {
		if ( ! current_user_can( 'edit_user', $user_id ) ) {
			return;
		}

		$general_settings = $this->safe_json_option( 'thlogin_general_settings' );
		$manual_user_approval_enabled = $general_settings['manual_user_approval']['enabled'] ?? false;

		if ( ! $manual_user_approval_enabled ) {
			return;
		}

		if (
			isset( $_POST['th_login_pending_approval'] ) &&
			isset( $_POST['_wpnonce'] ) &&
			wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ), 'update-user_' . $user_id )
		) {
			$new_status = ( '1' === sanitize_text_field( wp_unslash( $_POST['th_login_pending_approval'] ) ) );
			$was_pending = get_user_meta( $user_id, 'th_login_pending_approval', true );

			update_user_meta( $user_id, 'th_login_pending_approval', $new_status );

			if ( ! $new_status && $was_pending ) {
				$user = get_user_by( 'id', $user_id );
				if ( $user ) {
					$subject = esc_html__( 'Your account has been approved!', 'th-login' );
					$message = sprintf(
						esc_html__( 'Hello %1$s, your account on %2$s has been approved. You can now log in.', 'th-login' ),
						$user->user_login,
						get_bloginfo( 'name' )
					);
					wp_mail( $user->user_email, $subject, $message );
				}
			}
		}
	}

}
