<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once plugin_dir_path( __FILE__ ) . 'helpers/class-sanitaization-validation.php';

class THLogin_REST_API {

	private $sanitizer;

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		$this->sanitizer = new TH_Sanitization_Validation();
	}

	public function register_routes() {
		$namespace = 'thlogin/v1';

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
						'required'          => false,
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
					'integration' => array(
						'type'              => 'object',
						'sanitize_callback' => array( $this, 'sanitize_integration_settings' ),
						'validate_callback' => array( $this, 'validate_integration_settings' ),
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
		register_rest_route( 
			$namespace, 
			'/content-suggestions', 
			array(
			'methods'  => 'GET',
			'callback' => array( $this, 'get_content_suggestions' ),
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
		) );

		//Route for gettings roles 
		register_rest_route(
			$namespace, 
			'/roles', 
			[
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

		//Route for pending users
		register_rest_route( 
			$namespace, 
			'/pending-users', 
			[
			'methods'  => 'GET',
			'callback' => [ $this, 'get_pending_users' ],
			'permission_callback' => function () {
				return current_user_can( 'list_users' );
			},
		] );

		//Route for approve-user 
		register_rest_route( 
			$namespace, 
			'/approve-user', 
			[
			'methods'  => 'POST',
			'callback' => [ $this, 'approve_user' ],
			'permission_callback' => function () {
				return current_user_can( 'edit_users' );
			},
			'args' => [
				'user_id' => [
					'required' => true,
					'type'     => 'integer',
					'validate_callback' => function ( $param ) {
						return get_user_by( 'id', $param ) !== false;
					},
				],
			],
		] );
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
		$integration_settings_data      = $request->get_param( 'integration' );

		$all_settings = get_option( 'thlogin_settings', [] );
		if ( ! is_array( $all_settings ) ) {
			$all_settings = [];
		}

		// 1. General Settings
		if ( null !== $general_settings_data ) {
			$sanitized_general   = $this->sanitize_general_settings( $general_settings_data );
			$validation_general  = $this->validate_general_settings( $sanitized_general );

			if ( is_wp_error( $validation_general ) ) {
				return new WP_REST_Response(
					[ 'success' => false, 'message' => $validation_general->get_error_message() ],
					400
				);
			}

			$all_settings['general'] = $sanitized_general;

			// Sync with WordPress default registration setting
			update_option( 'users_can_register', $sanitized_general['allow_user_registration'] ? 1 : 0 );
		}

		// 2. Design Settings
		if ( null !== $design_settings_data ) {
			$sanitized_design  = $this->sanitize_design_settings( $design_settings_data );
			$validation_design = $this->validate_design_settings( $sanitized_design );

			if ( is_wp_error( $validation_design ) ) {
				return new WP_REST_Response(
					[ 'success' => false, 'message' => $validation_design->get_error_message() ],
					400
				);
			}

			$all_settings['design'] = $sanitized_design;
		}

		// 3. Form Fields
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
					[ 'success' => false, 'message' => $validation_form_fields->get_error_message() ],
					400
				);
			}

			$all_settings['form_fields'] = $sanitized_form_fields;
		}

		// 4. Display Triggers
		if ( null !== $display_triggers_settings_data ) {
			$sanitized_display_triggers  = $this->sanitize_display_triggers_settings( $display_triggers_settings_data );
			$validation_display_triggers = $this->validate_display_triggers_settings( $sanitized_display_triggers );

			if ( is_wp_error( $validation_display_triggers ) ) {
				return new WP_REST_Response(
					[ 'success' => false, 'message' => $validation_display_triggers->get_error_message() ],
					400
				);
			}

			$all_settings['display_triggers'] = $sanitized_display_triggers;
		}

		// 5. Security Settings
		if ( null !== $security_settings_data ) {
			$sanitized_security  = $this->sanitize_security_settings( $security_settings_data );
			$validation_security = $this->validate_security_settings( $sanitized_security );

			if ( is_wp_error( $validation_security ) ) {
				return new WP_REST_Response(
					[ 'success' => false, 'message' => $validation_security->get_error_message() ],
					400
				);
			}

			$all_settings['security'] = $sanitized_security;
		}

		// 6. Integration Settings
		if ( null !== $integration_settings_data ) {
			$sanitized_integration  = $this->sanitize_integration_settings( $integration_settings_data );
			$validation_integration = $this->validate_integration_settings( $sanitized_integration );

			if ( is_wp_error( $validation_integration ) ) {
				return new WP_REST_Response(
					[ 'success' => false, 'message' => $validation_integration->get_error_message() ],
					400
				);
			}

			$all_settings['integration'] = $sanitized_integration;
		}

		//  Save all settings in one option
		update_option( 'thlogin_settings', $all_settings );

		return new WP_REST_Response(
			[
				'success'  => true,
				'message'  => esc_html__( 'Settings saved successfully!', 'th-login' ),
				'settings' => $all_settings,
			],
			200
		);
	}

	public function get_pending_users( $request ) {
		
		$args = [
		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'meta_query' => [
			[
				'key'   => 'thlogin_pending_approval',
				'value' => '1',
			],
			],
			'number'     => 50,
			'fields'     => [ 'ID', 'display_name', 'user_email' ],
		];	

		$users = get_users( $args );


		$response = array_map( function ( $user ) {
			$meta = get_user_meta( $user->ID );

			return [
				'id'           => $user->ID,
				'display_name' => $user->display_name,
				'email'        => $user->user_email,
			];
		}, $users );

		return rest_ensure_response( $response );
	}

	public function approve_user( $request ) {
		$user_id = $request->get_param( 'user_id' );

		if ( ! current_user_can( 'edit_user', $user_id ) ) {
			return new WP_Error( 'thlogin_no_permission', __( 'You do not have permission to approve this user.', 'th-login' ), [ 'status' => 403 ] );
		}

		delete_user_meta( $user_id, 'thlogin_pending_approval' );

		return rest_ensure_response( [
			'success' => true,
			'message' => __( 'User approved successfully.', 'th-login' ),
		] );
	}

	//login
	public function handle_frontend_login( WP_REST_Request $request ) {
		$params = $request->get_params();

		// 0. Honeypot check
		$honeypot = $this->validate_honeypot( $params );
		if ( $honeypot instanceof WP_REST_Response ) return $honeypot;

		// 1. reCAPTCHA check only if enabled and set to show on login
		$settings = get_option( 'thlogin_settings', [] );
		$security_settings = $settings['security'] ?? [];
		$recaptcha_settings = $security_settings['recaptcha'] ?? [];

		if (
			! empty( $recaptcha_settings['enabled'] ) &&
			in_array( $recaptcha_settings['show_on'] ?? 'all', [ 'all', 'login' ], true )
		) {
			$recaptcha_result = ( new THLogin_Security() )->verify_recaptcha( $params['g-recaptcha-response'] ?? '', 'login' );
			if ( $recaptcha_result instanceof WP_REST_Response ) return $recaptcha_result;
		}

		// 2. Brute-force check
		$lockout_check = ( new THLogin_Security() )->get_lockout_status( $request );
		if ( ! empty( $lockout_check['locked_out'] ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data' => $lockout_check + [ 'locked_out' => true ],
			], 429 );
		}

		// 3. Credentials extraction
		$form_fields = ( $settings['form_fields']['login'] ?? [] );

		[ $user_login, $user_password, $remember ] = $this->extract_login_credentials( $params, $form_fields );

		if ( empty( $user_login ) || empty( $user_password ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data' => [ 'message' => $this->get_missing_login_error_message( $user_login, $user_password, $form_fields ) ],
			], 400 );
		}

		// 4. Signon
		$user = wp_signon( [
			'user_login'    => $user_login,
			'user_password' => $user_password,
			'remember'      => $remember,
		], false );

		if ( is_wp_error( $user ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data' => [ 'message' => $user->get_error_message() ],
			], 401 );
		}

		// 5. Manual approval check
		if ( get_user_meta( $user->ID, 'thlogin_pending_approval', true ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'data'    => [ 'message' => __( 'Your account is pending admin approval.', 'th-login' ) ],
			], 403 );
		}

		if (
			! empty( $security_settings['email_verification']['enabled'] ) &&
			! get_user_meta( $user->ID, 'thlogin_email_verified', true )
		) {
			return new WP_REST_Response( [
				'success' => false,
				'data'    => [ 'message' => __( 'Please verify your email before logging in.', 'th-login' ) ],
			], 403 );
		}

		// 7. Validate custom meta fields
		$meta_check = $this->validate_login_meta_fields( $user->ID, $params, $form_fields );
		if ( $meta_check instanceof WP_REST_Response ) return $meta_check;

		// 8. Success response
		return new WP_REST_Response( [
			'success' => true,
			'data' => [
				'message'      => __( 'Login successful!', 'th-login' ),
				'redirect_url' => $this->get_redirect_url( $user, $request ),
			],
		], 200 );
	}

	private function get_redirect_url( $user, $request ) {
		$settings = get_option( 'thlogin_settings', [] );
		$general_settings = $settings['general'] ?? [];

		$redirect_settings = $general_settings['redirects']['after_login'] ?? [ 'type' => 'current_page' ];

		if ( 'dashboard' === $redirect_settings['type'] ) {
			return admin_url();
		} elseif ( 'home_page' === $redirect_settings['type'] ) {
			return home_url();
		} elseif ( 'custom_url' === $redirect_settings['type'] && ! empty( $redirect_settings['url'] ) ) {
			return esc_url_raw( $redirect_settings['url'] );
		}

		// Role based redirect
		$role_redirects = $general_settings['redirects']['role_based_redirects'] ?? [];
		if ( ! empty( $role_redirects ) && is_array( $user->roles ) ) {
			foreach ( $role_redirects as $rule ) {
				if ( in_array( $rule['role'], $user->roles, true ) && ! empty( $rule['url'] ) ) {
					return esc_url_raw( $rule['url'] );
				}
			}
		}

		return $request->get_header( 'referer' ) ? esc_url_raw( $request->get_header( 'referer' ) ) : home_url();
	}

	private function validate_login_meta_fields( $user_id, $params, $form_fields ) {
		foreach ( $form_fields as $field ) {
			if ( ! empty( $field['hidden'] ) || empty( $field['show'] ) ) continue;

			$name = $field['name'] ?? '';
			$label = $field['label'] ?? ucfirst( $name );
			$value = sanitize_text_field( $params[ $name ] ?? '' );
			$existing = get_user_meta( $user_id, $name, true );
			// translators: %s: Field label like "Email" or "Username"
			$error = $field['error_message'] ?? sprintf( __( '%s is required.', 'th-login' ), $label );

			if ( ! empty( $field['required'] ) && $value === '' ) {
				return new WP_REST_Response( [
					'success' => false,
					'data' => [ 'message' => $error ],
				], 400 );
			}

			if ( $existing && $value && $existing !== $value ) {
				return new WP_REST_Response( [
					'success' => false,
					// translators: %s: Field label like "Email" or "Username"
					'data' => [ 'message' => sprintf( __( 'Invalid value for %s.', 'th-login' ), $label ) ],
				], 403 );
			}

			if ( empty( $existing ) && ! empty( $value ) ) {
				update_user_meta( $user_id, $name, $value );
			}
		}

		return true;
	}

	private function get_missing_login_error_message( $user_login, $user_password, $form_fields ) {
		if ( $user_login && $user_password ) return '';

		$username_field = reset( array_filter( $form_fields, fn( $f ) => stripos( $f['name'], 'user' ) !== false || stripos( $f['name'], 'email' ) !== false ) );
		$password_field = reset( array_filter( $form_fields, fn( $f ) => stripos( $f['name'], 'pass' ) !== false ) );

		$error_message = '';
		if ( empty( $user_login ) && ! empty( $username_field['error_message'] ) ) {
			$error_message .= $username_field['error_message'] . ' ';
		}
		if ( empty( $user_password ) && ! empty( $password_field['error_message'] ) ) {
			$error_message .= $password_field['error_message'];
		}

		return trim( $error_message ?: __( 'Username and password are required.', 'th-login' ) );
	}

	private function extract_login_credentials( $params, $form_fields ) {
		$user_login = '';
		$user_password = '';
		$remember = ! empty( $params['rememberme'] );

		foreach ( $form_fields as $field ) {
			if ( ! empty( $field['hidden'] ) ) continue;
			$name = $field['name'] ?? '';

			if ( stripos( $name, 'user' ) !== false || stripos( $name, 'email' ) !== false ) {
				$user_login = sanitize_text_field( $params[ $name ] ?? '' );
			} elseif ( stripos( $name, 'pass' ) !== false ) {
				$user_password = $params[ $name ] ?? '';
			}
		}

		return [ $user_login, $user_password, $remember ];
	}

	private function validate_honeypot( $params ) {
		$settings = get_option( 'thlogin_settings', [] );
		$security_settings = $settings['security'] ?? [];

		if ( ! empty( $security_settings['honeypot_enabled'] ) ) {
			foreach ( $params as $key => $value ) {
				if ( stripos( $key, 'thlogin_hp' ) === 0 && ! empty( $value ) ) {
					return new WP_REST_Response( [
						'success' => false,
						'data'    => [ 'message' => __( 'Bot detection triggered. Please refresh and try again.', 'th-login' ) ],
					], 400 );
				}
			}
		}

		return true;
	}

	//register
	public function handle_frontend_register( WP_REST_Request $request ) {
		$settings = get_option( 'thlogin_settings', [] );
		$form_fields = $settings['form_fields'] ?? [];
		$register_fields = $form_fields['register'] ?? [];
		$general_settings = $settings['general'] ?? [];
		$security_settings = $settings['security'] ?? [];
		$integration_settings = $settings['integration'] ?? [];

		$username         = '';
		$email            = '';
		$password         = '';
		$confirm_password = '';
		
		// Honeypot validation
		$honeypot_result = $this->validate_honeypot( $request->get_params() );
		if ( $honeypot_result instanceof WP_REST_Response ) return $honeypot_result;


		// reCAPTCHA validation (only if enabled and shown on register)
		$recaptcha_settings = $security_settings['recaptcha'] ?? [];

		if (
			! empty( $recaptcha_settings['enabled'] ) &&
			in_array( $recaptcha_settings['show_on'] ?? 'all', [ 'all', 'register' ], true )
		) {
			$recaptcha_result = ( new THLogin_Security() )->verify_recaptcha(
				$request->get_param( 'g-recaptcha-response' ) ?? '',
				'register'
			);

			if ( $recaptcha_result instanceof WP_REST_Response ) return $recaptcha_result;
		}


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
				/* translators: %s: The form type (login/register) to be displayed in the link text */
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
					/* translators: %d: The form type (login/register) to be displayed in the link text */
					'data'    => [ 'message' => sprintf( __( 'Password must be at least %d characters.', 'th-login' ), $min ) ]
				], 400 );
			}
			if ( $max && strlen( $password ) > $max ) {
				return new WP_REST_Response( [
					'success' => false,
					/* translators: %d: The form type (login/register) to be displayed in the link text */
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
				/* translators: %s: The form type (login/register) to be displayed in the link text */
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
		if ( $security_settings['email_verification']['enabled'] ?? false ) {
			$this->thlogin_send_verification_email( $user_id, $email );

			return new WP_REST_Response( [
				'success' => true,
				'data'    => [
					'message'       => __( 'Registration successful! Please verify your email.', 'th-login' ),
					'redirect_url'  => home_url( '/?email_verification=sent' ),
				],
			], 200 );
		}

		// Manual approval
		if ( $general_settings['manual_user_approval']['enabled'] ?? false ) {
			update_user_meta( $user_id, 'thlogin_pending_approval', true );
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
		return new WP_REST_Response( [ 'success' => true, 'data' => [ 'message' => __( 'Registration successful! Please log in.', 'th-login' ), 'redirect_url' => home_url( '/?thlogin_action=login' ) ] ], 200 );
	}

	function thlogin_send_verification_email( $user_id, $email ) {
		$key = md5( microtime() . $user_id );

		update_user_meta( $user_id, 'thlogin_email_verification_key', $key );
		update_user_meta( $user_id, 'thlogin_email_verified', false );

		// Generate verification link.
		$verification_link = add_query_arg(
			[
				'thlogin_verify_email' => $key,
				'user_id'               => $user_id,
				'_wpnonce'             => wp_create_nonce( 'thlogin_email_verify' ),
			],
			home_url()
		);

		// Fetch email verification settings.
		$settings = get_option( 'thlogin_settings', [] );
		$security_settings = $settings['security'] ?? [];

		$email_settings    = $security_settings['email_verification'] ?? [];

		$from_name     = sanitize_text_field( $email_settings['from_name'] ?? __( 'TH Login', 'th-login' ) );
		$from_email    = sanitize_email( $email_settings['from_email'] ?? get_bloginfo( 'admin_email' ) );
		$email_subject = sanitize_text_field( $email_settings['email_subject'] ?? __( 'Verify your email', 'th-login' ) );
		$email_content = wp_kses_post( $email_settings['email_content'] ?? __( 'Click the following link to verify your email: {verification_link}', 'th-login' ) );

		// Replace placeholder.
		$email_content = str_replace( '{verification_link}', esc_url( $verification_link ), $email_content );

		// Prepare headers.
		$headers = [
			'Content-Type: text/html; charset=UTF-8',
			'From: ' . $from_name . ' <' . $from_email . '>',
			'Reply-To: ' . sanitize_email( $email ),
		];

		// Send the email.
		$sent = wp_mail( sanitize_email( $email ), $email_subject, nl2br( $email_content ), $headers );

		if ( $sent ) {
			return true;
		} else {
			$last_error = error_get_last();
			return false;
		}
	}

	//forgot-password
	public function handle_frontend_forgot_password( WP_REST_Request $request ) {
		$params = $request->get_params();
		
		// Honeypot validation
		$honeypot_result = $this->validate_honeypot( $params );
		if ( $honeypot_result instanceof WP_REST_Response ) return $honeypot_result;

		$settings = get_option( 'thlogin_settings', [] );
		$form_fields = $settings['form_fields'] ?? [];
		$forgot_fields = $form_fields['forgot_password'] ?? [];

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
			/* translators: 1: User's login name, 2: Password reset link URL */
			esc_html__( 'Someone has requested a password reset for the following account: %1$s. If this was a mistake, just ignore this email. To reset your password, visit the following address: %2$s',
				'th-login'
			),
			$user->user_login,
			$reset_link
		);

		$title = sprintf(
			/* translators: %s: The form type (login/register) to be displayed in the link text */
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

	//tools-panel
	public function export_settings( WP_REST_Request $request ) {
		$all_settings = get_option( 'thlogin_settings', [] );

		return new WP_REST_Response( $all_settings, 200 );
	}

	//reset-settings
	public function reset_settings( WP_REST_Request $request ) {
		// Security checks
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce', 'th-login' ),
			], 403 );
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Insufficient permissions', 'th-login' ),
			], 403 );
		}

		require_once THLOGIN_PATH . 'thlogin.php';

		if ( function_exists( 'thlogin_set_default_options' ) ) {
			delete_option( 'thlogin_settings' );
			wp_cache_delete( 'thlogin_settings', 'options' );

			thlogin_set_default_options();

			$fresh_settings_raw = get_option( 'thlogin_settings', [] );
			$fresh_settings     = is_array( $fresh_settings_raw ) ? $fresh_settings_raw : maybe_unserialize( $fresh_settings_raw );

			if ( ! is_array( $fresh_settings ) ) {
				return new WP_REST_Response( [
					'success' => false,
					'message' => __( 'Settings data is not in a valid format.', 'th-login' ),
				], 500 );
			}

			$fresh_settings['general']          = $this->sanitize_general_settings( $fresh_settings['general'] ?? [] );
			$fresh_settings['design']           = $this->sanitize_design_settings( $fresh_settings['design'] ?? [] );
			$fresh_settings['form_fields']      = $this->sanitize_form_fields_settings( $fresh_settings['form_fields'] ?? [] );
			$fresh_settings['display_triggers'] = $this->sanitize_display_triggers_settings( $fresh_settings['display_triggers'] ?? [] );
			$fresh_settings['security']         = $this->sanitize_security_settings( $fresh_settings['security'] ?? [] );
			$fresh_settings['integration']      = $this->sanitize_integration_settings( $fresh_settings['integration'] ?? [] );

			update_option( 'thlogin_settings', $fresh_settings );

			update_option( 'users_can_register', ! empty( $fresh_settings['general']['allow_user_registration'] ) ? 1 : 0 );

			return new WP_REST_Response( [
				'success'  => true,
				'message'  => esc_html__( 'Settings reset and saved successfully.', 'th-login' ),
				'settings' => $fresh_settings,
			], 200 );
		}

		return new WP_REST_Response( [
			'success' => false,
			'message' => esc_html__( 'Reset function not available.', 'th-login' ),
		], 500 );
	}

	//sanitization-valdiation
	public function sanitize_general_settings( $settings ) {
		return $this->sanitizer->sanitize_general_settings( (array) $settings );
	}

	public function validate_general_settings( $settings ) {
		return $this->sanitizer->validate_general_settings((array) $settings );
	}

	public function sanitize_design_settings( $settings ) {
		return $this->sanitizer->sanitize_design_settings( (array) $settings );
	}

	public function validate_design_settings( $settings ) {
		return $this->sanitizer->validate_design_settings((array) $settings );
	}

	public function sanitize_form_fields_settings( $settings ) {
		return $this->sanitizer->sanitize_form_fields_settings((array) $settings );
	}

	public function validate_form_fields_settings( $settings ) {
		return $this->sanitizer->validate_form_fields_settings( (array) $settings );
	}

	public function sanitize_display_triggers_settings( $settings ) {
		return $this->sanitizer->sanitize_display_triggers_settings((array) $settings );
	}

	public function validate_display_triggers_settings( $settings ) {
		return $this->sanitizer->validate_display_triggers_settings((array) $settings );
	}

	public function sanitize_security_settings( $settings ) {
		return $this->sanitizer->sanitize_security_settings((array) $settings );
	}

	public function validate_security_settings( $settings ) {
		return $this->sanitizer->validate_security_settings((array) $settings );
	}

	public function sanitize_integration_settings( $settings ) {
		return $this->sanitizer->sanitize_integration_settings((array) $settings );
	}

	public function validate_integration_settings( $settings ) {
		return $this->sanitizer->validate_integration_settings((array) $settings );
	}
}
