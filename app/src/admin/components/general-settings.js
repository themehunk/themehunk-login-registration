import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl } from "@wordpress/components";
import { CustomSelectControl } from './custom-select-control';
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import {  FaCheck } from "react-icons/fa"; 
import { FaCopy } from "react-icons/fa6";

const GeneralSettings = ({ settings, handleSettingChange}) => {

    const displayMode = settings.general.display_mode || "popup";

    const [availableRoles, setAvailableRoles] = useState([
        { label: "Subscriber", value: "subscriber" }, // fallback
    ]);

    useEffect(() => {
        apiFetch({ path: "/th-login/v1/roles" }).then((roles) => {
        setAvailableRoles(roles);
        });
    }, []);

	const [copiedIndex, setCopiedIndex] = useState(null);

	const shortcodes = [
		{
			label: __("Login Form", "th-login"),
			shortcode: "[th_login_form]",
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
			shortcode: "[th_login__combined_form]",
			description: __("Shows the full login/register/forgot modal and auto-triggers it", "th-login"),
		},
        {
            label: __("Popup Link", "th-login"),
            shortcode : "[th_login_popup_link]",
            description:__("Use this link to generate popup link.")
        }
	];

	const handleCopy = (text, index) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 3000);
		});
	};

    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { key: "general", label: __("General", "th-login") },
        { key: "redirect", label: __("Redirect", "th-login") },
        { key: "shortcodes", label: __("Short Codes", "th-login") },
    ];
    
    const renderTabs = () => (
        <div className="custom-tabs">
        {tabs.map((tab) => (
            <button
            key={tab.key}
            className={`custom-tab-button ${
                activeTab === tab.key ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
            >
            {tab.label}
            </button>
        ))}
        </div>
    );

    return (
        <section className="settings-section">
            <div className="settings-card">
                <h2 className="section-title">
                    <i className="dashicons dashicons-admin-settings"></i>
                    {__("General Settings", "th-login")}
                </h2>

                {renderTabs()}
                
                {activeTab === "general" && (
                    <>
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
                    __nextHasNoMarginBottom={true}
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
                    __nextHasNoMarginBottom={true}
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
                    __nextHasNoMarginBottom={true}
                        checked={settings.general.close_button || false}
                        onChange={(isChecked) =>
                        handleSettingChange("general", ["close_button"], isChecked)
                    }/>
                    </div>
                </div>
                    
                    </>
                )}

                {activeTab === "redirect" && (
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
                                                            __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
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
                                                            __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
                            value={settings.general.redirects.after_logout.url || ""}
                            onChange={(newValue) =>
                                handleSettingChange("general", ["redirects", "after_logout", "url"], newValue)
                            }
                            placeholder="https://example.com/goodbye"
                            />
                        )}
                        </div>
                    </div>

                    {/* Auto Login Toggle + Conditional Registration Redirect */}
                    <div className="setting-row settings-manage-toggle-resitartion">
                        <div className="setting-label">
                            <h4>{__("Auto-Login After Registration", "th-login")}</h4>
                            <p className="description">
                                {__("Automatically log users in after registration", "th-login")}
                            </p>
                            </div>
                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                    checked={settings.general.auto_login_after_registration || false}
                                    onChange={(isChecked) =>
                                    handleSettingChange("general", ["auto_login_after_registration"], isChecked)
                                    }
                                />

                                {settings.general.auto_login_after_registration && (
                                    <div className="redirection-card th-inline-registration-redirect" style={{ marginTop: "12px" }}>
                                    <h4>{__("Registration", "th-login")}</h4>
                                    <CustomSelectControl
                                        value={settings.general.redirects?.after_register?.type || "dashboard"}
                                        options={[
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
                                                                        __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
                                        value={settings.general.redirects.after_register.url || ""}
                                        onChange={(newValue) =>
                                            handleSettingChange("general", ["redirects", "after_register", "url"], newValue)
                                        }
                                        placeholder="https://example.com/registration-success"
                                        />
                                    )}
                                    </div>
                                )}
                        </div>
                    </div>
                    </div>
                )}

                {activeTab === "shortcodes" && (
                    <div className="settings-group th-login-shortcodes-list">
                    <h3 className="group-title">{__("Shortcodes", "th-login")}</h3>
                    <div className="shortcode-grid">
                        {shortcodes.map(({ label, shortcode, description }, i) => (
                            <div className="shortcode-card" key={i}>
                                <h4>{label}</h4>
                                <p className="description">{description}</p>
                                <div className="shortcode-copy-wrap">
                                    <textarea
                                        className="shortcode-text"
                                        readOnly
                                        value={shortcode}
                                        onClick={(e) => e.target.select()}
                                    />
                                  <button
                                        className="components-button is-secondary copy-button"
                                        onClick={() => handleCopy(shortcode, i)}
                                        title={copiedIndex === i ? __("Copied!", "th-login") : __("Copy", "th-login")}
                                    >
                                        {copiedIndex === i ? <FaCheck /> : <FaCopy />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                )}

                

                {/* Redirection Rules */}
              

                {/* Shortcode Quick Access */}
              

            </div>
        </section>
    );
};

export default GeneralSettings;
