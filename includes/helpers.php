<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * General utility functions for TH Login plugin.
 */

// Example helper function:
if ( ! function_exists( 'th_login_get_option' ) ) {
	/**
	 * Retrieves a plugin option.
	 *
	 * @param string $option_key The main option key (e.g., 'general', 'design').
	 * @param string $setting_key The specific setting key within the option.
	 * @param mixed  $default_value The default value if the setting is not found.
	 * @return mixed The option value.
	 */
	function th_login_get_option( $option_key, $setting_key = null, $default_value = null ) {
		$options = json_decode( get_option( 'th_login_' . $option_key . '_settings', '{}' ), true );

		if ( null === $setting_key ) {
			return $options; // Return the entire option array.
		}

		return isset( $options[ $setting_key ] ) ? $options[ $setting_key ] : $default_value;
	}
}

// Add other helper functions as needed.
