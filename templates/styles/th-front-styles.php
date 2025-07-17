<?php
if (!defined('ABSPATH')) exit;

$design_settings = json_decode(get_option('th_login_design_settings', '{}'), true);
$design = wp_parse_args($design_settings);

// Helper function to get background style
if (!function_exists('th_login_get_background_style')) {
    function th_login_get_background_style($background) {
        $type = $background['type'] ?? 'color';
        $style = '';

        if ($type === 'gradient') {
            $style = "background-image: {$background['gradient']}; background-size: cover; background-repeat: no-repeat; background-position: center center; opacity: {$background['opacity']};";
        } elseif ($type === 'image' && !empty($background['image']['url'])) {
            $image = $background['image'];
            $style = "background-image: url({$image['url']}); background-size: {$image['size']}; background-repeat: {$image['repeat']}; background-position: {$image['position']}; opacity: {$background['opacity']};";
        } else {
            $style = "background-color: {$background['color']}; opacity: {$background['opacity']};";
        }

        return $style;
    }
}

// Helper function to get border style
if (!function_exists('th_login_get_border_style')) {
    function th_login_get_border_style($border) {
        $width = $border['width'] ?? [];
        $radius = $border['radius'] ?? [];

        return sprintf(
            "border-top-width: %dpx; border-right-width: %dpx; border-bottom-width: %dpx; border-left-width: %dpx; border-style: %s; border-color: %s; border-top-left-radius: %dpx; border-top-right-radius: %dpx; border-bottom-right-radius: %dpx; border-bottom-left-radius: %dpx;",
            $width['top'] ?? 0,
            $width['right'] ?? 0,
            $width['bottom'] ?? 0,
            $width['left'] ?? 0,
            $border['style'] ?? 'solid',
            $border['color'] ?? '#000000',
            $radius['topLeft'] ?? 0,
            $radius['topRight'] ?? 0,
            $radius['bottomRight'] ?? 0,
            $radius['bottomLeft'] ?? 0
        );
    }
}

// Helper function to get padding style
if (!function_exists('th_login_get_padding_style')) {
    function th_login_get_padding_style($padding) {
        return sprintf(
            "padding-top: %dpx; padding-right: %dpx; padding-bottom: %dpx; padding-left: %dpx;",
            $padding['top'] ?? 0,
            $padding['right'] ?? 0,
            $padding['bottom'] ?? 0,
            $padding['left'] ?? 0
        );
    }
}
?>


<style>
.th-login-popup-form-container {
    <?php echo th_login_get_background_style($design['form']['form_background']); ?>
    <?php echo th_login_get_border_style($design['form']['form_border']); ?>
    <?php echo th_login_get_padding_style($design['form']['form_padding']); ?>
    display: flex;
    flex-direction: column;
    gap: <?php echo $design['form']['form_gap']; ?>px;
    max-width: 400px;
    margin: 0 auto;
}

.th-login-form h3 {
    color: <?php echo $design['heading']['color']; ?>;
    font-size: <?php echo $design['heading']['typography']['size']; ?>;
    font-weight: <?php echo $design['heading']['typography']['fontWeight']; ?>;
    margin: 0 0 15px 0;
    text-align: center;
}

.th-login-form-field input[type="text"],
.th-login-form-field input[type="email"],
.th-login-form-field input[type="password"],
.th-login-form-field input[type="tel"],
.th-login-form-field input[type="url"],
.th-login-form-field input[type="number"] {
    width: 100%;
    padding: 10px;
    color: <?php echo $design['Input']['color']; ?>;
    background-color: <?php echo $design['Input']['background']; ?>;
    font-size: <?php echo $design['Input']['typography']['size']; ?>;
    font-weight: <?php echo $design['Input']['typography']['fontWeight']; ?>;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.th-login-form-field--checkbox,
.th-login-form-field--terms {
    display: flex;
    align-items: center;
    gap: 8px;
}

.th-login-form-field--checkbox input[type="checkbox"],
.th-login-form-field--terms input[type="checkbox"] {
    accent-color: <?php echo $design['rememberme']['checkboxbackground']; ?>;
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.th-login-form-field--checkbox label,
.th-login-form-field--terms label {
    color: <?php echo $design['rememberme']['color']; ?>;
    font-size: <?php echo $design['rememberme']['typography']['size']; ?>;
    font-weight: <?php echo $design['rememberme']['typography']['fontWeight']; ?>;
    cursor: pointer;
}

.th-login-button {
    color: <?php echo $design['button']['color']; ?>;
    background-color: <?php echo $design['button']['background']; ?>;
    font-size: <?php echo $design['button']['typography']['size']; ?>;
    font-weight: <?php echo $design['button']['typography']['fontWeight']; ?>;
    padding: <?php echo $design['button']['padding']['top']; ?>px <?php echo $design['button']['padding']['right']; ?>px;
    <?php echo th_login_get_border_style($design['button']['border']); ?>
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.th-login-button:hover {
    background-color: <?php echo $design['button']['hoverBackground']; ?>;
}

.th-login-form-links {
    text-align: center;
    margin-top: 15px;
}

.th-login-link {
    color: <?php echo $design['Input']['color']; ?>;
    text-decoration: none;
}

.th-login-link:hover {
    text-decoration: underline;
}

.th-login-form-field {
    width: 100%;
    margin: 0 0 15px 0;
}

.th-login-label-with-icon {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
}

.th-login-label-text {
    color: <?php echo $design['Input']['labelcolor']; ?>;
    font-size: <?php echo $design['Input']['labeltypography']['size']; ?>;
    font-weight: <?php echo $design['Input']['labeltypography']['fontWeight']; ?>;
}

.th-login-label-icon svg {
    width: <?php echo $design['icon']['size']; ?>;
    height: <?php echo $design['icon']['size']; ?>;
    color: <?php echo $design['icon']['color']; ?>;
}


.th-login-link-separator {
    margin: 0 8px;
    color: <?php echo $design['Input']['color']; ?>;
}

.th-required {
    color: #ff0000;
    margin-left: 3px;
}

.th-login-form-field--honeypot {
    display: none !important;
}

.th-login-error-message {
    color: #ff0000;
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
}

/* Header Button Styles */
.th-login-header-button {
    color: <?php echo $design['header']['button']['color']; ?>;
    background-color: <?php echo $design['header']['button']['background']; ?>;
    font-size: <?php echo $design['header']['button']['typography']['size']; ?>;
    font-weight: <?php echo $design['header']['button']['typography']['fontWeight']; ?>;
    <?php echo th_login_get_padding_style($design['header']['button']['padding']); ?>
    <?php echo th_login_get_border_style($design['header']['button']['border']); ?>
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.th-login-header-button:hover {
    background-color: <?php echo $design['header']['button']['hoverBackground']; ?>;
}

.th-login-header-cancel-button {
    color: <?php echo $design['header']['cancel_button']['color']; ?>;
    background-color: <?php echo $design['header']['cancel_button']['background']; ?>;
    font-size: <?php echo $design['header']['cancel_button']['typography']['size']; ?>;
    font-weight: <?php echo $design['header']['cancel_button']['typography']['fontWeight']; ?>;
    <?php echo th_login_get_padding_style($design['header']['cancel_button']['padding']); ?>
    <?php echo th_login_get_border_style($design['header']['cancel_button']['border']); ?>
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.th-login-header-cancel-button:hover {
    background-color: <?php echo $design['header']['cancel_button']['hoverBackground']; ?>;
}

.th-login-header-cancel-button .dashicons {
    width: <?php echo $design['header']['cancel_button']['typography']['size']; ?>;
    height: <?php echo $design['header']['cancel_button']['typography']['size']; ?>;
    font-size: <?php echo $design['header']['cancel_button']['typography']['size']; ?>;
}

.th-login-form-toggle {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.th-login-toggle-button {
    flex: 1;
}
</style>