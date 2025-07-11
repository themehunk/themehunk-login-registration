<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TH_Login_Shortcodes {

	public function __construct() {
		add_shortcode( 'th_login_form', array( $this, 'render_login_form_shortcode' ) );
		add_shortcode( 'th_register_form', array( $this, 'render_register_form_shortcode' ) );
		add_shortcode( 'th_forgot_password_form', array( $this, 'render_forgot_password_form_shortcode' ) );
		add_shortcode( 'th_login_popup_link', array( $this, 'render_popup_link_shortcode' ) );
		add_shortcode( 'th_login__combined_form', array( $this, 'render_combined_form_shortcode' ) );
	}

	private function safe_json_option( $option_key, $default = array() ) {
		$value = get_option( $option_key );
		if ( ! is_string( $value ) || empty( $value ) ) {
			$value = '{}';
		}
		$decoded = json_decode( $value, true );
		return is_array( $decoded ) ? $decoded : $default;
	}

	public function render_combined_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require TH_LOGIN_PATH . 'templates/modal-wrapper.php';
		$output = ob_get_clean();
		$output .= '<script>document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){if(window.thLoginFrontendData && typeof window.thLoginFrontendData==="object" && document.getElementById("th-login-popup-modal")){document.getElementById("th-login-popup-modal").style.display="flex";}},100);});</script>';
		return '<div class="th-login-combined-form-wrapper">' . $output . '</div>';
	}

	public function enqueue_shortcode_assets() {
		if ( ! wp_style_is( 'th-login-frontend-style', 'enqueued' ) ) {
			$general_settings = $this->safe_json_option( 'th_login_general_settings' );
			$plugin_status = $general_settings['plugin_status'] ?? 'enabled';

			if ( 'enabled' !== $plugin_status ) {
				return;
			}

			wp_enqueue_style( 'dashicons' );

			$asset_file = TH_LOGIN_PATH . 'app/build/frontend.asset.php';
			$asset_config = file_exists( $asset_file ) ? require $asset_file : array(
				'dependencies' => array(),
				'version'      => TH_LOGIN_VERSION,
			);

			wp_enqueue_script(
				'th-login-frontend-script',
				TH_LOGIN_URL . 'app/build/frontend.js',
				$asset_config['dependencies'],
				$asset_config['version'],
				true
			);

			wp_enqueue_style(
				'th-login-frontend-style',
				TH_LOGIN_URL . 'app/build/public.css',
				array(),
				$asset_config['version']
			);

			$design_settings = $this->safe_json_option( 'th_login_design_settings' );
			$display_triggers_settings = $this->safe_json_option( 'th_login_display_triggers_settings' );

			wp_localize_script(
				'th-login-frontend-script',
				'thLoginFrontendData',
				array(
					'ajaxUrl'           => admin_url( 'admin-ajax.php' ),
					'nonce'             => wp_create_nonce( 'th_login_frontend_nonce' ),
					'siteUrl'           => get_site_url(),
					'currentUrl'        => home_url( add_query_arg( null, null ) ),
					'settings'          => array(
						'general'          => $general_settings,
						'design'           => $design_settings,
						'display_triggers' => $display_triggers_settings,
					),
					'isUserLoggedIn'    => is_user_logged_in(),
					'currentUserRoles'  => is_user_logged_in() ? wp_get_current_user()->roles : array(),
					'customCss'         => $design_settings['custom_css'] ?? '',
					'customJs'          => $design_settings['custom_js'] ?? '',
				)
			);

			$typography_settings = $design_settings['typography'] ?? array();
			$google_font_url = $typography_settings['google_font_url'] ?? '';

			if ( ! empty( $google_font_url ) ) {
				wp_enqueue_style( 'th-login-google-fonts', esc_url( $google_font_url ), array(), null );
			}
		}
	}

	public function render_login_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require TH_LOGIN_PATH . 'templates/form-login.php';
		return '<div class="th-login-shortcode-form-wrapper">' . ob_get_clean() . '</div>';
	}

	public function render_register_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require TH_LOGIN_PATH . 'templates/form-register.php';
		return '<div class="th-login-shortcode-form-wrapper">' . ob_get_clean() . '</div>';
	}

	public function render_forgot_password_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require TH_LOGIN_PATH . 'templates/form-forgot-password.php';
		return '<div class="th-login-shortcode-form-wrapper">' . ob_get_clean() . '</div>';
	}

	public function render_popup_link_shortcode( $atts, $content = null ) {
		$this->enqueue_shortcode_assets();

		$atts = shortcode_atts(
			array(
				'type' => 'login',
				'text' => '',
				'class' => '',
			),
			$atts,
			'th_login_popup_link'
		);

		$type = sanitize_text_field( $atts['type'] );
		$text = ! empty( $content ) ? $content : sanitize_text_field( $atts['text'] );
		$extra_class = sanitize_html_class( $atts['class'] );

		if ( empty( $text ) ) {
			$text = match ( $type ) {
				'login' => esc_html__( 'Login', 'th-login' ),
				'register' => esc_html__( 'Register', 'th-login' ),
				'forgot-password' => esc_html__( 'Forgot Password', 'th-login' ),
				default => esc_html__( 'Open Login Popup', 'th-login' ),
			};
		}

		$display_triggers_settings = $this->safe_json_option( 'th_login_display_triggers_settings' );
		$trigger_css_class = $display_triggers_settings['trigger_css_class'] ?? 'th-login-trigger';

		$classes = array( $trigger_css_class, 'th-login-shortcode-link' );
		if ( ! empty( $extra_class ) ) {
			$classes[] = $extra_class;
		}

		$link_html = sprintf(
			'<a href="#" class="%s" data-th-popup-action="%s">%s</a>',
			esc_attr( implode( ' ', $classes ) ),
			esc_attr( $type ),
			esc_html( $text )
		);

		return $link_html;
	}
}
