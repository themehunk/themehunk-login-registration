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
					// $action = isset( $_GET['action'] ) ? sanitize_text_field( wp_unslash( $_GET['action'] ) ) : '';

					// if ( in_array( $action, array( 'logout', 'lostpassword', 'rp', 'resetpass' ), true ) ) {
					// 	return;
					// }

					// //  Redirect everything else to custom login page
					// wp_redirect( home_url( "/{$custom_login_slug}/" ) );
					// exit;


	//////////////MODIFIED CODE IF NOT WORK uncomment above code/////////////////////////
					// Allow password reset or logout to process
				$action = isset( $_GET['action'] ) ? sanitize_text_field( wp_unslash( $_GET['action'] ) ) : '';

				// List of allowed actions
				$allowed_actions = array( 'logout', 'lostpassword', 'rp', 'resetpass' );

				// Check if the action is **not** one of the allowed actions
				if ( ! in_array( $action, $allowed_actions, true ) ) {
				    // Redirect everything else to custom login page
				    wp_redirect( home_url( "/{$custom_login_slug}/" ) );
				    exit;
				}

				// Nonce verification for sensitive actions
				if ( $action === 'resetpass' && isset( $_GET['key'] ) && isset( $_GET['login'] ) ) {
				    if ( ! isset( $_GET['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ), 'reset-password' ) ) {
				        wp_die( esc_html__( 'Security check failed', 'th-login' ) );
				    }
				}

				// If action is allowed, continue processing
				return;
				//////////////////////MODIFIED CODE/////////////////////////



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

	public function render_custom_login_page() {
	status_header( 200 );

	//Register and enqueue CSS
	wp_register_style(
		'thlogin-custom-login',
		THLOGIN_URL . 'assets/css/thlogin-custom-login.css',
		array(),
		THLOGIN_VERSION
	);
	wp_enqueue_style('thlogin-custom-login');

	//Register and enqueue JS
	wp_register_script(
		'thlogin-custom-login',
		THLOGIN_URL . 'assets/js/thlogin-custom-login.js',
		array(), // add dependencies if needed e.g., array('jquery')
		THLOGIN_VERSION,
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);
	wp_enqueue_script('thlogin-custom-login');

	// Output template
	?>
	<!DOCTYPE html>
	<html <?php language_attributes(); ?>>
	<head>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class( 'thlogin-page' ); ?>>
		<div id="thlogin-inline-wrapper">
			<?php echo do_shortcode( '[thlogin_combined_form]' ); ?>
		</div>
		<?php wp_footer(); ?>
	</body>
	</html>
	<?php
	exit;
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

