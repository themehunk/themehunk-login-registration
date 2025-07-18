<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$design_settings       = json_decode( get_option( 'thlogin_design_settings', '{}' ), true );
$general_settings      = json_decode( get_option( 'thlogin_general_settings', '{}' ), true );
$logo_settings         = $design_settings['logo'] ?? array();
$header_html_settings  = $design_settings['typography']['form_header_html'] ?? array();
$form_type             = $general_settings['form_type'] ?? 'double';
$close_button_settings = $general_settings['close_button'] ?? true;
?>

<div class="thlogin-form-header-part">
	<div class="thlogin-header-top-row">
		<?php if ( $close_button_settings ) : ?>
			<button class="thlogin-popup-close-button thlogin-header-cancel-button" aria-label="<?php esc_attr_e( 'Close', 'th-login' ); ?>">
				<span class="dashicons dashicons-no-alt"></span>
			</button>
		<?php endif; ?>
	</div>

    <?php if ( ! empty( $logo_settings['url'] ) ) : ?>
    
        <div class="thlogin-logo">
            <?php
            $logo_tag    = $logo_settings['svg_enabled'] ?? false ? 'img' : 'img';
            $logo_url    = esc_url( $logo_settings['url'] );
            $logo_alt    = esc_html__( 'Plugin Logo', 'th-login' );
            $logo_width  = esc_attr( $logo_settings['width']['desktop'] ?? '150px' );
            $logo_margin = esc_attr( $logo_settings['margin_bottom'] ?? '20px' );

            ob_start();
            ?>
            <<?php echo esc_attr( $logo_tag ); ?>
                src="<?php echo esc_url( $logo_url ); ?>"
                alt="<?php echo esc_attr( $logo_alt ); ?>"
                style="max-width:<?php echo esc_attr( $logo_width ); ?>; margin-bottom:<?php echo esc_attr( $logo_margin ); ?>;" />
            <?php
            $logo_element = ob_get_clean();

            if ( ! empty( $logo_settings['link_url'] ) ) {
                $logo_link = esc_url( $logo_settings['link_url'] );
                echo '<a href="' . $logo_link . '">' . $logo_element . '</a>';
            } else {
                echo $logo_element;
            }
            ?>
        </div>
        
    <?php endif; ?>

	<?php if ( ! empty( $header_html_settings['enabled'] ) && ! empty( $header_html_settings['content'] ) ) : ?>
		<div class="thlogin-custom-header-html">
			<?php echo wp_kses_post( $header_html_settings['content'] ); ?>
		</div>
	<?php endif; ?>

	<?php if ( $form_type === 'double' ) : ?>
		<div class="thlogin-form-toggle">
			<button type="button" class="thlogin-toggle-button thlogin-toggle-button--login thlogin-header-button" data-th-popup-action="login">
				<?php esc_html_e( 'Login', 'th-login' ); ?>
			</button>
			<button type="button" class="thlogin-toggle-button thlogin-toggle-button--register thlogin-header-button" data-th-popup-action="register">
				<?php esc_html_e( 'Register', 'th-login' ); ?>
			</button>
		</div>
	<?php endif; ?>
</div>
