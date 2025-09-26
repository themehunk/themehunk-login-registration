<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class THLogin_Style_Renderer {

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

    public function render_inline_styles() {
        $design = $this->get_design_settings();
         // Then add inline styles to it
         wp_add_inline_style( 'thlogin-frontend-custom-style', $this->get_form_styles( $design ) );
    }

    private function get_form_styles( $d ) {
    $css  = "";

    $css .= ".thlogin-popup-form-container{";
    $css .= $this->get_background_style( $d['form']['form_background'] );
    $css .= $this->get_border_style( $d['form']['form_border'] );
    $css .= $this->get_padding_style( $d['form']['form_padding'] );
    $css .= "display:flex;flex-direction:column;";
    $css .= "gap:" . esc_attr( $d['form']['form_gap'] ) . "px;";
    $css .= "max-width:400px;margin:0 auto;";
    $css .= "}";

    $css .= ".thlogin-popup-modal::before{";
    $css .= "content:'';position:absolute;inset:0;z-index:1;";
    $css .= "background:inherit;";
    $css .= "filter:" . esc_attr( $this->get_foreground_filter( $d['modal']['foreground'] ?? [] ) ) . ";";
    $css .= "opacity:1;pointer-events:none;";
    $css .= "}";

    $css .= ".th-login-from-feilds-combine{";
    $css .= "display:flex;flex-direction:column;";
    $css .= "gap:" . esc_attr( $d['form']['form_gap'] ) . "px;";
    $css .= "align-items:center;justify-content:center;";
    $css .= "}";

    $css .= ".thlogin-form h3{";
    $css .= "color:" . esc_attr( $d['heading']['color'] ) . ";";
    $css .= "font-size:" . esc_attr( $d['heading']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['heading']['typography']['fontWeight'] ) . ";";
    $css .= "text-align:center;margin:0;";
    $css .= "}";

    $css .= ".thlogin-form-field input[type=text],";
    $css .= ".thlogin-form-field input[type=email],";
    $css .= ".thlogin-form-field input[type=password],";
    $css .= ".thlogin-form-field input[type=tel],";
    $css .= ".thlogin-form-field input[type=url],";
    $css .= ".thlogin-form-field input[type=number]{";
    $css .= "width:100%!important;padding:13px;";
    $css .= "color:" . esc_attr( $d['Input']['color'] ) . ";";
    $css .= $this->get_background_style( $d['Input']['background'] );
    $css .= "font-size:" . esc_attr( $d['Input']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['Input']['typography']['fontWeight'] ) . ";";
    $css .= "border:1px solid #ccc;border-radius:4px;";
    $css .= "}";

    $css .= ".thlogin-form-field--checkbox input[type=checkbox],";
    $css .= ".thlogin-form-field--terms input[type=checkbox]{";
    $css .= "width:16px;height:16px;cursor:pointer;";
    $css .= "}";

    $css .= ".thlogin-form-field--checkbox label{";
    $css .= "color:" . esc_attr( $d['rememberme']['color'] ) . ";";
    $css .= "font-size:" . esc_attr( $d['rememberme']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['rememberme']['typography']['fontWeight'] ) . ";";
    $css .= "cursor:pointer;";
    $css .= "}";

    $css .= ".thlogin-button{";
    $css .= "color:" . esc_attr( $d['button']['color'] ) . ";";
    $css .= $this->get_background_style( $d['button']['background'] );
    $css .= "font-size:" . esc_attr( $d['button']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['button']['typography']['fontWeight'] ) . ";";
    $css .= "padding:" . esc_attr( $d['button']['padding']['top'] ) . "px " . esc_attr( $d['button']['padding']['right'] ) . "px;";
    $css .= $this->get_border_style( $d['button']['border'] );
    $css .= "cursor:pointer;transition:background-color 0.3s ease;width:100%;";
    $css .= "}";

    $css .= ".thlogin-button:hover{";
    $css .= $this->get_background_style( $d['button']['hoverbackground'] );
    $css .= "}";

    $css .= ".thlogin-link{";
    $css .= "color:" . esc_attr( $d['Input']['color'] ) . ";text-decoration:none;";
    $css .= "}";

    $css .= ".thlogin-label-text{";
    $css .= "color:" . esc_attr( $d['Input']['labelcolor'] ) . ";";
    $css .= "font-size:" . esc_attr( $d['Input']['labeltypography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['Input']['labeltypography']['fontWeight'] ) . ";";
    $css .= "}";

    $css .= ".thlogin-label-icon svg{";
    $css .= "width:" . esc_attr( $d['icon']['size'] ) . ";";
    $css .= "height:" . esc_attr( $d['icon']['size'] ) . ";";
    $css .= "color:" . esc_attr( $d['icon']['color'] ) . ";";
    $css .= "}";

    $css .= ".icon-activated-input{";
    $css .= "background-repeat:no-repeat;background-position:12px center;";
    $css .= "background-size:" . esc_attr( $d['icon']['size'] ) . ";";
    $css .= "padding-left:calc(20px + " . esc_attr( $d['icon']['size'] ) . ")!important;";
    $css .= "width:85%!important;";
    $css .= "}";

    $css .= ".icon-activated-input:hover,";
    $css .= ".icon-activated-input:active,";
    $css .= ".icon-activated-input:focus-visible{";
    $css .= "border-color:" . esc_attr( $d['Input']['activecolor'] ) . "!important;";
    $css .= "outline:none!important;";
    $css .= "}";

    $css .= ".thlogin-popup-form-container input::placeholder{";
    $css .= "color:" . esc_attr( $d['Input']['color'] ) . ";";
    $css .= "font-size:" . esc_attr( $d['Input']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['Input']['typography']['fontWeight'] ) . ";";
    $css .= "}";

    $css .= ".thlogin-link-separator{";
    $css .= "margin:0 8px;color:" . esc_attr( $d['Input']['color'] ) . ";";
    $css .= "}";

    $css .= ".thlogin-header-button{";
    $css .= "color:" . esc_attr( $d['header']['button']['color'] ) . ";";
    $css .= $this->get_background_style( $d['header']['button']['background'] );
    $css .= "font-size:" . esc_attr( $d['header']['button']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['header']['button']['typography']['fontWeight'] ) . ";";
    $css .= $this->get_padding_style( $d['header']['button']['padding'] );
    $css .= $this->get_border_style( $d['header']['button']['border'] );
    $css .= "cursor:pointer;transition:background-color 0.3s ease;";
    $css .= "}";

    $css .= ".thlogin-header-button:hover{";
    $css .= $this->get_background_style( $d['header']['button']['hoverbackground'] );
    $css .= "}";

    $css .= ".thlogin-header-cancel-button{";
    $css .= "color:" . esc_attr( $d['header']['cancel_button']['color'] ) . ";";
    $css .= $this->get_background_style( $d['header']['cancel_button']['background'] );
    $css .= "font-size:" . esc_attr( $d['header']['cancel_button']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['header']['cancel_button']['typography']['fontWeight'] ) . ";";
    $css .= $this->get_padding_style( $d['header']['cancel_button']['padding'] );
    $css .= $this->get_border_style( $d['header']['cancel_button']['border'] );
    $css .= "cursor:pointer;transition:background-color 0.3s ease;";
    $css .= "display:flex;align-items:center;justify-content:center;border:none;";
    $css .= "}";

    $css .= ".thlogin-header-cancel-button:hover{";
    $css .= $this->get_background_style( $d['header']['cancel_button']['hoverbackground'] );
    $css .= "}";

    $css .= ".thlogin-header-cancel-button .dashicons{";
    $css .= "width:" . esc_attr( $d['header']['cancel_button']['typography']['size'] ) . ";";
    $css .= "height:" . esc_attr( $d['header']['cancel_button']['typography']['size'] ) . ";";
    $css .= "font-size:" . esc_attr( $d['header']['cancel_button']['typography']['size'] ) . ";";
    $css .= "}";

    $css .= ".thlogin-layout-floating .floating-wrapper{position:relative;}";

    $css .= ".thlogin-layout-floating .floating-input{";
    $css .= "width:100%;padding:10px;";
    $css .= "color:" . esc_attr( $d['Input']['color'] ) . ";";
    $css .= $this->get_background_style( $d['Input']['background'] );
    $css .= "font-size:" . esc_attr( $d['Input']['typography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['Input']['typography']['fontWeight'] ) . ";";
    $css .= "border:1px solid #ccc;border-radius:4px;";
    $css .= "}";

    $css .= ".thlogin-layout-floating .floating-label{";
    $css .= "position:absolute;left:12px;top:50%;transform:translateY(-50%);";
    $css .= "padding:0 4px;border-radius:4px;pointer-events:none;";
    $css .= "transition:all 0.2s ease;white-space:nowrap;";
    $css .= "color:" . esc_attr( $d['Input']['labelcolor'] ) . ";";
    $css .= "font-size:" . esc_attr( $d['Input']['labeltypography']['size'] ) . ";";
    $css .= "font-weight:" . esc_attr( $d['Input']['labeltypography']['fontWeight'] ) . ";";
    $css .= "}";

    $css .= ".thlogin-layout-floating .floating-input:focus + .floating-label,";
    $css .= ".thlogin-layout-floating .floating-input:not(:placeholder-shown) + .floating-label{";
    $css .= "top:0px;left:8px;font-size:12px;color:#007cba;";
    $css .= $this->get_background_style( $d['Input']['background'] );
    $css .= "}";

    return $css;
}

}
