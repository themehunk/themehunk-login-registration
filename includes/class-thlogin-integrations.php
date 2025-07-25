<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class THLogin_Integrations {

 	public function __construct() {

     	$settings         = get_option( 'thlogin_settings', array() );
		$general_settings = $settings['general'] ?? array();
		$integration      = $settings['integration'] ?? array();
		$display_mode         = $general_settings['display_mode'] ?? 'page';

        $woocommerce_enabled = !empty($integration['woocommerce']['enabled']);

        // If WooCommerce is active AND integration enabled → override myaccount page
        if (class_exists('WooCommerce') && $woocommerce_enabled) {
            add_action('template_redirect', array($this, 'maybe_override_myaccount_page'));
        }

        // WooCommerce not active or not enabled — check for fallback page
        elseif ($display_mode === 'page') {
           add_action( 'init', array( $this, 'ensure_thlogin_page_exists' ) );
        }
    }

	public function create_my_custom_page() {
        $page_title = 'My Custom Page';
        $page_content = '<p>This is the content of my custom page.</p>';
        $page_slug = 'my-custom-page';
        $page_status = 'publish';
        $page_author = 1; // Replace with the actual user ID
    
        $new_page_id = wp_insert_post(array(
            'post_title'    => $page_title,
            'post_content'  => $page_content,
            'post_name'     => $page_slug,
            'post_status'   => $page_status,
            'post_author'   => $page_author,
            'post_type'     => 'page'
        ));
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

