<?php
if (!defined('ABSPATH')) exit;

if (!get_option('users_can_register')) {
    echo '<p class="thlogin-error-message">' . esc_html__('User registration is currently disabled on this site.', 'thlogin') . '</p>';
    return;
}

$form_fields_settings = json_decode(get_option('thlogin_form_fields_settings', '{}'), true);
$register_fields = $form_fields_settings['register'] ?? array();

?>

<div class="thlogin-form thlogin-form--register" data-form-type="register" style="display: none;">
    <?php require THLOGIN_PATH . 'templates/parts/form-header.php'; ?>

    <form class="thlogin-ajax-form" data-form-type="register">
        <div class="thlogin-messages" aria-live="polite"></div>

        <h3><?php esc_html_e('Register', 'thlogin'); ?></h3>

        <?php foreach ($register_fields as $field) :
            if (!($field['show'] ?? true) || ($field['hidden'] ?? false)) continue;

            $field_id = esc_attr($field['id'] ?? '');
            $field_label = $field['label'] ?? '';
            $field_name = esc_attr($field['name'] ?? $field_id);
            $field_type = esc_attr($field['type'] ?? 'text');
            $placeholder = esc_attr($field['placeholder'] ?? '');
            $required = !empty($field['required']) ? 'required' : '';
            $icon = $field['icon'] ?? '';

            $autocomplete = '';
            if ($field_type === 'password') {
                $autocomplete = 'autocomplete="new-password"';
            } elseif ($field_type === 'email') {
                $autocomplete = 'autocomplete="email"';
            }

            // Handle Terms & Conditions separately
            if ($field_type === 'checkbox' && strpos(strtolower($field_name), 'terms') !== false) : ?>
                <p class="thlogin-form-field thlogin-form-field--terms">
                    <input type="checkbox" name="<?php echo esc_attr($field_name); ?>" id="th-register-<?php echo $field_id; ?>" value="1" <?php echo $required; ?>>
                    <label for="th-register-<?php echo $field_id; ?>"><?php echo wp_kses_post($field_label ?: __('I agree to the Terms & Conditions', 'thlogin')); ?></label>
                </p>
                <?php continue;
            endif;
        ?>

            <p class="thlogin-form-field">
                <label for="th-register-<?php echo $field_id; ?>" class="thlogin-label-with-icon">
                    <?php if ($icon) : ?>
                        <span class="thlogin-label-icon"><?php echo th_login_get_icon_svg($icon); ?></span>
                    <?php endif; ?>
                    <span class="thlogin-label-text">
                        <?php echo esc_html($field_label); ?>
                        <?php if ($required) : ?><span class="th-required">*</span><?php endif; ?>
                    </span>
                </label>
                <input
                    type="<?php echo $field_type; ?>"
                    name="<?php echo $field_name; ?>"
                    id="th-register-<?php echo $field_id; ?>"
                    placeholder="<?php echo $placeholder; ?>"
                    <?php echo $required; ?>
                    <?php echo $autocomplete; ?>
                >
            </p>
        <?php endforeach; ?>

        <?php
        // Honeypot field
        $honeypot_enabled = false;
        foreach ($register_fields as $f) {
            if (($f['id'] ?? '') === 'honeypot' && !empty($f['hidden'])) {
                $honeypot_enabled = true;
                break;
            }
        }
        if ($honeypot_enabled) :
            $honeypot_field_name = 'th_login_hp_' . wp_rand(1000, 9999);
        ?>
            <p class="thlogin-form-field thlogin-form-field--honeypot" style="display: none;">
                <label for="<?php echo esc_attr($honeypot_field_name); ?>"><?php esc_html_e('Please leave this field empty', 'thlogin'); ?></label>
                <input type="text" name="<?php echo esc_attr($honeypot_field_name); ?>" id="<?php echo esc_attr($honeypot_field_name); ?>" tabindex="-1" autocomplete="off">
            </p>
        <?php endif; ?>

        <p class="thlogin-form-submit">
            <button type="submit" class="thlogin-button thlogin-button--primary">
                <?php esc_html_e('Register', 'thlogin'); ?>
            </button>
        </p>

        <p class="thlogin-form-links">
            <a href="#" class="thlogin-link" data-th-popup-action="login"><?php esc_html_e('Already have an account? Log In', 'thlogin'); ?></a>
        </p>
    </form>

    <?php require THLOGIN_PATH . 'templates/parts/form-footer.php'; ?>
</div>