=== Themehunk Login Registration ===
Contributors: ThemeHunk  
Tags: login, registration, popup, WooCommerce, frontend login
Requires at least: 5.8  
Tested up to: 6.8  
Requires PHP: 7.4  
Stable tag: 1.0.2  
License: GPLv2 or later  
License URI: https://www.gnu.org/licenses/gpl-2.0.html  

A powerful, secure, and highly customizable frontend login, registration, and password reset plugin with popup support and WooCommerce integration.

== Description ==

**Themehunk Login Registration** transforms your WordPress site's authentication flow with modern, user-friendly frontend login, registration, and password reset forms—without touching the WordPress admin.

Designed with flexibility and performance in mind, Themehunk Login Registration lets you display forms in popups or directly on pages, fully customize their appearance, and control user behavior after login or registration. Built for compatibility with WooCommerce and Gutenberg, it’s the ideal solution for membership sites, eCommerce stores, and user-driven communities.

🎯 **Key Features**
* 🔐 Frontend login, registration & password reset forms
* 🎨 Fully customizable design: colors, backgrounds, typography, borders, spacing
* 💬 Popup or inline display modes
* 🛒 Seamless WooCommerce integration
* 🛡️ Advanced security: reCAPTCHA v2, honeypot, brute force protection
* 🔁 Role-based redirection after login, logout, registration
* 🧾 Manual user approval & email verification (optional)
* ⚙️ Add and manage custom registration fields
* 📱 Mobile-responsive design
* 🔗 Navigation menu integration with login/logout links
* ⚡ Auto popup triggers: on delay, scroll, or exit intent

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/themehunk-login-registration` or install it directly from the WordPress plugin repository.
2. Activate the plugin through the "Plugins" menu in WordPress.
3. Go to **Settings > Themehunk Login Registration** to configure login, registration, design, and behavior.

== Frequently Asked Questions ==

= Is Themehunk Login Registration free? =  
Yes! Themehunk Login Registration is completely free and includes all core features.

= Can I use this with my existing theme? =  
Absolutely. Themehunk Login Registration works with all modern WordPress themes and page builders.

= How do I display the login popup? =  
You can add the CSS class `thlogin-trigger` to any button or link. You can also enable auto-popup triggers in the settings.

= Does it work with WooCommerce? =  
Yes, Themehunk Login Registration integrates seamlessly with WooCommerce’s account and checkout flows.

= Can I customize form fields and layout? =  
Yes! You can manage form fields, toggle visibility, and apply your own styles using the built-in design editor.

= Is reCAPTCHA supported? =  
Yes, Themehunk Login Registration supports Google reCAPTCHA v2 for login, registration, and password reset forms.

= Can I approve users manually before login? =  
Yes. You can enable manual user approval from the settings.

== Screenshots ==

1. Login form with customizable design
2. Registration form with custom fields
3. Password reset flow
4. Popup login modal
5. Admin settings panel
6. Design customization interface
7. WooCommerce integration in My Account area

== External services ==

This plugin integrates with the following third-party services:

### Google reCAPTCHA

- **What the service is and what it is used for**:  
  Google reCAPTCHA is used to protect the WordPress login form from automated bot attacks. It helps to ensure that only human users can attempt to log in.

- **What data is sent and when**:  
  The plugin sends a reCAPTCHA verification token to Google's API whenever a login attempt is made (if reCAPTCHA is enabled). This token is used to validate that the login attempt is from a human user.

- **Links to the service's terms of service and privacy policy**:  
  - Terms of Service: [https://www.google.com/recaptcha/intro/v3.html](https://www.google.com/recaptcha/intro/v3.html)
  - Privacy Policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)

### How reCAPTCHA works in this plugin:

- **On Login Form**: When a user attempts to log in, if the reCAPTCHA is enabled, the plugin will send a request to Google's reCAPTCHA API to verify if the submitted token is valid.
- **On Failed Login Attempts**: In case of repeated failed login attempts, the plugin may block the IP or username temporarily, as part of the brute-force protection. The reCAPTCHA check ensures that only valid users (humans) can proceed to the login page.
- **What data is sent**: The plugin sends the user's IP address and the reCAPTCHA verification token (if applicable) to Google for validation.


== Frequently Asked Questions ==

= How do I enable reCAPTCHA on my login page? =

1. Navigate to the plugin settings under "Settings" > "Themehunk Login Registration Security".
2. Enable reCAPTCHA and enter your Google reCAPTCHA site key and secret key.
3. Save changes and reCAPTCHA will be active on your login page.

= Can I disable reCAPTCHA? =

Yes, you can disable reCAPTCHA by unchecking the reCAPTCHA option in the plugin settings.

== Changelog ==
= 25-09-2025 =
Plugin Name Changed.
Plugin text-domain changed.
escaping in where it is required.


= 1.0.2 =
* Update: Text domain changed.
* Update: Review Issues resolved.
* Update: Prefix checked and updated.
* Update: wp_register_script used to register scripts.

= 1.0.1 =
* class-thlogin-rest-api.php permission_callback issues resolved.

= 1.0.0 =
* Initial release with complete frontend login, registration, and password reset flow.
* Fully customizable popup and inline form layouts.
* WooCommerce integration.
* reCAPTCHA, honeypot, and brute force protection.
* Role-based redirection, menu link login/logout support.
* Auto-display popups and manual user approval options.
* Languages Folder Added.

== Upgrade Notice ==

= 1.0.1 =
* class-thlogin-rest-api.php permission_callback issues resolved.

