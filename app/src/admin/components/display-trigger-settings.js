import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, TextareaControl, Button, Dashicon } from "@wordpress/components";

const DisplayTriggersSettings = ({ settings, handleSettingChange }) => {
  return (
        <section className="settings-section">
            <div className="settings-card">
            <h2 className="section-title">
                <i className="dashicons dashicons-visibility"></i>
                {__("Display Triggers", "th-login")}
            </h2>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Trigger Methods", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("CSS Class Trigger", "th-login")}</h4>
                    <p className="description">
                    {__("Class name to trigger the modal", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={
                        settings.display_triggers.trigger_css_class ||
                        "th-login-trigger"
                    }
                    onChange={(newValue) =>
                        handleSettingChange(
                        "display_triggers",
                        ["trigger_css_class"],
                        newValue
                        )
                    }
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Shortcode", "th-login")}</h4>
                    <p className="description">
                    {__(
                        "Use [th_login_popup_link] to generate trigger links",
                        "th-login"
                    )}
                    </p>
                </div>
                </div>
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Auto-Open Conditions", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("On Page Load", "th-login")}</h4>
                    <p className="description">
                    {__("Automatically open when page loads", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_on_load
                        ?.enabled || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        ["auto_open_on_load", "enabled"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_on_load?.enabled && (
                <div className="setting-row">
                    <div className="setting-label">
                    <h4>{__("Delay (seconds)", "th-login")}</h4>
                    <p className="description">
                        {__("Delay before showing the modal", "th-login")}
                    </p>
                    </div>
                    <div className="setting-control">
                    <TextControl
                        type="number"
                        min="0"
                        value={
                        settings.display_triggers.auto_open_on_load
                            ?.delay_seconds || 0
                        }
                        onChange={(newValue) =>
                        handleSettingChange(
                            "display_triggers",
                            ["auto_open_on_load", "delay_seconds"],
                            parseInt(newValue, 10)
                        )
                        }
                    />
                    </div>
                </div>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Auto-Open on Scroll", "th-login")}</h4>
                    <p className="description">
                    {__("Automatically open the modal when the user scrolls down a certain percentage of the page.", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.display_triggers.auto_open_on_scroll?.enabled || false}
                    onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_on_scroll', 'enabled'], isChecked)}
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_on_scroll?.enabled && (
                <div className="setting-row">
                    <div className="setting-label">
                    <h4>{__("Scroll Percentage (%)", "th-login")}</h4>
                    <p className="description">
                        {__("Percentage of the page scrolled before the modal opens.", "th-login")}
                    </p>
                    </div>
                    <div className="setting-control">
                    <TextControl
                        type="number"
                        min="1"
                        max="100"
                        value={settings.display_triggers.auto_open_on_scroll?.scroll_percentage || 50}
                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_on_scroll', 'scroll_percentage'], parseInt(newValue, 10))}
                    />
                    </div>
                </div>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Auto-Open on Exit Intent", "th-login")}</h4>
                    <p className="description">
                    {__("Automatically open the modal when the user's mouse leaves the browser viewport (e.g., trying to close the tab).", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.display_triggers.auto_open_on_exit_intent?.enabled || false}
                    onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_on_exit_intent', 'enabled'], isChecked)}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Auto-Open on Time on Page", "th-login")}</h4>
                    <p className="description">
                    {__("Automatically open the modal after the user spends a specified amount of time on the page.", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.display_triggers.auto_open_on_time_on_page?.enabled || false}
                    onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'enabled'], isChecked)}
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_on_time_on_page?.enabled && (
                <div className="setting-row">
                    <div className="setting-label">
                    <h4>{__("Time on Page (seconds)", "th-login")}</h4>
                    <p className="description">
                        {__("Time in seconds before the modal opens.", "th-login")}
                    </p>
                    </div>
                    <div className="setting-control">
                    <TextControl
                        type="number"
                        min="1"
                        value={settings.display_triggers.auto_open_on_time_on_page?.time_seconds || 10}
                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'time_seconds'], parseInt(newValue, 10))}
                    />
                    </div>
                </div>
                )}

                {/* More trigger conditions... */}
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Audience Conditions", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Logged Out Users Only", "th-login")}</h4>
                    <p className="description">
                    {__("Only show to logged out users", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_conditions
                        ?.for_logged_out_only || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        ["auto_open_conditions", "for_logged_out_only"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show for Specific User Roles (comma-separated slugs)", "th-login")}</h4>
                    <p className="description">
                    {__("Enter user role slugs (e.g., administrator, editor, subscriber). Leave empty for all roles.", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.display_triggers.auto_open_conditions?.for_specific_roles?.join(', ') || ''}
                    onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'for_specific_roles'], newValue.split(',').map(s => s.trim()))}
                    />
                </div>
                </div>

                {/* More audience conditions... */}
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Page & Content Conditions", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Specific Pages/Posts", "th-login")}</h4>
                    <p className="description">
                    {__("Show on specific pages or posts", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_conditions
                        ?.on_specific_pages?.enabled || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        [
                            "auto_open_conditions",
                            "on_specific_pages",
                            "enabled",
                        ],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_conditions
                ?.on_specific_pages?.enabled && (
                <>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Page/Post IDs", "th-login")}</h4>
                        <p className="description">
                        {__("Comma-separated list of IDs", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.auto_open_conditions?.on_specific_pages?.page_ids?.join(
                            ", "
                            ) || ""
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            [
                                "auto_open_conditions",
                                "on_specific_pages",
                                "page_ids",
                            ],
                            newValue
                                .split(",")
                                .map((s) => parseInt(s.trim(), 10))
                                .filter((id) => !isNaN(id))
                            )
                        }
                        placeholder="10, 25, 30"
                        />
                    </div>
                    </div>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Page/Post Slugs", "th-login")}</h4>
                        <p className="description">
                        {__("Comma-separated list of slugs", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.auto_open_conditions?.on_specific_pages?.page_slugs?.join(
                            ", "
                            ) || ""
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            [
                                "auto_open_conditions",
                                "on_specific_pages",
                                "page_slugs",
                            ],
                            newValue.split(",").map((s) => s.trim())
                            )
                        }
                        placeholder="about-us, contact"
                        />
                    </div>
                    </div>
                </>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show on Specific Categories", "th-login")}</h4>
                    <p className="description">
                    {__("Control modal display on posts within specific categories.", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.display_triggers.auto_open_conditions?.on_specific_categories?.enabled || false}
                    onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'enabled'], isChecked)}
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_conditions?.on_specific_categories?.enabled && (
                <>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Category IDs (comma-separated)", "th-login")}</h4>
                        <p className="description">
                        {__("Enter category IDs (e.g., 5, 12).", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={settings.display_triggers.auto_open_conditions?.on_specific_categories?.category_ids?.join(', ') || ''}
                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_ids'], newValue.split(',').map(s => parseInt(s.trim(), 10)).filter(id => !isNaN(id)))}
                        />
                    </div>
                    </div>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Category Slugs (comma-separated)", "th-login")}</h4>
                        <p className="description">
                        {__("Enter category slugs (e.g., news, blog).", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={settings.display_triggers.auto_open_conditions?.on_specific_categories?.category_slugs?.join(', ') || ''}
                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_slugs'], newValue.split(',').map(s => s.trim()))}
                        />
                    </div>
                    </div>
                </>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show on Specific Tags", "th-login")}</h4>
                    <p className="description">
                    {__("Control modal display on posts with specific tags.", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.display_triggers.auto_open_conditions?.on_specific_tags?.enabled || false}
                    onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'enabled'], isChecked)}
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_conditions?.on_specific_tags?.enabled && (
                <>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Tag IDs (comma-separated)", "th-login")}</h4>
                        <p className="description">
                        {__("Enter tag IDs (e.g., 7, 15).", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={settings.display_triggers.auto_open_conditions?.on_specific_tags?.tag_ids?.join(', ') || ''}
                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_ids'], newValue.split(',').map(s => parseInt(s.trim(), 10)).filter(id => !isNaN(id)))}
                        />
                    </div>
                    </div>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Tag Slugs (comma-separated)", "th-login")}</h4>
                        <p className="description">
                        {__("Enter tag slugs (e.g., featured, popular).", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={settings.display_triggers.auto_open_conditions?.on_specific_tags?.tag_slugs?.join(', ') || ''}
                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_slugs'], newValue.split(',').map(s => s.trim()))}
                        />
                    </div>
                    </div>
                </>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show on WooCommerce My Account Page", "th-login")}</h4>
                    <p className="description">
                    {__("Automatically open the modal on the WooCommerce My Account page.", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.display_triggers.auto_open_conditions?.on_woocommerce_myaccount || false}
                    onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_myaccount'], isChecked)}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show on WooCommerce Checkout Page", "th-login")}</h4>
                    <p className="description">
                    {__("Automatically open the modal on the WooCommerce Checkout page.", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.display_triggers.auto_open_conditions?.on_woocommerce_checkout || false}
                    onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_checkout'], isChecked)}
                    />
                </div>
                </div>

                {/* More page/content conditions... */}
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Device Visibility", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Desktop", "th-login")}</h4>
                    <p className="description">
                    {__("Show on desktop devices", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_conditions
                        ?.device_visibility?.desktop || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        [
                            "auto_open_conditions",
                            "device_visibility",
                            "desktop",
                        ],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Tablet", "th-login")}</h4>
                    <p className="description">
                    {__("Show on tablet devices", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_conditions
                        ?.device_visibility?.tablet || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        [
                            "auto_open_conditions",
                            "device_visibility",
                            "tablet",
                        ],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Mobile", "th-login")}</h4>
                    <p className="description">
                    {__("Show on mobile devices", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_conditions
                        ?.device_visibility?.mobile || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        [
                            "auto_open_conditions",
                            "device_visibility",
                            "mobile",
                        ],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Advanced Triggers", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("URL Parameter Trigger", "th-login")}</h4>
                    <p className="description">
                    {__(
                        "Open when specific URL parameter is present",
                        "th-login"
                    )}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_conditions
                        ?.url_parameter_trigger?.enabled || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        [
                            "auto_open_conditions",
                            "url_parameter_trigger",
                            "enabled",
                        ],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_conditions
                ?.url_parameter_trigger?.enabled && (
                <>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Parameter Name", "th-login")}</h4>
                        <p className="description">
                        {__("URL parameter name", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.auto_open_conditions
                            ?.url_parameter_trigger?.param_name ||
                            "th_login"
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            [
                                "auto_open_conditions",
                                "url_parameter_trigger",
                                "param_name",
                            ],
                            newValue
                            )
                        }
                        />
                    </div>
                    </div>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Parameter Value", "th-login")}</h4>
                        <p className="description">
                        {__("URL parameter value", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.auto_open_conditions
                            ?.url_parameter_trigger?.param_value || "open"
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            [
                                "auto_open_conditions",
                                "url_parameter_trigger",
                                "param_value",
                            ],
                            newValue
                            )
                        }
                        />
                    </div>
                    </div>
                </>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Referrer Detection", "th-login")}</h4>
                    <p className="description">
                    {__(
                        "Open when arriving from specific referrers",
                        "th-login"
                    )}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.auto_open_conditions
                        ?.referrer_detection?.enabled || false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        [
                            "auto_open_conditions",
                            "referrer_detection",
                            "enabled",
                        ],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                {settings.display_triggers.auto_open_conditions
                ?.referrer_detection?.enabled && (
                <div className="setting-row">
                    <div className="setting-label">
                    <h4>{__("Referrer URLs", "th-login")}</h4>
                    <p className="description">
                        {__("One URL per line", "th-login")}
                    </p>
                    </div>
                    <div className="setting-control">
                    <TextareaControl
                        value={
                        settings.display_triggers.auto_open_conditions?.referrer_detection?.referrer_urls?.join(
                            "\n"
                        ) || ""
                        }
                        onChange={(newValue) =>
                        handleSettingChange(
                            "display_triggers",
                            [
                            "auto_open_conditions",
                            "referrer_detection",
                            "referrer_urls",
                            ],
                            newValue
                            .split("\n")
                            .map((s) => s.trim())
                            .filter((s) => s !== "")
                        )
                        }
                        rows={5}
                    />
                    </div>
                </div>
                )}
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Pop-up Frequency", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Enable Frequency Control", "th-login")}</h4>
                    <p className="description">
                    {__("Control how often pop-up appears", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.pop_up_frequency?.enabled ||
                        false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        ["pop_up_frequency", "enabled"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                {settings.display_triggers.pop_up_frequency?.enabled && (
                <>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Frequency Type", "th-login")}</h4>
                        <p className="description">
                        {__("How to limit pop-up frequency", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <select
                        value={
                            settings.display_triggers.pop_up_frequency
                            ?.type || "session"
                        }
                        onChange={(e) =>
                            handleSettingChange(
                            "display_triggers",
                            ["pop_up_frequency", "type"],
                            e.target.value
                            )
                        }
                        >
                        <option value="session">
                            {__("Once per session", "th-login")}
                        </option>
                        <option value="days">
                            {__("Once every X days", "th-login")}
                        </option>
                        </select>
                    </div>
                    </div>
                    {settings.display_triggers.pop_up_frequency?.type ===
                    "days" && (
                    <div className="setting-row">
                        <div className="setting-label">
                        <h4>{__("Days to Hide", "th-login")}</h4>
                        <p className="description">
                            {__("Days before showing again", "th-login")}
                        </p>
                        </div>
                        <div className="setting-control">
                        <TextControl
                            type="number"
                            min="1"
                            value={
                            settings.display_triggers.pop_up_frequency
                                ?.days || 7
                            }
                            onChange={(newValue) =>
                            handleSettingChange(
                                "display_triggers",
                                ["pop_up_frequency", "days"],
                                parseInt(newValue, 10)
                            )
                            }
                        />
                        </div>
                    </div>
                    )}
                </>
                )}
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Menu Integration", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Enable Menu Items", "th-login")}</h4>
                    <p className="description">
                    {__("Add login/register links to menus", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={
                        settings.display_triggers.menu_integration?.enabled ||
                        false
                    }
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "display_triggers",
                        ["menu_integration", "enabled"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                {settings.display_triggers.menu_integration?.enabled && (
                <>
                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Menu Slug", "th-login")}</h4>
                        <p className="description">
                        {__('Menu to add items to (or "all")', "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.menu_integration
                            ?.menu_slug || "primary"
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            ["menu_integration", "menu_slug"],
                            newValue
                            )
                        }
                        />
                    </div>
                    </div>

                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Login Item Text", "th-login")}</h4>
                        <p className="description">
                        {__("Text for login menu item", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.menu_integration
                            ?.item_text_login || __("Login", "th-login")
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            ["menu_integration", "item_text_login"],
                            newValue
                            )
                        }
                        />
                    </div>
                    </div>

                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Login Item Icon", "th-login")}</h4>
                        <p className="description">
                        {__("Dashicon for login menu item", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.menu_integration
                            ?.item_icon_login || "dashicons-admin-users"
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            ["menu_integration", "item_icon_login"],
                            newValue
                            )
                        }
                        />
                    </div>
                    </div>

                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Hide Login When Logged In", "th-login")}</h4>
                        <p className="description">
                        {__(
                            "Hide login item for logged in users",
                            "th-login"
                        )}
                        </p>
                    </div>
                    <div className="setting-control">
                        <ToggleControl
                        checked={
                            settings.display_triggers.menu_integration
                            ?.visibility_login_logged_in || false
                        }
                        onChange={(isChecked) =>
                            handleSettingChange(
                            "display_triggers",
                            [
                                "menu_integration",
                                "visibility_login_logged_in",
                            ],
                            isChecked
                            )
                        }
                        />
                    </div>
                    </div>

                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Register Item Text", "th-login")}</h4>
                        <p className="description">
                        {__("Text for register menu item", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.menu_integration
                            ?.item_text_register ||
                            __("Register", "th-login")
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            ["menu_integration", "item_text_register"],
                            newValue
                            )
                        }
                        />
                    </div>
                    </div>

                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>{__("Register Item Icon", "th-login")}</h4>
                        <p className="description">
                        {__("Dashicon for register menu item", "th-login")}
                        </p>
                    </div>
                    <div className="setting-control">
                        <TextControl
                        value={
                            settings.display_triggers.menu_integration
                            ?.item_icon_register || "dashicons-plus-alt"
                        }
                        onChange={(newValue) =>
                            handleSettingChange(
                            "display_triggers",
                            ["menu_integration", "item_icon_register"],
                            newValue
                            )
                        }
                        />
                    </div>
                    </div>

                    <div className="setting-row">
                    <div className="setting-label">
                        <h4>
                        {__("Hide Register When Logged In", "th-login")}
                        </h4>
                        <p className="description">
                        {__(
                            "Hide register item for logged in users",
                            "th-login"
                        )}
                        </p>
                    </div>
                    <div className="setting-control">
                        <ToggleControl
                        checked={
                            settings.display_triggers.menu_integration
                            ?.visibility_register_logged_in || false
                        }
                        onChange={(isChecked) =>
                            handleSettingChange(
                            "display_triggers",
                            [
                                "menu_integration",
                                "visibility_register_logged_in",
                            ],
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

export default DisplayTriggersSettings;