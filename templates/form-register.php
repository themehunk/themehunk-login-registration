<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! get_option( 'users_can_register' ) ) {
	echo '<p class="thlogin-error-message">' . esc_html__( 'User registration is currently disabled on this site.', 'th-login' ) . '</p>';
	return;
}

$all_settings        = get_option( 'thlogin_settings', [] );
$form_fields_settings = $all_settings['form_fields'] ?? [];
$register_fields      = $form_fields_settings['register'] ?? [];
$security_settings    = $all_settings['security'] ?? [];
$design_settings = $all_settings['design'] ?? [];
?>

<div class="thlogin-form thlogin-form--register" data-form-type="register" style="display: none;">
	<?php require THLOGIN_PATH . 'templates/parts/form-header.php'; ?>

	<form class="thlogin-ajax-form th-login-from-feilds-combine" data-form-type="register">
		<div class="thlogin-messages" aria-live="polite"></div>

		<h3><?php esc_html_e( 'Register', 'th-login' ); ?></h3>
		
			<?php foreach ( $register_fields as $field ) :
				if ( ! ( $field['show'] ?? true ) || ( $field['hidden'] ?? false ) ) {
					continue;
				}

				$field_id    = sanitize_key( $field['id'] ?? '' );
				$field_label = sanitize_text_field( $field['label'] ?? '' );
				$field_name  = sanitize_key( $field['name'] ?? $field_id );
				$field_type  = sanitize_text_field( $field['type'] ?? 'text' );
				$placeholder = sanitize_text_field( $field['placeholder'] ?? '' );
				$is_required = ! empty( $field['required'] );
				$icon        = sanitize_text_field( $field['icon'] ?? '' );

				$icon_position = $design_settings['icon']['icon_position'] ?? 'with-label';
				$show_icon_in_label = $icon && $icon_position === 'with-label';
				$show_icon_in_input = $icon && $icon_position === 'inside-input';

				$autocomplete_attr = '';
				if ( $field_type === 'password' ) {
					$autocomplete_attr = 'new-password';
				} elseif ( $field_type === 'email' ) {
					$autocomplete_attr = 'email';
				}

				// Handle Terms & Conditions separately
				if ( $field_type === 'checkbox' && strpos( strtolower( $field_name ), 'terms' ) !== false ) : ?>
					<p class="thlogin-form-field thlogin-form-field--terms">
						<input type="checkbox"
							name="<?php echo esc_attr( $field_name ); ?>"
							id="th-register-<?php echo esc_attr( $field_id ); ?>"
							value="1"
							<?php echo $is_required ? 'required' : ''; ?>
						>
						<label for="th-register-<?php echo esc_attr( $field_id ); ?>">
							<?php
							echo wp_kses_post(
								$field_label ?: esc_html__( 'I agree to the Terms & Conditions', 'th-login' )
							);
							?>
						</label>
					</p>
					<?php continue;
				endif;
				?>

				<p class="thlogin-form-field">
					<label for="th-register-<?php echo esc_attr( $field_id ); ?>" class="thlogin-label-with-icon">
						<?php if ($show_icon_in_label) : ?>
                            <span class="thlogin-label-icon"><?php echo thlogin_get_icon_svg($icon); ?></span>
                        <?php endif; ?>
						<span class="thlogin-label-text">
							<?php echo esc_html( $field_label ); ?>
							<?php if ( $is_required ) : ?><span class="th-required">*</span><?php endif; ?>
						</span>
					</label>
					<input
						class="<?php echo $show_icon_in_input ? 'icon-activated-input' : ''; ?>"
                        <?php if ($show_icon_in_input) : ?>
                            style="background-image: <?php echo thlogin_get_icon_svg_data_uri($icon); ?>;"
                        <?php endif; ?>
						type="<?php echo esc_attr( $field_type ); ?>"
						name="<?php echo esc_attr( $field_name ); ?>"
						id="th-register-<?php echo esc_attr( $field_id ); ?>"
						placeholder="<?php echo esc_attr( $placeholder ); ?>"
						<?php echo $is_required ? 'required' : ''; ?>
						<?php echo $autocomplete_attr ? 'autocomplete="' . esc_attr( $autocomplete_attr ) . '"' : ''; ?>
					>
				</p>
			<?php endforeach; ?>

			<?php if ( ! empty( $security_settings['honeypot_enabled'] ) ) : ?>
				<p class="thlogin-form-field thlogin-form-field--honeypot" style="display: none;">
					<label for="thlogin_hp"><?php esc_html_e( 'Leave this field empty', 'th-login' ); ?></label>
					<input
						type="text"
						name="thlogin_hp"
						id="thlogin_hp"
						tabindex="-1"
						autocomplete="off"
					>
				</p>
			<?php endif; ?>

			<?php
				$recaptcha = $security_settings['recaptcha'] ?? [];
				$show_on = $recaptcha['show_on'] ?? 'all';

				if (
					!empty($recaptcha['enabled']) &&
					($show_on === 'all' || $show_on === 'register')
				) :
				?>

				<?php if ($security_settings['recaptcha']['type'] === 'v2_checkbox') : ?>
					<div class="thlogin-form-field">
						<div class="g-recaptcha" data-sitekey="<?php echo esc_attr($security_settings['recaptcha']['site_key']); ?>"></div>
					</div>
				<?php elseif ($security_settings['recaptcha']['type'] === 'v3') : ?>
					<input type="hidden" id="g-recaptcha-response-register" name="g-recaptcha-response">
					<script>
					document.addEventListener('DOMContentLoaded', function () {
						if (typeof grecaptcha !== 'undefined') {
							grecaptcha.ready(function () {
								grecaptcha.execute('<?php echo esc_attr($security_settings['recaptcha']['site_key']); ?>', {
									action: 'register'
								}).then(function (token) {
									document.getElementById('g-recaptcha-response-register').value = token;
								});
							});
						}
					});
					</script>
				<?php endif; ?>
			<?php endif; ?>

			<p class="thlogin-form-submit">
				<button type="submit" class="thlogin-button thlogin-button--primary">
					<?php esc_html_e( 'Register', 'th-login' ); ?>
				</button>
			</p>

		<p class="thlogin-form-links">
			<a href="#" class="thlogin-link" data-th-popup-action="login">
				<?php esc_html_e( 'Already have an account? Log In', 'th-login' ); ?>
			</a>
		</p>
	</form>

	<?php require THLOGIN_PATH . 'templates/parts/form-footer.php'; ?>
</div>
