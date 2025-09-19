import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, TextareaControl} from "@wordpress/components";
import { createInterpolateElement } from '@wordpress/element';

const EmailSettings = ({ settings, handleSettingChange }) => {

    const tabs = [
        { key: "wordpress", label: __("WordPress", "themehunk-login-registration") },
        { key: "smtp", label: __("SMTP", "themehunk-login-registration") },
    ];

    const renderTabs = () => (
        <div className="custom-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`custom-tab-button ${
                        settings.security.email_verification?.from_type === tab.key ? "active" : ""
                    }`}
                    onClick={() => handleSettingChange("security", ["email_verification", "from_type"], tab.key)}
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
            <i className="dashicons dashicons-email"></i>
            {__("Email Settings", "themehunk-login-registration")}
          </h2>

            <div className="settings-group">
                <h3 className="group-title">{__("Email Settings", "themehunk-login-registration")}</h3>
            </div>

            {/* Enable Toggle */}
            <div className="setting-row">
                <div className="setting-label">
                <h4>{__("Enable Email Verification", "themehunk-login-registration")}</h4>
                <p className="description">
                    {__("Require users to verify their email after registration.", "themehunk-login-registration")}
                </p>
                </div>
                <div className="setting-control">
                <ToggleControl
                    __nextHasNoMarginBottom={true}
                    checked={settings.security.email_verification?.enabled || false}
                    onChange={(isChecked) =>
                    handleSettingChange("security", ["email_verification", "enabled"], isChecked)
                    }
                />
                </div>
            </div>

            {settings.security.email_verification?.enabled && (

                <div className="menu-item-group">  
                    {/* {renderTabs()} */} {/* By Switching it option form wordpress and smtp will come and just wmtp will work taht we have to make. and befor switching it in inteagrtin also you ahveto switch it on.*/}

                    {settings.security.email_verification?.from_type === 'wordpress' && (
                        <>
                            {/* From Name */}
                            <div className="setting-row">
                                <div className="setting-label">
                                <h4>{__("From Name", "themehunk-login-registration")}</h4>
                                <p className="description">
                                    {__("This name will appear as the sender of the email.", "themehunk-login-registration")}
                                </p>
                                </div>
                                <div className="setting-control">
                                <TextControl
                                    value={settings.security.email_verification?.from_name || ""}
                                    onChange={(value) =>
                                    handleSettingChange("security", ["email_verification", "from_name"], value)
                                    }
                                />
                                </div>
                            </div>

                            {/* From Email */}
                            <div className="setting-row">
                                <div className="setting-label">
                                <h4>{__("From Email", "themehunk-login-registration")}</h4>
                                <p className="description">
                                    {__("This email will be used as the sender address.", "themehunk-login-registration")}
                                </p>
                                </div>
                                <div className="setting-control">
                                <TextControl
                                    type="email"
                                    value={settings.security.email_verification?.from_email || ""}
                                    onChange={(value) =>
                                    handleSettingChange("security", ["email_verification", "from_email"], value)
                                    }
                                />
                                </div>
                            </div>

                            {/* Email Subject */}
                            <div className="setting-row">
                                <div className="setting-label">
                                <h4>{__("Email Subject", "themehunk-login-registration")}</h4>
                                <p className="description">
                                    {__("The subject line of the verification email.", "themehunk-login-registration")}
                                </p>
                                </div>
                                <div className="setting-control">
                                <TextControl
                                    value={settings.security.email_verification?.email_subject || ""}
                                    onChange={(value) =>
                                    handleSettingChange("security", ["email_verification", "email_subject"], value)
                                    }
                                />
                                </div>
                            </div>

                            {/* Email Body */}
                            <div className="setting-row">
                                <div className="setting-label">
                                <h4>{__("Email Content", "themehunk-login-registration")}</h4>
                                <p className="description">
                                    {__(
                                    "You can use {verification_link} placeholder which will be replaced with the actual verification link.",
                                    "themehunk-login-registration"
                                    )}
                                </p>
                                </div>
                                <div className="setting-control">
                                <TextareaControl
                                    value={settings.security.email_verification?.email_content || ""}
                                    onChange={(value) =>
                                    handleSettingChange("security", ["email_verification", "email_content"], value)
                                    }
                                />
                                </div>
                            </div>

                       </>
                    )}

                    {settings.security.email_verification?.from_type === 'smtp' && (
                        <>
                            {settings.integration?.smtp?.enabled ? (
                                <>
                                    {/* From Name */}
                                    <div className="setting-row">
                                        <div className="setting-label">
                                        <h4>{__("From Name", "themehunk-login-registration")}</h4>
                                        <p className="description">
                                            {__("This name will appear as the sender of the email.", "themehunk-login-registration")}
                                        </p>
                                        </div>
                                        <div className="setting-control">
                                        <TextControl
                                            value={settings.security.email_verification?.from_name || ""}
                                            onChange={(value) =>
                                            handleSettingChange("security", ["email_verification", "from_name"], value)
                                            }
                                        />
                                        </div>
                                    </div>

                                    {/* From Email */}
                                    <div className="setting-row">
                                        <div className="setting-label">
                                        <h4>{__("From Email", "themehunk-login-registration")}</h4>
                                        <p className="description">
                                            {__("This email will be used as the sender address.", "themehunk-login-registration")}
                                        </p>
                                        </div>
                                        <div className="setting-control">
                                        <TextControl
                                            type="email"
                                            value={settings.security.email_verification?.from_email || ""}
                                            onChange={(value) =>
                                            handleSettingChange("security", ["email_verification", "from_email"], value)
                                            }
                                        />
                                        </div>
                                    </div>

                                    {/* Email Subject */}
                                    <div className="setting-row">
                                        <div className="setting-label">
                                        <h4>{__("Email Subject", "themehunk-login-registration")}</h4>
                                        <p className="description">
                                            {__("The subject line of the verification email.", "themehunk-login-registration")}
                                        </p>
                                        </div>
                                        <div className="setting-control">
                                        <TextControl
                                            value={settings.security.email_verification?.email_subject || ""}
                                            onChange={(value) =>
                                            handleSettingChange("security", ["email_verification", "email_subject"], value)
                                            }
                                        />
                                        </div>
                                    </div>

                                    {/* Email Body */}
                                    <div className="setting-row">
                                        <div className="setting-label">
                                        <h4>{__("Email Content", "themehunk-login-registration")}</h4>
                                        <p className="description">
                                            {__(
                                            "You can use {verification_link} placeholder which will be replaced with the actual verification link.",
                                            "themehunk-login-registration"
                                            )}
                                        </p>
                                        </div>
                                        <div className="setting-control">
                                        <TextareaControl
                                            value={settings.security.email_verification?.email_content || ""}
                                            onChange={(value) =>
                                            handleSettingChange("security", ["email_verification", "email_content"], value)
                                            }
                                        />
                                        </div>
                                    </div>
                                </>
                            ):(
                             <div
                                style={{
                                backgroundColor: "#f0f6ff",
                                border: "1px solid #b6d4fe",
                                borderRadius: "6px",
                                padding: "12px 16px",
                                marginTop: "12px",
                                fontSize: "14px",
                                color: "#084298",
                                }}
                            >
                                {
                                createInterpolateElement(
                                    __(
                                    '<strong>Notice:</strong> To enable email sending features, please go to the <strong>Integration</strong> tab and activate a supported <strong>SMTP plugin</strong>.',
                                    'themehunk-login-registration'
                                    ),
                                    {
                                    strong: <strong />,
                                    }
                                )
                                }
                            </div>

                            )}
                       </>
                    )}

                </div>
            )}

        </div>
      </section>
  );
};

export default EmailSettings;