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
		// move your full `$design_defaults` array here
		return array(
		'modal' => array(
			'modal_background' => array(
				'type'     => 'color',
				'color'    => '#FFFFFF00',
				'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
				'opacity'  => 1,
				'image'    => array(
					'url'      => '',
					'position' => 'center center',
					'size'     => 'cover',
					'repeat'   => 'no-repeat',
				),
			),
			'modal_input_layout'=>  'stack',
		),

		'form' => array(
			'form_background' => array(
				'type'     => 'color',
				'color'    => '#ffffff',
				'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
				'opacity'  => 1,
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
				'top'    => 15,
				'right'  => 50,
				'bottom' => 15,
				'left'   => 50,
			),
			'form_gap' => 12,
		),

		'heading' => array(
			'color'     => '#000000',
			'typography' => array(
				'size'       => '25px',
				'fontWeight' => 700,
			),
		),

		'Input' => array(
			'color'      => '#000000',
			'labelcolor' => '#000000',
			'labeltypography' => array(
				'size'       => '15px',
				'fontWeight' => 300,
			),
			'background' => '#ffffff',
			'typography' => array(
				'size'       => '12px',
				'fontWeight' => 300,
			),
		),

		'button' => array(
			'color'           => '#ffffff',
			'background'      => '#0B59f4',
			'hoverBackground' => '#1c21ba',
			'padding'         => array(
				'top'    => 6,
				'right'  => 10,
				'bottom' => 15,
				'left'   => 15,
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
			'color'              => '#000000',
			'checkboxbackground' => '#ffffff',
			'typography'         => array(
				'size'       => '12px',
				'fontWeight' => 300,
			),
		),

		'icon' => array(
			'color' => '#111111',
			'size'  => '20px',
			'icon_position' => 'with-label'
		),

		'header' => array(
			'button' => array(
				'color'           => '#ffffff',
				'background'      => '#0B59f4',
				'hoverBackground' => '#1c21ba',
				'padding'         => array(
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
				'color'           => '#f31212',
				'background'      => '#E6e6e6',
				'hoverBackground' => '#9a9a9e',
				'padding'         => array(
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
				'label'         => esc_html__( 'I agree to the Terms & Conditions', 'th-login' ),
				'name'          => 'terms_and_conditions',
				'type'          => 'checkbox',
				'required'      => true,
				'icon'          => '',
				'show'          => true,
				'error_message' => esc_html__( 'You must agree to the Terms & Conditions.', 'th-login' ),
				'predefined'    => false,
				'link'          => "",
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
	    ); // ← Replace with actual defaults
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
		'menu_integration'           => array(
			'enabled'                    => false,
			'menu_slug'                  => 'primary',
			'item_text_login'            => __( 'Login', 'th-login' ),
			'item_text_register'         => __( 'Register', 'th-login' ),
			'item_icon_login'            => 'dashicons-admin-users',
			'item_icon_register'         => 'dashicons-plus-alt',
			'visibility_login_logged_in' => false,
			'visibility_register_logged_in' => false,
		),
	    ); // ← Replace with actual defaults
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
	    ); // ← Replace with actual defaults
	}

	public static function integration() {
		return array(
			'woocommerce' => array(
				'enabled' => true,
			),
	    ); 
	}
}
