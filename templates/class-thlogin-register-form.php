<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once THLOGIN_PATH . 'templates/parts/form-header.php';

class THLogin_Register_Form {
	protected $settings;
	protected $fields;
	protected $layout;

	public function __construct() {
		$this->settings = get_option( 'thlogin_settings', [] );
		$this->fields   = $this->settings['form_fields']['register'] ?? [];
		$this->layout   = $this->settings['design']['modal']['modal_input_layout'] ?? 'stack';
	}

	public function render() {
	// Bail if registration is disabled in WordPress settings.
	if ( ! get_option( 'users_can_register' ) ) {
		return;
	}

	// Settings.
	$security    = $this->settings['security'] ?? [];
	$design      = $this->settings['design'] ?? [];
	$submit_text = ! empty( $design['submitButton']['register'] )
		? sanitize_text_field( $design['submitButton']['register'] )
		: esc_html_e( 'Register', 'themehunk-login-registration' );

	// Logo setup.
	$logo      = $design['logo'] ?? [];
	$logo_url  = ! empty( $logo['url'] ) ? esc_url( $logo['url'] ) : '';
	$logo_size = ! empty( $logo['size'] ) ? esc_attr( $logo['size'] ) : '30px';
	?>

	<div class="thlogin-form thlogin-form--register" data-form-type="register" style="display: none;">

		<?php echo wp_kses_post( thlogin_render_form_header() ); ?>

		<?php
		/**
		 * Hook: thlogin_before_register_form
		 */
		do_action( 'thlogin_before_register_form' );
		?>

		<form class="thlogin-ajax-form th-login-from-feilds-combine" data-form-type="register">
			<div class="thlogin-messages" aria-live="polite"></div>

			<?php if ( $logo_url ) : ?>
				<div class="thlogin-form-logo">
					<div class="thlogin-form-logo-wrapper">
						<img 
							src="<?php echo esc_url( $logo_url ); ?>" 
							alt="<?php esc_attr_e( 'Logo', 'themehunk-login-registration' ); ?>" 
							class="thlogin-form-logo" 
							style="height:<?php echo esc_attr( $logo_size ); ?>;max-height:<?php echo esc_attr( $logo_size ); ?>;object-fit:cover;" 
						/>
					</div>
					<h3><?php esc_html_e( 'Register', 'themehunk-login-registration' ); ?></h3>
				</div>
			<?php else : ?>
				<h3><?php esc_html_e( 'Register', 'themehunk-login-registration' ); ?></h3>
			<?php endif; ?>

			<?php
			foreach ( $this->fields as $field ) {
				if ( ! ( $field['show'] ?? true ) || ( $field['hidden'] ?? false ) ) {
					continue;
				}

				$this->render_field( $field, $design );
			}
			?>

			<?php if ( ! empty( $security['honeypot_enabled'] ) ) : ?>
				<p class="thlogin-form-field thlogin-form-field--honeypot" style="display: none;">
					<label for="thlogin_hp"><?php esc_html_e( 'Leave this field empty', 'themehunk-login-registration' ); ?></label>
					<input type="text" name="thlogin_hp" id="thlogin_hp" tabindex="-1" autocomplete="off">
				</p>
			<?php endif; ?>

			<?php $this->render_recaptcha( $security ); ?>

			<p class="thlogin-form-submit">
				<button type="submit" class="thlogin-button thlogin-button--primary">
					<?php echo esc_html( $submit_text ); ?>
				</button>
			</p>

			<p class="thlogin-form-links">
				<a href="#" class="thlogin-link" data-th-popup-action="login">
					<?php esc_html_e( 'Already have an account? Log In', 'themehunk-login-registration' ); ?>
				</a>
			</p>
		</form>

		<?php
		/**
		 * Hook: thlogin_after_register_form
		 */
		do_action( 'thlogin_after_register_form' );
		?>

	</div>
	<?php
}


	protected function render_field( $field, $design ) {
	$id          = sanitize_key( $field['id'] ?? '' );
	$label       = sanitize_text_field( $field['label'] ?? '' );
	$name        = sanitize_key( $field['name'] ?? $id );
	$type        = sanitize_text_field( $field['type'] ?? 'text' );
	$placeholder = sanitize_text_field( $field['placeholder'] ?? '' );
	$required    = ! empty( $field['required'] );
	$icon        = sanitize_text_field( $field['icon'] ?? '' );

	$icon_position      = $design['icon']['icon_position'] ?? 'with-label';
	$show_icon_in_label = $icon && $icon_position === 'with-label';
	$show_icon_in_input = $icon && $icon_position === 'inside-input';

	$autocomplete = '';
	if ( $type === 'password' ) {
		$autocomplete = 'new-password';
	} elseif ( $type === 'email' ) {
		$autocomplete = 'email';
	}

	$field_class = 'thlogin-form-field';
	if ( $this->layout === 'stack' ) {
		$field_class .= ' thlogin-layout-stack';
	} elseif ( $this->layout === 'inline' ) {
		$field_class .= ' thlogin-layout-inline';
	} elseif ( $this->layout === 'floating' || $this->layout === 'placehold' ) {
		$field_class .= ' thlogin-layout-floating';
	}

	// Special case: terms checkbox.
	if ( $type === 'checkbox' && strpos( strtolower( $name ), 'terms' ) !== false ) {
		$this->render_terms_checkbox( $field );
		return;
	}

	// Floating / placehold layout.
	if ( in_array( $this->layout, [ 'floating', 'placehold' ], true ) ) : ?>
		<div class="<?php echo esc_attr( $field_class ); ?>">
			<div class="floating-wrapper layout-<?php echo esc_attr( $this->layout ); ?> <?php if ( $show_icon_in_input ) : ?>icon-activated-input-wrapper<?php endif; ?>">
				<input
					class="floating-input <?php if ( $show_icon_in_input ) : ?>icon-activated-input<?php endif; ?>"
					<?php if ( $show_icon_in_input ) : ?>
						style="background-image: <?php echo esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ); ?>;"
					<?php endif; ?>
					type="<?php echo esc_attr( $type ); ?>"
					name="<?php echo esc_attr( $name ); ?>"
					id="th-register-<?php echo esc_attr( $id ); ?>"
					placeholder=" "
					<?php if ( $required ) : ?> required<?php endif; ?>
					<?php if ( $autocomplete ) : ?> autocomplete="<?php echo esc_attr( $autocomplete ); ?>"<?php endif; ?>
				/>
				<label for="th-register-<?php echo esc_attr( $id ); ?>" class="floating-label">
					<?php echo esc_html( $label ); ?>
					<?php if ( $required ) : ?>
						<span class="th-required">*</span>
					<?php endif; ?>
				</label>
			</div>
		</div>
	<?php else : ?>
		<p class="<?php echo esc_attr( $field_class ); ?>">
			<label for="th-register-<?php echo esc_attr( $id ); ?>" class="thlogin-label-with-icon">
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
				class="<?php if ( $show_icon_in_input ) : ?>icon-activated-input<?php endif; ?>"
				<?php if ( $show_icon_in_input ) : ?>
					style="background-image: <?php echo esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ); ?>;"
				<?php endif; ?>
				type="<?php echo esc_attr( $type ); ?>"
				name="<?php echo esc_attr( $name ); ?>"
				id="th-register-<?php echo esc_attr( $id ); ?>"
				placeholder="<?php echo esc_attr( $placeholder ); ?>"
				<?php if ( $required ) : ?> required<?php endif; ?>
				<?php if ( $autocomplete ) : ?> autocomplete="<?php echo esc_attr( $autocomplete ); ?>"<?php endif; ?>
			/>
		</p>
	<?php
	endif;
}


	protected function render_terms_checkbox( $field ) {
	$id       = sanitize_key( $field['id'] ?? '' );
	$name     = sanitize_key( $field['name'] ?? $id );
	$label    = sanitize_text_field( $field['label'] ?? '' );
	$required = ! empty( $field['required'] );
	$link     = ! empty( $field['link'] ) ? esc_url( $field['link'] ) : '#';

	$parsed_text = preg_replace_callback(
		'/\[(.*?)\]/',
		function ( $matches ) use ( $link ) {
			return sprintf(
				'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
				esc_url( $link ),
				esc_html( $matches[1] )
			);
		},
		$label
	);
	?>

	<p class="thlogin-form-field thlogin-form-field--terms">
		<input
			type="checkbox"
			name="<?php echo esc_attr( $name ); ?>"
			id="th-register-<?php echo esc_attr( $id ); ?>"
			value="1"
			<?php if ( $required ) : ?> required<?php endif; ?>
		/>
		<label for="th-register-<?php echo esc_attr( $id ); ?>">
			<?php echo wp_kses_post( $parsed_text ); ?>
		</label>
	</p>

	<?php
}

	protected function render_recaptcha( $security ) {
    $recaptcha = $security['recaptcha'] ?? [];
    $show_on   = $recaptcha['show_on'] ?? 'all';

    if ( empty( $recaptcha['enabled'] ) || ( $show_on !== 'all' && $show_on !== 'login' ) ) {
        return;
    }

    $type    = $recaptcha['type'] ?? '';
    $sitekey = ! empty( $recaptcha['site_key'] ) ? $recaptcha['site_key']  : '';

    if ( 'v2_checkbox' === $type && $sitekey ) :
        ?>
        <div class="thlogin-form-field">
            <div class="g-recaptcha" data-sitekey="<?php echo esc_attr($sitekey); ?>"></div>
        </div>
        <?php
    elseif ( 'v3' === $type && $sitekey ) :
        ?>
        <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
        <?php
        // Register Google reCAPTCHA v3 script.
        wp_register_script(
            'thlogin-recaptcha',
            'https://www.google.com/recaptcha/api.js?render=' . $sitekey,
            [],
            THLOGIN_VERSION,
            true
        );

        wp_enqueue_script( 'thlogin-recaptcha' );

        // Add inline script to execute reCAPTCHA.
        wp_add_inline_script(
            'thlogin-recaptcha',
            "document.addEventListener('DOMContentLoaded', function () {
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.ready(function () {
                        grecaptcha.execute('" . esc_js( $sitekey ) . "', { action: 'login' })
                            .then(function (token) {
                                document.getElementById('g-recaptcha-response').value = token;
                            });
                    });
                }
            });"
        );
    endif;
}

}

// Usage example:
// $register_form = new THLogin_Register_Form();
// $register_form->render();
