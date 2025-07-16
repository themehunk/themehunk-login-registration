<?php
if (!defined('ABSPATH')) {
    exit;
}

$design_settings = json_decode(get_option('th_login_design_settings', '{}'), true);
$general_settings = json_decode(get_option('th_login_general_settings', '{}'), true);
$logo_settings = $design_settings['logo'] ?? array();
$header_html_settings = $design_settings['typography']['form_header_html'] ?? array();
$form_type = $general_settings['form_type'] ?? 'double';
$close_button_settings = $general_settings['close_button'] ?? true;
?>

<div class="th-login-form-header-part">
    <div class="th-login-header-top-row">
        <?php if ($close_button_settings) : ?>
            <button class="th-login-popup-close-button th-login-header-cancel-button" aria-label="<?php esc_attr_e('Close', 'th-login'); ?>">
                <span class="dashicons dashicons-no-alt"></span>
            </button>
        <?php endif; ?>
    </div>

    <?php if (($logo_settings['url'] ?? '')) : ?>
        <div class="th-login-logo">
            <?php
            $logo_tag = $logo_settings['svg_enabled'] ?? false ? 'img' : 'img';
            $logo_html = sprintf(
                '<%1$s src="%2$s" alt="%3$s" style="max-width:%4$s; margin-bottom:%5$s;" />',
                esc_attr($logo_tag),
                esc_url($logo_settings['url']),
                esc_attr__('Plugin Logo', 'th-login'),
                esc_attr($logo_settings['width']['desktop'] ?? '150px'),
                esc_attr($logo_settings['margin_bottom'] ?? '20px')
            );
            if (($logo_settings['link_url'] ?? '')) {
                $logo_html = sprintf('<a href="%1$s">%2$s</a>', esc_url($logo_settings['link_url']), $logo_html);
            }
            echo $logo_html;
            ?>
        </div>
    <?php endif; ?>

    <?php if (($header_html_settings['enabled'] ?? false) && ($header_html_settings['content'] ?? '')) : ?>
        <div class="th-login-custom-header-html">
            <?php echo $header_html_settings['content']; ?>
        </div>
    <?php endif; ?>

    <?php if ($form_type === 'double') : ?>
        <div class="th-login-form-toggle">
            <button type="button" class="th-login-toggle-button th-login-toggle-button--login th-login-header-button" data-th-popup-action="login">
                <?php esc_html_e('Login', 'th-login'); ?>
            </button>
            <button type="button" class="th-login-toggle-button th-login-toggle-button--register th-login-header-button" data-th-popup-action="register">
                <?php esc_html_e('Register', 'th-login'); ?>
            </button>
        </div>
    <?php endif; ?>
</div>