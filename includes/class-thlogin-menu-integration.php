<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class THLogin_Menu_Integration {

	public function __construct() {
		add_filter( 'wp_nav_menu_items', array( $this, 'add_login_register_logout_links' ), 10, 2 );
	}

	public function add_login_register_logout_links( $items, $args ) {
		$settings = get_option( 'thlogin_settings', [] );
		$display_settings = $settings['display_triggers'] ?? [];
		$menu_settings = $display_settings['menu_integration'] ?? [];

		if ( empty( $menu_settings['enabled'] ) ) return $items;

		// Handle menu matching
		$target_slug = $menu_settings['menu_slug'] ?? 'primary';
		if (
			'target_slug' !== 'all' &&
			isset( $args->theme_location ) &&
			$target_slug !== $args->theme_location &&
			( is_object( $args->menu ) && isset( $args->menu->slug ) && $target_slug !== $args->menu->slug )
		) {
			return $items;
		}

		$is_logged_in = is_user_logged_in();

		// Get text and icons from settings
		$login_text  = $menu_settings['item_text_login'] ?? __( 'Login', 'themehunk-login-registration' );
		$logout_text = $menu_settings['item_text_logout'] ?? __( 'Logout', 'themehunk-login-registration' );

		$login_icon  = thlogin_get_icon_svg( $menu_settings['item_icon_login'] ?? '' );
		$logout_icon = thlogin_get_icon_svg( $menu_settings['item_icon_logout'] ?? '' );

		$show_logout = ! empty( $menu_settings['logout'] );
		$hide_login_when_logged_in = ! empty( $menu_settings['visibility_login_logged_in'] );

		// Render menu item
		$html = '';

		if ( $is_logged_in ) {
			if ( $show_logout ) {
				$html .= '<li class="menu-item thlogin-menu-item thlogin-menu-item--logout">';
				$html .= '<a href="' . esc_url( wp_logout_url( home_url() ) ) . '">';
				if ( $logout_icon ) {
					$html .= wp_kses( $logout_icon, thlogin_get_allowed_svg_tags() );
				}
				$html .= esc_html($logout_text) . '</a></li>';
			}
		} else {
			if ( ! $hide_login_when_logged_in ) {
				$html .= '<li class="menu-item thlogin-menu-item thlogin-menu-item--login">';
				$html .= '<a href="#" class="thlogin-trigger" data-th-popup-action="login">';
				if ( $login_icon ) {
					$html .= wp_kses( $login_icon, thlogin_get_allowed_svg_tags() );
				}
				$html .= esc_html($login_text) . '</a></li>';
			}
		}

		return $items . $html;
	}
}
