<?php
if (!defined('ABSPATH')) {
    exit;
}

// Include shared styles
require THLOGIN_PATH . 'templates/styles/th-front-styles.php';

$all_settings    = get_option( 'thlogin_settings', [] );
$design_settings = $all_settings['design'] ?? [];

$modal_design = $design_settings['modal']['modal_background'] ?? [];
$opacity = isset($modal_design['opacity']) ? floatval($modal_design['opacity']) : 1;
$modal_bg_style = '';

if ($modal_design['type'] === 'color') {
    $modal_bg_style = "background-color: {$modal_design['color']};";
} elseif ($modal_design['type'] === 'gradient') {
    $modal_bg_style = "background-image: {$modal_design['gradient']};";
} elseif ($modal_design['type'] === 'image' && !empty($modal_design['image']['url'])) {
    $img = $modal_design['image'];
    $modal_bg_style = "background-image: url('{$img['url']}'); background-position: {$img['position']}; background-size: {$img['size']}; background-repeat: {$img['repeat']};";
}

$modal_bg_style .= " opacity: {$opacity};";
?>

<div id="thlogin-popup-modal" class="thlogin-popup-modal" role="dialog" aria-modal="true" aria-hidden="true" style="display: none; <?php echo esc_attr($modal_bg_style); ?>">
    <div class="thlogin-popup-form-container">
        <?php
        // Load forms
        require THLOGIN_PATH . 'templates/form-login.php';
        require THLOGIN_PATH . 'templates/form-register.php';
        require THLOGIN_PATH . 'templates/form-forgot-password.php';
        ?>
    </div>
</div>