document.addEventListener('DOMContentLoaded', () => {

    // Get references to the main modal elements.
    const modal = document.getElementById('th-login-popup-modal');
    const closeButton = modal ? modal.querySelector('.th-login-popup-close-button') : null;
    const overlay = modal ? modal.querySelector('.th-login-popup-overlay') : null;
    const formContainer = modal ? modal.querySelector('.th-login-popup-form-container') : null;

    // Get references to all form types within the modal.
    const loginForm = modal ? modal.querySelector('[data-form-type="login"]') : null;
    const registerForm = modal ? modal.querySelector('[data-form-type="register"]') : null;
    const forgotPasswordForm = modal ? modal.querySelector('[data-form-type="forgot-password"]') : null;

    // Get all elements that can trigger the modal.
    // This will include elements with the custom CSS class and shortcode links.
    const triggerElements = document.querySelectorAll(`.${thLoginFrontendData.settings.display_triggers.trigger_css_class}, [data-th-popup-action]`);

    // Retrieve settings for easier access.
    const displayTriggers = thLoginFrontendData.settings.display_triggers;
    const generalSettings = thLoginFrontendData.settings.general;
    const isUserLoggedIn = thLoginFrontendData.isUserLoggedIn;
    const currentUserRoles = thLoginFrontendData.currentUserRoles || [];

    // --- Helper Functions for Modal Control ---

    /**
     * Opens the modal and sets the active form.
     * @param {string} formType 'login', 'register', or 'forgot-password'.
     */
    const openModal = (formType = 'login') => {
        if (!modal) return;

        // Apply animations (CSS classes will handle actual animation).
        modal.classList.remove('th-login-popup-modal--closing');
        modal.classList.add('th-login-popup-modal--opening');
        modal.style.display = 'flex'; // Use flex to center content.
        modal.setAttribute('aria-hidden', 'false');

        // Set the active form.
        setActiveForm(formType);

        // Add a class after a short delay to trigger CSS transitions for content.
        setTimeout(() => {
            modal.classList.add('th-login-popup-modal--active');
        }, 50); // Small delay to allow 'display: flex' to apply before transition.

        // Record that the popup was shown for frequency control.
        recordPopupShown();
    };

    /**
     * Closes the modal.
     */
    const closeModal = () => {
        if (!modal) return;

        modal.classList.remove('th-login-popup-modal--opening');
        modal.classList.add('th-login-popup-modal--closing');
        modal.setAttribute('aria-hidden', 'true');

        // Listen for animation end to hide completely.
        modal.addEventListener('animationend', function handler() {
            if (modal.classList.contains('th-login-popup-modal--closing')) {
                modal.style.display = 'none';
                modal.classList.remove('th-login-popup-modal--active', 'th-login-popup-modal--closing');
            }
            modal.removeEventListener('animationend', handler);
        });
    };

    /**
     * Switches the currently visible form within the modal.
     * @param {string} type The type of form to show ('login', 'register', 'forgot-password').
     */
    const setActiveForm = (type) => {
        const forms = [loginForm, registerForm, forgotPasswordForm];
        forms.forEach(form => {
            if (form) {
                // For forms within the main modal, hide/show.
                // For shortcode-embedded forms, they manage their own display.
                if (form.closest('#th-login-popup-modal')) { // Check if form is inside the modal
                    if (form.dataset.formType === type) {
                        form.style.display = 'block'; // Or 'flex' if using flexbox for internal form layout
                        form.classList.add('th-login-form--active');
                    } else {
                        form.style.display = 'none';
                        form.classList.remove('th-login-form--active');
                    }
                }
            }
        });
        // Optional: Add a class to the form container to trigger form-specific animations.
        if (formContainer) {
            formContainer.dataset.activeForm = type;
        }
    };

    /**
     * Displays a message within the active form.
     * @param {HTMLElement} formElement The form element where the message should be displayed.
     * @param {string} message The message text.
     * @param {string} type 'success' or 'error'.
     */
    const showMessage = (formElement, message, type) => {
        const messagesContainer = formElement.querySelector('.th-login-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `<p class="th-login-message th-login-message--${type}">${message}</p>`;
            messagesContainer.style.display = 'block';
            // Clear message after a few seconds.
            setTimeout(() => {
                messagesContainer.innerHTML = '';
                messagesContainer.style.display = 'none';
            }, 5000);
        }
    };

    /**
     * Checks if the modal should be displayed based on global conditions.
     * @returns {boolean} True if conditions allow display, false otherwise.
     */
    const canShowModal = () => {
        if (isUserLoggedIn && displayTriggers.auto_open_conditions.for_logged_out_only) {
            return false; // Only for logged out users.
        }

        // Check for specific roles (if enabled).
        const specificRoles = displayTriggers.auto_open_conditions.for_specific_roles || [];
        if (specificRoles.length > 0) {
            const hasMatchingRole = currentUserRoles.some(role => specificRoles.includes(role));
            if (!hasMatchingRole) {
                return false; // User does not have a required role.
            }
        }

        // Check device visibility.
        const deviceVisibility = displayTriggers.auto_open_conditions.device_visibility;
        const isMobile = window.innerWidth <= 768; // Common breakpoint for mobile
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Common breakpoint for tablet
        const isDesktop = window.innerWidth > 1024; // Common breakpoint for desktop

        if ((isMobile && !deviceVisibility.mobile) ||
            (isTablet && !deviceVisibility.tablet) ||
            (isDesktop && !deviceVisibility.desktop)) {
            return false; // Not visible on this device.
        }

        // Check pop-up frequency.
        if (displayTriggers.pop_up_frequency?.enabled) {
            const lastShown = localStorage.getItem('th_login_last_shown');
            if (lastShown) {
                const lastShownTime = parseInt(lastShown, 10);
                const currentTime = Date.now();

                if (displayTriggers.pop_up_frequency.type === 'session') {
                    // If already shown in this session, don't show again.
                    if (sessionStorage.getItem('th_login_session_shown')) {
                        return false;
                    }
                } else if (displayTriggers.pop_up_frequency.type === 'days') {
                    const daysToHide = displayTriggers.pop_up_frequency.days;
                    const daysPassed = (currentTime - lastShownTime) / (1000 * 60 * 60 * 24);
                    if (daysPassed < daysToHide) {
                        return false; // Not enough days passed.
                    }
                }
            }
        }

        // Check page/content conditions (PHP handles most of this, but JS can add checks).
        // If the modal HTML is rendered, it means PHP conditions (pages, categories, tags, WooCommerce) are met.

        return true;
    };

    /**
     * Records that the popup was shown for frequency control.
     */
    const recordPopupShown = () => {
        if (displayTriggers.pop_up_frequency?.enabled) {
            localStorage.setItem('th_login_last_shown', Date.now().toString());
            sessionStorage.setItem('th_login_session_shown', 'true');
        }
    };

    // --- Event Listeners ---

    // 1. Close button click.
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // 2. Overlay click (to close modal).
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // 3. Keyboard (Escape key) to close modal.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });

    // 4. Trigger elements (buttons, links) to open modal.
    triggerElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link/button behavior.
            const formType = element.dataset.thPopupAction || 'login'; // Default to login if not specified.
            if (canShowModal()) { // Check global conditions before opening via manual trigger.
                openModal(formType);
            }
        });
    });

    // 5. Form switching links within the modal.
    modal.querySelectorAll('[data-th-popup-action]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const actionType = e.target.dataset.thPopupAction;
            if (actionType === 'login' || actionType === 'register' || actionType === 'forgot-password') {
                setActiveForm(actionType);
            }
        });
    });

    // --- REST API Form Submission Handling ---

    // Target both modal forms and shortcode forms.
    document.querySelectorAll('.th-login-ajax-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission.

            const formType = form.dataset.formType; // 'login', 'register', 'forgot-password'
            const formData = new FormData(form);
            const messagesContainer = form.querySelector('.th-login-messages');
            messagesContainer.innerHTML = ''; // Clear previous messages.
            messagesContainer.style.display = 'none';

            // Convert FormData to a plain object for JSON body.
            const requestData = {};
            for (let [key, value] of formData.entries()) {
                requestData[key] = value;
            }

            // Determine the REST API endpoint based on form type.
            const endpoint = `${thLoginFrontendData.siteUrl}/wp-json/th-login/v1/${formType}`;

            try {
                // Simulate loading state.
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    // Store original button text to restore later.
                    submitButton.dataset.originalText = submitButton.innerHTML;
                    submitButton.innerHTML = `<span class="th-login-spinner"></span> ${thLoginFrontendData.settings.design.buttons.primary.text_saving || 'Processing...'}`;
                }

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': thLoginFrontendData.nonce, // Include the nonce for security.
                    },
                    body: JSON.stringify(requestData), // Send data as JSON.
                });

                const data = await response.json();

                if (data.success) {
                    showMessage(form, data.data.message || 'Success!', 'success');

                    // Handle redirection based on settings.
                    if (data.data.redirect_url) {
                        // Small delay to allow message to be seen.
                        setTimeout(() => {
                            window.location.href = data.data.redirect_url;
                        }, 1000);
                    } else if (formType === 'register' && generalSettings.auto_login_after_registration) {
                        // If auto-login is enabled and no specific redirect, just reload the page to reflect login status.
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else if (formType === 'forgot-password') {
                        // For forgot password, just show success message and keep modal open for user to read.
                    } else {
                        // For other successful submissions without redirect, just close the modal if it's the popup.
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
                    submitButton.innerHTML = submitButton.dataset.originalText || 'Submit'; // Restore original text.
                }
            }
        });
    });

    // --- Auto-Open Logic ---

    // Check if modal should auto-open based on conditions.
    const checkAndAutoOpenModal = () => {
        if (!canShowModal()) {
            return;
        }

        // Priority for URL parameter from WooCommerce or custom triggers.
        const urlParams = new URLSearchParams(window.location.search);
        const wcAction = urlParams.get('th_login_action'); // For WooCommerce redirects.
        const customParamName = displayTriggers.auto_open_conditions.url_parameter_trigger.param_name;
        const customParamValue = displayTriggers.auto_open_conditions.url_parameter_trigger.param_value;
        const customParamTriggered = urlParams.has(customParamName) && urlParams.get(customParamName) === customParamValue;

        if (wcAction && ['login', 'register', 'forgot-password'].includes(wcAction)) {
            openModal(wcAction);
            return;
        } else if (customParamTriggered) {
            openModal('login'); // Default to login for generic URL param trigger.
            return;
        }


        // Auto-Open on Page Load
        if (displayTriggers.auto_open_on_load?.enabled) {
            const delay = displayTriggers.auto_open_on_load.delay_seconds * 1000;
            setTimeout(() => {
                openModal('login'); // Default to login on auto-open.
            }, delay);
            return; // Only one auto-open trigger should fire.
        }

        // Auto-Open on Scroll
        if (displayTriggers.auto_open_on_scroll?.enabled) {
            let hasScrolled = false;
            const scrollHandler = () => {
                const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                if (scrollPercentage >= displayTriggers.auto_open_on_scroll.scroll_percentage && !hasScrolled) {
                    hasScrolled = true;
                    openModal('login');
                    window.removeEventListener('scroll', scrollHandler);
                }
            };
            window.addEventListener('scroll', scrollHandler);
        }

        // Auto-Open on Exit Intent
        if (displayTriggers.auto_open_on_exit_intent?.enabled) {
            let mouseLeaving = false;
            const exitIntentHandler = (e) => {
                // Check if mouse is moving towards the top of the viewport
                if (e.clientY < 50 && e.relatedTarget === null && e.toElement === null) {
                    if (!mouseLeaving) {
                        mouseLeaving = true;
                        openModal('login');
                        document.removeEventListener('mouseout', exitIntentHandler);
                    }
                }
            };
            document.addEventListener('mouseout', exitIntentHandler);
        }

        // Auto-Open on Time on Page
        if (displayTriggers.auto_open_on_time_on_page?.enabled) {
            const time = displayTriggers.auto_open_on_time_on_page.time_seconds * 1000;
            setTimeout(() => {
                openModal('login');
            }, time);
        }

        // Referrer Detection
        if (displayTriggers.auto_open_conditions.referrer_detection?.enabled) {
            const referrerUrls = displayTriggers.auto_open_conditions.referrer_detection.referrer_urls || [];
            const documentReferrer = document.referrer;

            if (documentReferrer && referrerUrls.length > 0) {
                const isMatchingReferrer = referrerUrls.some(url => documentReferrer.includes(url));
                if (isMatchingReferrer) {
                    openModal('login');
                }
            }
        }
    };

    // Initial check for auto-open conditions after DOM is ready.
    checkAndAutoOpenModal();

    // Ensure shortcode-embedded forms are visible by default.
    document.querySelectorAll('.th-login-shortcode-form-wrapper .th-login-form').forEach(form => {
        form.style.display = 'block';
        form.classList.add('th-login-form--active'); // Mark as active if embedded directly.
    });
});
