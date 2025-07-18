<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Get settings
$form_fields_settings = json_decode(get_option('thlogin_form_fields_settings', '{}'), true);
$general_settings = json_decode(get_option('thlogin_general_settings', '{}'), true);
$login_fields = $form_fields_settings['login'] ?? array();


?>

<div class="thlogin-form thlogin-form--login" data-form-type="login">
    <?php require THLOGIN_PATH . 'templates/parts/form-header.php'; ?>

    <form class="thlogin-ajax-form" data-form-type="login">
        <div class="thlogin-messages" aria-live="polite"></div>

        <h3><?php esc_html_e('Login', 'thlogin'); ?></h3>

        <?php foreach ($login_fields as $field) :
            if (!empty($field['hidden'])) continue;

            $type = $field['type'] ?? 'text';
            $name = esc_attr($field['name'] ?? '');
            $id = esc_attr($field['id'] ?? 'field_' . uniqid());
            $label = $field['label'] ?? '';
            $placeholder = $field['placeholder'] ?? '';
            $required = !empty($field['required']);
            $icon = $field['icon'] ?? '';

            $field_class = 'thlogin-form-field';
            if ($type === 'checkbox') {
                $field_class .= ' thlogin-form-field--checkbox';
            }

            $autocomplete = '';
            if (stripos($name, 'user') !== false) {
                $autocomplete = 'username';
            } elseif (stripos($name, 'email') !== false) {
                $autocomplete = 'email';
            } elseif (stripos($name, 'pass') !== false) {
                $autocomplete = 'current-password';
            }
        ?>
            <div class="<?php echo esc_attr($field_class); ?>">
                <?php if ($type === 'checkbox') : ?>
                    <input
                        type="checkbox"
                        name="<?php echo $name; ?>"
                        id="<?php echo $id; ?>"
                        value="1"
                        <?php echo $required ? 'required' : ''; ?>
                    />
                    <label for="<?php echo $id; ?>">
                        <?php echo esc_html($label); ?>
                        <?php if ($required) : ?><span class="th-required">*</span><?php endif; ?>
                    </label>
                <?php else : ?>
                    <label for="<?php echo $id; ?>" class="thlogin-label-with-icon">
                        <?php if ($icon) : ?>
                            <span class="thlogin-label-icon"><?php echo th_login_get_icon_svg($icon); ?></span>
                        <?php endif; ?>
                        <span class="thlogin-label-text">
                            <?php echo esc_html($label); ?>
                            <?php if ($required) : ?><span class="th-required">*</span><?php endif; ?>
                        </span>
                    </label>

                    <input
                        type="<?php echo esc_attr($type); ?>"
                        name="<?php echo $name; ?>"
                        id="<?php echo $id; ?>"
                        placeholder="<?php echo esc_attr($placeholder); ?>"
                        <?php echo $required ? 'required' : ''; ?>
                        <?php echo $autocomplete ? 'autocomplete="' . esc_attr($autocomplete) . '"' : ''; ?>
                    />
                <?php endif; ?>
            </div>
        <?php endforeach; ?>

        <div class="thlogin-form-submit">
            <button type="submit" class="thlogin-button thlogin-button--primary">
                <?php esc_html_e('Log In', 'thlogin'); ?>
            </button>
        </div>

        <div class="thlogin-form-links">
            <a href="#" class="thlogin-link" data-th-popup-action="forgot-password"><?php esc_html_e('Forgot Password?', 'thlogin'); ?></a>
            <?php if ($general_settings['form_type'] === 'double') : ?>
                <span class="thlogin-link-separator">|</span>
                <a href="#" class="thlogin-link" data-th-popup-action="register"><?php esc_html_e('Register', 'thlogin'); ?></a>
            <?php endif; ?>
        </div>
    </form>

    <?php require THLOGIN_PATH . 'templates/parts/form-footer.php'; ?>
</div>