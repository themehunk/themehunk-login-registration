<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers and handles custom REST API endpoints for TH Login plugin.
 */
class TH_Login_REST_API {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
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
	 * Register custom REST API routes.
	 */
	public function register_routes() {
		$namespace = 'th-login/v1';

		// Route for saving all plugin settings from the admin panel.
		register_rest_route(
			$namespace,
			'/settings',
			array(
				'methods'             => WP_REST_Server::CREATABLE, // POST request.
				'callback'            => array( $this, 'save_settings' ),
				'permission_callback' => array( $this, 'check_admin_permissions' ),
				'args'                => array(
					'general' => array(
						'type'              => 'object',
						'sanitize_callback' => array( $this, 'sanitize_general_settings' ),
						'validate_callback' => array( $this, 'validate_general_settings' ),
						'required'          => false, // Allow partial updates if needed, but we send full object from React.
					),
					'design' => array(
						'type'              => 'object',
						'sanitize_callback' => array( $this, 'sanitize_design_settings' ),
						'validate_callback' => array( $this, 'validate_design_settings' ),
						'required'          => false,
					),
					'form_fields' => array(
						'type'              => 'object',
						'sanitize_callback' => array( $this, 'sanitize_form_fields_settings' ),
						'validate_callback' => array( $this, 'validate_form_fields_settings' ),
						'required'          => false,
					),
					'display_triggers' => array(
						'type'              => 'object',
						'sanitize_callback' => array( $this, 'sanitize_display_triggers_settings' ),
						'validate_callback' => array( $this, 'validate_display_triggers_settings' ),
						'required'          => false,
					),
					'security' => array(
						'type'              => 'object',
						'sanitize_callback' => array( $this, 'sanitize_security_settings' ),
						'validate_callback' => array( $this, 'validate_security_settings' ),
						'required'          => false,
					),
				),
			)
		);

		// Route for handling frontend login.
		register_rest_route(
			$namespace,
			'/login',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'handle_frontend_login' ),
				'permission_callback' => '__return_true', // Public endpoint for logged out users.
				'args'                => array(
					'username' => array( 'required' => true, 'sanitize_callback' => 'sanitize_user' ),
					'password' => array( 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ),
					'rememberme' => array( 'type' => 'boolean', 'default' => false ),
				),
			)
		);

		// Route for handling frontend registration.
		register_rest_route(
			$namespace,
			'/register',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'handle_frontend_register' ),
				'permission_callback' => array( $this, 'check_registration_allowed' ), // <-- **इसे वापस बदलें**
				'args'                => array(
					'username' => array( 'required' => true, 'sanitize_callback' => 'sanitize_user' ),
					'email'    => array( 'required' => true, 'sanitize_callback' => 'sanitize_email' ),
					'password' => array( 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ),
					'confirm_password' => array( 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ),
					'terms'    => array( 'type' => 'boolean', 'default' => false ),
					// Custom fields will be handled dynamically in the callback.
				),
			)
		);

		// Route for handling frontend forgot password.
		register_rest_route(
			$namespace,
			'/forgot-password',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'handle_frontend_forgot_password' ),
				'permission_callback' => '__return_true', // Public endpoint.
				'args'                => array(
					'user_login' => array( 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ),
				),
			)
		);

		// Route for exporting all plugin settings.
		register_rest_route(
			$namespace,
			'/export-settings',
			array(
				'methods'             => WP_REST_Server::READABLE, // GET request.
				'callback'            => array( $this, 'export_settings' ),
				'permission_callback' => array( $this, 'check_admin_permissions' ),
			)
		);

		// Route for resetting all plugin settings.
		register_rest_route(
			$namespace,
			'/reset-settings',
			array(
				'methods'             => WP_REST_Server::CREATABLE, // POST request.
				'callback'            => array( $this, 'reset_settings' ),
				'permission_callback' => array( $this, 'check_admin_permissions' ),
			)
		);
	}

	/**
	 * Permission callback for admin settings.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return bool True if the user has permissions, otherwise false.
	 */
	public function check_admin_permissions( WP_REST_Request $request ) {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Permission callback to check if registration is allowed.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return bool True if registration is allowed, otherwise false.
	 */
	public function check_registration_allowed( WP_REST_Request $request ) {
		return get_option( 'users_can_register' );
	}

	/**
	 * Save all plugin settings from the admin panel.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response Response object.
	 */
	public function save_settings( WP_REST_Request $request ) {
		$general_settings_data = $request->get_param( 'general' );
		$design_settings_data = $request->get_param( 'design' );
		$form_fields_settings_data = $request->get_param( 'form_fields' );
		$display_triggers_settings_data = $request->get_param( 'display_triggers' );
		$security_settings_data = $request->get_param( 'security' );

		// Update options.
		// Use sanitize/validate callbacks for each category.
		if ( null !== $general_settings_data ) {
			$sanitized_general = $this->sanitize_general_settings( $general_settings_data );
			$validation_general = $this->validate_general_settings( $sanitized_general );
			if ( is_wp_error( $validation_general ) ) {
				return new WP_REST_Response( array( 'success' => false, 'message' => $validation_general->get_error_message() ), 400 );
			}
			update_option( 'th_login_general_settings', json_encode( $sanitized_general ) );
		}

		if ( null !== $design_settings_data ) {
			$sanitized_design = $this->sanitize_design_settings( $design_settings_data );
			$validation_design = $this->validate_design_settings( $sanitized_design );
			if ( is_wp_error( $validation_design ) ) {
				return new WP_REST_Response( array( 'success' => false, 'message' => $validation_design->get_error_message() ), 400 );
			}
			update_option( 'th_login_design_settings', json_encode( $sanitized_design ) );
		}

		if ( null !== $form_fields_settings_data ) {
			$sanitized_form_fields = $this->sanitize_form_fields_settings( $form_fields_settings_data );
			$validation_form_fields = $this->validate_form_fields_settings( $sanitized_form_fields );
			if ( is_wp_error( $validation_form_fields ) ) {
				return new WP_REST_Response( array( 'success' => false, 'message' => $validation_form_fields->get_error_message() ), 400 );
			}
			update_option( 'th_login_form_fields_settings', json_encode( $sanitized_form_fields ) );
		}

		if ( null !== $display_triggers_settings_data ) {
			$sanitized_display_triggers = $this->sanitize_display_triggers_settings( $display_triggers_settings_data );
			$validation_display_triggers = $this->validate_display_triggers_settings( $sanitized_display_triggers );
			if ( is_wp_error( $validation_display_triggers ) ) {
				return new WP_REST_Response( array( 'success' => false, 'message' => $validation_display_triggers->get_error_message() ), 400 );
			}
			update_option( 'th_login_display_triggers_settings', json_encode( $sanitized_display_triggers ) );
		}

		if ( null !== $security_settings_data ) {
			$sanitized_security = $this->sanitize_security_settings( $security_settings_data );
			$validation_security = $this->validate_security_settings( $sanitized_security );
			if ( is_wp_error( $validation_security ) ) {
				return new WP_REST_Response( array( 'success' => false, 'message' => $validation_security->get_error_message() ), 400 );
			}
			update_option( 'th_login_security_settings', json_encode( $sanitized_security ) );
		}

		// Return updated settings to React app.
		$updated_settings = array(
			'general'          => $this->safe_json_option( 'th_login_general_settings' ),
			'design'           => $this->safe_json_option( 'th_login_design_settings' ),
			'form_fields'      => $this->safe_json_option( 'th_login_form_fields_settings' ),
			'display_triggers' => $this->safe_json_option( 'th_login_display_triggers_settings' ),
			'security'         => $this->safe_json_option( 'th_login_security_settings' ),
		);

		return new WP_REST_Response(
			array(
				'success'  => true,
				'message'  => esc_html__( 'Settings saved successfully!', 'th-login' ),
				'settings' => $updated_settings,
			),
			200
		);
	}

	/**
	 * Handle frontend login requests.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response Response object.
	 */
	public function handle_frontend_login( WP_REST_Request $request ) {
		$creds = array(
			'user_login'    => $request->get_param( 'username' ),
			'user_password' => $request->get_param( 'password' ),
			'remember'      => $request->get_param( 'rememberme' ),
		);

		$user = wp_signon( $creds, false );

		if ( is_wp_error( $user ) ) {
			return new WP_REST_Response(
				array(
					'success' => false,
					'data'    => array(
						'message' => $user->get_error_message(),
					),
				),
				401 // Unauthorized.
			);
		}

		// Get redirection URL.
		$general_settings = $this->safe_json_option( 'th_login_general_settings' );
		$redirect_settings = $general_settings['redirects']['after_login'] ?? array( 'type' => 'current_page' );
		$redirect_url = '';

		if ( 'dashboard' === $redirect_settings['type'] ) {
			$redirect_url = admin_url();
		} elseif ( 'home_page' === $redirect_settings['type'] ) {
			$redirect_url = home_url();
		} elseif ( 'custom_url' === $redirect_settings['type'] && ! empty( $redirect_settings['url'] ) ) {
			$redirect_url = esc_url_raw( $redirect_settings['url'] );
		} else { // 'current_page' or fallback.
			$redirect_url = $request->get_header( 'referer' ) ? esc_url_raw( $request->get_header( 'referer' ) ) : home_url();
		}

		// Apply role-based redirection if enabled.
		$role_based_redirects = $general_settings['redirects']['role_based_redirects'] ?? array();
		if ( ! empty( $role_based_redirects ) && is_array( $user->roles ) ) {
			foreach ( $role_based_redirects as $rule ) {
				if ( in_array( $rule['role'], $user->roles, true ) && ! empty( $rule['url'] ) ) {
					$redirect_url = esc_url_raw( $rule['url'] );
					break; // Found a matching role, use this redirect.
				}
			}
		}


		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => array(
					'message'      => esc_html__( 'Login successful!', 'th-login' ),
					'redirect_url' => $redirect_url,
				),
			),
			200
		);
	}

	/**
	 * Handle frontend registration requests.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response Response object.
	 */
	public function handle_frontend_register( WP_REST_Request $request ) {
		$username         = sanitize_user( $request->get_param( 'username' ) );
		$email            = sanitize_email( $request->get_param( 'email' ) );
		$password         = $request->get_param( 'password' );
		$confirm_password = $request->get_param( 'confirm_password' );
		$terms_accepted   = (bool) $request->get_param( 'terms' );

		// Basic validation.
		if ( empty( $username ) || empty( $email ) || empty( $password ) || empty( $confirm_password ) ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'All fields are required.', 'th-login' ) ) ), 400 );
		}
		if ( ! is_email( $email ) ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'Please enter a valid email address.', 'th-login' ) ) ), 400 );
		}
		if ( username_exists( $username ) ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'This username is already registered.', 'th-login' ) ) ), 409 ); // Conflict.
		}
		if ( email_exists( $email ) ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'This email is already registered.', 'th-login' ) ) ), 409 );
		}
		if ( $password !== $confirm_password ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'Passwords do not match.', 'th-login' ) ) ), 400 );
		}

		// Check terms & conditions if enabled.
		$form_fields_settings = $this->safe_json_option( 'th_login_form_fields_settings' );
		$terms_enabled = $form_fields_settings['register']['terms_and_conditions']['enabled'] ?? false;
		$terms_required = $form_fields_settings['register']['terms_and_conditions']['required'] ?? false;

		if ( $terms_enabled && $terms_required && ! $terms_accepted ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'You must accept the Terms & Conditions.', 'th-login' ) ) ), 400 );
		}

		// Honeypot check.
		$security_settings = $this->safe_json_option( 'th_login_security_settings' );
		$honeypot_enabled = $security_settings['honeypot_enabled'] ?? true; // Default to true if not set.

		if ( $honeypot_enabled ) {
			// Iterate through all request parameters to find the honeypot field.
			// The honeypot field name is dynamic (e.g., th_login_hp_1234).
			$honeypot_value = '';
			foreach ( $request->get_params() as $key => $value ) {
				if ( strpos( $key, 'th_login_hp_' ) === 0 ) {
					$honeypot_value = $value;
					break;
				}
			}

			if ( ! empty( $honeypot_value ) ) {
				// Honeypot field was filled, likely a bot.
				return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'Spam detected.', 'th-login' ) ) ), 403 ); // Forbidden.
			}
		}

		// Create the user.
		$user_data = array(
			'user_login' => $username,
			'user_pass'  => $password,
			'user_email' => $email,
		);

		// Handle custom registration fields.
		$custom_fields = $form_fields_settings['register']['custom_fields'] ?? array();
		foreach ( $custom_fields as $field ) {
			$field_id = $field['id'] ?? '';
			$map_to_user_meta = $field['map_to_user_meta'] ?? false;
			$is_required = $field['required'] ?? false;
			$field_value = $request->get_param( $field_id );

			if ( $is_required && empty( $field_value ) ) {
				return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => sprintf( esc_html__( '%s is required.', 'th-login' ), $field['label'] ?? $field_id ) ) ), 400 );
			}

			if ( $map_to_user_meta && ! empty( $field_id ) ) {
				$user_data['meta_input'][ $field_id ] = sanitize_text_field( $field_value );
			}
		}

		$user_id = wp_insert_user( $user_data );

		if ( is_wp_error( $user_id ) ) {
			return new WP_REST_Response(
				array(
					'success' => false,
					'data'    => array(
						'message' => $user_id->get_error_message(),
					),
				),
				400
			);
		}

		// Handle email verification.
		$general_settings = $this->safe_json_option( 'th_login_general_settings' );
		$email_verification_enabled = $general_settings['email_verification']['enabled'] ?? false;

		if ( $email_verification_enabled ) {
			// Generate verification key.
			$verification_key = md5( microtime() . $user_id );
			update_user_meta( $user_id, 'th_login_email_verification_key', $verification_key );
			update_user_meta( $user_id, 'th_login_email_verified', false );

			// Send verification email.
			$verification_link = add_query_arg(
				array(
					'th_login_verify_email' => $verification_key,
					'user_id'               => $user_id,
				),
				home_url()
			);

			$email_subject = $general_settings['email_verification']['email_subject'] ?? esc_html__( 'Verify your email for TH Login', 'th-login' );
			$email_content = $general_settings['email_verification']['email_content'] ?? esc_html__( 'Please click this link to verify: {verification_link}', 'th-login' );
			$email_content = str_replace( '{verification_link}', esc_url( $verification_link ), $email_content );

			wp_mail( $email, $email_subject, $email_content );

			return new WP_REST_Response(
				array(
					'success' => true,
					'data'    => array(
						'message' => esc_html__( 'Registration successful! Please check your email to verify your account.', 'th-login' ),
					),
				),
				200
			);
		}

		// Handle manual user approval.
		$manual_user_approval_enabled = $general_settings['manual_user_approval']['enabled'] ?? false;
		if ( $manual_user_approval_enabled ) {
			// Set user status to pending approval.
			update_user_meta( $user_id, 'th_login_pending_approval', true );
			return new WP_REST_Response(
				array(
					'success' => true,
					'data'    => array(
						'message' => esc_html__( 'Registration successful! Your account is awaiting administrator approval.', 'th-login' ),
					),
				),
				200
			);
		}

		// Auto-login after registration if enabled and no verification/approval needed.
		$auto_login_after_registration = $general_settings['auto_login_after_registration'] ?? false;
		if ( $auto_login_after_registration && ! $email_verification_enabled && ! $manual_user_approval_enabled ) {
			wp_set_current_user( $user_id );
			wp_set_auth_cookie( $user_id, true );

			// Get redirection URL after auto-login.
			$redirect_settings = $general_settings['redirects']['after_register'] ?? array( 'type' => 'login_form' );
			$redirect_url = '';

			if ( 'dashboard' === $redirect_settings['type'] ) {
				$redirect_url = admin_url();
			} elseif ( 'home_page' === $redirect_settings['type'] ) {
				$redirect_url = home_url();
			} elseif ( 'custom_url' === $redirect_settings['type'] && ! empty( $redirect_settings['url'] ) ) {
				$redirect_url = esc_url_raw( $redirect_settings['url'] );
			} else { // Default to home or current page after auto-login.
				$redirect_url = home_url();
			}

			// Apply role-based redirection if enabled.
			$user_obj = get_user_by( 'id', $user_id );
			$role_based_redirects = $general_settings['redirects']['role_based_redirects'] ?? array();
			if ( ! empty( $role_based_redirects ) && is_array( $user_obj->roles ) ) {
				foreach ( $role_based_redirects as $rule ) {
					if ( in_array( $rule['role'], $user_obj->roles, true ) && ! empty( $rule['url'] ) ) {
						$redirect_url = esc_url_raw( $rule['url'] );
						break;
					}
				}
			}

			return new WP_REST_Response(
				array(
					'success' => true,
					'data'    => array(
						'message'      => esc_html__( 'Registration successful! You are now logged in.', 'th-login' ),
						'redirect_url' => $redirect_url,
					),
				),
				200
			);
		}

		// Default success message if no auto-login, verification, or approval.
		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => array(
					'message' => esc_html__( 'Registration successful!', 'th-login' ),
				),
			),
			200
		);
	}

	/**
	 * Handle frontend forgot password requests.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response Response object.
	 */
	public function handle_frontend_forgot_password( WP_REST_Request $request ) {
		$user_login = $request->get_param( 'user_login' );

		if ( empty( $user_login ) ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'Please enter your username or email address.', 'th-login' ) ) ), 400 );
		}

		if ( is_email( $user_login ) ) {
			$user = get_user_by( 'email', $user_login );
		} else {
			$user = get_user_by( 'login', $user_login );
		}

		if ( ! $user ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'Invalid username or email address.', 'th-login' ) ) ), 404 );
		}

		// Generate password reset key and send email.
		$key = get_password_reset_key( $user );
		if ( is_wp_error( $key ) ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => $key->get_error_message() ) ), 500 );
		}

		$reset_link = network_site_url( "wp-login.php?action=rp&key=$key&login=" . rawurlencode( $user->user_login ), 'login' );

		$message = sprintf( esc_html__( 'Someone has requested a password reset for the following account: %1$s. If this was a mistake, just ignore this email. To reset your password, visit the following address: %2$s', 'th-login' ), $user->user_login, $reset_link );
		$title   = sprintf( esc_html__( '[%s] Password Reset', 'th-login' ), wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES ) );

		$headers = array( 'Content-Type: text/html; charset=UTF-8' );

		if ( ! wp_mail( $user->user_email, $title, $message, $headers ) ) {
			return new WP_REST_Response( array( 'success' => false, 'data' => array( 'message' => esc_html__( 'The email could not be sent. Possible reason: your host may have disabled the mail function.', 'th-login' ) ) ), 500 );
		}

		return new WP_REST_Response(
			array(
				'success' => true,
				'data'    => array(
					'message' => esc_html__( 'A password reset link has been sent to your email address.', 'th-login' ),
				),
			),
			200
		);
	}

	/**
	 * Export all TH Login plugin settings.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response Response object.
	 */
	public function export_settings( WP_REST_Request $request ) {
		$all_settings = array(
			'general'          => $this->safe_json_option( 'th_login_general_settings' ),
			'design'           => $this->safe_json_option( 'th_login_design_settings' ),
			'form_fields'      => $this->safe_json_option( 'th_login_form_fields_settings' ),
			'display_triggers' => $this->safe_json_option( 'th_login_display_triggers_settings' ),
			'security'         => $this->safe_json_option( 'th_login_security_settings' ),
		);

		return new WP_REST_Response( $all_settings, 200 );
	}

	/**
	 * Reset all TH Login plugin settings to default.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response Response object.
	 */
	public function reset_settings( WP_REST_Request $request ) {
		// Get default settings from the main plugin file's activation hook.
		// We need to call the activation logic without actually deactivating/reactivating.
		// This requires accessing the default settings directly or re-running the setup.
		// For simplicity, we'll re-run the default option setup.
		require_once TH_LOGIN_PATH . 'th-login.php'; // Ensure the file with th_login_activate is loaded.

		// Call the function that sets default options.
		// Assuming th_login_activate contains the logic to add/update default options.
		// If it's not a standalone function, you might need to refactor it.
		// Let's assume a helper function `th_login_set_default_options()` exists or create one.
		if ( function_exists( 'th_login_set_default_options' ) ) {
			th_login_set_default_options();
			return new WP_REST_Response(
				array(
					'success' => true,
					'message' => esc_html__( 'All settings have been reset to default.', 'th-login' ),
				),
				200
			);
		} else {
			return new WP_REST_Response(
				array(
					'success' => false,
					'message' => esc_html__( 'Reset function not found. Please deactivate and reactivate the plugin to reset.', 'th-login' ),
				),
				500
			);
		}
	}


	/**
	 * Sanitize callbacks for settings data.
	 */
	public function sanitize_general_settings( $settings ) {
		$sanitized = array();
		$sanitized['plugin_status']             = sanitize_text_field( $settings['plugin_status'] ?? 'enabled' );
		$sanitized['disable_wp_login_page']     = rest_sanitize_boolean( $settings['disable_wp_login_page'] ?? false );
		$sanitized['auto_redirect_wp_login_admin'] = rest_sanitize_boolean( $settings['auto_redirect_wp_login_admin'] ?? false );
		$sanitized['auto_login_after_registration'] = rest_sanitize_boolean( $settings['auto_login_after_registration'] ?? false );

		// Sanitize redirects.
		$sanitized['redirects'] = array();
		$sanitized['redirects']['after_login']['type'] = sanitize_text_field( $settings['redirects']['after_login']['type'] ?? 'current_page' );
		$sanitized['redirects']['after_login']['url']  = esc_url_raw( $settings['redirects']['after_login']['url'] ?? '' );
		$sanitized['redirects']['after_logout']['type'] = sanitize_text_field( $settings['redirects']['after_logout']['type'] ?? 'home_page' );
		$sanitized['redirects']['after_logout']['url'] = esc_url_raw( $settings['redirects']['after_logout']['url'] ?? '' );
		$sanitized['redirects']['after_register']['type'] = sanitize_text_field( $settings['redirects']['after_register']['type'] ?? 'login_form' );
		$sanitized['redirects']['after_register']['url'] = esc_url_raw( $settings['redirects']['after_register']['url'] ?? '' );

		$sanitized['redirects']['role_based_redirects'] = array();
		if ( isset( $settings['redirects']['role_based_redirects'] ) && is_array( $settings['redirects']['role_based_redirects'] ) ) {
			foreach ( $settings['redirects']['role_based_redirects'] as $rule ) {
				$sanitized['redirects']['role_based_redirects'][] = array(
					'role' => sanitize_text_field( $rule['role'] ?? '' ),
					'url'  => esc_url_raw( $rule['url'] ?? '' ),
				);
			}
		}

		// Sanitize email verification.
		$sanitized['email_verification']['enabled'] = rest_sanitize_boolean( $settings['email_verification']['enabled'] ?? false );
		$sanitized['email_verification']['email_subject'] = sanitize_text_field( $settings['email_verification']['email_subject'] ?? '' );
		$sanitized['email_verification']['email_content'] = wp_kses_post( $settings['email_verification']['email_content'] ?? '' ); // Allow basic HTML.
		$sanitized['email_verification']['redirect_after_verification'] = sanitize_text_field( $settings['email_verification']['redirect_after_verification'] ?? 'login_form' );
		$sanitized['email_verification']['custom_redirect_url'] = esc_url_raw( $settings['email_verification']['custom_redirect_url'] ?? '' );


		// Sanitize manual user approval.
		$sanitized['manual_user_approval']['enabled'] = rest_sanitize_boolean( $settings['manual_user_approval']['enabled'] ?? false );

		return $sanitized;
	}

	public function validate_general_settings( $settings ) {
		$errors = new WP_Error();

		if ( ! in_array( $settings['plugin_status'], array( 'enabled', 'disabled' ), true ) ) {
			$errors->add( 'invalid_plugin_status', esc_html__( 'Invalid plugin status.', 'th-login' ) );
		}

		// Add more specific validations as needed.

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_design_settings( $settings ) {
		$sanitized = array();

		//$sanitized['design_template'] = sanitize_text_field( $settings['design_template'] ?? 'default' );

		$sanitized['modal']['layout_type'] = sanitize_text_field( $settings['modal']['layout_type'] ?? 'popup' );

		// Sanitize modal background
		$modal_bg = $settings['modal']['modal_background'] ?? array();

		$sanitized['modal']['modal_background'] = array(
			'type'    => sanitize_text_field( $modal_bg['type'] ?? 'color' ),
			'color'   => sanitize_hex_color( $modal_bg['color'] ?? '#ffffff' ),
			'gradient'=> sanitize_text_field( $modal_bg['gradient'] ?? '' ),
			'opacity'  => floatval( $modal_bg['opacity'] ?? 1 ),
			'image'   => array(
				'url'      => esc_url_raw( $modal_bg['image']['url'] ?? '' ),
				'position' => sanitize_text_field( $modal_bg['image']['position'] ?? 'center center' ),
				'size'     => sanitize_text_field( $modal_bg['image']['size'] ?? 'cover' ),
				'repeat'   => sanitize_text_field( $modal_bg['image']['repeat'] ?? 'no-repeat' ),
			),
		);

		// Sanitize form background
		$form_bg = $settings['modal']['form_background'] ?? array();

		$sanitized['modal']['form_background'] = array(
			'type'    => sanitize_text_field( $form_bg['type'] ?? 'color' ),
			'color'   => sanitize_hex_color( $form_bg['color'] ?? '#ffffff' ),
			'gradient'=> sanitize_text_field( $form_bg['gradient'] ?? '' ),
			'opacity'  => floatval( $form_bg['opacity'] ?? 1 ),
			'image'   => array(
				'url'      => esc_url_raw( $form_bg['image']['url'] ?? '' ),
				'position' => sanitize_text_field( $form_bg['image']['position'] ?? 'center center' ),
				'size'     => sanitize_text_field( $form_bg['image']['size'] ?? 'cover' ),
				'repeat'   => sanitize_text_field( $form_bg['image']['repeat'] ?? 'no-repeat' ),
			),
		);

		return $sanitized;
	}

	public function validate_design_settings( $settings ) {
		$errors = new WP_Error();

		// Example validation: Check if overlay_type is valid.
		$valid_overlay_types = array( 'color', 'gradient', 'image' );
		if ( ! in_array( $settings['modal']['overlay_type'] ?? 'color', $valid_overlay_types, true ) ) {
			$errors->add( 'invalid_overlay_type', esc_html__( 'Invalid modal overlay type.', 'th-login' ) );
		}

		// Add more specific validations for colors, dimensions, etc.
		// E.g., check if '12px' or '50%' format is valid for dimensions.

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_form_fields_settings( $settings ) {
		$sanitized = array();

		// Login fields.
		$sanitized['login']['username_label'] = sanitize_text_field( $settings['login']['username_label'] ?? '' );
		$sanitized['login']['username_placeholder'] = sanitize_text_field( $settings['login']['username_placeholder'] ?? '' );
		$sanitized['login']['password_label'] = sanitize_text_field( $settings['login']['password_label'] ?? '' );
		$sanitized['login']['password_placeholder'] = sanitize_text_field( $settings['login']['password_placeholder'] ?? '' );
		$sanitized['login']['remember_me_label'] = sanitize_text_field( $settings['login']['remember_me_label'] ?? '' );
		$sanitized['login']['show_remember_me'] = rest_sanitize_boolean( $settings['login']['show_remember_me'] ?? true );

		// Register fields.
		$sanitized['register']['username_label'] = sanitize_text_field( $settings['register']['username_label'] ?? '' );
		$sanitized['register']['username_placeholder'] = sanitize_text_field( $settings['register']['username_placeholder'] ?? '' );
		$sanitized['register']['email_label'] = sanitize_text_field( $settings['register']['email_label'] ?? '' );
		$sanitized['register']['email_placeholder'] = sanitize_text_field( $settings['register']['email_placeholder'] ?? '' );
		$sanitized['register']['password_label'] = sanitize_text_field( $settings['register']['password_label'] ?? '' );
		$sanitized['register']['password_placeholder'] = sanitize_text_field( $settings['register']['password_placeholder'] ?? '' );
		$sanitized['register']['confirm_password_label'] = sanitize_text_field( $settings['register']['confirm_password_label'] ?? '' );
		$sanitized['register']['confirm_password_placeholder'] = sanitize_text_field( $settings['register']['confirm_password_placeholder'] ?? '' );
		$sanitized['register']['show_first_name'] = rest_sanitize_boolean( $settings['register']['show_first_name'] ?? false );
		$sanitized['register']['first_name_label'] = sanitize_text_field( $settings['register']['first_name_label'] ?? '' );
		$sanitized['register']['first_name_placeholder'] = sanitize_text_field( $settings['register']['first_name_placeholder'] ?? '' );
		$sanitized['register']['show_last_name'] = rest_sanitize_boolean( $settings['register']['show_last_name'] ?? false );
		$sanitized['register']['last_name_label'] = sanitize_text_field( $settings['register']['last_name_label'] ?? '' );
		$sanitized['register']['last_name_placeholder'] = sanitize_text_field( $settings['register']['last_name_placeholder'] ?? '' );

		// Terms and conditions.
		$sanitized['register']['terms_and_conditions']['enabled'] = rest_sanitize_boolean( $settings['register']['terms_and_conditions']['enabled'] ?? false );
		$sanitized['register']['terms_and_conditions']['label'] = wp_kses_post( $settings['register']['terms_and_conditions']['label'] ?? '' );
		$sanitized['register']['terms_and_conditions']['required'] = rest_sanitize_boolean( $settings['register']['terms_and_conditions']['required'] ?? false );

		$sanitized['register']['honeypot_enabled'] = rest_sanitize_boolean( $settings['register']['honeypot_enabled'] ?? true );

		// Custom fields (complex, requires careful sanitization).
		$sanitized['register']['custom_fields'] = array();
		if ( isset( $settings['register']['custom_fields'] ) && is_array( $settings['register']['custom_fields'] ) ) {
			foreach ( $settings['register']['custom_fields'] as $field ) {
				$sanitized_field = array();
				$sanitized_field['id'] = sanitize_key( $field['id'] ?? '' ); // Use sanitize_key for field IDs.
				$sanitized_field['type'] = sanitize_text_field( $field['type'] ?? 'text' );
				$sanitized_field['label'] = sanitize_text_field( $field['label'] ?? '' );
				$sanitized_field['placeholder'] = sanitize_text_field( $field['placeholder'] ?? '' );
				$sanitized_field['required'] = rest_sanitize_boolean( $field['required'] ?? false );
				$sanitized_field['map_to_user_meta'] = rest_sanitize_boolean( $field['map_to_user_meta'] ?? false );

				// Sanitize options for select/radio.
				$sanitized_field['options'] = array();
				if ( isset( $field['options'] ) && is_array( $field['options'] ) ) {
					$sanitized_field['options'] = array_map( 'sanitize_text_field', $field['options'] );
				}
				$sanitized['register']['custom_fields'][] = $sanitized_field;
			}
		}

		// Forgot password fields.
		$sanitized['forgot_password']['email_label'] = sanitize_text_field( $settings['forgot_password']['email_label'] ?? '' );
		$sanitized['forgot_password']['email_placeholder'] = sanitize_text_field( $settings['forgot_password']['email_placeholder'] ?? '' );

		return $sanitized;
	}

	public function validate_form_fields_settings( $settings ) {
		$errors = new WP_Error();

		// Example validation: Ensure required fields have labels.
		if ( empty( $settings['login']['username_label'] ?? '' ) ) {
			$errors->add( 'missing_username_label', esc_html__( 'Login username label cannot be empty.', 'th-login' ) );
		}

		// Add more specific validations for custom fields (e.g., unique IDs).

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_display_triggers_settings( $settings ) {
		$sanitized = array();

		$sanitized['trigger_css_class'] = sanitize_html_class( $settings['trigger_css_class'] ?? 'th-login-trigger' );

		// Auto open on load.
		$sanitized['auto_open_on_load']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_load']['enabled'] ?? true );
		$sanitized['auto_open_on_load']['delay_seconds'] = absint( $settings['auto_open_on_load']['delay_seconds'] ?? 2 );

		// Auto open on scroll.
		$sanitized['auto_open_on_scroll']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_scroll']['enabled'] ?? false );
		$sanitized['auto_open_on_scroll']['scroll_percentage'] = absint( $settings['auto_open_on_scroll']['scroll_percentage'] ?? 50 );

		// Auto open on exit intent.
		$sanitized['auto_open_on_exit_intent']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_exit_intent']['enabled'] ?? false );

		// Auto open on time on page.
		$sanitized['auto_open_on_time_on_page']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_time_on_page']['enabled'] ?? false );
		$sanitized['auto_open_on_time_on_page']['time_seconds'] = absint( $settings['auto_open_on_time_on_page']['time_seconds'] ?? 10 );

		// Auto open conditions.
		$sanitized['auto_open_conditions']['for_logged_out_only'] = rest_sanitize_boolean( $settings['auto_open_conditions']['for_logged_out_only'] ?? true );
		$sanitized['auto_open_conditions']['for_specific_roles'] = array_map( 'sanitize_text_field', $settings['auto_open_conditions']['for_specific_roles'] ?? array() );

		$sanitized['auto_open_conditions']['on_specific_pages']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_specific_pages']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['on_specific_pages']['page_ids'] = array_map( 'absint', $settings['auto_open_conditions']['on_specific_pages']['page_ids'] ?? array() );
		$sanitized['auto_open_conditions']['on_specific_pages']['page_slugs'] = array_map( 'sanitize_title', $settings['auto_open_conditions']['on_specific_pages']['page_slugs'] ?? array() );

		$sanitized['auto_open_conditions']['on_specific_categories']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_specific_categories']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['on_specific_categories']['category_ids'] = array_map( 'absint', $settings['auto_open_conditions']['on_specific_categories']['category_ids'] ?? array() );
		$sanitized['auto_open_conditions']['on_specific_categories']['category_slugs'] = array_map( 'sanitize_title', $settings['auto_open_conditions']['on_specific_categories']['category_slugs'] ?? array() );

		$sanitized['auto_open_conditions']['on_specific_tags']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_specific_tags']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['on_specific_tags']['tag_ids'] = array_map( 'absint', $settings['auto_open_conditions']['on_specific_tags']['tag_ids'] ?? array() );
		$sanitized['auto_open_conditions']['on_specific_tags']['tag_slugs'] = array_map( 'sanitize_title', $settings['auto_open_conditions']['on_specific_tags']['tag_slugs'] ?? array() );

		$sanitized['auto_open_conditions']['on_woocommerce_myaccount'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_woocommerce_myaccount'] ?? false );
		$sanitized['auto_open_conditions']['on_woocommerce_checkout'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_woocommerce_checkout'] ?? false );

		$sanitized['auto_open_conditions']['device_visibility']['desktop'] = rest_sanitize_boolean( $settings['auto_open_conditions']['device_visibility']['desktop'] ?? true );
		$sanitized['auto_open_conditions']['device_visibility']['tablet'] = rest_sanitize_boolean( $settings['auto_open_conditions']['device_visibility']['tablet'] ?? true );
		$sanitized['auto_open_conditions']['device_visibility']['mobile'] = rest_sanitize_boolean( $settings['auto_open_conditions']['device_visibility']['mobile'] ?? true );

		$sanitized['auto_open_conditions']['url_parameter_trigger']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['url_parameter_trigger']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['url_parameter_trigger']['param_name'] = sanitize_key( $settings['auto_open_conditions']['url_parameter_trigger']['param_name'] ?? 'th_login' );
		$sanitized['auto_open_conditions']['url_parameter_trigger']['param_value'] = sanitize_text_field( $settings['auto_open_conditions']['url_parameter_trigger']['param_value'] ?? 'open' );

		$sanitized['auto_open_conditions']['referrer_detection']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['referrer_detection']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['referrer_detection']['referrer_urls'] = array_map( 'esc_url_raw', $settings['auto_open_conditions']['referrer_detection']['referrer_urls'] ?? array() );

		// Pop up frequency.
		$sanitized['pop_up_frequency']['enabled'] = rest_sanitize_boolean( $settings['pop_up_frequency']['enabled'] ?? false );
		$sanitized['pop_up_frequency']['type'] = sanitize_text_field( $settings['pop_up_frequency']['type'] ?? 'session' );
		$sanitized['pop_up_frequency']['days'] = absint( $settings['pop_up_frequency']['days'] ?? 7 );

		// Menu integration.
		$sanitized['menu_integration']['enabled'] = rest_sanitize_boolean( $settings['menu_integration']['enabled'] ?? false );
		$sanitized['menu_integration']['menu_slug'] = sanitize_text_field( $settings['menu_integration']['menu_slug'] ?? 'primary' );
		$sanitized['menu_integration']['item_text_login'] = sanitize_text_field( $settings['menu_integration']['item_text_login'] ?? 'Login' );
		$sanitized['menu_integration']['item_text_register'] = sanitize_text_field( $settings['menu_integration']['item_text_register'] ?? 'Register' );
		$sanitized['menu_integration']['item_icon_login'] = sanitize_text_field( $settings['menu_integration']['item_icon_login'] ?? 'dashicons-admin-users' );
		$sanitized['menu_integration']['item_icon_register'] = sanitize_text_field( $settings['menu_integration']['item_icon_register'] ?? 'dashicons-plus-alt' );
		$sanitized['menu_integration']['visibility_login_logged_in'] = rest_sanitize_boolean( $settings['menu_integration']['visibility_login_logged_in'] ?? false );
		$sanitized['menu_integration']['visibility_register_logged_in'] = rest_sanitize_boolean( $settings['menu_integration']['visibility_register_logged_in'] ?? false );

		return $sanitized;
	}

	public function validate_display_triggers_settings( $settings ) {
		$errors = new WP_Error();

		// Example validation: delay_seconds must be positive.
		if ( ( $settings['auto_open_on_load']['enabled'] ?? false ) && ( $settings['auto_open_on_load']['delay_seconds'] ?? 0 ) < 0 ) {
			$errors->add( 'invalid_delay_seconds', esc_html__( 'Delay seconds must be a non-negative number.', 'th-login' ) );
		}

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_security_settings( $settings ) {
		$sanitized = array();

		// Brute force protection.
		$sanitized['brute_force_protection']['enabled'] = rest_sanitize_boolean( $settings['brute_force_protection']['enabled'] ?? true );
		$sanitized['brute_force_protection']['max_attempts'] = absint( $settings['brute_force_protection']['max_attempts'] ?? 5 );
		$sanitized['brute_force_protection']['lockout_duration_minutes'] = absint( $settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 );
		$sanitized['brute_force_protection']['auto_ip_blacklist_enabled'] = rest_sanitize_boolean( $settings['brute_force_protection']['auto_ip_blacklist_enabled'] ?? true );

		// reCAPTCHA.
		$sanitized['recaptcha']['enabled'] = rest_sanitize_boolean( $settings['recaptcha']['enabled'] ?? false );
		$sanitized['recaptcha']['type'] = sanitize_text_field( $settings['recaptcha']['type'] ?? 'v2_checkbox' );
		$sanitized['recaptcha']['site_key'] = sanitize_text_field( $settings['recaptcha']['site_key'] ?? '' );
		$sanitized['recaptcha']['secret_key'] = sanitize_text_field( $settings['recaptcha']['secret_key'] ?? '' );

		$sanitized['honeypot_enabled'] = rest_sanitize_boolean( $settings['honeypot_enabled'] ?? true );

		return $sanitized;
	}

	public function validate_security_settings( $settings ) {
		$errors = new WP_Error();

		// Example validation: reCAPTCHA keys are required if enabled.
		if ( ( $settings['recaptcha']['enabled'] ?? false ) ) {
			if ( empty( $settings['recaptcha']['site_key'] ?? '' ) ) {
				$errors->add( 'missing_recaptcha_site_key', esc_html__( 'reCAPTCHA Site Key is required when reCAPTCHA is enabled.', 'th-login' ) );
			}
			if ( empty( $settings['recaptcha']['secret_key'] ?? '' ) ) {
				$errors->add( 'missing_recaptcha_secret_key', esc_html__( 'reCAPTCHA Secret Key is required when reCAPTCHA is enabled.', 'th-login' ) );
			}
		}

		return $errors->has_errors() ? $errors : true;
	}
}
