import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, TextareaControl,ExternalLink } from "@wordpress/components";
import { useState } from "react";

const SecuritySettings = ({ settings, handleSettingChange }) => {

    const [activeTab, setActiveTab] = useState("bruteforce");

    const tabs = [
      { key: "bruteforce", label: __("Brute Force", "thlogin") },
      { key: "recaptcha", label: __("ReCaptcha", "thlogin") },
      { key: "honeypot", label: __("HoneyPot", "thlogin") },
      { key: "emailVerifictaion", label: __("Email Verifictaion", "thlogin") },
      { key: "manualApproval", label: __("Manual Approval", "thlogin") },
      { key: "twoFactorAuthentication", label: __("Two-Factor Authentication", "thlogin") },
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

    console.log(settings);

  return (  
    <section className="settings-section">
        <div className="settings-card">
          <h2 className="section-title">
            <i className="dashicons dashicons-shield"></i>
            {__("Security Settings", "thlogin")}
          </h2>

            {renderTabs()}

            {activeTab === 'bruteforce' && (
              <div className="settings-group">
                <h3 className="group-title">
                  {__("Brute Force Protection", "thlogin")}
                </h3>

                <div className="setting-row">
                  <div className="setting-label">
                    <h4>{__("Enable Protection", "thlogin")}</h4>
                    <p className="description">
                      {__("Prevent brute force login attacks", "thlogin")}
                    </p>
                  </div>
                  <div className="setting-control">
                    <ToggleControl
                    __nextHasNoMarginBottom={true}
                      checked={
                        settings.security.brute_force_protection?.enabled ||
                        false
                      }
                      onChange={(isChecked) =>
                        handleSettingChange(
                          "security",
                          ["brute_force_protection", "enabled"],
                          isChecked
                        )
                      }
                    />
                  </div>
                </div>

                {settings.security.brute_force_protection?.enabled && (
                  <div className="menu-item-group ">
                    <div className="setting-row text-small-box ">
                      <div className="setting-label">
                        <h4>{__("Max Login Attempts", "thlogin")}</h4>
                        <p className="description">
                          {__(
                            "Allowed failed attempts before lockout",
                            "thlogin"
                          )}
                        </p>
                      </div>
                      <div className="setting-control">
                        <TextControl
                          __next40pxDefaultSize = {true}
                              __nextHasNoMarginBottom={true}
                          type="number"
                          min="1"
                          value={
                            settings.security.brute_force_protection
                              ?.max_attempts || 5
                          }
                          onChange={(newValue) =>
                            handleSettingChange(
                              "security",
                              ["brute_force_protection", "max_attempts"],
                              parseInt(newValue, 10)
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="setting-row text-small-box ">
                      <div className="setting-label">
                        <h4>
                          {__("Lockout Duration (minutes)", "thlogin")}
                        </h4>
                        <p className="description">
                          {__(
                            "Time before another attempt is allowed",
                            "thlogin"
                          )}
                        </p>
                      </div>
                      <div className="setting-control">
                        <TextControl
                                                        __next40pxDefaultSize = {true}
                              __nextHasNoMarginBottom={true}
                          type="number"
                          min="1"
                          value={
                            settings.security.brute_force_protection
                              ?.lockout_duration_minutes || 30
                          }
                          onChange={(newValue) =>
                            handleSettingChange(
                              "security",
                              [
                                "brute_force_protection",
                                "lockout_duration_minutes",
                              ],
                              parseInt(newValue, 10)
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="setting-row">
                      <div className="setting-label">
                        <h4>{__("Auto IP Blacklisting", "thlogin")}</h4>
                        <p className="description">
                          {__(
                            "Automatically blacklist repeat offenders",
                            "thlogin"
                          )}
                        </p>
                      </div>
                      <div className="setting-control">
                        <ToggleControl
                        __nextHasNoMarginBottom={true}
                          checked={
                            settings.security.brute_force_protection
                              ?.auto_ip_blacklist_enabled || false
                          }
                          onChange={(isChecked) =>
                            handleSettingChange(
                              "security",
                              [
                                "brute_force_protection",
                                "auto_ip_blacklist_enabled",
                              ],
                              isChecked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recaptcha' && (
              <div className="settings-group">
                <h3 className="group-title">
                  {__("reCAPTCHA Settings", "thlogin")}
                </h3>

                <div className="setting-row">
                  <div className="setting-label">
                    <h4>{__("Enable reCAPTCHA", "thlogin")}</h4>
                    <p className="description">
                      {__("Add Google reCAPTCHA to forms", "thlogin")}
                    </p>
                  </div>
                  <div className="setting-control">
                    <ToggleControl
                    __nextHasNoMarginBottom={true}
                      checked={settings.security.recaptcha?.enabled || false}
                      onChange={(isChecked) =>
                        handleSettingChange(
                          "security",
                          ["recaptcha", "enabled"],
                          isChecked
                        )
                      }
                    />
                  </div>
                </div>

                {settings.security.recaptcha?.enabled && (
                  <div className="menu-item-group ">
                      <div className="setting-row">
                        <div className="setting-label">
                          <h4>{__("reCAPTCHA Type", "thlogin")}</h4>
                          <p className="description">
                            {__("Version of reCAPTCHA to use", "thlogin")}
                          </p>
                        </div>
                        <div className="setting-control">
                          <select
                            value={
                              settings.security.recaptcha?.type || "v2_checkbox"
                            }
                            onChange={(e) =>
                              handleSettingChange(
                                "security",
                                ["recaptcha", "type"],
                                e.target.value
                              )
                            }
                          >
                            <option value="v2_checkbox">
                              {__("reCAPTCHA v2 Checkbox", "thlogin")}
                            </option>
                            <option value="v3">
                              {__("reCAPTCHA v3 Invisible", "thlogin")}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="setting-row">
                        <div className="setting-label">
                          <h4>{__("Site Key", "thlogin")}</h4>
                          <p className="description">
                            {__("Your reCAPTCHA site key", "thlogin")}{' '}
                            <ExternalLink href="https://www.google.com/recaptcha/admin">
                              {__("Google reCAPTCHA Admin", "thlogin")}
                            </ExternalLink>
                          </p>
                        </div>
                        <div className="setting-control">
                          <TextControl
                               __next40pxDefaultSize = {true}
                              __nextHasNoMarginBottom={true}
                            value={settings.security.recaptcha?.site_key || ""}
                            onChange={(newValue) =>
                              handleSettingChange(
                                "security",
                                ["recaptcha", "site_key"],
                                newValue
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="setting-row">
                        <div className="setting-label">
                          <h4>{__("Secret Key", "thlogin")}</h4>
                          <p className="description">
                            {__("Your reCAPTCHA secret key", "thlogin")}
                          </p>
                        </div>
                        <div className="setting-control">
                          <TextControl
                                                          __next40pxDefaultSize = {true}
                              __nextHasNoMarginBottom={true}
                            value={
                              settings.security.recaptcha?.secret_key || ""
                            }
                            onChange={(newValue) =>
                              handleSettingChange(
                                "security",
                                ["recaptcha", "secret_key"],
                                newValue
                              )
                            }
                          />
                        </div>
                      </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'honeypot' && (
              <div className="settings-group">
                <h3 className="group-title">
                  {__("Honeypot Protection", "thlogin")}
                </h3>

                <div className="setting-row">
                  <div className="setting-label">
                    <h4>{__("Enable Honeypot", "thlogin")}</h4>
                    <p className="description">
                      {__("Add hidden field to catch bots", "thlogin")}
                    </p>
                  </div>
                  <div className="setting-control">
                    <ToggleControl
                    __nextHasNoMarginBottom={true}
                      checked={settings.security.honeypot_enabled || false}
                      onChange={(isChecked) =>
                        handleSettingChange(
                          "security",
                          ["honeypot_enabled"],
                          isChecked
                        )
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

export default SecuritySettings;