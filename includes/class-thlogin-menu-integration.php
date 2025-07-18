<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles integration of Login/Register/Logout links into WordPress navigation menus.
 */
class THLogin_Menu_Integration {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'wp_nav_menu_items', array( $this, 'add_login_register_logout_links' ), 10, 2 );
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
	 * Adds Login, Register, and Logout links to navigation menus.
	 *
	 * @param string   $items The HTML list of the current menu items.
	 * @param stdClass $args  An object containing wp_nav_menu() arguments.
	 * @return string Modified HTML list of menu items.
	 */
	public function add_login_register_logout_links( $items, $args ) {
		$display_triggers_settings = $this->safe_json_option( 'thlogin_display_triggers_settings' );
		$menu_integration_settings = $display_triggers_settings['menu_integration'] ?? array();

		if ( ! ( $menu_integration_settings['enabled'] ?? false ) ) {
			return $items; // Feature not enabled.
		}

		$target_menu_slug = $menu_integration_settings['menu_slug'] ?? 'primary';

		// Check if this is the targeted menu.
		if ( 'all' !== $target_menu_slug && $target_menu_slug !== $args->theme_location && $target_menu_slug !== $args->menu->slug ) {
			return $items;
		}

		$login_text    = $menu_integration_settings['item_text_login'] ?? esc_html__( 'Login', 'thlogin' );
		$register_text = $menu_integration_settings['item_text_register'] ?? esc_html__( 'Register', 'thlogin' );
		$login_icon    = $menu_integration_settings['item_icon_login'] ?? 'dashicons-admin-users';
		$register_icon = $menu_integration_settings['item_icon_register'] ?? 'dashicons-plus-alt';
		$hide_login_if_logged_in = $menu_integration_settings['visibility_login_logged_in'] ?? false;
		$hide_register_if_logged_in = $menu_integration_settings['visibility_register_logged_in'] ?? false;

		$login_link_html    = '';
		$register_link_html = '';
		$logout_link_html   = '';

		if ( is_user_logged_in() ) {
			// Add Logout link.
			$logout_url = wp_logout_url( home_url() ); // Redirect to home after logout.
			$logout_text = esc_html__( 'Logout', 'thlogin' );
			$logout_icon = 'dashicons-admin-users'; // Default icon for logout.

			$logout_link_html = '<li class="menu-item thlogin-menu-item thlogin-menu-item--logout">';
			$logout_link_html .= '<a href="' . esc_url( $logout_url ) . '">';
			if ( ! empty( $logout_icon ) ) {
				$logout_link_html .= '<span class="dashicons ' . esc_attr( $logout_icon ) . '"></span> ';
			}
			$logout_link_html .= esc_html( $logout_text );
			$logout_link_html .= '</a></li>';

			// Hide Login/Register if user is logged in and setting is enabled.
			if ( $hide_login_if_logged_in ) {
				$login_link_html = '';
			}
			if ( $hide_register_if_logged_in ) {
				$register_link_html = '';
			}

		} else {
			// Add Login link.
			$login_link_html = '<li class="menu-item thlogin-menu-item thlogin-menu-item--login">';
			$login_link_html .= '<a href="#" class="thlogin-trigger" data-th-popup-action="login">';
			if ( ! empty( $login_icon ) ) {
				$login_link_html .= '<span class="dashicons ' . esc_attr( $login_icon ) . '"></span> ';
			}
			$login_link_html .= esc_html( $login_text );
			$login_link_html .= '</a></li>';

			// Add Register link.
			if ( get_option( 'users_can_register' ) ) {
				$register_link_html = '<li class="menu-item thlogin-menu-item thlogin-menu-item--register">';
				$register_link_html .= '<a href="#" class="thlogin-trigger" data-th-popup-action="register">';
				if ( ! empty( $register_icon ) ) {
					$register_link_html .= '<span class="dashicons ' . esc_attr( $register_icon ) . '"></span> ';
				}
				$register_link_html .= esc_html( $register_text );
				$register_link_html .= '</a></li>';
			}
		}

		// Append links to the existing menu items.
		// You can adjust the order as needed.
		$items .= $login_link_html;
		$items .= $register_link_html;
		$items .= $logout_link_html;

		return $items;
	}
}
