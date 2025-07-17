<?php
if (!defined('ABSPATH')) {
    exit;
}

// Include shared styles
require TH_LOGIN_PATH . 'templates/th-login-styles.php';

$design_settings = json_decode(get_option('th_login_design_settings', '{}'), true);
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

<div id="th-login-popup-modal" class="th-login-popup-modal" role="dialog" aria-modal="true" aria-hidden="true" style="display: none; <?= esc_attr($modal_bg_style); ?>">
    <div class="th-login-popup-form-container">
        <?php
        // Load forms
        require TH_LOGIN_PATH . 'templates/form-login.php';
        require TH_LOGIN_PATH . 'templates/form-register.php';
        require TH_LOGIN_PATH . 'templates/form-forgot-password.php';
        ?>
    </div>
</div>