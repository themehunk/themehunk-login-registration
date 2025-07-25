import { __ } from "@wordpress/i18n";

//app
export const TABS = [
  {
    id: "general",
    label: __("General", "th-login"),
    icon: "admin-settings"
  },
   {
    id: "form-fields",
    label: __("Form Fields", "th-login"),
    icon: "feedback"
  },
  {
    id: "display-triggers",
    label: __("Display Triggers", "th-login"),
    icon: "visibility"
  },
  {
    id: "design",
    label: __("Design", "th-login"),
    icon: "art"
  },
  {
    id: "integration",
    label: __("Integration", "th-login"),
    icon: "admin-plugins"
  },
  {
    id: "security",
    label: __("Security", "th-login"),
    icon: "shield"
  },
  {
    id: "tools",
    label: __("Tools", "th-login"),
    icon: "admin-tools"
  }
];

export const general = {
      plugin_status: "enabled",
      replace_wordpress: true,
      form_type: 'double',
      display_mode:'page',
      default_register_role: 'subscriber', 
      auto_login_after_registration: false,
      close_button:true,
      allow_user_registration: false,
      redirects: {
        after_login: { type: "current_page", url: "" },
        after_logout: { type: "home_page", url: "" },
        after_register: { type: "current_page", url: "" },
        role_based_redirects: [], // Ensure this is an array
      },
      manual_user_approval: { enabled: false },
};

export  const form_fields = {
  login: [
    {
      id: 'username',
      label: 'Username or Email',
      name: 'username',
      type: 'text',
      placeholder: 'Enter your username or email',
      required: true,
      icon: 'user',
      error_message: 'Username or email is required.',
      predefined:true,
    },
    {
      id: 'password',
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
      icon: 'lock',
      error_message: 'Password is required.',
      predefined:true,
    },
    {
      id: 'remember_me',
      label: 'Remember Me',
      name: 'remember_me',
      type: 'checkbox',
      required: false,
      icon: '',
      show: true,
      error_message: '',
      predefined:true,
    },
  ],

  register: [
    {
      id: 'username',
      label: 'Choose a Username',
      name: 'username',
      type: 'text',
      placeholder: 'Enter your desired username',
      required: true,
      icon: 'user',
      error_message: 'Username is required.',
      predefined:true,
    },
    {
      id: 'email',
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      icon: 'email',
      error_message: 'Email address is required.',
      predefined:false,
    },
    {
      id: 'password',
      label: 'Create Password',
      name: 'password',
      type: 'password',
      placeholder: 'Create a strong password',
      required: true,
      icon: 'lock',
      check: { text: true, number: false, special_charcter: false },
      maxInput: 20,
      minInput: 5,
      error_message: 'Password is required.',
      predefined:true,
    },
    {
      id: 'confirm_password',
      label: 'Confirm Password',
      name: 'confirm_password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true,
      icon: 'lock',
      error_message: 'Please confirm your password.',
      predefined:true,
    },
    {
      id: 'first_name',
      label: 'First Name',
      name: 'first_name',
      type: 'text',
      placeholder: 'Your first name',
      required: false,
      icon: 'user',
      show: false,
      error_message: 'First name is required.',
      predefined:false,
    },
    {
      id: 'last_name',
      label: 'Last Name',
      name: 'last_name',
      type: 'text',
      placeholder: 'Your last name',
      required: false,
      icon: 'user',
      show: false,
      error_message: 'Last name is required.',
      predefined:false,
    },
    {
      id: 'terms_and_conditions',
      label: 'I agree to the Terms & Conditions',
      name: 'terms_and_conditions',
      type: 'checkbox',
      required: true,
      icon: '',
      show: true,
      error_message: 'You must agree to the Terms & Conditions.',
      predefined:false,
      link:""
    },
    {
      id: 'honeypot',
      label: '',
      name: 'honeypot',
      type: 'text',
      icon: '',
      show: false,
      hidden: true,
      error_message: '',
    },
  ],

  forgot_password: [
    {
      id: 'user_login',
      label: 'Email Address',
      name: 'user_login',
      type: 'text',
      placeholder: 'Enter your email to reset password',
      required: true,
      icon: 'email',
      error_message: 'Email address is required to reset password.',
      predefined:true,
    },
  ],
};

export  const design = {
  modal: {
    modal_background: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#ffffff",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      opacity:1,
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
  }, 
  form : {
    form_background: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#ffffff",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      opacity:1,
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    form_border: {
      width: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      style: "solid",
      color: "#000000",
      radius: {
        topLeft: 6,
        topRight: 6,
        bottomRight: 6,
        bottomLeft: 6
      }
    },
    form_padding :{
      top:15,
      left:50,
      right:50,
      bottom:15,
    },
    form_gap:12,
  }, 
  heading:{
    color:"#000000",
    typography:{size: "25px", fontWeight: 700}
  },
  Input:{
    color:"#000000",
    labelcolor:"#000000",
    labeltypography:{size: "15px", fontWeight: 300},
    background:"#EEEcec",
    typography:{size: "12px", fontWeight: 300}
  },
  button:{
    color:"#ffffff",
    background:"#0B59f4",
    hoverBackground:"#1c21ba",
    padding:{ top:6, left:15, right:10, bottom:15},
    typography:{size: "14px",fontWeight: 500},
    border: {
      width: { top: 0, right: 0, bottom: 0, left: 0 },
      style: "solid",
      color: "#000000",
      radius: { topLeft: 5, topRight: 5, bottomRight: 5, bottomLeft: 5}
    },
  },
  rememberme:{
    color:"#000000",
    checkboxbackground:"#ffffff",
    typography:{size: "12px",fontWeight: 300},
  },
  icon:{
    color:"#111111",
    size:"20px",
    icon_position: "with-label"
  },
  header:{
    button:{
      color:"#ffffff",
      background:"#0B59f4",
      hoverBackground:"#1c21ba",
      padding:{ top:8, left:12, right:12, bottom:8},
      typography:{size: "14px",fontWeight: 500},
      border: {
        width: { top: 0, right: 0, bottom: 0, left: 0 },
        style: "solid",
        color: "#000000",
        radius: { topLeft: 5, topRight: 5, bottomRight: 5, bottomLeft: 5}
      },
    },
    cancel_button:{
      color:"#f31212",
      background:"#E6e6e6",
      hoverBackground:"#9a9a9e",
      padding:{ top:3, left:3, right:3, bottom:3},
      typography:{size: "14px",fontWeight: 500},
      border: {
        width: { top: 0, right: 0, bottom: 0, left: 0 },
        style: "solid",
        color: "#000000",
        radius: { topLeft: 20, topRight: 20, bottomRight: 20, bottomLeft: 20}
      },
    }
  }
};

export  const display_triggers = {
      trigger_css_class: "thlogin-trigger",
      auto_open_on_load: { enabled: true, delay_seconds: 2 },
      auto_open_on_scroll: { enabled: false, scroll_percentage: 50 },
      auto_open_on_exit_intent: { enabled: false },
      auto_open_on_time_on_page: { enabled: false, time_seconds: 10 },
      auto_open_conditions: {
        for_logged_out_only: true,
        for_specific_roles: [],
        on_specific_pages: { enabled: false, page_ids: [], page_slugs: [] },
        on_specific_categories: {
          enabled: false,
          category_ids: [],
          category_slugs: [],
        },
        on_specific_tags: { enabled: false, tag_ids: [], tag_slugs: [] },
        on_woocommerce_myaccount: false,
        on_woocommerce_checkout: false,
        device_visibility: { desktop: true, tablet: true, mobile: true },
        url_parameter_trigger: {
          enabled: false,
          param_name: "thlogin",
          param_value: "open",
        },
        referrer_detection: { enabled: false, referrer_urls: [] },
      },
      pop_up_frequency: { enabled: false, type: "session", days: 7 },
      menu_integration: {
        enabled: false,
        menu_slug: "primary",
        item_text_login: __("Login", "th-login"),
        item_text_register: __("Register", "th-login"),
        item_icon_login: "dashicons-admin-users",
        item_icon_register: "dashicons-plus-alt",
        visibility_login_logged_in: false,
        visibility_register_logged_in: false,
      },
};

export const integration = {
  woocommerce: {
    enabled: true,
  },
};

export  const security = {
  brute_force_protection: {
    enabled: true,
    max_attempts: 5,
    lockout_duration_minutes: 30,
    auto_ip_blacklist_enabled: true,
  },
  recaptcha: {
    enabled: false,
    type: "v2_checkbox",
    show_on:"all",
    site_key: "",
    secret_key: "",
  },
  honeypot_enabled: true,
  email_verification: {
    enabled: false,
    from_name: '',
    from_email: '',
    email_subject: 'Verify your email',
    email_content: 'Click the link below to verify your email: {verification_link}'
  }

};

//deisgn-settings
export const tabs = [
  { key: "login", label: __("Login", "th-login") },
  { key: "register", label: __("Register", "th-login") },
  { key: "forgot_password", label: __("Forgot", "th-login") },
];

export const layoutOptions = [
  {
    key: "page",
    icon: "admin-page", // more appropriate than "align-center"
    label: __("Page/ShortCode", "th-login"),
    demoClass: "page",
  },
  {	
    key: "popup",
    icon: "align-center",
    label: __("Popup", "th-login"),
    demoClass: "popup",
  },
  {
    key: "slide_in_left",
    icon: "align-pull-left",
    label: __("Slide-in-left", "th-login"),
    demoClass: "slide-left",
  },
  {
    key: "slide_in_right",
    icon: "align-pull-right",
    label: __("Slide-in-right", "th-login"),
    demoClass: "slide-right",
  },
];

export const fontWeightOptions = [
  { label: __("Normal", "th-login"), value: 300 },
  { label: __("Medium", "th-login"), value: 500 },
  { label: __("Semi-Bold", "th-login"), value: 700 },
  { label: __("Bold", "th-login"), value: 900 },
];

//general-settings
export const shortcodes = [
    {
      label: __("Login Form", "th-login"),
      shortcode: "[thlogin_form]",
      description: __("Displays only the login form", "th-login"),
    },
    {
      label: __("Register Form", "th-login"),
      shortcode: "[th_register_form]",
      description: __("Displays only the register form", "th-login"),
    },
    {
      label: __("Forgot Password Form", "th-login"),
      shortcode: "[th_forgot_password_form]",
      description: __("Displays only the forgot password form", "th-login"),
    },
    {
      label: __("Combined Modal", "th-login"),
      shortcode: "[thlogin__combined_form]",
      description: __("Shows the full login/register/forgot modal and auto-triggers it", "th-login"),
    },
        {
            label: __("Popup Link", "th-login"),
            shortcode : "[thlogin_popup_auto]",
            description:__("Use this link to generate popup link.")
        }
];