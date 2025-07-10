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

/**
 * Define TH Login Constants.
 */
define( 'TH_LOGIN_VERSION', '1.0.0' );
define( 'TH_LOGIN_FILE', __FILE__ );
define( 'TH_LOGIN_PATH', plugin_dir_path( TH_LOGIN_FILE ) );
define( 'TH_LOGIN_URL', plugin_dir_url( TH_LOGIN_FILE ) );
define( 'TH_LOGIN_BASENAME', plugin_basename( TH_LOGIN_FILE ) );

/**
 * The main plugin class.
 */
final class TH_Login {

	/**
	 * The single instance of the class.
	 *
	 * @var TH_Login
	 */
	protected static $instance = null;

	/**
	 * Main TH_Login Instance.
	 * Ensures only one instance of TH_Login is loaded or can be loaded.
	 *
	 * @return TH_Login - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		$this->define_hooks();
		$this->includes();
	}

	/**
	 * Define the core plugin hooks.
	 */
	private function define_hooks() {
		register_activation_hook( TH_LOGIN_FILE, array( $this, 'activate' ) );
		register_deactivation_hook( TH_LOGIN_FILE, array( $this, 'deactivate' ) );
		add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
	}

	/**
	 * Include required files.
	 */
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

	/**
	 * Initialize the plugin after all plugins are loaded.
	 */
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

	/**
	 * Plugin activation callback.
	 */
	public function activate() {
		// Default settings for general, design, display/triggers, security.
		// Ensure all nested arrays are explicitly defined as empty arrays.
		$default_general_settings = array(
			'plugin_status' => 'enabled',
			'auto_login_after_registration' => false,
			'form_type'=> 'double',
      		'display_mode'=> 'popup',
			'default_register_role'=>  'subscriber', 
			'redirects' => array(
				'after_login' => array( 'type' => 'current_page', 'url' => '' ),
				'after_logout' => array( 'type' => 'home_page', 'url' => '' ),
				'after_register' => array( 'type' => 'login_form', 'url' => '' ),
			),
            'manual_user_approval' => array( 'enabled' => false ),
			'close_button' => true
		);

		add_option( 'th_login_general_settings', json_encode( $default_general_settings ) );

		$default_design_settings = array(
			'modal' => array(
				'layout_type' => 'popup',

				'modal_background' => array(
					'type' => 'image', // 'color' | 'gradient' | 'image'
					'color' => '#ffffff',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'opacity' => 1,
					'image' => array(
						'url' => '',
						'position' => 'center center',
						'size' => 'cover',
						'repeat' => 'no-repeat'
					)
					),
				'form_background' => array(
					'type' => 'image', // 'color' | 'gradient' | 'image'
					'color' => '#ffffff',
					'gradient' => 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
					'opacity' => 1,
					'image' => array(
						'url' => '',
						'position' => 'center center',
						'size' => 'cover',
						'repeat' => 'no-repeat'
					)
				),
				'form_border' => array(
					'width' => array(
						'top'    => 1,
						'right'  => 1,
						'bottom' => 1,
						'left'   => 1,
					),
					'style'  => 'solid', // solid | dashed | dotted | double | none
					'color'  => '#000000',
					'radius' => array(
						'topLeft'     => 6,
						'topRight'    => 6,
						'bottomRight' => 6,
						'bottomLeft'  => 6,
					),
				),
			),
		);

		// Only add option if it doesn't exist, to avoid overwriting user settings.
		add_option( 'th_login_design_settings', json_encode( $default_design_settings ) );

		$default_form_fields_settings = array(
			'login' => array(
				array(
					'id'          => 'username',
					'label'       => esc_html__( 'Username or Email', 'th-login' ),
					'name'        => 'username',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Enter your username or email', 'th-login' ),
					'required'    => true,
					'icon'        => 'user',
					
				),
				array(
					'id'          => 'password',
					'label'       => esc_html__( 'Password', 'th-login' ),
					'name'        => 'password',
					'type'        => 'password',
					'placeholder' => esc_html__( 'Enter your password', 'th-login' ),
					'required'    => true,
					'icon'        => 'lock',
					
				),
				array(
					'id'       => 'remember_me',
					'label'    => esc_html__( 'Remember Me', 'th-login' ),
					'name'     => 'remember_me',
					'type'     => 'checkbox',
					'required' => false,
					'icon'     => '',
					'show'     => true,
					
				),
			),
			'register' => array(
				array(
					'id'          => 'username',
					'label'       => esc_html__( 'Choose a Username', 'th-login' ),
					'name'        => 'username',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Enter your desired username', 'th-login' ),
					'required'    => true,
					'icon'        => 'user',
					
				),
				array(
					'id'          => 'email',
					'label'       => esc_html__( 'Email Address', 'th-login' ),
					'name'        => 'email',
					'type'        => 'email',
					'placeholder' => esc_html__( 'Enter your email', 'th-login' ),
					'required'    => true,
					'icon'        => 'email',
					
				),
				array(
					'id'          => 'password',
					'label'       => esc_html__( 'Create Password', 'th-login' ),
					'name'        => 'password',
					'type'        => 'password',
					'placeholder' => esc_html__( 'Create a strong password', 'th-login' ),
					'required'    => true,
					'icon'        => 'lock',
					'check'		  => array( 'text'=> true, 'number'=> false, 'special_charcter'=> false ),
					'maxInput'    => 20,
					'minInput'    => 5,
				),
				array(
					'id'          => 'confirm_password',
					'label'       => esc_html__( 'Confirm Password', 'th-login' ),
					'name'        => 'confirm_password',
					'type'        => 'password',
					'placeholder' => esc_html__( 'Confirm your password', 'th-login' ),
					'required'    => true,
					'icon'        => 'lock',
					'logic_key' => 'confirm_password',
				),
				array(
					'id'          => 'first_name',
					'label'       => esc_html__( 'First Name', 'th-login' ),
					'name'        => 'first_name',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Your first name', 'th-login' ),
					'required'    => false,
					'icon'        => 'user',
					'show'        => false,
					
				),
				array(
					'id'          => 'last_name',
					'label'       => esc_html__( 'Last Name', 'th-login' ),
					'name'        => 'last_name',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Your last name', 'th-login' ),
					'required'    => false,
					'icon'        => 'user',
					'show'        => false,
					
				),
				array(
					'id'       => 'terms_and_conditions',
					'label'    => esc_html__( "I agree to the Terms & Conditions", 'th-login' ),
					'name'     => 'terms_and_conditions',
					'type'     => 'checkbox',
					'required' => true,
					'icon'     => '',
					'show'     => true,
					
				),
				array(
					'id'      => 'honeypot',
					'name'    => 'honeypot',
					'type'    => 'text',
					'label'   => '',
					'icon'    => '',
					'show'    => false,
					'hidden'  => true,
				),
			),
			'forgot_password' => array(
				array(
					'id'          => 'user_login',
					'label'       => esc_html__( 'Email Address', 'th-login' ),
					'name'        => 'user_login',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Enter your email to reset password', 'th-login' ),
					'required'    => true,
					'icon'        => 'email',
					
				),
			),
		);


		add_option( 'th_login_form_fields_settings', json_encode( $default_form_fields_settings ) );

		$default_display_triggers_settings = array(
			'trigger_css_class' => 'th-login-trigger',
			'auto_open_on_load' => array( 'enabled' => true, 'delay_seconds' => 2 ),
			'auto_open_on_scroll' => array( 'enabled' => false, 'scroll_percentage' => 50 ),
			'auto_open_on_exit_intent' => array( 'enabled' => false ),
			'auto_open_on_time_on_page' => array( 'enabled' => false, 'time_seconds' => 10 ),
			'auto_open_conditions' => array( // Ensure array.
				'for_logged_out_only' => true,
				'for_specific_roles' => array(), // Ensure array.
				'on_specific_pages' => array( 'enabled' => false, 'page_ids' => array(), 'page_slugs' => array() ), // Ensure array.
				'on_specific_categories' => array( 'enabled' => false, 'category_ids' => array(), 'category_slugs' => array() ), // Ensure array.
				'on_specific_tags' => array( 'enabled' => false, 'tag_ids' => array(), 'tag_slugs' => array() ), // Ensure array.
				'on_woocommerce_myaccount' => false,
				'on_woocommerce_checkout' => false,
				'device_visibility' => array( 'desktop' => true, 'tablet' => true, 'mobile' => true ), // Ensure array.
				'url_parameter_trigger' => array( 'enabled' => false, 'param_name' => 'th_login', 'param_value' => 'open' ), // Ensure array.
				'referrer_detection' => array( 'enabled' => false, 'referrer_urls' => array() ) // Ensure array.
			),
			'pop_up_frequency' => array( 'enabled' => false, 'type' => 'session', 'days' => 7 ), // Ensure array.
			'menu_integration' => array( // Ensure array.
				'enabled' => false, 'menu_slug' => 'primary',
				'item_text_login' => esc_html__( 'Login', 'th-login' ),
				'item_text_register' => esc_html__( 'Register', 'th-login' ),
				'item_icon_login' => 'dashicons-admin-users',
				'item_icon_register' => 'dashicons-plus-alt',
				'visibility_login_logged_in' => false,
				'visibility_register_logged_in' => false
			)
		);
		add_option( 'th_login_display_triggers_settings', json_encode( $default_display_triggers_settings ) );

		$default_security_settings = array(
			'brute_force_protection' => array( // Ensure array.
				'enabled' => true,
				'max_attempts' => 5,
				'lockout_duration_minutes' => 30,
				'auto_ip_blacklist_enabled' => true
			),
			'recaptcha' => array( // Ensure array.
				'enabled' => false,
				'type' => 'v2_checkbox',
				'site_key' => '',
				'secret_key' => ''
			),
			'honeypot_enabled' => true
		);
		add_option( 'th_login_security_settings', json_encode( $default_security_settings ) );

		// Ensure WordPress's default registration is enabled if plugin relies on it.
		if ( ! get_option( 'users_can_register' ) ) {
			// Add an admin notice to suggest enabling registration.
			add_action( 'admin_notices', function() {
				echo '<div class="notice notice-warning is-dismissible"><p>' . esc_html__( 'TH Login: User registration is currently disabled in WordPress settings. To allow new registrations via the plugin, please enable "Anyone can register" in Settings > General.', 'th-login' ) . '</p></div>';
			});
		}
	}

	/**
	 * Plugin deactivation callback.
	 */
	public function deactivate() {
		// Clean up temporary data if any.
	}

	/**
	 * Add settings link to the plugin actions.
	 *
	 * @param array $links Array of action links.
	 * @return array Modified array of action links.
	 */
	public function add_plugin_action_links( $links ) {
		$settings_link = '<a href="' . esc_url( admin_url( 'admin.php?page=th-login-settings' ) ) . '">' . esc_html__( 'Settings', 'th-login' ) . '</a>';
		array_unshift( $links, $settings_link );
		return $links;
	}
}

/**
 * Sets all TH Login plugin options to their default values.
 * This function can be called on activation or for a settings reset.
 */
function th_login_set_default_options() {
    // General Settings
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

 	// Design Settings (Simplified defaults for now, full customizer handles details)
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

    // Form Fields Settings
    $form_fields_defaults = array(
		'login' => array(
				array(
					'id'          => 'username',
					'label'       => esc_html__( 'Username or Email', 'th-login' ),
					'name'        => 'username',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Enter your username or email', 'th-login' ),
					'required'    => true,
					'icon'        => 'user',
					
				),
				array(
					'id'          => 'password',
					'label'       => esc_html__( 'Password', 'th-login' ),
					'name'        => 'password',
					'type'        => 'password',
					'placeholder' => esc_html__( 'Enter your password', 'th-login' ),
					'required'    => true,
					'icon'        => 'lock',
					
				),
				array(
					'id'       => 'remember_me',
					'label'    => esc_html__( 'Remember Me', 'th-login' ),
					'name'     => 'remember_me',
					'type'     => 'checkbox',
					'required' => false,
					'icon'     => '',
					'show'     => true,
	
				),
			),
			'register' => array(
				array(
					'id'          => 'username',
					'label'       => esc_html__( 'Choose a Username', 'th-login' ),
					'name'        => 'username',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Enter your desired username', 'th-login' ),
					'required'    => true,
					'icon'        => 'user',
					
				),
				array(
					'id'          => 'email',
					'label'       => esc_html__( 'Email Address', 'th-login' ),
					'name'        => 'email',
					'type'        => 'email',
					'placeholder' => esc_html__( 'Enter your email', 'th-login' ),
					'required'    => true,
					'icon'        => 'email',
					
				),
				array(
					'id'          => 'password',
					'label'       => esc_html__( 'Create Password', 'th-login' ),
					'name'        => 'password',
					'type'        => 'password',
					'placeholder' => esc_html__( 'Create a strong password', 'th-login' ),
					'required'    => true,
					'icon'        => 'lock',
					'check'=> array( 'text'=> true, 'number'=> false, 'special_charcter'=> false ),
					'maxInput'=> 20,
					'minInput'=> 5,
				),
				array(
					'id'          => 'confirm_password',
					'label'       => esc_html__( 'Confirm Password', 'th-login' ),
					'name'        => 'confirm_password',
					'type'        => 'password',
					'placeholder' => esc_html__( 'Confirm your password', 'th-login' ),
					'required'    => true,
					'icon'        => 'lock',
					
				),
				array(
					'id'          => 'first_name',
					'label'       => esc_html__( 'First Name', 'th-login' ),
					'name'        => 'first_name',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Your first name', 'th-login' ),
					'required'    => false,
					'icon'        => 'user',
					'show'        => false,
					
				),
				array(
					'id'          => 'last_name',
					'label'       => esc_html__( 'Last Name', 'th-login' ),
					'name'        => 'last_name',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Your last name', 'th-login' ),
					'required'    => false,
					'icon'        => 'user',
					'show'        => false,
					
				),
				array(
					'id'       => 'terms_and_conditions',
					'label'    => esc_html__( "I agree to the Terms & Conditions", 'th-login' ),
					'name'     => 'terms_and_conditions',
					'type'     => 'checkbox',
					'required' => true,
					'icon'     => '',
					'show'     => true,
					
				),
				array(
					'id'      => 'honeypot',
					'name'    => 'honeypot',
					'type'    => 'text',
					'label'   => '',
					'icon'    => '',
					'show'    => false,
					'hidden'  => true,
				),
			),
			'forgot_password' => array(
				array(
					'id'          => 'user_login',
					'label'       => esc_html__( 'Email Address', 'th-login' ),
					'name'        => 'user_login',
					'type'        => 'text',
					'placeholder' => esc_html__( 'Enter your email to reset password', 'th-login' ),
					'required'    => true,
					'icon'        => 'email',
					
				),
			),
    );
	
    update_option( 'th_login_form_fields_settings', json_encode( $form_fields_defaults ) );

    // Display Triggers Settings
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

    // Security Settings
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

// Call this function on plugin activation.
register_activation_hook( __FILE__, 'th_login_set_default_options' );

// Include the menu integration class.
require_once TH_LOGIN_PATH . 'includes/class-th-login-menu-integration.php';
// Instantiate the menu integration class.
new TH_Login_Menu_Integration();

// Include the Gutenberg block class.
require_once TH_LOGIN_PATH . 'includes/class-th-login-gutenberg-block.php';
// Instantiate the Gutenberg block class.
new TH_Login_Gutenberg_Block();

/**
 * Initialize the main plugin instance.
 */
function th_login_init() {
	return TH_Login::instance();
}
th_login_init();
