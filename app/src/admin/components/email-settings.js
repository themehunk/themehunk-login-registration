import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, TextareaControl} from "@wordpress/components";

const EmailSettings = ({ settings, handleSettingChange }) => {

  return (  
    <section className="settings-section">
        <div className="settings-card">
          <h2 className="section-title">
            <i className="dashicons dashicons-email"></i>
            {__("Email Settings", "th-login")}
          </h2>

            <div className="settings-group">
                <h3 className="group-title">{__("Email Settings", "th-login")}</h3>
            </div>

            {/* Enable Toggle */}
            <div className="setting-row">
                <div className="setting-label">
                <h4>{__("Enable Email Verification", "th-login")}</h4>
                <p className="description">
                    {__("Require users to verify their email after registration.", "th-login")}
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
                
                {/* From Name */}
                <div className="setting-row">
                    <div className="setting-label">
                    <h4>{__("From Name", "th-login")}</h4>
                    <p className="description">
                        {__("This name will appear as the sender of the email.", "th-login")}
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
                    <h4>{__("From Email", "th-login")}</h4>
                    <p className="description">
                        {__("This email will be used as the sender address.", "th-login")}
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
                    <h4>{__("Email Subject", "th-login")}</h4>
                    <p className="description">
                        {__("The subject line of the verification email.", "th-login")}
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
                    <h4>{__("Email Content", "th-login")}</h4>
                    <p className="description">
                        {__(
                        "You can use {verification_link} placeholder which will be replaced with the actual verification link.",
                        "th-login"
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

                </div>
            )}

        </div>
      </section>
  );
};

export default EmailSettings;