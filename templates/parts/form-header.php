<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$design_settings = json_decode( get_option( 'th_login_design_settings', '{}' ), true );
$logo_settings = $design_settings['logo'] ?? array();
$header_html_settings = $design_settings['typography']['form_header_html'] ?? array();
?>
<div class="th-login-form-header-part">
    <?php if ( ( $logo_settings['url'] ?? '' ) ) : ?>
        <div class="th-login-logo">
            <?php
            $logo_tag = $logo_settings['svg_enabled'] ?? false ? 'img' : 'img'; // For now, both are img. SVG handling might need more logic.
            $logo_html = sprintf(
                '<%1$s src="%2$s" alt="%3$s" style="max-width:%4$s; margin-bottom:%5$s;" />',
                esc_attr( $logo_tag ),
                esc_url( $logo_settings['url'] ),
                esc_attr__( 'Plugin Logo', 'th-login' ),
                esc_attr( $logo_settings['width']['desktop'] ?? '150px' ),
                esc_attr( $logo_settings['margin_bottom'] ?? '20px' )
            );
            if ( ( $logo_settings['link_url'] ?? '' ) ) {
                $logo_html = sprintf( '<a href="%1$s">%2$s</a>', esc_url( $logo_settings['link_url'] ), $logo_html );
            }
            echo $logo_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML is expected here.
            ?>
        </div>
    <?php endif; ?>

    <?php if ( ( $header_html_settings['enabled'] ?? false ) && ( $header_html_settings['content'] ?? '' ) ) : ?>
        <div class="th-login-custom-header-html">
            <?php
            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Custom HTML is expected here.
            echo $header_html_settings['content'];
            ?>
        </div>
    <?php endif; ?>
</div>