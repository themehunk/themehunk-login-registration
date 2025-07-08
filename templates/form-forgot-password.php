<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$form_fields_settings = json_decode( get_option( 'th_login_form_fields_settings', '{}' ), true );
$forgot_password_fields = $form_fields_settings['forgot_password'] ?? array();
?>
<div class="th-login-form th-login-form--forgot-password" data-form-type="forgot-password" style="display: none;">
    <?php
    // Include form header (logo, custom HTML).
    require TH_LOGIN_PATH . 'templates/parts/form-header.php';
    ?>

    <form class="th-login-ajax-form" data-form-type="forgot-password">
        <div class="th-login-messages" aria-live="polite"></div>

        <p class="th-login-form-field">
            <label for="th-forgot-password-email"><?php echo esc_html( $forgot_password_fields['email_label'] ?? __( 'Username or Email Address', 'th-login' ) ); ?></label>
            <input type="text" name="user_login" id="th-forgot-password-email" placeholder="<?php echo esc_attr( $forgot_password_fields['email_placeholder'] ?? __( 'Enter your username or email', 'th-login' ) ); ?>" required>
        </p>

        <p class="th-login-form-submit">
            <button type="submit" class="th-login-button th-login-button--primary">
                <?php esc_html_e( 'Reset Password', 'th-login' ); ?>
            </button>
        </p>

        <p class="th-login-form-links">
            <a href="#" class="th-login-link" data-th-popup-action="login"><?php esc_html_e( 'Back to Login', 'th-login' ); ?></a>
        </p>
    </form>

    <?php
    // Include form footer (custom HTML).
    require TH_LOGIN_PATH . 'templates/parts/form-footer.php';
    ?>
</div>
