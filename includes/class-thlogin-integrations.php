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
		// 1. Disable wp-login.php
		add_action( 'init', function () {
			if ( strpos( $_SERVER['REQUEST_URI'], 'wp-login.php' ) !== false ) {
				global $wp_query;
				$wp_query->set_404();
				status_header( 404 );
				nocache_headers();
				include get_404_template();
				exit;
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

		echo '<!DOCTYPE html><html><head>';
		echo wp_head();
			echo '<style>
				.thlogin-popup-modal { 
					display:flex !important; 
					visibility:visible !important;
					opacity:1 !important; 
				}
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

				.thlogin-popup-modal.thlogin-slide-in-left,.thlogin-popup-modal.thlogin-slide-in-right {
					animation: none !important;
					transform: none !important;
					opacity: 1 !important;
					justify-content:center !important;
				}

				.thlogin-slide-in-left.thlogin-popup-modal--opening .thlogin-popup-form-container, .thlogin-slide-in-right.thlogin-popup-modal--opening .thlogin-popup-form-container{
					animation: none !important;
				}

				.thlogin-slide-in-left.thlogin-popup-modal--closing .thlogin-popup-form-container, .thlogin-slide-in-right.thlogin-popup-modal--closing .thlogin-popup-form-container{
					animation: none !important;
				}

				.thlogin-page .thlogin-popup-form-container{
					height:auto !important;
				}

				#thlogin-popup-modal.thlogin-page{
					display:flex !important;
				}

				.thlogin-popup-modal.thlogin-popup-modal--opening{
					animation:none !important;
					transform: none !important;
					opacity: 1 !important;
				}

				.thlogin-popup-modal-effect .thlogin-popup-form-container{
					animation:none !important;
					transform: none !important;
					opacity: 1 !important;
				}

				.thlogin-popup-modal.thlogin-slide-in-left.thlogin-popup-modal--opening .thlogin-popup-form-container,.thlogin-popup-modal.thlogin-slide-in-right.thlogin-popup-modal--opening .thlogin-popup-form-container{
					animation:none !important;
					transform: none !important;
					opacity: 1 !important;
					height:auto !important;
				}

				.integration_single {
					.thlogin-form-toggle {
						display: none;
					}

					.thlogin-link-separator {
						display: none;
					}

					.thlogin-link[data-th-popup-action="register"] {
						display: none;
					}
					}


			</style>';

			// Your custom inline JS
			echo '<script>
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

						document.querySelectorAll(".thlogin-slide-in-left").forEach(function (el) {
							el.classList.remove("thlogin-slide-in-left");
						});
					});
				</script>';

		
				echo '</head><body>';
			echo wp_footer();

		echo '</body></html>';

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

