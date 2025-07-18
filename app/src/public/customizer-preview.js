(function ($) {
    /**
     * Apply a CSS property if value is defined.
     */
    const applyStyle = (selector, property, value) => {
        if (value !== undefined) {
            $(selector).css(property, value);
        }
    };

    /**
     * Handle general text border styling across multiple settings.
     */
    const applyTextBorder = () => {
        const style = wp.customize('th_login_typography_general_text_border_style_setting')();
        const width = wp.customize('th_login_typography_general_text_border_width_setting')();
        const color = wp.customize('th_login_typography_general_text_border_color_setting')();

        const $targets = $('.thlogin-popup-form-container p, .thlogin-popup-form-container span');

        if (style && style !== 'none' && width && color) {
            $targets.css({
                border: `${width} ${style} ${color}`,
                padding: '5px',
                display: 'inline-block',
            });
        } else {
            $targets.css({
                border: 'none',
                padding: '',
                display: '',
            });
        }
    };

    /**
     * Bind a setting to a style application.
     */
    const bindSetting = (settingId, callback) => {
        wp.customize(settingId, value => value.bind(callback));
    };

    // === Bind individual setting updates ===

    // Modal overlay and form
    bindSetting('th_login_modal_overlay_color_setting', val =>
        applyStyle('.thlogin-popup-overlay', 'background', val)
    );

    bindSetting('th_login_modal_form_bg_color_setting', val =>
        applyStyle('.thlogin-popup-form-container', 'background-color', val)
    );

    bindSetting('th_login_modal_form_border_radius_tl_setting', val =>
        applyStyle('.thlogin-popup-form-container', 'border-top-left-radius', val)
    );

    // Login form colors
    bindSetting('th_login_login_form_bg_color_setting', val =>
        applyStyle('.thlogin-form[data-form-type="login"]', 'background-color', val)
    );

    bindSetting('th_login_login_form_text_color_setting', val => {
        applyStyle('.thlogin-form[data-form-type="login"]', 'color', val);
        applyStyle('.thlogin-form[data-form-type="login"] label', 'color', val);
        applyStyle('.thlogin-form[data-form-type="login"] input', 'color', val);
    });

    // General text color
    bindSetting('th_login_typography_general_text_color_setting', val => {
        applyStyle('.thlogin-popup-form-container', 'color', val);
        applyStyle('.thlogin-popup-form-container p', 'color', val);
        applyStyle('.thlogin-popup-form-container span', 'color', val);
    });

    // General text border (watch all 3 settings and reapply)
    bindSetting('th_login_typography_general_text_border_style_setting', applyTextBorder);
    bindSetting('th_login_typography_general_text_border_width_setting', applyTextBorder);
    bindSetting('th_login_typography_general_text_border_color_setting', applyTextBorder);

    // Custom CSS injection
    bindSetting('th_login_custom_css_setting', css => {
        $('#thlogin-custom-css-live-preview').remove();
        if (css) {
            $('head').append(`<style id="thlogin-custom-css-live-preview">${css}</style>`);
        }
    });

    // Auto-open modal in preview
    $(window).on('load', function () {
        const $modal = $('#thlogin-popup-modal');
        if ($modal.length) {
            $modal
                .css('display', 'flex')
                .attr('aria-hidden', 'false')
                .addClass('thlogin-popup-modal--opening thlogin-popup-modal--active');

            $('.thlogin-form[data-form-type="login"]')
                .addClass('thlogin-form--active')
                .show();
        }
    });
})(jQuery);
