/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/App.js":
/*!**************************!*\
  !*** ./src/admin/App.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.scss */ "./src/admin/index.scss");
/* harmony import */ var _components_general_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/general-settings */ "./src/admin/components/general-settings.js");
/* harmony import */ var _components_design_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/design-settings */ "./src/admin/components/design-settings.js");
/* harmony import */ var _components_form_feild_setiings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/form-feild-setiings */ "./src/admin/components/form-feild-setiings.js");
/* harmony import */ var _components_display_trigger_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/display-trigger-settings */ "./src/admin/components/display-trigger-settings.js");
/* harmony import */ var _components_security_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/security-settings */ "./src/admin/components/security-settings.js");
/* harmony import */ var _components_integration_settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/integration-settings */ "./src/admin/components/integration-settings.js");
/* harmony import */ var _components_tools_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/tools-settings */ "./src/admin/components/tools-settings.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
 // Added useRef











var TABS = [{
  id: "general",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("General", "th-login"),
  icon: "admin-settings"
}, {
  id: "design",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Design", "th-login"),
  icon: "art"
}, {
  id: "form-fields",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form Fields", "th-login"),
  icon: "feedback"
}, {
  id: "display-triggers",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display Triggers", "th-login"),
  icon: "visibility"
}, {
  id: "integration",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Integration", "th-login"),
  icon: "admin-plugins"
}, {
  id: "security",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Security", "th-login"),
  icon: "shield"
}, {
  id: "tools",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tools", "th-login"),
  icon: "admin-tools"
}];

// Main React App Component
var App = function App() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      general: {
        plugin_status: "enabled",
        disable_wp_login_page: false,
        auto_redirect_wp_login_admin: true,
        auto_login_after_registration: false,
        redirects: {
          after_login: {
            type: "current_page",
            url: ""
          },
          after_logout: {
            type: "home_page",
            url: ""
          },
          after_register: {
            type: "login_form",
            url: ""
          },
          role_based_redirects: [] // Ensure this is an array
        },
        email_verification: {
          enabled: false,
          email_subject: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Verify your email for TH Login", "th-login"),
          email_content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Please click this link to verify: {verification_link}", "th-login"),
          redirect_after_verification: "login_form",
          custom_redirect_url: ""
        },
        manual_user_approval: {
          enabled: false
        }
      },
      design: {
        modal: {
          layout_type: 'popup',
          modal_background: {
            type: "image",
            // 'color' | 'gradient' | 'image'
            color: "#ffffff",
            gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
            opacity: 1,
            image: {
              url: "",
              // Image URL
              position: "center center",
              // e.g. 'top left', 'center center'
              size: "cover",
              // 'cover' | 'contain' | 'auto'
              repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
            }
          },
          form_background: {
            type: "image",
            // 'color' | 'gradient' | 'image'
            color: "#ffffff",
            gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
            opacity: 1,
            image: {
              url: "",
              // Image URL
              position: "center center",
              // e.g. 'top left', 'center center'
              size: "cover",
              // 'cover' | 'contain' | 'auto'
              repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
            }
          },
          form_border: {
            width: {
              top: 1,
              right: 1,
              bottom: 1,
              left: 1
            },
            style: "solid",
            color: "#000000",
            radius: {
              topLeft: 6,
              topRight: 6,
              bottomRight: 6,
              bottomLeft: 6
            }
          }
        }
      },
      form_fields: {
        login: {},
        register: {
          custom_fields: []
        },
        forgot_password: {}
      },
      display_triggers: {
        trigger_css_class: "th-login-trigger",
        auto_open_on_load: {
          enabled: true,
          delay_seconds: 2
        },
        auto_open_on_scroll: {
          enabled: false,
          scroll_percentage: 50
        },
        auto_open_on_exit_intent: {
          enabled: false
        },
        auto_open_on_time_on_page: {
          enabled: false,
          time_seconds: 10
        },
        auto_open_conditions: {
          for_logged_out_only: true,
          for_specific_roles: [],
          on_specific_pages: {
            enabled: false,
            page_ids: [],
            page_slugs: []
          },
          on_specific_categories: {
            enabled: false,
            category_ids: [],
            category_slugs: []
          },
          on_specific_tags: {
            enabled: false,
            tag_ids: [],
            tag_slugs: []
          },
          on_woocommerce_myaccount: false,
          on_woocommerce_checkout: false,
          device_visibility: {
            desktop: true,
            tablet: true,
            mobile: true
          },
          url_parameter_trigger: {
            enabled: false,
            param_name: "th_login",
            param_value: "open"
          },
          referrer_detection: {
            enabled: false,
            referrer_urls: []
          }
        },
        pop_up_frequency: {
          enabled: false,
          type: "session",
          days: 7
        },
        menu_integration: {
          enabled: false,
          menu_slug: "primary",
          item_text_login: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login"),
          item_text_register: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login"),
          item_icon_login: "dashicons-admin-users",
          item_icon_register: "dashicons-plus-alt",
          visibility_login_logged_in: false,
          visibility_register_logged_in: false
        }
      },
      security: {
        brute_force_protection: {
          enabled: true,
          max_attempts: 5,
          lockout_duration_minutes: 30,
          auto_ip_blacklist_enabled: true
        },
        recaptcha: {
          enabled: false,
          type: "v2_checkbox",
          site_key: "",
          secret_key: ""
        },
        honeypot_enabled: true
      }
    }),
    _useState2 = _slicedToArray(_useState, 2),
    settings = _useState2[0],
    setSettings = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSaving = _useState6[0],
    setIsSaving = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    message = _useState8[0],
    setMessage = _useState8[1]; // { type: 'success' | 'error', text: '...' }
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState0 = _slicedToArray(_useState9, 2),
    exportedSettings = _useState0[0],
    setExportedSettings = _useState0[1];
  var _useState1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState10 = _slicedToArray(_useState1, 2),
    importSettingsText = _useState10[0],
    setImportSettingsText = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isResetConfirmOpen = _useState12[0],
    setIsResetConfirmOpen = _useState12[1]; // State for reset confirmation dialog
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("general"),
    _useState14 = _slicedToArray(_useState13, 2),
    activeTab = _useState14[0],
    setActiveTab = _useState14[1];
  var importTextareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // Ref for import textarea

  // Fetch settings on component mount.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var fetchSettings = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, _mergedSettings$form_, _mergedSettings$gener, mergedSettings, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
                path: "th-login/v1/settings",
                method: "POST",
                data: {
                  action: "fetch_settings"
                }
              });
            case 1:
              response = _context.v;
              if (response.success) {
                // Deep merge fetched settings with default structure to ensure all keys exist.
                mergedSettings = _deepMerge(settings, response.settings); // Ensure specific arrays are initialized if missing or not array.
                if (!Array.isArray((_mergedSettings$form_ = mergedSettings.form_fields) === null || _mergedSettings$form_ === void 0 || (_mergedSettings$form_ = _mergedSettings$form_.register) === null || _mergedSettings$form_ === void 0 ? void 0 : _mergedSettings$form_.custom_fields)) {
                  mergedSettings.form_fields.register.custom_fields = [];
                }
                if (!Array.isArray((_mergedSettings$gener = mergedSettings.general) === null || _mergedSettings$gener === void 0 || (_mergedSettings$gener = _mergedSettings$gener.redirects) === null || _mergedSettings$gener === void 0 ? void 0 : _mergedSettings$gener.role_based_redirects)) {
                  mergedSettings.general.redirects.role_based_redirects = [];
                }
                setSettings(mergedSettings);
              } else {
                setMessage({
                  type: "error",
                  text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to load settings.", "th-login")
                });
              }
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error("Error fetching settings:", _t);
              setMessage({
                type: "error",
                text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error loading settings. Please check console.", "th-login")
              });
            case 3:
              _context.p = 3;
              setIsLoading(false);
              return _context.f(3);
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2, 3, 4]]);
      }));
      return function fetchSettings() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchSettings();
  }, []); // Empty dependency array means this runs once on mount.

  /**
   * Helper function for deep merging objects.
   * Used to merge fetched settings with default state, ensuring all keys are present.
   */
  var _deepMerge = function deepMerge(target, source) {
    var output = _objectSpread({}, target);
    if (target && _typeof(target) === "object" && source && _typeof(source) === "object") {
      Object.keys(source).forEach(function (key) {
        // Handle arrays: if source[key] is an array, replace directly.
        // Otherwise, if it's an object, deep merge.
        // Otherwise, assign directly.
        if (Array.isArray(source[key])) {
          output[key] = source[key];
        } else if (source[key] && _typeof(source[key]) === "object") {
          if (!(key in output)) {
            Object.assign(output, _defineProperty({}, key, source[key]));
          } else {
            output[key] = _deepMerge(output[key], source[key]);
          }
        } else {
          Object.assign(output, _defineProperty({}, key, source[key]));
        }
      });
    }
    return output;
  };

  /**
   * Generic handler for updating a specific setting within a category.
   * Handles nested properties by reconstructing the object path.
   * @param {string} category The top-level settings category (e.g., 'general', 'design').
   * @param {string[]} path An array of keys representing the path to the setting (e.g., ['modal', 'overlay_color']).
   * @param {*} value The new value for the setting.
   */
  var handleSettingChange = function handleSettingChange(category, path, value) {
    setSettings(function (prevSettings) {
      var newCategorySettings = _objectSpread({}, prevSettings[category]);
      var current = newCategorySettings;
      for (var i = 0; i < path.length - 1; i++) {
        var key = path[i];
        if (!current[key] || _typeof(current[key]) !== "object" || Array.isArray(current[key])) {
          current[key] = {}; // Initialize if not an object or if it's an array (should be object for path)
        }
        current = current[key];
      }
      current[path[path.length - 1]] = value;
      return _objectSpread(_objectSpread({}, prevSettings), {}, _defineProperty({}, category, newCategorySettings));
    });
  };

  // Handle saving settings.
  var handleSaveSettings = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, _mergedSettings$form_2, _mergedSettings$gener2, fetchedSettings, mergedSettings, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            setIsSaving(true);
            setMessage(null);
            _context2.p = 1;
            _context2.n = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/settings",
              method: "POST",
              data: settings
            });
          case 2:
            response = _context2.v;
            if (response.success) {
              setMessage({
                type: "success",
                text: response.message
              });
              fetchedSettings = response.settings; // Deep merge again to ensure the state is fully consistent with backend and defaults.
              mergedSettings = _deepMerge(settings, fetchedSettings); // Ensure specific arrays are initialized.
              if (!Array.isArray((_mergedSettings$form_2 = mergedSettings.form_fields) === null || _mergedSettings$form_2 === void 0 || (_mergedSettings$form_2 = _mergedSettings$form_2.register) === null || _mergedSettings$form_2 === void 0 ? void 0 : _mergedSettings$form_2.custom_fields)) {
                mergedSettings.form_fields.register.custom_fields = [];
              }
              if (!Array.isArray((_mergedSettings$gener2 = mergedSettings.general) === null || _mergedSettings$gener2 === void 0 || (_mergedSettings$gener2 = _mergedSettings$gener2.redirects) === null || _mergedSettings$gener2 === void 0 ? void 0 : _mergedSettings$gener2.role_based_redirects)) {
                mergedSettings.general.redirects.role_based_redirects = [];
              }
              setSettings(mergedSettings);
            } else {
              setMessage({
                type: "error",
                text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to save settings.", "th-login")
              });
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            setMessage({
              type: "error",
              text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error saving settings. Please check console.", "th-login")
            });
            console.error("Error saving settings:", _t2);
          case 4:
            _context2.p = 4;
            setIsSaving(false);
            setTimeout(function () {
              return setMessage(null);
            }, 5000);
            return _context2.f(4);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveSettings() {
      return _ref2.apply(this, arguments);
    };
  }();

  // --- Custom Fields Management Functions ---

  var addCustomField = function addCustomField() {
    setSettings(function (prevSettings) {
      return _objectSpread(_objectSpread({}, prevSettings), {}, {
        form_fields: _objectSpread(_objectSpread({}, prevSettings.form_fields), {}, {
          register: _objectSpread(_objectSpread({}, prevSettings.form_fields.register), {}, {
            custom_fields: [].concat(_toConsumableArray(prevSettings.form_fields.register.custom_fields), [{
              id: "custom_field_".concat(Date.now()),
              // Unique ID
              type: "text",
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("New Field", "th-login"),
              placeholder: "",
              required: false,
              map_to_user_meta: false,
              options: [] // For select/radio types
            }])
          })
        })
      });
    });
  };
  var updateCustomField = function updateCustomField(index, key, value) {
    setSettings(function (prevSettings) {
      var newCustomFields = _toConsumableArray(prevSettings.form_fields.register.custom_fields);
      newCustomFields[index] = _objectSpread(_objectSpread({}, newCustomFields[index]), {}, _defineProperty({}, key, value));
      return _objectSpread(_objectSpread({}, prevSettings), {}, {
        form_fields: _objectSpread(_objectSpread({}, prevSettings.form_fields), {}, {
          register: _objectSpread(_objectSpread({}, prevSettings.form_fields.register), {}, {
            custom_fields: newCustomFields
          })
        })
      });
    });
  };
  var removeCustomField = function removeCustomField(index) {
    setSettings(function (prevSettings) {
      var newCustomFields = prevSettings.form_fields.register.custom_fields.filter(function (_, i) {
        return i !== index;
      });
      return _objectSpread(_objectSpread({}, prevSettings), {}, {
        form_fields: _objectSpread(_objectSpread({}, prevSettings.form_fields), {}, {
          register: _objectSpread(_objectSpread({}, prevSettings.form_fields.register), {}, {
            custom_fields: newCustomFields
          })
        })
      });
    });
  };

  // --- Role-Based Redirects Functions ---
  var addRoleBasedRedirect = function addRoleBasedRedirect() {
    setSettings(function (prevSettings) {
      return _objectSpread(_objectSpread({}, prevSettings), {}, {
        general: _objectSpread(_objectSpread({}, prevSettings.general), {}, {
          redirects: _objectSpread(_objectSpread({}, prevSettings.general.redirects), {}, {
            role_based_redirects: [].concat(_toConsumableArray(prevSettings.general.redirects.role_based_redirects), [{
              role: "",
              url: ""
            }])
          })
        })
      });
    });
  };
  var updateRoleBasedRedirect = function updateRoleBasedRedirect(index, key, value) {
    setSettings(function (prevSettings) {
      var newRoleBasedRedirects = _toConsumableArray(prevSettings.general.redirects.role_based_redirects);
      newRoleBasedRedirects[index] = _objectSpread(_objectSpread({}, newRoleBasedRedirects[index]), {}, _defineProperty({}, key, value));
      return _objectSpread(_objectSpread({}, prevSettings), {}, {
        general: _objectSpread(_objectSpread({}, prevSettings.general), {}, {
          redirects: _objectSpread(_objectSpread({}, prevSettings.general.redirects), {}, {
            role_based_redirects: newRoleBasedRedirects
          })
        })
      });
    });
  };
  var removeRoleBasedRedirect = function removeRoleBasedRedirect(index) {
    setSettings(function (prevSettings) {
      var newRoleBasedRedirects = prevSettings.general.redirects.role_based_redirects.filter(function (_, i) {
        return i !== index;
      });
      return _objectSpread(_objectSpread({}, prevSettings), {}, {
        general: _objectSpread(_objectSpread({}, prevSettings.general), {}, {
          redirects: _objectSpread(_objectSpread({}, prevSettings.general.redirects), {}, {
            role_based_redirects: newRoleBasedRedirects
          })
        })
      });
    });
  };

  // --- Tools Functions ---

  var handleExportSettings = function handleExportSettings() {
    // Create a copy of settings, remove sensitive info if any (e.g., reCAPTCHA secret key).
    // For now, we'll export everything.
    var settingsToExport = JSON.stringify(settings, null, 2); // Pretty print JSON
    setExportedSettings(settingsToExport);
    // Optionally, copy to clipboard automatically.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(settingsToExport).then(function () {
        return setMessage({
          type: "success",
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Settings copied to clipboard!", "th-login")
        });
      })["catch"](function () {
        return setMessage({
          type: "error",
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to copy settings to clipboard. Please copy manually.", "th-login")
        });
      });
    } else {
      setMessage({
        type: "info",
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Please manually copy the settings from the text area below.", "th-login")
      });
      if (importTextareaRef.current) {
        importTextareaRef.current.select();
      }
    }
  };
  var handleImportSettings = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var importedData, response, _mergedSettings$form_3, _mergedSettings$gener3, fetchedSettings, mergedSettings, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            setIsSaving(true);
            setMessage(null);
            _context3.p = 1;
            importedData = JSON.parse(importSettingsText); // Basic validation to ensure it's a valid settings structure.
            if (!(_typeof(importedData) !== "object" || !importedData.general || !importedData.design)) {
              _context3.n = 2;
              break;
            }
            throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Invalid settings format. Please provide a valid JSON object.", "th-login"));
          case 2:
            _context3.n = 3;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/settings",
              method: "POST",
              data: importedData // Send the imported data directly
            });
          case 3:
            response = _context3.v;
            if (response.success) {
              setMessage({
                type: "success",
                text: response.message
              });
              fetchedSettings = response.settings;
              mergedSettings = _deepMerge(settings, fetchedSettings);
              if (!Array.isArray((_mergedSettings$form_3 = mergedSettings.form_fields) === null || _mergedSettings$form_3 === void 0 || (_mergedSettings$form_3 = _mergedSettings$form_3.register) === null || _mergedSettings$form_3 === void 0 ? void 0 : _mergedSettings$form_3.custom_fields)) {
                mergedSettings.form_fields.register.custom_fields = [];
              }
              if (!Array.isArray((_mergedSettings$gener3 = mergedSettings.general) === null || _mergedSettings$gener3 === void 0 || (_mergedSettings$gener3 = _mergedSettings$gener3.redirects) === null || _mergedSettings$gener3 === void 0 ? void 0 : _mergedSettings$gener3.role_based_redirects)) {
                mergedSettings.general.redirects.role_based_redirects = [];
              }
              setSettings(mergedSettings);
              setImportSettingsText(""); // Clear textarea after successful import
            } else {
              setMessage({
                type: "error",
                text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to import settings.", "th-login")
              });
            }
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            setMessage({
              type: "error",
              text: _t3.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error parsing or importing settings. Please ensure valid JSON.", "th-login")
            });
            console.error("Error importing settings:", _t3);
          case 5:
            _context3.p = 5;
            setIsSaving(false);
            setTimeout(function () {
              return setMessage(null);
            }, 5000);
            return _context3.f(5);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 4, 5, 6]]);
    }));
    return function handleImportSettings() {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleResetSettings = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var response, fetchResponse, _mergedSettings$form_4, _mergedSettings$gener4, mergedSettings, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            setIsResetConfirmOpen(false); // Close confirmation dialog
            setIsSaving(true);
            setMessage(null);
            _context4.p = 1;
            _context4.n = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/reset-settings",
              // New endpoint for reset
              method: "POST"
            });
          case 2:
            response = _context4.v;
            if (!response.success) {
              _context4.n = 4;
              break;
            }
            setMessage({
              type: "success",
              text: response.message
            });
            // Re-fetch settings to load the newly reset defaults
            _context4.n = 3;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/settings",
              method: "POST",
              data: {
                action: "fetch_settings"
              }
            });
          case 3:
            fetchResponse = _context4.v;
            if (fetchResponse.success) {
              mergedSettings = _deepMerge(settings, fetchResponse.settings);
              if (!Array.isArray((_mergedSettings$form_4 = mergedSettings.form_fields) === null || _mergedSettings$form_4 === void 0 || (_mergedSettings$form_4 = _mergedSettings$form_4.register) === null || _mergedSettings$form_4 === void 0 ? void 0 : _mergedSettings$form_4.custom_fields)) {
                mergedSettings.form_fields.register.custom_fields = [];
              }
              if (!Array.isArray((_mergedSettings$gener4 = mergedSettings.general) === null || _mergedSettings$gener4 === void 0 || (_mergedSettings$gener4 = _mergedSettings$gener4.redirects) === null || _mergedSettings$gener4 === void 0 ? void 0 : _mergedSettings$gener4.role_based_redirects)) {
                mergedSettings.general.redirects.role_based_redirects = [];
              }
              setSettings(mergedSettings);
            }
            _context4.n = 5;
            break;
          case 4:
            setMessage({
              type: "error",
              text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to reset settings.", "th-login")
            });
          case 5:
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t4 = _context4.v;
            setMessage({
              type: "error",
              text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error resetting settings. Please check console.", "th-login")
            });
            console.error("Error resetting settings:", _t4);
          case 7:
            _context4.p = 7;
            setIsSaving(false);
            setTimeout(function () {
              return setMessage(null);
            }, 5000);
            return _context4.f(7);
          case 8:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 6, 7, 8]]);
    }));
    return function handleResetSettings() {
      return _ref4.apply(this, arguments);
    };
  }();
  if (isLoading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "th-login-admin-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader"
    }, /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    })), /*#__PURE__*/React.createElement("p", {
      className: "th-login-loading-text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Loading settings...", "th-login")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "th-login-admin-modern"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-content"
  }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("span", {
    className: "th-logo"
  }, "TH"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login Settings", "th-login")), message && /*#__PURE__*/React.createElement("div", {
    className: "notice-banner ".concat(message.type)
  }, /*#__PURE__*/React.createElement("p", null, message.text)))), /*#__PURE__*/React.createElement("div", {
    className: "admin-container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "admin-sidebar"
  }, /*#__PURE__*/React.createElement("ul", null, TABS.map(function (tab) {
    return /*#__PURE__*/React.createElement("li", {
      key: tab.id,
      className: activeTab === tab.id ? "active" : ""
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setActiveTab(tab.id);
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "dashicons dashicons-".concat(tab.icon)
    }), tab.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "admin-content"
  }, activeTab === "general" && /*#__PURE__*/React.createElement(_components_general_settings__WEBPACK_IMPORTED_MODULE_5__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange,
    addRoleBasedRedirect: addRoleBasedRedirect,
    updateRoleBasedRedirect: updateRoleBasedRedirect,
    removeRoleBasedRedirect: removeRoleBasedRedirect
  }), activeTab === "design" && /*#__PURE__*/React.createElement(_components_design_settings__WEBPACK_IMPORTED_MODULE_6__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "form-fields" && /*#__PURE__*/React.createElement(_components_form_feild_setiings__WEBPACK_IMPORTED_MODULE_7__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange,
    addCustomField: addCustomField,
    updateCustomField: updateCustomField,
    removeCustomField: removeCustomField
  }), activeTab === "display-triggers" && /*#__PURE__*/React.createElement(_components_display_trigger_settings__WEBPACK_IMPORTED_MODULE_8__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "security" && /*#__PURE__*/React.createElement(_components_security_settings__WEBPACK_IMPORTED_MODULE_9__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "integration" && /*#__PURE__*/React.createElement(_components_integration_settings__WEBPACK_IMPORTED_MODULE_10__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "tools" && /*#__PURE__*/React.createElement(_components_tools_settings__WEBPACK_IMPORTED_MODULE_11__["default"], {
    settings: settings,
    exportedSettings: exportedSettings,
    setExportedSettings: setExportedSettings,
    importSettingsText: importSettingsText,
    setImportSettingsText: setImportSettingsText,
    handleExportSettings: handleExportSettings,
    handleImportSettings: handleImportSettings,
    isSaving: isSaving,
    setIsResetConfirmOpen: setIsResetConfirmOpen
  }), /*#__PURE__*/React.createElement("div", {
    className: "save-settings"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: handleSaveSettings,
    disabled: isSaving,
    className: "save-button"
  }, isSaving ? /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null) : /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-yes"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Save Changes", "th-login"))))), isResetConfirmOpen && /*#__PURE__*/React.createElement("div", {
    className: "confirmation-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reset All Settings?", "th-login")), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This will restore all settings to default values. This cannot be undone.", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    onClick: function onClick() {
      return setIsResetConfirmOpen(false);
    },
    className: "cancel-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cancel", "th-login")), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: handleResetSettings,
    className: "confirm-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reset Settings", "th-login"))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/admin/components/accordion-section.js":
/*!***************************************************!*\
  !*** ./src/admin/components/accordion-section.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// File: AccordionSection.js



var AccordionSection = function AccordionSection(_ref) {
  var title = _ref.title,
    children = _ref.children,
    _ref$defaultOpen = _ref.defaultOpen,
    defaultOpen = _ref$defaultOpen === void 0 ? false : _ref$defaultOpen;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultOpen),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "th-accordion-section ".concat(open ? "open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "accordion-header",
    onClick: function onClick() {
      return setOpen(!open);
    }
  }, /*#__PURE__*/React.createElement("span", null, title), /*#__PURE__*/React.createElement("span", {
    className: "accordion-icon rotated"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
    icon: "chevron-down"
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "accordion-body"
  }, children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionSection);

/***/ }),

/***/ "./src/admin/components/custom-select-control.js":
/*!*******************************************************!*\
  !*** ./src/admin/components/custom-select-control.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomSelectControl: () => (/* binding */ CustomSelectControl)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var CustomSelectControl = function CustomSelectControl(_ref) {
  var _options$find;
  var label = _ref.label,
    value = _ref.value,
    options = _ref.options,
    onChange = _ref.onChange,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$help = _ref.help,
    help = _ref$help === void 0 ? '' : _ref$help,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(-1),
    _useState4 = _slicedToArray(_useState3, 2),
    highlightedIndex = _useState4[0],
    setHighlightedIndex = _useState4[1];
  var selectRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  var dropdownRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);

  // Close dropdown when clicking outside
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (!isOpen) return;
    var handleKeyDown = function handleKeyDown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(function (prev) {
          return Math.min(prev + 1, options.length - (placeholder ? 0 : 1));
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(function (prev) {
          return Math.max(prev - 1, 0);
        });
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        var selectedOption = options[highlightedIndex - (placeholder ? 1 : 0)];
        if (selectedOption) {
          onChange(selectedOption.value);
          setIsOpen(false);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      return document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, options, placeholder]);
  var selectedLabel = ((_options$find = options.find(function (opt) {
    return opt.value === value;
  })) === null || _options$find === void 0 ? void 0 : _options$find.label) || placeholder;
  return /*#__PURE__*/React.createElement("div", {
    className: "modern-select-control ".concat(className, " ").concat(isOpen ? 'is-open' : ''),
    ref: selectRef
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "modern-select-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "modern-select-trigger",
    onClick: function onClick() {
      return setIsOpen(!isOpen);
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === ' ' && setIsOpen(!isOpen);
    },
    tabIndex: "0",
    role: "button",
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen
  }, /*#__PURE__*/React.createElement("span", {
    className: "modern-select-value"
  }, selectedLabel), /*#__PURE__*/React.createElement("span", {
    className: "modern-select-arrow"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: isOpen ? "arrow-up-alt2" : "arrow-down-alt2"
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "modern-select-dropdown",
    ref: dropdownRef,
    role: "listbox"
  }, placeholder && /*#__PURE__*/React.createElement("div", {
    className: "modern-select-option ".concat(!value ? 'is-selected' : ''),
    onClick: function onClick() {
      onChange('');
      setIsOpen(false);
    },
    onMouseEnter: function onMouseEnter() {
      return setHighlightedIndex(0);
    }
  }, placeholder), options.map(function (option, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: option.value,
      className: "modern-select-option ".concat(value === option.value ? 'is-selected' : '', " ").concat(highlightedIndex === index + (placeholder ? 1 : 0) ? 'is-highlighted' : ''),
      onClick: function onClick() {
        onChange(option.value);
        setIsOpen(false);
      },
      onMouseEnter: function onMouseEnter() {
        return setHighlightedIndex(index + (placeholder ? 1 : 0));
      },
      role: "option",
      "aria-selected": value === option.value
    }, option.label);
  })), help && /*#__PURE__*/React.createElement("p", {
    className: "modern-select-help"
  }, help));
};

/***/ }),

/***/ "./src/admin/components/design-settings.js":
/*!*************************************************!*\
  !*** ./src/admin/components/design-settings.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _accordion_section__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accordion-section */ "./src/admin/components/accordion-section.js");
/* harmony import */ var _custom_select_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom-select-control */ "./src/admin/components/custom-select-control.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








var DesignEditor = function DesignEditor(_ref) {
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("login"),
    _useState2 = _slicedToArray(_useState, 2),
    activeForm = _useState2[0],
    setActiveForm = _useState2[1];
  var background = settings.design.modal.modal_background || {};
  var bgType = background.type || "color";
  var bgColor = background.color || "#ffffff";
  var bgGradient = background.gradient || "";
  var bgImage = background.image || {};
  var imageURL = bgImage.url || "";
  var position = bgImage.position || "center center";
  var size = bgImage.size || "cover";
  var repeat = bgImage.repeat || "no-repeat";
  var formBackground = settings.design.modal.form_background || {};
  var formBgType = formBackground.type || "color";
  var formBgColor = formBackground.color || "#ffffff";
  var formBgGradient = formBackground.gradient || "";
  var formBgImage = formBackground.image || {};
  var formImageURL = formBgImage.url || "";
  var formPosition = formBgImage.position || "center center";
  var formSize = formBgImage.size || "cover";
  var formRepeat = formBgImage.repeat || "no-repeat";
  var getFormBackgroundStyle = function getFormBackgroundStyle() {
    var _base$image;
    var base = settings.design.modal.form_background || {};
    var type = base.type || "color";
    if (type === "gradient") {
      return {
        backgroundImage: base.gradient,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        opacity: base.opacity
      };
    } else if (type === "image" && (_base$image = base.image) !== null && _base$image !== void 0 && _base$image.url) {
      return {
        backgroundImage: "url(".concat(base.image.url, ")"),
        backgroundSize: base.image.size || "cover",
        backgroundRepeat: base.image.repeat || "no-repeat",
        backgroundPosition: base.image.position || "center center",
        opacity: base.opacity
      };
    } else {
      return {
        backgroundColor: base.color || "#ffffff",
        opacity: base.opacity
      };
    }
  };
  var getModalBackgroundStyle = function getModalBackgroundStyle() {
    var _base$image2;
    var base = settings.design.modal.modal_background || {};
    var type = base.type || "color";
    if (type === "gradient") {
      return {
        backgroundImage: base.gradient,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        opacity: base.opacity
      };
    } else if (type === "image" && (_base$image2 = base.image) !== null && _base$image2 !== void 0 && _base$image2.url) {
      return {
        backgroundImage: "url(".concat(base.image.url, ")"),
        backgroundSize: base.image.size || "cover",
        backgroundRepeat: base.image.repeat || "no-repeat",
        backgroundPosition: base.image.position || "center center",
        opacity: base.opacity
      };
    } else {
      return {
        backgroundColor: base.color || "#ffffff",
        opacity: base.opacity
      };
    }
  };
  var getFormBorderStyle = function getFormBorderStyle() {
    var _width$top, _width$right, _width$bottom, _width$left, _radius$topLeft, _radius$topRight, _radius$bottomRight, _radius$bottomLeft;
    var border = settings.design.modal.form_border || {};
    var width = border.width || {};
    var radius = border.radius || {};
    return {
      borderTopWidth: "".concat((_width$top = width.top) !== null && _width$top !== void 0 ? _width$top : 0, "px"),
      borderRightWidth: "".concat((_width$right = width.right) !== null && _width$right !== void 0 ? _width$right : 0, "px"),
      borderBottomWidth: "".concat((_width$bottom = width.bottom) !== null && _width$bottom !== void 0 ? _width$bottom : 0, "px"),
      borderLeftWidth: "".concat((_width$left = width.left) !== null && _width$left !== void 0 ? _width$left : 0, "px"),
      borderStyle: border.style || "solid",
      borderColor: border.color || "#000000",
      borderTopLeftRadius: "".concat((_radius$topLeft = radius.topLeft) !== null && _radius$topLeft !== void 0 ? _radius$topLeft : 0, "px"),
      borderTopRightRadius: "".concat((_radius$topRight = radius.topRight) !== null && _radius$topRight !== void 0 ? _radius$topRight : 0, "px"),
      borderBottomRightRadius: "".concat((_radius$bottomRight = radius.bottomRight) !== null && _radius$bottomRight !== void 0 ? _radius$bottomRight : 0, "px"),
      borderBottomLeftRadius: "".concat((_radius$bottomLeft = radius.bottomLeft) !== null && _radius$bottomLeft !== void 0 ? _radius$bottomLeft : 0, "px"),
      borderWidth: "1px"
    };
  };
  var renderFormPreview = function renderFormPreview() {
    var formContent = function () {
      switch (activeForm) {
        case "register":
          return /*#__PURE__*/React.createElement("form", {
            className: "preview-form",
            style: getFormBackgroundStyle()
          }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login")), /*#__PURE__*/React.createElement("input", {
            type: "text",
            placeholder: "Username"
          }), /*#__PURE__*/React.createElement("input", {
            type: "email",
            placeholder: "Email"
          }), /*#__PURE__*/React.createElement("input", {
            type: "password",
            placeholder: "Password"
          }), /*#__PURE__*/React.createElement("input", {
            type: "password",
            placeholder: "Confirm Password"
          }), /*#__PURE__*/React.createElement("button", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login")));
        case "forgot":
          return /*#__PURE__*/React.createElement("form", {
            className: "preview-form",
            style: getFormBackgroundStyle()
          }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Forgot Password", "th-login")), /*#__PURE__*/React.createElement("input", {
            type: "text",
            placeholder: "Username or Email"
          }), /*#__PURE__*/React.createElement("button", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reset Password", "th-login")));
        default:
          return /*#__PURE__*/React.createElement("form", {
            className: "preview-form",
            style: getFormBackgroundStyle()
          }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login")), /*#__PURE__*/React.createElement("input", {
            type: "text",
            placeholder: "Username or Email"
          }), /*#__PURE__*/React.createElement("input", {
            type: "password",
            placeholder: "Password"
          }), /*#__PURE__*/React.createElement("div", {
            style: {
              textAlign: "left",
              margin: "10px 0"
            }
          }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
            type: "checkbox"
          }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Remember Me", "th-login"))), /*#__PURE__*/React.createElement("button", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login")));
      }
    }();
    var layoutType = settings.design.modal.layout_type || "popup";
    var wrappedContent = /*#__PURE__*/React.createElement("div", {
      className: "form-background-preview"
    }, formContent);
    return layoutType === "sliding" ? /*#__PURE__*/React.createElement("div", {
      className: "preview-sliding-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "side-panel-preview"
    }, wrappedContent)) : /*#__PURE__*/React.createElement("div", {
      className: "modal-box-preview"
    }, wrappedContent);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "design-editor-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "preview-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "preview-overlay layout-".concat(settings.design.modal.layout_type),
    style: getModalBackgroundStyle()
  }, renderFormPreview()), /*#__PURE__*/React.createElement("div", {
    className: "preview-switcher"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setActiveForm("login");
    },
    className: activeForm === "login" ? "active" : ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setActiveForm("register");
    },
    className: activeForm === "register" ? "active" : ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setActiveForm("forgot");
    },
    className: activeForm === "forgot" ? "active" : ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Forgot", "th-login")))), /*#__PURE__*/React.createElement("div", {
    className: "settings-panel"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "settings-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Design Settings", "th-login")), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
    className: "th-login-tabs",
    activeClass: "active-tab",
    tabs: [{
      name: "layout",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Modal", "th-login")
    }, {
      name: "container",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form", "th-login")
    }, {
      name: "more",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Components", "th-login")
    }]
  }, function (tab) {
    var _background$opacity, _formBackground$opaci, _settings$design$moda, _settings$design$moda2, _settings$design$moda3, _settings$design$moda4, _settings$design$moda5, _settings$design$moda6, _settings$design$moda7, _settings$design$moda8, _settings$design$moda9, _settings$design$moda0, _settings$design$moda1, _settings$design$moda10, _settings$design$moda11, _settings$design$moda12, _settings$design$moda13, _settings$design$moda14, _settings$design$moda15, _settings$design$moda16;
    return /*#__PURE__*/React.createElement(React.Fragment, null, tab.name === "layout" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Layout", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-style-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-style-card ".concat(settings.design.modal.layout_type === "popup" ? "selected" : ""),
      onClick: function onClick() {
        return handleSettingChange("design", ["modal", "layout_type"], "popup");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-visual layout-popup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-box"
    })), /*#__PURE__*/React.createElement("p", {
      className: "layout-name"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Popup Modal", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "layout-style-card ".concat(settings.design.modal.layout_type === "sliding" ? "selected" : ""),
      onClick: function onClick() {
        return handleSettingChange("design", ["modal", "layout_type"], "sliding");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-visual layout-sliding"
    }, /*#__PURE__*/React.createElement("div", {
      className: "side-panel"
    })), /*#__PURE__*/React.createElement("p", {
      className: "layout-name"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Sliding Panel", "th-login"))))), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Type", "th-login"),
      value: bgType,
      isBlock: true,
      onChange: function onChange(newType) {
        handleSettingChange("design", ["modal", "modal_background", "type"], newType);
      }
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "color",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "gradient",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Gradient", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "image",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image", "th-login")
    })), bgType === "color" && /*#__PURE__*/React.createElement("div", {
      className: "background-color-picker"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
      color: bgColor,
      onChangeComplete: function onChangeComplete(value) {
        handleSettingChange("design", ["modal", "modal_background", "color"], value.hex);
      },
      disableAlpha: false
    })), bgType === "gradient" && /*#__PURE__*/React.createElement("div", {
      className: "background-gradient-picker"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GradientPicker, {
      value: bgGradient,
      onChange: function onChange(value) {
        return handleSettingChange("design", ["modal", "modal_background", "gradient"], value);
      },
      gradients: [{
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Default", "th-login"),
        gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
        slug: "default"
      }, {
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Ocean Blue", "th-login"),
        gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)",
        slug: "ocean-blue"
      }]
    })), bgType === "image" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "image-url-input"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image URL", "th-login"),
      value: imageURL,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "url"], val);
      },
      placeholder: "https://example.com/image.jpg"
    })), imageURL && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "10px"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: imageURL,
      alt: "Preview",
      style: {
        width: "100%",
        height: "auto",
        borderRadius: "6px",
        border: "1px solid #ccc",
        objectFit: "cover"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "th-login-media-image"
    }, /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Position", "th-login"),
      value: position,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Left", "th-login"),
        value: "top left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Center", "th-login"),
        value: "top center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Right", "th-login"),
        value: "top right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Left", "th-login"),
        value: "center left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Center", "th-login"),
        value: "center center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Right", "th-login"),
        value: "center right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Left", "th-login"),
        value: "bottom left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Center", "th-login"),
        value: "bottom center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Right", "th-login"),
        value: "bottom right"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "position"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Size", "th-login"),
      value: size,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cover", "th-login"),
        value: "cover"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Contain", "th-login"),
        value: "contain"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Auto", "th-login"),
        value: "auto"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "size"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
      value: repeat,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No Repeat", "th-login"),
        value: "no-repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
        value: "repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat X", "th-login"),
        value: "repeat-x"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat Y", "th-login"),
        value: "repeat-y"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "repeat"], val);
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "background-opacity-slider",
      style: {
        marginTop: "16px"
      }
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Opacity", "th-login"),
      value: (_background$opacity = background.opacity) !== null && _background$opacity !== void 0 ? _background$opacity : 1,
      onChange: function onChange(val) {
        handleSettingChange("design", ["modal", "modal_background", "opacity"], val);
      },
      min: 0,
      max: 1,
      step: 0.1,
      withInputField: true
    })))), tab.name === "container" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Type", "th-login"),
      value: formBgType,
      isBlock: true,
      onChange: function onChange(newType) {
        handleSettingChange("design", ["modal", "form_background", "type"], newType);
      }
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "color",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "gradient",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Gradient", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "image",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image", "th-login")
    })), formBgType === "color" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
      color: formBgColor,
      onChangeComplete: function onChangeComplete(val) {
        return handleSettingChange("design", ["modal", "form_background", "color"], val.hex);
      },
      disableAlpha: false
    }), formBgType === "gradient" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GradientPicker, {
      value: formBgGradient,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "gradient"], val);
      },
      gradients: [{
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Default", "th-login"),
        gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
        slug: "default"
      }, {
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Ocean Blue", "th-login"),
        gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)",
        slug: "ocean-blue"
      }]
    }), formBgType === "image" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image URL", "th-login"),
      value: formImageURL,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "url"], val);
      }
    }), formImageURL && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
      src: formImageURL,
      alt: "Form Background Preview",
      style: {
        width: "100%",
        height: "auto",
        borderRadius: "6px",
        border: "1px solid #ccc",
        objectFit: "cover",
        marginTop: "10px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-media-image"
    }, /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Position", "th-login"),
      value: formPosition,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Left", "th-login"),
        value: "top left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Center", "th-login"),
        value: "top center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Right", "th-login"),
        value: "top right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Left", "th-login"),
        value: "center left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Center", "th-login"),
        value: "center center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Right", "th-login"),
        value: "center right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Left", "th-login"),
        value: "bottom left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Center", "th-login"),
        value: "bottom center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Right", "th-login"),
        value: "bottom right"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "position"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Size", "th-login"),
      value: formSize,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cover", "th-login"),
        value: "cover"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Contain", "th-login"),
        value: "contain"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Auto", "th-login"),
        value: "auto"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "size"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
      value: formRepeat,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No Repeat", "th-login"),
        value: "no-repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
        value: "repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat X", "th-login"),
        value: "repeat-x"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat Y", "th-login"),
        value: "repeat-y"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "repeat"], val);
      }
    })))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Opacity", "th-login"),
      value: (_formBackground$opaci = formBackground.opacity) !== null && _formBackground$opaci !== void 0 ? _formBackground$opaci : 1,
      onChange: function onChange(val) {
        handleSettingChange("design", ["modal", "form_background", "opacity"], val);
      },
      min: 0,
      max: 1,
      step: 0.1,
      withInputField: true
    })), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Border", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "th-login-border-controls"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top", "th-login"),
      value: (_settings$design$moda = (_settings$design$moda2 = settings.design.modal.form_border) === null || _settings$design$moda2 === void 0 || (_settings$design$moda2 = _settings$design$moda2.width) === null || _settings$design$moda2 === void 0 ? void 0 : _settings$design$moda2.top) !== null && _settings$design$moda !== void 0 ? _settings$design$moda : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "width", "top"], val);
      },
      min: 0,
      max: 20
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Right", "th-login"),
      value: (_settings$design$moda3 = (_settings$design$moda4 = settings.design.modal.form_border) === null || _settings$design$moda4 === void 0 || (_settings$design$moda4 = _settings$design$moda4.width) === null || _settings$design$moda4 === void 0 ? void 0 : _settings$design$moda4.right) !== null && _settings$design$moda3 !== void 0 ? _settings$design$moda3 : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "width", "right"], val);
      },
      min: 0,
      max: 20
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom", "th-login"),
      value: (_settings$design$moda5 = (_settings$design$moda6 = settings.design.modal.form_border) === null || _settings$design$moda6 === void 0 || (_settings$design$moda6 = _settings$design$moda6.width) === null || _settings$design$moda6 === void 0 ? void 0 : _settings$design$moda6.bottom) !== null && _settings$design$moda5 !== void 0 ? _settings$design$moda5 : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "width", "bottom"], val);
      },
      min: 0,
      max: 20
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Left", "th-login"),
      value: (_settings$design$moda7 = (_settings$design$moda8 = settings.design.modal.form_border) === null || _settings$design$moda8 === void 0 || (_settings$design$moda8 = _settings$design$moda8.width) === null || _settings$design$moda8 === void 0 ? void 0 : _settings$design$moda8.left) !== null && _settings$design$moda7 !== void 0 ? _settings$design$moda7 : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "width", "left"], val);
      },
      min: 0,
      max: 20
    })), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Style", "th-login"),
      value: ((_settings$design$moda9 = settings.design.modal.form_border) === null || _settings$design$moda9 === void 0 ? void 0 : _settings$design$moda9.style) || "solid",
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Solid", "th-login"),
        value: "solid"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Dashed", "th-login"),
        value: "dashed"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Dotted", "th-login"),
        value: "dotted"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Double", "th-login"),
        value: "double"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("None", "th-login"),
        value: "none"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "style"], val);
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
      color: ((_settings$design$moda0 = settings.design.modal.form_border) === null || _settings$design$moda0 === void 0 ? void 0 : _settings$design$moda0.color) || "#000000",
      onChangeComplete: function onChangeComplete(val) {
        return handleSettingChange("design", ["modal", "form_border", "color"], val.hex);
      },
      disableAlpha: false
    }), /*#__PURE__*/React.createElement("hr", {
      style: {
        margin: "16px 0"
      }
    }), /*#__PURE__*/React.createElement("h4", {
      style: {
        marginBottom: "8px"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Border Radius", "th-login")), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Left", "th-login"),
      value: (_settings$design$moda1 = (_settings$design$moda10 = settings.design.modal.form_border) === null || _settings$design$moda10 === void 0 || (_settings$design$moda10 = _settings$design$moda10.radius) === null || _settings$design$moda10 === void 0 ? void 0 : _settings$design$moda10.topLeft) !== null && _settings$design$moda1 !== void 0 ? _settings$design$moda1 : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "radius", "topLeft"], val);
      },
      min: 0,
      max: 50
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Right", "th-login"),
      value: (_settings$design$moda11 = (_settings$design$moda12 = settings.design.modal.form_border) === null || _settings$design$moda12 === void 0 || (_settings$design$moda12 = _settings$design$moda12.radius) === null || _settings$design$moda12 === void 0 ? void 0 : _settings$design$moda12.topRight) !== null && _settings$design$moda11 !== void 0 ? _settings$design$moda11 : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "radius", "topRight"], val);
      },
      min: 0,
      max: 50
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Right", "th-login"),
      value: (_settings$design$moda13 = (_settings$design$moda14 = settings.design.modal.form_border) === null || _settings$design$moda14 === void 0 || (_settings$design$moda14 = _settings$design$moda14.radius) === null || _settings$design$moda14 === void 0 ? void 0 : _settings$design$moda14.bottomRight) !== null && _settings$design$moda13 !== void 0 ? _settings$design$moda13 : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "radius", "bottomRight"], val);
      },
      min: 0,
      max: 50
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Left", "th-login"),
      value: (_settings$design$moda15 = (_settings$design$moda16 = settings.design.modal.form_border) === null || _settings$design$moda16 === void 0 || (_settings$design$moda16 = _settings$design$moda16.radius) === null || _settings$design$moda16 === void 0 ? void 0 : _settings$design$moda16.bottomLeft) !== null && _settings$design$moda15 !== void 0 ? _settings$design$moda15 : 0,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "radius", "bottomLeft"], val);
      },
      min: 0,
      max: 50
    }))), tab.name === "more" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Heading", "th-login"),
      defaultOpen: false
    }), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Input", "th-login"),
      defaultOpen: false
    }), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button", "th-login"),
      defaultOpen: false
    })));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignEditor);

/***/ }),

/***/ "./src/admin/components/display-trigger-settings.js":
/*!**********************************************************!*\
  !*** ./src/admin/components/display-trigger-settings.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var DisplayTriggersSettings = function DisplayTriggersSettings(_ref) {
  var _settings$display_tri, _settings$display_tri2, _settings$display_tri3, _settings$display_tri4, _settings$display_tri5, _settings$display_tri6, _settings$display_tri7, _settings$display_tri8, _settings$display_tri9, _settings$display_tri0, _settings$display_tri1, _settings$display_tri10, _settings$display_tri11, _settings$display_tri12, _settings$display_tri13, _settings$display_tri14, _settings$display_tri15, _settings$display_tri16, _settings$display_tri17, _settings$display_tri18, _settings$display_tri19, _settings$display_tri20, _settings$display_tri21, _settings$display_tri22, _settings$display_tri23, _settings$display_tri24, _settings$display_tri25, _settings$display_tri26, _settings$display_tri27, _settings$display_tri28, _settings$display_tri29, _settings$display_tri30, _settings$display_tri31, _settings$display_tri32, _settings$display_tri33, _settings$display_tri34, _settings$display_tri35, _settings$display_tri36, _settings$display_tri37, _settings$display_tri38, _settings$display_tri39, _settings$display_tri40, _settings$display_tri41, _settings$display_tri42, _settings$display_tri43, _settings$display_tri44, _settings$display_tri45, _settings$display_tri46, _settings$display_tri47, _settings$display_tri48;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-visibility"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display Triggers", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Trigger Methods", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("CSS Class Trigger", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Class name to trigger the modal", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.display_triggers.trigger_css_class || "th-login-trigger",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["trigger_css_class"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Shortcode", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Use [th_login_popup_link] to generate trigger links", "th-login"))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open Conditions", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("On Page Load", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open when page loads", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri = settings.display_triggers.auto_open_on_load) === null || _settings$display_tri === void 0 ? void 0 : _settings$display_tri.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_on_load", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri2 = settings.display_triggers.auto_open_on_load) === null || _settings$display_tri2 === void 0 ? void 0 : _settings$display_tri2.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Delay (seconds)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Delay before showing the modal", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "0",
    value: ((_settings$display_tri3 = settings.display_triggers.auto_open_on_load) === null || _settings$display_tri3 === void 0 ? void 0 : _settings$display_tri3.delay_seconds) || 0,
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_on_load", "delay_seconds"], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open on Scroll", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal when the user scrolls down a certain percentage of the page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri4 = settings.display_triggers.auto_open_on_scroll) === null || _settings$display_tri4 === void 0 ? void 0 : _settings$display_tri4.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_on_scroll', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri5 = settings.display_triggers.auto_open_on_scroll) === null || _settings$display_tri5 === void 0 ? void 0 : _settings$display_tri5.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Scroll Percentage (%)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Percentage of the page scrolled before the modal opens.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    max: "100",
    value: ((_settings$display_tri6 = settings.display_triggers.auto_open_on_scroll) === null || _settings$display_tri6 === void 0 ? void 0 : _settings$display_tri6.scroll_percentage) || 50,
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_on_scroll', 'scroll_percentage'], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open on Exit Intent", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal when the user's mouse leaves the browser viewport (e.g., trying to close the tab).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri7 = settings.display_triggers.auto_open_on_exit_intent) === null || _settings$display_tri7 === void 0 ? void 0 : _settings$display_tri7.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_on_exit_intent', 'enabled'], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open on Time on Page", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal after the user spends a specified amount of time on the page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri8 = settings.display_triggers.auto_open_on_time_on_page) === null || _settings$display_tri8 === void 0 ? void 0 : _settings$display_tri8.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri9 = settings.display_triggers.auto_open_on_time_on_page) === null || _settings$display_tri9 === void 0 ? void 0 : _settings$display_tri9.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Time on Page (seconds)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Time in seconds before the modal opens.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$display_tri0 = settings.display_triggers.auto_open_on_time_on_page) === null || _settings$display_tri0 === void 0 ? void 0 : _settings$display_tri0.time_seconds) || 10,
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'time_seconds'], parseInt(newValue, 10));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Audience Conditions", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Logged Out Users Only", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Only show to logged out users", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri1 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri1 === void 0 ? void 0 : _settings$display_tri1.for_logged_out_only) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "for_logged_out_only"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show for Specific User Roles (comma-separated slugs)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter user role slugs (e.g., administrator, editor, subscriber). Leave empty for all roles.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri10 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri10 === void 0 || (_settings$display_tri10 = _settings$display_tri10.for_specific_roles) === null || _settings$display_tri10 === void 0 ? void 0 : _settings$display_tri10.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'for_specific_roles'], newValue.split(',').map(function (s) {
        return s.trim();
      }));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Page & Content Conditions", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Specific Pages/Posts", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on specific pages or posts", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri11 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri11 === void 0 || (_settings$display_tri11 = _settings$display_tri11.on_specific_pages) === null || _settings$display_tri11 === void 0 ? void 0 : _settings$display_tri11.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "on_specific_pages", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri12 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri12 === void 0 || (_settings$display_tri12 = _settings$display_tri12.on_specific_pages) === null || _settings$display_tri12 === void 0 ? void 0 : _settings$display_tri12.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Page/Post IDs", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comma-separated list of IDs", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri13 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri13 === void 0 || (_settings$display_tri13 = _settings$display_tri13.on_specific_pages) === null || _settings$display_tri13 === void 0 || (_settings$display_tri13 = _settings$display_tri13.page_ids) === null || _settings$display_tri13 === void 0 ? void 0 : _settings$display_tri13.join(", ")) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "on_specific_pages", "page_ids"], newValue.split(",").map(function (s) {
        return parseInt(s.trim(), 10);
      }).filter(function (id) {
        return !isNaN(id);
      }));
    },
    placeholder: "10, 25, 30"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Page/Post Slugs", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comma-separated list of slugs", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri14 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri14 === void 0 || (_settings$display_tri14 = _settings$display_tri14.on_specific_pages) === null || _settings$display_tri14 === void 0 || (_settings$display_tri14 = _settings$display_tri14.page_slugs) === null || _settings$display_tri14 === void 0 ? void 0 : _settings$display_tri14.join(", ")) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "on_specific_pages", "page_slugs"], newValue.split(",").map(function (s) {
        return s.trim();
      }));
    },
    placeholder: "about-us, contact"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on Specific Categories", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Control modal display on posts within specific categories.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri15 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri15 === void 0 || (_settings$display_tri15 = _settings$display_tri15.on_specific_categories) === null || _settings$display_tri15 === void 0 ? void 0 : _settings$display_tri15.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri16 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri16 === void 0 || (_settings$display_tri16 = _settings$display_tri16.on_specific_categories) === null || _settings$display_tri16 === void 0 ? void 0 : _settings$display_tri16.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Category IDs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter category IDs (e.g., 5, 12).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri17 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri17 === void 0 || (_settings$display_tri17 = _settings$display_tri17.on_specific_categories) === null || _settings$display_tri17 === void 0 || (_settings$display_tri17 = _settings$display_tri17.category_ids) === null || _settings$display_tri17 === void 0 ? void 0 : _settings$display_tri17.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_ids'], newValue.split(',').map(function (s) {
        return parseInt(s.trim(), 10);
      }).filter(function (id) {
        return !isNaN(id);
      }));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Category Slugs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter category slugs (e.g., news, blog).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri18 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri18 === void 0 || (_settings$display_tri18 = _settings$display_tri18.on_specific_categories) === null || _settings$display_tri18 === void 0 || (_settings$display_tri18 = _settings$display_tri18.category_slugs) === null || _settings$display_tri18 === void 0 ? void 0 : _settings$display_tri18.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_slugs'], newValue.split(',').map(function (s) {
        return s.trim();
      }));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on Specific Tags", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Control modal display on posts with specific tags.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri19 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri19 === void 0 || (_settings$display_tri19 = _settings$display_tri19.on_specific_tags) === null || _settings$display_tri19 === void 0 ? void 0 : _settings$display_tri19.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri20 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri20 === void 0 || (_settings$display_tri20 = _settings$display_tri20.on_specific_tags) === null || _settings$display_tri20 === void 0 ? void 0 : _settings$display_tri20.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tag IDs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter tag IDs (e.g., 7, 15).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri21 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri21 === void 0 || (_settings$display_tri21 = _settings$display_tri21.on_specific_tags) === null || _settings$display_tri21 === void 0 || (_settings$display_tri21 = _settings$display_tri21.tag_ids) === null || _settings$display_tri21 === void 0 ? void 0 : _settings$display_tri21.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_ids'], newValue.split(',').map(function (s) {
        return parseInt(s.trim(), 10);
      }).filter(function (id) {
        return !isNaN(id);
      }));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tag Slugs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter tag slugs (e.g., featured, popular).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri22 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri22 === void 0 || (_settings$display_tri22 = _settings$display_tri22.on_specific_tags) === null || _settings$display_tri22 === void 0 || (_settings$display_tri22 = _settings$display_tri22.tag_slugs) === null || _settings$display_tri22 === void 0 ? void 0 : _settings$display_tri22.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_slugs'], newValue.split(',').map(function (s) {
        return s.trim();
      }));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on WooCommerce My Account Page", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal on the WooCommerce My Account page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri23 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri23 === void 0 ? void 0 : _settings$display_tri23.on_woocommerce_myaccount) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_myaccount'], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on WooCommerce Checkout Page", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal on the WooCommerce Checkout page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri24 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri24 === void 0 ? void 0 : _settings$display_tri24.on_woocommerce_checkout) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_checkout'], isChecked);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Device Visibility", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Desktop", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on desktop devices", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri25 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri25 === void 0 || (_settings$display_tri25 = _settings$display_tri25.device_visibility) === null || _settings$display_tri25 === void 0 ? void 0 : _settings$display_tri25.desktop) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "device_visibility", "desktop"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tablet", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on tablet devices", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri26 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri26 === void 0 || (_settings$display_tri26 = _settings$display_tri26.device_visibility) === null || _settings$display_tri26 === void 0 ? void 0 : _settings$display_tri26.tablet) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "device_visibility", "tablet"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Mobile", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on mobile devices", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri27 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri27 === void 0 || (_settings$display_tri27 = _settings$display_tri27.device_visibility) === null || _settings$display_tri27 === void 0 ? void 0 : _settings$display_tri27.mobile) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "device_visibility", "mobile"], isChecked);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Advanced Triggers", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL Parameter Trigger", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open when specific URL parameter is present", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri28 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri28 === void 0 || (_settings$display_tri28 = _settings$display_tri28.url_parameter_trigger) === null || _settings$display_tri28 === void 0 ? void 0 : _settings$display_tri28.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "url_parameter_trigger", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri29 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri29 === void 0 || (_settings$display_tri29 = _settings$display_tri29.url_parameter_trigger) === null || _settings$display_tri29 === void 0 ? void 0 : _settings$display_tri29.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Parameter Name", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL parameter name", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri30 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri30 === void 0 || (_settings$display_tri30 = _settings$display_tri30.url_parameter_trigger) === null || _settings$display_tri30 === void 0 ? void 0 : _settings$display_tri30.param_name) || "th_login",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "url_parameter_trigger", "param_name"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Parameter Value", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL parameter value", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri31 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri31 === void 0 || (_settings$display_tri31 = _settings$display_tri31.url_parameter_trigger) === null || _settings$display_tri31 === void 0 ? void 0 : _settings$display_tri31.param_value) || "open",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "url_parameter_trigger", "param_value"], newValue);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Referrer Detection", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open when arriving from specific referrers", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri32 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri32 === void 0 || (_settings$display_tri32 = _settings$display_tri32.referrer_detection) === null || _settings$display_tri32 === void 0 ? void 0 : _settings$display_tri32.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "referrer_detection", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri33 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri33 === void 0 || (_settings$display_tri33 = _settings$display_tri33.referrer_detection) === null || _settings$display_tri33 === void 0 ? void 0 : _settings$display_tri33.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Referrer URLs", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("One URL per line", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: ((_settings$display_tri34 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri34 === void 0 || (_settings$display_tri34 = _settings$display_tri34.referrer_detection) === null || _settings$display_tri34 === void 0 || (_settings$display_tri34 = _settings$display_tri34.referrer_urls) === null || _settings$display_tri34 === void 0 ? void 0 : _settings$display_tri34.join("\n")) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "referrer_detection", "referrer_urls"], newValue.split("\n").map(function (s) {
        return s.trim();
      }).filter(function (s) {
        return s !== "";
      }));
    },
    rows: 5
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pop-up Frequency", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Frequency Control", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Control how often pop-up appears", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri35 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri35 === void 0 ? void 0 : _settings$display_tri35.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["pop_up_frequency", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri36 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri36 === void 0 ? void 0 : _settings$display_tri36.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Frequency Type", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to limit pop-up frequency", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement("select", {
    value: ((_settings$display_tri37 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri37 === void 0 ? void 0 : _settings$display_tri37.type) || "session",
    onChange: function onChange(e) {
      return handleSettingChange("display_triggers", ["pop_up_frequency", "type"], e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "session"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Once per session", "th-login")), /*#__PURE__*/React.createElement("option", {
    value: "days"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Once every X days", "th-login"))))), ((_settings$display_tri38 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri38 === void 0 ? void 0 : _settings$display_tri38.type) === "days" && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Days to Hide", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Days before showing again", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$display_tri39 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri39 === void 0 ? void 0 : _settings$display_tri39.days) || 7,
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["pop_up_frequency", "days"], parseInt(newValue, 10));
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Menu Integration", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Menu Items", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add login/register links to menus", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri40 = settings.display_triggers.menu_integration) === null || _settings$display_tri40 === void 0 ? void 0 : _settings$display_tri40.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["menu_integration", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri41 = settings.display_triggers.menu_integration) === null || _settings$display_tri41 === void 0 ? void 0 : _settings$display_tri41.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Menu Slug", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Menu to add items to (or "all")', "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri42 = settings.display_triggers.menu_integration) === null || _settings$display_tri42 === void 0 ? void 0 : _settings$display_tri42.menu_slug) || "primary",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "menu_slug"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Item Text", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text for login menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri43 = settings.display_triggers.menu_integration) === null || _settings$display_tri43 === void 0 ? void 0 : _settings$display_tri43.item_text_login) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login", "th-login"),
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_text_login"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Item Icon", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashicon for login menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri44 = settings.display_triggers.menu_integration) === null || _settings$display_tri44 === void 0 ? void 0 : _settings$display_tri44.item_icon_login) || "dashicons-admin-users",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_icon_login"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide Login When Logged In", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide login item for logged in users", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri45 = settings.display_triggers.menu_integration) === null || _settings$display_tri45 === void 0 ? void 0 : _settings$display_tri45.visibility_login_logged_in) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["menu_integration", "visibility_login_logged_in"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register Item Text", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text for register menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri46 = settings.display_triggers.menu_integration) === null || _settings$display_tri46 === void 0 ? void 0 : _settings$display_tri46.item_text_register) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register", "th-login"),
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_text_register"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register Item Icon", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashicon for register menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri47 = settings.display_triggers.menu_integration) === null || _settings$display_tri47 === void 0 ? void 0 : _settings$display_tri47.item_icon_register) || "dashicons-plus-alt",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_icon_register"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide Register When Logged In", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide register item for logged in users", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri48 = settings.display_triggers.menu_integration) === null || _settings$display_tri48 === void 0 ? void 0 : _settings$display_tri48.visibility_register_logged_in) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["menu_integration", "visibility_register_logged_in"], isChecked);
    }
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayTriggersSettings);

/***/ }),

/***/ "./src/admin/components/form-feild-setiings.js":
/*!*****************************************************!*\
  !*** ./src/admin/components/form-feild-setiings.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var FormFieldsSettings = function FormFieldsSettings(_ref) {
  var _settings$form_fields, _settings$form_fields2, _settings$form_fields3, _settings$form_fields4, _settings$form_fields5, _settings$form_fields6, _settings$form_fields7, _settings$form_fields8, _settings$form_fields9, _settings$form_fields0, _settings$form_fields1, _settings$form_fields10, _settings$form_fields11, _settings$form_fields12, _settings$form_fields13, _settings$form_fields14, _settings$form_fields15, _settings$form_fields16, _settings$form_fields17, _settings$form_fields18, _settings$form_fields19, _settings$form_fields20, _settings$form_fields21, _settings$form_fields22, _settings$form_fields23, _settings$form_fields24;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange,
    addCustomField = _ref.addCustomField,
    updateCustomField = _ref.updateCustomField,
    removeCustomField = _ref.removeCustomField;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-feedback"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Form Fields Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Form Fields", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Username/Email Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the username/email field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields = settings.form_fields.login) === null || _settings$form_fields === void 0 ? void 0 : _settings$form_fields.username_label) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("form_fields", ["login", "username_label"], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Username or Email Address", "th-login")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Username/Email Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder text for the username/email field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields2 = settings.form_fields.login) === null || _settings$form_fields2 === void 0 ? void 0 : _settings$form_fields2.username_placeholder) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("form_fields", ["login", "username_placeholder"], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter your username or email", "th-login")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Password Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the password field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields3 = settings.form_fields.login) === null || _settings$form_fields3 === void 0 ? void 0 : _settings$form_fields3.password_label) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("form_fields", ["login", "password_label"], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Password", "th-login")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Password Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder text for the password field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields4 = settings.form_fields.login) === null || _settings$form_fields4 === void 0 ? void 0 : _settings$form_fields4.password_placeholder) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("form_fields", ["login", "password_placeholder"], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter your password", "th-login")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Remember Me", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display the remember me checkbox", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$form_fields5 = settings.form_fields.login) === null || _settings$form_fields5 === void 0 ? void 0 : _settings$form_fields5.show_remember_me) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("form_fields", ["login", "show_remember_me"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Remember Me Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the remember me checkbox", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields6 = settings.form_fields.login) === null || _settings$form_fields6 === void 0 ? void 0 : _settings$form_fields6.remember_me_label) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("form_fields", ["login", "remember_me_label"], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Remember Me", "th-login"),
    disabled: !((_settings$form_fields7 = settings.form_fields.login) !== null && _settings$form_fields7 !== void 0 && _settings$form_fields7.show_remember_me)
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Registration Form Fields", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Username Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the username field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields8 = settings.form_fields.register) === null || _settings$form_fields8 === void 0 ? void 0 : _settings$form_fields8.username_label) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("form_fields", ["register", "username_label"], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Choose a Username", "th-login")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the email field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields9 = settings.form_fields.register) === null || _settings$form_fields9 === void 0 ? void 0 : _settings$form_fields9.email_label) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'email_label'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Email Address', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder for the email field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields0 = settings.form_fields.register) === null || _settings$form_fields0 === void 0 ? void 0 : _settings$form_fields0.email_placeholder) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'email_placeholder'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter your email', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Password Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the password field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields1 = settings.form_fields.register) === null || _settings$form_fields1 === void 0 ? void 0 : _settings$form_fields1.password_label) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'password_label'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Create Password', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Password Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder for the password field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields10 = settings.form_fields.register) === null || _settings$form_fields10 === void 0 ? void 0 : _settings$form_fields10.password_placeholder) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'password_placeholder'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Create a strong password', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Confirm Password Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the confirm password field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields11 = settings.form_fields.register) === null || _settings$form_fields11 === void 0 ? void 0 : _settings$form_fields11.confirm_password_label) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'confirm_password_label'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Confirm Password', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Confirm Password Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder for the confirm password field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields12 = settings.form_fields.register) === null || _settings$form_fields12 === void 0 ? void 0 : _settings$form_fields12.confirm_password_placeholder) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'confirm_password_placeholder'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Confirm your password', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show First Name Field", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display the first name field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$form_fields13 = settings.form_fields.register) === null || _settings$form_fields13 === void 0 ? void 0 : _settings$form_fields13.show_first_name) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('form_fields', ['register', 'show_first_name'], isChecked);
    }
  }))), ((_settings$form_fields14 = settings.form_fields.register) === null || _settings$form_fields14 === void 0 ? void 0 : _settings$form_fields14.show_first_name) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("First Name Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the first name field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields15 = settings.form_fields.register) === null || _settings$form_fields15 === void 0 ? void 0 : _settings$form_fields15.first_name_label) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'first_name_label'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('First Name', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("First Name Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder for the first name field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields16 = settings.form_fields.register) === null || _settings$form_fields16 === void 0 ? void 0 : _settings$form_fields16.first_name_placeholder) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'first_name_placeholder'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your first name', 'th-login')
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Last Name Field", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display the last name field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$form_fields17 = settings.form_fields.register) === null || _settings$form_fields17 === void 0 ? void 0 : _settings$form_fields17.show_last_name) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('form_fields', ['register', 'show_last_name'], isChecked);
    }
  }))), ((_settings$form_fields18 = settings.form_fields.register) === null || _settings$form_fields18 === void 0 ? void 0 : _settings$form_fields18.show_last_name) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Last Name Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the last name field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields19 = settings.form_fields.register) === null || _settings$form_fields19 === void 0 ? void 0 : _settings$form_fields19.last_name_label) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'last_name_label'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Last Name', 'th-login')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Last Name Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder for the last name field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields20 = settings.form_fields.register) === null || _settings$form_fields20 === void 0 ? void 0 : _settings$form_fields20.last_name_placeholder) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'last_name_placeholder'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your last name', 'th-login')
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Terms & Conditions Checkbox", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display terms and conditions checkbox", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$form_fields21 = settings.form_fields.register) === null || _settings$form_fields21 === void 0 || (_settings$form_fields21 = _settings$form_fields21.terms_and_conditions) === null || _settings$form_fields21 === void 0 ? void 0 : _settings$form_fields21.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('form_fields', ['register', 'terms_and_conditions', 'enabled'], isChecked);
    }
  }))), ((_settings$form_fields22 = settings.form_fields.register) === null || _settings$form_fields22 === void 0 || (_settings$form_fields22 = _settings$form_fields22.terms_and_conditions) === null || _settings$form_fields22 === void 0 ? void 0 : _settings$form_fields22.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Terms & Conditions Label (HTML allowed)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for terms checkbox with optional HTML", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.form_fields.register.terms_and_conditions.label || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['register', 'terms_and_conditions', 'label'], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Terms & Conditions Required", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Make accepting terms mandatory", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.form_fields.register.terms_and_conditions.required || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('form_fields', ['register', 'terms_and_conditions', 'required'], isChecked);
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Forgot Password Form Fields", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email Label", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label for the email field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields23 = settings.form_fields.forgot_password) === null || _settings$form_fields23 === void 0 ? void 0 : _settings$form_fields23.email_label) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("form_fields", ["forgot_password", "email_label"], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email Address", "th-login")
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder for the email field", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$form_fields24 = settings.form_fields.forgot_password) === null || _settings$form_fields24 === void 0 ? void 0 : _settings$form_fields24.email_placeholder) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('form_fields', ['forgot_password', 'email_placeholder'], newValue);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enter your email to reset password', 'th-login')
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-feedback"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Registration Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "group-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom Registration Fields", "th-login")), /*#__PURE__*/React.createElement("button", {
    className: "add-field-button",
    onClick: addCustomField
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-plus"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add Field", "th-login"))), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add custom fields to your registration form. These can be mapped to user meta.", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "custom-fields-container"
  }, settings.form_fields.register.custom_fields.map(function (field, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "custom-field"
    }, /*#__PURE__*/React.createElement("div", {
      className: "field-header"
    }, /*#__PURE__*/React.createElement("h4", null, field.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("New Field", "th-login")), /*#__PURE__*/React.createElement("button", {
      className: "remove-field",
      onClick: function onClick() {
        return removeCustomField(index);
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "dashicons dashicons-trash"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "field-settings"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-label"
    }, /*#__PURE__*/React.createElement("h5", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Field ID", "th-login")), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Unique identifier (no spaces)", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "setting-control"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      value: field.id,
      onChange: function onChange(newValue) {
        return updateCustomField(index, "id", newValue.replace(/\s/g, "").toLowerCase());
      },
      placeholder: "field_id"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "setting-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-label"
    }, /*#__PURE__*/React.createElement("h5", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Field Label", "th-login")), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display name for the field", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "setting-control"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      value: field.label,
      onChange: function onChange(newValue) {
        return updateCustomField(index, "label", newValue);
      },
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Field Label", "th-login")
    }))), /*#__PURE__*/React.createElement("div", {
      className: "setting-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-label"
    }, /*#__PURE__*/React.createElement("h5", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Field Type", "th-login")), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Type of input field", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "setting-control"
    }, /*#__PURE__*/React.createElement("select", {
      value: field.type,
      onChange: function onChange(e) {
        return updateCustomField(index, "type", e.target.value);
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text", "th-login")), /*#__PURE__*/React.createElement("option", {
      value: "textarea"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Textarea", "th-login")), /*#__PURE__*/React.createElement("option", {
      value: "checkbox"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Checkbox", "th-login")), /*#__PURE__*/React.createElement("option", {
      value: "select"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Select", "th-login")), /*#__PURE__*/React.createElement("option", {
      value: "email"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Email", "th-login")), /*#__PURE__*/React.createElement("option", {
      value: "url"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL", "th-login")), /*#__PURE__*/React.createElement("option", {
      value: "number"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Number", "th-login"))))), (field.type === "text" || field.type === "email" || field.type === "url" || field.type === "number" || field.type === "textarea") && /*#__PURE__*/React.createElement("div", {
      className: "setting-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-label"
    }, /*#__PURE__*/React.createElement("h5", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder", "th-login")), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hint text for the field", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "setting-control"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      value: field.placeholder,
      onChange: function onChange(newValue) {
        return updateCustomField(index, "placeholder", newValue);
      },
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter value...", "th-login")
    }))), field.type === "select" && /*#__PURE__*/React.createElement("div", {
      className: "setting-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-label"
    }, /*#__PURE__*/React.createElement("h5", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Options", "th-login")), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comma-separated options", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "setting-control"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      value: field.options.join(", "),
      onChange: function onChange(newValue) {
        return updateCustomField(index, "options", newValue.split(",").map(function (item) {
          return item.trim();
        }));
      },
      placeholder: "Option 1, Option 2, Option 3"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "setting-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-label"
    }, /*#__PURE__*/React.createElement("h5", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Required Field", "th-login")), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Is this field mandatory?", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "setting-control"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      checked: field.required,
      onChange: function onChange(isChecked) {
        return updateCustomField(index, "required", isChecked);
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "setting-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "setting-label"
    }, /*#__PURE__*/React.createElement("h5", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Map to User Meta", "th-login")), /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Save this field as user metadata", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "setting-control"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      checked: field.map_to_user_meta,
      onChange: function onChange(isChecked) {
        return updateCustomField(index, "map_to_user_meta", isChecked);
      }
    })))));
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFieldsSettings);

/***/ }),

/***/ "./src/admin/components/general-settings.js":
/*!**************************************************!*\
  !*** ./src/admin/components/general-settings.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_select_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-select-control */ "./src/admin/components/custom-select-control.js");



var GeneralSettings = function GeneralSettings(_ref) {
  var _settings$general$red, _settings$general$red2, _settings$general$red3, _settings$general$red4, _settings$general$red5, _settings$general$red6, _settings$general$man;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange,
    addRoleBasedRedirect = _ref.addRoleBasedRedirect,
    updateRoleBasedRedirect = _ref.updateRoleBasedRedirect,
    removeRoleBasedRedirect = _ref.removeRoleBasedRedirect;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-admin-settings"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("General Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Plugin Status", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, settings.general.plugin_status === "enabled" ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login popup is currently active", "th-login") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login popup is disabled", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.general.plugin_status === "enabled",
    onChange: function onChange(isChecked) {
      return handleSettingChange("general", ["plugin_status"], isChecked ? "enabled" : "disabled");
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Behavior", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Login After Registration", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically log users in after registration", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.general.auto_login_after_registration || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("general", ["auto_login_after_registration"], isChecked);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Redirection Rules", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "redirection-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "redirection-card"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("After Login", "th-login")), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: ((_settings$general$red = settings.general.redirects) === null || _settings$general$red === void 0 || (_settings$general$red = _settings$general$red.after_login) === null || _settings$general$red === void 0 ? void 0 : _settings$general$red.type) || "current_page",
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Current Page", "th-login"),
      value: "current_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashboard", "th-login"),
      value: "dashboard"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Home Page", "th-login"),
      value: "home_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom URL", "th-login"),
      value: "custom_url"
    }],
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_login", "type"], newValue);
    }
  }), ((_settings$general$red2 = settings.general.redirects) === null || _settings$general$red2 === void 0 || (_settings$general$red2 = _settings$general$red2.after_login) === null || _settings$general$red2 === void 0 ? void 0 : _settings$general$red2.type) === "custom_url" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.general.redirects.after_login.url || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_login", "url"], newValue);
    },
    placeholder: "https://example.com/welcome"
  })), /*#__PURE__*/React.createElement("div", {
    className: "redirection-card"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("After Logout", "th-login")), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: ((_settings$general$red3 = settings.general.redirects) === null || _settings$general$red3 === void 0 || (_settings$general$red3 = _settings$general$red3.after_logout) === null || _settings$general$red3 === void 0 ? void 0 : _settings$general$red3.type) || "home_page",
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Home Page", "th-login"),
      value: "home_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom URL", "th-login"),
      value: "custom_url"
    }],
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_logout", "type"], newValue);
    }
  }), ((_settings$general$red4 = settings.general.redirects) === null || _settings$general$red4 === void 0 || (_settings$general$red4 = _settings$general$red4.after_logout) === null || _settings$general$red4 === void 0 ? void 0 : _settings$general$red4.type) === "custom_url" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.general.redirects.after_logout.url || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_logout", "url"], newValue);
    },
    placeholder: "https://example.com/goodbye"
  })), /*#__PURE__*/React.createElement("div", {
    className: "redirection-card"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("After Registration", "th-login")), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: ((_settings$general$red5 = settings.general.redirects) === null || _settings$general$red5 === void 0 || (_settings$general$red5 = _settings$general$red5.after_register) === null || _settings$general$red5 === void 0 ? void 0 : _settings$general$red5.type) || "login_form",
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Login Form", "th-login"),
      value: "login_form"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashboard", "th-login"),
      value: "dashboard"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Home Page", "th-login"),
      value: "home_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom URL", "th-login"),
      value: "custom_url"
    }],
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_register", "type"], newValue);
    }
  }), ((_settings$general$red6 = settings.general.redirects) === null || _settings$general$red6 === void 0 || (_settings$general$red6 = _settings$general$red6.after_register) === null || _settings$general$red6 === void 0 ? void 0 : _settings$general$red6.type) === "custom_url" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.general.redirects.after_register.url || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_register", "url"], newValue);
    },
    placeholder: "https://example.com/registration-success"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "group-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Role-Based Redirects", "th-login")), /*#__PURE__*/React.createElement("button", {
    className: "add-rule-button",
    onClick: addRoleBasedRedirect
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-plus"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add Rule", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "role-redirects-container"
  }, settings.general.redirects.role_based_redirects.map(function (rule, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "redirect-rule"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rule-header"
    }, /*#__PURE__*/React.createElement("h4", null, rule.role || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("New Redirect Rule", "th-login")), /*#__PURE__*/React.createElement("button", {
      className: "remove-rule",
      onClick: function onClick() {
        return removeRoleBasedRedirect(index);
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "dashicons dashicons-trash"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "rule-fields"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-field"
    }, /*#__PURE__*/React.createElement("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User Role Slug", "th-login")), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: rule.role,
      onChange: function onChange(e) {
        return updateRoleBasedRedirect(index, "role", e.target.value);
      },
      placeholder: "subscriber"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-field"
    }, /*#__PURE__*/React.createElement("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Redirect URL", "th-login")), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: rule.url,
      onChange: function onChange(e) {
        return updateRoleBasedRedirect(index, "url", e.target.value);
      },
      placeholder: "https://example.com/member-dashboard"
    }))));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Manual User Approval", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Require admin approval for new registrations", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$general$man = settings.general.manual_user_approval) === null || _settings$general$man === void 0 ? void 0 : _settings$general$man.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("general", ["manual_user_approval", "enabled"], isChecked);
    }
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneralSettings);

/***/ }),

/***/ "./src/admin/components/integration-settings.js":
/*!******************************************************!*\
  !*** ./src/admin/components/integration-settings.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var IntegrationSettings = function IntegrationSettings(_ref) {
  var _settings$integration, _settings$integration2;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-admin-plugins"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Integration Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("WooCommerce Integration", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable WooCommerce Integration", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Integrate with WooCommerce features", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$integration = settings.integration) === null || _settings$integration === void 0 || (_settings$integration = _settings$integration.woocommerce) === null || _settings$integration === void 0 ? void 0 : _settings$integration.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("integration", ["woocommerce", "enabled"], isChecked);
    }
  }))), ((_settings$integration2 = settings.integration) === null || _settings$integration2 === void 0 || (_settings$integration2 = _settings$integration2.woocommerce) === null || _settings$integration2 === void 0 ? void 0 : _settings$integration2.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Replace WooCommerce Login", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Use this login form for WooCommerce", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.integration.woocommerce.replace_login || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("integration", ["woocommerce", "replace_login"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Replace WooCommerce Registration", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Use this registration form for WooCommerce", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.integration.woocommerce.replace_registration || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("integration", ["woocommerce", "replace_registration"], isChecked);
    }
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IntegrationSettings);

/***/ }),

/***/ "./src/admin/components/security-settings.js":
/*!***************************************************!*\
  !*** ./src/admin/components/security-settings.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var SecuritySettings = function SecuritySettings(_ref) {
  var _settings$security$br, _settings$security$br2, _settings$security$br3, _settings$security$br4, _settings$security$br5, _settings$security$re, _settings$security$re2, _settings$security$re3, _settings$security$re4, _settings$security$re5;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-shield"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Security Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Brute Force Protection", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Protection", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Prevent brute force login attacks", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$security$br = settings.security.brute_force_protection) === null || _settings$security$br === void 0 ? void 0 : _settings$security$br.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["brute_force_protection", "enabled"], isChecked);
    }
  }))), ((_settings$security$br2 = settings.security.brute_force_protection) === null || _settings$security$br2 === void 0 ? void 0 : _settings$security$br2.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Max Login Attempts", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Allowed failed attempts before lockout", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$security$br3 = settings.security.brute_force_protection) === null || _settings$security$br3 === void 0 ? void 0 : _settings$security$br3.max_attempts) || 5,
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["brute_force_protection", "max_attempts"], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Lockout Duration (minutes)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Time before another attempt is allowed", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$security$br4 = settings.security.brute_force_protection) === null || _settings$security$br4 === void 0 ? void 0 : _settings$security$br4.lockout_duration_minutes) || 30,
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["brute_force_protection", "lockout_duration_minutes"], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto IP Blacklisting", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically blacklist repeat offenders", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$security$br5 = settings.security.brute_force_protection) === null || _settings$security$br5 === void 0 ? void 0 : _settings$security$br5.auto_ip_blacklist_enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["brute_force_protection", "auto_ip_blacklist_enabled"], isChecked);
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable reCAPTCHA", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add Google reCAPTCHA to forms", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$security$re = settings.security.recaptcha) === null || _settings$security$re === void 0 ? void 0 : _settings$security$re.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["recaptcha", "enabled"], isChecked);
    }
  }))), ((_settings$security$re2 = settings.security.recaptcha) === null || _settings$security$re2 === void 0 ? void 0 : _settings$security$re2.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA Type", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Version of reCAPTCHA to use", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement("select", {
    value: ((_settings$security$re3 = settings.security.recaptcha) === null || _settings$security$re3 === void 0 ? void 0 : _settings$security$re3.type) || "v2_checkbox",
    onChange: function onChange(e) {
      return handleSettingChange("security", ["recaptcha", "type"], e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "v2_checkbox"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA v2 Checkbox", "th-login")), /*#__PURE__*/React.createElement("option", {
    value: "v3_invisible"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA v3 Invisible", "th-login"))))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Site Key", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Your reCAPTCHA site key", "th-login"), ' ', /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ExternalLink, {
    href: "https://www.google.com/recaptcha/admin"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Google reCAPTCHA Admin", "th-login")))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$security$re4 = settings.security.recaptcha) === null || _settings$security$re4 === void 0 ? void 0 : _settings$security$re4.site_key) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["recaptcha", "site_key"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Secret Key", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Your reCAPTCHA secret key", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$security$re5 = settings.security.recaptcha) === null || _settings$security$re5 === void 0 ? void 0 : _settings$security$re5.secret_key) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["recaptcha", "secret_key"], newValue);
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Honeypot Protection", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Honeypot", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add hidden field to catch bots", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.security.honeypot_enabled || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["honeypot_enabled"], isChecked);
    }
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SecuritySettings);

/***/ }),

/***/ "./src/admin/components/tools-settings.js":
/*!************************************************!*\
  !*** ./src/admin/components/tools-settings.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var ToolsSettings = function ToolsSettings(_ref) {
  var settings = _ref.settings,
    exportedSettings = _ref.exportedSettings,
    setExportedSettings = _ref.setExportedSettings,
    importSettingsText = _ref.importSettingsText,
    setImportSettingsText = _ref.setImportSettingsText,
    handleExportSettings = _ref.handleExportSettings,
    handleImportSettings = _ref.handleImportSettings,
    isSaving = _ref.isSaving,
    setIsResetConfirmOpen = _ref.setIsResetConfirmOpen;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-admin-tools"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tools", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Export Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Export Current Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Backup your current configuration", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isSecondary: true,
    onClick: handleExportSettings
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: "download"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Export Settings", "th-login")))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Exported Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Copy this JSON to save your settings", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: exportedSettings,
    readOnly: true,
    rows: 10,
    className: "export-textarea"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Import Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Import Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste previously exported settings JSON", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: importSettingsText,
    onChange: function onChange(newValue) {
      return setImportSettingsText(newValue);
    },
    rows: 10,
    className: "import-textarea"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isPrimary: true,
    onClick: handleImportSettings,
    disabled: isSaving || !importSettingsText.trim()
  }, isSaving ? /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: "upload"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Import Settings", "th-login")))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Reset Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Reset All Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Restore all settings to default values", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isDestructive: true,
    onClick: function onClick() {
      return setIsResetConfirmOpen(true);
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: "undo"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Reset Settings", "th-login")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolsSettings);

/***/ }),

/***/ "./src/admin/index.scss":
/*!******************************!*\
  !*** ./src/admin/index.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!******************************!*\
  !*** external "wp.apiFetch" ***!
  \******************************/
/***/ ((module) => {

module.exports = wp.apiFetch;

/***/ }),

/***/ "@wordpress/components":
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/***/ ((module) => {

module.exports = wp.components;

/***/ }),

/***/ "@wordpress/element":
/*!*****************************!*\
  !*** external "wp.element" ***!
  \*****************************/
/***/ ((module) => {

module.exports = wp.element;

/***/ }),

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/***/ ((module) => {

module.exports = wp.i18n;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = React;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/admin/App.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss */ "./src/admin/index.scss");




// Render the main App component into the root element.
document.addEventListener('DOMContentLoaded', function () {
  var rootElement = document.getElementById('th-login-admin-root');
  if (rootElement) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_App__WEBPACK_IMPORTED_MODULE_1__["default"]), rootElement);
  } else {
    console.error('TH Login Admin: Root element #th-login-admin-root not found.');
  }
});
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map