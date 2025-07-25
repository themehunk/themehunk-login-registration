<?php
/**
 * Plugin Name:       TH Login
 * Plugin URI:        https://themehunk.com/thlogin
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

define( 'THLOGIN_VERSION', '1.0.0' );
define( 'THLOGIN_FILE', __FILE__ );
define( 'THLOGIN_PATH', plugin_dir_path( THLOGIN_FILE ) );
define( 'THLOGIN_URL', plugin_dir_url( THLOGIN_FILE ) );
define( 'THLOGIN_BASENAME', plugin_basename( THLOGIN_FILE ) );

final class THLogin {

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
		register_activation_hook( THLOGIN_FILE, array( $this, 'activate' ) );
		register_deactivation_hook( THLOGIN_FILE, array( $this, 'deactivate' ) );
		add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
	}

	private function includes() {
		require_once THLOGIN_PATH . 'includes/class-thlogin-admin.php';
		require_once THLOGIN_PATH . 'includes/class-thlogin-frontend.php';
		require_once THLOGIN_PATH . 'includes/class-thlogin-shortcodes.php';
		require_once THLOGIN_PATH . 'includes/class-thlogin-security.php';
		require_once THLOGIN_PATH . 'includes/class-thlogin-rest-api.php';
		require_once THLOGIN_PATH . 'includes/class-thlogin-forms.php';
		require_once THLOGIN_PATH . 'includes/class-thlogin-integrations.php';
		require_once THLOGIN_PATH . 'includes/helpers.php';
		require_once THLOGIN_PATH . 'includes/helpers/class-thlogin-defaults.php';
	}

	public function init_plugin() {
		load_plugin_textdomain( 'th-login', false, dirname( THLOGIN_BASENAME ) . '/languages' );

		new THLogin_Admin();
		new THLogin_Frontend();
		new THLogin_Shortcodes();
		new THLogin_Security();
		new THLogin_REST_API();
		new THLogin_Forms();
		new THLogin_Integrations();

		add_filter( 'plugin_action_links_' . THLOGIN_BASENAME, array( $this, 'add_plugin_action_links' ) );
	}

	public function activate() {
		THLogin_Defaults::set_all_defaults();
	}

	public function deactivate() {
		// Clean up temporary data if any.
	}

	public function add_plugin_action_links( $links ) {
		$settings_link = '<a href="' . esc_url( admin_url( 'admin.php?page=thlogin-settings' ) ) . '">' . esc_html__( 'Settings', 'th-login' ) . '</a>';
		array_unshift( $links, $settings_link );
		return $links;
	}
}

function thlogin_set_default_options() {
	THLogin_Defaults::set_all_defaults();
}

register_activation_hook( __FILE__, 'thlogin_set_default_options' );

require_once THLOGIN_PATH . 'includes/class-thlogin-menu-integration.php';
new THLogin_Menu_Integration();

function thlogin_init() {
	return THLogin::instance();
}

thlogin_init();
