<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
require_once THLOGIN_PATH . 'templates/parts/form-header.php';

class THLogin_Login_Form {
    protected $settings;
    protected $fields;
    protected $layout;

    public function __construct() {
        $this->settings = get_option('thlogin_settings', []);
        $this->fields = $this->settings['form_fields']['login'] ?? [];
        $this->layout = $this->settings['design']['modal']['modal_input_layout'] ?? 'stack';
    }

    public function render() {
        $general = $this->settings['general'] ?? [];
        $design = $this->settings['design'] ?? [];
        $security = $this->settings['security'] ?? [];
        $allow_user_registration = $general['allow_user_registration'] ?? true;
        $submit_text = $design['submitButton']['login'] ?? esc_html__('Log In', 'th-login');

        echo '<div class="thlogin-form thlogin-form--login" data-form-type="login">';
        echo thlogin_render_form_header();

        do_action('thlogin_before_login_form');

        echo '<form class="thlogin-ajax-form th-login-from-feilds-combine" data-form-type="login">';
        echo '<div class="thlogin-messages" aria-live="polite"></div>';
        
        // Translators: Use printf + esc_html__ for consistent safe translations
        printf( '<h3>%s</h3>', esc_html__( 'Login', 'th-login' ) );

        if (isset($_GET['thlogin_email_verified'])) {
            $status = $_GET['thlogin_email_verified'];
            $msg = $status === 'success'
                ? esc_html__('Your email has been verified successfully.', 'th-login')
                : esc_html__('Invalid or expired verification link.', 'th-login');
            $class = $status === 'success' ? 'success' : 'error';
            echo '<div class="th-login-message ' . esc_attr($class) . '">' . esc_html($msg) . '</div>';
        }

        foreach ($this->fields as $field) {
            if (!empty($field['hidden'])) continue;

            $this->render_field($field, $design);
        }

        if (!empty($security['honeypot_enabled'])) {
            echo '<div class="thlogin-honeypot-field" style="display: none;">';
                echo '<input type="text" name="thlogin_hp" id="thlogin_hp" autocomplete="off" />';
            echo '</div>';
        }

        $this->render_recaptcha($security);

        echo '<div class="thlogin-form-submit">';
            echo '<button type="submit" class="thlogin-button thlogin-button--primary">' . esc_html($submit_text) . '</button>';
        echo '</div>';

        echo '<div class="thlogin-form-links">';
        echo '<a href="#" class="thlogin-link" data-th-popup-action="forgot-password">' . esc_html__('Forgot Password?', 'th-login') . '</a>';

        if (!empty($general['form_type']) && $general['form_type'] === 'double' && $allow_user_registration) {
            echo '<span class="thlogin-link-separator">|</span>';
            echo '<a href="#" class="thlogin-link" data-th-popup-action="register">' . esc_html__('Register', 'th-login') . '</a>';
        }
        echo '</div>';

        echo '</form>';

        do_action('thlogin_after_login_form');
        
        echo '</div>';

        if (!empty($security['recaptcha']['enabled']) && $security['recaptcha']['type'] === 'v2_checkbox') {
            echo '<script src="https://www.google.com/recaptcha/api.js" async defer></script>';
        }
    }

    protected function render_field($field, $design) {
        $type = sanitize_text_field($field['type'] ?? 'text');
        $name = sanitize_key($field['name'] ?? '');
        $id = sanitize_key($field['id'] ?? 'field_' . wp_generate_uuid4());
        $label = sanitize_text_field($field['label'] ?? '');
        $placeholder = sanitize_text_field($field['placeholder'] ?? '');
        $required = !empty($field['required']);
        $icon = sanitize_text_field($field['icon'] ?? '');

        $field_class = 'thlogin-form-field';
        if ($type === 'checkbox') $field_class .= ' thlogin-form-field--checkbox';
        if ($this->layout === 'stack') $field_class .= ' thlogin-layout-stack';
        if ($this->layout === 'inline') $field_class .= ' thlogin-layout-inline';
        if ($this->layout === 'floating') $field_class .= ' thlogin-layout-floating';
        if ($this->layout === 'placehold') $field_class .= ' thlogin-layout-floating';

        $autocomplete = '';
        if (stripos($name, 'user') !== false) $autocomplete = 'username';
        if (stripos($name, 'email') !== false) $autocomplete = 'email';
        if (stripos($name, 'pass') !== false) $autocomplete = 'current-password';

        $icon_position = $design['icon']['icon_position'] ?? 'with-label';
        $show_icon_in_label = $icon && $icon_position === 'with-label';
        $show_icon_in_input = $icon && $icon_position === 'inside-input';

        echo '<div class="' . esc_attr($field_class) . '">';
            if ($type === 'checkbox') {
                echo '<input type="checkbox" name="' . esc_attr($name) . '" id="' . esc_attr($id) . '" value="1"' . ($required ? ' required' : '') . ' />';
                echo '<label for="' . esc_attr($id) . '">' . esc_html($label);
                if ($required) echo '<span class="th-required">*</span>';
                echo '</label>';
            } else {
                if (in_array($this->layout, ['floating', 'placehold'], true)) {
                    echo '<div class="floating-wrapper layout-' . esc_attr($this->layout) . ' ' . ($show_icon_in_input ? 'icon-activated-input-wrapper' : '') . '">';
                    echo '<input class="floating-input ' . ($show_icon_in_input ? 'icon-activated-input' : '') . '"'
                        . ($show_icon_in_input ? ' style="background-image: ' . esc_attr(thlogin_get_icon_svg_data_uri($icon)) . ';"' : '')
                        . ' type="' . esc_attr($type) . '" name="' . esc_attr($name) . '" id="' . esc_attr($id) . '" placeholder=" "'
                        . ($required ? ' required' : '')
                        . ($autocomplete ? ' autocomplete="' . esc_attr($autocomplete) . '"' : '')
                        . ' />';
                    echo '<label for="' . esc_attr($id) . '" class="floating-label">' . esc_html($label);
                    if ($required) echo '<span class="th-required">*</span>';
                    echo '</label></div>';
                } else {
                    echo '<label for="' . esc_attr($id) . '" class="thlogin-label-with-icon">';
                    if ($show_icon_in_label) {
                        echo '<span class="thlogin-label-icon">' . wp_kses(thlogin_get_icon_svg($icon), thlogin_get_allowed_svg_tags()) . '</span>';
                    }
                    echo '<span class="thlogin-label-text">' . esc_html($label);
                    if ($required) echo '<span class="th-required">*</span>';
                    echo '</span></label>';

                    echo '<input class="' . ($show_icon_in_input ? 'icon-activated-input' : '') . '"'
                        . ($show_icon_in_input ? ' style="background-image: ' . esc_attr(thlogin_get_icon_svg_data_uri($icon)) . ';"' : '')
                        . ' type="' . esc_attr($type) . '" name="' . esc_attr($name) . '" id="' . esc_attr($id) . '" placeholder="' . esc_attr($placeholder) . '"'
                        . ($required ? ' required' : '')
                        . ($autocomplete ? ' autocomplete="' . esc_attr($autocomplete) . '"' : '')
                        . ' />';
                }
            }
        echo '</div>';
    }

    protected function render_recaptcha($security) {
        $recaptcha = $security['recaptcha'] ?? [];
        $show_on = $recaptcha['show_on'] ?? 'all';

        if (!empty($recaptcha['enabled']) && ($show_on === 'all' || $show_on === 'login')) {
            if ($recaptcha['type'] === 'v2_checkbox') {
                echo '<div class="thlogin-form-field">';
                echo '<div class="g-recaptcha" data-sitekey="' . esc_attr($recaptcha['site_key']) . '"></div>';
                echo '</div>';
            } elseif ($recaptcha['type'] === 'v3') {
                echo '<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">';
                echo '<script>
                    document.addEventListener("DOMContentLoaded", function () {
                        if (typeof grecaptcha !== "undefined") {
                            grecaptcha.ready(function () {
                                grecaptcha.execute("' . esc_attr($recaptcha['site_key']) . '", { action: "login" })
                                    .then(function (token) {
                                        document.getElementById("g-recaptcha-response").value = token;
                                    });
                            });
                        }
                    });
                </script>';
            }
        }
    }
}

// Usage:
// $form = new THLogin_Login_Form();
// $form->render();
