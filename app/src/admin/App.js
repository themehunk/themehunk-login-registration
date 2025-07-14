import { useState, useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import {Spinner, Button} from "@wordpress/components";
import "./index.scss";
import GeneralSettings from './components/general-settings';
import DesignSettings from './components/design-setings';
import FormFieldsSettings from './components/form-feild-setiings';
import DisplayTriggersSettings from './components/display-trigger-settings';
import SecuritySettings from './components/security-settings';
import IntegrationSettings from './components/integration-settings';
import ToolsSettings from './components/tools-settings';
import { TABS, general, form_fields, design, display_triggers, security } from "./contant";

const App = () => {
  
  const [settings, setSettings] = useState({
    general: general,
    design: design,
    form_fields: form_fields,
    display_triggers: display_triggers,
    security: security,
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
              // addCustomField={addCustomField}
              // updateCustomField={updateCustomField}
              // removeCustomField={removeCustomField}
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
        </div>
      </div>

      <div className="save-settings">
            <Button
              isPrimary
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="save-button"
            >
              {isSaving && (
                <Spinner />
              )}
              {__("Save Changes", "th-login")}
            </Button>
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