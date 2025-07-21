/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

document.addEventListener('DOMContentLoaded', function () {
  var _thLoginFrontendData$;
  // Load reCAPTCHA script if enabled
  if ((_thLoginFrontendData$ = thLoginFrontendData.settings.security) !== null && _thLoginFrontendData$ !== void 0 && (_thLoginFrontendData$ = _thLoginFrontendData$.recaptcha) !== null && _thLoginFrontendData$ !== void 0 && _thLoginFrontendData$.enabled) {
    var recaptchaType = thLoginFrontendData.settings.security.recaptcha.type;
    var siteKey = thLoginFrontendData.settings.security.recaptcha.site_key;
    var script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js?render=".concat(siteKey);
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // --- Elements ---
  var modal = document.getElementById('thlogin-popup-modal');
  if (!modal) return;
  var formContainer = modal.querySelector('.thlogin-popup-form-container');
  var loginForm = modal.querySelector('[data-form-type="login"]');
  var registerForm = modal.querySelector('[data-form-type="register"]');
  var forgotPasswordForm = modal.querySelector('[data-form-type="forgot-password"]');
  var triggerSelector = ".".concat(thLoginFrontendData.settings.display_triggers.trigger_css_class, ", [data-th-popup-action]");
  var displayTriggers = thLoginFrontendData.settings.display_triggers;
  var generalSettings = thLoginFrontendData.settings.general;
  var isUserLoggedIn = thLoginFrontendData.isUserLoggedIn;
  var currentUserRoles = thLoginFrontendData.currentUserRoles || [];
  var display_type = generalSettings.display_mode || 'popup';

  // --- Variables ---
  var animationEndHandler = null;

  // --- Functions ---

  var setActiveForm = function setActiveForm(type) {
    [loginForm, registerForm, forgotPasswordForm].forEach(function (form) {
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
  var showMessage = function showMessage(formElement, message, type) {
    var container = formElement.querySelector('.thlogin-messages');
    if (!container) return;
    container.innerHTML = "<p class=\"thlogin-message thlogin-message--".concat(type, "\">").concat(message, "</p>");
    container.style.display = 'block';
    setTimeout(function () {
      container.innerHTML = '';
      container.style.display = 'none';
    }, 5000);
  };
  var canShowModal = function canShowModal() {
    var _displayTriggers$pop_;
    if (isUserLoggedIn && displayTriggers.auto_open_conditions.for_logged_out_only) return false;
    var specificRoles = displayTriggers.auto_open_conditions.for_specific_roles || [];
    if (specificRoles.length && !currentUserRoles.some(function (role) {
      return specificRoles.includes(role);
    })) return false;
    var deviceVisibility = displayTriggers.auto_open_conditions.device_visibility;
    var w = window.innerWidth;
    var isMobile = w <= 768;
    var isTablet = w > 768 && w <= 1024;
    var isDesktop = w > 1024;
    if (isMobile && !deviceVisibility.mobile || isTablet && !deviceVisibility.tablet || isDesktop && !deviceVisibility.desktop) return false;
    if ((_displayTriggers$pop_ = displayTriggers.pop_up_frequency) !== null && _displayTriggers$pop_ !== void 0 && _displayTriggers$pop_.enabled) {
      var lastShown = localStorage.getItem('th_login_last_shown');
      var now = Date.now();
      if (displayTriggers.pop_up_frequency.type === 'session' && sessionStorage.getItem('th_login_session_shown')) {
        return false;
      }
      if (displayTriggers.pop_up_frequency.type === 'days' && lastShown) {
        var daysPassed = (now - parseInt(lastShown, 10)) / (1000 * 60 * 60 * 24);
        if (daysPassed < displayTriggers.pop_up_frequency.days) return false;
      }
    }
    return true;
  };
  var recordPopupShown = function recordPopupShown() {
    var _displayTriggers$pop_2;
    if ((_displayTriggers$pop_2 = displayTriggers.pop_up_frequency) !== null && _displayTriggers$pop_2 !== void 0 && _displayTriggers$pop_2.enabled) {
      localStorage.setItem('th_login_last_shown', Date.now().toString());
      sessionStorage.setItem('th_login_session_shown', 'true');
    }
  };
  var openModal = function openModal() {
    var formType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'login';
    if (!modal) return;
    modal.classList.remove('thlogin-popup-modal-effect', 'thlogin-slide-in-left', 'thlogin-slide-in-right', 'thlogin-page', 'thlogin-popup-modal--closing', 'thlogin-popup-modal--active');
    modal.classList.add('thlogin-popup-modal--opening');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    if (display_type === 'slide_in_left') {
      modal.classList.add('thlogin-slide-in-left');
    } else if (display_type === 'slide_in_right') {
      modal.classList.add('thlogin-slide-in-right');
    } else if (display_type === 'page') {
      modal.classList.add('thlogin-page');
    } else {
      modal.classList.add('thlogin-popup-modal-effect');
    }
    setActiveForm(formType);
    setTimeout(function () {
      modal.classList.add('thlogin-popup-modal--active');
    }, 50);
    recordPopupShown();
    if (animationEndHandler) {
      modal.removeEventListener('animationend', animationEndHandler);
      animationEndHandler = null;
    }
  };
  var closeModal = function closeModal() {
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

  document.body.addEventListener('click', function (e) {
    // Close modal: overlay or close button
    if (e.target.closest('.thlogin-popup-close-button') || e.target.closest('.thlogin-popup-overlay')) {
      closeModal();
    }
    // Open modal via trigger elements
    else if (e.target.closest(triggerSelector)) {
      e.preventDefault();
      var trigger = e.target.closest(triggerSelector);
      var formType = trigger.dataset.thPopupAction || 'login';
      if (canShowModal()) openModal(formType);
    }
    // Switch forms inside modal via links/buttons with data attribute
    else if (modal && modal.contains(e.target)) {
      var actionType = e.target.dataset.thPopupAction;
      if (['login', 'register', 'forgot-password'].includes(actionType)) {
        e.preventDefault();
        setActiveForm(actionType);
      }
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // --- Form Submission Handling ---
  document.querySelectorAll('.thlogin-ajax-form').forEach(function (form) {
    form.addEventListener('submit', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
        var _thLoginFrontendData$2;
        var token, tokenField, formType, formData, messagesContainer, requestData, _iterator, _step, _step$value, key, value, endpoint, submitButton, _thLoginFrontendData$3, response, data, _thLoginFrontendData$4, _submitButton, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              e.preventDefault();

              // Handle reCAPTCHA v3 if enabled
              if (!((_thLoginFrontendData$2 = thLoginFrontendData.settings.security) !== null && _thLoginFrontendData$2 !== void 0 && (_thLoginFrontendData$2 = _thLoginFrontendData$2.recaptcha) !== null && _thLoginFrontendData$2 !== void 0 && _thLoginFrontendData$2.enabled && thLoginFrontendData.settings.security.recaptcha.type === 'v3')) {
                _context.n = 5;
                break;
              }
              _context.p = 1;
              if (!(typeof grecaptcha === 'undefined')) {
                _context.n = 2;
                break;
              }
              showMessage(form, 'Security verification is loading. Please wait...', 'error');
              return _context.a(2);
            case 2:
              _context.n = 3;
              return grecaptcha.execute(thLoginFrontendData.settings.security.recaptcha.site_key, {
                action: 'login'
              });
            case 3:
              token = _context.v;
              // Add token to form data
              tokenField = form.querySelector('input[name="g-recaptcha-response"]');
              if (!tokenField) {
                tokenField = document.createElement('input');
                tokenField.type = 'hidden';
                tokenField.name = 'g-recaptcha-response';
                form.appendChild(tokenField);
              }
              tokenField.value = token;
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              showMessage(form, 'Security verification failed. Please try again.', 'error');
              console.error('reCAPTCHA v3 error:', _t);
              return _context.a(2);
            case 5:
              formType = form.dataset.formType;
              formData = new FormData(form);
              messagesContainer = form.querySelector('.thlogin-messages');
              if (messagesContainer) {
                messagesContainer.innerHTML = '';
                messagesContainer.style.display = 'none';
              }
              requestData = {};
              _iterator = _createForOfIteratorHelper(formData.entries());
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];
                  requestData[key] = value;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              endpoint = "".concat(thLoginFrontendData.siteUrl, "/wp-json/thlogin/v1/").concat(formType);
              _context.p = 6;
              submitButton = form.querySelector('button[type="submit"]');
              if (submitButton) {
                submitButton.disabled = true;
                submitButton.dataset.originalText = submitButton.innerHTML;
                submitButton.innerHTML = "<span class=\"thlogin-spinner\"></span> ".concat(((_thLoginFrontendData$3 = thLoginFrontendData.settings.design) === null || _thLoginFrontendData$3 === void 0 || (_thLoginFrontendData$3 = _thLoginFrontendData$3.buttons) === null || _thLoginFrontendData$3 === void 0 || (_thLoginFrontendData$3 = _thLoginFrontendData$3.primary) === null || _thLoginFrontendData$3 === void 0 ? void 0 : _thLoginFrontendData$3.text_saving) || 'Processing...');
              }
              _context.n = 7;
              return fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-WP-Nonce': thLoginFrontendData.nonce
                },
                body: JSON.stringify(requestData)
              });
            case 7:
              response = _context.v;
              _context.n = 8;
              return response.json();
            case 8:
              data = _context.v;
              if (data.success) {
                showMessage(form, data.data.message || 'Success!', 'success');
                if (data.data.redirect_url) {
                  setTimeout(function () {
                    window.location.href = data.data.redirect_url;
                  }, 1000);
                } else if (formType === 'register' && generalSettings.auto_login_after_registration) {
                  setTimeout(function () {
                    return window.location.reload();
                  }, 1000);
                } else if (formType === 'forgot-password') {
                  // Keep modal open so user can see success
                } else {
                  if (form.closest('#thlogin-popup-modal')) {
                    setTimeout(closeModal, 1000);
                  }
                }
              } else {
                showMessage(form, data.data.message || 'An error occurred. Please try again.', 'error');
                if (typeof grecaptcha !== 'undefined' && (_thLoginFrontendData$4 = thLoginFrontendData.settings.security) !== null && _thLoginFrontendData$4 !== void 0 && (_thLoginFrontendData$4 = _thLoginFrontendData$4.recaptcha) !== null && _thLoginFrontendData$4 !== void 0 && _thLoginFrontendData$4.enabled && thLoginFrontendData.settings.security.recaptcha.type === 'v2_checkbox') {
                  grecaptcha.reset();
                }
              }
              _context.n = 10;
              break;
            case 9:
              _context.p = 9;
              _t2 = _context.v;
              showMessage(form, 'An unexpected error occurred. Please check your network.', 'error');
              console.error('TH Login: Frontend REST API Error:', _t2);
            case 10:
              _context.p = 10;
              _submitButton = form.querySelector('button[type="submit"]');
              if (_submitButton) {
                _submitButton.disabled = false;
                _submitButton.innerHTML = _submitButton.dataset.originalText || 'Submit';
              }
              return _context.f(10);
            case 11:
              return _context.a(2);
          }
        }, _callee, null, [[6, 9, 10, 11], [1, 4]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });

  // --- Auto-Open Logic ---
  var checkAndAutoOpenModal = function checkAndAutoOpenModal() {
    var _displayTriggers$auto, _displayTriggers$auto2, _displayTriggers$auto3, _displayTriggers$auto4, _displayTriggers$auto5;
    if (!canShowModal()) return;
    var urlParams = new URLSearchParams(window.location.search);
    var wcAction = urlParams.get('th_login_action');
    var customParamName = displayTriggers.auto_open_conditions.url_parameter_trigger.param_name;
    var customParamValue = displayTriggers.auto_open_conditions.url_parameter_trigger.param_value;
    var customParamTriggered = urlParams.has(customParamName) && urlParams.get(customParamName) === customParamValue;
    if (wcAction && ['login', 'register', 'forgot-password'].includes(wcAction)) {
      openModal(wcAction);
      return;
    } else if (customParamTriggered) {
      openModal('login');
      return;
    }
    if ((_displayTriggers$auto = displayTriggers.auto_open_on_load) !== null && _displayTriggers$auto !== void 0 && _displayTriggers$auto.enabled) {
      setTimeout(function () {
        return openModal('login');
      }, (displayTriggers.auto_open_on_load.delay_seconds || 0) * 1000);
      return;
    }
    if ((_displayTriggers$auto2 = displayTriggers.auto_open_on_scroll) !== null && _displayTriggers$auto2 !== void 0 && _displayTriggers$auto2.enabled) {
      var triggered = false;
      var _onScroll = function onScroll() {
        var scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        if (!triggered && scrollPercent >= (displayTriggers.auto_open_on_scroll.scroll_percentage || 50)) {
          triggered = true;
          openModal('login');
          window.removeEventListener('scroll', _onScroll);
        }
      };
      window.addEventListener('scroll', _onScroll);
    }
    if ((_displayTriggers$auto3 = displayTriggers.auto_open_on_exit_intent) !== null && _displayTriggers$auto3 !== void 0 && _displayTriggers$auto3.enabled) {
      var _triggered = false;
      var _onExitIntent = function onExitIntent(e) {
        if (e.clientY < 50 && !_triggered && !e.relatedTarget && !e.toElement) {
          _triggered = true;
          openModal('login');
          document.removeEventListener('mouseout', _onExitIntent);
        }
      };
      document.addEventListener('mouseout', _onExitIntent);
    }
    if ((_displayTriggers$auto4 = displayTriggers.auto_open_on_time_on_page) !== null && _displayTriggers$auto4 !== void 0 && _displayTriggers$auto4.enabled) {
      setTimeout(function () {
        return openModal('login');
      }, (displayTriggers.auto_open_on_time_on_page.time_seconds || 0) * 1000);
    }
    if ((_displayTriggers$auto5 = displayTriggers.auto_open_conditions.referrer_detection) !== null && _displayTriggers$auto5 !== void 0 && _displayTriggers$auto5.enabled) {
      var referrers = displayTriggers.auto_open_conditions.referrer_detection.referrer_urls || [];
      if (document.referrer && referrers.some(function (r) {
        return document.referrer.includes(r);
      })) {
        openModal('login');
      }
    }
  };
  checkAndAutoOpenModal();

  // Show shortcode embedded forms by default (visible)
  document.querySelectorAll('.thlogin-shortcode-form-wrapper .thlogin-form').forEach(function (f) {
    f.style.display = 'block';
    f.classList.add('thlogin-form--active');
  });

  // Force auto-open if shortcode was used on this page
  var isShortcodeBasedModal = document.querySelector('.thlogin-shortcode-form-wrapper');
  if (isShortcodeBasedModal && canShowModal()) {
    openModal('login'); // You can dynamically read form type if needed
  }
});
})();

/******/ })()
;
//# sourceMappingURL=public.js.map