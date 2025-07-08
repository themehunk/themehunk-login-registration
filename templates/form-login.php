<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get form fields settings.
$form_fields_settings = json_decode( get_option( 'th_login_form_fields_settings', '{}' ), true );
$login_fields = $form_fields_settings['login'] ?? array();
?>
<div class="th-login-form th-login-form--login" data-form-type="login">
    <?php
    // Include form header (logo, custom HTML).
    require TH_LOGIN_PATH . 'templates/parts/form-header.php';
    ?>

    <form class="th-login-ajax-form" data-form-type="login">
        <div class="th-login-messages" aria-live="polite"></div>

        <p class="th-login-form-field">
            <label for="th-login-username"><?php echo esc_html( $login_fields['username_label'] ?? __( 'Username or Email Address', 'th-login' ) ); ?></label>
            <input type="text" name="username" id="th-login-username" placeholder="<?php echo esc_attr( $login_fields['username_placeholder'] ?? __( 'Enter your username or email', 'th-login' ) ); ?>" required>
        </p>

        <p class="th-login-form-field">
            <label for="th-login-password"><?php echo esc_html( $login_fields['password_label'] ?? __( 'Password', 'th-login' ) ); ?></label>
            <input type="password" name="password" id="th-login-password" placeholder="<?php echo esc_attr( $login_fields['password_placeholder'] ?? __( 'Enter your password', 'th-login' ) ); ?>" required>
        </p>

        <?php if ( ( $login_fields['show_remember_me'] ?? true ) ) : ?>
        <p class="th-login-form-field th-login-form-field--remember">
            <input type="checkbox" name="rememberme" id="th-login-rememberme" value="forever">
            <label for="th-login-rememberme"><?php echo esc_html( $login_fields['remember_me_label'] ?? __( 'Remember Me', 'th-login' ) ); ?></label>
        </p>
        <?php endif; ?>

        <p class="th-login-form-submit">
            <button type="submit" class="th-login-button th-login-button--primary">
                <?php esc_html_e( 'Log In', 'th-login' ); ?>
            </button>
        </p>

        <p class="th-login-form-links">
            <a href="#" class="th-login-link" data-th-popup-action="forgot-password"><?php esc_html_e( 'Forgot Password?', 'th-login' ); ?></a>
            <?php if ( get_option( 'users_can_register' ) ) : ?>
                <span class="th-login-link-separator">|</span>
                <a href="#" class="th-login-link" data-th-popup-action="register"><?php esc_html_e( 'Register', 'th-login' ); ?></a>
            <?php endif; ?>
        </p>
    </form>

    <?php
    // Include form footer (custom HTML).
    require TH_LOGIN_PATH . 'templates/parts/form-footer.php';
    ?>
</div>