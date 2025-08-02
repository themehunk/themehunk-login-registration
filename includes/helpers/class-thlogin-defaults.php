<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class THLogin_Defaults {

	public static function set_all_defaults() {
		$defaults = array(
			'general'           => self::general(),
			'design'            => self::design(),
			'form_fields'       => self::form_fields(),
			'display_triggers'  => self::display_triggers(),
			'security'          => self::security(),
			'integration'       => self::integration(),
		);
			
		update_option( 'thlogin_settings', $defaults );

	}

	public static function general() {
		return array(
			'plugin_status' => 'enabled',
            'repalce_wordpress' => true,
            'form_type' => 'double',
            'display_mode'=> 'popup',
            'default_register_role'=> 'subscriber', 
            'auto_login_after_registration' => false,
            'allow_user_registration' => get_option( 'users_can_register' ),
            'redirects'                 => array(
                'after_login'    => array( 'type' => 'current_page', 'url' => '' ),
                'after_logout'   => array( 'type' => 'home_page', 'url' => '' ),
                'after_register' => array( 'type' => 'current_page', 'url' => '' ),
                'role_based_redirects' => array(),
            ),
            'manual_user_approval'      => array( 'enabled' => false ),
            'close_button' => true,
		);
	}

	public static function design() {
		return array(
			'modal' => array(
				'modal_background' => array(
					'type'     => 'color',
					'color'    => '#5954549c',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'filter'   => 10,
					'image'    => array(
						'url'      => '',
						'position' => 'center center',
						'size'     => 'cover',
						'repeat'   => 'no-repeat',
					),
				),
				'modal_input_layout' => 'stack',
			),

			'form' => array(
				'form_background' => array(
					'type'     => 'color',
					'color'    => '#ffffff',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'image'    => array(
						'url'      => '',
						'position' => 'center center',
						'size'     => 'cover',
						'repeat'   => 'no-repeat',
					),
				),
				'form_border' => array(
					'width' => array(
						'top'    => 0,
						'right'  => 0,
						'bottom' => 0,
						'left'   => 0,
					),
					'style'  => 'solid',
					'color'  => '#000000',
					'radius' => array(
						'topLeft'     => 6,
						'topRight'    => 6,
						'bottomRight' => 6,
						'bottomLeft'  => 6,
					),
				),
				'form_padding' => array(
					'top'    => 10,
					'right'  => 35,
					'bottom' => 30,
					'left'   => 35,
				),
				'form_gap' => 18,
			),

			'heading' => array(
				'color' => '#000000',
				'typography' => array(
					'size'       => '25px',
					'fontWeight' => 500,
				),
			),

			'Input' => array(
				'color'       => '#8392A5',
				'labelcolor'  => '#262626',
				'activecolor' => '#262626',
				'labeltypography' => array(
					'size'       => '16px',
					'fontWeight' => 500,
				),
				'background' => array(
					'type'     => 'color',
					'color'    => '#ffffff',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'image'    => array(
						'url'      => '',
						'position' => 'center center',
						'size'     => 'cover',
						'repeat'   => 'no-repeat',
					),
				),
				'typography' => array(
					'size'       => '14px',
					'fontWeight' => 300,
				),
			),

			'button' => array(
				'color' => '#ffffff',
				'background' => array(
					'type'     => 'color',
					'color'    => '#0B59f4',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'image'    => array(
						'url'      => '',
						'position' => 'center center',
						'size'     => 'cover',
						'repeat'   => 'no-repeat',
					),
				),
				'hoverbackground' => array(
					'type'     => 'color',
					'color'    => '#1c21ba',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'image'    => array(
						'url'      => '',
						'position' => 'center center',
						'size'     => 'cover',
						'repeat'   => 'no-repeat',
					),
				),
				'padding' => array(
					'top'    => 12,
					'right'  => 12,
					'bottom' => 12,
					'left'   => 12,
				),
				'typography' => array(
					'size'       => '14px',
					'fontWeight' => 500,
				),
				'border' => array(
					'width' => array(
						'top'    => 0,
						'right'  => 0,
						'bottom' => 0,
						'left'   => 0,
					),
					'style'  => 'solid',
					'color'  => '#000000',
					'radius' => array(
						'topLeft'     => 5,
						'topRight'    => 5,
						'bottomRight' => 5,
						'bottomLeft'  => 5,
					),
				),
			),

			'rememberme' => array(
				'color' => '#8392A5',
				'background' => array(
					'type'     => 'color',
					'color'    => '#ffffff',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'image'    => array(
						'url'      => '',
						'position' => 'center center',
						'size'     => 'cover',
						'repeat'   => 'no-repeat',
					),
				),
				'typography' => array(
					'size'       => '14px',
					'fontWeight' => 300,
				),
			),

			'term' => array(
				'color' => '#8392A5',
				'link'  => '#007cba',
				'typography' => array(
					'size'       => '14px',
					'fontWeight' => 300,
				),
			),

			'icon' => array(
				'color'         => '#8392A5',
				'size'          => '17px',
				'icon_position' => 'inside-input',
			),

			'header' => array(
				'showButtons'  => false, 
				'loginText'    => 'Login',
				'registerText' => 'Register',
				'button' => array(
					'color' => '#ffffff',
					'background' => array(
						'type'     => 'color',
						'color'    => '#0B59f4',
						'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
						'image'    => array(
							'url'      => '',
							'position' => 'center center',
							'size'     => 'cover',
							'repeat'   => 'no-repeat',
						),
					),
					'hoverbackground' => array(
						'type'     => 'color',
						'color'    => '#1c21ba',
						'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
						'image'    => array(
							'url'      => '',
							'position' => 'center center',
							'size'     => 'cover',
							'repeat'   => 'no-repeat',
						),
					),
					'padding' => array(
						'top'    => 8,
						'right'  => 12,
						'bottom' => 8,
						'left'   => 12,
					),
					'typography' => array(
						'size'       => '14px',
						'fontWeight' => 500,
					),
					'border' => array(
						'width' => array(
							'top'    => 0,
							'right'  => 0,
							'bottom' => 0,
							'left'   => 0,
						),
						'style'  => 'solid',
						'color'  => '#000000',
						'radius' => array(
							'topLeft'     => 5,
							'topRight'    => 5,
							'bottomRight' => 5,
							'bottomLeft'  => 5,
						),
					),
				),
				'cancel_button' => array(
					'color' => '#f31212',
					'background' => array(
						'type'     => 'color',
						'color'    => '#E6e6e6',
						'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
						'image'    => array(
							'url'      => '',
							'position' => 'center center',
							'size'     => 'cover',
							'repeat'   => 'no-repeat',
						),
					),
					'hoverbackground' => array(
						'type'     => 'color',
						'color'    => '#9a9a9e',
						'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
						'image'    => array(
							'url'      => '',
							'position' => 'center center',
							'size'     => 'cover',
							'repeat'   => 'no-repeat',
						),
					),
					'padding' => array(
						'top'    => 3,
						'right'  => 3,
						'bottom' => 3,
						'left'   => 3,
					),
					'typography' => array(
						'size'       => '14px',
						'fontWeight' => 500,
					),
					'border' => array(
						'width' => array(
							'top'    => 0,
							'right'  => 0,
							'bottom' => 0,
							'left'   => 0,
						),
						'style'  => 'solid',
						'color'  => '#000000',
						'radius' => array(
							'topLeft'     => 20,
							'topRight'    => 20,
							'bottomRight' => 20,
							'bottomLeft'  => 20,
						),
					),
				),
			),

			'submitButton' => array(
				'login'           => 'Login',
				'register'       => 'Register',
				'forgot_password' => 'Reset',
			),

			'logo' => array(
				'size'  => '30px',
				'color' => 'black',
				'url'   => '',
			),
		);
	}

	public static function form_fields() {
		// move your full `$form_fields_defaults` array here
		return array(
		'login' => array(
			array(
				'id'            => 'username',
				'label'         => esc_html__( 'Username or Email', 'th-login' ),
				'name'          => 'username',
				'type'          => 'text',
				'placeholder'   => esc_html__( 'Enter your username or email', 'th-login' ),
				'required'      => true,
				'icon'          => 'user',
				'error_message' => esc_html__( 'Username or email is required.', 'th-login' ),
				'predefined'    => true,
			),
			array(
				'id'            => 'password',
				'label'         => esc_html__( 'Password', 'th-login' ),
				'name'          => 'password',
				'type'          => 'password',
				'placeholder'   => esc_html__( 'Enter your password', 'th-login' ),
				'required'      => true,
				'icon'          => 'lock',
				'error_message' => esc_html__( 'Password is required.', 'th-login' ),
				'predefined'    => true,
			),
			array(
				'id'            => 'remember_me',
				'label'         => esc_html__( 'Remember Me', 'th-login' ),
				'name'          => 'remember_me',
				'type'          => 'checkbox',
				'required'      => false,
				'icon'          => '',
				'show'          => true,
				'error_message' => '',
				'predefined'    => true,
			),
		),

		'register' => array(
			array(
				'id'            => 'username',
				'label'         => esc_html__( 'Choose a Username', 'th-login' ),
				'name'          => 'username',
				'type'          => 'text',
				'placeholder'   => esc_html__( 'Enter your desired username', 'th-login' ),
				'required'      => true,
				'icon'          => 'user',
				'error_message' => esc_html__( 'Username is required.', 'th-login' ),
				'predefined'    => true,
			),
			array(
				'id'            => 'email',
				'label'         => esc_html__( 'Email Address', 'th-login' ),
				'name'          => 'email',
				'type'          => 'email',
				'placeholder'   => esc_html__( 'Enter your email', 'th-login' ),
				'required'      => true,
				'icon'          => 'email',
				'error_message' => esc_html__( 'Email address is required.', 'th-login' ),
				'predefined'    => false,
			),
			array(
				'id'            => 'password',
				'label'         => esc_html__( 'Create Password', 'th-login' ),
				'name'          => 'password',
				'type'          => 'password',
				'placeholder'   => esc_html__( 'Create a strong password', 'th-login' ),
				'required'      => true,
				'icon'          => 'lock',
				'check'         => array( 'text' => true, 'number' => false, 'special_charcter' => false ),
				'maxInput'      => 20,
				'minInput'      => 5,
				'error_message' => esc_html__( 'Password is required.', 'th-login' ),
				'predefined'    => true,
			),
			array(
				'id'            => 'confirm_password',
				'label'         => esc_html__( 'Confirm Password', 'th-login' ),
				'name'          => 'confirm_password',
				'type'          => 'password',
				'placeholder'   => esc_html__( 'Confirm your password', 'th-login' ),
				'required'      => true,
				'icon'          => 'lock',
				'logic_key'     => 'confirm_password',
				'error_message' => esc_html__( 'Please confirm your password.', 'th-login' ),
				'predefined'    => true,
			),
			array(
				'id'            => 'first_name',
				'label'         => esc_html__( 'First Name', 'th-login' ),
				'name'          => 'first_name',
				'type'          => 'text',
				'placeholder'   => esc_html__( 'Your first name', 'th-login' ),
				'required'      => false,
				'icon'          => 'user',
				'show'          => false,
				'error_message' => esc_html__( 'First name is required.', 'th-login' ),
				'predefined'    => false,
			),
			array(
				'id'            => 'last_name',
				'label'         => esc_html__( 'Last Name', 'th-login' ),
				'name'          => 'last_name',
				'type'          => 'text',
				'placeholder'   => esc_html__( 'Your last name', 'th-login' ),
				'required'      => false,
				'icon'          => 'user',
				'show'          => false,
				'error_message' => esc_html__( 'Last name is required.', 'th-login' ),
				'predefined'    => false,
			),
			array(
				'id'            => 'terms_and_conditions',
				'label'         => esc_html__( '[I agree to the Terms & Conditions.]', 'th-login' ),
				'name'          => 'terms_and_conditions',
				'type'          => 'checkbox',
				'required'      => true,
				'icon'          => '',
				'show'          => true,
				'error_message' => esc_html__( 'You must agree to the Terms & Conditions.', 'th-login' ),
				'predefined'    => true,
				'link'          => "",
				'link'          => '',
			),
			array(
				'id'            => 'honeypot',
				'name'          => 'honeypot',
				'type'          => 'text',
				'label'         => '',
				'icon'          => '',
				'show'          => false,
				'hidden'        => true,
				'error_message' => '',
				'predefined'    => false,
			),
		),

		'forgot_password' => array(
			array(
				'id'            => 'user_login',
				'label'         => esc_html__( 'Email Address', 'th-login' ),
				'name'          => 'user_login',
				'type'          => 'text',
				'placeholder'   => esc_html__( 'Enter your email to reset password', 'th-login' ),
				'required'      => true,
				'icon'          => 'email',
				'error_message' => esc_html__( 'Email address is required to reset password.', 'th-login' ),
				'predefined'    => true,
			),
		),
	    ); 
	}

	public static function display_triggers() {
		// move your full `$display_triggers_defaults` array here
		return array(
			'trigger_css_class'          => 'thlogin-trigger',
			'auto_open_on_load'          => array( 'enabled' => true, 'delay_seconds' => 2 ),
			'auto_open_on_scroll'        => array( 'enabled' => false, 'scroll_percentage' => 50 ),
			'auto_open_on_exit_intent'   => array( 'enabled' => false ),
			'auto_open_on_time_on_page'  => array( 'enabled' => false, 'time_seconds' => 10 ),
			'auto_open_conditions'       => array(
				'for_logged_out_only'      => true,
				'for_specific_roles'       => array(),
				'on_specific_pages'        => array( 'enabled' => false, 'page_ids' => array(), 'page_slugs' => array() ),
				'on_specific_categories'   => array( 'enabled' => false, 'category_ids' => array(), 'category_slugs' => array() ),
				'on_specific_tags'         => array( 'enabled' => false, 'tag_ids' => array(), 'tag_slugs' => array() ),
				'on_woocommerce_myaccount' => false,
				'on_woocommerce_checkout'  => false,
				'device_visibility'        => array( 'desktop' => true, 'tablet' => true, 'mobile' => true ),
				'url_parameter_trigger'    => array( 'enabled' => false, 'param_name' => 'thlogin', 'param_value' => 'open' ),
				'referrer_detection'       => array( 'enabled' => false, 'referrer_urls' => array() ),
			),
			'pop_up_frequency'           => array( 'enabled' => false, 'type' => 'session', 'days' => 7 ),
			'menu_integration' => array(
				'enabled'            => false,
				'item_text_login'    => __( 'Login', 'th-login' ),
				'item_icon_login'    => '',
				'logout'             => true,
				'item_text_logout'   => __( 'Logout', 'th-login' ),
				'item_icon_logout'   => '',
			),
	    ); 
	}

	public static function security() {
		// move your full `$security_defaults` array here
		return array(
			'brute_force_protection' => array(
				'enabled'                   => true,
				'max_attempts'              => 5,
				'lockout_duration_minutes'  => 30,
				'auto_ip_blacklist_enabled' => true,
			),
			'recaptcha'              => array(
				'enabled'    => false,
				'type'       => 'v2_checkbox',
				'show_on'    => 'all',
				'site_key'   => '',
				'secret_key' => '',
			),
			'honeypot_enabled'       => true,
			'email_verification'     => array(
				'enabled'   => false,
				'from_name'      => '',
				'from_email'     => '',
				'email_subject'  => 'Verify your email',
				'email_content'  => 'Click the link to verify: {verification_link}',
			),
			'session_timeout'=> array(
				'enabled'=> true,
				'duration'=> 15,
				'show_warning'=> true,
				'warning_duration'=> 60
			),
	    ); 
	}

	public static function integration() {
		return array(
			'woocommerce' => array(
				'enabled' => true,
			),
			'wordpress' => array(
				'enabled'           => false,
				'url'               => '',
			),
		);
	}
}
