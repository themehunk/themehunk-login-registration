# 📦 TH Login Plugin – Full Technical Documentation (Developer Readme)

This comprehensive developer documentation covers every file, class, function, REST API route, and flow in the **TH Login** WordPress plugin. It serves as both an internal development guide and technical manual for contributors, maintainers, and advanced users.

## 📁 Folder Structure Overview

themehunk-login-registration/
├── themehunk-login-registration.php                                            # Main plugin bootstrap file
├── readme.txt                                              # WordPress.org standard readme
├── assets/                                                 # Static frontend/admin assets
│   └── images/
│       └── themehunk-login-registration-logo.svg                               # Branding/logo image
├── includes/                                               # Core logic classes
│   ├── class-thlogin-admin.php                             # Admin settings panel logic
│   ├── class-thlogin-frontend.php                          # Frontend popup logic
│   ├── class-thlogin-rest-api.php                          # REST API handler class
│   ├── class-thlogin-security.php                          # Security & validation layer
│   ├── class-thlogin-integrations.php                      # WooCommerce hooks & redirects
│   ├── helpers.php                                         # Global helper functions
│   └── helpers/
│       ├── class-thlogin-defaults.php                      # Settings defaults loader
│       ├── class-sanitaization-validation.php              # Sanitization and validation for fields
│       └── icon.php                                        # 100+ default SVG icons
├── templates/                                              # Form markup templates
│   ├── class-thlogin-modal-wrapper.php                     # Main modal wrapper
│   ├── class-thlogin-login-form.php                        # Login form markup
│   ├── class-thlogin-register-form.php                     # Registration form markup
│   ├── class-thlogin-forgot-password-form.php              # Forgot password form markup
│   └── parts/
│       ├── form-header.php                                 # Reusable header component
│       └── form-footer.php                                 # Reusable footer component
|   └── styles
|       └── th-front-styles.php
├── app/                                                    # React Admin Interface & Build Tools
│   ├── build/                                              # Compiled build output
│   ├── node_modules/                                       # NPM dependencies
│   ├── src/
│   │   ├── admin/                                          # Admin UI source
│   │   │   ├── app.js                                      # Main App entry
│   │   │   ├── blocks.js                                   # Block registration
│   │   │   ├── constant.js                                 # Global constants
│   │   │   ├── index.js                                    # Entry for WP enqueue
│   │   │   ├── index.scss                                  # Main SCSS entry
│   │   │   └── components/                                 # UI Components
│   │   │       ├── custom-select-control.js                # Reusable select control
│   │   │       ├── design-settings.js                      # Design tab logic
│   │   │       ├── display-trigger-settings.js             # Popup trigger settings
│   │   │       ├── form-field-settings.js                  # Form field manager
│   │   │       ├── general-settings.js                     # General settings tab
│   │   │       ├── icons.js                                # 100+icons SVG Icon picker
│   │   │       ├── integration-settings.js                 # WooCommerce integration UI
│   │   │       ├── security-settings.js                    # Security tab UI
│   │   │       ├── tools-settings.js                       # Export/Import/Reset settings
│   │   │       └── design-editor/                          # Design control panels
│   │   │           ├── accordion-section.js                # Reusable accordion
│   │   │           ├── background-panel.js                 # Background styling panel
│   │   │           ├── border-box-control.js               # Border radius/padding handler
│   │   │           ├── border-settings-panel.js            # Border UI panel
│   │   │           └── padding-settings-panel.js           # Padding spacing settings
│   │   └── public/
│   │       ├── styles/                                     # Public-facing CSS
│   │       ├── index.js                                    # Public entrypoint
│   │       └── webpack.config.js                           # Webpack config
│   ├── babel.config.js                                     # Babel config
│   ├── package.json                                        # NPM dependencies & scripts
│   └── webpack.config.js                                   # Build config

---

REST API Endpoints (Defined in class-thlogin-rest-api.php)

    POST /wp-json/thlogin/v1/settings

        Purpose: Save plugin settings from the React Admin panel.
        Permission: manage_options
        Args: general, design, form_fields, display_triggers, integration, security
        Each field is validated and sanitized using custom callbacks before saving to the thlogin_settings option.

    POST /wp-json/thlogin/v1/login

        Purpose: Log in the user from frontend form.
        Public endpoint (no login required).
        Validates credentials, recaptcha, brute force, and email verification if enabled.

    POST /wp-json/thlogin/v1/register

        Purpose: Register a new user.
        Validates honeypot, passwords, duplicate users, manual approval, email verification.
        Calls wp_create_user() and sends verification email if enabled.

    POST /wp-json/thlogin/v1/forgot-password

        Purpose: Trigger password reset email using core WordPress retrieve_password().
        Public endpoint.

    GET /wp-json/thlogin/v1/export-settings

        Purpose: Return all plugin settings as JSON.
        Permission: manage_options

    POST /wp-json/thlogin/v1/reset-settings

        Purpose: Restore plugin settings to default using THLogin_Defaults::set_all_defaults().
        Permission: manage_options

    GET /wp-json/thlogin/v1/content-suggestions

        Purpose: Fetch default WordPress content types (categories, tags, slugs).
        Permission: manage_options

    GET /wp-json/thlogin/v1/roles

        Purpose: Return available WordPress roles as array.
        Permission: __return_true
        Useful for dynamic role selection dropdowns in settings.

    GET /wp-json/thlogin/v1/pending-users

        Purpose: Fetch users pending manual approval.
        Permission: list_users

    POST /wp-json/thlogin/v1/approve-user

        Purpose: Approve a user by ID if they are pending.
        Args: user_id (integer, must exist)
        Permission: edit_users
        Permission: __return_true
        Useful for dynamic role selection dropdowns in settings.

    GET /wp-json/thlogin/v1/pending-users

        Purpose: Fetch users pending manual approval.
        Permission: list_users

    POST /wp-json/thlogin/v1/approve-user

        Purpose: Approve a user by ID if they are pending.
        Args: user_id (integer, must exist)
        Permission: edit_users


## REST API Endpoints (class-thlogin-rest-api.php)

* **POST** `/wp-json/thlogin/v1/settings`:Save all settings.
* **POST** `/wp-json/thlogin/v1/login`: Frontend login.
* **POST** `/wp-json/thlogin/v1/register`: Register user.
* **POST** `/wp-json/thlogin/v1/forgot-password`: Trigger password reset email.
* **GET** `/wp-json/thlogin/v1/export-settings`: Get plugin settings as JSON.
* **POST** `/wp-json/thlogin/v1/reset-settings`: Reset all settings to default.
* **GET** `/wp-json/thlogin/v1/content-suggestions`: Fetch post types.
* **GET** `/wp-json/thlogin/v1/roles`: Get all roles.
* **GET** `/wp-json/thlogin/v1/pending-users`: Get users awaiting approval.
* **POST** `/wp-json/thlogin/v1/approve-user`: Approve pending user.
* **GET** `/wp-json/thlogin/v1/lockout`: Brute force status query.

File: includes/helpers/class-thlogin-defaults.php
    Purpose: This class defines the default settings for all major panels of the TH Login plugin. It provides a centralized method to reset or initialize all plugin options with structured, validated values. Useful during plugin activation, reset, or migrations.

    Method: set_all_defaults()
        Registers and saves all default plugin options into a single database option:
        thlogin_settings

    This includes settings for:

        General configuration
        UI Design
        Form fields
        Display triggers
        Security
        Integrations (e.g., WooCommerce)


    update_option( 'thlogin_settings', [
        'general'           => self::general(),
        'design'            => self::design(),
        'form_fields'       => self::form_fields(),
        'display_triggers'  => self::display_triggers(),
        'security'          => self::security(),
        'integration'       => self::integration(),
    ] );

Defaults Breakdown
    general()
        Controls plugin-wide behavior:
        Plugin enable/disable
        Replace native WordPress login/register pages
        Form type: single or double
        Display mode: page or popup
        Default registration role
        Auto-login toggle after registration
        Allow user registration (respects WordPress setting)
        Redirect rules: login/logout/register, with role-based overrides
        Manual approval toggle
        Close button visibility

    design()
        Returns UI customization defaults:
        Modal & form background (color/gradient/image)
        Border, padding, and spacing options
        Typography for headings, inputs, labels, buttons
        Input and button colors
        Remember-me checkbox design
        Icon color, size, and position
        Header and cancel button styles

    form_fields()
        Defines all default frontend form fields:
        Login form: username/email, password, remember me
        Register form: username, email, password, confirm password, first name, last name, terms checkbox, honeypot
        Forgot password: email/username
        Each field includes:
        ID, label, name, type, placeholder
        Icon, validation messages, required/show flags
        Predefined logic (e.g., confirm password match, strength rules)

    display_triggers()
        Popup behavior configuration:
        Auto open on:
        Page load (delay)
        Scroll depth
        Time on page
        Exit intent
        Conditional logic for:
        Logged-out users
        Specific roles
        Specific pages, tags, categories
        Device visibility
        WooCommerce pages
        URL parameter triggers
        Referrer-based popups
        Popup frequency control (by session, cookie, or days)
        Menu integration:
        Show login/register in menu
        Icon, label, and visibility settings

    security()
        Anti-spam and login security layer:
        Brute force protection:
        Max attempts
        Lockout duration (in minutes)
        Auto-blacklist toggle
        reCAPTCHA (v2/v3):
        Enable/disable
        Show on: login, register, forgot password, or all
        Site/secret keys
        Honeypot protection
        Email verification:
        Enable/disable
        From name/email
        Subject & message (uses {verification_link} placeholder)

    integration()
        Third-party plugin support:WooCommerce:
        Enable/disable login override for Checkout and My Account pages


File: class-thlogin-shortcodes.php
    Provide frontend form rendering via WordPress shortcodes (login, register, forgot password, combined modal, and inline layout).
        new THLogin_Shortcodes();

        ###  Registered Shortcodes

        You can use the following shortcodes in posts, pages, or template files via `do_shortcode()`.

        | Shortcode                   | Description                                                               |
        | --------------------------- | ------------------------------------------------------------------------- |
        | `[thlogin_form]`            | Renders the login form.                                                   |
        | `[th_register_form]`        | Renders the registration form.                                            |
        | `[th_forgot_password_form]` | Renders the forgot password form.                                         |
        | `[thlogin_combined_form]`   | Renders an inline layout of login/register/forgot forms with toggle tabs. |
        | `[thlogin_popup_auto]`      | Automatically opens the login/register modal on page load.                |


        ###  Asset Handling – `enqueue_shortcode_assets()`

        Automatically enqueues the following **only once** per page load when any shortcode is rendered:

        * `frontend.js` script (loaded with `defer`)
        * `public.css` style
        * `dashicons`
        * Google Fonts (optional, loaded with `async`)
        * Injects runtime settings via `wp_localize_script()` into `thLoginFrontendData`:

        * Nonce
        * Current URL, Site URL
        * General, design, display\_triggers settings
        * Login status, user roles
        * Custom CSS/JS

        #### `render_login_form_shortcode()`

        * Template: `templates/form-login.php`
        * Output wrapped in `.thlogin-shortcode-form-wrapper`

        #### `render_register_form_shortcode()`

        * Template: `templates/form-register.php`
        * Strips:

        * Inline `display: none;` on wrapper
        * `.thlogin-form-links` (already includes login link)

        #### `render_forgot_password_form_shortcode()`

        * Template: `templates/form-forgot-password.php`
        * Strips:

        * Inline `display: none;`
        * `.thlogin-form-links` (back to login link)

        #### `render_combined_form_shortcode()`

        * Renders inline tabs layout (login/register/forgot) using modal structure.
        * Modifications:

        * Removes modal-specific styling and IDs
        * Hides close (X) buttons
        * Injects form tab switcher JS logic
        * Output wrapped in `.thlogin-inline-combined-form-wrapper`

        #### `render_auto_popup_shortcode()`

        * Loads `modal-wrapper.php` and forces it open via CSS + JS
        * Auto-displays popup with login form visible
        * Output wrapped in `.thlogin-auto-popup-shortcode-wrapper`

        ---

        ###  `render_popup_link_shortcode( $atts, $content )`

        >  **Internal use or optional shortcode (not registered in constructor)**

        Generates a link or auto-popup for triggering the modal from any anchor.

        **Accepted attributes:**

        * `type`: `login`, `register`, or `forgot` (default: login)
        * `text`: Link text (or inner content)
        * `class`: Additional CSS class for styling
        * `auto_open`: `true` or `false` (default: false)

        If `auto_open="true"`, it will inject a script to open the modal on DOM ready.

        ---

        ###  Extend or Customize

        If you’re a developer customizing the plugin:

        * Override templates in `templates/` for form structure
        * Hook into `thLoginFrontendData` JS object on the frontend
        * Add more shortcodes via the same class or external file
        * Modify output via filters (optional, not included yet)

        ---

        ###  Usage Example

        **1. Show login form on a page:**
            [thlogin_form]
        **2. Render register form inline:**
            [th_register_form]
        **3. Inline toggle form:**
            [thlogin_combined_form]
        **4. Auto-popup on page load:**
            [thlogin_popup_auto]


File:includes/class-thlogin-security.php

    ### Registered Hooks

    | Hook                | Type   | Description                                           |
    | ------------------- | ------ | ----------------------------------------------------- |
    | `template_redirect` | Action | Handles email verification via query arguments        |
    | `wp_login_failed`   | Action | Logs failed login attempts (IP + username)            |
    | `authenticate`      | Filter | Blocks login after threshold exceeded                 |
    | `init`              | Action | Enables brute force debug via URL parameter           |
    | `rest_api_init`     | Action | Registers `/wp-json/thlogin/v1/lockout` REST endpoint |


    ### Brute Force Protection

        * Tracks failed login attempts using a transient: `thlogin_failed_attempts`
        * Monitors both IP and username attempts
        * Lockout threshold and duration are stored in settings:

            thlogin_settings['security']['brute_force_protection'] = [
                'enabled' => true,
                'max_attempts' => 5,
                'lockout_duration_minutes' => 30,
            ];

        * Lockout response:
            new WP_Error( 'thlogin_locked_out', __( 'Too many failed login attempts. Please try again after X minutes.', 'themehunk-login-registration' ) );

        * Debugging View:
            Visit `/wp-admin/?thlogin_debug=1` (requires `manage_options` capability) to print all active failed attempts.


        ### reCAPTCHA Verification

            * Method: `verify_recaptcha( $token, $expected_action = 'login' )`
            * Supports `v2` and `v3` reCAPTCHA types
            * Validates server-side using Google’s API
            * Returns:

            * `true` on success
            * `WP_REST_Response` (HTTP 400) on failure


        Settings format:
            thlogin_settings['security']['recaptcha'] = [
                'enabled' => true,
                'type' => 'v2' or 'v3',
                'secret_key' => 'YOUR_SECRET_KEY'
            ];


            ### Email Verification
                * Triggered via URL:
                    - Validates `thlogin_email_verification_key` stored in user meta
                    - If matched:
                    - Sets `thlogin_email_verified = true`
                    - Deletes the verification key
                    - Redirects to `/?thlogin_email_verified=success`
                    - On failure, redirects to `/?thlogin_email_verified=failed`


        ### REST API: Lockout Info
            GET /wp-json/thlogin/v1/lockout?username=admin
                - Returns JSON response:
                {
                "locked_out": true,
                "remaining_time": 120,
                "remaining_mins": 2,
                "message": "You are blocked for 120 more seconds."
                }

        ### Developer Utilities

        * `get_user_ip_address()` – Detects client IP safely from headers
        * `debug_failed_attempts_viewer()` – Prints all active attempts (admin only)

        This class is extendable and useful for building custom security flows, showing lockout notices on login UIs, or integrating with frontend logic via the exposed REST API.


File: THLogin_Menu_Integration

    Registers a filter hook:
        wp_nav_menu_items → add_login_register_logout_links
        Method: `add_login_register_logout_links( $items, $args )

    Parameters:
        `$items` *(string)*: HTML of existing menu items
        `$args` *(object)*: WP\_Nav\_Menu arguments object (including theme location, etc.)

    ### Logic:
    1. **Check Plugin Settings:**
        * Loads settings from `thlogin_settings['display_triggers']['menu_integration']`
        * Checks if integration is enable
    2. **Menu Target Matching:**
        * Verifies if the current menu matches the specified `menu_slug` (or if `all` is set)
    3. **Login/Register/Logout Button Generation:**
        * **Logged-in Users:** Adds logout link
        * Optionally hides login/register links based on `visibility_login_logged_in` and `visibility_register_logged_in`
        * **Logged-out Users:** Adds login and (if allowed) register links
        * Uses `users_can_register` option
        * Each link uses popup triggers (`data-th-popup-action="login|register"`)
    4. **Icon Support:**
        * Uses dashicons for login, register, and logout icons, customizable via settings
    5. **HTML Injection:**
        * Appends the generated menu items at the end of the existing menu list.

    ## Settings Used:

        Under `thlogin_settings['display_triggers']['menu_integration']`

        * `enabled` *(bool)*: Toggle feature
        * `menu_slug` *(string)*: Target menu slug or theme location (e.g., `primary`, `footer`, or `all`)
        * `item_text_login` *(string)*: Text for login link
        * `item_text_register` *(string)*: Text for register link
        * `item_icon_login` *(string)*: Dashicon class for login icon
        * `item_icon_register` *(string)*: Dashicon class for register icon
        * `visibility_login_logged_in` *(bool)*: Whether to hide login link if user is logged in
        * `visibility_register_logged_in` *(bool)*: Whether to hide register link if user is logged in


    ## Useful Filters
        * `wp_nav_menu_items`: Core WP filter used to modify menu HTML before render.

    ##  Recommended Enhancements
        * Allow reordering of login/register/logout links
        * Optionally insert links at a specific position instead of appending
        * Support custom icons (SVG or image URLs)


File: Sanitization and Validation Documentation
    The class is responsible for:
        * **Sanitizing** all input settings to ensure they are safe and clean before saving.
        * **Validating** input fields to ensure that the data is correct and consistent.
        * Returning a `WP_Error` object if validation fails with a list of error messages.

    ## Structure
        Each group of settings is handled in its own method:

    ### 1. `sanitize_settings( $settings )`
        * Entry point to clean all setting sections.
        * Calls individual sanitizers:

        * `sanitize_general_settings()`
        * `sanitize_design_settings()`
        * `sanitize_form_fields_settings()`
        * `sanitize_display_triggers_settings()`

    ### 2. `validate_settings( $settings )`
        * Entry point for validating all settings.
        * Returns `true` if all valid or `WP_Error` object with error messages.
        * Calls individual validators:

        * `validate_general_settings()`
        * `validate_design_settings()`
        * `validate_form_fields_settings()`
        * `validate_display_triggers_settings()`

    ## Sanitization Details
        ### General Settings
            * **`default_form_type`**: Ensures value is `login`, `register`, or `forgot_password`.
            * **`default_register_role`**: Stored as-is (but should be validated against editable roles).
            * **`enable_woo_redirect`** and similar booleans: Converted to true/false.

        ### Design Settings
            * Sanitizes typography fields (`fontWeight`, `fontSize`, `lineHeight`, etc.).
            * Sanitizes padding and border radius values.
            * Uses `sanitize_color()` to validate and clean color codes.
            * Supports gradients, rgba, and hex.

        ### Form Fields Settings
            * **`hide_labels`** and similar toggles: cast to boolean.
            * **`label_position`, `field_style`**: Whitelist checks.
            * **Field Visibility Arrays**: Arrays cleaned with `sanitize_text_field()`.

        ### Display Triggers Settings
            * Cleans values for button and trigger selectors.
            * Accepts `on_load`, `on_click`, `on_scroll`, etc.
            * Supports time delays and scroll percentages.

    ## Validation Details
            Each field is validated for:
                * **Type constraints**: e.g., font weight must be a number.
                * **Allowed values**: Dropdowns only accept defined values.
                * **Field completeness**: Required fields must not be empty.
                * **Logical ranges**: Padding must be >= 0.

        ### Example Validation:
            if ( ! in_array( $settings['general']['default_form_type'], [ 'login', 'register', 'forgot_password' ], true ) ) {
                $errors->add( 'invalid_form_type', __( 'Invalid default form type selected.', 'themehunk-login-registration' ) );
            }


    ### Error Format:
        If validation fails, a `WP_Error` is returned:
        return new WP_Error(
            'validation_errors',
            __( 'There were validation errors.', 'themehunk-login-registration' ),
            $errors->get_error_messages()
        );


    ## Extending the System
        To add a new section (e.g., `email_settings`):
        1. Create `sanitize_email_settings()` and `validate_email_settings()` methods.
        2. Update `sanitize_settings()` and `validate_settings()` to call them.
        3. Use helper functions like `sanitize_text_field()`, `sanitize_email()`, and `sanitize_color()`.

    ## Helper Methods Used
        * `sanitize_text_field()` – for basic text inputs.
        * `filter_var( $val, FILTER_VALIDATE_EMAIL )` – for email validation.
        * `sanitize_hex_color()` – for hex color codes.
        * `preg_match()` – for validating CSS values like `rgba()` or gradients.
        * `wp_strip_all_tags()` – for stripping tags from text.

    ## Recommendations for Developers
        * Always sanitize values even if they come from trusted sources.
        * Use `WP_Error` to report multiple errors in a structured way.
        * Avoid saving raw user input—clean and validate everything.
        * Keep defaults in a centralized defaults class to avoid logic duplication.
        * Make reusable validator methods for typography, spacing, and colors.

    ## Final Notes
        The `TH_Sanitization_Validation` class ensures your plugin's settings are robust, safe, and user-proof. This helps avoid frontend rendering issues, invalid configurations, and security vulnerabilities.

Hooks-  
    Modal-wrapper.php
        thlogin_before_modal_content - Inject before .form-container	 -Just inside modal wrapper <div>
        thlogin_before_forms	     - Inject before forms	             -Before $login_form->render()
        thlogin_after_forms	         - Inject after all forms	         -After $forgot_form->render()
        thlogin_after_modal_content	 - Inject at the bottom of modal	 -Before closing </div>
    Login-form.php
        thlogin_before_login_form    – Inject before <form> starts        – Just inside .thlogin-form--login
        thlogin_after_login_form     – Inject after </form> ends          – Before closing .thlogin-form--login
    Register-form.php
        thlogin_before_register_form  – Inject before <form> starts        – Just inside .thlogin-form--register
        thlogin_after_register_form   – Inject after </form> ends          – Before closing .thlogin-form--register
    forgot-password-form.php
        thlogin_before_forgot_password_form	   - Inject before form starts Before <form> tag
        thlogin_after_forgot_password_form	   - Inject after form ends	After </form> but inside wrapper
