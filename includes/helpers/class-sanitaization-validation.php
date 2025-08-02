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
		$sanitized['display_mode']             = sanitize_text_field( $settings['display_mode'] ?? 'popup' );
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

		$sanitized['modal']['modal_input_layout'] = sanitize_text_field( $settings['modal']['modal_input_layout'] ?? 'stack' );

		foreach ( [ 'modal', 'form' ] as $section ) {
			$bg = $settings[ $section ][ "{$section}_background" ] ?? array();
			$sanitized[ $section ][ "{$section}_background" ] = array(
				'type'     => sanitize_text_field( $bg['type'] ?? 'color' ),
				'color'    => $this->sanitize_color_input( $bg['color'] ?? ( $section === 'modal' ? '#5954549c' : '#ffffff' ) ),
				'gradient' => sanitize_text_field( $bg['gradient'] ?? 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)' ),
				'opacity'  => floatval( $bg['opacity'] ?? 1 ),
				'filter'   => floatval( $bg['filter'] ?? 10 ),
				'image'    => array(
					'url'      => esc_url_raw( $bg['image']['url'] ?? '' ),
					'position' => sanitize_text_field( $bg['image']['position'] ?? 'center center' ),
					'size'     => sanitize_text_field( $bg['image']['size'] ?? 'cover' ),
					'repeat'   => sanitize_text_field( $bg['image']['repeat'] ?? 'no-repeat' ),
				),
			);
		}

		$border = $settings['form']['form_border'] ?? array();
		$sanitized['form']['form_border'] = array(
			'width' => array(
				'top'    => intval( $border['width']['top'] ?? 0 ),
				'right'  => intval( $border['width']['right'] ?? 0 ),
				'bottom' => intval( $border['width']['bottom'] ?? 0 ),
				'left'   => intval( $border['width']['left'] ?? 0 ),
			),
			'style'  => sanitize_text_field( $border['style'] ?? 'solid' ),
			'color'  => $this->sanitize_color_input( $border['color'] ?? '#000000' ),
			'radius' => array(
				'topLeft'     => intval( $border['radius']['topLeft'] ?? 6 ),
				'topRight'    => intval( $border['radius']['topRight'] ?? 6 ),
				'bottomRight' => intval( $border['radius']['bottomRight'] ?? 6 ),
				'bottomLeft'  => intval( $border['radius']['bottomLeft'] ?? 6 ),
			),
		);

		$padding = $settings['form']['form_padding'] ?? array();
		$sanitized['form']['form_padding'] = array(
			'top'    => intval( $padding['top'] ?? 10 ),
			'right'  => intval( $padding['right'] ?? 35 ),
			'bottom' => intval( $padding['bottom'] ?? 30 ),
			'left'   => intval( $padding['left'] ?? 35 ),
		);

		$sanitized['form']['form_gap'] = intval( $settings['form']['form_gap'] ?? 18 );

		$heading = $settings['heading'] ?? array();
		$sanitized['heading'] = array(
			'color'      => $this->sanitize_color_input( $heading['color'] ?? '#000000' ),
			'typography' => array(
				'size'       => sanitize_text_field( $heading['typography']['size'] ?? '25px' ),
				'fontWeight' => intval( $heading['typography']['fontWeight'] ?? 500 ),
			),
		);

		$input = $settings['Input'] ?? array();
		$sanitized['Input'] = array(
			'color'        => $this->sanitize_color_input( $input['color'] ?? '#8392A5' ),
			'labelcolor'   => $this->sanitize_color_input( $input['labelcolor'] ?? '#262626' ),
			'activecolor'   => $this->sanitize_color_input( $input['activecolor'] ?? '#262626' ),
			'background'   => $this->sanitize_color_input( $input['background'] ?? '#ffffff' ),
			'typography'   => array(
				'size'       => sanitize_text_field( $input['typography']['size'] ?? '14px' ),
				'fontWeight' => intval( $input['typography']['fontWeight'] ?? 300 ),
			),
			'labeltypography' => array(
				'size'       => sanitize_text_field( $input['labeltypography']['size'] ?? '16px' ),
				'fontWeight' => intval( $input['labeltypography']['fontWeight'] ?? 500 ),
			),
		);

		$sanitized['button'] = $this->sanitize_button_style( $settings['button'] ?? array(), array(
			'color'      => '#ffffff',
			'background' => '#0B59f4',
			'hover'      => '#1c21ba',
			'padding'    => array( 'top' => 12, 'right' => 12, 'bottom' => 12, 'left' => 12 ),
			'radius'     => array( 'topLeft' => 5, 'topRight' => 5, 'bottomRight' => 5, 'bottomLeft' => 5 ),
		) );

		$sanitized['rememberme'] = array(
			'color'              => $this->sanitize_color_input( $settings['rememberme']['color'] ?? '#8392A5' ),
			'checkboxbackground' => $this->sanitize_color_input( $settings['rememberme']['checkboxbackground'] ?? '#ffffff' ),
			'typography'         => array(
				'size'       => sanitize_text_field( $settings['rememberme']['typography']['size'] ?? '14px' ),
				'fontWeight' => intval( $settings['rememberme']['typography']['fontWeight'] ?? 300 ),
			),
		);

		$sanitized['term'] = array(
			'color' => $this->sanitize_color_input( $settings['term']['color'] ?? '#8392A5' ),
			'link'  => $this->sanitize_color_input( $settings['term']['link'] ?? '#007cba' ),
			'typography' => array(
				'size'       => sanitize_text_field( $settings['term']['typography']['size'] ?? '14px' ),
				'fontWeight' => intval( $settings['term']['typography']['fontWeight'] ?? 300 ),
			),
		);

		$sanitized['icon'] = array(
			'color' => $this->sanitize_color_input( $settings['icon']['color'] ?? '#8392A5' ),
			'size'  => sanitize_text_field( $settings['icon']['size'] ?? '17px' ),
			'icon_position' => sanitize_text_field( $settings['icon']['icon_position'] ?? 'inside-input' ),
		);

		$sanitized['header'] = array(
			'showButtons'   => isset( $settings['header']['showButtons'] ) ? (bool) $settings['header']['showButtons'] : false,
			'loginText'     => sanitize_text_field( $settings['header']['loginText'] ?? 'Login' ),
			'registerText'  => sanitize_text_field( $settings['header']['registerText'] ?? 'Register' ),
			'button'        => $this->sanitize_button_style( $settings['header']['button'] ?? array(), array(
				'color' => '#ffffff',
				'background' => '#0B59f4',
				'hover' => '#1c21ba',
				'padding' => array( 'top' => 8, 'right' => 12, 'bottom' => 8, 'left' => 12 ),
				'radius' => array( 'topLeft' => 5, 'topRight' => 5, 'bottomRight' => 5, 'bottomLeft' => 5 ),
			) ),
			'cancel_button' => $this->sanitize_button_style( $settings['header']['cancel_button'] ?? array(), array(
				'color' => '#f31212',
				'background' => '#E6e6e6',
				'hover' => '#9a9a9e',
				'padding' => array( 'top' => 3, 'right' => 3, 'bottom' => 3, 'left' => 3 ),
				'radius' => array( 'topLeft' => 20, 'topRight' => 20, 'bottomRight' => 20, 'bottomLeft' => 20 ),
			) ),
		);

		$sanitized['submitButton'] = array(
			'login'           => sanitize_text_field( $settings['submitButton']['login'] ?? 'Login' ),
			'register'        => sanitize_text_field( $settings['submitButton']['register'] ?? 'Register' ),
			'forgot_password' => sanitize_text_field( $settings['submitButton']['forgot_password'] ?? 'Reset' ),
		);

		$logo = $settings['logo'] ?? array();
		$sanitized['logo'] = array(
			'size'  => sanitize_text_field( $logo['size'] ?? '30px' ),
			'color' => $this->sanitize_color_input( $logo['color'] ?? 'black' ),
			'url'   => esc_url_raw( $logo['url'] ?? '' ),
		);

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
		$valid_color_regex = '/^(#([A-Fa-f0-9]{3,8})|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(,\s*(\d+(\.\d+)?|1|0))?\s*\)|[a-zA-Z]+)$/';

		foreach ( [ 'modal', 'form' ] as $section ) {
			$type = $settings[ $section ][ "{$section}_background" ]['type'] ?? 'color';
			if ( ! in_array( $type, $valid_types, true ) ) {
				$errors->add( "invalid_{$section}_background_type", sprintf( esc_html__( 'Invalid %s background type.', 'th-login' ), $section ) );
			}
		}

		$valid_input_layouts = [ 'stack', 'inline', 'floating', 'placehold' ];
		$modal_input_layout = $settings['modal']['modal_input_layout'] ?? '';
		if ( $modal_input_layout && ! in_array( $modal_input_layout, $valid_input_layouts, true ) ) {
			$errors->add(
				'invalid_modal_input_layout',
				sprintf(
					esc_html__( 'Invalid modal input layout. Allowed values are: %s.', 'th-login' ),
					implode( ', ', $valid_input_layouts )
				)
			);
		}

		$radius_fields = array(
			'form_border'          => $settings['form']['form_border']['radius'] ?? array(),
			'button_border'        => $settings['button']['border']['radius'] ?? array(),
			'header_button_border' => $settings['header']['button']['border']['radius'] ?? array(),
			'header_cancel_border' => $settings['header']['cancel_button']['border']['radius'] ?? array(),
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
			'form_padding'           => $settings['form']['form_padding'] ?? array(),
			'button_padding'         => $settings['button']['padding'] ?? array(),
			'header_button_padding'  => $settings['header']['button']['padding'] ?? array(),
			'header_cancel_padding'  => $settings['header']['cancel_button']['padding'] ?? array(),
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
			'heading'               => $settings['heading']['typography']['size'] ?? '',
			'Input'                 => $settings['Input']['typography']['size'] ?? '',
			'Input_label'           => $settings['Input']['labeltypography']['size'] ?? '',
			'button'                => $settings['button']['typography']['size'] ?? '',
			'rememberme'            => $settings['rememberme']['typography']['size'] ?? '',
			'term'                  => $settings['term']['typography']['size'] ?? '',
			'icon'                  => $settings['icon']['size'] ?? '',
			'header_button'         => $settings['header']['button']['typography']['size'] ?? '',
			'header_cancel_button'  => $settings['header']['cancel_button']['typography']['size'] ?? '',
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
			'input_activecolor'          => $settings['Input']['activecolor'] ?? '',
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
			'term_color'                 => $settings['term']['color'] ?? '',
			'term_link'                  => $settings['term']['link'] ?? '',
		);

		foreach ( $color_fields as $key => $color ) {
			if ( $color && ! preg_match( $valid_color_regex, trim( $color ) ) ) {
				$errors->add(
					'invalid_' . $key,
					sprintf( esc_html__( '%s must be a valid CSS color.', 'th-login' ), ucfirst( str_replace( '_', ' ', $key ) ) )
				);
			}
		}

		$submit_button = $settings['submitButton'] ?? array();

		foreach ( [ 'login', 'register', 'forgot_password' ] as $key ) {
			if ( empty( $submit_button[ $key ] ) || ! is_string( $submit_button[ $key ] ) ) {
				$errors->add(
					'invalid_submit_button_' . $key,
					sprintf( esc_html__( 'Submit button text for "%s" must be a non-empty string.', 'th-login' ), $key )
				);
			}
		}

		if ( isset( $settings['header']['showButtons'] ) && ! is_bool( $settings['header']['showButtons'] ) ) {
			$errors->add(
				'invalid_header_show_buttons',
				esc_html__( 'Header showButtons must be a boolean value.', 'th-login' )
			);
		}

		foreach ( [ 'loginText', 'registerText' ] as $key ) {
			if ( empty( $settings['header'][ $key ] ) || ! is_string( $settings['header'][ $key ] ) ) {
				$errors->add(
					'invalid_header_' . $key,
					sprintf( esc_html__( 'Header text for "%s" must be a non-empty string.', 'th-login' ), $key )
				);
			}
		}

		// ✅ Logo validation
		if ( isset( $settings['logo']['url'] ) && ! empty( $settings['logo']['url'] ) ) {
			if ( ! filter_var( $settings['logo']['url'], FILTER_VALIDATE_URL ) ) {
				$errors->add(
					'invalid_logo_url',
					esc_html__( 'Logo URL must be a valid URL.', 'th-login' )
				);
			}
		}

		foreach ( [ 'width', 'height' ] as $dim ) {
			if ( isset( $settings['logo'][ $dim ] ) && $settings['logo'][ $dim ] !== '' ) {
				if ( ! preg_match( '/^\d+(px|em|rem|%)?$/', $settings['logo'][ $dim ] ) ) {
					$errors->add(
						'invalid_logo_' . $dim,
						sprintf( esc_html__( 'Logo %s must be a valid CSS size (e.g., 100px, 5em).', 'th-login' ), $dim )
					);
				}
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

				if ( $sanitized_field['id'] === 'terms_and_conditions' && isset( $field['termsText'] ) ) {
					$sanitized_field['termsText'] = wp_kses_post( $field['termsText'] );
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

				if ( $field_id === 'terms_and_conditions' && isset( $field['termsText'] ) ) {
					if ( strlen( wp_strip_all_tags( $field['termsText'] ) ) < 2 ) {
						$errors->add(
							'invalid_terms_text',
							esc_html__( 'The Terms & Conditions label must be at least 5 characters.', 'th-login' )
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
		$sanitized['auto_open_conditions']['url_parameter_trigger']['param_name'] = sanitize_key( $settings['auto_open_conditions']['url_parameter_trigger']['param_name'] ?? 'thlogin' );
		$sanitized['auto_open_conditions']['url_parameter_trigger']['param_value'] = sanitize_text_field( $settings['auto_open_conditions']['url_parameter_trigger']['param_value'] ?? 'open' );

		$sanitized['auto_open_conditions']['referrer_detection']['enabled'] = rest_sanitize_boolean( $settings['auto_open_conditions']['referrer_detection']['enabled'] ?? false );
		$sanitized['auto_open_conditions']['referrer_detection']['referrer_urls'] = array_map( 'esc_url_raw', $settings['auto_open_conditions']['referrer_detection']['referrer_urls'] ?? array() );

		// Pop up frequency.
		$sanitized['pop_up_frequency']['enabled'] = rest_sanitize_boolean( $settings['pop_up_frequency']['enabled'] ?? false );
		$sanitized['pop_up_frequency']['type'] = sanitize_text_field( $settings['pop_up_frequency']['type'] ?? 'session' );
		$sanitized['pop_up_frequency']['days'] = absint( $settings['pop_up_frequency']['days'] ?? 7 );

		// Menu integration.
		$sanitized['menu_integration']['enabled'] = rest_sanitize_boolean( $settings['menu_integration']['enabled'] ?? false );
		$sanitized['menu_integration']['logout']  = rest_sanitize_boolean( $settings['menu_integration']['logout'] ?? true );

		$sanitized['menu_integration']['item_text_login']  = sanitize_text_field( $settings['menu_integration']['item_text_login'] ?? 'Login' );
		$sanitized['menu_integration']['item_icon_login']  = sanitize_text_field( $settings['menu_integration']['item_icon_login'] ?? '' );

		$sanitized['menu_integration']['item_text_logout'] = sanitize_text_field( $settings['menu_integration']['item_text_logout'] ?? 'Logout' );
		$sanitized['menu_integration']['item_icon_logout'] = sanitize_text_field( $settings['menu_integration']['item_icon_logout'] ?? '' );

		return $sanitized;
	}

	public function validate_display_triggers_settings( $settings ) {
		$errors = new WP_Error();

		if (
			( $settings['auto_open_on_load']['enabled'] ?? false ) &&
			( $settings['auto_open_on_load']['delay_seconds'] ?? 0 ) < 0
		) {
			$errors->add(
				'invalid_delay_seconds',
				esc_html__( 'Delay seconds must be a non-negative number.', 'th-login' )
			);
		}

		return $errors->has_errors() ? $errors : true;
	}

	public function sanitize_integration_settings( $settings ) {
		$woocommerce = $settings['woocommerce'] ?? array();
		$wordpress   = $settings['wordpress'] ?? array();

		return array(
			'woocommerce' => array(
				'enabled' => ! empty( $woocommerce['enabled'] ),
			),
			'wordpress' => array(
				'enabled'          => ! empty( $wordpress['enabled'] ),
				'url'     => sanitize_title( $wordpress['url'] ?? 'login' ),
			),
		);
	}

	public function validate_integration_settings( $settings ) {
		if ( ! is_array( $settings ) ) {
			return new WP_Error( 'invalid_data', __( 'Integration settings must be an array.', 'th-login' ) );
		}

		// ✅ Validate WooCommerce settings
		if ( isset( $settings['woocommerce'] ) && is_array( $settings['woocommerce'] ) ) {
			$allowed_woo_keys = [ 'enabled' ];

			foreach ( $settings['woocommerce'] as $key => $val ) {
				if ( ! in_array( $key, $allowed_woo_keys, true ) ) {
					return new WP_Error(
						'invalid_key',
						/* translators: %s: The invalid key in WooCommerce settings */
						sprintf( __( 'Unexpected key "%s" in WooCommerce settings.', 'th-login' ), esc_html( $key ) )
					);
				}
			}
		} else {
			return new WP_Error( 'missing_woocommerce', __( 'WooCommerce integration settings missing or invalid.', 'th-login' ) );
		}

		// ✅ Validate WordPress settings
		if ( isset( $settings['wordpress'] ) && is_array( $settings['wordpress'] ) ) {
			$allowed_wp_keys = [ 'enabled', 'url' ]; // ⛔ removed replace_wp_login (not used anywhere)

			foreach ( $settings['wordpress'] as $key => $val ) {
				if ( ! in_array( $key, $allowed_wp_keys, true ) ) {
					return new WP_Error(
						'invalid_key',
						/* translators: %s: The invalid key in WordPress settings */
						sprintf( __( 'Unexpected key "%s" in WordPress settings.', 'th-login' ), esc_html( $key ) )
					);
				}
			}

			// ✅ Ensure login slug is a string (optional but strict)
			if ( isset( $settings['wordpress']['url'] ) && ! is_string( $settings['wordpress']['url'] ) ) {
				return new WP_Error( 'invalid_url', __( 'Login URL must be a string.', 'th-login' ) );
			}
		} else {
			return new WP_Error( 'missing_wordpress', __( 'WordPress integration settings missing or invalid.', 'th-login' ) );
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
		$sanitized['recaptcha']['show_on'] = sanitize_text_field( $settings['recaptcha']['show_on'] ?? 'all' );
		$sanitized['recaptcha']['type'] = sanitize_text_field( $settings['recaptcha']['type'] ?? 'v2_checkbox' );
		$sanitized['recaptcha']['site_key'] = sanitize_text_field( $settings['recaptcha']['site_key'] ?? '' );
		$sanitized['recaptcha']['secret_key'] = sanitize_text_field( $settings['recaptcha']['secret_key'] ?? '' );

		// Honeypot.
		$sanitized['honeypot_enabled'] = rest_sanitize_boolean( $settings['honeypot_enabled'] ?? true );

		// Email Verification.
		$sanitized['email_verification']['enabled']       = rest_sanitize_boolean( $settings['email_verification']['enabled'] ?? false );
		$sanitized['email_verification']['from_name']     = sanitize_text_field( $settings['email_verification']['from_name'] ?? '' );
		$sanitized['email_verification']['from_email']    = sanitize_email( $settings['email_verification']['from_email'] ?? '' );
		$sanitized['email_verification']['email_subject'] = sanitize_text_field( $settings['email_verification']['email_subject'] ?? 'Verify your email' );
		$sanitized['email_verification']['email_content'] = wp_kses_post( $settings['email_verification']['email_content'] ?? 'Click the link to verify: {verification_link}' );

		// Session Timeout.
		$sanitized['session_timeout']['enabled'] = rest_sanitize_boolean( $settings['session_timeout']['enabled'] ?? true );
		$sanitized['session_timeout']['duration'] = absint( $settings['session_timeout']['duration'] ?? 15 );
		$sanitized['session_timeout']['show_warning'] = rest_sanitize_boolean( $settings['session_timeout']['show_warning'] ?? true );
		$sanitized['session_timeout']['warning_duration'] = absint( $settings['session_timeout']['warning_duration'] ?? 60 );

		return $sanitized;
	}

	public function validate_security_settings( $settings ) {
		$errors = new WP_Error();

		// Validate reCAPTCHA keys if enabled.
		if ( ( $settings['recaptcha']['enabled'] ?? false ) ) {
			if ( empty( $settings['recaptcha']['site_key'] ?? '' ) ) {
				$errors->add( 'missing_recaptcha_site_key', esc_html__( 'reCAPTCHA Site Key is required when reCAPTCHA is enabled.', 'th-login' ) );
			}
			if ( empty( $settings['recaptcha']['secret_key'] ?? '' ) ) {
				$errors->add( 'missing_recaptcha_secret_key', esc_html__( 'reCAPTCHA Secret Key is required when reCAPTCHA is enabled.', 'th-login' ) );
			}
		}

		// Validate email verification if enabled.
		if ( ( $settings['email_verification']['enabled'] ?? false ) ) {
			if ( empty( $settings['email_verification']['from_email'] ?? '' ) ) {
				$errors->add( 'missing_from_email', esc_html__( 'From Email is required for email verification.', 'th-login' ) );
			} elseif ( ! is_email( $settings['email_verification']['from_email'] ) ) {
				$errors->add( 'invalid_from_email', esc_html__( 'From Email must be a valid email address.', 'th-login' ) );
			}

			if ( empty( $settings['email_verification']['email_subject'] ?? '' ) ) {
				$errors->add( 'missing_email_subject', esc_html__( 'Email Subject is required for verification email.', 'th-login' ) );
			}

			if ( empty( $settings['email_verification']['email_content'] ?? '' ) ) {
				$errors->add( 'missing_email_content', esc_html__( 'Email Content is required for verification email.', 'th-login' ) );
			}
		}

		// Validate Session Timeout.
		if ( ( $settings['session_timeout']['enabled'] ?? false ) ) {
			if ( empty( $settings['session_timeout']['duration'] ) || ! is_numeric( $settings['session_timeout']['duration'] ) ) {
				$errors->add( 'invalid_session_timeout_duration', esc_html__( 'Session timeout duration must be a valid number.', 'th-login' ) );
			}
			if ( ( $settings['session_timeout']['show_warning'] ?? false ) && 
				( empty( $settings['session_timeout']['warning_duration'] ) || ! is_numeric( $settings['session_timeout']['warning_duration'] ) ) ) {
				$errors->add( 'invalid_session_warning_duration', esc_html__( 'Warning duration must be a valid number.', 'th-login' ) );
			}
		}

		return $errors->has_errors() ? $errors : true;
	}
}