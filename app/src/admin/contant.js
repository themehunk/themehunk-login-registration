import { __ } from "@wordpress/i18n";

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
      form_type: 'double',
      display_mode:'popup',
      default_register_role: 'subscriber', 
      auto_login_after_registration: false,
      close_button:true,
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
    modal_border: {
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
    },
    modal_padding :{
      top:10,
      left:10,
      right:10,
      bottom:10,
    }
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
    },
    form_padding :{
      top:10,
      left:10,
      right:10,
      bottom:10,
    }
  }, 
  heading:{
    color:"#000000",
    typography:{size: "10px", fontWeight: 500}
  },
  Input:{
    color:"#000000",
    background:"#111",
    activeBackground:"",
    typography:{size: "10px", fontWeight: 500}
  },
  button:{
    color:"#111",
    background:"#000000",
    hoverBackground:"",
    padding:{ top:10, left:10, right:10, bottom:10},
    typography:{size: "10px",fontWeight: 500},
    border: {
      width: { top: 1, right: 1, bottom: 1, left: 1 },
      style: "solid",
      color: "#000000",
      radius: { topLeft: 6, topRight: 6, bottomRight: 6, bottomLeft: 6}
    },
  }
};

export  const display_triggers = {
      trigger_css_class: "th-login-trigger",
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
          param_name: "th_login",
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
    site_key: "",
    secret_key: "",
  },
  honeypot_enabled: true,
};