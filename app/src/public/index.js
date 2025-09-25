import './styles/frontend.scss';

document.addEventListener('DOMContentLoaded', () => {
    // Load reCAPTCHA script if enabled
    if (thLoginFrontendData.settings.security?.recaptcha?.enabled) {
        const recaptchaType = thLoginFrontendData.settings.security.recaptcha.type;
        const siteKey = thLoginFrontendData.settings.security.recaptcha.site_key;
        
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    // --- Elements ---
    const modal = document.getElementById('thlogin-popup-modal');
    if (!modal) return;

    const formContainer = modal.querySelector('.thlogin-popup-form-container');

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
            if (form.closest('#thlogin-popup-modal')) {
                if (form.dataset.formType === type) {
                    form.style.display = 'block';
                    form.classList.add('thlogin-form--active');
                } else {
                    form.style.display = 'none';
                    form.classList.remove('thlogin-form--active');
                }
            }
        });
        if (formContainer) formContainer.dataset.activeForm = type;
    };

    const showMessage = (formElement, message, type) => {
        const container = formElement.querySelector('.thlogin-messages');
        if (!container) return;
        container.innerHTML = `<p class="thlogin-message thlogin-message--${type}">${message}</p>`;
        container.style.display = 'block';
        setTimeout(() => {
            container.innerHTML = '';
            container.style.display = 'none';
        }, 5000);
    };

    const canAutoOpenModal = () => {
        if (thLoginFrontendData.hasShortcode) return false;
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
            const lastShown = localStorage.getItem('thlogin_last_shown');
            const now = Date.now();

            if (displayTriggers.pop_up_frequency.type === 'session' && sessionStorage.getItem('thlogin_session_shown')) {
                return false;
            }

            if (displayTriggers.pop_up_frequency.type === 'days' && lastShown) {
                const daysPassed = (now - parseInt(lastShown, 10)) / (1000 * 60 * 60 * 24);
                if (daysPassed < displayTriggers.pop_up_frequency.days) return false;
            }
        }

        return true;
    };

    const canManualOpenModal = () => {
        if (thLoginFrontendData.hasShortcode) return false;

        if (isUserLoggedIn && displayTriggers.auto_open_conditions.for_logged_out_only) return false;

        const specificRoles = displayTriggers.auto_open_conditions.for_specific_roles || [];
        if (specificRoles.length && !currentUserRoles.some(role => specificRoles.includes(role))) return false;

        const deviceVisibility = displayTriggers.auto_open_conditions.device_visibility;
        const w = window.innerWidth;
        const isMobile = w <= 768;
        const isTablet = w > 768 && w <= 1024;
        const isDesktop = w > 1024;

        return !(
            (isMobile && !deviceVisibility.mobile) ||
            (isTablet && !deviceVisibility.tablet) ||
            (isDesktop && !deviceVisibility.desktop)
        );
    };

    const recordPopupShown = () => {
        if (displayTriggers.pop_up_frequency?.enabled) {
            localStorage.setItem('thlogin_last_shown', Date.now().toString());
            sessionStorage.setItem('thlogin_session_shown', 'true');
        }
    };

    const openModal = (formType = 'login') => {
        if (!modal) return;

        modal.classList.remove(
            'thlogin-popup-modal-effect',
            'thlogin-slide-in-left',
            'thlogin-slide-in-right',
            'thlogin-page',
            'thlogin-popup-modal--closing',
            'thlogin-popup-modal--active'
        );
        modal.classList.add('thlogin-popup-modal--opening');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');

        if (display_type === 'slide_in_left') {
            modal.classList.add('thlogin-slide-in-left');
        } else if (display_type === 'slide_in_right') {
            modal.classList.add('thlogin-slide-in-right');
        } else if(display_type === 'page'){
            modal.classList.add('thlogin-page');
        }else{
            modal.classList.add('thlogin-popup-modal-effect');
        }

        setActiveForm(formType);

        setTimeout(() => {
            modal.classList.add('thlogin-popup-modal--active');
        }, 50);

        recordPopupShown();

        if (animationEndHandler) {
            modal.removeEventListener('animationend', animationEndHandler);
            animationEndHandler = null;
        }
    };

    const closeModal = () => {
        if (!modal) return;

        modal.classList.remove('thlogin-popup-modal--opening');
        modal.classList.add('thlogin-popup-modal--closing');
        modal.classList.remove('thlogin-slide-in-left', 'thlogin-slide-in-right', 'thlogin-page', 'thlogin-popup-modal-effect');
        modal.setAttribute('aria-hidden', 'true');

        animationEndHandler = function handler() {
            if (modal.classList.contains('thlogin-popup-modal--closing')) {
                modal.style.display = 'none';
                modal.classList.remove('thlogin-popup-modal--active', 'thlogin-popup-modal--closing');
            }
            modal.removeEventListener('animationend', animationEndHandler);
            animationEndHandler = null;
        };
        modal.addEventListener('animationend', animationEndHandler);
    };

    // --- Event Delegation for clicks on body ---

    document.body.addEventListener('click', e => {
        // Close modal: overlay or close button
        if (e.target.closest('.thlogin-popup-close-button') || e.target.closest('.thlogin-popup-overlay')) {
            closeModal();
        }
        // Open modal via trigger elements
        else if (e.target.closest(triggerSelector)) {
            e.preventDefault();
            const trigger = e.target.closest(triggerSelector);
            const formType = trigger.dataset.thPopupAction || 'login';
            // if (canShowModal()) openModal(formType);

              if (canManualOpenModal()) openModal(formType);

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
    document.querySelectorAll('.thlogin-ajax-form').forEach(form => {
        form.addEventListener('submit', async e => {
            e.preventDefault();

             // Handle reCAPTCHA v3 if enabled
            if (thLoginFrontendData.settings.security?.recaptcha?.enabled && 
                thLoginFrontendData.settings.security.recaptcha.type === 'v3') {
                
                try {
                    // Ensure grecaptcha is loaded
                    if (typeof grecaptcha === 'undefined') {
                        showMessage(form, 'Security verification is loading. Please wait...', 'error');
                        return;
                    }
                    
                    // Execute reCAPTCHA v3
                    const token = await grecaptcha.execute(
                        thLoginFrontendData.settings.security.recaptcha.site_key, 
                        {action: 'login'}
                    );
                    
                    // Add token to form data
                    let tokenField = form.querySelector('input[name="g-recaptcha-response"]');

                    if (!tokenField) {
                        tokenField = document.createElement('input');
                        tokenField.type = 'hidden';
                        tokenField.name = 'g-recaptcha-response';
                        form.appendChild(tokenField);
                    }
                    tokenField.value = token;
                    
                } catch (error) {
                    showMessage(form, 'Security verification failed. Please try again.', 'error');
                    console.error('reCAPTCHA v3 error:', error);

                    // 🔁 Reset reCAPTCHA v2 on fetch error
                    if (
                        typeof grecaptcha !== 'undefined' &&
                        thLoginFrontendData.settings.security?.recaptcha?.enabled &&
                        thLoginFrontendData.settings.security.recaptcha.type === 'v2_checkbox'
                    ) {
                        grecaptcha.reset();
                    }
                    
                    return;
                }
            }

            const formType = form.dataset.formType;
            const formData = new FormData(form);
            const messagesContainer = form.querySelector('.thlogin-messages');

            if (messagesContainer) {
                messagesContainer.innerHTML = '';
                messagesContainer.style.display = 'none';
            }

            const requestData = {};
            for (let [key, value] of formData.entries()) {
                requestData[key] = value;
            }

            const endpoint = `${thLoginFrontendData.siteUrl}/wp-json/thlogin/v1/${formType}`;

            try {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.dataset.originalText = submitButton.innerHTML;
                    submitButton.innerHTML = `<span class="thlogin-spinner"></span> ${thLoginFrontendData.settings.design?.buttons?.primary?.text_saving || 'Processing...'}`;
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
                        if (form.closest('#thlogin-popup-modal')) {
                            setTimeout(closeModal, 1000);
                        }
                    }
                } else {
                    showMessage(form, data.data.message || 'An error occurred. Please try again.', 'error');

                    if (
                        typeof grecaptcha !== 'undefined' &&
                        thLoginFrontendData.settings.security?.recaptcha?.enabled &&
                        thLoginFrontendData.settings.security.recaptcha.type === 'v2_checkbox'
                    ) {
                        grecaptcha.reset();
                    }
                }
            } catch (error) {
                showMessage(form, 'An unexpected error occurred. Please check your network.', 'error');
                console.error('TH Login: Frontend REST API Error:', error);

                 if (
                    typeof grecaptcha !== 'undefined' &&
                    thLoginFrontendData.settings.security?.recaptcha?.enabled &&
                    thLoginFrontendData.settings.security.recaptcha.type === 'v2_checkbox'
                ) {
                    grecaptcha.reset();
                }

            } finally {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = submitButton.dataset.originalText || 'Submit';
                }
            }
        });
    });

    const shouldTriggerByConditions = () => {
        const conditions = displayTriggers.auto_open_conditions;
        const currentPageId = thLoginFrontendData.currentPageId;
        const currentPageSlug = thLoginFrontendData.currentPageSlug;
    
        // 1. Check specific pages (working correctly)
        if (conditions.on_specific_pages?.enabled) {
            const pageIds = conditions.on_specific_pages.page_ids || [];
            const pageSlugs = conditions.on_specific_pages.page_slugs || [];
            
            if (pageIds.includes(Number(currentPageId))) {
                return true;
            }
            
            if (pageSlugs.includes(currentPageSlug)) {
                return true;
            }
        }

        // 2. Check categories - FIXED
        if (conditions.on_specific_categories?.enabled) {
            const catIds = conditions.on_specific_categories.category_ids || [];
            const catSlugs = conditions.on_specific_categories.category_slugs || [];
            
            // Check category IDs
            const currentCategoryIds = thLoginFrontendData.currentCategoryIds || [];
            if (currentCategoryIds.some(id => catIds.includes(Number(id)))) {

                return true;
            }
            
            // Check category slugs
            const currentCategorySlugs = thLoginFrontendData.currentCategorySlugs || [];
            if (currentCategorySlugs.some(slug => catSlugs.includes(slug))) {
                return true;
            }
        }

        // 3. Check tags - FIXED
        if (conditions.on_specific_tags?.enabled) {
            const tagIds = conditions.on_specific_tags.tag_ids || [];
            const tagSlugs = conditions.on_specific_tags.tag_slugs || [];
            
            // Check tag IDs
            const currentTagIds = thLoginFrontendData.currentTagIds || [];
            if (currentTagIds.some(id => tagIds.includes(Number(id)))) {
                return true;
            }
            
            // Check tag slugs
            const currentTagSlugs = thLoginFrontendData.currentTagSlugs || [];
            if (currentTagSlugs.some(slug => tagSlugs.includes(slug))) {
                return true;
            }
        }

        return false;
    };

    // --- Auto-Open Logic ---
    const checkAndAutoOpenModal = () => {
        if (!canAutoOpenModal()) return;

        const urlParams = new URLSearchParams(window.location.search);
        const wcAction = urlParams.get('thlogin_action');
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

        // if any page/category/tag conditions match
        if (shouldTriggerByConditions()) {
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
    document.querySelectorAll('.thlogin-shortcode-form-wrapper .thlogin-form').forEach(f => {
        f.style.display = 'block';
        f.classList.add('thlogin-form--active');
    });

    // Force auto-open if shortcode was used on this page
    const isShortcodeBasedModal = document.querySelector('.thlogin-shortcode-form-wrapper');
    if (isShortcodeBasedModal && canShowModal()) {
        openModal('login'); // You can dynamically read form type if needed
    }

});

document.addEventListener('DOMContentLoaded', () => {
	const menuSettings = thLoginFrontendData?.settings?.display_triggers?.menu_integration;

	if (!menuSettings?.enabled) return;

	const isUserLoggedIn = thLoginFrontendData.isUserLoggedIn;
	const logoutEnabled = menuSettings.logout !== false;

	const loginText = menuSettings.item_text_login || __('Login', 'themehunk-login-registration');
	const logoutText = menuSettings.item_text_logout || __('Logout', 'themehunk-login-registration');


    const icons = thLoginFrontendData.icons || {};

	// SVG icons as HTML
	const loginIcon = menuSettings.item_icon_login && icons[menuSettings.item_icon_login]
		? icons[menuSettings.item_icon_login]
		: '';

	const logoutIcon = menuSettings.item_icon_logout && icons[menuSettings.item_icon_logout]
		? icons[menuSettings.item_icon_logout]
		: '';

	const navigation = document.querySelector('.wp-block-navigation ul');
	if (!navigation) return;

	// Remove old button if already present (avoid duplicates)
	const existing = navigation.querySelector('.thlogin-menu-item');
	if (existing) existing.remove();

	const menuItem = document.createElement('li');
	menuItem.className = 'wp-block-navigation-item thlogin-menu-item';

	if (isUserLoggedIn && logoutEnabled) {
		const logoutUrl = thLoginFrontendData.logoutUrl;
		menuItem.innerHTML = `<a href="${logoutUrl}" class="th-login-menu-integration">${logoutIcon}${logoutText}</a>`;
	} else if(! isUserLoggedIn) {
		menuItem.innerHTML = `<a href="#" class="thlogin-trigger" data-th-popup-action="login">${loginIcon}${loginText}</a>`;
	}

	navigation.appendChild(menuItem);
});