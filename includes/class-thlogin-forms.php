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

	public function render_custom_registration_fields() {
		$all_settings = get_option( 'thlogin_settings', array() );
		$form_fields_settings = $all_settings['form_fields'] ?? array();
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
					echo '<input type="' . esc_attr( $field_type ) . '" name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" placeholder="' . esc_attr( $field_placeholder ) . '" ' . esc_attr( $required_attr ) . '>';
					break;
				case 'textarea':
					echo '<textarea name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" placeholder="' . esc_attr( $field_placeholder ) . '" ' . esc_attr( $required_attr ) . '></textarea>';
					break;
				case 'checkbox':
					echo '<input type="checkbox" name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" value="1" ' . esc_attr( $required_attr ) . '>';
					break;
				case 'select':
					$options = $field['options'] ?? array();
					echo '<select name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" ' . esc_attr( $required_attr ) . '>';
					echo '<option value="">' . esc_html__( 'Select an option', 'th-login' ) . '</option>';
					foreach ( $options as $option_value ) {
						echo '<option value="' . esc_attr( $option_value ) . '">' . esc_html( $option_value ) . '</option>';
					}
					echo '</select>';
					break;
				// Add more field types (e.g., radio, date) as needed.
				default:
					// Fallback for unknown types.
					echo '<input type="text" name="' . esc_attr( $field_id ) . '" id="th-register-custom-' . esc_attr( $field_id ) . '" placeholder="' . esc_attr( $field_placeholder ) . '" ' . esc_attr( $required_attr ) . '>';
					break;
			}
			
			echo '</p>';
		}
	}

	public function process_form_submission( $form_type, $data ) {
		// This method will contain the core logic for processing each form type.
		// For now, the REST API endpoints directly call WP functions.
		// In a more structured approach, the REST API callbacks would call methods here.
		// Example:
		// if ( 'login' === $form_type ) {
		//     return $this->handle_login_logic( $data );
		// }
		// ...
		return array( 'success' => false, 'message' => esc_html__( 'Form processing not fully implemented here.', 'th-login' ) );
	}
}