<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once THLOGIN_PATH . 'templates/parts/form-header.php';

class THLogin_Register_Form {
	protected $settings;
	protected $fields;
	protected $layout;

	public function __construct() {
		$this->settings = get_option( 'thlogin_settings', [] );
		$this->fields   = $this->settings['form_fields']['register'] ?? [];
		$this->layout   = $this->settings['design']['modal']['modal_input_layout'] ?? 'stack';
	}

	public function render() {
		if ( ! get_option( 'users_can_register' ) ) {
			return;
		}

		$security = $this->settings['security'] ?? [];
		$design   = $this->settings['design'] ?? [];
		$submit_text = $design['submitButton']['register'] ?? esc_html__('Register', 'th-login');

		echo '<div class="thlogin-form thlogin-form--register" data-form-type="register" style="display: none;">';
		echo thlogin_render_form_header();

		/**
		 * Hook: thlogin_before_register_form
		 */
		do_action( 'thlogin_before_register_form' );

		echo '<form class="thlogin-ajax-form th-login-from-feilds-combine" data-form-type="register">';
			echo '<div class="thlogin-messages" aria-live="polite"></div>';
		echo '<h3>' . esc_html__( 'Register', 'th-login' ) . '</h3>';

		foreach ( $this->fields as $field ) {
			if ( ! ( $field['show'] ?? true ) || ( $field['hidden'] ?? false ) ) {
				continue;
			}

			$this->render_field( $field, $design );
		}

		if ( ! empty( $security['honeypot_enabled'] ) ) {
			echo '<p class="thlogin-form-field thlogin-form-field--honeypot" style="display: none;">';
				echo '<label for="thlogin_hp">' . esc_html__( 'Leave this field empty', 'th-login' ) . '</label>';
				echo '<input type="text" name="thlogin_hp" id="thlogin_hp" tabindex="-1" autocomplete="off">';
			echo '</p>';
		}

		$this->render_recaptcha( $security );

		echo '<p class="thlogin-form-submit">';
            echo '<button type="submit" class="thlogin-button thlogin-button--primary">' . esc_html($submit_text) . '</button>';
		echo '</p>';

		echo '<p class="thlogin-form-links">';
			echo '<a href="#" class="thlogin-link" data-th-popup-action="login">' . esc_html__( 'Already have an account? Log In', 'th-login' ) . '</a>';
		echo '</p>';

		echo '</form>';

		/**
		 * Hook: thlogin_after_register_form
		 */
		do_action( 'thlogin_after_register_form' );

		echo '</div>';

		if ( ! empty( $security['recaptcha']['enabled'] ) && $security['recaptcha']['type'] === 'v2_checkbox' ) {
			echo '<script src="https://www.google.com/recaptcha/api.js" async defer></script>';
		}
	}

	protected function render_field( $field, $design ) {
		$id          = sanitize_key( $field['id'] ?? '' );
		$label       = sanitize_text_field( $field['label'] ?? '' );
		$name        = sanitize_key( $field['name'] ?? $id );
		$type        = sanitize_text_field( $field['type'] ?? 'text' );
		$placeholder = sanitize_text_field( $field['placeholder'] ?? '' );
		$required    = ! empty( $field['required'] );
		$icon        = sanitize_text_field( $field['icon'] ?? '' );

		$icon_position       = $design['icon']['icon_position'] ?? 'with-label';
		$show_icon_in_label  = $icon && $icon_position === 'with-label';
		$show_icon_in_input  = $icon && $icon_position === 'inside-input';

		$autocomplete = '';
		if ( $type === 'password' ) {
			$autocomplete = 'new-password';
		} elseif ( $type === 'email' ) {
			$autocomplete = 'email';
		}

		$field_class = 'thlogin-form-field';
		if ( $this->layout === 'stack' ) {
			$field_class .= ' thlogin-layout-stack';
		} elseif ( $this->layout === 'inline' ) {
			$field_class .= ' thlogin-layout-inline';
		} elseif ( $this->layout === 'floating' ) {
			$field_class .= ' thlogin-layout-floating';
		}else if ($this->layout === 'placehold') {
			$field_class .= ' thlogin-layout-floating';
		}

		if ( $type === 'checkbox' && strpos( strtolower( $name ), 'terms' ) !== false ) {
			$this->render_terms_checkbox( $field );
			return;
		}

		// Floating layout
		if ( in_array($this->layout, ['floating', 'placehold'], true)) {
			echo '<div class="' . esc_attr( $field_class ) . '">';
			echo '<div class="floating-wrapper layout-' . esc_attr($this->layout) . ' ' . ($show_icon_in_input ? 'icon-activated-input-wrapper' : '') . '">';
			echo '<input class="floating-input ' . ( $show_icon_in_input ? 'icon-activated-input' : '' ) . '"'
				. ( $show_icon_in_input ? ' style="background-image: ' . esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ) . ';"' : '' )
				. ' type="' . esc_attr( $type ) . '" name="' . esc_attr( $name ) . '" id="th-register-' . esc_attr( $id ) . '" placeholder=" "'
				. ( $required ? ' required' : '' )
				. ( $autocomplete ? ' autocomplete="' . esc_attr( $autocomplete ) . '"' : '' )
				. ' />';
			echo '<label for="th-register-' . esc_attr( $id ) . '" class="floating-label">' . esc_html( $label );
			if ( $required ) echo '<span class="th-required">*</span>';
			echo '</label></div></div>';
		} else {
			echo '<p class="' . esc_attr( $field_class ) . '">';
			echo '<label for="th-register-' . esc_attr( $id ) . '" class="thlogin-label-with-icon">';
			if ( $show_icon_in_label ) {
				echo '<span class="thlogin-label-icon">' . wp_kses( thlogin_get_icon_svg( $icon ), thlogin_get_allowed_svg_tags() ) . '</span>';
			}
			echo '<span class="thlogin-label-text">' . esc_html( $label );
			if ( $required ) echo '<span class="th-required">*</span>';
			echo '</span></label>';
			echo '<input class="' . ( $show_icon_in_input ? 'icon-activated-input' : '' ) . '"'
				. ( $show_icon_in_input ? ' style="background-image: ' . esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ) . ';"' : '' )
				. ' type="' . esc_attr( $type ) . '" name="' . esc_attr( $name ) . '" id="th-register-' . esc_attr( $id ) . '" placeholder="' . esc_attr( $placeholder ) . '"'
				. ( $required ? ' required' : '' )
				. ( $autocomplete ? ' autocomplete="' . esc_attr( $autocomplete ) . '"' : '' )
				. ' />';
			echo '</p>';
		}
	}

	protected function render_terms_checkbox( $field ) {
		$id     = sanitize_key( $field['id'] ?? '' );
		$name   = sanitize_key( $field['name'] ?? $id );
		$label  = sanitize_text_field( $field['label'] ?? '' );
		$required = ! empty( $field['required'] );
		$link   = ! empty( $field['link'] ) ? esc_url( $field['link'] ) : '#';

		$parsed_text = preg_replace_callback(
			'/\[(.*?)\]/',
			function ( $matches ) use ( $link ) {
				return '<a href="' . esc_url( $link ) . '" target="_blank" rel="noopener noreferrer">' . esc_html( $matches[1] ) . '</a>';
			},
			$label
		);

		echo '<p class="thlogin-form-field thlogin-form-field--terms">';
			echo '<input type="checkbox" name="' . esc_attr( $name ) . '" id="th-register-' . esc_attr( $id ) . '" value="1" ' . ( $required ? 'required' : '' ) . '>';
			echo '<label for="th-register-' . esc_attr( $id ) . '">' . wp_kses_post( $parsed_text ) . '</label>';
		echo '</p>';
	}

	protected function render_recaptcha( $security ) {
		$recaptcha = $security['recaptcha'] ?? [];
		$show_on   = $recaptcha['show_on'] ?? 'all';

		if ( ! empty( $recaptcha['enabled'] ) && ( $show_on === 'all' || $show_on === 'register' ) ) {
			if ( $recaptcha['type'] === 'v2_checkbox' ) {
				echo '<div class="thlogin-form-field">';
				echo '<div class="g-recaptcha" data-sitekey="' . esc_attr( $recaptcha['site_key'] ) . '"></div>';
				echo '</div>';
			} elseif ( $recaptcha['type'] === 'v3' ) {
				echo '<input type="hidden" id="g-recaptcha-response-register" name="g-recaptcha-response">';
				echo '<script>
					document.addEventListener("DOMContentLoaded", function () {
						if (typeof grecaptcha !== "undefined") {
							grecaptcha.ready(function () {
								grecaptcha.execute("' . esc_attr( $recaptcha['site_key'] ) . '", { action: "register" })
									.then(function (token) {
										document.getElementById("g-recaptcha-response-register").value = token;
									});
							});
						}
					});
				</script>';
			}
		}
	}
}

// Usage example:
// $register_form = new THLogin_Register_Form();
// $register_form->render();
