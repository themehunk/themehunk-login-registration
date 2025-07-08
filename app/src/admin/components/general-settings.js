import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl } from "@wordpress/components";
import {CustomSelectControl} from './custom-select-control';

const GeneralSettings = ({ 
  settings, 
  handleSettingChange,
  addRoleBasedRedirect,
  updateRoleBasedRedirect,
  removeRoleBasedRedirect
}) => {
    return (
        <section className="settings-section">
            <div className="settings-card">
            <h2 className="section-title">
                <i className="dashicons dashicons-admin-settings"></i>
                {__("General Settings", "th-login")}
            </h2>

            {/* Plugin Status Toggle */}
            <div className="setting-row">
                <div className="setting-label">
                    <h3>{__("Plugin Status", "th-login")}</h3>
                    <p className="description">
                        {settings.general.plugin_status === "enabled"
                        ? __("Login popup is currently active", "th-login")
                        : __("Login popup is disabled", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                <ToggleControl
                    checked={settings.general.plugin_status === "enabled"}
                    onChange={(isChecked) =>
                    handleSettingChange(
                        "general",
                        ["plugin_status"],
                        isChecked ? "enabled" : "disabled"
                    )
                    }
                />
                </div>
            </div>

            {/* Login Behavior Section */}
            <div className="settings-group">
                <h3 className="group-title">
                {__("Login Behavior", "th-login")}
                </h3>

                {/* <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Disable Default WP Login", "th-login")}</h4>
                    <p className="description">
                    {__(
                        "Redirects wp-login.php to your custom login",
                        "th-login"
                    )}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.general.disable_wp_login_page || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "general",
                        ["disable_wp_login_page"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div> */}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Auto-Login After Registration", "th-login")}</h4>
                    <p className="description">
                    {__(
                        "Automatically log users in after registration",
                        "th-login"
                    )}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.general.auto_login_after_registration ||
                        false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "general",
                        ["auto_login_after_registration"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>
            </div>

            {/* Redirection Rules */}
            <div className="settings-group">
                <h3 className="group-title">
                {__("Redirection Rules", "th-login")}
                </h3>

                <div className="redirection-grid">
                {/* After Login */}
                <div className="redirection-card">
                    <h4>{__("After Login", "th-login")}</h4>
                    <CustomSelectControl
                        value={
                            settings.general.redirects?.after_login?.type ||
                            "current_page"
                        }
                        options={[
                            {
                            label: __("Current Page", "th-login"),
                            value: "current_page",
                            },
                            {
                            label: __("Dashboard", "th-login"),
                            value: "dashboard",
                            },
                            {
                            label: __("Home Page", "th-login"),
                            value: "home_page",
                            },
                            {
                            label: __("Custom URL", "th-login"),
                            value: "custom_url",
                            },
                        ]}
                        onChange={(newValue) =>
                            handleSettingChange(
                            "general",
                            ["redirects", "after_login", "type"],
                            newValue
                            )
                        }
                    />

                    {settings.general.redirects?.after_login?.type ===
                    "custom_url" && (
                    <TextControl
                        value={
                        settings.general.redirects.after_login.url || ""
                        }
                        onChange={(newValue) =>
                        handleSettingChange(
                            "general",
                            ["redirects", "after_login", "url"],
                            newValue
                        )
                        }
                        placeholder="https://example.com/welcome"
                    />
                    )}

                </div>

                {/* After Logout */}
                <div className="redirection-card">
                    <h4>{__("After Logout", "th-login")}</h4>
                    <CustomSelectControl
                    value={
                        settings.general.redirects?.after_logout?.type ||
                        "home_page"
                    }
                    options={[
                        {
                        label: __("Home Page", "th-login"),
                        value: "home_page",
                        },
                        {
                        label: __("Custom URL", "th-login"),
                        value: "custom_url",
                        },
                    ]}
                    onChange={(newValue) =>
                        handleSettingChange(
                        "general",
                        ["redirects", "after_logout", "type"],
                        newValue
                        )
                    }
                    />
                    {settings.general.redirects?.after_logout?.type ===
                    "custom_url" && (
                    <TextControl
                        value={
                        settings.general.redirects.after_logout.url || ""
                        }
                        onChange={(newValue) =>
                        handleSettingChange(
                            "general",
                            ["redirects", "after_logout", "url"],
                            newValue
                        )
                        }
                        placeholder="https://example.com/goodbye"
                    />
                    )}
                </div>

                {/* After Registration */}
                <div className="redirection-card">
                    <h4>{__("After Registration", "th-login")}</h4>
                    <CustomSelectControl
                    value={
                        settings.general.redirects?.after_register?.type ||
                        "login_form"
                    }
                    options={[
                        {
                        label: __("Show Login Form", "th-login"),
                        value: "login_form",
                        },
                        {
                        label: __("Dashboard", "th-login"),
                        value: "dashboard",
                        },
                        {
                        label: __("Home Page", "th-login"),
                        value: "home_page",
                        },
                        {
                        label: __("Custom URL", "th-login"),
                        value: "custom_url",
                        },
                    ]}
                    onChange={(newValue) =>
                        handleSettingChange(
                        "general",
                        ["redirects", "after_register", "type"],
                        newValue
                        )
                    }
                    />
                    {settings.general.redirects?.after_register?.type ===
                    "custom_url" && (
                    <TextControl
                        value={
                        settings.general.redirects.after_register.url || ""
                        }
                        onChange={(newValue) =>
                        handleSettingChange(
                            "general",
                            ["redirects", "after_register", "url"],
                            newValue
                        )
                        }
                        placeholder="https://example.com/registration-success"
                    />
                    )}
                </div>
                </div>
            </div>

            {/* Role-Based Redirects */}
            <div className="settings-group">
                <div className="group-header">
                <h3 className="group-title">
                    {__("Role-Based Redirects", "th-login")}
                </h3>
                <button
                    className="add-rule-button"
                    onClick={addRoleBasedRedirect}
                >
                    <i className="dashicons dashicons-plus"></i>
                    {__("Add Rule", "th-login")}
                </button>
                </div>

                <div className="role-redirects-container">
                {settings.general.redirects.role_based_redirects.map(
                    (rule, index) => (
                    <div key={index} className="redirect-rule">
                        <div className="rule-header">
                        <h4>
                            {rule.role || __("New Redirect Rule", "th-login")}
                        </h4>
                        <button
                            className="remove-rule"
                            onClick={() => removeRoleBasedRedirect(index)}
                        >
                            <i className="dashicons dashicons-trash"></i>
                        </button>
                        </div>
                        <div className="rule-fields">
                        <div className="form-field">
                            <label>{__("User Role Slug", "th-login")}</label>
                            <input
                            type="text"
                            value={rule.role}
                            onChange={(e) =>
                                updateRoleBasedRedirect(
                                index,
                                "role",
                                e.target.value
                                )
                            }
                            placeholder="subscriber"
                            />
                        </div>
                        <div className="form-field">
                            <label>{__("Redirect URL", "th-login")}</label>
                            <input
                            type="text"
                            value={rule.url}
                            onChange={(e) =>
                                updateRoleBasedRedirect(
                                index,
                                "url",
                                e.target.value
                                )
                            }
                            placeholder="https://example.com/member-dashboard"
                            />
                        </div>
                        </div>
                    </div>
                    )
                )}
                </div>
            </div>

            {/* Email Verification */}
            {/* <div className="settings-group">
                <h3 className="group-title">
                {__("Email Verification", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Enable Verification", "th-login")}</h4>
                    <p className="description">
                    {__(
                        "Require email confirmation before login",
                        "th-login"
                    )}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.general.email_verification?.enabled || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "general",
                        ["email_verification", "enabled"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                {settings.general.email_verification?.enabled && (
                <div className="email-verification-settings">
                    <div className="form-field">
                    <label>{__("Email Subject", "th-login")}</label>
                    <input
                        type="text"
                        value={
                        settings.general.email_verification
                            ?.email_subject || ""
                        }
                        onChange={(e) =>
                        handleSettingChange(
                            "general",
                            ["email_verification", "email_subject"],
                            e.target.value
                        )
                        }
                        placeholder={__("Verify your email", "th-login")}
                    />
                    </div>

                    <div className="form-field">
                    <label>{__("Email Content", "th-login")}</label>
                    <textarea
                        value={
                        settings.general.email_verification
                            ?.email_content || ""
                        }
                        onChange={(e) =>
                        handleSettingChange(
                            "general",
                            ["email_verification", "email_content"],
                            e.target.value
                        )
                        }
                        rows={5}
                    />
                    <p className="help-text">
                        {__(
                        "Use {verification_link} for the verification URL",
                        "th-login"
                        )}
                    </p>
                    </div>

                    <div className="form-field">
                    <label>{__("After Verification", "th-login")}</label>
                    <select
                        value={
                        settings.general.email_verification
                            ?.redirect_after_verification || "login_form"
                        }
                        onChange={(e) =>
                        handleSettingChange(
                            "general",
                            [
                            "email_verification",
                            "redirect_after_verification",
                            ],
                            e.target.value
                        )
                        }
                    >
                        <option value="login_form">
                        {__("Show Login Form", "th-login")}
                        </option>
                        <option value="dashboard">
                        {__("Dashboard", "th-login")}
                        </option>
                        <option value="home_page">
                        {__("Home Page", "th-login")}
                        </option>
                        <option value="custom_url">
                        {__("Custom URL", "th-login")}
                        </option>
                    </select>
                    </div>

                    {settings.general.email_verification
                    ?.redirect_after_verification === "custom_url" && (
                    <div className="form-field">
                        <label>{__("Custom URL", "th-login")}</label>
                        <input
                        type="text"
                        value={
                            settings.general.email_verification
                            ?.custom_redirect_url || ""
                        }
                        onChange={(e) =>
                            handleSettingChange(
                            "general",
                            ["email_verification", "custom_redirect_url"],
                            e.target.value
                            )
                        }
                        placeholder="https://example.com/welcome"
                        />
                    </div>
                    )}
                </div>
                )}
            </div> */}

            {/* Manual Approval */}
            <div className="settings-group">
                <div className="setting-row">
                <div className="setting-label">
                    <h3>{__("Manual User Approval", "th-login")}</h3>
                    <p className="description">
                    {__(
                        "Require admin approval for new registrations",
                        "th-login"
                    )}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.general.manual_user_approval?.enabled ||
                        false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "general",
                        ["manual_user_approval", "enabled"],
                        isChecked
                        )
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