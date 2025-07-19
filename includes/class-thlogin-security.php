<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class THLogin_Security {
	const FAILED_ATTEMPTS_OPTION = 'th_login_failed_attempts';

	public function __construct() {
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

	private function safe_json_option( $key, $default = [] ) {
		$value = get_option( $key );
		$decoded = json_decode( is_string($value) ? $value : '{}', true );
		return is_array( $decoded ) ? $decoded : $default;
	}

	private function get_user_ip_address() {
		foreach ( [ 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR', 'HTTP_CLIENT_IP' ] as $key ) {
			if ( ! empty( $_SERVER[ $key ] ) ) {
				$ip = explode( ',', $_SERVER[ $key ] )[0];
				return sanitize_text_field( wp_unslash( trim( $ip ) ) );
			}
		}
		return 'unknown';
	}

	public function log_failed_login_attempt( $username ) {
		error_log( '[THLogin] Failed login: ' . $username );

		$settings = $this->safe_json_option( 'thlogin_security_settings' );
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
		error_log( '[THLogin] Failed attempts count: ' . count( $attempts ) );
	}

	public function check_brute_force_lockout( $user, $username, $password ) {
		if ( is_wp_error( $user ) || is_a( $user, 'WP_User' ) ) return $user;

		$settings = $this->safe_json_option( 'thlogin_security_settings' );
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
			error_log( "[THLogin] BLOCKED: $username for $remaining seconds" );
			return new WP_Error(
				'th_login_locked_out',
				sprintf(
					__( 'Too many failed login attempts. Please try again after %s minutes (%s seconds).', 'th-login' ),
					ceil( $remaining / 60 ),
					$remaining
				)
			);
		}

		return $user;
	}

	// 🔍 Debug URL: ?thlogin_debug=1
	public function debug_failed_attempts_viewer() {
		if ( isset( $_GET['thlogin_debug'] ) && current_user_can( 'manage_options' ) ) {
			echo '<pre style="background:#111;color:#0f0;padding:10px;">';
			echo "--- TH Login Brute Force Debug ---\n";
			print_r( get_transient( self::FAILED_ATTEMPTS_OPTION ) );
			echo '</pre>';
			exit;
		}
	}

	// 📡 REST API: /wp-json/thlogin/v1/lockout?username=admin
	public function get_lockout_status( $request ) {
		$username = sanitize_text_field( $request->get_param( 'username' ) );
		$ip = $this->get_user_ip_address();
		$settings = $this->safe_json_option( 'thlogin_security_settings' );
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
				'message'         => sprintf( __( 'You are blocked for %s more seconds.', 'th-login' ), $remaining )
			];
		}

		return [ 'locked_out' => false ];
	}
}
