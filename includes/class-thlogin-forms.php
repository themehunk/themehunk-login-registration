<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles core form processing logic for TH Login (login, registration, password reset)
 * and rendering of dynamic form fields.
 */
class THLogin_Forms {

	public function __construct() {
		// No direct actions hooked here yet, as this class will primarily provide
		// methods called by templates or AJAX handlers.
	}

	/**
	 * Safely decode JSON option.
	 *
	 * @param string $option_key The option key to retrieve.
	 * @param array  $default    The default value if the option is not found or invalid.
	 * @return array Decoded JSON as an associative array, or default.
	 */
	private function safe_json_option( $option_key, $default = array() ) {
		$value = get_option( $option_key ); // Get the raw value.

		// If the value is not a string, or is an empty string, treat it as an empty JSON object.
		if ( ! is_string( $value ) || empty( $value ) ) {
			$value = '{}';
		}

		$decoded = json_decode( $value, true );
		// Ensure the result is an array, otherwise return the provided default.
		return is_array( $decoded ) ? $decoded : $default;
	}

	/**
	 * Renders custom registration fields.
	 */
	public function render_custom_registration_fields() {
		$form_fields_settings = $this->safe_json_option( 'thlogin_form_fields_settings' );
		$custom_fields = $form_fields_settings['register']['custom_fields'] ?? array();

		if ( empty( $custom_fields ) || ! is_array( $custom_fields ) ) {
			return; // No custom fields to render.
		}

		foreach ( $custom_fields as $field ) {
			$field_id = sanitize_key( $field['id'] ?? '' );
			$field_type = sanitize_text_field( $field['type'] ?? 'text' );
			$field_label = sanitize_text_field( $field['label'] ?? '' );
			$field_placeholder = sanitize_text_field( $field['placeholder'] ?? '' );
			$is_required = rest_sanitize_boolean( $field['required'] ?? false );

			if ( empty( $field_id ) || empty( $field_label ) ) {
				continue; // Skip invalid field definitions.
			}

			$required_attr = $is_required ? 'required' : '';

			echo '<p class="thlogin-form-field thlogin-custom-field thlogin-custom-field--' . esc_attr( $field_type ) . '">';
			echo '<label for="th-register-custom-' . esc_attr( $field_id ) . '">' . esc_html( $field_label );
			if ( $is_required ) {
				echo ' <span class="thlogin-required-asterisk">*</span>';
			}
			echo '</label>';

			switch ( $field_type ) {
				case 'text':
				case 'email':
				case 'url':
				case 'number':
					echo '<input type="' . esc_attr( $field_type ) . '" name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" placeholder="' . esc_attr( $field_placeholder ) . '" ' . $required_attr . '>';
					break;
				case 'textarea':
					echo '<textarea name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" placeholder="' . esc_attr( $field_placeholder ) . '" ' . $required_attr . '></textarea>';
					break;
				case 'checkbox':
					echo '<input type="checkbox" name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" value="1" ' . $required_attr . '>';
					break;
				case 'select':
					$options = $field['options'] ?? array();
					echo '<select name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" ' . $required_attr . '>';
					echo '<option value="">' . esc_html__( 'Select an option', 'thlogin' ) . '</option>';
					foreach ( $options as $option_value ) {
						echo '<option value="' . esc_attr( $option_value ) . '">' . esc_html( $option_value ) . '</option>';
					}
					echo '</select>';
					break;
				// Add more field types (e.g., radio, date) as needed.
				default:
					// Fallback for unknown types.
					echo '<input type="text" name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" placeholder="' . esc_attr( $field_placeholder ) . '" ' . $required_attr . '>';
					break;
			}
			
			echo '</p>';
		}
	}

	/**
	 * Processes form submissions (login, register, forgot password).
	 * This method is primarily for internal use by REST API callbacks, not direct action hooks.
	 *
	 * @param string $form_type The type of form being submitted ('login', 'register', 'forgot-password').
	 * @param array  $data      The sanitized data from the form submission.
	 * @return array A result array with 'success' (bool) and 'message' (string), and optional 'redirect_url'.
	 */
	public function process_form_submission( $form_type, $data ) {
		// This method will contain the core logic for processing each form type.
		// For now, the REST API endpoints directly call WP functions.
		// In a more structured approach, the REST API callbacks would call methods here.
		// Example:
		// if ( 'login' === $form_type ) {
		//     return $this->handle_login_logic( $data );
		// }
		// ...
		return array( 'success' => false, 'message' => esc_html__( 'Form processing not fully implemented here.', 'thlogin' ) );
	}
}