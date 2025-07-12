import { __ } from "@wordpress/i18n";
import { ToggleControl } from "@wordpress/components";

const IntegrationSettings = ({ settings, handleSettingChange }) => {
  return (
    <section className="settings-section">
              <div className="settings-card">
                <h2 className="section-title">
                  <i className="dashicons dashicons-admin-plugins"></i>
                  {__("Integration Settings", "th-login")}
                </h2>

                <div className="settings-group">
                  <h3 className="group-title">
                    {__("WooCommerce Integration", "th-login")}
                  </h3>

                  <div className="setting-row">
                    <div className="setting-label">
                      <h4>
                        {__("Enable WooCommerce Integration", "th-login")}
                      </h4>
                      <p className="description">
                        {__("Integrate with WooCommerce features", "th-login")}
                      </p>
                    </div>
                    <div className="setting-control">
                      <ToggleControl
                      __nextHasNoMarginBottom={true}
                        checked={
                          settings.integration?.woocommerce?.enabled || false
                        }
                        onChange={(isChecked) =>
                          handleSettingChange(
                            "integration",
                            ["woocommerce", "enabled"],
                            isChecked
                          )
                        }
                      />
                    </div>
                  </div>

                  {settings.integration?.woocommerce?.enabled && (
                    <>
                      <div className="setting-row">
                        <div className="setting-label">
                          <h4>{__("Replace WooCommerce Login", "th-login")}</h4>
                          <p className="description">
                            {__(
                              "Use this login form for WooCommerce",
                              "th-login"
                            )}
                          </p>
                        </div>
                        <div className="setting-control">
                          <ToggleControl
                          __nextHasNoMarginBottom={true}
                            checked={
                              settings.integration.woocommerce.replace_login ||
                              false
                            }
                            onChange={(isChecked) =>
                              handleSettingChange(
                                "integration",
                                ["woocommerce", "replace_login"],
                                isChecked
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="setting-row">
                        <div className="setting-label">
                          <h4>
                            {__("Replace WooCommerce Registration", "th-login")}
                          </h4>
                          <p className="description">
                            {__(
                              "Use this registration form for WooCommerce",
                              "th-login"
                            )}
                          </p>
                        </div>
                        <div className="setting-control">
                          <ToggleControl
                          __nextHasNoMarginBottom={true}
                            checked={
                              settings.integration.woocommerce
                                .replace_registration || false
                            }
                            onChange={(isChecked) =>
                              handleSettingChange(
                                "integration",
                                ["woocommerce", "replace_registration"],
                                isChecked
                              )
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
    );
};

export default IntegrationSettings;