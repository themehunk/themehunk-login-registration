<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$all_settings = get_option( 'thlogin_settings', [] );

$design_settings       = $all_settings['design'] ?? [];
$general_settings      = $all_settings['general'] ?? [];
$logo_settings         = $design_settings['logo'] ?? [];
$header_html_settings  = $design_settings['typography']['form_header_html'] ?? [];
$form_type             = $general_settings['form_type'] ?? 'double';
$close_button_settings = $general_settings['close_button'] ?? true;

?>

<div class="thlogin-form-header-part">
    <div class="thlogin-header-top-row">
        <?php if ( $close_button_settings ) : ?>
            <button class="thlogin-popup-close-button thlogin-header-cancel-button" aria-label="<?php esc_attr_e( 'Close', 'th-login' ); ?>">
                <span class="dashicons dashicons-no-alt"></span>
            </button>
        <?php endif; ?>
    </div>

    <?php if ( ! empty( $logo_settings['url'] ) ) : ?>
        <div class="thlogin-logo">
            <?php
            $logo_tag    = $logo_settings['svg_enabled'] ?? false ? 'img' : 'img';
            $logo_url    = esc_url( $logo_settings['url'] );
            $logo_alt    = esc_html__( 'Plugin Logo', 'th-login' );
            $logo_width  = esc_attr( $logo_settings['width']['desktop'] ?? '150px' );
            $logo_margin = esc_attr( $logo_settings['margin_bottom'] ?? '20px' );

            $logo_element = sprintf(
                '<%1$s src="%2$s" alt="%3$s" style="max-width:%4$s; margin-bottom:%5$s;" />',
                esc_attr( $logo_tag ),
                esc_url( $logo_url ),
                esc_attr( $logo_alt ),
                esc_attr( $logo_width ),
                esc_attr( $logo_margin )
            );

            if ( ! empty( $logo_settings['link_url'] ) ) {
                echo wp_kses(
                    sprintf(
                        '<a href="%s">%s</a>',
                        esc_url( $logo_settings['link_url'] ),
                        $logo_element
                    ),
                    array(
                        'a' => array(
                            'href' => array()
                        ),
                        'img' => array(
                            'src' => array(),
                            'alt' => array(),
                            'style' => array()
                        )
                    )
                );
            } else {
                echo wp_kses(
                    $logo_element,
                    array(
                        'img' => array(
                            'src' => array(),
                            'alt' => array(),
                            'style' => array()
                        )
                    )
                );
            }
            ?>
        </div>
    <?php endif; ?>

    <?php if ( ! empty( $header_html_settings['enabled'] ) && ! empty( $header_html_settings['content'] ) ) : ?>
        <div class="thlogin-custom-header-html">
            <?php echo wp_kses_post( $header_html_settings['content'] ); ?>
        </div>
    <?php endif; ?>

    <?php if ( $form_type === 'double' ) : ?>
        <div class="thlogin-form-toggle">
            <button type="button" class="thlogin-toggle-button thlogin-toggle-button--login thlogin-header-button" data-th-popup-action="login">
                <?php esc_html_e( 'Login', 'th-login' ); ?>
            </button>
            <button type="button" class="thlogin-toggle-button thlogin-toggle-button--register thlogin-header-button" data-th-popup-action="register">
                <?php esc_html_e( 'Register', 'th-login' ); ?>
            </button>
        </div>
    <?php endif; ?>
</div>