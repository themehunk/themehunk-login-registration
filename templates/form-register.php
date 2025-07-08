<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


if ( ! get_option( 'users_can_register' ) ) {
	echo '<p class="th-login-error-message">' . esc_html__( 'User registration is currently disabled on this site.', 'th-login' ) . '</p>';
	return;
}

$form_fields_settings = json_decode( get_option( 'th_login_form_fields_settings', '{}' ), true );
$register_fields = $form_fields_settings['register'] ?? array();

// Instantiate the forms class to access the rendering method.
$th_login_forms = new TH_Login_Forms();
?>
<div class="th-login-form th-login-form--register" data-form-type="register" style="display: none;">
    <?php
    // Include form header (logo, custom HTML).
    require TH_LOGIN_PATH . 'templates/parts/form-header.php';
    ?>

    <form class="th-login-ajax-form" data-form-type="register">
        <div class="th-login-messages" aria-live="polite"></div>

        <p class="th-login-form-field">
            <label for="th-register-username"><?php echo esc_html( $register_fields['username_label'] ?? __( 'Choose a Username', 'th-login' ) ); ?></label>
            <input type="text" name="username" id="th-register-username" placeholder="<?php echo esc_attr( $register_fields['username_placeholder'] ?? __( 'Enter your desired username', 'th-login' ) ); ?>" required>
        </p>

        <p class="th-login-form-field">
            <label for="th-register-email"><?php echo esc_html( $register_fields['email_label'] ?? __( 'Email Address', 'th-login' ) ); ?></label>
            <input type="email" name="email" id="th-register-email" placeholder="<?php echo esc_attr( $register_fields['email_placeholder'] ?? __( 'Enter your email', 'th-login' ) ); ?>" required>
        </p>

        <p class="th-login-form-field">
            <label for="th-register-password"><?php echo esc_html( $register_fields['password_label'] ?? __( 'Create Password', 'th-login' ) ); ?></label>
            <input type="password" name="password" id="th-register-password" placeholder="<?php echo esc_attr( $register_fields['password_placeholder'] ?? __( 'Create a strong password', 'th-login' ) ); ?>" required>
            <!-- Password strength meter will be handled by JS -->
        </p>

        <p class="th-login-form-field">
            <label for="th-register-confirm-password"><?php echo esc_html( $register_fields['confirm_password_label'] ?? __( 'Confirm Password', 'th-login' ) ); ?></label>
            <input type="password" name="confirm_password" id="th-register-confirm-password" placeholder="<?php echo esc_attr( $register_fields['confirm_password_placeholder'] ?? __( 'Confirm your password', 'th-login' ) ); ?>" required>
        </p>

        <?php
        // Render custom registration fields here.
        $th_login_forms->render_custom_registration_fields();
        ?>

        <?php if ( ( $register_fields['terms_and_conditions']['enabled'] ?? false ) ) : ?>
        <p class="th-login-form-field th-login-form-field--terms">
            <input type="checkbox" name="terms" id="th-register-terms" value="1" <?php echo ( $register_fields['terms_and_conditions']['required'] ?? false ) ? 'required' : ''; ?>>
            <label for="th-register-terms">
                <?php
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML is expected here for links.
                echo $register_fields['terms_and_conditions']['label'] ?? __( 'I agree to the Terms & Conditions', 'th-login' );
                ?>
            </label>
        </p>
        <?php endif; ?>

        <?php
        // Honeypot field (hidden) for basic anti-spam.
        if ( ( $register_fields['honeypot_enabled'] ?? true ) ) :
            $honeypot_field_name = 'th_login_hp_' . wp_rand( 1000, 9999 );
        ?>
        <p class="th-login-form-field th-login-form-field--honeypot" style="display: none;">
            <label for="<?php echo esc_attr( $honeypot_field_name ); ?>"><?php esc_html_e( 'Please leave this field empty', 'th-login' ); ?></label>
            <input type="text" name="<?php echo esc_attr( $honeypot_field_name ); ?>" id="<?php echo esc_attr( $honeypot_field_name ); ?>" tabindex="-1" autocomplete="off">
        </p>
        <?php endif; ?>

        <p class="th-login-form-submit">
            <button type="submit" class="th-login-button th-login-button--primary">
                <?php esc_html_e( 'Register', 'th-login' ); ?>
            </button>
        </p>

        <p class="th-login-form-links">
            <a href="#" class="th-login-link" data-th-popup-action="login"><?php esc_html_e( 'Already have an account? Log In', 'th-login' ); ?></a>
        </p>
    </form>

    <?php
    // Include form footer (custom HTML).
    require TH_LOGIN_PATH . 'templates/parts/form-footer.php';
    ?>
</div>
