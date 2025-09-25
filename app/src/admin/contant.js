import { __ } from "@wordpress/i18n";

//app
export const TABS = [
  {
    id: "general",
    label: __("General", "themehunk-login-registration"),
    icon: "admin-settings"
  },
   {
    id: "form-fields",
    label: __("Form Fields", "themehunk-login-registration"),
    icon: "feedback"
  },
  {
    id: "display-triggers",
    label: __("Display Triggers", "themehunk-login-registration"),
    icon: "visibility"
  },
  {
    id: "design",
    label: __("Design", "themehunk-login-registration"),
    icon: "art"
  },
  {
    id: "security",
    label: __("Security", "themehunk-login-registration"),
    icon: "shield"
  },
  {
    id: "email",
    label: __("Email Settings", "themehunk-login-registration"),
    icon: "email"
  },
  {
    id: "integration",
    label: __("Integration", "themehunk-login-registration"),
    icon: "admin-plugins"
  },
  {
    id: "tools",
    label: __("Tools", "themehunk-login-registration"),
    icon: "admin-tools"
  }
];

export const general = {
      plugin_status: "enabled",
      replace_wordpress: true,
      form_type: 'double',
      display_mode:'popup',
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
      label: '[I agree to the Terms & Conditions.]',
      name: 'terms_and_conditions',
      type: 'checkbox',
      required: true,
      icon: '',
      show: true,
      error_message: 'You must agree to the Terms & Conditions.',
      predefined:true,
      link:"",
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
      color: "#5954549c",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      filter:10,
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    modal_input_layout: "stack",
  }, 
  form : {
    form_background: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#ffffff",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
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
      top:10,
      left:35,
      right:35,
      bottom:30,
    },
    form_gap:18,
  }, 
  heading:{
    color:"#000000",
    typography:{size: "25px", fontWeight: 500}
  },
  Input:{
    color:"#8392A5",
    labelcolor:"#262626",
    activecolor: "#262626",
    labeltypography:{size: "16px", fontWeight: 500},
    background: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#ffffff",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    typography:{size: "14px", fontWeight: 300}
  },
  button:{
    color:"#ffffff",
    background:"#0B59f4",
    background: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#0B59f4",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    hoverbackground: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#1c21ba",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    hoverBackground:"#1c21ba",
    padding:{ top:12, left:12, right:12, bottom:12},
    typography:{size: "14px",fontWeight: 500},
    border: {
      width: { top: 0, right: 0, bottom: 0, left: 0 },
      style: "solid",
      color: "#000000",
      radius: { topLeft: 5, topRight: 5, bottomRight: 5, bottomLeft: 5}
    },
  },
  rememberme:{
    color:"#8392A5",
    background: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#ffffff",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    typography:{size: "14px",fontWeight: 300},
  },
  term: {
    color:"#8392A5",
    link:"#007cba ",
    typography:{size: "14px",fontWeight: 300},
  },
  icon:{
    color:"#8392A5",
    size:"17px",
    icon_position: "inside-input"
  },
  header:{
    showButtons: false, 
    loginText: "Login",
    registerText: "Register",
    button:{
      color:"#ffffff",

    background: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#0B59f4",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    hoverbackground: {
      type: "color",     // 'color' | 'gradient' | 'image'
      color: "#1c21ba",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      image: {
        url: "",         // Image URL
        position: "center center",  // e.g. 'top left', 'center center'
        size: "cover",   // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
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

      background: {
        type: "color",     // 'color' | 'gradient' | 'image'
        color: "#E6e6e6",
        gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
        image: {
          url: "",         // Image URL
          position: "center center",  // e.g. 'top left', 'center center'
          size: "cover",   // 'cover' | 'contain' | 'auto'
          repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
        }
      },

      hoverbackground: {
        type: "color",     // 'color' | 'gradient' | 'image'
        color: "#9a9a9e",
        gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
        image: {
          url: "",         // Image URL
          position: "center center",  // e.g. 'top left', 'center center'
          size: "cover",   // 'cover' | 'contain' | 'auto'
          repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
        }
      },

      padding:{ top:3, left:3, right:3, bottom:3},
      typography:{size: "14px",fontWeight: 500},
      border: {
        width: { top: 0, right: 0, bottom: 0, left: 0 },
        style: "solid",
        color: "#000000",
        radius: { topLeft: 20, topRight: 20, bottomRight: 20, bottomLeft: 20}
      },
    }
  },
  submitButton: {
    login: "Login",
    register: "Register",
    forgot_password: "Reset"
  },
  logo:{
    size:"30px",
    color:"black",
    url: "",
  }
};

export  const display_triggers = {
      trigger_css_class: "thlogin-trigger",
      auto_open_on_load: { enabled: true, delay_seconds: 2, max_views: 2 },
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
      pop_up_frequency: { enabled: true, type: "session", days: 7 },
      menu_integration: {
        enabled: false, 
        item_text_login: __("Login", "themehunk-login-registration"), 
        item_icon_login: "", 

        logout: true, 
        item_text_logout: __("Logout", "themehunk-login-registration"), 
        item_icon_logout: "", 
      }

};

export const integration = {
  woocommerce: {
    enabled: true,
  },
  wordpress:{
    enabled: false,
    url:"login",
    form_type: "double",
  },
  smtp:{
    enabled: false,
  }
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
    from_type:"wordpress",
    from_name: '',
    from_email: '',
    email_subject: 'Verify your email',
    email_content: 'Click the link below to verify your email: {verification_link}'
  },
  session_timeout: {
    enabled: true,
    duration: 15,
    show_warning: true,
    warning_duration: 60
  }
};

//deisgn-settings
export const tabs = [
  { key: "login", label: __("Login", "themehunk-login-registration") },
  { key: "register", label: __("Register", "themehunk-login-registration") },
  { key: "forgot_password", label: __("Forgot", "themehunk-login-registration") },
];

export const tabdeisgn = [
  { key: "design", label: __("Design", "themehunk-login-registration") },
  { key: "preview", label: __("Preview", "themehunk-login-registration") },
]

export const tabicon = [
  { key: "with-label", label: __("With Label", "themehunk-login-registration") },
  { key: "inside-input", label: __("Inside Input", "themehunk-login-registration") },
]

export const layoutOptions = [
  {
    key: "page",
    icon: "admin-page", // more appropriate than "align-center"
    label: __("Page/ShortCode", "themehunk-login-registration"),
    demoClass: "page",
  },
  {	
    key: "popup",
    icon: "align-center",
    label: __("Popup", "themehunk-login-registration"),
    demoClass: "popup",
  },
  {
    key: "slide_in_left",
    icon: "align-pull-left",
    label: __("Slide-in-left", "themehunk-login-registration"),
    demoClass: "slide-left",
  },
  {
    key: "slide_in_right",
    icon: "align-pull-right",
    label: __("Slide-in-right", "themehunk-login-registration"),
    demoClass: "slide-right",
  },
];

export const fontWeightOptions = [
  { label: __("Normal", "themehunk-login-registration"), value: 300 },
  { label: __("Medium", "themehunk-login-registration"), value: 500 },
  { label: __("Semi-Bold", "themehunk-login-registration"), value: 700 },
  { label: __("Bold", "themehunk-login-registration"), value: 900 },
];

//general-settings
export const shortcodes = [
    {
      label: __("Login Form", "themehunk-login-registration"),
      shortcode: "[thlogin_form]",
      description: __("Displays only the login form", "themehunk-login-registration"),
    },
    {
      label: __("Register Form", "themehunk-login-registration"),
      shortcode: "[th_register_form]",
      description: __("Displays only the register form", "themehunk-login-registration"),
    },
    {
      label: __("Forgot Password Form", "themehunk-login-registration"),
      shortcode: "[th_forgot_password_form]",
      description: __("Displays only the forgot password form", "themehunk-login-registration"),
    },
    {
      label: __("Combined Modal", "themehunk-login-registration"),
      shortcode: "[thlogin__combined_form]",
      description: __("Shows the full login/register/forgot modal and auto-triggers it", "themehunk-login-registration"),
    },
        {
            label: __("Popup Link", "themehunk-login-registration"),
            shortcode : "[thlogin_popup_auto]",
            description:__("Use this link to generate popup link.")
        }
];