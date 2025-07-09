<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$form_fields_settings     = json_decode( get_option( 'th_login_form_fields_settings', '{}' ), true );
$forgot_password_fields   = $form_fields_settings['forgot_password'] ?? array();
?>

<div class="th-login-form th-login-form--forgot-password" data-form-type="forgot-password" style="display: none;">
	<?php require TH_LOGIN_PATH . 'templates/parts/form-header.php'; ?>

	<form class="th-login-ajax-form" data-form-type="forgot-password">
		<div class="th-login-messages" aria-live="polite"></div>

		<?php foreach ( $forgot_password_fields as $field ) :
			if ( ! empty( $field['hidden'] ) ) {
				continue;
			}

			$type        = $field['type'] ?? 'text';
			$name        = esc_attr( $field['name'] ?? '' );
			$id          = esc_attr( $field['id'] ?? 'field_' . uniqid() );
			$label       = $field['label'] ?? '';
			$placeholder = $field['placeholder'] ?? '';
			$required    = ! empty( $field['required'] );
			$logic_key   = $field['logic_key'] ?? '';

			// Only allow email/user fields
			if ( ! in_array( $logic_key, [ 'user', 'email' ], true ) ) {
				continue;
			}

			// Set autocomplete
			$autocomplete = $logic_key === 'email' ? 'email' : 'username';
		?>
			<p class="th-login-form-field">
				<label for="<?php echo $id; ?>">
					<?php echo esc_html( $label ); ?>
					<?php if ( $required ) : ?>
						<span class="th-required">*</span>
					<?php endif; ?>
				</label>
				<input
					type="<?php echo esc_attr( $type ); ?>"
					name="<?php echo $name; ?>"
					id="<?php echo $id; ?>"
					placeholder="<?php echo esc_attr( $placeholder ); ?>"
					<?php echo $required ? 'required' : ''; ?>
					autocomplete="<?php echo esc_attr( $autocomplete ); ?>"
				/>
			</p>
		<?php endforeach; ?>

		<p class="th-login-form-submit">
			<button type="submit" class="th-login-button th-login-button--primary">
				<?php esc_html_e( 'Reset Password', 'th-login' ); ?>
			</button>
		</p>

		<p class="th-login-form-links">
			<a href="#" class="th-login-link" data-th-popup-action="login"><?php esc_html_e( 'Back to Login', 'th-login' ); ?></a>
		</p>
	</form>

	<?php require TH_LOGIN_PATH . 'templates/parts/form-footer.php'; ?>
</div>
