<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class THLogin_Frontend {

	private $has_shortcode = false;

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_footer', array( $this, 'render_modal_wrapper' ) );
		add_action( 'template_redirect', array( $this, 'handle_wp_login_redirect' ) );
		add_action( 'init', array( $this, 'handle_email_verification' ) );
		add_action( 'wp_logout', array( $this, 'handle_logout_redirect' ) );
	}

	public function enqueue_scripts() {
		$asset_file = THLOGIN_PATH . 'app/build/public.asset.php';

		// ---- GET ICON SETTINGS ---- //
		$settings       = get_option( 'thlogin_settings', [] );
		$menu_settings  = $settings['display_triggers']['menu_integration'] ?? [];

		$login_icon_slug  = $menu_settings['item_icon_login'] ?? '';
		$logout_icon_slug = $menu_settings['item_icon_logout'] ?? '';

		$icons_for_js = [];

		if ( $login_icon_slug ) {
			$icons_for_js[ $login_icon_slug ] = thlogin_get_icon_svg( $login_icon_slug );
		}

		if ( $logout_icon_slug ) {
			$icons_for_js[ $logout_icon_slug ] = thlogin_get_icon_svg( $logout_icon_slug );
		}

		$asset_config = file_exists( $asset_file ) ? require $asset_file : array(
			'dependencies' => array(),
			'version'      => THLOGIN_VERSION,
		);

		if ( ! is_array( $asset_config ) ) {
			$asset_config = array(
				'dependencies' => array(),
				'version'      => THLOGIN_VERSION,
			);
		}

		wp_register_script(
			'thlogin-frontend-script',
			THLOGIN_URL . 'app/build/public.js',
			$asset_config['dependencies'],
			$asset_config['version'],
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);

		wp_enqueue_script('thlogin-frontend-script');

		wp_register_script(
			'thlogin-session-timeout',
			THLOGIN_URL . 'assets/js/session-timeout.js',
			array( 'jquery' ),
			THLOGIN_VERSION,
			true
		);

		wp_enqueue_script('thlogin-session-timeout');

		wp_localize_script( 'thlogin-session-timeout', 'thloginSessionSettings', array(
			'enabled'           => $settings['security']['session_timeout']['enabled'] ?? false,
			'duration'          => intval( $settings['security']['session_timeout']['duration'] ?? 15 ) * 60, // in seconds
			'show_warning'      => $settings['security']['session_timeout']['show_warning'] ?? false,
			'warning_duration'  => intval( $settings['security']['session_timeout']['warning_duration'] ?? 60 ),
			'logout_url'        => wp_logout_url(), // default WP logout
			'is_logged_in'      => is_user_logged_in(),
		) );

		wp_enqueue_style(
			'thlogin-frontend-style',
			THLOGIN_URL . 'app/build/public.css',
			array(),
			$asset_config['version']
		);

		wp_enqueue_style( 'dashicons' );

		wp_enqueue_style(
			'thlogin-frontend-custom-style',
			THLOGIN_URL . 'assets/css/thlogin-custom-login.css',
			array(),
			$asset_config['version']
		);

		wp_register_script(
			'thlogin-custom-admin-script',
			THLOGIN_URL . 'assets/js/thlogin-custom-admin.js',
			 array(), 
			$asset_config['version'],
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);

		wp_enqueue_script('thlogin-custom-admin-script');

		$all_settings = get_option( 'thlogin_settings', array() );
		$general_settings          = $all_settings['general'] ?? array();
		$design_settings           = $all_settings['design'] ?? array();
		$form_fields_settings      = $all_settings['form_fields'] ?? array();
		$display_triggers_settings = $all_settings['display_triggers'] ?? array();
		$security_settings         = $all_settings['security'] ?? array();

		global $post;

		$has_shortcode = false;

		if ( is_a( $post, 'WP_Post' ) ) {
			$content = $post->post_content;

			$shortcodes_to_check = array(
				'thlogin_form',
				'thlogin_register_form',
				'thlogin_forgot_password_form',
				'thlogin_combined_form',
				'thlogin_popup_auto'
			);

			foreach ( $shortcodes_to_check as $shortcode ) {
				if ( has_shortcode( $content, $shortcode ) ) {
					$has_shortcode = true;
					break;
				}
			}
		}

		$this->has_shortcode = $has_shortcode;

		wp_localize_script(
			'thlogin-frontend-script',
			'thLoginFrontendData',
			array(
				'ajaxUrl'          => admin_url( 'admin-ajax.php' ),
				'nonce'            => wp_create_nonce( 'wp_rest' ),
				'siteUrl'          => get_site_url(),
				'currentUrl'       => esc_url( home_url( add_query_arg( array(), '' ) ) ),
				'settings'         => array(
					'general'          => $general_settings,
					'design'           => $design_settings,
					'form_fields'      => $form_fields_settings,
					'display_triggers' => $display_triggers_settings,
					'security'         => $security_settings,
				),
				'isUserLoggedIn'   => is_user_logged_in(),
				'currentUserRoles' => is_user_logged_in() ? wp_get_current_user()->roles : array(),
				'logoutUrl'        => wp_logout_url( home_url() ),
				'icons'            => $icons_for_js,
				'hasShortcode'     => $this->has_shortcode ?? false,
				'currentPageId'        => get_queried_object_id(),
				'currentPageSlug'      => $post->post_name ?? '',
				'currentCategorySlugs' => wp_get_post_terms( get_the_ID(), 'category', ['fields' => 'slugs'] ),
				'currentCategoryIds'   => wp_get_post_terms( get_the_ID(), 'category', ['fields' => 'ids'] ), // ✅ ADD THIS
				'currentTagSlugs'      => wp_get_post_terms( get_the_ID(), 'post_tag', ['fields' => 'slugs'] ),
				'currentTagIds'        => wp_get_post_terms( get_the_ID(), 'post_tag', ['fields' => 'ids'] ),  // ✅ ADD THIS
			)
		);
	}

	public function render_modal_wrapper() {
		$all_settings = get_option( 'thlogin_settings', array() );
		$general_settings = $all_settings['general'] ?? array();
		if ( ( $general_settings['plugin_status'] ?? 'enabled' ) === 'disabled' ) {
			return;
		}
		require_once THLOGIN_PATH . 'templates/class-thlogin-modal-wrapper.php';
		$modal = new THLogin_Modal_Wrapper();
		$modal->render();

	}

	public function handle_wp_login_redirect() {
		$all_settings = get_option( 'thlogin_settings', array() );
		$general_settings = $all_settings['general'] ?? array();

		$disable_wp_login = $general_settings['disable_wp_login_page'] ?? false;

		if ( $disable_wp_login && isset( $_SERVER['REQUEST_URI'] ) ) {
			$request_uri = sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) );

			if (strpos($request_uri, 'wp-login.php') !== false || strpos($request_uri, 'wp-admin') !== false) {
                $allowed_actions = array('logout', 'rp', 'resetpass');

                // Verify nonce for GET actions
                if (isset($_GET['action']) && in_array($_GET['action'], $allowed_actions, true)) {
                    // Add nonce verification for sensitive actions
                    if ($_GET['action'] === 'resetpass' && isset($_GET['key']) && isset($_GET['login'])) {
                      if (!isset($_GET['_wpnonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_GET['_wpnonce'])), 'reset-password')) {
                            wp_die(esc_html__('Security check failed', 'themehunk-login-registration'));
                        }
                    }
                    return;
                }

                if (is_user_logged_in()) {
                    wp_safe_redirect(admin_url());
                    exit;
                }

                // Generate a new nonce for the redirect URL
                $redirect_url = add_query_arg([
                    'thlogin_action' => 'login',
                    '_wpnonce' => wp_create_nonce('th-login-redirect')
                ], home_url());
                
                wp_safe_redirect($redirect_url);
                exit;
            }
		}
	}

	public function handle_logout_redirect() {
		$all_settings = get_option( 'thlogin_settings', array() );
		$general_settings = $all_settings['general'] ?? array();

		$redirect_settings = $general_settings['redirects']['after_logout'] ?? array( 'type' => 'home_page' );
		$redirect_url      = home_url();

		if ( 'custom_url' === $redirect_settings['type'] && ! empty( $redirect_settings['url'] ) ) {
			$redirect_url = esc_url_raw( $redirect_settings['url'] );
		}

		wp_safe_redirect( $redirect_url );
		exit;
	}

	public function handle_email_verification() {
		if (
			isset( $_GET['thlogin_verify_email'], $_GET['user_id'], $_GET['_wpnonce'] )
			&& wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ), 'thlogin_verify_email' )
		) {
			$verification_key = sanitize_text_field( wp_unslash( $_GET['thlogin_verify_email'] ) );
			$user_id          = absint( $_GET['user_id'] );
			$stored_key       = get_user_meta( $user_id, 'thlogin_email_verification_key', true );

			if ( $stored_key === $verification_key ) {
				update_user_meta( $user_id, 'thlogin_email_verified', true );
				delete_user_meta( $user_id, 'thlogin_email_verification_key' );

				$all_settings = get_option( 'thlogin_settings', array() );
				$general_settings = $all_settings['general'] ?? array();

				$redirect_type    = $general_settings['email_verification']['redirect_after_verification'] ?? 'login_form';
				$custom_url       = $general_settings['email_verification']['custom_redirect_url'] ?? '';
				$redirect_url     = home_url();

				switch ( $redirect_type ) {
					case 'dashboard':
						$redirect_url = admin_url();
						break;
					case 'custom_url':
						if ( ! empty( $custom_url ) ) {
							$redirect_url = esc_url_raw( $custom_url );
						}
						break;
					case 'login_form':
						$redirect_url = add_query_arg( 'thlogin_action', 'login', home_url() );
						break;
					default:
						$redirect_url = home_url();
						break;
				}

				wp_safe_redirect( $redirect_url );
				exit;
			} else {
				wp_die( esc_html__( 'Invalid verification link.', 'themehunk-login-registration' ) );
			}
		}
	}
}
