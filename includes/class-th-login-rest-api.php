<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once plugin_dir_path( __FILE__ ) . 'helpers/class-sanitaization-validation.php';

class TH_Login_REST_API {

	private $sanitizer;

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		$this->sanitizer = new TH_Sanitization_Validation();
	}

	private function safe_json_option( $option_key, $default = array() ) {
		$value = get_option( $option_key );
		if ( ! is_string( $value ) || empty( $value ) ) {
			$value = '{}';
		}
		$decoded = json_decode( $value, true );
		return is_array( $decoded ) ? $decoded : $default;
	}

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
				'args'                => array(),
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
				'args'                => array(),
			)
		);

		// Route for handling frontend forgot password.
		register_rest_route(
			$namespace,
			'/forgot-password',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'handle_frontend_forgot_password' ),
				'permission_callback' => '__return_true',
				'args'                => array(), // Let handler manage required logic_key-based validation
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

		//Route for gettings categoy id tags slugs of wordpress defgaults
		register_rest_route( 'th-login/v1', '/content-suggestions', array(
			'methods'  => 'GET',
			'callback' => array( $this, 'get_content_suggestions' ),
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		//Route for gettings roles 
		register_rest_route('th-login/v1', '/roles', [
			'methods'  => 'GET',
			'callback' => function () {
				global $wp_roles;
				if (!isset($wp_roles)) {
					$wp_roles = new WP_Roles();
				}

				$roles = $wp_roles->roles;
				$output = [];

				foreach ($roles as $key => $details) {
					$output[] = [
						'label' => translate_user_role($details['name']),
						'value' => $key,
					];
				}

				return rest_ensure_response($output);
			},
			'permission_callback' => '__return_true',
		]);

	}

	public function get_content_suggestions( $request ) {
		$pages = get_pages( array( 'post_status' => 'publish' ) );
		$posts = get_posts( array( 'post_type' => 'post', 'post_status' => 'publish', 'numberposts' => -1 ) );

		$categories = get_categories( array( 'hide_empty' => false ) );
		$tags = get_tags( array( 'hide_empty' => false ) );

		return rest_ensure_response( array(
			'pages' => array_map( function( $p ) {
				return array(
					'id'   => $p->ID,
					'slug' => $p->post_name,
					'title' => $p->post_title,
				);
			}, $pages ),
			'posts' => array_map( function( $p ) {
				return array(
					'id'   => $p->ID,
					'slug' => $p->post_name,
					'title' => $p->post_title,
				);
			}, $posts ),
			'categories' => array_map( function( $c ) {
				return array(
					'id'   => $c->term_id,
					'slug' => $c->slug,
					'name' => $c->name,
				);
			}, $categories ),
			'tags' => array_map( function( $t ) {
				return array(
					'id'   => $t->term_id,
					'slug' => $t->slug,
					'name' => $t->name,
				);
			}, $tags ),
		) );
	}

	public function check_admin_permissions( WP_REST_Request $request ) {
		return current_user_can( 'manage_options' );
	}

	public function check_registration_allowed( WP_REST_Request $request ) {
		return get_option( 'users_can_register' );
	}

	public function save_settings( WP_REST_Request $request ) {
		$general_settings_data          = $request->get_param( 'general' );
		$design_settings_data           = $request->get_param( 'design' );
		$form_fields_settings_data      = $request->get_param( 'form_fields' );
		$display_triggers_settings_data = $request->get_param( 'display_triggers' );
		$security_settings_data         = $request->get_param( 'security' );

		// 1. Save General Settings
		if ( null !== $general_settings_data ) {
			$sanitized_general   = $this->sanitize_general_settings( $general_settings_data );
			$validation_general  = $this->validate_general_settings( $sanitized_general );

			if ( is_wp_error( $validation_general ) ) {
				return new WP_REST_Response(
					array( 'success' => false, 'message' => $validation_general->get_error_message() ),
					400
				);
			}

			update_option( 'th_login_general_settings', json_encode( $sanitized_general ) );

			// 🔁 Sync with WordPress default registration setting
			update_option( 'users_can_register', $sanitized_general['allow_user_registration'] ? 1 : 0 );
		}

		// 2. Save Design Settings
		if ( null !== $design_settings_data ) {
			$sanitized_design  = $this->sanitize_design_settings( $design_settings_data );
			$validation_design = $this->validate_design_settings( $sanitized_design );

			if ( is_wp_error( $validation_design ) ) {
				return new WP_REST_Response(
					array( 'success' => false, 'message' => $validation_design->get_error_message() ),
					400
				);
			}

			update_option( 'th_login_design_settings', json_encode( $sanitized_design ) );
		}

		// 3. Save Form Fields
		if ( null !== $form_fields_settings_data ) {
			$cleaned = [];

			foreach ( $form_fields_settings_data as $form_type => $fields_or_meta ) {
				$cleaned[ $form_type ] = [];

				foreach ( $fields_or_meta as $key => $value ) {
					if ( is_numeric( $key ) && is_array( $value ) && isset( $value['id'] ) ) {
						$cleaned[ $form_type ][] = $value;
					}
				}
			}

			$sanitized_form_fields  = $this->sanitize_form_fields_settings( $cleaned );
			$validation_form_fields = $this->validate_form_fields_settings( $sanitized_form_fields );

			if ( is_wp_error( $validation_form_fields ) ) {
				return new WP_REST_Response(
					array(
						'success' => false,
						'message' => $validation_form_fields->get_error_message(),
					),
					400
				);
			}

			update_option( 'th_login_form_fields_settings', json_encode( $sanitized_form_fields ) );
		}

		// 4. Save Display Triggers
		if ( null !== $display_triggers_settings_data ) {
			$sanitized_display_triggers  = $this->sanitize_display_triggers_settings( $display_triggers_settings_data );
			$validation_display_triggers = $this->validate_display_triggers_settings( $sanitized_display_triggers );

			if ( is_wp_error( $validation_display_triggers ) ) {
				return new WP_REST_Response(
					array( 'success' => false, 'message' => $validation_display_triggers->get_error_message() ),
					400
				);
			}

			update_option( 'th_login_display_triggers_settings', json_encode( $sanitized_display_triggers ) );
		}

		// 5. Save Security Settings
		if ( null !== $security_settings_data ) {
			$sanitized_security  = $this->sanitize_security_settings( $security_settings_data );
			$validation_security = $this->validate_security_settings( $sanitized_security );

			if ( is_wp_error( $validation_security ) ) {
				return new WP_REST_Response(
					array( 'success' => false, 'message' => $validation_security->get_error_message() ),
					400
				);
			}

			update_option( 'th_login_security_settings', json_encode( $sanitized_security ) );
		}

		// ✅ Final updated settings response
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

	public function handle_frontend_login( WP_REST_Request $request ) {
		$params = $request->get_params();

		// Load saved login fields
		$form_fields_settings = get_option( 'th_login_form_fields_settings', '{}' );
		$form_fields = json_decode( $form_fields_settings, true )['login'] ?? [];

		// Initialize variables
		$user_login = '';
		$user_password = '';
		$remember = ! empty( $params['rememberme'] );

		// Extract user login and password by name, no logic_key
		foreach ( $form_fields as $field ) {
			if ( ! empty( $field['hidden'] ) ) {
				continue;
			}

			$name = $field['name'] ?? '';
			$type = $field['type'] ?? '';

			if ( stripos( $name, 'user' ) !== false || stripos( $name, 'email' ) !== false ) {
				$user_login = sanitize_text_field( $params[ $name ] ?? '' );
			} elseif ( stripos( $name, 'pass' ) !== false ) {
				$user_password = $params[ $name ] ?? '';
			}
		}

		if ( empty( $user_login ) || empty( $user_password ) ) {
			// Get field-specific error messages if available
			$username_field = array_filter( $form_fields, fn( $f ) => stripos( $f['name'], 'user' ) !== false || stripos( $f['name'], 'email' ) !== false );
			$password_field = array_filter( $form_fields, fn( $f ) => stripos( $f['name'], 'pass' ) !== false );

			$username_field = reset( $username_field );
			$password_field = reset( $password_field );

			$error_message = '';
			if ( empty( $user_login ) && ! empty( $username_field['error_message'] ) ) {
				$error_message .= $username_field['error_message'] . ' ';
			}
			if ( empty( $user_password ) && ! empty( $password_field['error_message'] ) ) {
				$error_message .= $password_field['error_message'];
			}

			if ( empty( trim( $error_message ) ) ) {
				$error_message = __( 'Username and password are required.', 'th-login' );
			}

			return new WP_REST_Response( [
				'success' => false,
				'data'    => [ 'message' => trim( $error_message ) ],
			], 400 );
		}

		$creds = [
			'user_login'    => $user_login,
			'user_password' => $user_password,
			'remember'      => $remember,
		];

		$user = wp_signon( $creds, false );

		if ( is_wp_error( $user ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data'    => [ 'message' => $user->get_error_message() ],
			], 401 );
		}

		$user_id = $user->ID;

		// Custom field validation
		foreach ( $form_fields as $field ) {
			if ( ! empty( $field['hidden'] ) || empty( $field['show'] ) ) {
				continue;
			}

			$name     = $field['name'] ?? '';
			$label    = $field['label'] ?? ucfirst( $name );
			$value    = sanitize_text_field( $params[ $name ] ?? '' );
			$existing = get_user_meta( $user_id, $name, true );
			$error    = $field['error_message'] ?? sprintf( __( '%s is required.', 'th-login' ), $label );

			if ( ! empty( $field['required'] ) && $value === '' ) {
				return new WP_REST_Response( [
					'success' => false,
					'data'    => [ 'message' => $error ],
				], 400 );
			}

			if ( $existing && $value && $existing !== $value ) {
				return new WP_REST_Response( [
					'success' => false,
					'data'    => [ 'message' => sprintf( __( 'Invalid value for %s.', 'th-login' ), $label ) ],
				], 403 );
			}

			if ( empty( $existing ) && ! empty( $value ) ) {
				update_user_meta( $user_id, $name, $value );
			}
		}

		// Redirect logic
		$general_settings   = $this->safe_json_option( 'th_login_general_settings' );
		$redirect_settings  = $general_settings['redirects']['after_login'] ?? [ 'type' => 'current_page' ];
		$redirect_url       = '';

		if ( 'dashboard' === $redirect_settings['type'] ) {
			$redirect_url = admin_url();
		} elseif ( 'home_page' === $redirect_settings['type'] ) {
			$redirect_url = home_url();
		} elseif ( 'custom_url' === $redirect_settings['type'] && ! empty( $redirect_settings['url'] ) ) {
			$redirect_url = esc_url_raw( $redirect_settings['url'] );
		} else {
			$redirect_url = $request->get_header( 'referer' ) ? esc_url_raw( $request->get_header( 'referer' ) ) : home_url();
		}

		// Role-based redirect override
		$role_redirects = $general_settings['redirects']['role_based_redirects'] ?? [];
		if ( ! empty( $role_redirects ) && is_array( $user->roles ) ) {
			foreach ( $role_redirects as $rule ) {
				if ( in_array( $rule['role'], $user->roles, true ) && ! empty( $rule['url'] ) ) {
					$redirect_url = esc_url_raw( $rule['url'] );
					break;
				}
			}
		}

		return new WP_REST_Response( [
			'success' => true,
			'data'    => [
				'message'      => __( 'Login successful!', 'th-login' ),
				'redirect_url' => $redirect_url,
			],
		], 200 );
	}

	public function handle_frontend_register( WP_REST_Request $request ) {
		$form_fields       = $this->safe_json_option( 'th_login_form_fields_settings' );
		$register_fields   = $form_fields['register'] ?? [];
		$general_settings  = $this->safe_json_option( 'th_login_general_settings' );
		$security_settings = $this->safe_json_option( 'th_login_security_settings' );

		$username         = '';
		$email            = '';
		$password         = '';
		$confirm_password = '';

		foreach ( $register_fields as $field ) {
			$field_id   = $field['id'] ?? '';
			$field_name = $field['name'] ?? $field_id;
			$value      = sanitize_text_field( $request->get_param( $field_name ) );

			switch ( $field_id ) {
				case 'username':
					$username = sanitize_user( $value );
					break;
				case 'email':
					$email = sanitize_email( $value );
					break;
				case 'password':
					$password = $value;
					break;
				case 'confirm_password':
					$confirm_password = $value;
					break;
			}
		}

		// Validate core fields using field error messages
		foreach ( [ 'username', 'email', 'password', 'confirm_password' ] as $field_id ) {
			$field = array_filter( $register_fields, fn( $f ) => $f['id'] === $field_id );
			$field = reset( $field );
			$name  = $field['name'] ?? $field_id;
			$value = sanitize_text_field( $request->get_param( $name ) );

			if ( empty( $value ) ) {
				$error = $field['error_message'] ?? sprintf( __( '%s is required.', 'th-login' ), ucfirst( str_replace('_', ' ', $field_id) ) );
				return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => $error ] ], 400 );
			}
		}

		if ( ! is_email( $email ) ) {
			return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => __( 'Invalid email address.', 'th-login' ) ] ], 400 );
		}
		if ( username_exists( $username ) ) {
			return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => __( 'This username is already taken.', 'th-login' ) ] ], 409 );
		}
		if ( email_exists( $email ) ) {
			return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => __( 'This email is already registered.', 'th-login' ) ] ], 409 );
		}
		if ( $password !== $confirm_password ) {
			$field = array_filter( $register_fields, fn( $f ) => $f['id'] === 'confirm_password' );
			$field = reset( $field );
			$msg   = $field['error_message'] ?? __( 'Passwords do not match.', 'th-login' );
			return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => $msg ] ], 400 );
		}

		// Password strength validation
		$password_settings = null;
		foreach ( $register_fields as $field ) {
			if ( $field['id'] === 'password' ) {
				$password_settings = $field;
				break;
			}
		}

		if ( ! empty( $password_settings ) ) {
			$min   = intval( $password_settings['minInput'] ?? 6 );
			$max   = intval( $password_settings['maxInput'] ?? 0 );
			$check = $password_settings['check'] ?? [];

			if ( $min && strlen( $password ) < $min ) {
				return new WP_REST_Response( [
					'success' => false,
					'data'    => [ 'message' => sprintf( __( 'Password must be at least %d characters.', 'th-login' ), $min ) ]
				], 400 );
			}
			if ( $max && strlen( $password ) > $max ) {
				return new WP_REST_Response( [
					'success' => false,
					'data'    => [ 'message' => sprintf( __( 'Password must not exceed %d characters.', 'th-login' ), $max ) ]
				], 400 );
			}
			if ( ! empty( $check['text'] ) && ! preg_match( '/[A-Za-z]/', $password ) ) {
				return new WP_REST_Response( [
					'success' => false,
					'data'    => [ 'message' => __( 'Password must contain at least one letter.', 'th-login' ) ]
				], 400 );
			}
			if ( ! empty( $check['number'] ) && ! preg_match( '/\d/', $password ) ) {
				return new WP_REST_Response( [
					'success' => false,
					'data'    => [ 'message' => __( 'Password must contain at least one number.', 'th-login' ) ]
				], 400 );
			}
			if ( ! empty( $check['special_charcter'] ) && ! preg_match( '/[\W_]/', $password ) ) {
				return new WP_REST_Response( [
					'success' => false,
					'data'    => [ 'message' => __( 'Password must contain at least one special character.', 'th-login' ) ]
				], 400 );
			}
		}

		// Terms check
		foreach ( $register_fields as $field ) {
			if ( $field['id'] === 'terms_and_conditions' && ( $field['required'] ?? false ) ) {
				$checked = $request->get_param( $field['name'] ?? $field['id'] );
				if ( ! $checked ) {
					return new WP_REST_Response( [
						'success' => false,
						'data'    => [ 'message' => $field['error_message'] ?? __( 'You must agree to the Terms & Conditions.', 'th-login' ) ]
					], 400 );
				}
				break;
			}
		}

		// Honeypot detection
		if ( $security_settings['honeypot_enabled'] ?? true ) {
			foreach ( $request->get_params() as $key => $val ) {
				if ( strpos( $key, 'th_login_hp_' ) === 0 && ! empty( $val ) ) {
					return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => __( 'Spam detected.', 'th-login' ) ] ], 403 );
				}
			}
		}

		// Create user
		$user_data = [
			'user_login' => $username,
			'user_pass'  => $password,
			'user_email' => $email,
		];

		$role = sanitize_text_field( $request->get_param( 'role' ) );
		if ( ! function_exists( 'get_editable_roles' ) ) {
			require_once ABSPATH . 'wp-admin/includes/user.php';
		}
		$default_role    = $general_settings['default_register_role'] ?? 'subscriber';
		$editable_roles  = array_keys( get_editable_roles() );
		$user_data['role'] = ( $role && in_array( $role, $editable_roles, true ) ) ? $role : $default_role;

		// Custom fields
		foreach ( $register_fields as $field ) {
			$field_id   = $field['id'] ?? '';
			$field_name = $field['name'] ?? $field_id;
			$value      = sanitize_text_field( $request->get_param( $field_name ) );

			if ( in_array( $field_id, [ 'username', 'email', 'password', 'confirm_password', 'terms_and_conditions', 'honeypot' ], true ) ) {
				continue;
			}

			if ( ( $field['required'] ?? false ) && empty( $value ) ) {
				$msg = $field['error_message'] ?? sprintf( __( '%s is required.', 'th-login' ), $field['label'] ?? ucfirst( $field_name ) );
				return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => $msg ] ], 400 );
			}

			if ( ! empty( $value ) ) {
				$user_data['meta_input'][ $field_id ] = $value;
			}
		}

		$user_id = wp_insert_user( $user_data );
		if ( is_wp_error( $user_id ) ) {
			return new WP_REST_Response( [ 'success' => false, 'data' => [ 'message' => $user_id->get_error_message() ] ], 400 );
		}

		// Email verification
		if ( $general_settings['email_verification']['enabled'] ?? false ) {
			$key = md5( microtime() . $user_id );
			update_user_meta( $user_id, 'th_login_email_verification_key', $key );
			update_user_meta( $user_id, 'th_login_email_verified', false );

			$link    = add_query_arg( [ 'th_login_verify_email' => $key, 'user_id' => $user_id ], home_url() );
			$subject = $general_settings['email_verification']['email_subject'] ?? __( 'Verify your email', 'th-login' );
			$content = str_replace( '{verification_link}', esc_url( $link ), $general_settings['email_verification']['email_content'] ?? 'Click to verify: {verification_link}' );

			wp_mail( $email, $subject, $content );

			return new WP_REST_Response( [ 'success' => true, 'data' => [ 'message' => __( 'Registration successful! Please verify your email.', 'th-login' ) ] ], 200 );
		}

		// Manual approval
		if ( $general_settings['manual_user_approval']['enabled'] ?? false ) {
			update_user_meta( $user_id, 'th_login_pending_approval', true );
			return new WP_REST_Response( [ 'success' => true, 'data' => [ 'message' => __( 'Registration successful! Awaiting admin approval.', 'th-login' ) ] ], 200 );
		}

		// Auto-login
		if ( $general_settings['auto_login_after_registration'] ?? false ) {
			wp_set_current_user( $user_id );
			wp_set_auth_cookie( $user_id, true );

			$url = home_url();
			$redirect = $general_settings['redirects']['after_register']['type'] ?? 'login_form';
			if ( $redirect === 'dashboard' ) {
				$url = admin_url();
			} elseif ( $redirect === 'custom_url' && ! empty( $general_settings['redirects']['after_register']['url'] ) ) {
				$url = esc_url_raw( $general_settings['redirects']['after_register']['url'] );
			}

			// Role-based redirect
			$user = get_user_by( 'id', $user_id );
			foreach ( $general_settings['redirects']['role_based_redirects'] ?? [] as $rule ) {
				if ( in_array( $rule['role'], $user->roles, true ) && ! empty( $rule['url'] ) ) {
					$url = esc_url_raw( $rule['url'] );
					break;
				}
			}

			return new WP_REST_Response( [ 'success' => true, 'data' => [ 'message' => __( 'Registration successful! You are now logged in.', 'th-login' ), 'redirect_url' => $url ] ], 200 );
		}

		// Default
		return new WP_REST_Response( [ 'success' => true, 'data' => [ 'message' => __( 'Registration successful! Please log in.', 'th-login' ), 'redirect_url' => home_url( '/?th_login_action=login' ) ] ], 200 );
	}

	public function handle_frontend_forgot_password( WP_REST_Request $request ) {
		$params = $request->get_params();

		// Load forgot password fields
		$form_fields_settings = json_decode( get_option( 'th_login_form_fields_settings', '{}' ), true );
		$forgot_fields        = $form_fields_settings['forgot_password'] ?? [];

		$user_login = '';
		$field_error_message = '';

		foreach ( $forgot_fields as $field ) {
			if ( ! empty( $field['hidden'] ) ) {
				continue;
			}

			$field_name = $field['name'] ?? '';
			if (
				stripos( $field_name, 'email' ) !== false ||
				stripos( $field_name, 'user' ) !== false
			) {
				$user_login = sanitize_text_field( $params[ $field_name ] ?? '' );
				$field_error_message = $field['error_message'] ?? '';
				break;
			}
		}

		// If no input provided
		if ( empty( $user_login ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data'    => [
					'message' => $field_error_message ?: __( 'Please enter your username or email address.', 'th-login' ),
				],
			], 400 );
		}

		// Try to get user
		if ( is_email( $user_login ) ) {
			$user = get_user_by( 'email', $user_login );
		} else {
			$user = get_user_by( 'login', $user_login );
		}

		if ( ! $user ) {
			return new WP_REST_Response( [
				'success' => false,
				'data'    => [
					'message' => __( 'Invalid username or email address.', 'th-login' ),
				],
			], 404 );
		}

		// Generate reset key
		$key = get_password_reset_key( $user );
		if ( is_wp_error( $key ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data'    => [
					'message' => $key->get_error_message(),
				],
			], 500 );
		}

		// Create password reset link
		$reset_link = network_site_url(
			'wp-login.php?action=rp&key=' . $key . '&login=' . rawurlencode( $user->user_login ),
			'login'
		);

		// Email content
		$message = sprintf(
			esc_html__(
				'Someone has requested a password reset for the following account: %1$s. If this was a mistake, just ignore this email. To reset your password, visit the following address: %2$s',
				'th-login'
			),
			$user->user_login,
			$reset_link
		);

		$title = sprintf(
			esc_html__( '[%s] Password Reset', 'th-login' ),
			wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES )
		);

		$headers = [ 'Content-Type: text/html; charset=UTF-8' ];

		// Send email
		if ( ! wp_mail( $user->user_email, $title, $message, $headers ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data'    => [
					'message' => __( 'The email could not be sent. Possible reason: your host may have disabled the mail function.', 'th-login' ),
				],
			], 500 );
		}

		return new WP_REST_Response( [
			'success' => true,
			'data'    => [
				'message' => __( 'A password reset link has been sent to your email address.', 'th-login' ),
			],
		], 200 );
	}

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

	public function sanitize_general_settings( $settings ) {
		return $this->sanitizer->sanitize_general_settings( $settings );
	}

	public function validate_general_settings( $settings ) {
		return $this->sanitizer->validate_general_settings( $settings );
	}

	// Repeat for other categories:
	public function sanitize_design_settings( $settings ) {
		return $this->sanitizer->sanitize_design_settings( $settings );
	}

	public function validate_design_settings( $settings ) {
		return $this->sanitizer->validate_design_settings( $settings );
	}

	public function sanitize_form_fields_settings( $settings ) {
		return $this->sanitizer->sanitize_form_fields_settings( $settings );
	}

	public function validate_form_fields_settings( $settings ) {
		return $this->sanitizer->validate_form_fields_settings( $settings );
	}

	public function sanitize_display_triggers_settings( $settings ) {
		return $this->sanitizer->sanitize_display_triggers_settings( $settings );
	}

	public function validate_display_triggers_settings( $settings ) {
		return $this->sanitizer->validate_display_triggers_settings( $settings );
	}

	public function sanitize_security_settings( $settings ) {
		return $this->sanitizer->sanitize_security_settings( $settings );
	}

	public function validate_security_settings( $settings ) {
		return $this->sanitizer->validate_security_settings( $settings );
	}
}
