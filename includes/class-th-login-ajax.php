<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles all AJAX requests for TH Login plugin.
 */
class TH_Login_Ajax {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Register AJAX handlers for login, register, forgot password, etc.
		// Example: add_action( 'wp_ajax_nopriv_th_login_login', array( $this, 'handle_login' ) );
		// Example: add_action( 'wp_ajax_th_login_login', array( $this, 'handle_login' ) );
	}
}
