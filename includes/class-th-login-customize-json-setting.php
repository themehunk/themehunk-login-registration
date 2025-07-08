<?php
/**
 * Customizer Setting for handling properties within a JSON string option.
 * This allows individual controls to modify specific parts of a single JSON option.
 */
if ( ! class_exists( 'TH_Login_Customize_JSON_Setting' ) && class_exists( 'WP_Customize_Setting' ) ) {
	class TH_Login_Customize_JSON_Setting extends WP_Customize_Setting {

		public $type = 'th_login_json'; // Custom setting type.
		public $json_property = ''; // Path to the property within the JSON (e.g., 'modal.overlay_color').

		/**
		 * Constructor.
		 *
		 * @param WP_Customize_Manager $manager Customizer instance.
		 * @param string               $id      Setting ID.
		 * @param array                $args    Arguments.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );

			// Ensure json_property is set.
			if ( isset( $args['json_property'] ) ) {
				$this->json_property = $args['json_property'];
			} else {
				// This should ideally not happen if controls are set up correctly.
				error_log( sprintf( 'TH_Login_Customize_JSON_Setting: json_property not set for setting ID %s', $id ) );
			}

			// The 'option_type' should be 'option' for this to work correctly with get_option/update_option.
			$this->option_type = 'option';
		}

		/**
		 * Get the value of this setting (which is a specific property within the main JSON option).
		 *
		 * @return mixed The value of the specific JSON property.
		 */
		public function value() {
			// Get the entire JSON string from the main option (e.g., 'th_login_design_settings').
			// The ID of this setting instance (e.g., 'th_login_modal_overlay_color_setting') is not the option key.
			// The actual option key is 'th_login_design_settings'.
			$all_settings_json = get_option( 'th_login_design_settings', '{}' );
			$all_settings_array = json_decode( $all_settings_json, true );

			// Get the nested property using the json_property path.
			$value = $this->get_nested_property( $all_settings_array, $this->json_property );

			// If value is null, convert to empty string for text inputs to avoid 'null' string.
			// This matches how WP_Customize_Control::value() often behaves for empty values.
			if ( is_null( $value ) ) {
				return '';
			}

			return $value;
		}

		/**
		 * Update the value of this setting (which means updating a specific property
		 * within the main JSON option and then saving the entire JSON string).
		 *
		 * @param mixed $value The new value for the specific JSON property.
		 * @return bool True if the option was updated, false otherwise.
		 */
		protected function update( $value ) {
			// Get the current entire JSON string from the main option.
			$all_settings_json = get_option( 'th_login_design_settings', '{}' );
			$all_settings_array = json_decode( $all_settings_json, true );

			// Update the nested property with the new value.
			$updated_settings_array = $this->set_nested_property( $all_settings_array, $this->json_property, $value );

			// Sanitize the entire array before re-encoding and saving.
			// This is where you'd call your main plugin's sanitization function if it's external.
			// For now, we'll assume the value coming in is already sanitized by the control's own sanitization.
			// A more robust approach would be to pass the entire array through the main plugin's sanitization.
			$sanitized_updated_settings_array = $updated_settings_array; // Placeholder, ideally call a global sanitizer.

			// Re-encode the entire array back to JSON.
			$new_all_settings_json = json_encode( $sanitized_updated_settings_array );

			// Save the entire JSON string back to the main option.
			return update_option( 'th_login_design_settings', $new_all_settings_json );
		}

		/**
		 * Helper function to get a nested property from an array.
		 *
		 * @param array  $array The array to search.
		 * @param string $path  The dot-separated path (e.g., 'modal.overlay_color').
		 * @return mixed The value or null if not found.
		 */
		protected function get_nested_property( $array, $path ) {
			if ( empty( $array ) || ! is_array( $array ) ) {
				return null;
			}

			$keys = explode( '.', $path );
			$current = $array;

			foreach ( $keys as $key ) {
				if ( ! is_array( $current ) || ! isset( $current[ $key ] ) ) {
					return null;
				}
				$current = $current[ $key ];
			}
			return $current;
		}

		/**
		 * Helper function to set a nested property in an array.
		 * Creates intermediate arrays if they don't exist.
		 *
		 * @param array  $array The array to modify.
		 * @param string $path  The dot-separated path (e.g., 'modal.overlay_color').
		 * @param mixed  $value The value to set.
		 * @return array The modified array.
		 */
		protected function set_nested_property( $array, $path, $value ) {
			$keys = explode( '.', $path );
			$current = &$array; // Use reference to modify the original array.

			foreach ( $keys as $i => $key ) {
				if ( $i === count( $keys ) - 1 ) {
					// Last key, set the value.
					$current[ $key ] = $value;
				} else {
					// Not the last key, ensure it's an array/object.
					if ( ! isset( $current[ $key ] ) || ! is_array( $current[ $key ] ) ) {
						$current[ $key ] = array();
					}
					$current = &$current[ $key ];
				}
			}
			return $array; // Return the modified array.
		}
	}
}
