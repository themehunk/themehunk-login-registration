import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, TextareaControl,ExternalLink } from "@wordpress/components";
import { CustomSelectControl } from './custom-select-control';
import { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";
import { Button, Spinner } from "@wordpress/components";

const SecuritySettings = ({ settings, handleSettingChange }) => {

  const [activeTab, setActiveTab] = useState("bruteforce");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [approvingId, setApprovingId] = useState(null);

  const tabs = [
    { key: "bruteforce", label: __("Brute Force", "th-login") },
    { key: "recaptcha", label: __("ReCaptcha", "th-login") },
    { key: "honeypot", label: __("HoneyPot", "th-login") },
    { key: "manualApproval", label: __("Manual Approval", "th-login") },
    { key: "autologout", label: __("Auto logout", "th-login") },
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

  useEffect(() => {
    if (activeTab === "manualApproval" && settings.general.manual_user_approval?.enabled) {
      fetchPendingUsers();
    }
  }, [activeTab, settings.general.manual_user_approval?.enabled]);

  const fetchPendingUsers = async () => {
    setLoadingUsers(true);
    try {
      const users = await apiFetch({ path: "/th-login/v1/pending-users" });
      setPendingUsers(users);
    } catch (error) {
      console.error("Error fetching pending users:", error);
    }
    setLoadingUsers(false);
  };

  const approveUser = async (userId) => {
    setApprovingId(userId);
    try {
      await apiFetch({
        path: "/th-login/v1/approve-user",
        method: "POST",
        data: { user_id: userId },
      });
      setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error approving user:", error);
    }
    setApprovingId(null);
  };

  return (  
    <section className="settings-section">
        <div className="settings-card">
          <h2 className="section-title">
            <i className="dashicons dashicons-shield"></i>
            {__("Security Settings", "th-login")}
          </h2>

            {renderTabs()}

            {activeTab === 'bruteforce' && (
              <div className="settings-group">
                <h3 className="group-title">
                  {__("Brute Force Protection", "th-login")}
                </h3>

                <div className="setting-row">
                  <div className="setting-label">
                    <h4>{__("Enable Protection", "th-login")}</h4>
                    <p className="description">
                      {__("Prevent brute force login attacks", "th-login")}
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
                        <h4>{__("Max Login Attempts", "th-login")}</h4>
                        <p className="description">
                          {__(
                            "Allowed failed attempts before lockout",
                            "th-login"
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
                          {__("Lockout Duration (minutes)", "th-login")}
                        </h4>
                        <p className="description">
                          {__(
                            "Time before another attempt is allowed",
                            "th-login"
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
                        <h4>{__("Auto IP Blacklisting", "th-login")}</h4>
                        <p className="description">
                          {__(
                            "Automatically blacklist repeat offenders",
                            "th-login"
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
                  {__("reCAPTCHA Settings", "th-login")}
                </h3>

                <div className="setting-row">
                  <div className="setting-label">
                    <h4>{__("Enable reCAPTCHA", "th-login")}</h4>
                    <p className="description">
                      {__("Add Google reCAPTCHA to forms", "th-login")}
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
                          <h4>{__("reCAPTCHA Show", "th-login")}</h4>
                          <p className="description">
                            {__("Show reCaptcha to from", "th-login")}
                          </p>
                        </div>
                        <div className="setting-control">

                          <CustomSelectControl
                            label={''}
                            value={settings.security.recaptcha?.show_on || "all"}
                            options={[
                              { label: __("All Forms", "th-login"), value: "all" },
                              { label: __("Login Only", "th-login"), value: "login" },
                              { label: __("Register Only", "th-login"), value: "register" },
                            ]}
                            onChange={(val) =>
                              handleSettingChange("security", ["recaptcha", "show_on"], val)
                            }
                            className="modrn-size-fixer-167"
                          />
                        </div>
                      </div>

                      <div className="setting-row">
                        <div className="setting-label">
                          <h4>{__("reCAPTCHA Type", "th-login")}</h4>
                          <p className="description">
                            {__("Version of reCAPTCHA to use", "th-login")}
                          </p>
                        </div>
                        <div className="setting-control">

                           <CustomSelectControl
                              value={settings.security.recaptcha?.type || "v2_checkbox"}
                              options={[
                                { label: __("v2 Checkbox", "th-login"), value: "v2_checkbox" },
                                // { label: __("v3", "th-login"), value: "v3" },
                              ]}
                              onChange={(value) =>
                                handleSettingChange("security", ["recaptcha", "type"], value)
                              }
                              className="modrn-size-fixer-167"
                            />
                        </div>
                      </div>

                      <div className="setting-row">
                        <div className="setting-label">
                          <h4>{__("Site Key", "th-login")}</h4>
                          <p className="description">
                            {__("Your reCAPTCHA site key", "th-login")}{' '}
                            <ExternalLink href="https://www.google.com/recaptcha/admin">
                              {__("Google reCAPTCHA Admin", "th-login")}
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
                          <h4>{__("Secret Key", "th-login")}</h4>
                          <p className="description">
                            {__("Your reCAPTCHA secret key", "th-login")}
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
                  {__("Honeypot Protection", "th-login")}
                </h3>

                <div className="setting-row">
                  <div className="setting-label">
                    <h4>{__("Enable Honeypot", "th-login")}</h4>
                    <p className="description">
                      {__("Add hidden field to catch bots", "th-login")}
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

            {activeTab === 'manualApproval' && (
              <>
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

                {settings.general.manual_user_approval?.enabled && (
                  <div className="menu-item-group"> 
                    <div className="pending-users-list">
                      <h4>{__("Pending Users", "th-login")}</h4>
                      {loadingUsers ? (
                        <Spinner />
                      ) : pendingUsers.length === 0 ? (
                        <p>{__("No pending users found.", "th-login")}</p>
                      ) : (
                        <ul>
                          {pendingUsers.map((user) => (
                            <li key={user.id} className="pending-user-item">
                              <strong>{user.display_name}</strong> ({user.email})
                              <Button
                                isSecondary
                                onClick={() => approveUser(user.id)}
                                disabled={approvingId === user.id}
                              >
                                {approvingId === user.id ? __("Approving...", "th-login") : __("Approve", "th-login")}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

              </>
            )}

            {activeTab === 'autologout' && (
              <div className="settings-group">
                <h3 className="group-title">{__("Session Timeout / Auto Logout", "th-login")}</h3>

                <div className="setting-row">
                  <div className="setting-label">
                    <h4>{__("Enable Auto Logout", "th-login")}</h4>
                    <p className="description">
                      {__("Automatically log out inactive users after specified duration.", "th-login")}
                    </p>
                  </div>
                  <div className="setting-control">
                    <ToggleControl
                      __nextHasNoMarginBottom={true}
                      checked={settings.security.session_timeout?.enabled || false}
                      onChange={(isChecked) =>
                        handleSettingChange("security", ["session_timeout", "enabled"], isChecked)
                      }
                    />
                  </div>
                </div>

                {settings.security.session_timeout?.enabled && (
                  <div className="menu-item-group">
                    <div className="setting-row text-small-box">
                      <div className="setting-label">
                        <h4>{__("Inactivity Duration (minutes)", "th-login")}</h4>
                        <p className="description">
                          {__("User will be logged out after this period of inactivity.", "th-login")}
                        </p>
                      </div>
                      <div className="setting-control">
                        <TextControl
                          type="number"
                          min="1"
                          value={settings.security.session_timeout?.duration || 15}
                          onChange={(newValue) =>
                            handleSettingChange(
                              "security",
                              ["session_timeout", "duration"],
                              parseInt(newValue, 10)
                            )
                          }
                          __next40pxDefaultSize={true}
                          __nextHasNoMarginBottom={true}
                        />
                      </div>
                    </div>

                    <div className="setting-row">
                      <div className="setting-label">
                        <h4>{__("Show Warning Before Logout", "th-login")}</h4>
                        <p className="description">
                          {__("Displays a countdown warning before automatic logout.", "th-login")}
                        </p>
                      </div>
                      <div className="setting-control">
                        <ToggleControl
                          __nextHasNoMarginBottom={true}
                          checked={settings.security.session_timeout?.show_warning || false}
                          onChange={(isChecked) =>
                            handleSettingChange("security", ["session_timeout", "show_warning"], isChecked)
                          }
                        />
                      </div>
                    </div>

                    {settings.security.session_timeout?.show_warning && (
                      <div className="setting-row text-small-box">
                        <div className="setting-label">
                          <h4>{__("Warning Countdown Duration (seconds)", "th-login")}</h4>
                          <p className="description">
                            {__("Time shown in warning popup before session expires.", "th-login")}
                          </p>
                        </div>
                        <div className="setting-control">
                          <TextControl
                            type="number"
                            min="5"
                            value={settings.security.session_timeout?.warning_duration || 60}
                            onChange={(newValue) =>
                              handleSettingChange(
                                "security",
                                ["session_timeout", "warning_duration"],
                                parseInt(newValue, 10)
                              )
                            }
                            __next40pxDefaultSize={true}
                            __nextHasNoMarginBottom={true}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

        </div>
      </section>
  );
};

export default SecuritySettings;