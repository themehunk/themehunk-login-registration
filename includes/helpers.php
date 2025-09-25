<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * General utility functions for TH Login plugin.
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
	function thlogin_get_icon_svg_data_uri( $icon ) {
		$svg = thlogin_get_icon_svg( $icon );

		if ( empty( $svg ) ) {
			return '';
		}

		$settings = get_option( 'thlogin_settings', [] );
		$color    = ! empty( $settings['design']['icon']['color'] ) ? $settings['design']['icon']['color'] : '#999';

		$has_stroke = stripos( $svg, 'stroke=' ) !== false;
		$has_fill   = stripos( $svg, 'fill=' ) !== false;

		$has_fill_none = preg_match( '/fill=["\']none["\']/i', $svg );

		if ( $has_stroke && ( ! $has_fill || $has_fill_none ) ) {
			// Remove stroke and inject stroke color, preserve fill="none"
			$svg = preg_replace( '/\sstroke="[^"]*"/i', '', $svg );
			$svg = preg_replace(
				'/<svg([^>]*)>/i',
				'<svg$1 stroke="' . esc_attr( $color ) . '">',
				$svg
			);
		} elseif ( $has_fill && ! $has_stroke && ! $has_fill_none ) {
			// Remove fill and inject fill color
			$svg = preg_replace( '/\sfill="[^"]*"/i', '', $svg );
			$svg = preg_replace(
				'/<svg([^>]*)>/i',
				'<svg$1 fill="' . esc_attr( $color ) . '">',
				$svg
			);
		}
		// else: keep original if both fill+stroke or anything complex

		return "url('data:image/svg+xml," . rawurlencode( $svg ) . "')";
	}
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