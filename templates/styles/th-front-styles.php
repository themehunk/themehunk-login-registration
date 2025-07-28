<?php
if (!defined('ABSPATH')) exit;

$all_settings = get_option('thlogin_settings', []);
$design_settings = $all_settings['design'] ?? [];
$design = wp_parse_args($design_settings);

// Helper function to get background style
if (!function_exists('thlogin_get_background_style')) {
    function thlogin_get_background_style($background) {
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
if (!function_exists('thlogin_get_border_style')) {
    function thlogin_get_border_style($border) {
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
if (!function_exists('thlogin_get_padding_style')) {
    function thlogin_get_padding_style($padding) {
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
.thlogin-popup-form-container {
    <?php echo esc_attr(thlogin_get_background_style($design['form']['form_background'])); ?>
    <?php echo esc_attr(thlogin_get_border_style($design['form']['form_border'])); ?>
    <?php echo esc_attr(thlogin_get_padding_style($design['form']['form_padding'])); ?>
    display: flex;
    flex-direction: column;
    gap: <?php echo esc_attr($design['form']['form_gap']); ?>px;
    max-width: 400px;
    margin: 0 auto;
}

.th-login-from-feilds-combine{
    display: flex;
    flex-direction: column;
    gap: <?php echo esc_attr($design['form']['form_gap']); ?>px;
}

.thlogin-form h3 {
    color: <?php echo esc_attr($design['heading']['color']); ?>;
    font-size: <?php echo esc_attr($design['heading']['typography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['heading']['typography']['fontWeight']); ?>;
    margin: 0 0 15px 0;
    text-align: center;
}

.thlogin-form-field input[type="text"],
.thlogin-form-field input[type="email"],
.thlogin-form-field input[type="password"],
.thlogin-form-field input[type="tel"],
.thlogin-form-field input[type="url"],
.thlogin-form-field input[type="number"] {
    width: 100%;
    padding: 10px;
    color: <?php echo esc_attr($design['Input']['color']); ?>;
    background-color: <?php echo esc_attr($design['Input']['background']); ?>;
    font-size: <?php echo esc_attr($design['Input']['typography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['Input']['typography']['fontWeight']); ?>;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.thlogin-form-field--checkbox input[type="checkbox"],
.thlogin-form-field--terms input[type="checkbox"] {
    accent-color: <?php echo esc_attr($design['rememberme']['checkboxbackground']); ?>;
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.thlogin-form-field--checkbox label,
.thlogin-form-field--terms label {
    color: <?php echo esc_attr($design['rememberme']['color']); ?>;
    font-size: <?php echo esc_attr($design['rememberme']['typography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['rememberme']['typography']['fontWeight']); ?>;
    cursor: pointer;
}

.thlogin-button {
    color: <?php echo esc_attr($design['button']['color']); ?>;
    background-color: <?php echo esc_attr($design['button']['background']); ?>;
    font-size: <?php echo esc_attr($design['button']['typography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['button']['typography']['fontWeight']); ?>;
    padding: <?php echo esc_attr($design['button']['padding']['top']); ?>px <?php echo esc_attr($design['button']['padding']['right']); ?>px;
    <?php echo esc_attr(thlogin_get_border_style($design['button']['border'])); ?>
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.thlogin-button:hover {
    background-color: <?php echo esc_attr($design['button']['hoverBackground']); ?>;
}

.thlogin-link {
    color: <?php echo esc_attr($design['Input']['color']); ?>;
    text-decoration: none;
}

.thlogin-label-text {
    color: <?php echo esc_attr($design['Input']['labelcolor']); ?>;
    font-size: <?php echo esc_attr($design['Input']['labeltypography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['Input']['labeltypography']['fontWeight']); ?>;
}

.thlogin-label-icon svg {
    width: <?php echo esc_attr($design['icon']['size']); ?>;
    height: <?php echo esc_attr($design['icon']['size']); ?>;
    color: <?php echo esc_attr($design['icon']['color']); ?>;
}

.icon-activated-input{
    background-repeat: no-repeat;
    background-position: 12px center;
    background-size: <?php echo esc_attr($design['icon']['size']); ?>;
    padding-left: calc(20px + <?php echo esc_attr($design['icon']['size']); ?>) !important;
}

.thlogin-link-separator {
    margin: 0 8px;
    color: <?php echo esc_attr($design['Input']['color']); ?>;
}

.thlogin-header-button {
    color: <?php echo esc_attr($design['header']['button']['color']); ?>;
    background-color: <?php echo esc_attr($design['header']['button']['background']); ?>;
    font-size: <?php echo esc_attr($design['header']['button']['typography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['header']['button']['typography']['fontWeight']); ?>;
    <?php echo esc_attr(thlogin_get_padding_style($design['header']['button']['padding'])); ?>
    <?php echo esc_attr(thlogin_get_border_style($design['header']['button']['border'])); ?>
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.thlogin-header-button:hover {
    background-color: <?php echo esc_attr($design['header']['button']['hoverBackground']); ?>;
}

.thlogin-header-cancel-button {
    color: <?php echo esc_attr($design['header']['cancel_button']['color']); ?>;
    background-color: <?php echo esc_attr($design['header']['cancel_button']['background']); ?>;
    font-size: <?php echo esc_attr($design['header']['cancel_button']['typography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['header']['cancel_button']['typography']['fontWeight']); ?>;
    <?php echo esc_attr(thlogin_get_padding_style($design['header']['cancel_button']['padding'])); ?>
    <?php echo esc_attr(thlogin_get_border_style($design['header']['cancel_button']['border'])); ?>
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.thlogin-header-cancel-button:hover {
    background-color: <?php echo esc_attr($design['header']['cancel_button']['hoverBackground']); ?>;
}

.thlogin-header-cancel-button .dashicons {
    width: <?php echo esc_attr($design['header']['cancel_button']['typography']['size']); ?>;
    height: <?php echo esc_attr($design['header']['cancel_button']['typography']['size']); ?>;
    font-size: <?php echo esc_attr($design['header']['cancel_button']['typography']['size']); ?>;
}

/*  FLOATING Layout */
.thlogin-layout-floating .floating-wrapper {
	position: relative;
}

.thlogin-layout-floating .floating-input {
	width: 100%;
    padding: 10px;
    color: <?php echo esc_attr($design['Input']['color']); ?>;
    background-color: <?php echo esc_attr($design['Input']['background']); ?>;
    font-size: <?php echo esc_attr($design['Input']['typography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['Input']['typography']['fontWeight']); ?>;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.thlogin-layout-floating .floating-label {
	position: absolute;
	left: 12px;
	top: 50%;
	transform: translateY(-50%);
	padding: 0 4px;
    border-radius: 4px;
	pointer-events: none;
	transition: all 0.2s ease;
	white-space: nowrap;
    color: <?php echo esc_attr($design['Input']['labelcolor']); ?>;
    font-size: <?php echo esc_attr($design['Input']['labeltypography']['size']); ?>;
    font-weight: <?php echo esc_attr($design['Input']['labeltypography']['fontWeight']); ?>;
}

.thlogin-layout-floating .floating-input:focus + .floating-label,
.thlogin-layout-floating .floating-input:not(:placeholder-shown) + .floating-label {
	top: 0px;
	left: 8px;
	font-size: 12px;
	color: #007cba;
	background-color: <?php echo esc_attr($design['Input']['background']); ?>;
}

</style>