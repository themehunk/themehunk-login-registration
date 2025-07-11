import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, TextareaControl,ExternalLink } from "@wordpress/components";

const SecuritySettings = ({ settings, handleSettingChange }) => {
  return (  
    <section className="settings-section">
              <div className="settings-card">
                <h2 className="section-title">
                  <i className="dashicons dashicons-shield"></i>
                  {__("Security Settings", "th-login")}
                </h2>

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
                            <h4>{__("reCAPTCHA Type", "th-login")}</h4>
                            <p className="description">
                              {__("Version of reCAPTCHA to use", "th-login")}
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
                                {__("reCAPTCHA v2 Checkbox", "th-login")}
                              </option>
                              <option value="v3_invisible">
                                {__("reCAPTCHA v3 Invisible", "th-login")}
                              </option>
                            </select>
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
              </div>
      </section>
  );
};

export default SecuritySettings;