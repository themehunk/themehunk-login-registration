/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/frontend.js":
/*!********************************!*\
  !*** ./src/public/frontend.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/frontend.scss */ "./src/public/styles/frontend.scss");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Import necessary utilities if needed.
// For now, we'll use vanilla JS for core modal logic.

// Ensure the DOM is fully loaded before attempting to interact with elements.
document.addEventListener('DOMContentLoaded', function () {
  // Get references to the main modal elements.
  var modal = document.getElementById('th-login-popup-modal');
  var closeButton = modal ? modal.querySelector('.th-login-popup-close-button') : null;
  var overlay = modal ? modal.querySelector('.th-login-popup-overlay') : null;
  var formContainer = modal ? modal.querySelector('.th-login-popup-form-container') : null;

  // Get references to all form types within the modal.
  var loginForm = modal ? modal.querySelector('[data-form-type="login"]') : null;
  var registerForm = modal ? modal.querySelector('[data-form-type="register"]') : null;
  var forgotPasswordForm = modal ? modal.querySelector('[data-form-type="forgot-password"]') : null;

  // Get all elements that can trigger the modal.
  // This will include elements with the custom CSS class and shortcode links.
  var triggerElements = document.querySelectorAll(".".concat(thLoginFrontendData.settings.display_triggers.trigger_css_class, ", [data-th-popup-action]"));

  // Retrieve settings for easier access.
  var displayTriggers = thLoginFrontendData.settings.display_triggers;
  var generalSettings = thLoginFrontendData.settings.general;
  var isUserLoggedIn = thLoginFrontendData.isUserLoggedIn;
  var currentUserRoles = thLoginFrontendData.currentUserRoles || [];

  // --- Helper Functions for Modal Control ---

  /**
   * Opens the modal and sets the active form.
   * @param {string} formType 'login', 'register', or 'forgot-password'.
   */
  var openModal = function openModal() {
    var formType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'login';
    if (!modal) return;

    // Apply animations (CSS classes will handle actual animation).
    modal.classList.remove('th-login-popup-modal--closing');
    modal.classList.add('th-login-popup-modal--opening');
    modal.style.display = 'flex'; // Use flex to center content.
    modal.setAttribute('aria-hidden', 'false');

    // Set the active form.
    setActiveForm(formType);

    // Add a class after a short delay to trigger CSS transitions for content.
    setTimeout(function () {
      modal.classList.add('th-login-popup-modal--active');
    }, 50); // Small delay to allow 'display: flex' to apply before transition.

    // Record that the popup was shown for frequency control.
    recordPopupShown();
  };

  /**
   * Closes the modal.
   */
  var closeModal = function closeModal() {
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
  var setActiveForm = function setActiveForm(type) {
    var forms = [loginForm, registerForm, forgotPasswordForm];
    forms.forEach(function (form) {
      if (form) {
        // For forms within the main modal, hide/show.
        // For shortcode-embedded forms, they manage their own display.
        if (form.closest('#th-login-popup-modal')) {
          // Check if form is inside the modal
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
  var showMessage = function showMessage(formElement, message, type) {
    var messagesContainer = formElement.querySelector('.th-login-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = "<p class=\"th-login-message th-login-message--".concat(type, "\">").concat(message, "</p>");
      messagesContainer.style.display = 'block';
      // Clear message after a few seconds.
      setTimeout(function () {
        messagesContainer.innerHTML = '';
        messagesContainer.style.display = 'none';
      }, 5000);
    }
  };

  /**
   * Checks if the modal should be displayed based on global conditions.
   * @returns {boolean} True if conditions allow display, false otherwise.
   */
  var canShowModal = function canShowModal() {
    var _displayTriggers$pop_;
    if (isUserLoggedIn && displayTriggers.auto_open_conditions.for_logged_out_only) {
      return false; // Only for logged out users.
    }

    // Check for specific roles (if enabled).
    var specificRoles = displayTriggers.auto_open_conditions.for_specific_roles || [];
    if (specificRoles.length > 0) {
      var hasMatchingRole = currentUserRoles.some(function (role) {
        return specificRoles.includes(role);
      });
      if (!hasMatchingRole) {
        return false; // User does not have a required role.
      }
    }

    // Check device visibility.
    var deviceVisibility = displayTriggers.auto_open_conditions.device_visibility;
    var isMobile = window.innerWidth <= 768; // Common breakpoint for mobile
    var isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Common breakpoint for tablet
    var isDesktop = window.innerWidth > 1024; // Common breakpoint for desktop

    if (isMobile && !deviceVisibility.mobile || isTablet && !deviceVisibility.tablet || isDesktop && !deviceVisibility.desktop) {
      return false; // Not visible on this device.
    }

    // Check pop-up frequency.
    if ((_displayTriggers$pop_ = displayTriggers.pop_up_frequency) !== null && _displayTriggers$pop_ !== void 0 && _displayTriggers$pop_.enabled) {
      var lastShown = localStorage.getItem('th_login_last_shown');
      if (lastShown) {
        var lastShownTime = parseInt(lastShown, 10);
        var currentTime = Date.now();
        if (displayTriggers.pop_up_frequency.type === 'session') {
          // If already shown in this session, don't show again.
          if (sessionStorage.getItem('th_login_session_shown')) {
            return false;
          }
        } else if (displayTriggers.pop_up_frequency.type === 'days') {
          var daysToHide = displayTriggers.pop_up_frequency.days;
          var daysPassed = (currentTime - lastShownTime) / (1000 * 60 * 60 * 24);
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
  var recordPopupShown = function recordPopupShown() {
    var _displayTriggers$pop_2;
    if ((_displayTriggers$pop_2 = displayTriggers.pop_up_frequency) !== null && _displayTriggers$pop_2 !== void 0 && _displayTriggers$pop_2.enabled) {
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
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // 4. Trigger elements (buttons, links) to open modal.
  triggerElements.forEach(function (element) {
    element.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link/button behavior.
      var formType = element.dataset.thPopupAction || 'login'; // Default to login if not specified.
      if (canShowModal()) {
        // Check global conditions before opening via manual trigger.
        openModal(formType);
      }
    });
  });

  // 5. Form switching links within the modal.
  modal.querySelectorAll('[data-th-popup-action]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var actionType = e.target.dataset.thPopupAction;
      if (actionType === 'login' || actionType === 'register' || actionType === 'forgot-password') {
        setActiveForm(actionType);
      }
    });
  });

  // --- REST API Form Submission Handling ---

  // Target both modal forms and shortcode forms.
  document.querySelectorAll('.th-login-ajax-form').forEach(function (form) {
    form.addEventListener('submit', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
        var formType, formData, messagesContainer, requestData, _iterator, _step, _step$value, key, value, endpoint, submitButton, response, data, _submitButton, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              e.preventDefault(); // Prevent default form submission.
              formType = form.dataset.formType; // 'login', 'register', 'forgot-password'
              formData = new FormData(form);
              messagesContainer = form.querySelector('.th-login-messages');
              messagesContainer.innerHTML = ''; // Clear previous messages.
              messagesContainer.style.display = 'none';

              // Convert FormData to a plain object for JSON body.
              requestData = {};
              _iterator = _createForOfIteratorHelper(formData.entries());
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];
                  requestData[key] = value;
                }

                // Determine the REST API endpoint based on form type.
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              endpoint = "".concat(thLoginFrontendData.siteUrl, "/wp-json/th-login/v1/").concat(formType);
              _context.p = 1;
              // Simulate loading state.
              submitButton = form.querySelector('button[type="submit"]');
              if (submitButton) {
                submitButton.disabled = true;
                // Store original button text to restore later.
                submitButton.dataset.originalText = submitButton.innerHTML;
                submitButton.innerHTML = "<span class=\"th-login-spinner\"></span> ".concat(thLoginFrontendData.settings.design.buttons.primary.text_saving || 'Processing...');
              }
              _context.n = 2;
              return fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-WP-Nonce': thLoginFrontendData.nonce // Include the nonce for security.
                },
                body: JSON.stringify(requestData) // Send data as JSON.
              });
            case 2:
              response = _context.v;
              _context.n = 3;
              return response.json();
            case 3:
              data = _context.v;
              if (data.success) {
                showMessage(form, data.data.message || 'Success!', 'success');

                // Handle redirection based on settings.
                if (data.data.redirect_url) {
                  // Small delay to allow message to be seen.
                  setTimeout(function () {
                    window.location.href = data.data.redirect_url;
                  }, 1000);
                } else if (formType === 'register' && generalSettings.auto_login_after_registration) {
                  // If auto-login is enabled and no specific redirect, just reload the page to reflect login status.
                  setTimeout(function () {
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
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              showMessage(form, 'An unexpected error occurred. Please check your network.', 'error');
              console.error('TH Login: Frontend REST API Error:', _t);
            case 5:
              _context.p = 5;
              _submitButton = form.querySelector('button[type="submit"]');
              if (_submitButton) {
                _submitButton.disabled = false;
                _submitButton.innerHTML = _submitButton.dataset.originalText || 'Submit'; // Restore original text.
              }
              return _context.f(5);
            case 6:
              return _context.a(2);
          }
        }, _callee, null, [[1, 4, 5, 6]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });

  // --- Auto-Open Logic ---

  // Check if modal should auto-open based on conditions.
  var checkAndAutoOpenModal = function checkAndAutoOpenModal() {
    var _displayTriggers$auto, _displayTriggers$auto2, _displayTriggers$auto3, _displayTriggers$auto4, _displayTriggers$auto5;
    if (!canShowModal()) {
      return;
    }

    // Priority for URL parameter from WooCommerce or custom triggers.
    var urlParams = new URLSearchParams(window.location.search);
    var wcAction = urlParams.get('th_login_action'); // For WooCommerce redirects.
    var customParamName = displayTriggers.auto_open_conditions.url_parameter_trigger.param_name;
    var customParamValue = displayTriggers.auto_open_conditions.url_parameter_trigger.param_value;
    var customParamTriggered = urlParams.has(customParamName) && urlParams.get(customParamName) === customParamValue;
    if (wcAction && ['login', 'register', 'forgot-password'].includes(wcAction)) {
      openModal(wcAction);
      return;
    } else if (customParamTriggered) {
      openModal('login'); // Default to login for generic URL param trigger.
      return;
    }

    // Auto-Open on Page Load
    if ((_displayTriggers$auto = displayTriggers.auto_open_on_load) !== null && _displayTriggers$auto !== void 0 && _displayTriggers$auto.enabled) {
      var delay = displayTriggers.auto_open_on_load.delay_seconds * 1000;
      setTimeout(function () {
        openModal('login'); // Default to login on auto-open.
      }, delay);
      return; // Only one auto-open trigger should fire.
    }

    // Auto-Open on Scroll
    if ((_displayTriggers$auto2 = displayTriggers.auto_open_on_scroll) !== null && _displayTriggers$auto2 !== void 0 && _displayTriggers$auto2.enabled) {
      var hasScrolled = false;
      var _scrollHandler = function scrollHandler() {
        var scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        if (scrollPercentage >= displayTriggers.auto_open_on_scroll.scroll_percentage && !hasScrolled) {
          hasScrolled = true;
          openModal('login');
          window.removeEventListener('scroll', _scrollHandler);
        }
      };
      window.addEventListener('scroll', _scrollHandler);
    }

    // Auto-Open on Exit Intent
    if ((_displayTriggers$auto3 = displayTriggers.auto_open_on_exit_intent) !== null && _displayTriggers$auto3 !== void 0 && _displayTriggers$auto3.enabled) {
      var mouseLeaving = false;
      var _exitIntentHandler = function exitIntentHandler(e) {
        // Check if mouse is moving towards the top of the viewport
        if (e.clientY < 50 && e.relatedTarget === null && e.toElement === null) {
          if (!mouseLeaving) {
            mouseLeaving = true;
            openModal('login');
            document.removeEventListener('mouseout', _exitIntentHandler);
          }
        }
      };
      document.addEventListener('mouseout', _exitIntentHandler);
    }

    // Auto-Open on Time on Page
    if ((_displayTriggers$auto4 = displayTriggers.auto_open_on_time_on_page) !== null && _displayTriggers$auto4 !== void 0 && _displayTriggers$auto4.enabled) {
      var time = displayTriggers.auto_open_on_time_on_page.time_seconds * 1000;
      setTimeout(function () {
        openModal('login');
      }, time);
    }

    // Referrer Detection
    if ((_displayTriggers$auto5 = displayTriggers.auto_open_conditions.referrer_detection) !== null && _displayTriggers$auto5 !== void 0 && _displayTriggers$auto5.enabled) {
      var referrerUrls = displayTriggers.auto_open_conditions.referrer_detection.referrer_urls || [];
      var documentReferrer = document.referrer;
      if (documentReferrer && referrerUrls.length > 0) {
        var isMatchingReferrer = referrerUrls.some(function (url) {
          return documentReferrer.includes(url);
        });
        if (isMatchingReferrer) {
          openModal('login');
        }
      }
    }
  };

  // Initial check for auto-open conditions after DOM is ready.
  checkAndAutoOpenModal();

  // Ensure shortcode-embedded forms are visible by default.
  document.querySelectorAll('.th-login-shortcode-form-wrapper .th-login-form').forEach(function (form) {
    form.style.display = 'block';
    form.classList.add('th-login-form--active'); // Mark as active if embedded directly.
  });
});

/***/ }),

/***/ "./src/public/styles/frontend.scss":
/*!*****************************************!*\
  !*** ./src/public/styles/frontend.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/public/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frontend */ "./src/public/frontend.js");

})();

/******/ })()
;
//# sourceMappingURL=public.js.map