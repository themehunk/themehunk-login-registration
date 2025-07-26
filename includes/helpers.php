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
if ( ! function_exists( 'thlogin_get_option' ) ) {
	function thlogin_get_option( $section_key, $setting_key = null, $default_value = null ) {
		$settings = get_option( 'thlogin_settings', [] );

		if ( ! is_array( $settings ) ) {
			return $default_value;
		}

		$section = $settings[ $section_key ] ?? [];

		if ( null === $setting_key ) {
			return $section; // Return full section
		}

		return $section[ $setting_key ] ?? $default_value;
	}
}


/**
 * Retrieve the SVG markup for a given icon name.
 *
 * @param string $icon_name The icon key name (e.g., 'user', 'email').
 * @return string SVG markup or empty string if not found.
 */
if ( ! function_exists( 'thlogin_get_icon_svg' ) ) {
	function thlogin_get_icon_svg( $icon_name ) {
		static $icons;

		if ( ! $icons ) {
			$icons = require THLOGIN_PATH . 'includes/helpers/icons.php';
		}

		return isset( $icons[ $icon_name ] ) ? $icons[ $icon_name ] : '';
	}
}


if ( ! function_exists( 'thlogin_get_icon_svg_data_uri' ) ) {
function thlogin_get_icon_svg_data_uri($icon) {
    $svg = thlogin_get_icon_svg($icon);
    if (empty($svg)) return '';
    return "url('data:image/svg+xml," . rawurlencode($svg) . "')";
}

if ( ! function_exists( 'thlogin_get_allowed_svg_tags' ) ) {
function thlogin_get_allowed_svg_tags() {
	return [
		'svg'  => [
			'xmlns'       => true,
			'width'       => true,
			'height'      => true,
			'viewBox'     => true,
			'fill'        => true,
			'stroke'      => true,
			'class'       => true,
			'aria-hidden' => true,
			'role'        => true,
			'focusable'   => true,
		],
		'path' => [
			'd'           => true,
			'fill'        => true,
			'stroke'      => true,
			'stroke-width'=> true,
			'stroke-linecap' => true,
			'stroke-linejoin'=> true,
		],
		'g'    => [
			'fill'   => true,
			'stroke' => true,
			'class'  => true,
		],
	];
}
}


}