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
    $general   = $this->settings['general'] ?? [];
    $design    = $this->settings['design'] ?? [];
    $security  = $this->settings['security'] ?? [];
    $allow_user_registration = $general['allow_user_registration'] ?? true;
    $submit_text = $design['submitButton']['login'] ?? esc_html__( 'Log In', 'themehunk-login-registration' );

    $logo      = $design['logo'] ?? [];
    $logo_url  = ! empty( $logo['url'] ) ? esc_url( $logo['url'] ) : '';
    $logo_size = ! empty( $logo['size'] ) ? esc_attr( $logo['size'] ) : '30px';
    ?>

    <div class="thlogin-form thlogin-form--login" data-form-type="login">
        <?php echo wp_kses_post( thlogin_render_form_header() ); ?>

        <?php do_action( 'thlogin_before_login_form' ); ?>

        <form class="thlogin-ajax-form th-login-from-feilds-combine" data-form-type="login">
            <div class="thlogin-messages" aria-live="polite"></div>

            <?php if ( $logo_url ) { ?>
                <div class="thlogin-form-logo">
                    <div class="thlogin-form-logo-wrapper">
                        <img 
                            src="<?php echo esc_url( $logo_url ); ?>" 
                            alt="<?php echo esc_attr__( 'Logo', 'themehunk-login-registration' ); ?>" 
                            class="thlogin-form-logo" 
                            style="height:<?php echo esc_attr( $logo_size ); ?>;max-height:<?php echo esc_attr( $logo_size ); ?>;object-fit:cover;" 
                        />
                    </div>
                    <h3><?php esc_html_e( 'Login', 'themehunk-login-registration' ); ?></h3>
                </div>
            <?php } else { ?>
                <h3><?php esc_html_e( 'Login', 'themehunk-login-registration' ); ?></h3>
            <?php } ?>

            <?php
            // Email verification message
            if (
                isset( $_GET['thlogin_email_verified'], $_GET['_wpnonce'] ) &&
                wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ), 'thlogin_email_verify' )
            ) {
                $status = sanitize_text_field( wp_unslash( $_GET['thlogin_email_verified'] ) );

                $msg   = ( $status === 'success' )
                    ? esc_html__( 'Your email has been verified successfully.', 'themehunk-login-registration' )
                    : esc_html__( 'Invalid or expired verification link.', 'themehunk-login-registration' );

                $class = ( $status === 'success' ) ? 'success' : 'error';
                ?>
                <div class="th-login-message <?php echo esc_attr( $class ); ?>">
                    <?php echo esc_html( $msg ); ?>
                </div>
                <?php
            }
            ?>

            <?php foreach ( $this->fields as $field ) {
                if ( ! empty( $field['hidden'] ) ) {
                    continue;
                }
                $this->render_field( $field, $design );
            } ?>

            <?php if ( ! empty( $security['honeypot_enabled'] ) ) { ?>
                <div class="thlogin-honeypot-field" style="display: none;">
                    <input type="text" name="thlogin_hp" id="thlogin_hp" autocomplete="off" />
                </div>
            <?php } ?>

            <?php $this->render_recaptcha( $security ); ?>

            <div class="thlogin-form-submit">
                <button type="submit" class="thlogin-button thlogin-button--primary">
                    <?php echo esc_html( $submit_text ); ?>
                </button>
            </div>

            <div class="thlogin-form-links">
                <a href="#" class="thlogin-link" data-th-popup-action="forgot-password">
                    <?php esc_html_e( 'Forgot Password?', 'themehunk-login-registration' ); ?>
                </a>

                <?php if ( $allow_user_registration ) { ?>
                    <span class="thlogin-link-separator">|</span>
                    <a href="#" class="thlogin-link" data-th-popup-action="register">
                        <?php esc_html_e( 'Register', 'themehunk-login-registration' ); ?>
                    </a>
                <?php } ?>
            </div>
        </form>

        <?php do_action( 'thlogin_after_login_form' ); ?>
    </div>

    <?php
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
        ?>

       <div class="<?php echo esc_attr( $field_class ); ?>">
    <?php if ( $type === 'checkbox' ) { ?>
        <input 
            type="checkbox" 
            name="<?php echo esc_attr( $name ); ?>" 
            id="<?php echo esc_attr( $id ); ?>" 
            value="1"
            <?php if ( $required ) { ?>required<?php } ?>
        />
        <label for="<?php echo esc_attr( $id ); ?>">
            <?php echo esc_html( $label ); ?>
            <?php if ( $required ) { ?><span class="th-required"><?php esc_html_e('*','themehunk-login-registration'); ?> </span><?php } ?>
        </label>

    <?php } else { ?>

        <?php if ( in_array( $this->layout, ['floating', 'placehold'], true ) ) { ?>
            <div class="floating-wrapper layout-<?php echo esc_attr( $this->layout ); ?> <?php esc_attr_e($show_icon_in_input ? 'icon-activated-input-wrapper' : ''); ?>">
                <input 
                    class="floating-input <?php esc_attr_e($show_icon_in_input ? 'icon-activated-input' : ''); ?>"
                    <?php if ( $show_icon_in_input ) { ?>
                        style="background-image: <?php echo esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ); ?>;"
                    <?php } ?>
                    type="<?php echo esc_attr( $type ); ?>"
                    name="<?php echo esc_attr( $name ); ?>"
                    id="<?php echo esc_attr( $id ); ?>"
                    placeholder=" "
                    <?php if ( $required ) { ?>required<?php } ?>
                    <?php if ( $autocomplete ) { ?>autocomplete="<?php echo esc_attr( $autocomplete ); ?>"<?php } ?>
                />
                <label for="<?php echo esc_attr( $id ); ?>" class="floating-label">
                    <?php echo esc_html( $label ); ?>
                    <?php if ( $required ) { ?><span class="th-required"><?php esc_html_e('*','themehunk-login-registration'); ?> </span><?php } ?>
                </label>
            </div>

        <?php } else { ?>
            <label for="<?php echo esc_attr( $id ); ?>" class="thlogin-label-with-icon">
                <?php if ( $show_icon_in_label ) { ?>
                    <span class="thlogin-label-icon">
                        <?php echo wp_kses( thlogin_get_icon_svg( $icon ), thlogin_get_allowed_svg_tags() ); ?>
                    </span>
                <?php } ?>
                <span class="thlogin-label-text">
                    <?php echo esc_html( $label ); ?>
                    <?php if ( $required ) { ?><span class="th-required"> 
                        <?php esc_html_e('*','themehunk-login-registration'); ?> </span><?php } ?>
                </span>
            </label>

            <input 
                class="<?php esc_attr_e($show_icon_in_input ? 'icon-activated-input' : ''); ?>"
                <?php if ( $show_icon_in_input ) { ?>
                    style="background-image: <?php echo esc_attr( thlogin_get_icon_svg_data_uri( $icon ) ); ?>;"
                <?php } ?>
                type="<?php echo esc_attr( $type ); ?>"
                name="<?php echo esc_attr( $name ); ?>"
                id="<?php echo esc_attr( $id ); ?>"
                placeholder="<?php echo esc_attr( $placeholder ); ?>"
                <?php if ( $required ) { ?>required<?php } ?>
                <?php if ( $autocomplete ) { ?>autocomplete="<?php echo esc_attr( $autocomplete ); ?>"<?php } ?>
            />
        <?php } ?>

    <?php } ?>
</div>

 <?php   }

    protected function render_recaptcha($security) {
        $recaptcha = $security['recaptcha'] ?? [];
        $show_on = $recaptcha['show_on'] ?? 'all';

        if (!empty($recaptcha['enabled']) && ($show_on === 'all' || $show_on === 'login')) {

                 if ( $recaptcha['type'] === 'v2_checkbox' ) { ?>
                    <div class="thlogin-form-field">
                        <div 
                            class="g-recaptcha" 
                            data-sitekey="<?php echo esc_attr( $recaptcha['site_key'] ); ?>">
                        </div>
                    </div>
                <?php } elseif ( $recaptcha['type'] === 'v3' ) { ?>
                    <input 
                        type="hidden" 
                        id="g-recaptcha-response" 
                        name="g-recaptcha-response" 
                    />
                    <?php
                    wp_localize_script(
                        'thlogin-custom-admin-script',
                        'recaptcha_object',
                        array(
                            'site_key' => esc_attr( $recaptcha['site_key'] ),
                        )
                    );
                    ?>
                <?php } 

        }
    }
}

// Usage:
// $form = new THLogin_Login_Form();
// $form->render();
