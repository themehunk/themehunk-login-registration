<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class THLogin_Integrations {

 	public function __construct() {
		$settings           = get_option( 'thlogin_settings', array() );
		$general_settings   = $settings['general'] ?? array();
		$integration        = $settings['integration'] ?? array();
		$display_mode       = $general_settings['display_mode'] ?? 'page';

		$wordpress_enabled  = ! empty( $integration['wordpress']['enabled'] );
		$custom_login_slug  = sanitize_title( $integration['wordpress']['url'] ?? 'login' );

		// ✅ Flush rewrite rules only when the slug has changed
		$stored_slug = get_option( 'thlogin_stored_slug' );

		if ( $stored_slug !== $custom_login_slug ) {
			update_option( 'thlogin_stored_slug', $custom_login_slug );
			add_action( 'init', function () {
				flush_rewrite_rules();
			}, 20 ); // Delayed flush to avoid init conflicts
		}


		$woocommerce_enabled = ! empty( $integration['woocommerce']['enabled'] );

		// WooCommerce integration
		if ( class_exists( 'WooCommerce' ) && $woocommerce_enabled ) {
			add_action( 'template_redirect', array( $this, 'maybe_override_myaccount_page' ) );
		} elseif ( $display_mode === 'page' ) {
			add_action( 'init', array( $this, 'ensure_thlogin_page_exists' ) );
		}

		// WordPress login override
		if ( $wordpress_enabled ) {
			$this->register_wordpress_login_override( $custom_login_slug );
		}
	}

	public function register_wordpress_login_override( $custom_login_slug ) {

		add_action( 'init', function () use ( $custom_login_slug ) {
			if ( isset( $_SERVER['REQUEST_URI'] ) ) {
				$request_uri = sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) );

				if ( strpos( $request_uri, 'wp-login.php' ) !== false ) {

					// Allow password reset or logout to process
					// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only usage, safe here.
					$action = isset( $_GET['action'] ) ? sanitize_text_field( wp_unslash( $_GET['action'] ) ) : '';

					if ( in_array( $action, array( 'logout', 'lostpassword', 'rp', 'resetpass' ), true ) ) {
						return;
					}

					//  Redirect everything else to custom login page
					wp_redirect( home_url( "/{$custom_login_slug}/" ) );
					exit;
				}
			}
		} );


		// 1. Disable wp-login.php
		add_action( 'init', function () {
			if ( isset( $_SERVER['REQUEST_URI'] ) ) {
				$request_uri = sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) );

				if ( strpos( $request_uri, 'wp-login.php' ) !== false ) {

					// ✅ Safely retrieve and sanitize 'action' GET param
					$action = '';
					// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only usage, safe here.
					if ( isset( $_GET['action'] ) ) {
						// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only usage, safe here.
						$action = sanitize_text_field( wp_unslash( $_GET['action'] ) );
					}

					// ✅ Allow logout and recovery actions through
					if ( in_array( $action, array( 'logout', 'lostpassword', 'rp', 'resetpass' ), true ) ) {
						return;
					}

					// ✅ Block wp-login.php access
					global $wp_query;
					$wp_query->set_404();
					status_header( 404 );
					nocache_headers();
					include get_404_template();
					exit;
				}
			}
		} );

		// 2. Add rewrite rule for /your-slug
		add_action( 'init', function () use ( $custom_login_slug ) {

		
			add_rewrite_rule(
				"^{$custom_login_slug}/?$",
				'index.php?thlogin_custom_login=1',
				'top'
			);

			// Flush rules if our rule isn't there yet
			$rules = get_option('rewrite_rules');
			if (!isset($rules["^{$custom_login_slug}/?$"])) {
				flush_rewrite_rules(false);
			}

		} );

		// 3. Register query var
		add_filter( 'query_vars', function ( $vars ) {
			$vars[] = 'thlogin_custom_login';
			return $vars;
		} );
		
		add_action( 'template_redirect', function () {
				if ( get_query_var( 'thlogin_custom_login' ) ) {

					if ( is_user_logged_in() ) {
						wp_redirect( home_url() ); // You can change this to admin_url() or site_url('/dashboard/') etc.
						exit;
					}

					$this->render_custom_login_page();

				}
			} );

	}

	public function custom_html_before_forms() {
    // Start output buffering
    ob_start();

    // Use printf to print the opening div tag
    printf(
        '<div class="thlogin-custom-admin">%s',
        '' // Empty content before the forms, just the opening div
    );

    // Return the buffered content
    return ob_get_clean();
}

public function custom_html_after_forms() {
    // Start output buffering
    ob_start();

    // Use printf to print the closing div tag
    printf(
        '%s',
        '</div>' // Just the closing div tag
    );

    // Return the buffered content
    return ob_get_clean();
}
public function output_custom_html_before_forms() {
    // Echo the content returned by the function
   echo wp_kses_post($this->custom_html_before_forms());
}

public function output_custom_html_after_forms() {
    // Echo the content returned by the function
  echo  wp_kses_post($this->custom_html_after_forms());
}

	public function render_custom_login_page() {
		status_header( 200 );
add_action( 'thlogin_before_modal', array( $this, 'output_custom_html_before_forms' ) );
 add_action( 'thlogin_after_modal', array( $this, 'output_custom_html_after_forms' ) );
	$template = THLOGIN_PATH . 'templates/custom-login-page.php';

    if ( file_exists( $template ) ) {
        include $template;
    } else {
        wp_die( esc_html__( 'Custom login template not found.', 'themehunk-login-registration' ) );
    }

		exit;
	}

	public function ensure_thlogin_page_exists() {
		if ( ! is_admin() || ! current_user_can( 'manage_options' ) ) {
			return; // Only admins can auto-create/update page
		}

		$page = get_page_by_path( 'th-login' );

		if ( ! $page ) {
			// Page doesn't exist, create it
			wp_insert_post( array(
				'post_title'   => 'TH Login',
				'post_name'    => 'th-login',
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_content' => '[thlogin_combined_form]',
				'meta_input'   => array( '_thlogin_page' => '1' )
			) );
		} else {
			// Page exists — ensure correct shortcode is present
			$expected_shortcode = '[thlogin_combined_form]';

			if ( strpos( $page->post_content, $expected_shortcode ) === false ) {
				// Shortcode missing — update page content
				wp_update_post( array(
					'ID'           => $page->ID,
					'post_content' => $expected_shortcode,
				) );
			}
		}
	}

	public function maybe_override_myaccount_page() {
		if (
			! is_user_logged_in() &&
			is_page( wc_get_page_id( 'myaccount' ) )
		) {
			add_filter( 'the_content', array( $this, 'render_thlogin_combined_form' ), 999 );
		}
	}

	public function render_thlogin_combined_form( $content ) {
		return do_shortcode( '[thlogin_combined_form]' );
	}
}

