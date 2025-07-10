<?php
/**
 * Plugin Name:       TH Login
 * Plugin URI:        https://themehunk.com/th-login
 * Description:       A powerful and highly customizable frontend login, registration, and password reset pop-up plugin for WordPress.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            ThemeHunk
 * Author URI:        https://themehunk.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       th-login
 * Domain Path:       /languages
 *
 * @package TH_Login
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TH_LOGIN_VERSION', '1.0.0' );
define( 'TH_LOGIN_FILE', __FILE__ );
define( 'TH_LOGIN_PATH', plugin_dir_path( TH_LOGIN_FILE ) );
define( 'TH_LOGIN_URL', plugin_dir_url( TH_LOGIN_FILE ) );
define( 'TH_LOGIN_BASENAME', plugin_basename( TH_LOGIN_FILE ) );

final class TH_Login {

	protected static $instance = null;

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		$this->define_hooks();
		$this->includes();
	}

	private function define_hooks() {
		register_activation_hook( TH_LOGIN_FILE, array( $this, 'activate' ) );
		register_deactivation_hook( TH_LOGIN_FILE, array( $this, 'deactivate' ) );
		add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
	}

	private function includes() {
		require_once TH_LOGIN_PATH . 'includes/class-th-login-admin.php';
		require_once TH_LOGIN_PATH . 'includes/class-th-login-frontend.php';
		require_once TH_LOGIN_PATH . 'includes/class-th-login-shortcodes.php';
		require_once TH_LOGIN_PATH . 'includes/class-th-login-security.php';
		require_once TH_LOGIN_PATH . 'includes/class-th-login-rest-api.php';
		require_once TH_LOGIN_PATH . 'includes/class-th-login-forms.php';
		require_once TH_LOGIN_PATH . 'includes/class-th-login-integrations.php';
		require_once TH_LOGIN_PATH . 'includes/helpers.php';
	}

	public function init_plugin() {
		load_plugin_textdomain( 'th-login', false, dirname( TH_LOGIN_BASENAME ) . '/languages' );

		new TH_Login_Admin();
		new TH_Login_Frontend();
		new TH_Login_Shortcodes();
		new TH_Login_Security();
		new TH_Login_REST_API();
		new TH_Login_Forms();
		new TH_Login_Integrations();

		add_filter( 'plugin_action_links_' . TH_LOGIN_BASENAME, array( $this, 'add_plugin_action_links' ) );
	}

	public function activate() {
		th_login_set_default_options();
	}

	public function deactivate() {
		// Clean up temporary data if any.
	}

	public function add_plugin_action_links( $links ) {
		$settings_link = '<a href="' . esc_url( admin_url( 'admin.php?page=th-login-settings' ) ) . '">' . esc_html__( 'Settings', 'th-login' ) . '</a>';
		array_unshift( $links, $settings_link );
		return $links;
	}
}


function th_login_set_default_options() {

	$general_defaults = array(
		'plugin_status'             => 'enabled',
		'form_type' => 'double',
		'display_mode'=> 'popup',
		'default_register_role'=> 'subscriber', 
		'auto_login_after_registration' => false,
		'redirects'                 => array(
			'after_login'    => array( 'type' => 'current_page', 'url' => '' ),
			'after_logout'   => array( 'type' => 'home_page', 'url' => '' ),
			'after_register' => array( 'type' => 'current_page', 'url' => '' ),
			'role_based_redirects' => array(),
		),
		'manual_user_approval'      => array( 'enabled' => false ),
		'close_button' => true,
	);

	update_option( 'th_login_general_settings', json_encode( $general_defaults ) );

	$design_defaults = array(
		'design_template' => 'default',
		'logo'            => array(
			'url'           => '',
			'width'         => array( 'desktop' => '150px' ),
			'margin_bottom' => '20px',
			'svg_enabled'   => true,
			'link_url'      => '',
		),

		'modal'           => array(

			'overlay_background_type' => 'color',
			'overlay_background_color'    => 'rgba(0, 0, 0, 0.5)',
			'overlay_background_gradient' => 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))',
			'overlay_background_image_url'    => '',
			'overlay_background_image_size'     => 'cover',
			'overlay_background_image_position' => 'center center',
			'overlay_background_image_repeat'   => 'no-repeat',

			'form_bg_type'          => 'color',
			'form_bg_color'         => '#ffffff',
			'form_bg_image'         => array( 'url' => '', 'position' => 'center center', 'size' => 'cover', 'repeat' => 'no-repeat' ),
			'form_bg_gradient'      => array( 'colors' => array(), 'direction' => 'to bottom' ),
			'form_width'            => array( 'desktop' => '400px', 'tablet' => '90%', 'mobile' => '95%' ),
			'form_max_width'        => '500px',
			'form_height'           => 'auto',
			'form_min_height'       => '300px',
			'form_padding'          => array( 'desktop' => '30px', 'tablet' => '25px', 'mobile' => '20px' ),
			'form_margin'           => '20px auto',
			'form_border'           => array( 'style' => 'solid', 'width' => '1px', 'color' => '#dddddd', 'top_width' => '1px', 'right_width' => '1px', 'bottom_width' => '1px', 'left_width' => '1px', 'top_color' => '#dddddd', 'right_color' => '#dddddd', 'bottom_color' => '#dddddd', 'left_color' => '#dddddd' ),
			'form_border_radius'    => array( 'top_left' => '12px', 'top_right' => '12px', 'bottom_left' => '12px', 'bottom_right' => '12px' ),
			'form_box_shadow'       => '0 8px 25px rgba(0,0,0,0.15)',
			'modal_animation_in'    => 'fade-in',
			'modal_animation_out'   => 'fade-out',
			'close_button'          => array( 'position' => 'top-right', 'icon_color' => '#333', 'bg_color' => 'transparent', 'size' => '24px', 'hover_color' => '#000' ),
			'scrollbar_style'       => 'default',
		),
		'typography'      => array(
			'font_family'      => 'Inter, sans-serif',
			'google_font_url'  => '',
			'general_text'     => array(
				'color' => '#333333',
				'font_size' => array( 'desktop' => '16px' ),
				'line_height' => '1.6',
				'font_weight' => '400',
				'text_shadow' => '',
				'border_style' => 'none', // NEW DEFAULT
				'border_width' => '0px',   // NEW DEFAULT
				'border_color' => '#000000', // NEW DEFAULT
			),
			'labels'           => array( 'color' => '#555555', 'font_size' => array( 'desktop' => '14px' ), 'font_weight' => '500' ),
			'links'            => array( 'color' => '#007cba', 'hover_color' => '#005ba0', 'font_size' => array( 'desktop' => '14px' ) ),
			'messages'         => array( 'success_color' => '#4CAF50', 'error_color' => '#F44336', 'font_size' => array( 'desktop' => '14px' ) ),
			'headings'         => array( 'color' => '#222222', 'font_size' => array( 'desktop' => '24px' ), 'font_weight' => '600' ),
			'form_header_html' => array( 'content' => '', 'enabled' => true ),
			'form_footer_html' => array( 'content' => '', 'enabled' => true ),
		),
		'input_fields'    => array(
			'bg_color'          => '#f9f9f9',
			'text_color'        => '#333333',
			'border'            => array( 'style' => 'solid', 'width' => '1px', 'color' => '#cccccc', 'focus_color' => '#007cba' ),
			'border_radius'     => '6px',
			'padding'           => '12px',
			'placeholder_color' => '#999999',
			'focus_box_shadow'  => '0 0 0 2px rgba(0,124,186,0.25)',
			'focus_outline'     => '2px solid rgba(0,124,186,0.25)',
		),
		'buttons'         => array(
			'primary'   => array( 'bg_color' => '#007cba', 'bg_hover_color' => '#005ba0', 'text_color' => '#ffffff', 'text_hover_color' => '#ffffff', 'border_radius' => '6px', 'padding' => '12px 25px', 'box_shadow' => '0 2px 5px rgba(0,0,0,0.1)', 'icon' => '', 'hover_animation' => 'scale', 'text_saving' => __( 'Processing...', 'th-login' ) ),
			'secondary' => array( 'bg_color' => 'transparent', 'bg_hover_color' => 'rgba(0,0,0,0.05)', 'text_color' => '#007cba', 'text_hover_color' => '#005ba0', 'border_radius' => '4px', 'padding' => '8px 15px' ),
		),
		'custom_css'      => '',
		'custom_js'       => '',
		// NEW: Login Form specific styles
		'login_form'      => array(
			'bg_color'   => '#ffffff', // Default to white
			'text_color' => '#333333', // Default to dark grey
		),
	);

	update_option( 'th_login_design_settings', json_encode( $design_defaults ) );

	$form_fields_defaults = array(
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
	);
	
	update_option( 'th_login_form_fields_settings', json_encode( $form_fields_defaults ) );

	$display_triggers_defaults = array(
		'trigger_css_class'          => 'th-login-trigger',
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
			'url_parameter_trigger'    => array( 'enabled' => false, 'param_name' => 'th_login', 'param_value' => 'open' ),
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
	);

	update_option( 'th_login_display_triggers_settings', json_encode( $display_triggers_defaults ) );

	$security_defaults = array(
		'brute_force_protection' => array(
			'enabled'                   => true,
			'max_attempts'              => 5,
			'lockout_duration_minutes'  => 30,
			'auto_ip_blacklist_enabled' => true,
		),
		'recaptcha'              => array(
			'enabled'    => false,
			'type'       => 'v2_checkbox',
			'site_key'   => '',
			'secret_key' => '',
		),
		'honeypot_enabled'       => true,
	);

	update_option( 'th_login_security_settings', json_encode( $security_defaults ) );
}

register_activation_hook( __FILE__, 'th_login_set_default_options' );

require_once TH_LOGIN_PATH . 'includes/class-th-login-menu-integration.php';
new TH_Login_Menu_Integration();

require_once TH_LOGIN_PATH . 'includes/class-th-login-gutenberg-block.php';
new TH_Login_Gutenberg_Block();

function th_login_init() {
	return TH_Login::instance();
}
th_login_init();
