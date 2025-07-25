<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$all_settings           = get_option( 'thlogin_settings', [] );
$form_fields_settings   = $all_settings['form_fields'] ?? [];
$security_settings      = $all_settings['security'] ?? [];
$design_settings        = $all_settings['design'] ?? [];
$forgot_password_fields = $form_fields_settings['forgot_password'] ?? [];
?>

<div class="thlogin-form thlogin-form--forgot-password" data-form-type="forgot-password" style="display: none;">
	<?php require THLOGIN_PATH . 'templates/parts/form-header.php'; ?>

	<form class="thlogin-ajax-form  th-login-from-feilds-combine" data-form-type="forgot-password">
		<div class="thlogin-messages" aria-live="polite"></div>

		<h3><?php esc_html_e( 'Reset Password', 'th-login' ); ?></h3>

			<?php foreach ( $forgot_password_fields as $field ) :
				if ( ! empty( $field['hidden'] ) ) {
					continue;
				}

				$type        = sanitize_text_field( $field['type'] ?? 'text' );
				$name        = sanitize_text_field( $field['name'] ?? '' );
				$id          = sanitize_html_class( $field['id'] ?? 'field_' . uniqid() );
				$label       = sanitize_text_field( $field['label'] ?? '' );
				$placeholder = sanitize_text_field( $field['placeholder'] ?? '' );
				$required    = ! empty( $field['required'] );
				$icon        = sanitize_text_field( $field['icon'] ?? '' );

				$icon_position = $design_settings['icon']['icon_position'] ?? 'with-label';
				$show_icon_in_label = $icon && $icon_position === 'with-label';
				$show_icon_in_input = $icon && $icon_position === 'inside-input';

				// Only include fields with name hinting email or username
				if ( stripos( $name, 'email' ) === false && stripos( $name, 'user' ) === false ) {
					continue;
				}

				$autocomplete = ( stripos( $name, 'email' ) !== false ) ? 'email' : 'username';
			?>
				<p class="thlogin-form-field">
					<label for="<?php echo esc_attr( $id ); ?>" class="thlogin-label-with-icon">
						<?php if ($show_icon_in_label) : ?>
                           <span class="thlogin-label-icon">
								<?php echo wp_kses( thlogin_get_icon_svg( $icon ), thlogin_get_allowed_svg_tags() ); ?>
							</span>

                        <?php endif; ?>
						<span class="thlogin-label-text">
							<?php echo esc_html( $label ); ?>
							<?php if ( $required ) : ?><span class="th-required">*</span><?php endif; ?>
						</span>
					</label>
					<input
						class="<?php echo $show_icon_in_input ? 'icon-activated-input' : ''; ?>"
                        <?php if ($show_icon_in_input) : ?>
                           style="background-image: <?php echo esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ); ?>;"
                        <?php endif; ?>
						type="<?php echo esc_attr( $type ); ?>"
						name="<?php echo esc_attr( $name ); ?>"
						id="<?php echo esc_attr( $id ); ?>"
						placeholder="<?php echo esc_attr( $placeholder ); ?>"
						<?php echo $required ? 'required' : ''; ?>
						autocomplete="<?php echo esc_attr( $autocomplete ); ?>"
					/>
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

			<p class="thlogin-form-submit">
				<button type="submit" class="thlogin-button thlogin-button--primary">
					<?php esc_html_e( 'Reset Password', 'th-login' ); ?>
				</button>
			</p>

			<p class="thlogin-form-links">
				<a href="#" class="thlogin-link" data-th-popup-action="login">
					<?php esc_html_e( 'Back to Login', 'th-login' ); ?>
				</a>
			</p>

	</form>

	<?php require THLOGIN_PATH . 'templates/parts/form-footer.php'; ?>
</div>
