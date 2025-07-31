<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class THLogin_Shortcodes {

	public function __construct() {
		add_shortcode( 'thlogin_form', array( $this, 'render_login_form_shortcode' ) );
		add_shortcode( 'th_register_form', array( $this, 'render_register_form_shortcode' ) );
		add_shortcode( 'th_forgot_password_form', array( $this, 'render_forgot_password_form_shortcode' ) );
		add_shortcode( 'thlogin__combined_form', array( $this, 'render_combined_form_shortcode' ) );
		add_shortcode( 'thlogin_popup_auto', array( $this, 'render_auto_popup_shortcode' ) );

		add_action( 'wp_enqueue_scripts', [ $this, 'conditionally_enqueue_assets' ] );
		add_action( 'wp_head', [ $this, 'conditionally_render_inline_styles' ], 20 );
	}

	public function conditionally_enqueue_assets() {
		global $post;

		if (
			is_a( $post, 'WP_Post' ) &&
			(
				has_shortcode( $post->post_content, 'thlogin_form' ) ||
				has_shortcode( $post->post_content, 'th_register_form' ) ||
				has_shortcode( $post->post_content, 'th_forgot_password_form' ) ||
				has_shortcode( $post->post_content, 'thlogin__combined_form' ) ||
				has_shortcode( $post->post_content, 'thlogin_popup_auto' )
			)
		) {
			$this->enqueue_shortcode_assets();
		}
	}

	public function conditionally_render_inline_styles() {
        global $post;
        
        // Check if any of our shortcodes exist
        $has_shortcode = false;
        $shortcodes = [
            'thlogin_form',
            'th_register_form',
            'th_forgot_password_form',
            'thlogin__combined_form',
            'thlogin_popup_auto'
        ];
        
        foreach ($shortcodes as $shortcode) {
            if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, $shortcode)) {
                $has_shortcode = true;
                break;
            }
        }
        
        if ($has_shortcode) {
            $this->render_inline_styles();
        }
    }

	public function render_inline_styles() {
		( new THLogin_Style_Renderer() )->render_inline_styles();
	}

	public function enqueue_shortcode_assets() {
		if ( ! wp_style_is( 'thlogin-frontend-style', 'enqueued' ) ) {
			$settings = get_option( 'thlogin_settings', [] );
			$general_settings = $settings['general'] ?? [];

			$plugin_status = $general_settings['plugin_status'] ?? 'enabled';

			if ( 'enabled' !== $plugin_status ) {
				return;
			}

			wp_enqueue_style( 'dashicons' );

			$asset_file = THLOGIN_PATH . 'app/build/frontend.asset.php';
			$asset_config = file_exists( $asset_file ) ? require $asset_file : array(
				'dependencies' => array(),
				'version'      => THLOGIN_VERSION,
			);

			// Using defer for the main frontend script as it needs DOM and other dependencies
			wp_enqueue_script(
				'thlogin-frontend-script',
				THLOGIN_URL . 'app/build/public.js',
				$asset_config['dependencies'],
				$asset_config['version'],
				array(
					'in_footer' => true,
					'strategy' => 'defer',
				)
			);

			wp_enqueue_style(
				'thlogin-frontend-style',
				THLOGIN_URL . 'app/build/public.css',
				array(),
				$asset_config['version']
			);

			$design_settings = $settings['design'] ?? [];
			$display_triggers_settings = $settings['display_triggers'] ?? [];

			wp_localize_script(
				'thlogin-frontend-script',
				'thLoginFrontendData',
				array(
					'ajaxUrl'           => admin_url( 'admin-ajax.php' ),
					'nonce'             => wp_create_nonce( 'thlogin_frontend_nonce' ),
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
				// Using async for Google Fonts as they're render-blocking
				wp_enqueue_style( 
					'thlogin-google-fonts', 
					esc_url( $google_font_url ), 
					array(), 
					THLOGIN_VERSION,
				);
			}
		}
	}

	public function render_login_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require_once THLOGIN_PATH . 'templates/class-thlogin-login-form.php';

		$form = new THLogin_Login_Form();
		echo wp_kses_post( $form->render() );

		return '<div class="thlogin-shortcode-form-wrapper">' . ob_get_clean() . '</div>';
	}

	public function render_register_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		ob_start();
		require_once THLOGIN_PATH . 'templates/class-thlogin-register-form.php';

		$register_form = new THLogin_Register_Form();
		echo wp_kses_post($register_form->render());

		$form_html = ob_get_clean();

		// 1. Remove inline style="display: none;" from register form wrapper
		$form_html = preg_replace( '/(<div[^>]+class="[^"]*thlogin-form--register[^"]*"[^>]*)style="[^"]*"([^>]*>)/', '$1$2', $form_html );

		// 2. Remove the element with class thlogin-form-links (can be <p>, <div>, etc.)
		$form_html = preg_replace( '/<[^>]+class="[^"]*thlogin-form-links[^"]*"[^>]*>.*?<\/[^>]+>/is', '', $form_html );

		return '<div class="thlogin-shortcode-form-wrapper">' . $form_html . '</div>';
	}

	public function render_forgot_password_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require_once THLOGIN_PATH . 'templates/class-thlogin-forgot-password-form.php';

		$forgot_form = new THLogin_Forgot_Password_Form();
		echo wp_kses_post($forgot_form->render());

		$form_html = ob_get_clean();

		// 1. Remove inline "display: none;" from forgot password form
		$form_html = preg_replace( '/(<div[^>]+class="[^"]*thlogin-form--forgot-password[^"]*"[^>]*)style="[^"]*"([^>]*>)/', '$1$2', $form_html );

		// 2. Remove "Back to Login" link section
		$form_html = preg_replace( '/<[^>]+class="[^"]*thlogin-form-links[^"]*"[^>]*>.*?<\/[^>]+>/is', '', $form_html );

		return '<div class="thlogin-shortcode-form-wrapper">' . $form_html . '</div>';
	}

	public function render_popup_link_shortcode( $atts, $content = null ) {
		$this->enqueue_shortcode_assets();

		$atts = shortcode_atts(
			array(
				'type'      => 'login',
				'text'      => '',
				'class'     => '',
				'auto_open' => 'false',
			),
			$atts,
			'thlogin_popup_link'
		);

		$type        = sanitize_text_field( $atts['type'] );
		$text        = ! empty( $content ) ? $content : sanitize_text_field( $atts['text'] );
		$extra_class = sanitize_html_class( $atts['class'] );
		$auto_open   = filter_var( $atts['auto_open'], FILTER_VALIDATE_BOOLEAN );

		$settings = get_option( 'thlogin_settings', [] );
		$display_triggers_settings = $settings['display_triggers'] ?? [];

		$trigger_css_class         = $display_triggers_settings['trigger_css_class'] ?? 'thlogin-trigger';

		$classes = array( $trigger_css_class, 'thlogin-shortcode-link' );
		if ( ! empty( $extra_class ) ) {
			$classes[] = $extra_class;
		}

		$html = '';

		if ( ! $auto_open ) {
			// Normal trigger link
			$html .= sprintf(
				'<a href="#" class="%s" data-th-popup-action="%s">%s</a>',
				esc_attr( implode( ' ', $classes ) ),
				esc_attr( $type ),
				esc_html( $text )
			);
		} else {
			// Auto open: show modal + form instantly
			ob_start();
			?>
			<style>
			#thlogin-popup-modal {
				display: flex !important;
				opacity: 1 !important;
				visibility: visible !important;
			}
			#thlogin-popup-modal .thlogin-form {
				display: none;
			}
			#thlogin-popup-modal .thlogin-form[data-form-type="<?php echo esc_attr( $type ); ?>"] {
				display: block;
			}
			</style>
			<script>
			document.addEventListener("DOMContentLoaded", function () {
				setTimeout(function () {
					document.dispatchEvent(new CustomEvent("thlogin:open", {
						detail: { type: "<?php echo esc_js( $type ); ?>" }
					}));
				}, 100);
			});
			</script>
			<?php
			$html .= ob_get_clean();
		}

		return $html;
	}

	public function render_auto_popup_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require_once THLOGIN_PATH . 'templates/class-thlogin-modal-wrapper.php';
		$modal = new THLogin_Modal_Wrapper();
		$modal->render();

		$output = ob_get_clean();

		// Styles to force popup visible and highlight active toggle
		$output .= '<style>
			#thlogin-popup-modal.thlogin-popup-modal--active {
				display: flex !important;
				opacity: 1 !important;
				visibility: visible !important;
			}
			.thlogin-toggle-button.is-active {
				background: #0b59f4;
				color: #fff;
				font-weight: 600;
			}
		</style>';

		// JS: handle toggle + close functionality
		$output .= '<script>
		document.addEventListener("DOMContentLoaded", function () {
			var modal = document.getElementById("thlogin-popup-modal");
			if (modal) {
				modal.style.display = "flex";
				modal.classList.add("thlogin-popup-modal--active");
				modal.setAttribute("aria-hidden", "false");
			}

			function switchForm(target) {
				document.querySelectorAll(".thlogin-form").forEach(function (f) {
					f.style.display = "none";
				});
				var form = document.querySelector(".thlogin-form--" + target);
				if (form) {
					form.style.display = "block";
				}
				document.querySelectorAll(".thlogin-toggle-button").forEach(function (btn) {
					btn.classList.remove("is-active");
				});
				var activeBtn = document.querySelector(".thlogin-toggle-button--" + target);
				if (activeBtn) {
					activeBtn.classList.add("is-active");
				}
			}

			// Initial form = login
			switchForm("login");

			// Form toggle buttons (login/register/forgot)
			document.querySelectorAll("[data-th-popup-action]").forEach(function (btn) {
				btn.addEventListener("click", function (e) {
					e.preventDefault();
					var target = this.getAttribute("data-th-popup-action");
					switchForm(target);
				});
			});

			// Close button functionality
			document.querySelectorAll(".thlogin-popup-close-button").forEach(function (btn) {
				btn.addEventListener("click", function () {
					modal.classList.remove("thlogin-popup-modal--active");
					modal.style.display = "none";
					modal.setAttribute("aria-hidden", "true");
				});
			});
		});
		</script>';

		return '<div class="thlogin-auto-popup-shortcode-wrapper">' . $output . '</div>';
	}

	public function render_combined_form_shortcode( $atts ) {
		$this->enqueue_shortcode_assets();

		ob_start();
		require_once THLOGIN_PATH . 'templates/class-thlogin-modal-wrapper.php';
		$modal = new THLogin_Modal_Wrapper();
		$modal->render();

		$output = ob_get_clean();

		// 1. Remove popup-specific classes/IDs/styles
		$output = str_replace('id="thlogin-popup-modal"', 'id="thlogin-inline-wrapper"', $output);
		$output = str_replace('thlogin-popup-modal', 'thlogin-inline-wrapper', $output);
		$output = preg_replace('/style="[^"]*"/', '', $output); // Strip inline styles

		// 2. Remove close (X) buttons
		$output = preg_replace('/<button class="thlogin-popup-close-button[^>]*>.*?<\/button>/', '', $output);

		// 3. Add custom styles and JS logic
		$output .= '<style>
			#thlogin-inline-wrapper {
				display: block !important;
				position: static !important;
				background: none !important;
				box-shadow: none !important;
				opacity: 1 !important;
				visibility: visible !important;
				z-index: auto !important;
			}
			.thlogin-toggle-button.is-active {
				background: #0b59f4;
				color: #fff;
				font-weight: 600;
			}

			.thlogin-header-cancel-button{
				display:none;
			}
		</style>';

		$output .= '<script>
		document.addEventListener("DOMContentLoaded", function () {
			function switchForm(target) {
				document.querySelectorAll(".thlogin-form").forEach(function (f) {
					f.style.display = "none";
				});
				var form = document.querySelector(".thlogin-form--" + target);
				if (form) {
					form.style.display = "block";
				}
				document.querySelectorAll(".thlogin-toggle-button").forEach(function (btn) {
					btn.classList.remove("is-active");
				});
				var activeBtn = document.querySelector(".thlogin-toggle-button--" + target);
				if (activeBtn) {
					activeBtn.classList.add("is-active");
				}
			}

			switchForm("login"); // Default form

			document.querySelectorAll("[data-th-popup-action]").forEach(function (btn) {
				btn.addEventListener("click", function (e) {
					e.preventDefault();
					switchForm(this.getAttribute("data-th-popup-action"));
				});
			});
		});
		</script>';

		return '<div class="thlogin-inline-combined-form-wrapper">' . $output . '</div>';
	}	
}