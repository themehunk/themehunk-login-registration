<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles all third-party integrations for TH Login, e.g., WooCommerce.
 */
class TH_Login_Integrations {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Check if WooCommerce is active.
		if ( class_exists( 'WooCommerce' ) ) {
			add_action( 'template_redirect', array( $this, 'handle_woocommerce_redirects' ) );
			add_filter( 'woocommerce_login_form', array( $this, 'filter_woocommerce_login_form' ) );
			add_filter( 'woocommerce_register_form', array( $this, 'filter_woocommerce_register_form' ) );
			add_filter( 'woocommerce_lost_password_form', array( $this, 'filter_woocommerce_lost_password_form' ) );

			// Optionally, remove default WooCommerce messages if our modal handles them.
			// add_filter( 'wc_add_to_cart_message_html', '__return_false' );
		}
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

	/**
	 * Handles redirects for WooCommerce My Account, Login, and Register pages.
	 */
	public function handle_woocommerce_redirects() {
		$display_triggers_settings = $this->safe_json_option( 'th_login_display_triggers_settings' );
		$general_settings = $this->safe_json_option( 'th_login_general_settings' );

		// Only apply redirects if the plugin is enabled.
		if ( ( $general_settings['plugin_status'] ?? 'enabled' ) !== 'enabled' ) {
			return;
		}

		// Check if on My Account page.
		if ( is_account_page() ) {
			// If on My Account login/register tab and TH Login is set to open on My Account page.
			$on_my_account_page_trigger = $display_triggers_settings['auto_open_conditions']['on_woocommerce_myaccount'] ?? false;

			if ( ! is_user_logged_in() && $on_my_account_page_trigger ) {
				// Redirect to home with a URL parameter to trigger the popup.
				// This assumes the frontend JS will pick up 'th_login_action=login' or 'th_login_action=register'
				// and open the modal.
				$current_url = home_url( add_query_arg( null, null ) );
				$login_url = wc_get_page_permalink( 'myaccount' );

				if ( strpos( $current_url, $login_url ) !== false ) {
					// Check if it's the login/register part of My Account.
					if ( isset( $_GET['action'] ) && ( 'register' === $_GET['action'] || 'login' === $_GET['action'] ) ) {
						// Redirect to home with a popup trigger.
						wp_safe_redirect( add_query_arg( 'th_login_action', $_GET['action'], home_url() ) );
						exit;
					} elseif ( ! isset( $_GET['action'] ) && ! isset( $_GET['logged_out'] ) ) {
						// If just on the main My Account page (not logged in), trigger login popup.
						wp_safe_redirect( add_query_arg( 'th_login_action', 'login', home_url() ) );
						exit;
					}
				}
			}
		}

		// Check if on Checkout page.
		if ( is_checkout() && ! is_user_logged_in() ) {
			$on_checkout_page_trigger = $display_triggers_settings['auto_open_conditions']['on_woocommerce_checkout'] ?? false;
			if ( $on_checkout_page_trigger ) {
				// If not logged in and on checkout, trigger login popup.
				wp_safe_redirect( add_query_arg( 'th_login_action', 'login', home_url() ) );
				exit;
			}
		}
	}

	/**
	 * Filters the WooCommerce login form to potentially hide it or add our trigger.
	 *
	 * @param string $form The WooCommerce login form HTML.
	 * @return string Modified form HTML.
	 */
	public function filter_woocommerce_login_form( $form ) {
		$display_triggers_settings = $this->safe_json_option( 'th_login_display_triggers_settings' );
		$on_my_account_page_trigger = $display_triggers_settings['auto_open_conditions']['on_woocommerce_myaccount'] ?? false;

		if ( $on_my_account_page_trigger ) {
			// If we are redirecting to a popup, we can hide the default form.
			// Or, replace it with a button that triggers our popup.
			$login_text = $display_triggers_settings['menu_integration']['item_text_login'] ?? esc_html__( 'Login', 'th-login' );
			$trigger_class = $display_triggers_settings['trigger_css_class'] ?? 'th-login-trigger';

			return sprintf(
				'<p class="th-login-wc-form-replacement">%s</p><p><a href="#" class="%s" data-th-popup-action="login">%s</a></p>',
				esc_html__( 'Please use our custom login form.', 'th-login' ),
				esc_attr( $trigger_class ),
				esc_html( $login_text )
			);
		}
		return $form;
	}

	/**
	 * Filters the WooCommerce registration form to potentially hide it or add our trigger.
	 *
	 * @param string $form The WooCommerce registration form HTML.
	 * @return string Modified form HTML.
	 */
	public function filter_woocommerce_register_form( $form ) {
		$display_triggers_settings = $this->safe_json_option( 'th_login_display_triggers_settings' );
		$on_my_account_page_trigger = $display_triggers_settings['auto_open_conditions']['on_woocommerce_myaccount'] ?? false;

		if ( $on_my_account_page_trigger ) {
			$register_text = $display_triggers_settings['menu_integration']['item_text_register'] ?? esc_html__( 'Register', 'th-login' );
			$trigger_class = $display_triggers_settings['trigger_css_class'] ?? 'th-login-trigger';

			return sprintf(
				'<p class="th-login-wc-form-replacement">%s</p><p><a href="#" class="%s" data-th-popup-action="register">%s</a></p>',
				esc_html__( 'Please use our custom registration form.', 'th-login' ),
				esc_attr( $trigger_class ),
				esc_html( $register_text )
			);
		}
		return $form;
	}

	/**
	 * Filters the WooCommerce lost password form to potentially hide it or add our trigger.
	 *
	 * @param string $form The WooCommerce lost password form HTML.
	 * @return string Modified form HTML.
	 */
	public function filter_woocommerce_lost_password_form( $form ) {
		$display_triggers_settings = $this->safe_json_option( 'th_login_display_triggers_settings' );
		$on_my_account_page_trigger = $display_triggers_settings['auto_open_conditions']['on_woocommerce_myaccount'] ?? false;

		if ( $on_my_account_page_trigger ) {
			$forgot_password_text = esc_html__( 'Forgot Password', 'th-login' ); // No specific setting for this text, use default.
			$trigger_class = $display_triggers_settings['trigger_css_class'] ?? 'th-login-trigger';

			return sprintf(
				'<p class="th-login-wc-form-replacement">%s</p><p><a href="#" class="%s" data-th-popup-action="forgot-password">%s</a></p>',
				esc_html__( 'Please use our custom password reset form.', 'th-login' ),
				esc_attr( $trigger_class ),
				esc_html( $forgot_password_text )
			);
		}
		return $form;
	}
}
