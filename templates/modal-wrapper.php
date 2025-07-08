<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div id="th-login-popup-modal" class="th-login-popup-modal" role="dialog" aria-modal="true" aria-hidden="true" style="display: none;">
    <div class="th-login-popup-overlay"></div>
    <div class="th-login-popup-form-container">
        <?php
        // Close button.
        $design_settings = json_decode( get_option( 'th_login_design_settings', '{}' ), true );
        $close_button_settings = $design_settings['modal']['close_button'] ?? array();
        if ( ( $close_button_settings['enabled'] ?? true ) ) :
            ?>
            <button class="th-login-popup-close-button" aria-label="<?php esc_attr_e( 'Close', 'th-login' ); ?>">
                <span class="dashicons dashicons-no-alt"></span>
            </button>
            <?php
        endif;

        // Include individual form templates.
        require TH_LOGIN_PATH . 'templates/form-login.php';
        require TH_LOGIN_PATH . 'templates/form-register.php';
        require TH_LOGIN_PATH . 'templates/form-forgot-password.php'; // New line for forgot password form.
        ?>
    </div>
</div>
