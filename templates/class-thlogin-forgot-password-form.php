<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

require_once THLOGIN_PATH . 'templates/parts/form-header.php';

class THLogin_Forgot_Password_Form {
	protected $settings;
	protected $fields;
	protected $layout;

	public function __construct() {
		$this->settings = get_option('thlogin_settings', []);
		$this->fields = $this->settings['form_fields']['forgot_password'] ?? [];
		$this->layout = $this->settings['design']['modal']['modal_input_layout'] ?? 'stack';
	}

	public function render() {
		$security = $this->settings['security'] ?? [];
		$design = $this->settings['design'] ?? [];
		$submit_text = $design['submitButton']['forgot_password'] ?? esc_html__('Reset', 'th-login');

        $logo = $design['logo'] ?? [];
        $logo_url = !empty($logo['url']) ? esc_url($logo['url']) : '';
        $logo_size = !empty($logo['size']) ? esc_attr($logo['size']) : '30px';

		echo '<div class="thlogin-form thlogin-form--forgot-password" data-form-type="forgot-password" style="display: none;">';
		echo wp_kses_post( thlogin_render_form_header() );

		/**
		 * Hook: thlogin_before_forgot_password_form
		 */
		do_action('thlogin_before_forgot_password_form');

		echo '<form class="thlogin-ajax-form th-login-from-feilds-combine" data-form-type="forgot-password">';
		echo '<div class="thlogin-messages" aria-live="polite"></div>';


		if ( $logo_url ) {
			echo '<div class="thlogin-form-logo">';
				echo '<div class="thlogin-form-logo-wrapper">';
					echo '<img 
						src="' . esc_url( $logo_url ) . '" 
						alt="' . esc_attr__( 'Logo', 'th-login' ) . '" 
						class="thlogin-form-logo" 
						style="height:' . esc_attr( $logo_size ) . ';max-height:' . esc_attr( $logo_size ) . ';object-fit:cover;" 
					/>';
				echo '</div>';
				echo '<h3>' . esc_html__( 'Reset Password', 'th-login' ) . '</h3>';
			echo '</div>';
		} else {
			echo '<h3>' . esc_html__( 'Reset Password', 'th-login' ) . '</h3>';
		}


		foreach ($this->fields as $field) {
			if (!empty($field['hidden'])) continue;

			$type = sanitize_text_field($field['type'] ?? 'text');
			$name = sanitize_text_field($field['name'] ?? '');
			$id = sanitize_html_class($field['id'] ?? 'field_' . uniqid());
			$label = sanitize_text_field($field['label'] ?? '');
			$placeholder = sanitize_text_field($field['placeholder'] ?? '');
			$required = !empty($field['required']);
			$icon = sanitize_text_field($field['icon'] ?? '');

			// Only include email or username fields
			if (stripos($name, 'email') === false && stripos($name, 'user') === false) continue;

			$autocomplete = stripos($name, 'email') !== false ? 'email' : 'username';

			$icon_position = $design['icon']['icon_position'] ?? 'with-label';
			$show_icon_in_label = $icon && $icon_position === 'with-label';
			$show_icon_in_input = $icon && $icon_position === 'inside-input';

			$field_class = 'thlogin-form-field';
			if ($this->layout === 'stack') $field_class .= ' thlogin-layout-stack';
			elseif ($this->layout === 'inline') $field_class .= ' thlogin-layout-inline';
			elseif ($this->layout === 'floating') $field_class .= ' thlogin-layout-floating';
			else if ($this->layout === 'placehold') {
				$field_class .= ' thlogin-layout-floating';
			}

			$this->render_field([
				'type' => $type,
				'name' => $name,
				'id' => $id,
				'label' => $label,
				'placeholder' => $placeholder,
				'required' => $required,
				'icon' => $icon,
				'autocomplete' => $autocomplete,
				'show_icon_in_label' => $show_icon_in_label,
				'show_icon_in_input' => $show_icon_in_input,
				'field_class' => $field_class,
			]);
		}

		// Honeypot
		if (!empty($security['honeypot_enabled'])) {
			echo '<p class="thlogin-form-field thlogin-form-field--honeypot" style="display: none;">';
				echo '<label for="thlogin_hp">' . esc_html__('Leave this field empty', 'th-login') . '</label>';
				echo '<input type="text" name="thlogin_hp" id="thlogin_hp" tabindex="-1" autocomplete="off">';
			echo '</p>';
		}

		echo '<p class="thlogin-form-submit">';
            echo '<button type="submit" class="thlogin-button thlogin-button--primary">' . esc_html($submit_text) . '</button>';
		echo '</p>';

		echo '<p class="thlogin-form-links">';
			echo '<a href="#" class="thlogin-link" data-th-popup-action="login">' . esc_html__('Back to Login', 'th-login') . '</a>';
		echo '</p>';

		echo '</form>';

		/**
		 * Hook: thlogin_after_forgot_password_form
		 */
		do_action('thlogin_after_forgot_password_form');
		
		echo '</div>';
	}

	protected function render_field($args) {
		extract($args); // for cleaner access

		if (in_array($this->layout, ['floating', 'placehold'], true)) {
			echo '<div class="' . esc_attr($field_class) . '">';
			echo '<div class="floating-wrapper layout-' . esc_attr($this->layout) . ' ' . ($show_icon_in_input ? 'icon-activated-input-wrapper' : '') . '">';
			echo '<input class="floating-input ' . ($show_icon_in_input ? 'icon-activated-input' : '') . '"'
				. ($show_icon_in_input ? ' style="background-image: ' . esc_attr(thlogin_get_icon_svg_data_uri($icon)) . ';"' : '')
				. ' type="' . esc_attr($type) . '" name="' . esc_attr($name) . '" id="' . esc_attr($id) . '" placeholder=" "'
				. ($required ? ' required' : '')
				. ' autocomplete="' . esc_attr($autocomplete) . '">';
			echo '<label for="' . esc_attr($id) . '" class="floating-label">' . esc_html($label);
			if ($required) echo '<span class="th-required">*</span>';
			echo '</label></div></div>';
		} else {
			echo '<p class="' . esc_attr($field_class) . '">';
			echo '<label for="' . esc_attr($id) . '" class="thlogin-label-with-icon">';
			if ($show_icon_in_label) {
				echo '<span class="thlogin-label-icon">' . wp_kses(thlogin_get_icon_svg($icon), thlogin_get_allowed_svg_tags()) . '</span>';
			}
			echo '<span class="thlogin-label-text">' . esc_html($label);
			if ($required) echo '<span class="th-required">*</span>';
			echo '</span></label>';

			echo '<input class="' . ($show_icon_in_input ? 'icon-activated-input' : '') . '"'
				. ($show_icon_in_input ? ' style="background-image: ' . esc_attr(thlogin_get_icon_svg_data_uri($icon)) . ';"' : '')
				. ' type="' . esc_attr($type) . '" name="' . esc_attr($name) . '" id="' . esc_attr($id) . '" placeholder="' . esc_attr($placeholder) . '"'
				. ($required ? ' required' : '')
				. ' autocomplete="' . esc_attr($autocomplete) . '">';
			echo '</p>';
		}
	}
}
