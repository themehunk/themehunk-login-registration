<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class THLogin_Style_Renderer {

	public function render_inline_styles() {
		$design = $this->get_design_settings(); ?>

		<style type="text/css" id="thlogin-front-styles">
		   <?php echo wp_kses_post($this->get_form_styles( $design )); ?>
		</style>
        
	<?php }

	private function get_design_settings() {
		$all_settings = get_option( 'thlogin_settings', [] );
		$design_settings = $all_settings['design'] ?? [];
		return wp_parse_args( $design_settings );
	}

	private function get_background_style( $background ) {
		$type = $background['type'] ?? 'color';
		if ( $type === 'gradient' ) {
			return "background-image: {$background['gradient']}; background-size: cover; background-repeat: no-repeat; background-position: center center; opacity: {$background['opacity']};";
		} elseif ( $type === 'image' && ! empty( $background['image']['url'] ) ) {
			$image = $background['image'];
			return "background-image: url({$image['url']}); background-size: {$image['size']}; background-repeat: {$image['repeat']}; background-position: {$image['position']}; opacity: {$background['opacity']};";
		} else {
			return "background-color: {$background['color']};";
		}
	}

	private function get_border_style( $border ) {
		$width = $border['width'] ?? [];
		$radius = $border['radius'] ?? [];
		return sprintf(
			"border-top-width: %dpx; border-right-width: %dpx; border-bottom-width: %dpx; border-left-width: %dpx; border-style: %s; border-color: %s; border-top-left-radius: %dpx; border-top-right-radius: %dpx; border-bottom-right-radius: %dpx; border-bottom-left-radius: %dpx;",
			$width['top'] ?? 0,
			$width['right'] ?? 0,
			$width['bottom'] ?? 0,
			$width['left'] ?? 0,
			$border['style'] ?? 'solid',
			$border['color'] ?? '#000000',
			$radius['topLeft'] ?? 0,
			$radius['topRight'] ?? 0,
			$radius['bottomRight'] ?? 0,
			$radius['bottomLeft'] ?? 0
		);
	}

	private function get_padding_style( $padding ) {
		return sprintf(
			"padding-top: %dpx; padding-right: %dpx; padding-bottom: %dpx; padding-left: %dpx;",
			$padding['top'] ?? 0,
			$padding['right'] ?? 0,
			$padding['bottom'] ?? 0,
			$padding['left'] ?? 0
		);
	}

    private function get_foreground_filter( $f ) {
        $blur = isset( $f['blur'] ) ? $f['blur'] : '0px';
        $brightness = isset( $f['brightness'] ) ? $f['brightness'] : '100%';
        $contrast = isset( $f['contrast'] ) ? $f['contrast'] : '100%';

        return "blur({$blur}) brightness({$brightness}) contrast({$contrast})";
    }


	private function get_form_styles( $d ) {
		ob_start();
		?>

        
            .thlogin-popup-form-container {
                <?php echo esc_attr( $this->get_background_style( $d['form']['form_background'] ) ); ?>
                <?php echo esc_attr( $this->get_border_style( $d['form']['form_border'] ) ); ?>
                <?php echo esc_attr( $this->get_padding_style( $d['form']['form_padding'] ) ); ?>
                display: flex;
                flex-direction: column;
                gap: <?php echo esc_attr( $d['form']['form_gap'] ); ?>px;
                max-width: 400px;
                margin: 0 auto;
            }

            .thlogin-popup-modal::before {
                content: "";
                position: absolute;
                inset: 0;
                z-index: 1;
                background: inherit; 
                filter: <?php echo esc_attr( $this->get_foreground_filter( $d['modal']['foreground'] ?? [] ) ); ?>;
                opacity: 1;
                pointer-events: none;
            }

            .th-login-from-feilds-combine {
                display: flex;
                flex-direction: column;
                gap: <?php echo esc_attr( $d['form']['form_gap'] ); ?>px;
                align-items: center;
                justify-content: center;
            }

            .thlogin-form h3 {
                color: <?php echo esc_attr( $d['heading']['color'] ); ?>;
                font-size: <?php echo esc_attr( $d['heading']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['heading']['typography']['fontWeight'] ); ?>;
                text-align: center;
                margin:0;
            }

            .thlogin-form-field input[type="text"],
            .thlogin-form-field input[type="email"],
            .thlogin-form-field input[type="password"],
            .thlogin-form-field input[type="tel"],
            .thlogin-form-field input[type="url"],
            .thlogin-form-field input[type="number"] {
                width: 100% !important;
                padding: 13px;
                color: <?php echo esc_attr( $d['Input']['color'] ); ?>;
                <?php echo esc_attr( $this->get_background_style( $d['Input']['background'] ) ); ?>
                font-size: <?php echo esc_attr( $d['Input']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['Input']['typography']['fontWeight'] ); ?>;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            .thlogin-form-field--checkbox input[type="checkbox"],
            .thlogin-form-field--terms input[type="checkbox"] {
           
                width: 16px;
                height: 16px;
                cursor: pointer;
            }

            .thlogin-form-field--checkbox label {
                color: <?php echo esc_attr( $d['rememberme']['color'] ); ?>;
                font-size: <?php echo esc_attr( $d['rememberme']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['rememberme']['typography']['fontWeight'] ); ?>;
                cursor: pointer;
            }

            .thlogin-button {
                color: <?php echo esc_attr( $d['button']['color'] ); ?>;
                <?php echo esc_attr( $this->get_background_style( $d['button']['background'] ) ); ?>
                font-size: <?php echo esc_attr( $d['button']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['button']['typography']['fontWeight'] ); ?>;
                padding: <?php echo esc_attr( $d['button']['padding']['top'] ); ?>px <?php echo esc_attr( $d['button']['padding']['right'] ); ?>px;
                <?php echo esc_attr( $this->get_border_style( $d['button']['border'] ) ); ?>
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .thlogin-form-field--terms label {
                color: <?php echo esc_attr( $d['term']['color'] ); ?>;
                font-size: <?php echo esc_attr( $d['term']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['term']['typography']['fontWeight'] ); ?>;
                cursor: pointer;
            }

            .thlogin-form-field--terms a {
                color: <?php echo esc_attr( $d['term']['link'] ); ?>;
                font-size: <?php echo esc_attr( $d['term']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['term']['typography']['fontWeight'] ); ?>;
                cursor: pointer;
            }

            .thlogin-button {
                color: <?php echo esc_attr( $d['button']['color'] ); ?>;
                <?php echo esc_attr( $this->get_background_style( $d['button']['background']  ) ); ?>
                font-size: <?php echo esc_attr( $d['button']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['button']['typography']['fontWeight'] ); ?>;
                padding: <?php echo esc_attr( $d['button']['padding']['top'] ); ?>px <?php echo esc_attr( $d['button']['padding']['right'] ); ?>px;
                <?php echo esc_attr( $this->get_border_style( $d['button']['border'] ) ); ?>
                cursor: pointer;
                transition: background-color 0.3s ease;
                width: 100%;
            }

            .thlogin-button:hover {
                <?php echo esc_attr( $this->get_background_style( $d['button']['hoverbackground'] ) ); ?>
            }

            .thlogin-link {
                color: <?php echo esc_attr( $d['Input']['color'] ); ?>;
                text-decoration: none;
            }

            .thlogin-label-text {
                color: <?php echo esc_attr( $d['Input']['labelcolor'] ); ?>;
                font-size: <?php echo esc_attr( $d['Input']['labeltypography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['Input']['labeltypography']['fontWeight'] ); ?>;
            }

            .thlogin-label-icon svg {
                width: <?php echo esc_attr( $d['icon']['size'] ); ?>;
                height: <?php echo esc_attr( $d['icon']['size'] ); ?>;
                color: <?php echo esc_attr( $d['icon']['color'] ); ?>;
            }

            .icon-activated-input {
                background-repeat: no-repeat;
                background-position: 12px center;
                background-size: <?php echo esc_attr( $d['icon']['size'] ); ?>;
                padding-left: calc(20px + <?php echo esc_attr( $d['icon']['size'] ); ?>) !important;
                width: 85% !important;
            }

            .icon-activated-input:hover {
                border-color: <?php echo esc_attr( $d['Input']['activecolor'] ); ?> !important;
            }

            .icon-activated-input:active {
                border-color: <?php echo esc_attr( $d['Input']['activecolor'] ); ?> !important;
            }

            .icon-activated-input:focus-visible {
                border-color: <?php echo esc_attr( $d['Input']['activecolor'] ); ?> !important;
                outline: none !important;
            }

            .thlogin-popup-form-container input::placeholder {
                color: <?php echo esc_attr( $d['Input']['color'] ); ?>;
                font-size: <?php echo esc_attr( $d['Input']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['Input']['typography']['fontWeight'] ); ?>;
            }

            .thlogin-link-separator {
                margin: 0 8px;
                color: <?php echo esc_attr( $d['Input']['color'] ); ?>;
            }

            .thlogin-header-button {
                color: <?php echo esc_attr( $d['header']['button']['color'] ); ?>;
                <?php echo esc_attr( $this->get_background_style( $d['header']['button']['background'] ) ); ?>
                font-size: <?php echo esc_attr( $d['header']['button']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['header']['button']['typography']['fontWeight'] ); ?>;
                <?php echo esc_attr( $this->get_padding_style( $d['header']['button']['padding'] ) ); ?>
                <?php echo esc_attr( $this->get_border_style( $d['header']['button']['border'] ) ); ?>
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .thlogin-header-button:hover {
                <?php echo esc_attr( $this->get_background_style( $d['header']['button']['hoverbackground'] ) ); ?>
            }

            .thlogin-header-cancel-button {
                color: <?php echo esc_attr( $d['header']['cancel_button']['color'] ); ?>;
                <?php echo esc_attr( $this->get_background_style( $d['header']['cancel_button']['background'] ) ); ?>
                font-size: <?php echo esc_attr( $d['header']['cancel_button']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['header']['cancel_button']['typography']['fontWeight'] ); ?>;
                <?php echo esc_attr( $this->get_padding_style( $d['header']['cancel_button']['padding'] ) ); ?>
                <?php echo esc_attr( $this->get_border_style( $d['header']['cancel_button']['border'] ) ); ?>
                cursor: pointer;
                transition: background-color 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
            }

            .thlogin-header-cancel-button:hover {
                <?php echo esc_attr( $this->get_background_style( $d['header']['cancel_button']['hoverbackground'] ) ); ?>
            }

            .thlogin-header-cancel-button .dashicons {
                width: <?php echo esc_attr( $d['header']['cancel_button']['typography']['size'] ); ?>;
                height: <?php echo esc_attr( $d['header']['cancel_button']['typography']['size'] ); ?>;
                font-size: <?php echo esc_attr( $d['header']['cancel_button']['typography']['size'] ); ?>;
            }

            .thlogin-layout-floating .floating-wrapper {
                position: relative;
            }

            .thlogin-layout-floating .floating-input {
                width: 100%;
                padding: 10px;
                color: <?php echo esc_attr( $d['Input']['color'] ); ?>;
                <?php echo esc_attr( $this->get_background_style( $d['Input']['background'] ) ); ?>
                font-size: <?php echo esc_attr( $d['Input']['typography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['Input']['typography']['fontWeight'] ); ?>;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            .thlogin-layout-floating .floating-label {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                padding: 0 4px;
                border-radius: 4px;
                pointer-events: none;
                transition: all 0.2s ease;
                white-space: nowrap;
                color: <?php echo esc_attr( $d['Input']['labelcolor'] ); ?>;
                font-size: <?php echo esc_attr( $d['Input']['labeltypography']['size'] ); ?>;
                font-weight: <?php echo esc_attr( $d['Input']['labeltypography']['fontWeight'] ); ?>;
            }

            .thlogin-layout-floating .floating-input:focus + .floating-label,
            .thlogin-layout-floating .floating-input:not(:placeholder-shown) + .floating-label {
                top: 0px;
                left: 8px;
                font-size: 12px;
                color: #007cba;
                <?php echo esc_attr( $this->get_background_style( $d['Input']['background']) ); ?>
            }

        <?php
        return ob_get_clean();
    }
}
