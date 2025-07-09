<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get form fields settings.
$form_fields_settings = json_decode( get_option( 'th_login_form_fields_settings', '{}' ), true );
$general_settings     = json_decode( get_option( 'th_login_general_settings', '{}' ), true );
$login_fields         = $form_fields_settings['login'] ?? array();
?>

<div class="th-login-form th-login-form--login" data-form-type="login">
	<?php require TH_LOGIN_PATH . 'templates/parts/form-header.php'; ?>

	<form class="th-login-ajax-form" data-form-type="login">
		<div class="th-login-messages" aria-live="polite"></div>

		<?php foreach ( $login_fields as $field ) :
			if ( ! empty( $field['hidden'] ) ) continue;

			$type        = $field['type'] ?? 'text';
			$name        = esc_attr( $field['name'] ?? '' );
			$id          = esc_attr( $field['id'] ?? 'field_' . uniqid() );
			$label       = $field['label'] ?? '';
			$placeholder = $field['placeholder'] ?? '';
			$required    = ! empty( $field['required'] );
			$icon_class  = ! empty( $field['icon'] ) ? 'dashicons-' . esc_attr( $field['icon'] ) : '';

			$field_class = 'th-login-form-field';
			if ( $type === 'checkbox' ) {
				$field_class .= ' th-login-form-field--checkbox';
			}

			// Basic autocomplete guessing (optional fallback)
			$autocomplete = '';
			if ( stripos( $name, 'user' ) !== false ) {
				$autocomplete = 'username';
			} elseif ( stripos( $name, 'email' ) !== false ) {
				$autocomplete = 'email';
			} elseif ( stripos( $name, 'pass' ) !== false ) {
				$autocomplete = 'current-password';
			}
		?>
			<p class="<?php echo esc_attr( $field_class ); ?>">
				<?php if ( $type === 'checkbox' ) : ?>
					<input
						type="checkbox"
						name="<?php echo $name; ?>"
						id="<?php echo $id; ?>"
						value="1"
					/>
					<label for="<?php echo $id; ?>">
						<?php echo esc_html( $label ); ?>
						<?php if ( $required ) : ?>
							<span class="th-required">*</span>
						<?php endif; ?>
					</label>
				<?php else : ?>
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
						<?php echo $autocomplete ? 'autocomplete="' . esc_attr( $autocomplete ) . '"' : ''; ?>
					/>
				<?php endif; ?>
			</p>
		<?php endforeach; ?>

		<p class="th-login-form-submit">
			<button type="submit" class="th-login-button th-login-button--primary">
				<?php esc_html_e( 'Log In', 'th-login' ); ?>
			</button>
		</p>

		<p class="th-login-form-links">
			<a href="#" class="th-login-link" data-th-popup-action="forgot-password"><?php esc_html_e( 'Forgot Password?', 'th-login' ); ?></a>
			<?php if ( $general_settings['form_type'] === 'double' ) : ?>
				<span class="th-login-link-separator">|</span>
				<a href="#" class="th-login-link" data-th-popup-action="register"><?php esc_html_e( 'Register', 'th-login' ); ?></a>
			<?php endif; ?>
		</p>
	</form>

	<?php require TH_LOGIN_PATH . 'templates/parts/form-footer.php'; ?>
</div>
