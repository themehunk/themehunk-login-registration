<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$design_settings = json_decode( get_option( 'th_login_design_settings', '{}' ), true );
$footer_html_settings = $design_settings['typography']['form_footer_html'] ?? array();
?>
<div class="th-login-form-footer-part">
    <?php if ( ( $footer_html_settings['enabled'] ?? false ) && ( $footer_html_settings['content'] ?? '' ) ) : ?>
        <div class="th-login-custom-footer-html">
            <?php
            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Custom HTML is expected here.
            echo $footer_html_settings['content'];
            ?>
        </div>
    <?php endif; ?>
</div>
