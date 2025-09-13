<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

require_once THLOGIN_PATH . 'templates/parts/form-header.php';

class THLogin_Forgot_Password_Form {
	protected $settings;
	protected $fields;
	protected $layout;

	public function __construct() {
		$this->settings = get_option('thlogin_settings', []);
		$this->fields = $this->settings['form_fields']['forgot_password'] ?? [];
		$this->layout = $this->settings['design']['modal']['modal_input_layout'] ?? 'stack';
	}

	public function render() {
	$security    = $this->settings['security'] ?? [];
	$design      = $this->settings['design'] ?? [];
	$submit_text = $design['submitButton']['forgot_password'] ?? esc_html__( 'Reset', 'th-login' );

	$logo      = $design['logo'] ?? [];
	$logo_url  = ! empty( $logo['url'] ) ? esc_url( $logo['url'] ) : '';
	$logo_size = ! empty( $logo['size'] ) ? esc_attr( $logo['size'] ) : '30px';
	?>

	<div class="thlogin-form thlogin-form--forgot-password" data-form-type="forgot-password" style="display: none;">
		<?php echo wp_kses_post( thlogin_render_form_header() ); ?>

		<?php
		/**
		 * Hook: thlogin_before_forgot_password_form
		 */
		do_action( 'thlogin_before_forgot_password_form' );
		?>

		<form class="thlogin-ajax-form th-login-from-feilds-combine" data-form-type="forgot-password">
			<div class="thlogin-messages" aria-live="polite"></div>

			<?php if ( $logo_url ) : ?>
				<div class="thlogin-form-logo">
					<div class="thlogin-form-logo-wrapper">
						<img 
							src="<?php echo esc_url( $logo_url ); ?>"
							alt="<?php esc_attr_e( 'Logo', 'th-login' ); ?>"
							class="thlogin-form-logo"
							style="height:<?php echo esc_attr( $logo_size ); ?>;max-height:<?php echo esc_attr( $logo_size ); ?>;object-fit:cover;"
						/>
					</div>
					<h3><?php esc_html_e( 'Reset Password', 'th-login' ); ?></h3>
				</div>
			<?php else : ?>
				<h3><?php esc_html_e( 'Reset Password', 'th-login' ); ?></h3>
			<?php endif; ?>

			<?php foreach ( $this->fields as $field ) : ?>
				<?php
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

				// Only allow email or username fields.
				if ( stripos( $name, 'email' ) === false && stripos( $name, 'user' ) === false ) {
					continue;
				}

				$autocomplete      = stripos( $name, 'email' ) !== false ? 'email' : 'username';
				$icon_position     = $design['icon']['icon_position'] ?? 'with-label';
				$show_icon_in_label = $icon && 'with-label' === $icon_position;
				$show_icon_in_input = $icon && 'inside-input' === $icon_position;

				$field_class = 'thlogin-form-field';
				if ( 'stack' === $this->layout ) {
					$field_class .= ' thlogin-layout-stack';
				} elseif ( 'inline' === $this->layout ) {
					$field_class .= ' thlogin-layout-inline';
				} elseif ( 'floating' === $this->layout || 'placehold' === $this->layout ) {
					$field_class .= ' thlogin-layout-floating';
				}

				$this->render_field(
					[
						'type'               => $type,
						'name'               => $name,
						'id'                 => $id,
						'label'              => $label,
						'placeholder'        => $placeholder,
						'required'           => $required,
						'icon'               => $icon,
						'autocomplete'       => $autocomplete,
						'show_icon_in_label' => $show_icon_in_label,
						'show_icon_in_input' => $show_icon_in_input,
						'field_class'        => $field_class,
					],
					$design
				);
				?>
			<?php endforeach; ?>

			<?php if ( ! empty( $security['honeypot_enabled'] ) ) : ?>
				<p class="thlogin-form-field thlogin-form-field--honeypot" style="display: none;">
					<label for="thlogin_hp"><?php esc_html_e( 'Leave this field empty', 'th-login' ); ?></label>
					<input type="text" name="thlogin_hp" id="thlogin_hp" tabindex="-1" autocomplete="off" />
				</p>
			<?php endif; ?>

			<p class="thlogin-form-submit">
				<button type="submit" class="thlogin-button thlogin-button--primary">
					<?php echo esc_html( $submit_text ); ?>
				</button>
			</p>

			<p class="thlogin-form-links">
				<a href="#" class="thlogin-link" data-th-popup-action="login">
					<?php esc_html_e( 'Back to Login', 'th-login' ); ?>
				</a>
			</p>
		</form>

		<?php
		/**
		 * Hook: thlogin_after_forgot_password_form
		 */
		do_action( 'thlogin_after_forgot_password_form' );
		?>
	</div>
	<?php
} // end  render()


protected function render_field( $args ) {
	$type               = $args['type'] ?? 'text';
	$name               = $args['name'] ?? '';
	$id                 = $args['id'] ?? '';
	$label              = $args['label'] ?? '';
	$placeholder        = $args['placeholder'] ?? '';
	$required           = ! empty( $args['required'] );
	$icon               = $args['icon'] ?? '';
	$autocomplete       = $args['autocomplete'] ?? '';
	$show_icon_in_label = ! empty( $args['show_icon_in_label'] );
	$show_icon_in_input = ! empty( $args['show_icon_in_input'] );
	$field_class        = $args['field_class'] ?? '';

	// Floating / Placeholder Layout
	if ( in_array( $this->layout, [ 'floating', 'placehold' ], true ) ) : ?>
		<div class="<?php echo esc_attr( $field_class ); ?>">
			<div class="floating-wrapper layout-<?php echo esc_attr( $this->layout ); ?> <?php echo $show_icon_in_input ? 'icon-activated-input-wrapper' : ''; ?>">
				<input
					class="floating-input <?php echo $show_icon_in_input ? 'icon-activated-input' : ''; ?>"
					<?php if ( $show_icon_in_input ) : ?>
						style="background-image: <?php echo esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ); ?>;"
					<?php endif; ?>
					type="<?php echo esc_attr( $type ); ?>"
					name="<?php echo esc_attr( $name ); ?>"
					id="<?php echo esc_attr( $id ); ?>"
					placeholder=" "
					<?php if ( $required ) : ?> required<?php endif; ?>
					autocomplete="<?php echo esc_attr( $autocomplete ); ?>"
				/>
				<label for="<?php echo esc_attr( $id ); ?>" class="floating-label">
					<?php echo esc_html( $label ); ?>
					<?php if ( $required ) : ?>
						<span class="th-required">*</span>
					<?php endif; ?>
				</label>
			</div>
		</div>

	<?php else : ?>
		<p class="<?php echo esc_attr( $field_class ); ?>">
			<label for="<?php echo esc_attr( $id ); ?>" class="thlogin-label-with-icon">
				<?php if ( $show_icon_in_label ) : ?>
					<span class="thlogin-label-icon">
						<?php echo wp_kses( thlogin_get_icon_svg( $icon ), thlogin_get_allowed_svg_tags() ); ?>
					</span>
				<?php endif; ?>
				<span class="thlogin-label-text">
					<?php echo esc_html( $label ); ?>
					<?php if ( $required ) : ?>
						<span class="th-required">*</span>
					<?php endif; ?>
				</span>
			</label>

			<input
				class="<?php echo $show_icon_in_input ? 'icon-activated-input' : ''; ?>"
				<?php if ( $show_icon_in_input ) : ?>
					style="background-image: <?php echo esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ); ?>;"
				<?php endif; ?>
				type="<?php echo esc_attr( $type ); ?>"
				name="<?php echo esc_attr( $name ); ?>"
				id="<?php echo esc_attr( $id ); ?>"
				placeholder="<?php echo esc_attr( $placeholder ); ?>"
				<?php if ( $required ) : ?> required<?php endif; ?>
				autocomplete="<?php echo esc_attr( $autocomplete ); ?>"
			/>
		</p>
	<?php endif;
}

}
