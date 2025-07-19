<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TH_Sanitization_validation {

    public function sanitize_general_settings( $settings ) {
		$sanitized = array();
		$sanitized['plugin_status']             = sanitize_text_field( $settings['plugin_status'] ?? 'enabled' );
		$sanitized['replace_wordpress'] = rest_sanitize_boolean( $settings['replace_wordpress'] ?? true );
		
		$sanitized['form_type']             = sanitize_text_field( $settings['form_type'] ?? 'double' );
		$sanitized['display_mode']             = sanitize_text_field( $settings['display_mode'] ?? 'page' );
		$sanitized['default_register_role']             = sanitize_text_field( $settings['default_register_role'] ?? 'subscriber' );

		$sanitized['auto_login_after_registration'] = rest_sanitize_boolean( $settings['auto_login_after_registration'] ?? false );
		$sanitized['allow_user_registration'] = rest_sanitize_boolean( $settings['allow_user_registration'] ?? get_option( 'users_can_register' ) );
		$sanitized['close_button'] = rest_sanitize_boolean( $settings['close_button'] ?? true );

		// Sanitize redirects.
		$sanitized['redirects'] = array();
		$sanitized['redirects']['after_login']['type'] = sanitize_text_field( $settings['redirects']['after_login']['type'] ?? 'current_page' );
		$sanitized['redirects']['after_login']['url']  = esc_url_raw( $settings['redirects']['after_login']['url'] ?? '' );
		$sanitized['redirects']['after_logout']['type'] = sanitize_text_field( $settings['redirects']['after_logout']['type'] ?? 'home_page' );
		$sanitized['redirects']['after_logout']['url'] = esc_url_raw( $settings['redirects']['after_logout']['url'] ?? '' );
		$sanitized['redirects']['after_register']['type'] = sanitize_text_field( $settings['redirects']['after_register']['type'] ?? 'current_page' );
		$sanitized['redirects']['after_register']['url'] = esc_url_raw( $settings['redirects']['after_register']['url'] ?? '' );

		$sanitized['redirects']['role_based_redirects'] = array();
		if ( isset( $settings['redirects']['role_based_redirects'] ) && is_array( $settings['redirects']['role_based_redirects'] ) ) {
			foreach ( $settings['redirects']['role_based_redirects'] as $rule ) {
				$sanitized['redirects']['role_based_redirects'][] = array(
					'role' => sanitize_text_field( $rule['role'] ?? '' ),
					'url'  => esc_url_raw( $rule['url'] ?? '' ),
				);
			}
		}

		// Sanitize manual user approval.
		$sanitized['manual_user_approval']['enabled'] = rest_sanitize_boolean( $settings['manual_user_approval']['enabled'] ?? false );

		return $sanitized;
	}

	public function validate_general_settings( $settings ) {
		$errors = new WP_Error();

		if ( ! in_array( $settings['plugin_status'], array( 'enabled', 'disabled' ), true ) ) {
			$errors->add( 'invalid_plugin_status', esc_html__( 'Invalid plugin status.', 'th-login' ) );
		}

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_design_settings( $settings ) {
		$sanitized = array();

		$sanitized['modal']['layout_type'] = sanitize_text_field( $settings['modal']['layout_type'] ?? 'popup' );

		foreach ( [ 'modal', 'form' ] as $section ) {
			$bg = $settings[ $section ][ "{$section}_background" ] ?? array();
			$sanitized[ $section ][ "{$section}_background" ] = array(
				'type'     => sanitize_text_field( $bg['type'] ?? 'color' ),
				'color'    => $this->sanitize_color_input( $bg['color'] ?? '#ffffff' ),
				'gradient' => sanitize_text_field( $bg['gradient'] ?? '' ),
				'opacity'  => floatval( $bg['opacity'] ?? 1 ),
				'image'    => array(
					'url'      => esc_url_raw( $bg['image']['url'] ?? '' ),
					'position' => sanitize_text_field( $bg['image']['position'] ?? 'center center' ),
					'size'     => sanitize_text_field( $bg['image']['size'] ?? 'cover' ),
					'repeat'   => sanitize_text_field( $bg['image']['repeat'] ?? 'no-repeat' ),
				),
			);

			$border = $settings[ $section ][ "{$section}_border" ] ?? array();
			$sanitized[ $section ][ "{$section}_border" ] = array(
				'width' => array(
					'top'    => intval( $border['width']['top'] ?? 0 ),
					'right'  => intval( $border['width']['right'] ?? 0 ),
					'bottom' => intval( $border['width']['bottom'] ?? 0 ),
					'left'   => intval( $border['width']['left'] ?? 0 ),
				),
				'style'  => sanitize_text_field( $border['style'] ?? 'solid' ),
				'color'  => $this->sanitize_color_input( $border['color'] ?? '#000000' ),
				'radius' => array(
					'topLeft'     => intval( $border['radius']['topLeft'] ?? 0 ),
					'topRight'    => intval( $border['radius']['topRight'] ?? 0 ),
					'bottomRight' => intval( $border['radius']['bottomRight'] ?? 0 ),
					'bottomLeft'  => intval( $border['radius']['bottomLeft'] ?? 0 ),
				),
			);

			$padding = $settings[ $section ][ "{$section}_padding" ] ?? array();
			$sanitized[ $section ][ "{$section}_padding" ] = array(
				'top'    => intval( $padding['top'] ?? 0 ),
				'right'  => intval( $padding['right'] ?? 0 ),
				'bottom' => intval( $padding['bottom'] ?? 0 ),
				'left'   => intval( $padding['left'] ?? 0 ),
			);
		}

		$sanitized['form']['form_gap'] = intval( $settings['form']['form_gap'] ?? 0 );

		$heading = $settings['heading'] ?? array();
		$sanitized['heading'] = array(
			'color'      => $this->sanitize_color_input( $heading['color'] ?? '#000000' ),
			'typography' => array(
				'size'       => sanitize_text_field( $heading['typography']['size'] ?? '14px' ),
				'fontWeight' => intval( $heading['typography']['fontWeight'] ?? 400 ),
			),
		);

		$input = $settings['Input'] ?? array();
		$sanitized['Input'] = array(
			'color'        => $this->sanitize_color_input( $input['color'] ?? '#000000' ),
			'labelcolor'   => $this->sanitize_color_input( $input['labelcolor'] ?? '#000000' ),
			'background'   => $this->sanitize_color_input( $input['background'] ?? '#ffffff' ),
			'typography'   => array(
				'size'       => sanitize_text_field( $input['typography']['size'] ?? '12px' ),
				'fontWeight' => intval( $input['typography']['fontWeight'] ?? 400 ),
			),
			'labeltypography' => array(
				'size'       => sanitize_text_field( $input['labeltypography']['size'] ?? '15px' ),
				'fontWeight' => intval( $input['labeltypography']['fontWeight'] ?? 400 ),
			),
		);

		$sanitized['button'] = $this->sanitize_button_style( $settings['button'] ?? array() );
		$sanitized['rememberme'] = array(
			'color'              => $this->sanitize_color_input( $settings['rememberme']['color'] ?? '#000000' ),
			'checkboxbackground' => $this->sanitize_color_input( $settings['rememberme']['checkboxbackground'] ?? '#000000' ),
			'typography'         => array(
				'size'       => sanitize_text_field( $settings['rememberme']['typography']['size'] ?? '14px' ),
				'fontWeight' => intval( $settings['rememberme']['typography']['fontWeight'] ?? 400 ),
			),
		);

		$sanitized['icon'] = array(
			'color' => $this->sanitize_color_input( $settings['icon']['color'] ?? '#111111' ),
			'size'  => sanitize_text_field( $settings['icon']['size'] ?? '20px' ),
		);

		$sanitized['header']['button']        = $this->sanitize_button_style( $settings['header']['button'] ?? [] );
		$sanitized['header']['cancel_button'] = $this->sanitize_button_style( $settings['header']['cancel_button'] ?? [] );

		return $sanitized;
	}

	private function sanitize_button_style( $btn ) {
		return array(
			'color'           => $this->sanitize_color_input( $btn['color'] ?? '#000000' ),
			'background'      => $this->sanitize_color_input( $btn['background'] ?? '#ffffff' ),
			'hoverBackground' => $this->sanitize_color_input( $btn['hoverBackground'] ?? '#C7C2C2' ),
			'padding'         => array(
				'top'    => intval( $btn['padding']['top'] ?? 0 ),
				'right'  => intval( $btn['padding']['right'] ?? 0 ),
				'bottom' => intval( $btn['padding']['bottom'] ?? 0 ),
				'left'   => intval( $btn['padding']['left'] ?? 0 ),
			),
			'typography' => array(
				'size'       => sanitize_text_field( $btn['typography']['size'] ?? '14px' ),
				'fontWeight' => intval( $btn['typography']['fontWeight'] ?? 400 ),
			),
			'border' => array(
				'width' => array(
					'top'    => intval( $btn['border']['width']['top'] ?? 0 ),
					'right'  => intval( $btn['border']['width']['right'] ?? 0 ),
					'bottom' => intval( $btn['border']['width']['bottom'] ?? 0 ),
					'left'   => intval( $btn['border']['width']['left'] ?? 0 ),
				),
				'style'  => sanitize_text_field( $btn['border']['style'] ?? 'solid' ),
				'color'  => $this->sanitize_color_input( $btn['border']['color'] ?? '#000000' ),
				'radius' => array(
					'topLeft'     => intval( $btn['border']['radius']['topLeft'] ?? 0 ),
					'topRight'    => intval( $btn['border']['radius']['topRight'] ?? 0 ),
					'bottomRight' => intval( $btn['border']['radius']['bottomRight'] ?? 0 ),
					'bottomLeft'  => intval( $btn['border']['radius']['bottomLeft'] ?? 0 ),
				),
			),
		);
	}

	private function sanitize_color_input( $color, $default = '#000000' ) {
		$color = trim( $color ?? '' );

		if ( $color === '' ) {
			return $default;
		}

		// Accept hex, rgba(), rgb(), and named colors
		if (
			preg_match( '/^#([a-fA-F0-9]{3,8})$/', $color ) ||
			preg_match( '/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(,\s*(\d+(\.\d+)?|1|0))?\s*\)$/', $color ) ||
			preg_match( '/^[a-zA-Z]+$/', $color )
		) {
			return $color;
		}

		return $default;
	}

	public function validate_design_settings( $settings ) {
		$errors = new WP_Error();

		$valid_types = array( 'color', 'gradient', 'image' );

		// Updated regex for color formats: hex, rgb(), rgba(), and named colors
		$valid_color_regex = '/^(#([A-Fa-f0-9]{3,8})|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(,\s*(\d+(\.\d+)?|1|0))?\s*\)|[a-zA-Z]+)$/';

		foreach ( [ 'modal', 'form' ] as $section ) {
			$type = $settings[ $section ][ "{$section}_background" ]['type'] ?? 'color';
			if ( ! in_array( $type, $valid_types, true ) ) {
				$errors->add( "invalid_{$section}_background_type", sprintf( esc_html__( 'Invalid %s background type.', 'th-login' ), $section ) );
			}
		}

		$radius_fields = array(
			'form_border'            => $settings['form']['form_border']['radius'] ?? array(),
			'button_border'          => $settings['button']['border']['radius'] ?? array(),
			'header_button_border'   => $settings['header']['button']['border']['radius'] ?? array(),
			'header_cancel_border'   => $settings['header']['cancel_button']['border']['radius'] ?? array(),
		);

		foreach ( $radius_fields as $key => $radius ) {
			foreach ( [ 'topLeft', 'topRight', 'bottomRight', 'bottomLeft' ] as $corner ) {
				if ( isset( $radius[ $corner ] ) && intval( $radius[ $corner ] ) < 0 ) {
					$errors->add(
						"inappropriate_{$key}_{$corner}",
						sprintf( esc_html__( '%s radius value must be a positive number.', 'th-login' ), ucfirst( str_replace( '_', ' ', $key ) ) )
					);
				}
			}
		}

		$padding_fields = array(
			'form_padding'             => $settings['form']['form_padding'] ?? array(),
			'button_padding'           => $settings['button']['padding'] ?? array(),
			'header_button_padding'    => $settings['header']['button']['padding'] ?? array(),
			'header_cancel_padding'    => $settings['header']['cancel_button']['padding'] ?? array(),
		);

		foreach ( $padding_fields as $key => $padding ) {
			foreach ( [ 'top', 'right', 'bottom', 'left' ] as $side ) {
				if ( isset( $padding[ $side ] ) && intval( $padding[ $side ] ) < 0 ) {
					$errors->add(
						"invalid_{$key}_{$side}",
						sprintf( esc_html__( '%s padding must be a positive number.', 'th-login' ), ucfirst( str_replace( '_', ' ', $key ) ) )
					);
				}
			}
		}

		if ( isset( $settings['form']['form_gap'] ) && intval( $settings['form']['form_gap'] ) < 0 ) {
			$errors->add(
				'invalid_form_gap',
				esc_html__( 'Form gap must be a positive number.', 'th-login' )
			);
		}

		$typography_fields = array(
			'heading'                => $settings['heading']['typography']['size'] ?? '',
			'Input'                  => $settings['Input']['typography']['size'] ?? '',
			'Input_label'            => $settings['Input']['labeltypography']['size'] ?? '',
			'button'                 => $settings['button']['typography']['size'] ?? '',
			'rememberme'             => $settings['rememberme']['typography']['size'] ?? '',
			'icon'                   => $settings['icon']['size'] ?? '',
			'header_button'          => $settings['header']['button']['typography']['size'] ?? '',
			'header_cancel_button'   => $settings['header']['cancel_button']['typography']['size'] ?? '',
		);

		foreach ( $typography_fields as $key => $font_size ) {
			if ( $font_size && ! preg_match( '/^\d+(\.\d+)?(px|em|rem|%)$/', $font_size ) ) {
				$errors->add(
					'invalid_' . strtolower( $key ) . '_font_size',
					sprintf( esc_html__( '%s font size must be a valid CSS size (e.g., 14px, 1.2em).', 'th-login' ), ucfirst( str_replace( '_', ' ', $key ) ) )
				);
			}
		}

		$color_fields = array(
			'heading_color'              => $settings['heading']['color'] ?? '',
			'input_color'                => $settings['Input']['color'] ?? '',
			'input_labelcolor'           => $settings['Input']['labelcolor'] ?? '',
			'input_background'           => $settings['Input']['background'] ?? '',
			'button_color'               => $settings['button']['color'] ?? '',
			'button_background'          => $settings['button']['background'] ?? '',
			'button_hover_bg'            => $settings['button']['hoverBackground'] ?? '',
			'button_border_color'        => $settings['button']['border']['color'] ?? '',
			'form_border_color'          => $settings['form']['form_border']['color'] ?? '',
			'rememberme_color'           => $settings['rememberme']['color'] ?? '',
			'rememberme_checkbox_bg'     => $settings['rememberme']['checkboxbackground'] ?? '',
			'icon_color'                 => $settings['icon']['color'] ?? '',
			'header_button_color'        => $settings['header']['button']['color'] ?? '',
			'header_button_background'   => $settings['header']['button']['background'] ?? '',
			'header_button_hover_bg'     => $settings['header']['button']['hoverBackground'] ?? '',
			'header_button_border_color' => $settings['header']['button']['border']['color'] ?? '',
			'header_cancel_color'        => $settings['header']['cancel_button']['color'] ?? '',
			'header_cancel_background'   => $settings['header']['cancel_button']['background'] ?? '',
			'header_cancel_hover_bg'     => $settings['header']['cancel_button']['hoverBackground'] ?? '',
			'header_cancel_border_color' => $settings['header']['cancel_button']['border']['color'] ?? '',
		);

		foreach ( $color_fields as $key => $color ) {
			if ( $color && ! preg_match( $valid_color_regex, trim( $color ) ) ) {
				$errors->add(
					'invalid_' . $key,
					sprintf( esc_html__( '%s must be a valid CSS color.', 'th-login' ), ucfirst( str_replace( '_', ' ', $key ) ) )
				);
			}
		}

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_form_fields_settings( $settings ) {
		$sanitized = [];
		$form_keys = [ 'login', 'register', 'forgot_password' ];

		foreach ( $form_keys as $form_key ) {
			if ( ! isset( $settings[ $form_key ] ) || ! is_array( $settings[ $form_key ] ) ) {
				$sanitized[ $form_key ] = [];
				continue;
			}

			$sanitized[ $form_key ] = [];

			foreach ( $settings[ $form_key ] as $field ) {
				if ( ! is_array( $field ) || empty( $field['id'] ) ) {
					continue;
				}

				$sanitized_field = [];

				$sanitized_field['id']            = sanitize_key( $field['id'] );
				$sanitized_field['label']         = isset( $field['label'] ) ? wp_kses_post( $field['label'] ) : '';
				$sanitized_field['name']          = sanitize_key( $field['name'] ?? $field['id'] );
				$sanitized_field['type']          = sanitize_text_field( $field['type'] ?? 'text' );
				$sanitized_field['placeholder']   = sanitize_text_field( $field['placeholder'] ?? '' );
				$sanitized_field['required']      = rest_sanitize_boolean( $field['required'] ?? false );
				$sanitized_field['icon']          = sanitize_text_field( $field['icon'] ?? '' );
				$sanitized_field['show']          = rest_sanitize_boolean( $field['show'] ?? true );
				$sanitized_field['hidden']        = rest_sanitize_boolean( $field['hidden'] ?? false );
				$sanitized_field['error_message'] = sanitize_text_field( $field['error_message'] ?? '' );

				// Optional: map to user meta
				if ( isset( $field['map_to_user_meta'] ) ) {
					$sanitized_field['map_to_user_meta'] = rest_sanitize_boolean( $field['map_to_user_meta'] );
				}

				// Optional: select/radio options
				if ( isset( $field['options'] ) && is_array( $field['options'] ) ) {
					$sanitized_field['options'] = array_map( 'sanitize_text_field', $field['options'] );
				}

				// Optional: min/max input
				if ( isset( $field['minInput'] ) ) {
					$sanitized_field['minInput'] = intval( $field['minInput'] );
				}
				if ( isset( $field['maxInput'] ) ) {
					$sanitized_field['maxInput'] = intval( $field['maxInput'] );
				}

				// Optional: password check rules
				if ( isset( $field['check'] ) && is_array( $field['check'] ) ) {
					$sanitized_field['check'] = [
						'text'             => ! empty( $field['check']['text'] ),
						'number'           => ! empty( $field['check']['number'] ),
						'special_charcter' => ! empty( $field['check']['special_charcter'] ),
					];
				}

				// Optional: predefined
				if ( isset( $field['predefined'] ) ) {
					$sanitized_field['predefined'] = rest_sanitize_boolean( $field['predefined'] );
				}

				// Optional: link for checkbox (e.g., terms and conditions)
				if ( $sanitized_field['type'] === 'checkbox' && isset( $field['link'] ) ) {
					$sanitized_field['link'] = esc_url_raw( $field['link'] );
				}

				$sanitized[ $form_key ][] = $sanitized_field;
			}
		}

		return $sanitized;
	}

	public function validate_form_fields_settings( $settings ) {
		$errors    = new WP_Error();
		$form_keys = [ 'login', 'register', 'forgot_password' ];

		foreach ( $form_keys as $form_key ) {
			if ( ! isset( $settings[ $form_key ] ) || ! is_array( $settings[ $form_key ] ) ) {
				continue;
			}

			$seen_ids = [];

			foreach ( $settings[ $form_key ] as $field ) {
				$field_id = $field['id'] ?? '';
				$label    = $field['label'] ?? '';

				if ( empty( $field_id ) ) {
					$errors->add(
						'missing_field_id',
						/* translators: %s: The form type (login/register) to be displayed in the link text */
						sprintf( esc_html__( 'A field in "%s" is missing an ID.', 'th-login' ), $form_key )
					);
					continue;
				}

				if ( in_array( $field_id, $seen_ids, true ) ) {
					$error_message = sprintf(
						/* translators: 1: Field ID, 2: Form name/identifier */
						esc_html__( 'Duplicate field ID "%1$s" found in %2$s.', 'th-login' ),
						esc_html( $field_id ),
						esc_html( $form_key )
					);
					
					$errors->add(
						'duplicate_field_id',
						$error_message
					);
				}


				$seen_ids[] = $field_id;

				// Required fields must have label
				if ( ! empty( $field['required'] ) && empty( $label ) ) {
					$errors->add(
						'missing_required_label',
						sprintf( 
							/* translators: 1: Field ID, 2: Form name/identifier */
							esc_html__( 'Field "%1$s" in %2$s is required but missing a label.', 'th-login' ),
							esc_html( $field_id ),
							esc_html( $form_key )
						)
					);
				}

				// Validate password field rules
				if ( $field_id === 'password' ) {
					if ( isset( $field['minInput'] ) && intval( $field['minInput'] ) < 4 ) {
						$errors->add(
							'invalid_min_input',
							esc_html__( 'Password minimum length must be at least 4 characters.', 'th-login' )
						);
					}

					if ( isset( $field['check'] ) && is_array( $field['check'] ) ) {
						$check = $field['check'];

						if (
							empty( $check['text'] ) &&
							empty( $check['number'] ) &&
							empty( $check['special_charcter'] )
						) {
							$errors->add(
								'invalid_password_check',
								esc_html__( 'At least one password check must be enabled (letter, number, or special character).', 'th-login' )
							);
						}
					}
				}

				// Validate link for terms_and_conditions checkbox
				if ( $field_id === 'terms_and_conditions' && $field['type'] === 'checkbox' ) {
					if ( isset( $field['link'] ) && ! empty( $field['link'] ) && ! filter_var( $field['link'], FILTER_VALIDATE_URL ) ) {
						$errors->add(
							'invalid_terms_link',
							esc_html__( 'The link for Terms & Conditions must be a valid URL.', 'th-login' )
						);
					}
				}
			}
		}

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_display_triggers_settings( $settings ) {
		$sanitized = array();

		$sanitized['trigger_css_class'] = sanitize_html_class( $settings['trigger_css_class'] ?? 'thlogin-trigger' );

		// Auto open on load.
		$sanitized['auto_open_on_load']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_load']['enabled'] ?? true );
		$sanitized['auto_open_on_load']['delay_seconds'] = absint( $settings['auto_open_on_load']['delay_seconds'] ?? 2 );

		// Auto open on scroll.
		$sanitized['auto_open_on_scroll']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_scroll']['enabled'] ?? false );
		$sanitized['auto_open_on_scroll']['scroll_percentage'] = absint( $settings['auto_open_on_scroll']['scroll_percentage'] ?? 50 );

		// Auto open on exit intent.
		$sanitized['auto_open_on_exit_intent']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_exit_intent']['enabled'] ?? false );

		// Auto open on time on page.
		$sanitized['auto_open_on_time_on_page']['enabled'] = rest_sanitize_boolean( $settings['auto_open_on_time_on_page']['enabled'] ?? false );
		$sanitized['auto_open_on_time_on_page']['time_seconds'] = absint( $settings['auto_open_on_time_on_page']['time_seconds'] ?? 10 );

		// Auto open conditions.
		$sanitized['auto_open_conditions']['for_logged_out_only'] = rest_sanitize_boolean( $settings['auto_open_conditions']['for_logged_out_only'] ?? true );
		$sanitized['auto_open_conditions']['for_specific_roles'] = array_map( 'sanitize_text_field', $settings['auto_open_conditions']['for_specific_roles'] ?? array() );

		$sanitized['auto_open_conditions']['on_specific_pages']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_specific_pages']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['on_specific_pages']['page_ids'] = array_map( 'absint', $settings['auto_open_conditions']['on_specific_pages']['page_ids'] ?? array() );
		$sanitized['auto_open_conditions']['on_specific_pages']['page_slugs'] = array_map( 'sanitize_title', $settings['auto_open_conditions']['on_specific_pages']['page_slugs'] ?? array() );

		$sanitized['auto_open_conditions']['on_specific_categories']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_specific_categories']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['on_specific_categories']['category_ids'] = array_map( 'absint', $settings['auto_open_conditions']['on_specific_categories']['category_ids'] ?? array() );
		$sanitized['auto_open_conditions']['on_specific_categories']['category_slugs'] = array_map( 'sanitize_title', $settings['auto_open_conditions']['on_specific_categories']['category_slugs'] ?? array() );

		$sanitized['auto_open_conditions']['on_specific_tags']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_specific_tags']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['on_specific_tags']['tag_ids'] = array_map( 'absint', $settings['auto_open_conditions']['on_specific_tags']['tag_ids'] ?? array() );
		$sanitized['auto_open_conditions']['on_specific_tags']['tag_slugs'] = array_map( 'sanitize_title', $settings['auto_open_conditions']['on_specific_tags']['tag_slugs'] ?? array() );

		$sanitized['auto_open_conditions']['on_woocommerce_myaccount'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_woocommerce_myaccount'] ?? false );
		$sanitized['auto_open_conditions']['on_woocommerce_checkout'] = rest_sanitize_boolean( $settings['auto_open_conditions']['on_woocommerce_checkout'] ?? false );

		$sanitized['auto_open_conditions']['device_visibility']['desktop'] = rest_sanitize_boolean( $settings['auto_open_conditions']['device_visibility']['desktop'] ?? true );
		$sanitized['auto_open_conditions']['device_visibility']['tablet'] = rest_sanitize_boolean( $settings['auto_open_conditions']['device_visibility']['tablet'] ?? true );
		$sanitized['auto_open_conditions']['device_visibility']['mobile'] = rest_sanitize_boolean( $settings['auto_open_conditions']['device_visibility']['mobile'] ?? true );

		$sanitized['auto_open_conditions']['url_parameter_trigger']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['url_parameter_trigger']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['url_parameter_trigger']['param_name'] = sanitize_key( $settings['auto_open_conditions']['url_parameter_trigger']['param_name'] ?? 'th_login' );
		$sanitized['auto_open_conditions']['url_parameter_trigger']['param_value'] = sanitize_text_field( $settings['auto_open_conditions']['url_parameter_trigger']['param_value'] ?? 'open' );

		$sanitized['auto_open_conditions']['referrer_detection']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['referrer_detection']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['referrer_detection']['referrer_urls'] = array_map( 'esc_url_raw', $settings['auto_open_conditions']['referrer_detection']['referrer_urls'] ?? array() );

		// Pop up frequency.
		$sanitized['pop_up_frequency']['enabled'] = rest_sanitize_boolean( $settings['pop_up_frequency']['enabled'] ?? false );
		$sanitized['pop_up_frequency']['type'] = sanitize_text_field( $settings['pop_up_frequency']['type'] ?? 'session' );
		$sanitized['pop_up_frequency']['days'] = absint( $settings['pop_up_frequency']['days'] ?? 7 );

		// Menu integration.
		$sanitized['menu_integration']['enabled'] = rest_sanitize_boolean( $settings['menu_integration']['enabled'] ?? false );
		$sanitized['menu_integration']['menu_slug'] = sanitize_text_field( $settings['menu_integration']['menu_slug'] ?? 'primary' );
		$sanitized['menu_integration']['item_text_login'] = sanitize_text_field( $settings['menu_integration']['item_text_login'] ?? 'Login' );
		$sanitized['menu_integration']['item_text_register'] = sanitize_text_field( $settings['menu_integration']['item_text_register'] ?? 'Register' );
		$sanitized['menu_integration']['item_icon_login'] = sanitize_text_field( $settings['menu_integration']['item_icon_login'] ?? 'dashicons-admin-users' );
		$sanitized['menu_integration']['item_icon_register'] = sanitize_text_field( $settings['menu_integration']['item_icon_register'] ?? 'dashicons-plus-alt' );
		$sanitized['menu_integration']['visibility_login_logged_in'] = rest_sanitize_boolean( $settings['menu_integration']['visibility_login_logged_in'] ?? false );
		$sanitized['menu_integration']['visibility_register_logged_in'] = rest_sanitize_boolean( $settings['menu_integration']['visibility_register_logged_in'] ?? false );

		return $sanitized;
	}

	public function validate_display_triggers_settings( $settings ) {
		$errors = new WP_Error();

		// Example validation: delay_seconds must be positive.
		if ( ( $settings['auto_open_on_load']['enabled'] ?? false ) && ( $settings['auto_open_on_load']['delay_seconds'] ?? 0 ) < 0 ) {
			$errors->add( 'invalid_delay_seconds', esc_html__( 'Delay seconds must be a non-negative number.', 'th-login' ) );
		}

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_integration_settings( $settings ) {
		$woocommerce = $settings['woocommerce'] ?? [];

		return array(
			'woocommerce' => array(
				'enabled' => ! empty( $woocommerce['enabled'] ),
			),
		);
	}

	public function validate_integration_settings( $settings ) {
		if ( ! is_array( $settings ) ) {
			return new WP_Error( 'invalid_data', __( 'Integration settings must be an array.', 'th-login' ) );
		}

		if ( isset( $settings['woocommerce'] ) && is_array( $settings['woocommerce'] ) ) {
			$allowed_woo_keys = [ 'enabled' ]; // Only allow the keys you're using

			foreach ( $settings['woocommerce'] as $key => $val ) {
				if ( ! in_array( $key, $allowed_woo_keys, true ) ) {
					return new WP_Error(
						'invalid_key',
						/* translators: %s: The form type (login/register) to be displayed in the link text */
						sprintf( __( 'Unexpected key "%s" in WooCommerce settings.', 'th-login' ), $key )
					);
				}
			}
		} else {
			return new WP_Error( 'missing_woocommerce', __( 'WooCommerce integration settings missing or invalid.', 'th-login' ) );
		}

		return true;
	}

	public function sanitize_security_settings( $settings ) {
		$sanitized = array();

		// Brute force protection.
		$sanitized['brute_force_protection']['enabled'] = rest_sanitize_boolean( $settings['brute_force_protection']['enabled'] ?? true );
		$sanitized['brute_force_protection']['max_attempts'] = absint( $settings['brute_force_protection']['max_attempts'] ?? 5 );
		$sanitized['brute_force_protection']['lockout_duration_minutes'] = absint( $settings['brute_force_protection']['lockout_duration_minutes'] ?? 30 );
		$sanitized['brute_force_protection']['auto_ip_blacklist_enabled'] = rest_sanitize_boolean( $settings['brute_force_protection']['auto_ip_blacklist_enabled'] ?? true );

		// reCAPTCHA.
		$sanitized['recaptcha']['enabled'] = rest_sanitize_boolean( $settings['recaptcha']['enabled'] ?? false );
		$sanitized['recaptcha']['type'] = sanitize_text_field( $settings['recaptcha']['type'] ?? 'v2_checkbox' );
		$sanitized['recaptcha']['site_key'] = sanitize_text_field( $settings['recaptcha']['site_key'] ?? '' );
		$sanitized['recaptcha']['secret_key'] = sanitize_text_field( $settings['recaptcha']['secret_key'] ?? '' );

		$sanitized['honeypot_enabled'] = rest_sanitize_boolean( $settings['honeypot_enabled'] ?? true );

		return $sanitized;
	}

	public function validate_security_settings( $settings ) {
		$errors = new WP_Error();

		// Example validation: reCAPTCHA keys are required if enabled.
		if ( ( $settings['recaptcha']['enabled'] ?? false ) ) {
			if ( empty( $settings['recaptcha']['site_key'] ?? '' ) ) {
				$errors->add( 'missing_recaptcha_site_key', esc_html__( 'reCAPTCHA Site Key is required when reCAPTCHA is enabled.', 'th-login' ) );
			}
			if ( empty( $settings['recaptcha']['secret_key'] ?? '' ) ) {
				$errors->add( 'missing_recaptcha_secret_key', esc_html__( 'reCAPTCHA Secret Key is required when reCAPTCHA is enabled.', 'th-login' ) );
			}
		}

		return $errors->has_errors() ? $errors : true;
	}
}