<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles Gutenberg block registration for TH Login forms and triggers.
 */
class THLogin_Gutenberg_Block {

	public function __construct() {
		add_action( 'init', array( $this, 'register_th_login_block' ) );
	}

	/**
	 * Registers the TH Login Gutenberg block.
	 */
	public function register_th_login_block() {
		// Only register if Gutenberg is available.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Register the block script.
		wp_register_script(
			'thlogin-block-editor-script',
			THLOGIN_URL . 'app/build/block.js', // This will be our block's JS.
			array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
			THLOGIN_VERSION,
			array(
				'in_footer' => true,
				'strategy' => 'defer', // Using defer for editor script as it needs the DOM but can wait
			)
		);

		// Register the block frontend styles (if different from main frontend.css, otherwise use frontend.css).
		wp_register_style(
			'thlogin-block-style',
			THLOGIN_URL . 'app/build/public.css', // Re-using frontend styles for block output.
			array(),
			THLOGIN_VERSION
		);

		register_block_type(
			'thlogin/form-block',
			array(
				'editor_script'   => 'thlogin-block-editor-script',
				'editor_style'    => 'thlogin-block-editor-style',
				'style'           => 'thlogin-block-style',
				'render_callback' => array( $this, 'render_th_login_block' ),
				'attributes'      => array(
					'formType' => array(
						'type'    => 'string',
						'default' => 'login',
					),
					'linkText' => array(
						'type'    => 'string',
						'default' => '',
					),
					'displayAs' => array(
						'type'    => 'string',
						'default' => 'popup', // 'popup' or 'inline'
					),
				),
			)
		);
	}

	/**
	 * Renders the TH Login Gutenberg block on the frontend.
	 *
	 * @param array    $attributes The block attributes.
	 * @param string   $content    The block content.
	 * @return string HTML to render.
	 */
	public function render_th_login_block( $attributes, $content ) {
		$form_type = $attributes['formType'] ?? 'login';
		$display_as = $attributes['displayAs'] ?? 'popup';
		$link_text = $attributes['linkText'] ?? '';

		// Ensure frontend assets are loaded for the block.
		// This is important if the block is the only thing on the page that needs the assets.
		// The main frontend class already enqueues them, but this is a fallback/guarantee.
		if ( ! wp_script_is( 'thlogin-frontend-script', 'enqueued' ) ) {
			wp_enqueue_script( 'thlogin-frontend-script' );
			wp_enqueue_style( 'thlogin-frontend-style' );
			wp_enqueue_style( 'dashicons' ); // Ensure dashicons are loaded for icons.

			// Re-localize script if not already localized by frontend class.
			// This is a bit redundant if THLogin_Frontend is always active, but safer.
			global $thLoginFrontendData; // Access the global variable if set.
			if ( ! isset( $thLoginFrontendData ) ) {
				$general_settings = $this->safe_json_option( 'thlogin_general_settings' );
				$design_settings = $this->safe_json_option( 'thlogin_design_settings' );
				$display_triggers_settings = $this->safe_json_option( 'thlogin_display_triggers_settings' );

				wp_localize_script(
					'thlogin-frontend-script',
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
			}
		}

		$output = '';
		if ( 'inline' === $display_as ) {
			// Render forms directly inline.
			ob_start();
			switch ( $form_type ) {
				case 'login':
					require THLOGIN_PATH . 'templates/form-login.php';
					break;
				case 'register':
					require THLOGIN_PATH . 'templates/form-register.php';
					break;
				case 'forgot-password':
					require THLOGIN_PATH . 'templates/form-forgot-password.php';
					break;
				default:
					// Fallback to login form.
					require THLOGIN_PATH . 'templates/form-login.php';
					break;
			}
			$output = '<div class="thlogin-gutenberg-inline-form">' . ob_get_clean() . '</div>';
		} else {
			// Render a link that triggers the popup.
			$trigger_css_class = $this->safe_json_option( 'thlogin_display_triggers_settings' )['trigger_css_class'] ?? 'thlogin-trigger';
			$final_link_text = ! empty( $link_text ) ? $link_text : sprintf( esc_html__( 'Open %s Form', 'thlogin' ), ucfirst( $form_type ) );

			$output = sprintf(
				'<p><a href="#" class="%s thlogin-gutenberg-popup-link" data-th-popup-action="%s">%s</a></p>',
				esc_attr( $trigger_css_class ),
				esc_attr( $form_type ),
				esc_html( $final_link_text )
			);
		}

		return $output;
	}

	/**
	 * Safely decode JSON option.
	 *
	 * @param string $option_key The option key to retrieve.
	 * @param array  $default    The default value if the option is not found or invalid.
	 * @return array Decoded JSON as an associative array, or default.
	 */
	private function safe_json_option( $option_key, $default = array() ) {
		$value = get_option( $option_key );
		if ( ! is_string( $value ) || empty( $value ) ) {
			$value = '{}';
		}
		$decoded = json_decode( $value, true );
		return is_array( $decoded ) ? $decoded : $default;
	}
}
