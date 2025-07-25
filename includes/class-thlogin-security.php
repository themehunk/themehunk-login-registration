<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class THLogin_Security {
	const FAILED_ATTEMPTS_OPTION = 'thlogin_failed_attempts';

	public function __construct() {
		add_action( 'template_redirect', [ $this, 'maybe_verify_email' ] );
		add_action( 'wp_login_failed', [ $this, 'log_failed_login_attempt' ], 10, 1 );
		add_filter( 'authenticate', [ $this, 'check_brute_force_lockout' ], 20, 3 );
		add_action( 'init', [ $this, 'debug_failed_attempts_viewer' ] );

		// Optional: REST endpoint to expose lockout timer info
		add_action( 'rest_api_init', function () {
			register_rest_route( 'thlogin/v1', '/lockout', [
				'methods'  => 'GET',
				'callback' => [ $this, 'get_lockout_status' ],
				'permission_callback' => '__return_true'
			] );
		});
	}

	private function get_user_ip_address() {
		foreach ( [ 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR', 'HTTP_CLIENT_IP' ] as $key ) {
			$value = isset( $_SERVER[ $key ] ) ? sanitize_text_field( wp_unslash( $_SERVER[ $key ] ) ) : '';

			if ( ! empty( $value ) ) {
				$ip = explode( ',', $value )[0];
				return trim( $ip );
			}
		}
		return 'unknown';
	}

	public function log_failed_login_attempt( $username ) {

		$settings = get_option( 'thlogin_settings', [] )['security'] ?? [];

		if ( empty( $settings['brute_force_protection']['enabled'] ) ) return;

		$ip = $this->get_user_ip_address();
		$attempts = get_transient( self::FAILED_ATTEMPTS_OPTION ) ?: [];
		$duration = ( $settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 ) * MINUTE_IN_SECONDS;
		$time_now = time();

		$attempts = array_filter( $attempts, fn( $a ) => ( $time_now - $a['time'] ) < $duration );

		$attempts[] = [
			'ip'       => $ip,
			'username' => $username,
			'time'     => $time_now,
		];

		set_transient( self::FAILED_ATTEMPTS_OPTION, $attempts, $duration );
	}

	public function check_brute_force_lockout( $user, $username, $password ) {
		if ( is_wp_error( $user ) || is_a( $user, 'WP_User' ) ) return $user;

		$settings = get_option( 'thlogin_settings', [] )['security'] ?? [];

		if ( empty( $settings['brute_force_protection']['enabled'] ) ) return $user;

		$ip       = $this->get_user_ip_address();
		$max      = $settings['brute_force_protection']['max_attempts'] ?? 5;
		$duration = ( $settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 ) * MINUTE_IN_SECONDS;
		$attempts = get_transient( self::FAILED_ATTEMPTS_OPTION ) ?: [];
		$time_now = time();

		$ip_count = 0;
		$user_count = 0;
		$latest_time = 0;

		foreach ( $attempts as $a ) {
			if ( ( $time_now - $a['time'] ) < $duration ) {
				if ( $a['ip'] === $ip ) {
					$ip_count++;
					$latest_time = max( $latest_time, $a['time'] );
				}
				if ( $a['username'] === $username ) {
					$user_count++;
					$latest_time = max( $latest_time, $a['time'] );
				}
			}
		}

		if ( $ip_count >= $max || $user_count >= $max ) {
			$remaining = $duration - ( $time_now - $latest_time );
			return new WP_Error(
				'thlogin_locked_out',
				// translators: %1$s: Minutes remaining, %2$s: Seconds remaining
				sprintf(__( 'Too many failed login attempts. Please try again after %1$s minutes (%2$s seconds).', 'th-login' ),
					ceil( $remaining / 60 ),
					$remaining
				)

			);
		}

		return $user;
	}

	//  Debug URL: ?thlogin_debug=1
	public function debug_failed_attempts_viewer() {
		if ( isset( $_GET['thlogin_debug'] ) && current_user_can( 'manage_options' ) ) {
			echo '<pre style="background:#111;color:#0f0;padding:10px;">';
			echo "--- TH Login Brute Force Debug ---\n";
			print_r( get_transient( self::FAILED_ATTEMPTS_OPTION ) );
			echo '</pre>';
			exit;
		}
	}

	//  REST API: /wp-json/thlogin/v1/lockout?username=admin
	public function get_lockout_status( $request ) {
		$username = sanitize_text_field( $request->get_param( 'username' ) );
		$ip = $this->get_user_ip_address();
		$settings = get_option( 'thlogin_settings', [] )['security'] ?? [];

		$max = $settings['brute_force_protection']['max_attempts'] ?? 5;
		$duration = ( $settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 ) * MINUTE_IN_SECONDS;
		$attempts = get_transient( self::FAILED_ATTEMPTS_OPTION ) ?: [];
		$time_now = time();

		$ip_count = 0;
		$user_count = 0;
		$latest_time = 0;

		foreach ( $attempts as $a ) {
			if ( ( $time_now - $a['time'] ) < $duration ) {
				if ( $a['ip'] === $ip ) {
					$ip_count++;
					$latest_time = max( $latest_time, $a['time'] );
				}
				if ( $a['username'] === $username ) {
					$user_count++;
					$latest_time = max( $latest_time, $a['time'] );
				}
			}
		}

		if ( $ip_count >= $max || $user_count >= $max ) {
			$remaining = $duration - ( $time_now - $latest_time );
			return [
				'locked_out'      => true,
				'remaining_time'  => $remaining,
				'remaining_mins'  => ceil( $remaining / 60 ),
				// translators: %s: Field label like "Email" or "Username"
				'message'         => sprintf( __( 'You are blocked for %s more seconds.', 'th-login' ), $remaining )
			];
		}

		return [ 'locked_out' => false ];
	}

	public function verify_recaptcha( $token, $expected_action = 'login' ) {
		$settings = get_option( 'thlogin_settings', [] )['security'] ?? [];

		if ( empty( $settings['recaptcha']['enabled'] ) ) {
			return true;
		}

		if ( empty( $token ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data' => [ 'message' => __( 'Please complete the reCAPTCHA verification.', 'th-login' ) ],
			], 400 );
		}

		$response = wp_remote_post( 'https://www.google.com/recaptcha/api/siteverify', [
			'body' => [
				'secret'   => $settings['recaptcha']['secret_key'],
				'response' => $token,
				'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
			],
		] );

		if ( is_wp_error( $response ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data' => [ 'message' => __( 'reCAPTCHA verification failed. Please try again.', 'th-login' ) ],
			], 400 );
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( $settings['recaptcha']['type'] === 'v3' ) {
			$threshold = 0.5;
			if (
				empty( $body['success'] ) ||
				! isset( $body['score'] ) ||
				$body['score'] < $threshold ||
				empty( $body['action'] ) ||
				$body['action'] !== $expected_action
			) {
				return new WP_REST_Response( [
					'success' => false,
					'data' => [ 'message' => __( 'reCAPTCHA v3 verification failed or suspicious activity detected.', 'th-login' ) ],
				], 400 );
			}
		} elseif ( empty( $body['success'] ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data' => [ 'message' => __( 'reCAPTCHA verification failed.', 'th-login' ) ],
			], 400 );
		}

		return true;
	}

	public function maybe_verify_email() {
		if ( isset( $_GET['thlogin_verify_email'], $_GET['user_id'] ) ) {
			$user_id = absint( $_GET['user_id'] );
			$key     = sanitize_text_field( $_GET['thlogin_verify_email'] );

			$saved_key = get_user_meta( $user_id, 'thlogin_email_verification_key', true );

			if ( $saved_key && $saved_key === $key ) {
				update_user_meta( $user_id, 'thlogin_email_verified', true );
				delete_user_meta( $user_id, 'thlogin_email_verification_key' );

				// Redirect to success page or show a message
				wp_redirect( home_url( '/?thlogin_email_verified=success' ) );
				exit;
			}

			// Invalid or expired key
			wp_redirect( home_url( '/?thlogin_email_verified=failed' ) );
			exit;
		}
	}
}
