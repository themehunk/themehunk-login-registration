import { useState, useEffect, useRef } from "@wordpress/element"; // Added useRef
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import {
  Spinner,
  Button,
} from "@wordpress/components";
import "./index.scss";
import GeneralSettings from './components/general-settings';
import DesignSettings from './components/design-settings';
import FormFieldsSettings from './components/form-feild-setiings';
import DisplayTriggersSettings from './components/display-trigger-settings';
import SecuritySettings from './components/security-settings';
import IntegrationSettings from './components/integration-settings';
import ToolsSettings from './components/tools-settings';

const TABS = [
  {
    id: "general",
    label: __("General", "th-login"),
    icon: "admin-settings"
  },
  {
    id: "design",
    label: __("Design", "th-login"),
    icon: "art"
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

// Main React App Component
const App = () => {
  const [settings, setSettings] = useState({
    general: {
      plugin_status: "enabled",
      disable_wp_login_page: false,
      auto_redirect_wp_login_admin: true,
      auto_login_after_registration: false,
      redirects: {
        after_login: { type: "current_page", url: "" },
        after_logout: { type: "home_page", url: "" },
        after_register: { type: "login_form", url: "" },
        role_based_redirects: [], // Ensure this is an array
      },
      email_verification: {
        enabled: false,
        email_subject: __("Verify your email for TH Login", "th-login"),
        email_content: __(
          "Please click this link to verify: {verification_link}",
          "th-login"
        ),
        redirect_after_verification: "login_form",
        custom_redirect_url: "",
      },
      manual_user_approval: { enabled: false },
    },
    design: {
        modal: {
          layout_type: 'popup',  
          modal_background: {
            type: "image",     // 'color' | 'gradient' | 'image'
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
          form_background: {
            type: "image",     // 'color' | 'gradient' | 'image'
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
          }
        },  
    },
    form_fields: {
      login: {},
      register: { custom_fields: [] },
      forgot_password: {},
    },
    display_triggers: {
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
    },
    security: {
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
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }
  const [exportedSettings, setExportedSettings] = useState("");
  const [importSettingsText, setImportSettingsText] = useState("");
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false); // State for reset confirmation dialog
  const [activeTab, setActiveTab] = useState("general");

  const importTextareaRef = useRef(null); // Ref for import textarea

  // Fetch settings on component mount.
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiFetch({
          path: "th-login/v1/settings",
          method: "POST",
          data: { action: "fetch_settings" },
        });

        if (response.success) {
          // Deep merge fetched settings with default structure to ensure all keys exist.
          const mergedSettings = deepMerge(settings, response.settings);
          // Ensure specific arrays are initialized if missing or not array.
          if (
            !Array.isArray(mergedSettings.form_fields?.register?.custom_fields)
          ) {
            mergedSettings.form_fields.register.custom_fields = [];
          }
          if (
            !Array.isArray(
              mergedSettings.general?.redirects?.role_based_redirects
            )
          ) {
            mergedSettings.general.redirects.role_based_redirects = [];
          }
          setSettings(mergedSettings);
        } else {
          setMessage({
            type: "error",
            text:
              response.message || __("Failed to load settings.", "th-login"),
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        setMessage({
          type: "error",
          text: __("Error loading settings. Please check console.", "th-login"),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []); // Empty dependency array means this runs once on mount.

  /**
   * Helper function for deep merging objects.
   * Used to merge fetched settings with default state, ensuring all keys are present.
   */
  const deepMerge = (target, source) => {
    const output = { ...target };
    if (
      target &&
      typeof target === "object" &&
      source &&
      typeof source === "object"
    ) {
      Object.keys(source).forEach((key) => {
        // Handle arrays: if source[key] is an array, replace directly.
        // Otherwise, if it's an object, deep merge.
        // Otherwise, assign directly.
        if (Array.isArray(source[key])) {
          output[key] = source[key];
        } else if (source[key] && typeof source[key] === "object") {
          if (!(key in output)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(output[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
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
  const handleSettingChange = (category, path, value) => {
    setSettings((prevSettings) => {
      const newCategorySettings = { ...prevSettings[category] };
      let current = newCategorySettings;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (
          !current[key] ||
          typeof current[key] !== "object" ||
          Array.isArray(current[key])
        ) {
          current[key] = {}; // Initialize if not an object or if it's an array (should be object for path)
        }
        current = current[key];
      }
      current[path[path.length - 1]] = value;

      return {
        ...prevSettings,
        [category]: newCategorySettings,
      };
    });
  };

  // Handle saving settings.
  const handleSaveSettings = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const response = await apiFetch({
        path: "th-login/v1/settings",
        method: "POST",
        data: settings,
      });

      if (response.success) {
        setMessage({ type: "success", text: response.message });
        const fetchedSettings = response.settings;
        // Deep merge again to ensure the state is fully consistent with backend and defaults.
        const mergedSettings = deepMerge(settings, fetchedSettings);
        // Ensure specific arrays are initialized.
        if (
          !Array.isArray(mergedSettings.form_fields?.register?.custom_fields)
        ) {
          mergedSettings.form_fields.register.custom_fields = [];
        }
        if (
          !Array.isArray(
            mergedSettings.general?.redirects?.role_based_redirects
          )
        ) {
          mergedSettings.general.redirects.role_based_redirects = [];
        }
        setSettings(mergedSettings);
      } else {
        setMessage({
          type: "error",
          text: response.message || __("Failed to save settings.", "th-login"),
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: __("Error saving settings. Please check console.", "th-login"),
      });
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  // --- Custom Fields Management Functions ---

  const addCustomField = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      form_fields: {
        ...prevSettings.form_fields,
        register: {
          ...prevSettings.form_fields.register,
          custom_fields: [
            ...prevSettings.form_fields.register.custom_fields,
            {
              id: `custom_field_${Date.now()}`, // Unique ID
              type: "text",
              label: __("New Field", "th-login"),
              placeholder: "",
              required: false,
              map_to_user_meta: false,
              options: [], // For select/radio types
            },
          ],
        },
      },
    }));
  };

  const updateCustomField = (index, key, value) => {
    setSettings((prevSettings) => {
      const newCustomFields = [
        ...prevSettings.form_fields.register.custom_fields,
      ];
      newCustomFields[index] = {
        ...newCustomFields[index],
        [key]: value,
      };
      return {
        ...prevSettings,
        form_fields: {
          ...prevSettings.form_fields,
          register: {
            ...prevSettings.form_fields.register,
            custom_fields: newCustomFields,
          },
        },
      };
    });
  };

  const removeCustomField = (index) => {
    setSettings((prevSettings) => {
      const newCustomFields =
        prevSettings.form_fields.register.custom_fields.filter(
          (_, i) => i !== index
        );
      return {
        ...prevSettings,
        form_fields: {
          ...prevSettings.form_fields,
          register: {
            ...prevSettings.form_fields.register,
            custom_fields: newCustomFields,
          },
        },
      };
    });
  };

  // --- Role-Based Redirects Functions ---
  const addRoleBasedRedirect = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      general: {
        ...prevSettings.general,
        redirects: {
          ...prevSettings.general.redirects,
          role_based_redirects: [
            ...prevSettings.general.redirects.role_based_redirects,
            { role: "", url: "" },
          ],
        },
      },
    }));
  };

  const updateRoleBasedRedirect = (index, key, value) => {
    setSettings((prevSettings) => {
      const newRoleBasedRedirects = [
        ...prevSettings.general.redirects.role_based_redirects,
      ];
      newRoleBasedRedirects[index] = {
        ...newRoleBasedRedirects[index],
        [key]: value,
      };
      return {
        ...prevSettings,
        general: {
          ...prevSettings.general,
          redirects: {
            ...prevSettings.general.redirects,
            role_based_redirects: newRoleBasedRedirects,
          },
        },
      };
    });
  };

  const removeRoleBasedRedirect = (index) => {
    setSettings((prevSettings) => {
      const newRoleBasedRedirects =
        prevSettings.general.redirects.role_based_redirects.filter(
          (_, i) => i !== index
        );
      return {
        ...prevSettings,
        general: {
          ...prevSettings.general,
          redirects: {
            ...prevSettings.general.redirects,
            role_based_redirects: newRoleBasedRedirects,
          },
        },
      };
    });
  };

  // --- Tools Functions ---

  const handleExportSettings = () => {
    // Create a copy of settings, remove sensitive info if any (e.g., reCAPTCHA secret key).
    // For now, we'll export everything.
    const settingsToExport = JSON.stringify(settings, null, 2); // Pretty print JSON
    setExportedSettings(settingsToExport);
    // Optionally, copy to clipboard automatically.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(settingsToExport)
        .then(() =>
          setMessage({
            type: "success",
            text: __("Settings copied to clipboard!", "th-login"),
          })
        )
        .catch(() =>
          setMessage({
            type: "error",
            text: __(
              "Failed to copy settings to clipboard. Please copy manually.",
              "th-login"
            ),
          })
        );
    } else {
      setMessage({
        type: "info",
        text: __(
          "Please manually copy the settings from the text area below.",
          "th-login"
        ),
      });
      if (importTextareaRef.current) {
        importTextareaRef.current.select();
      }
    }
  };

  const handleImportSettings = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const importedData = JSON.parse(importSettingsText);
      // Basic validation to ensure it's a valid settings structure.
      if (
        typeof importedData !== "object" ||
        !importedData.general ||
        !importedData.design
      ) {
        throw new Error(
          __(
            "Invalid settings format. Please provide a valid JSON object.",
            "th-login"
          )
        );
      }

      const response = await apiFetch({
        path: "th-login/v1/settings",
        method: "POST",
        data: importedData, // Send the imported data directly
      });

      if (response.success) {
        setMessage({ type: "success", text: response.message });
        const fetchedSettings = response.settings;
        const mergedSettings = deepMerge(settings, fetchedSettings);
        if (
          !Array.isArray(mergedSettings.form_fields?.register?.custom_fields)
        ) {
          mergedSettings.form_fields.register.custom_fields = [];
        }
        if (
          !Array.isArray(
            mergedSettings.general?.redirects?.role_based_redirects
          )
        ) {
          mergedSettings.general.redirects.role_based_redirects = [];
        }
        setSettings(mergedSettings);
        setImportSettingsText(""); // Clear textarea after successful import
      } else {
        setMessage({
          type: "error",
          text:
            response.message || __("Failed to import settings.", "th-login"),
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.message ||
          __(
            "Error parsing or importing settings. Please ensure valid JSON.",
            "th-login"
          ),
      });
      console.error("Error importing settings:", error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleResetSettings = async () => {
    setIsResetConfirmOpen(false); // Close confirmation dialog
    setIsSaving(true);
    setMessage(null);
    try {
      const response = await apiFetch({
        path: "th-login/v1/reset-settings", // New endpoint for reset
        method: "POST",
      });

      if (response.success) {
        setMessage({ type: "success", text: response.message });
        // Re-fetch settings to load the newly reset defaults
        const fetchResponse = await apiFetch({
          path: "th-login/v1/settings",
          method: "POST",
          data: { action: "fetch_settings" },
        });
        if (fetchResponse.success) {
          const mergedSettings = deepMerge(settings, fetchResponse.settings);
          if (
            !Array.isArray(mergedSettings.form_fields?.register?.custom_fields)
          ) {
            mergedSettings.form_fields.register.custom_fields = [];
          }
          if (
            !Array.isArray(
              mergedSettings.general?.redirects?.role_based_redirects
            )
          ) {
            mergedSettings.general.redirects.role_based_redirects = [];
          }
          setSettings(mergedSettings);
        }
      } else {
        setMessage({
          type: "error",
          text: response.message || __("Failed to reset settings.", "th-login"),
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: __("Error resetting settings. Please check console.", "th-login"),
      });
      console.error("Error resetting settings:", error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="th-login-admin-wrap">
        <div className="th-login-loader">
          <div className="th-login-loader-circle"></div>
          <div className="th-login-loader-circle"></div>
          <div className="th-login-loader-circle"></div>
          <div className="th-login-loader-circle"></div>
        </div>
        <p className="th-login-loading-text">{__("Loading settings...", "th-login")}</p>
      </div>
    );
  }

  return (
    <div className="th-login-admin-modern">
      {/* Header Section */}
      <div className="admin-header">
        <div className="header-content">
          <h2>
            <span className="th-logo">TH</span>
            {__("Login Settings", "th-login")}
          </h2>
          {message && (
            <div className={`notice-banner ${message.type}`}>
              <p>{message.text}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="admin-container">
        {/* Side Navigation */}
        <nav className="admin-sidebar">
            <ul>
                {TABS.map((tab) => (
                <li key={tab.id} className={activeTab === tab.id ? "active" : ""}>
                    <button onClick={() => setActiveTab(tab.id)}>
                    <i className={`dashicons dashicons-${tab.icon}`}></i>
                    {tab.label}
                    </button>
                </li>
                ))}
            </ul>
        </nav>

        {/* Content Area */}
        <div className="admin-content">
          {/* General Settings Section */}

          {activeTab === "general" && (
            <GeneralSettings 
              settings={settings} 
              handleSettingChange={handleSettingChange}
              addRoleBasedRedirect={addRoleBasedRedirect}
              updateRoleBasedRedirect={updateRoleBasedRedirect}
              removeRoleBasedRedirect={removeRoleBasedRedirect}
            />
          )}

          {activeTab === "design" && (
            <DesignSettings 
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          )}

          {activeTab === "form-fields" && (
            <FormFieldsSettings
              settings={settings}
              handleSettingChange={handleSettingChange}
              addCustomField={addCustomField}
              updateCustomField={updateCustomField}
              removeCustomField={removeCustomField}
            />
          )}

          {activeTab === "display-triggers" && (
            <DisplayTriggersSettings
                settings={settings}
                handleSettingChange={handleSettingChange}
            />
          )}

          {activeTab === "security" && (
            <SecuritySettings
                settings={settings}
                handleSettingChange={handleSettingChange}
            />
          )}

          {activeTab === "integration" && (
            <IntegrationSettings 
                settings={settings}
                handleSettingChange={handleSettingChange}
            />
          )}

          {activeTab === "tools" && (
            <ToolsSettings
                settings={settings}
                exportedSettings={exportedSettings}
                setExportedSettings={setExportedSettings}
                importSettingsText={ importSettingsText}
                setImportSettingsText={setImportSettingsText}
                handleExportSettings={handleExportSettings}
                handleImportSettings={handleImportSettings}
                isSaving={isSaving}
                setIsResetConfirmOpen={setIsResetConfirmOpen}
            />
          )}

          {/* Save Button */}
          <div className="save-settings">
            <Button
              isPrimary
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="save-button"
            >
              {isSaving ? (
                <Spinner />
              ) : (
                <i className="dashicons dashicons-yes"></i>
              )}
              {__("Save Changes", "th-login")}
            </Button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>{__("Reset All Settings?", "th-login")}</h3>
            <p>
              {__(
                "This will restore all settings to default values. This cannot be undone.",
                "th-login"
              )}
            </p>
            <div className="modal-actions">
              <Button
                isSecondary
                onClick={() => setIsResetConfirmOpen(false)}
                className="cancel-button"
              >
                {__("Cancel", "th-login")}
              </Button>
              <Button
                isDestructive
                onClick={handleResetSettings}
                className="confirm-button"
              >
                {__("Reset Settings", "th-login")}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;

