import { __ } from "@wordpress/i18n";
import { ToggleControl } from "@wordpress/components";

const IntegrationSettings = ({ settings, handleSettingChange }) => {
  return (
    <section className="settings-section">
      <div className="settings-card">
        <h2 className="section-title">
          <i className="dashicons dashicons-admin-plugins"></i>
          {__("Integration Settings", "thlogin")}
        </h2>

        <div className="settings-group">
          <h3 className="group-title">
            {__("WooCommerce Integration", "thlogin")}
          </h3>

          <div className="setting-row">
            <div className="setting-label">
              <h4>
                {__("Enable WooCommerce Integration", "thlogin")}
              </h4>
              <p className="description">
                {__("Integrate with WooCommerce features", "thlogin")}
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
                  <h4>{__("Replace WooCommerce Login", "thlogin")}</h4>
                  <p className="description">
                    {__(
                      "Use this login form for WooCommerce",
                      "thlogin"
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
                    {__("Replace WooCommerce Registration", "thlogin")}
                  </h4>
                  <p className="description">
                    {__(
                      "Use this registration form for WooCommerce",
                      "thlogin"
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