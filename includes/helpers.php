<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * General utility functions for TH Login plugin.
 */

/**
 * Retrieves a plugin option.
 *
 * @param string $option_key     The main option key (e.g., 'general', 'design').
 * @param string|null $setting_key The specific setting key within the option.
 * @param mixed  $default_value The default value if the setting is not found.
 * @return mixed The option value or default.
 */
if ( ! function_exists( 'th_login_get_option' ) ) {
	function th_login_get_option( $option_key, $setting_key = null, $default_value = null ) {
		$options = json_decode( get_option( 'th_login_' . $option_key . '_settings', '{}' ), true );

		if ( null === $setting_key ) {
			return $options; // Return the entire option array.
		}

		return isset( $options[ $setting_key ] ) ? $options[ $setting_key ] : $default_value;
	}
}

/**
 * Retrieve the SVG markup for a given icon name.
 *
 * @param string $icon_name The icon key name (e.g., 'user', 'email').
 * @return string SVG markup or empty string if not found.
 */
if ( ! function_exists( 'th_login_get_icon_svg' ) ) {
	function th_login_get_icon_svg( $icon_name ) {
		static $icons;

		if ( ! $icons ) {
			$icons = require TH_LOGIN_PATH . 'includes/helpers/icons.php';
		}

		return isset( $icons[ $icon_name ] ) ? $icons[ $icon_name ] : '';
	}
}
