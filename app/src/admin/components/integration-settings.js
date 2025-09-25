import { __ } from "@wordpress/i18n";
import { TextControl,ToggleControl, Notice } from "@wordpress/components";
import { useEffect, useState } from "react";

const IntegrationSettings = ({ settings, handleSettingChange,isLoading }) => {

	const isWooEnabled = thlogin_admin_data.woo_enabled;
  const isSmtpEnabled = thlogin_admin_data.smtp_enabled;

  const base_url =  thlogin_admin_data.base_url;

  const fullwordpressurl = thlogin_admin_data?.wp_login_url || base_url;

  const [baseWordpressUrl, setBaseWordpressUrl] = useState(fullwordpressurl);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Jab tak loading ho rahi hai, kuch bhi mat karo
    if (isLoading || !fullwordpressurl) return;

    let cleanedUrl = fullwordpressurl.replace(/\/$/, "");

    const currentSlug = settings.integration?.wordpress?.url || "";

    if (currentSlug) {
      const slugPattern = new RegExp(`/${currentSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
      if (slugPattern.test(cleanedUrl)) {
        cleanedUrl = cleanedUrl.replace(slugPattern, "");
      }
    }

    cleanedUrl = cleanedUrl.replace(/\/$/, "");

    setBaseWordpressUrl(cleanedUrl);
  }, [isLoading]); 

  return (
    <section className="settings-section">
      <div className="settings-card">
        <h2 className="section-title">
          <i className="dashicons dashicons-admin-plugins"></i>
          {__("Integration Settings", "thlogin")}
        </h2>
        
        <div className="settings-group integration-woocommerce integration-wordpress">
          <div className="settings-card woocommerce-card">
            <div className="woocommerce-card-header">
              <div className="woocommerce-icon">
                {/* WordPress logo SVG */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    viewBox="0 0 32 32"
                    style={{ fill: "#228BE6" }}
                  >
                    <path d="M 16 3 C 8.828 3 3 8.828 3 16 C 3 23.172 8.828 29 16 29 C 23.172 29 29 23.172 29 16 C 29 8.828 23.172 3 16 3 z M 16 5.1679688 C 18.82516 5.1679688 21.382078 6.2468336 23.306641 8.0058594 C 23.265326 8.0050228 23.223641 7.9941406 23.171875 7.9941406 C 22.109875 7.9941406 21.417969 8.924875 21.417969 9.921875 C 21.417969 10.820875 21.870828 11.56975 22.423828 12.46875 C 22.834828 13.18375 23.3125 14.115266 23.3125 15.447266 C 23.3125 16.379266 22.965281 17.451031 22.488281 18.957031 L 21.417969 22.564453 L 17.351562 10.037109 C 18.001562 10.004109 18.585938 9.9394531 18.585938 9.9394531 C 19.170937 9.8744531 19.106484 9.0080156 18.521484 9.0410156 C 18.521484 9.0410156 16.766906 9.1816406 15.628906 9.1816406 C 14.567906 9.1816406 12.779297 9.0410156 12.779297 9.0410156 C 12.194297 9.0080156 12.129844 9.9074531 12.714844 9.9394531 C 12.714844 9.9394531 13.266563 10.004109 13.851562 10.037109 L 15.675781 15.544922 L 13.3125 22.652344 L 9.2148438 10.039062 C 9.8758438 10.006063 10.460938 9.9414062 10.460938 9.9414062 C 11.045937 9.8764062 10.970484 9.0099688 10.396484 9.0429688 C 10.396484 9.0429688 8.7146992 9.1764104 7.5761719 9.1816406 C 9.5589323 6.7317465 12.588121 5.1679688 16 5.1679688 z M 25.511719 10.800781 C 26.353267 12.342723 26.832031 14.112696 26.832031 16 C 26.832031 20.289463 24.358708 23.969277 20.759766 25.726562 C 20.993254 25.611348 21.225341 25.495998 21.449219 25.359375 L 24.753906 15.794922 C 25.370906 14.256922 25.576172 13.021016 25.576172 11.916016 C 25.576172 11.515016 25.555672 11.156547 25.513672 10.810547 C 25.51214 10.807602 25.513044 10.803788 25.511719 10.800781 z M 6.203125 11.384766 L 11.265625 25.740234 C 7.6526246 23.988039 5.1679688 20.299746 5.1679688 16 C 5.1679688 14.344834 5.5451007 12.785069 6.203125 11.384766 z M 16.183594 16.943359 L 19.521484 26.074219 C 19.54289 26.12676 19.564216 26.170993 19.595703 26.212891 C 18.469939 26.60708 17.263759 26.832031 16 26.832031 C 14.933113 26.832031 13.905924 26.673405 12.933594 26.388672 L 16.183594 16.943359 z M 11.396484 25.802734 C 11.677917 25.93153 11.962244 26.048201 12.25 26.158203 C 11.959161 26.051366 11.674854 25.933131 11.396484 25.802734 z M 20.416016 25.892578 C 20.187559 25.99425 19.953374 26.083895 19.716797 26.169922 C 19.954263 26.087148 20.187264 25.993584 20.416016 25.892578 z M 12.560547 26.271484 C 12.676284 26.309724 12.791365 26.347933 12.910156 26.382812 C 12.79235 26.348028 12.676619 26.310112 12.560547 26.271484 z"></path>
                  </svg>
              </div>
              <div className="woocommerce-info">
                <h3>{__("WordPress Integration", "thlogin")}</h3>
                <p>
                  {__(
                    "Enable login features for WordPress like replacing wp-login.php with custom modal.",
                    "thlogin"
                  )}
                </p>
              </div>
              <div className="woocommerce-toggle">
                <ToggleControl
                  __nextHasNoMarginBottom={true}
                  checked={settings.integration?.wordpress?.enabled || false}
                   onChange={(isChecked) => {
                      handleSettingChange("integration", ["wordpress", "enabled"], isChecked);
                      setIsExpanded(true);
                    }}
                />
              </div>
            </div>

          {settings.integration?.wordpress?.enabled && (
            <div className="integration-settings-wrapper">
    
                <div
                  className="settings-header-toggle"
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    padding: "12px 16px",
                    background: "#f8f8f8",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {__('Settings', 'themehunk-login-registration')} 
                  <span>{isExpanded ? "▲" : "▼"}</span>
                </div>

              {isExpanded && settings.integration?.wordpress?.enabled && (
                <div className="premium-openeer-toggle">
                    <div className="wordpress-option-slide">

                      <label className="slug-label">
                        <strong>{__("Custom Login Slug", "thlogin")}</strong>
                      </label>

                      <div className="custom-login-url-row">
                        <TextControl
                          placeholder={__("e.g. login, kuber, signin", "thlogin")}
                          value={settings.integration?.wordpress?.url || ""}
                          onChange={(value) =>
                            handleSettingChange("integration", ["wordpress", "url"], value)
                          }
                          className="slug-input"
                        />
                      </div>

                      <div className="final-url-preview">
                      <span style={{ color: "#888" }}>
                        {__("Final URL:", "thlogin")}{" "}
                      </span>
                      <span style={{ color: "#666", userSelect: "all" }}>
                        {baseWordpressUrl + '/' + settings.integration.wordpress.url}
                      </span>
                    </div>
                    </div>

                      <div className="settings-group thlogin-modalchoose-form inetgration-form-type">
                              <h4 className="group-title">{__("Form Type", "themehunk-login-registration")}</h4>

                              <div className="form-type-options">
                                  {[
                                  {
                                      type: "single",
                                      label: __("Single Form", "themehunk-login-registration"),
                                      description: __("Only login form will be shown", "themehunk-login-registration"),
                                  },
                                  {
                                      type: "double",
                                      label: __("Double Form", "themehunk-login-registration"),
                                      description: __("Users can toggle between Login and Register forms", "themehunk-login-registration"),
                                  },
                                  ].map(({ type, label, description }) => (
                                  <div
                                      key={type}
                                      className={`form-type-card ${settings.integration.wordpress?.form_type === type ? "active" : ""}`}
                                      onClick={() => handleSettingChange("integration", ["wordpress", "form_type"], type)}
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
                  </div>
              )}

            </div>
           )}

          </div>
        </div>
           
        <div className="settings-group integration-woocommerce">
          <div className="settings-card woocommerce-card">
            <div className="woocommerce-card-header">
              <div className="woocommerce-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#7f54b3" d="M116.3 89.1H11.7C5.2 89.1 0 83.9 0 77.4v-40C0 31 5.2 25.8 11.7 25.8h104.7c6.4 0 11.7 5.2 11.7 11.7v40c-.1 6.4-5.3 11.6-11.8 11.6z"/><path fill="#FFF" d="M13.8 76.7s2.8 11.8 8.5 3.9 11.2-20.3 11.2-20.3.4-3.1 2 3.7S44 80 44 80s6.3 7.9 8.9-.4c-1-11 2.8-31 6.7-40.6 1.6-8.5-7.3-6.1-8.1-4.1s-6.3 14.8-6.7 28.2c0 0-4.7-12.8-5.1-17.4-.4-4.7-5.3-5.9-8.1-1.4S20.3 66.2 20.3 66.2l-5.5-28.4s-5.5-7.3-8.7 1.6c0 0 5.7 34.9 7.7 37.3zM87 45.7c-8.5-14.2-21.1-3.4-21.1-3.4s-9.6 11.1-5.3 26.2c6.9 14.9 16.6 8.3 19.2 7.1 2.7-1.3 14.1-14.3 7.2-29.9zm-6.5 12.5c0 5.9-4.9 11.4-8.9 10.2-2.2-1.3-3.6-4.8-3.6-10.8 2-9.7 6.4-11 8.7-10.8 4.3 2.3 4.1 7.4 3.8 11.4zM118.9 45.7c-8.5-14.2-21.1-3.4-21.1-3.4s-9.6 11.1-5.3 26.2c6.9 14.9 16.6 8.3 19.2 7.1 2.6-1.3 14.1-14.3 7.2-29.9zm-6.5 12.5c0 5.9-4.9 11.4-8.9 10.2-2.2-1.3-3.6-4.8-3.6-10.8 2-9.7 6.4-11 8.7-10.8 4.2 2.3 4 7.4 3.8 11.4z"/><path fill="#7f54b3" d="M61.3 89.1l22.3 13.1-4.7-13.1-12.8-3.6z"/></svg>
              </div>
              <div className="woocommerce-info">
                <h3>{__("WooCommerce Integration", "thlogin")}</h3>
                <p>
                  {__(
                    "Enable login features for WooCommerce like checkout login, account sync, etc.",
                    "themehunk-login-registration"
                  )}
                </p>
              </div>
              <div className="woocommerce-toggle">
                <ToggleControl
                  __nextHasNoMarginBottom={true}
                  checked={settings.integration?.woocommerce?.enabled || false}
                  disabled={!isWooEnabled}
                  onChange={(isChecked) =>
                    handleSettingChange("integration", ["woocommerce", "enabled"], isChecked)
                  }
                />
              </div>
            </div>

            {!isWooEnabled && (
                <div style={{ marginTop: "15px" }}>
                  <Notice status="warning" isDismissible={false}>
                    {__(
                      "To enable WooCommerce integration, please install and activate the WooCommerce plugin.",
                      "thlogin"
                    )}
                  </Notice>
                </div>
              )}

          </div>
        </div>

        {/* <div className="settings-group integration-woocommerce">
          <div className="settings-card woocommerce-card">
            <div className="woocommerce-card-header">
              <div className="woocommerce-icon smtp-image-icon">
                <img src="https://ps.w.org/post-smtp/assets/icon-128x128.gif?rev=3209655"></img>
              </div>
              <div className="woocommerce-info">
                <h3>{__("SMTP Integration", "thlogin")}</h3>
                <p>
                  {__(
                    "Enable SMTP to improve email deliverability and send login-related emails reliably.",
                    "themehunk-login-registration"
                  )}
                </p>
              </div>
              <div className="woocommerce-toggle">
                <ToggleControl
                  __nextHasNoMarginBottom={true}
                  checked={settings.integration?.smtp?.enabled || false}
                  disabled={!isSmtpEnabled}
                  onChange={(isChecked) =>
                    handleSettingChange("integration", ["smtp", "enabled"], isChecked)
                  }
                />
              </div>
            </div>

            {!isSmtpEnabled && (
                <div style={{ marginTop: "15px" }}>
                  <Notice status="warning" isDismissible={false}>
                    {__(
                      "To enable SMTP integration, please install and activate the SMTP plugin.",
                      "thlogin"
                    )}
                  </Notice>
                </div>
              )}

          </div>
        </div> */}

      </div>
    </section>
  );
};

export default IntegrationSettings;