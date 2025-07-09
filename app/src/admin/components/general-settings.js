import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl } from "@wordpress/components";
import { CustomSelectControl } from './custom-select-control';
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

const GeneralSettings = ({
  settings,
  handleSettingChange,
}) => {
  const displayMode = settings.general.display_mode || "popup";
   const [availableRoles, setAvailableRoles] = useState([
    { label: "Subscriber", value: "subscriber" }, // fallback
  ]);

  useEffect(() => {
    apiFetch({ path: "/th-login/v1/roles" }).then((roles) => {
      setAvailableRoles(roles);
    });
  }, []);

  return (
    <section className="settings-section">
        <div className="settings-card">
            <h2 className="section-title">
                <i className="dashicons dashicons-admin-settings"></i>
                {__("General Settings", "th-login")}
            </h2>

            {/* General Info */}
            <div className="settings-group">
                <h3 className="group-title">{__("General", "th-login")}</h3>
            </div>

            {/* Plugin Status */}
            <div className="setting-row">
                <div className="setting-label">
                <h3>{__("Plugin Status", "th-login")}</h3>
                <p className="description">
                    {settings.general.plugin_status === "enabled"
                    ? __("Th Login Plugin is active", "th-login")
                    : __("Th Login Plugin is inactive", "th-login")}
                </p>
                </div>
                <div className="setting-control">
                <ToggleControl
                    checked={settings.general.plugin_status === "enabled"}
                    onChange={(isChecked) =>
                    handleSettingChange("general", ["plugin_status"], isChecked ? "enabled" : "disabled")
                    }
                />
                </div>
            </div>

            {/* Login Form Type */}
            <div className="settings-group th-login-modalchoose-form">
                <h4 className="group-title">{__("Login Form Type", "th-login")}</h4>

                <div className="form-type-options">
                    {[
                    {
                        type: "single",
                        label: __("Single Form", "th-login"),
                        description: __("Only login form will be shown", "th-login"),
                    },
                    {
                        type: "double",
                        label: __("Double Form", "th-login"),
                        description: __("Users can toggle between Login and Register forms", "th-login"),
                    },
                    ].map(({ type, label, description }) => (
                    <div
                        key={type}
                        className={`form-type-card ${settings.general.form_type === type ? "active" : ""}`}
                        onClick={() => handleSettingChange("general", ["form_type"], type)}
                    >
                        <div className="form-type-mockup">
                        {type === "single" ? (
                            <div className="mockup-box">
                            <div className="mockup-header">Login</div>
                            <div className="mockup-line short"></div>
                            <div className="mockup-line"></div>
                            <div className="mockup-button"></div>
                            </div>
                        ) : (
                            <div className="mockup-box">
                            <div className="mockup-tab-row">
                                <div className="tab active">Login</div>
                                <div className="tab">Register</div>
                            </div>
                            <div className="mockup-line short"></div>
                            <div className="mockup-line"></div>
                            <div className="mockup-button"></div>
                            </div>
                        )}
                        </div>
                        <h5 className="form-type-label">{label}</h5>
                        <p className="form-type-description">{description}</p>
                    </div>
                    ))}
                </div>
            </div>

            {/* Display Mode */}
            <div className="settings-group th-login-modalchoose-form">
                <h4 className="group-title">{__("Login Display Mode", "th-login")}</h4>
                <CustomSelectControl
                value={displayMode}
                options={[
                    { label: __("Popup", "th-login"), value: "popup" },
                    { label: __("Slide-in-left", "th-login"), value: "slide_in_left" },
                    { label: __("Slide-in-right", "th-login"), value: "slide_in_right" },
                ]}
                onChange={(value) => handleSettingChange("general", ["display_mode"], value)}
                />
                
            </div>

            <div className="settings-group th-login-modalchoose-form">
                <div>
                    <h4 className="group-title">{__("Register user with role", "th-login")}</h4>
                </div>
                <CustomSelectControl
                    value={settings.general.default_register_role || "subscriber"}
                    options={availableRoles}
                    onChange={(value) =>
                    handleSettingChange("general", ["default_register_role"], value)
                    }
                />
            </div>

            <div className="setting-row">
                <div className="setting-label">
                <h3>{__("Manual User Approval", "th-login")}</h3>
                <p className="description">
                   {__("Require admin approval for new registrations", "th-login")}
                </p>
                </div>
                <div className="setting-control">
                <ToggleControl
                    checked={settings.general.manual_user_approval?.enabled || false}
                    onChange={(isChecked) =>
                    handleSettingChange("general", ["manual_user_approval", "enabled"], isChecked)
                }/>
                </div>
            </div>

            <div className="setting-row">
                <div className="setting-label">
                <h3>{__("Close Button", "th-login")}</h3>
                <p className="description">
                   {__("If true without user login the panel can close.", "th-login")}
                </p>
                </div>
                <div className="setting-control">
                <ToggleControl
                    checked={settings.general.close_button || false}
                    onChange={(isChecked) =>
                    handleSettingChange("general", ["close_button"], isChecked)
                }/>
                </div>
            </div>

            {/* Redirection Rules */}
            <div className="settings-group">
                <h3 className="group-title">{__("Redirect", "th-login")}</h3>
                <div className="redirection-grid">
                <div className="redirection-card">
                    <h4>{__("Login", "th-login")}</h4>
                    <CustomSelectControl
                    value={settings.general.redirects?.after_login?.type || "current_page"}
                    options={[
                        { label: __("Current Page", "th-login"), value: "current_page" },
                        { label: __("Dashboard", "th-login"), value: "dashboard" },
                        { label: __("Home Page", "th-login"), value: "home_page" },
                        { label: __("Custom URL", "th-login"), value: "custom_url" },
                    ]}
                    onChange={(newValue) =>
                        handleSettingChange("general", ["redirects", "after_login", "type"], newValue)
                    }
                    />
                    {settings.general.redirects?.after_login?.type === "custom_url" && (
                    <TextControl
                        value={settings.general.redirects.after_login.url || ""}
                        onChange={(newValue) =>
                        handleSettingChange("general", ["redirects", "after_login", "url"], newValue)
                        }
                        placeholder="https://example.com/welcome"
                    />
                    )}
                </div>

                <div className="redirection-card">
                    <h4>{__("Logout", "th-login")}</h4>
                    <CustomSelectControl
                    value={settings.general.redirects?.after_logout?.type || "home_page"}
                    options={[
                        { label: __("Home Page", "th-login"), value: "home_page" },
                        { label: __("Custom URL", "th-login"), value: "custom_url" },
                    ]}
                    onChange={(newValue) =>
                        handleSettingChange("general", ["redirects", "after_logout", "type"], newValue)
                    }
                    />
                    {settings.general.redirects?.after_logout?.type === "custom_url" && (
                    <TextControl
                        value={settings.general.redirects.after_logout.url || ""}
                        onChange={(newValue) =>
                        handleSettingChange("general", ["redirects", "after_logout", "url"], newValue)
                        }
                        placeholder="https://example.com/goodbye"
                    />
                    )}
                </div>

                <div className="redirection-card">
                    <h4>{__("Registration", "th-login")}</h4>
                    <CustomSelectControl
                    value={settings.general.redirects?.after_register?.type || "login_form"}
                    options={[
                        ...(!settings.general.auto_login_after_registration
                        ? [{ label: __("Show Login Form", "th-login"), value: "login_form" }]
                        : []),
                        { label: __("Dashboard", "th-login"), value: "dashboard" },
                        { label: __("Current Page", "th-login"), value: "current_page" },
                        { label: __("Home Page", "th-login"), value: "home_page" },
                        { label: __("Custom URL", "th-login"), value: "custom_url" },
                    ]}

                    onChange={(newValue) =>
                        handleSettingChange("general", ["redirects", "after_register", "type"], newValue)
                    }
                    />
                    {settings.general.redirects?.after_register?.type === "custom_url" && (
                    <TextControl
                        value={settings.general.redirects.after_register.url || ""}
                        onChange={(newValue) =>
                        handleSettingChange("general", ["redirects", "after_register", "url"], newValue)
                        }
                        placeholder="https://example.com/registration-success"
                    />
                    )}
                </div>
                </div>

                
                <div className="setting-row">
                    <div className="setting-label">
                    <h4>{__("Auto-Login After Registration", "th-login")}</h4>
                    <p className="description">
                        {__("Automatically log users in after registration", "th-login")}
                    </p>
                    </div>
                    <div className="setting-control">
                    <ToggleControl
                        checked={settings.general.auto_login_after_registration || false}
                        onChange={(isChecked) =>
                            handleSettingChange("general", ["auto_login_after_registration"], isChecked)
                        }
                    />
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default GeneralSettings;
