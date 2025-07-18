import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, FormTokenField} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useEffect } from "react";
import apiFetch from "@wordpress/api-fetch";

const DisplayTriggersSettings = ({ settings, handleSettingChange }) => {

    const [activeTab, setActiveTab] = useState("auto_open");

    const [suggestions, setSuggestions] = useState({
        pages: [],
        posts: [],
        categories: [],
        tags: [],
    });

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
            const response = await apiFetch({ path: "thlogin/v1/content-suggestions" });

            if (response) {
                setSuggestions(response);
            }
            } catch (error) {
                console.error("Error fetching content suggestions:", error);
            }
        };

        fetchSuggestions();
    }, []);

    const tabs = [
        { key: "auto_open", label: __("Auto-Open", "thlogin") },
        { key: "page_conditions", label: __("Page Conditions", "thlogin") },
        { key: "device", label: __("Device Visibility", "thlogin") },
        { key: "frequency", label: __("Frequency", "thlogin") },
        { key: "menu", label: __("Menu Integration", "thlogin") },
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

  return (
        <section className="settings-section">
            <div className="settings-card">

                <h2 className="section-title">
                    <i className="dashicons dashicons-visibility"></i>
                    {__("Display Triggers", "thlogin")}
                </h2>

                {renderTabs()}

                {activeTab === "auto_open" && (
                    <div className="settings-group">
                        <h3 className="group-title">
                        {__("Auto-Open Conditions", "thlogin")}
                        </h3>

                        <div className="setting-row">
                            <div className="setting-label">
                                <h4>{__("On Page Load", "thlogin")}</h4>
                                <p className="description">
                                {__("Automatically open when page loads", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
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
                            <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                <h4>{__("Delay (seconds)", "thlogin")}</h4>
                                <p className="description">
                                    {__("Delay before showing the modal", "thlogin")}
                                </p>
                                </div>
                                <div className="setting-control text-small-box">
                                <TextControl
                                                                __next40pxDefaultSize = {true}
                                    __nextHasNoMarginBottom={true}
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
                                <h4>{__("Auto-Open on Scroll", "thlogin")}</h4>
                                <p className="description">
                                {__("Automatically open the modal when the user scrolls down a certain percentage of the page.", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control  ">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_on_scroll?.enabled || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_on_scroll', 'enabled'], isChecked)}
                                />
                            </div>
                        </div>

                        {settings.display_triggers.auto_open_on_scroll?.enabled && (
                            <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                <h4>{__("Scroll Percentage (%)", "thlogin")}</h4>
                                <p className="description">
                                    {__("Percentage of the page scrolled before the modal opens.", "thlogin")}
                                </p>
                                </div>
                                <div className="setting-control text-small-box">
                                <TextControl
                                                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
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
                                <h4>{__("Auto-Open on Exit Intent", "thlogin")}</h4>
                                <p className="description">
                                {__("Automatically open the modal when the user's mouse leaves the browser viewport (e.g., trying to close the tab).", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_on_exit_intent?.enabled || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_on_exit_intent', 'enabled'], isChecked)}
                                />
                            </div>
                        </div>

                        <div className="setting-row">
                            <div className="setting-label">
                                <h4>{__("Auto-Open on Time on Page", "thlogin")}</h4>
                                <p className="description">
                                {__("Automatically open the modal after the user spends a specified amount of time on the page.", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_on_time_on_page?.enabled || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'enabled'], isChecked)}
                                />
                            </div>
                        </div>

                        {settings.display_triggers.auto_open_on_time_on_page?.enabled && (
                            <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                <h4>{__("Time on Page (seconds)", "thlogin")}</h4>
                                <p className="description">
                                    {__("Time in seconds before the modal opens.", "thlogin")}
                                </p>
                                </div>
                                <div className="setting-control text-small-box">
                                <TextControl
                                                                __next40pxDefaultSize = {true}
                                    __nextHasNoMarginBottom={true}
                                    type="number"
                                    min="1"
                                    value={settings.display_triggers.auto_open_on_time_on_page?.time_seconds || 10}
                                    onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'time_seconds'], parseInt(newValue, 10))}
                                />
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {activeTab === "page_conditions" && (
                    <div className="settings-group">
                        <h3 className="group-title">
                        {__("Page & Content Conditions", "thlogin")}
                        </h3>

                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Specific Pages/Posts", "thlogin")}</h4>
                            <p className="description">
                            {__("Show on specific pages or posts", "thlogin")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <ToggleControl
                            __nextHasNoMarginBottom={true}
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

                        {settings.display_triggers.auto_open_conditions ?.on_specific_pages?.enabled && (
                            <div className="menu-item-group">
                               
                                <FormTokenField
                                    label={__('Select Pages/Posts', 'thlogin')}
                                    value={
                                        settings.display_triggers.auto_open_conditions?.on_specific_pages?.page_ids?.map(id => {
                                            const matched = [...suggestions.pages, ...suggestions.posts].find(p => p.id === id);
                                            return matched?.title || `Untitled (ID: ${id})`;
                                        }) || []
                                    }
                                    suggestions={
                                        [...suggestions.pages, ...suggestions.posts].map(p =>
                                            p.title || `Untitled (ID: ${p.id})`
                                        )
                                    }
                                    onChange={(tokens) => {
                                        const selectedIds = tokens.map(token => {
                                            const match = [...suggestions.pages, ...suggestions.posts].find(p =>
                                                (p.title || `Untitled (ID: ${p.id})`) === token
                                            );
                                            return match?.id;
                                        }).filter(Boolean);
                                        handleSettingChange(
                                            'display_triggers',
                                            ['auto_open_conditions', 'on_specific_pages', 'page_ids'],
                                            selectedIds
                                        );
                                    }}
                                    __experimentalExpandOnFocus={true}
                                    __next40pxDefaultSize={true}
                                    __nextHasNoMarginBottom={true}
                                    __experimentalValidateInput={(input) =>
                                        [...suggestions.pages, ...suggestions.posts].some(opt =>
                                            (opt.title || `Untitled (ID: ${opt.id})`) === input
                                        )
                                    }
                                />
                   
                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                        <h4>{__("Page/Post IDs", "thlogin")}</h4>
                                        <p className="description">
                                        {__("Comma-separated list of IDs", "thlogin")}
                                        </p>
                                    </div>
                                    <div className="setting-control">
                                        <TextControl
                                            __next40pxDefaultSize = {true}
                                            __nextHasNoMarginBottom={true}
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

                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                        <h4>{__("Page/Post Slugs", "thlogin")}</h4>
                                        <p className="description">
                                        {__("Comma-separated list of slugs", "thlogin")}
                                        </p>
                                    </div>
                                    <div className="setting-control">
                                        <TextControl
                                                                        __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
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
                            </div>
                        )}

                        <div className="setting-row">
                            <div className="setting-label">
                                <h4>{__("Show on Specific Categories", "thlogin")}</h4>
                                <p className="description">
                                {__("Control modal display on posts within specific categories.", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_conditions?.on_specific_categories?.enabled || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'enabled'], isChecked)}
                                />
                            </div>
                        </div>

                        {settings.display_triggers.auto_open_conditions?.on_specific_categories?.enabled && (
                            <div className="menu-item-group">

                                <FormTokenField
                                    label={__('Select Categories', 'thlogin')}
                                    value={
                                        settings.display_triggers.auto_open_conditions?.on_specific_categories?.category_ids?.map(id => {
                                            const matched = suggestions.categories?.find(cat => cat.id === id);
                                            return matched?.name || `Unnamed (ID: ${id})`;
                                        }) || []
                                    }
                                    suggestions={
                                        suggestions.categories?.map(cat => cat.name || `Unnamed (ID: ${cat.id})`) || []
                                    }
                                    onChange={(tokens) => {
                                        const selectedIds = tokens
                                            .map(token => {
                                                const match = suggestions.categories?.find(cat =>
                                                    (cat.name || `Unnamed (ID: ${cat.id})`) === token
                                                );
                                                return match?.id;
                                            })
                                            .filter(Boolean);
                                        handleSettingChange(
                                            'display_triggers',
                                            ['auto_open_conditions', 'on_specific_categories', 'category_ids'],
                                            selectedIds
                                        );
                                    }}
                                    __experimentalExpandOnFocus={true}
                                    __next40pxDefaultSize={true}
                                    __nextHasNoMarginBottom={true}
                                    __experimentalValidateInput={(input) =>
                                        suggestions.categories?.some(cat =>
                                            (cat.name || `Unnamed (ID: ${cat.id})`) === input
                                        )
                                    }
                                />


                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                        <h4>{__("Category IDs (comma-separated)", "thlogin")}</h4>
                                        <p className="description">
                                        {__("Enter category IDs (e.g., 5, 12).", "thlogin")}
                                        </p>
                                    </div>

                                    <div className="setting-control">
                                        <TextControl
                                                                        __next40pxDefaultSize = {true}
                                    __nextHasNoMarginBottom={true}
                                        value={settings.display_triggers.auto_open_conditions?.on_specific_categories?.category_ids?.join(', ') || ''}
                                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_ids'], newValue.split(',').map(s => parseInt(s.trim(), 10)).filter(id => !isNaN(id)))}
                                        />
                                    </div>
                                </div>

                                <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                    <h4>{__("Category Slugs (comma-separated)", "thlogin")}</h4>
                                    <p className="description">
                                    {__("Enter category slugs (e.g., news, blog).", "thlogin")}
                                    </p>
                                </div>
                                <div className="setting-control">
                                    <TextControl
                                                                    __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
                                    value={settings.display_triggers.auto_open_conditions?.on_specific_categories?.category_slugs?.join(', ') || ''}
                                    onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_slugs'], newValue.split(',').map(s => s.trim()))}
                                    />
                                </div>
                                </div>
                            </div>
                        )}

                        <div className="setting-row">
                            <div className="setting-label">
                                <h4>{__("Show on Specific Tags", "thlogin")}</h4>
                                <p className="description">
                                {__("Control modal display on posts with specific tags.", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_conditions?.on_specific_tags?.enabled || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'enabled'], isChecked)}
                                />
                            </div>
                        </div>

                        {settings.display_triggers.auto_open_conditions?.on_specific_tags?.enabled && (
                            <div className="menu-item-group">

                                <FormTokenField
                                    label={__('Select Tags', 'thlogin')}
                                    value={
                                        settings.display_triggers.auto_open_conditions?.on_specific_tags?.tag_ids?.map(id => {
                                            const matched = suggestions.tags?.find(tag => tag.id === id);
                                            return matched?.name || `Unnamed (ID: ${id})`;
                                        }) || []
                                    }
                                    suggestions={
                                        suggestions.tags?.map(tag => tag.name || `Unnamed (ID: ${tag.id})`) || []
                                    }
                                    onChange={(tokens) => {
                                        const selectedIds = tokens
                                            .map(token => {
                                                const match = suggestions.tags?.find(tag =>
                                                    (tag.name || `Unnamed (ID: ${tag.id})`) === token
                                                );
                                                return match?.id;
                                            })
                                            .filter(Boolean);
                                        handleSettingChange(
                                            'display_triggers',
                                            ['auto_open_conditions', 'on_specific_tags', 'tag_ids'],
                                            selectedIds
                                        );
                                    }}
                                    __experimentalExpandOnFocus={true}
                                    __next40pxDefaultSize={true}
                                    __nextHasNoMarginBottom={true}
                                    __experimentalValidateInput={(input) =>
                                        suggestions.tags?.some(tag =>
                                            (tag.name || `Unnamed (ID: ${tag.id})`) === input
                                        )
                                    }
                                />

                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                        <h4>{__("Tag IDs (comma-separated)", "thlogin")}</h4>
                                        <p className="description">
                                        {__("Enter tag IDs (e.g., 7, 15).", "thlogin")}
                                        </p>
                                    </div>

                                    <div className="setting-control">
                                        <TextControl
                                                                        __next40pxDefaultSize = {true}
                                    __nextHasNoMarginBottom={true}
                                        value={settings.display_triggers.auto_open_conditions?.on_specific_tags?.tag_ids?.join(', ') || ''}
                                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_ids'], newValue.split(',').map(s => parseInt(s.trim(), 10)).filter(id => !isNaN(id)))}
                                        />
                                    </div>
                                </div>

                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                        <h4>{__("Tag Slugs (comma-separated)", "thlogin")}</h4>
                                        <p className="description">
                                        {__("Enter tag slugs (e.g., featured, popular).", "thlogin")}
                                        </p>
                                    </div>

                                    <div className="setting-control">
                                        <TextControl
                                                                        __next40pxDefaultSize = {true}
                                    __nextHasNoMarginBottom={true}
                                        value={settings.display_triggers.auto_open_conditions?.on_specific_tags?.tag_slugs?.join(', ') || ''}
                                        onChange={(newValue) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_slugs'], newValue.split(',').map(s => s.trim()))}
                                        />
                                    </div>
                                </div>

                            </div>
                        )}

                        <div className="setting-row">
                            <div className="setting-label">
                                <h4>{__("Show on WooCommerce My Account Page", "thlogin")}</h4>
                                <p className="description">
                                {__("Automatically open the modal on the WooCommerce My Account page.", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_conditions?.on_woocommerce_myaccount || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_myaccount'], isChecked)}
                                />
                            </div>
                        </div>

                        <div className="setting-row">
                            <div className="setting-label">
                                <h4>{__("Show on WooCommerce Checkout Page", "thlogin")}</h4>
                                <p className="description">
                                {__("Automatically open the modal on the WooCommerce Checkout page.", "thlogin")}
                                </p>
                            </div>

                            <div className="setting-control">
                                <ToggleControl
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_conditions?.on_woocommerce_checkout || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_checkout'], isChecked)}
                                />
                            </div>
                        </div>

                    </div>
                )}

                {activeTab === "device" && (
                    <div className="settings-group">
                        <h3 className="group-title">
                        {__("Device Visibility", "thlogin")}
                        </h3>

                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Desktop", "thlogin")}</h4>
                            <p className="description">
                            {__("Show on desktop devices", "thlogin")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <ToggleControl
                            __nextHasNoMarginBottom={true}
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
                            <h4>{__("Tablet", "thlogin")}</h4>
                            <p className="description">
                            {__("Show on tablet devices", "thlogin")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <ToggleControl
                            __nextHasNoMarginBottom={true}
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
                            <h4>{__("Mobile", "thlogin")}</h4>
                            <p className="description">
                            {__("Show on mobile devices", "thlogin")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <ToggleControl
                            __nextHasNoMarginBottom={true}
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
                )}

                {activeTab === "frequency" && (
                    <div className="settings-group">
                        <h3 className="group-title">
                        {__("Pop-up Frequency", "thlogin")}
                        </h3>

                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Enable Frequency Control", "thlogin")}</h4>
                            <p className="description">
                            {__("Control how often pop-up appears", "thlogin")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <ToggleControl
                            __nextHasNoMarginBottom={true}
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
                            <div className="setting-row under-small-portion">
                            <div className="setting-label">
                                <h4>{__("Frequency Type", "thlogin")}</h4>
                                <p className="description">
                                {__("How to limit pop-up frequency", "thlogin")}
                                </p>
                            </div>
                                <div className="setting-control select-control-settings-popup">
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
                                            {__("Once per session", "thlogin")}
                                        </option>
                                        <option value="days">
                                            {__("Once every X days", "thlogin")}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            {settings.display_triggers.pop_up_frequency?.type ===
                            "days" && (
                            <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                <h4>{__("Days to Hide", "thlogin")}</h4>
                                <p className="description">
                                    {__("Days before showing again", "thlogin")}
                                </p>
                                </div>
                                <div className="setting-control text-small-box">
                                <TextControl
                                                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
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
                )}

                {activeTab === "menu" && (
                    <div className="settings-group">
                        <h3 className="group-title">
                        {__("Menu Integration", "thlogin")}
                        </h3>

                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Enable Menu Items", "thlogin")}</h4>
                            <p className="description">
                            {__("Add login/register links to menus", "thlogin")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <ToggleControl
                            __nextHasNoMarginBottom={true}
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
                            <div className="setting-row under-small-portion">
                            <div className="setting-label">
                                <h4>{__("Menu Slug", "thlogin")}</h4>
                                <p className="description">
                                {__('Menu to add items to (or "all")', "thlogin")}
                                </p>
                            </div>
                            <div className="setting-control">
                                <TextControl
                                                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
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

                            <div className="menu-item-group login-group">
                                <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                    <h4>{__("Login Item Text", "thlogin")}</h4>
                                    <p className="description">
                                    {__("Text for login menu item", "thlogin")}
                                    </p>
                                </div>
                                <div className="setting-control">
                                    <TextControl
                                                                    __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
                                    value={
                                        settings.display_triggers.menu_integration
                                        ?.item_text_login || __("Login", "thlogin")
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

                                <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                    <h4>{__("Login Item Icon", "thlogin")}</h4>
                                    <p className="description">
                                    {__("Dashicon for login menu item", "thlogin")}
                                    </p>
                                </div>
                                <div className="setting-control">
                                    <TextControl
                                                                    __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
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

                                <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                    <h4>{__("Hide Login When Logged In", "thlogin")}</h4>
                                    <p className="description">
                                    {__(
                                        "Hide login item for logged in users",
                                        "thlogin"
                                    )}
                                    </p>
                                </div>
                                <div className="setting-control">
                                    <ToggleControl
                                    __nextHasNoMarginBottom={true}
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
                            </div>

                            <div className="menu-item-group login-group">
                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                        <h4>{__("Register Item Text", "thlogin")}</h4>
                                        <p className="description">
                                        {__("Text for register menu item", "thlogin")}
                                        </p>
                                    </div>
                                    <div className="setting-control">
                                        <TextControl
                                            __next40pxDefaultSize = {true}
                                            __nextHasNoMarginBottom={true}
                                        value={
                                            settings.display_triggers.menu_integration
                                            ?.item_text_register ||
                                            __("Register", "thlogin")
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

                                <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                    <h4>{__("Register Item Icon", "thlogin")}</h4>
                                    <p className="description">
                                    {__("Dashicon for register menu item", "thlogin")}
                                    </p>
                                </div>
                                <div className="setting-control">
                                    <TextControl
                                                                    __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
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

                                <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                    <h4>
                                    {__("Hide Register When Logged In", "thlogin")}
                                    </h4>
                                    <p className="description">
                                    {__(
                                        "Hide register item for logged in users",
                                        "thlogin"
                                    )}
                                    </p>
                                </div>
                                <div className="setting-control">
                                    <ToggleControl
                                    __nextHasNoMarginBottom={true}
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
                            </div>
                        </>
                        )}

                    </div>
                )}

            </div>
        </section>
  );
};

export default DisplayTriggersSettings;