import './styles/frontend.scss';

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const modal = document.getElementById('th-login-popup-modal');
    if (!modal) return;

    const formContainer = modal.querySelector('.th-login-popup-form-container');

    const loginForm = modal.querySelector('[data-form-type="login"]');
    const registerForm = modal.querySelector('[data-form-type="register"]');
    const forgotPasswordForm = modal.querySelector('[data-form-type="forgot-password"]');

    const triggerSelector = `.${thLoginFrontendData.settings.display_triggers.trigger_css_class}, [data-th-popup-action]`;
    const displayTriggers = thLoginFrontendData.settings.display_triggers;
    const generalSettings = thLoginFrontendData.settings.general;
    const isUserLoggedIn = thLoginFrontendData.isUserLoggedIn;
    const currentUserRoles = thLoginFrontendData.currentUserRoles || [];
    const display_type = generalSettings.display_mode || 'popup';

    // --- Variables ---
    let animationEndHandler = null;

    // --- Functions ---

    const setActiveForm = (type) => {
        [loginForm, registerForm, forgotPasswordForm].forEach(form => {
            if (!form) return;
            if (form.closest('#th-login-popup-modal')) {
                if (form.dataset.formType === type) {
                    form.style.display = 'block';
                    form.classList.add('th-login-form--active');
                } else {
                    form.style.display = 'none';
                    form.classList.remove('th-login-form--active');
                }
            }
        });
        if (formContainer) formContainer.dataset.activeForm = type;
    };

    const showMessage = (formElement, message, type) => {
        const container = formElement.querySelector('.th-login-messages');
        if (!container) return;
        container.innerHTML = `<p class="th-login-message th-login-message--${type}">${message}</p>`;
        container.style.display = 'block';
        setTimeout(() => {
            container.innerHTML = '';
            container.style.display = 'none';
        }, 5000);
    };

    const canShowModal = () => {
        if (isUserLoggedIn && displayTriggers.auto_open_conditions.for_logged_out_only) return false;

        const specificRoles = displayTriggers.auto_open_conditions.for_specific_roles || [];
        if (specificRoles.length && !currentUserRoles.some(role => specificRoles.includes(role))) return false;

        const deviceVisibility = displayTriggers.auto_open_conditions.device_visibility;
        const w = window.innerWidth;
        const isMobile = w <= 768;
        const isTablet = w > 768 && w <= 1024;
        const isDesktop = w > 1024;

        if ((isMobile && !deviceVisibility.mobile) ||
            (isTablet && !deviceVisibility.tablet) ||
            (isDesktop && !deviceVisibility.desktop)) return false;

        if (displayTriggers.pop_up_frequency?.enabled) {
            const lastShown = localStorage.getItem('th_login_last_shown');
            const now = Date.now();

            if (displayTriggers.pop_up_frequency.type === 'session' && sessionStorage.getItem('th_login_session_shown')) {
                return false;
            }

            if (displayTriggers.pop_up_frequency.type === 'days' && lastShown) {
                const daysPassed = (now - parseInt(lastShown, 10)) / (1000 * 60 * 60 * 24);
                if (daysPassed < displayTriggers.pop_up_frequency.days) return false;
            }
        }

        return true;
    };

    const recordPopupShown = () => {
        if (displayTriggers.pop_up_frequency?.enabled) {
            localStorage.setItem('th_login_last_shown', Date.now().toString());
            sessionStorage.setItem('th_login_session_shown', 'true');
        }
    };

    const openModal = (formType = 'login') => {
        if (!modal) return;

        modal.classList.remove(
            'th-login-slide-in-left',
            'th-login-slide-in-right',
            'th-login-popup-modal--closing',
            'th-login-popup-modal--active'
        );
        modal.classList.add('th-login-popup-modal--opening');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');

        if (display_type === 'slide_in_left') {
            modal.classList.add('th-login-slide-in-left');
        } else if (display_type === 'slide_in_right') {
            modal.classList.add('th-login-slide-in-right');
        }

        setActiveForm(formType);

        setTimeout(() => {
            modal.classList.add('th-login-popup-modal--active');
        }, 50);

        recordPopupShown();

        if (animationEndHandler) {
            modal.removeEventListener('animationend', animationEndHandler);
            animationEndHandler = null;
        }
    };

    const closeModal = () => {
        if (!modal) return;

        modal.classList.remove('th-login-popup-modal--opening');
        modal.classList.add('th-login-popup-modal--closing');
        modal.classList.remove('th-login-slide-in-left', 'th-login-slide-in-right');
        modal.setAttribute('aria-hidden', 'true');

        animationEndHandler = function handler() {
            if (modal.classList.contains('th-login-popup-modal--closing')) {
                modal.style.display = 'none';
                modal.classList.remove('th-login-popup-modal--active', 'th-login-popup-modal--closing');
            }
            modal.removeEventListener('animationend', animationEndHandler);
            animationEndHandler = null;
        };
        modal.addEventListener('animationend', animationEndHandler);
    };

    // --- Event Delegation for clicks on body ---

    document.body.addEventListener('click', e => {
        // Close modal: overlay or close button
        if (e.target.closest('.th-login-popup-close-button') || e.target.closest('.th-login-popup-overlay')) {
            closeModal();
        }
        // Open modal via trigger elements
        else if (e.target.closest(triggerSelector)) {
            e.preventDefault();
            const trigger = e.target.closest(triggerSelector);
            const formType = trigger.dataset.thPopupAction || 'login';
            if (canShowModal()) openModal(formType);
        }
        // Switch forms inside modal via links/buttons with data attribute
        else if (modal && modal.contains(e.target)) {
            const actionType = e.target.dataset.thPopupAction;
            if (['login', 'register', 'forgot-password'].includes(actionType)) {
                e.preventDefault();
                setActiveForm(actionType);
            }
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });

    // --- Form Submission Handling ---
    document.querySelectorAll('.th-login-ajax-form').forEach(form => {
        form.addEventListener('submit', async e => {
            e.preventDefault();

            const formType = form.dataset.formType;
            const formData = new FormData(form);
            const messagesContainer = form.querySelector('.th-login-messages');

            if (messagesContainer) {
                messagesContainer.innerHTML = '';
                messagesContainer.style.display = 'none';
            }

            const requestData = {};
            for (let [key, value] of formData.entries()) {
                requestData[key] = value;
            }

            const endpoint = `${thLoginFrontendData.siteUrl}/wp-json/th-login/v1/${formType}`;

            try {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.dataset.originalText = submitButton.innerHTML;
                    submitButton.innerHTML = `<span class="th-login-spinner"></span> ${thLoginFrontendData.settings.design?.buttons?.primary?.text_saving || 'Processing...'}`;
                }

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': thLoginFrontendData.nonce,
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();

                if (data.success) {
                    showMessage(form, data.data.message || 'Success!', 'success');

                    if (data.data.redirect_url) {
                        setTimeout(() => {
                            window.location.href = data.data.redirect_url;
                        }, 1000);
                    } else if (formType === 'register' && generalSettings.auto_login_after_registration) {
                        setTimeout(() => window.location.reload(), 1000);
                    } else if (formType === 'forgot-password') {
                        // Keep modal open so user can see success
                    } else {
                        if (form.closest('#th-login-popup-modal')) {
                            setTimeout(closeModal, 1000);
                        }
                    }
                } else {
                    showMessage(form, data.data.message || 'An error occurred. Please try again.', 'error');
                }
            } catch (error) {
                showMessage(form, 'An unexpected error occurred. Please check your network.', 'error');
                console.error('TH Login: Frontend REST API Error:', error);
            } finally {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = submitButton.dataset.originalText || 'Submit';
                }
            }
        });
    });

    // --- Auto-Open Logic ---
    const checkAndAutoOpenModal = () => {
        if (!canShowModal()) return;

        const urlParams = new URLSearchParams(window.location.search);
        const wcAction = urlParams.get('th_login_action');
        const customParamName = displayTriggers.auto_open_conditions.url_parameter_trigger.param_name;
        const customParamValue = displayTriggers.auto_open_conditions.url_parameter_trigger.param_value;
        const customParamTriggered = urlParams.has(customParamName) && urlParams.get(customParamName) === customParamValue;

        if (wcAction && ['login', 'register', 'forgot-password'].includes(wcAction)) {
            openModal(wcAction);
            return;
        } else if (customParamTriggered) {
            openModal('login');
            return;
        }

        if (displayTriggers.auto_open_on_load?.enabled) {
            setTimeout(() => openModal('login'), (displayTriggers.auto_open_on_load.delay_seconds || 0) * 1000);
            return;
        }

        if (displayTriggers.auto_open_on_scroll?.enabled) {
            let triggered = false;
            const onScroll = () => {
                const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                if (!triggered && scrollPercent >= (displayTriggers.auto_open_on_scroll.scroll_percentage || 50)) {
                    triggered = true;
                    openModal('login');
                    window.removeEventListener('scroll', onScroll);
                }
            };
            window.addEventListener('scroll', onScroll);
        }

        if (displayTriggers.auto_open_on_exit_intent?.enabled) {
            let triggered = false;
            const onExitIntent = e => {
                if (e.clientY < 50 && !triggered && !e.relatedTarget && !e.toElement) {
                    triggered = true;
                    openModal('login');
                    document.removeEventListener('mouseout', onExitIntent);
                }
            };
            document.addEventListener('mouseout', onExitIntent);
        }

        if (displayTriggers.auto_open_on_time_on_page?.enabled) {
            setTimeout(() => openModal('login'), (displayTriggers.auto_open_on_time_on_page.time_seconds || 0) * 1000);
        }

        if (displayTriggers.auto_open_conditions.referrer_detection?.enabled) {
            const referrers = displayTriggers.auto_open_conditions.referrer_detection.referrer_urls || [];
            if (document.referrer && referrers.some(r => document.referrer.includes(r))) {
                openModal('login');
            }
        }
    };

    checkAndAutoOpenModal();

    // Show shortcode embedded forms by default (visible)
    document.querySelectorAll('.th-login-shortcode-form-wrapper .th-login-form').forEach(f => {
        f.style.display = 'block';
        f.classList.add('th-login-form--active');
    });

        // Force auto-open if shortcode was used on this page
    const isShortcodeBasedModal = document.querySelector('.th-login-shortcode-form-wrapper');
    if (isShortcodeBasedModal && canShowModal()) {
        openModal('login'); // You can dynamically read form type if needed
    }

});
