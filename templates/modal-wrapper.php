<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$design_settings   = json_decode( get_option( 'th_login_design_settings', '{}' ), true );
$general_settings  = json_decode( get_option( 'th_login_general_settings', '{}' ), true );
$form_type         = $general_settings['form_type'] ?? 'double';
$close_button_settings = $general_settings['close_button'] ?? true;

?>

<div id="th-login-popup-modal" class="th-login-popup-modal" role="dialog" aria-modal="true" aria-hidden="true" style="display: none;">
	<div class="th-login-popup-overlay"></div>
	<div class="th-login-popup-form-container">
		

		<?php if ( $close_button_settings ) : ?>
			<button class="th-login-popup-close-button" aria-label="<?php esc_attr_e( 'Close', 'th-login' ); ?>">
				<span class="dashicons dashicons-no-alt"></span>
			</button>
		<?php endif; ?>

		<?php if ( $form_type === 'double' ) : ?>
			<div class="th-login-form-toggle">
				<button type="button" class="th-login-toggle-button th-login-toggle-button--login" data-th-popup-action="login">
					<?php esc_html_e( 'Login', 'th-login' ); ?>
				</button>
				<button type="button" class="th-login-toggle-button th-login-toggle-button--register" data-th-popup-action="register">
					<?php esc_html_e( 'Register', 'th-login' ); ?>
				</button>
			</div>
		<?php endif; ?>

		<?php
		// Load forms
		require TH_LOGIN_PATH . 'templates/form-login.php';
		require TH_LOGIN_PATH . 'templates/form-register.php';
		require TH_LOGIN_PATH . 'templates/form-forgot-password.php';
		?>
	</div>
</div>
