import { __ } from "@wordpress/i18n";
import { ToggleControl, TextControl, FormTokenField} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { useEffect } from "react";
import apiFetch from "@wordpress/api-fetch";
import { THL_ICONS } from "./icons";

const DisplayTriggersSettings = ({ settings, handleSettingChange }) => {

    const [activeTab, setActiveTab] = useState("auto_open");
    const [iconPickerOpen, setIconPickerOpen] = useState(false);
    const [iconPickerOpenlog, setIconPickerOpenlog] = useState(false);

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
        { key: "auto_open", label: __("Auto-Open", "th-login") },
        { key: "page_conditions", label: __("Page Conditions", "th-login") },
        { key: "device", label: __("Device Visibility", "th-login") },
        { key: "frequency", label: __("Frequency", "th-login") },
        { key: "menu", label: __("Menu Integration", "th-login") },
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
                    {__("Display Triggers", "th-login")}
                </h2>

                {renderTabs()}

                {activeTab === "auto_open" && (
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

                            <div className="menu-item-group login-group">
                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                    <h4>{__("Delay (seconds)", "th-login")}</h4>
                                    <p className="description">
                                        {__("Delay before showing the modal", "th-login")}
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
                            </div>
                        )}

                        <div className="setting-row">
                            <div className="setting-label">
                                <h4>{__("Auto-Open on Scroll", "th-login")}</h4>
                                <p className="description">
                                {__("Automatically open the modal when the user scrolls down a certain percentage of the page.", "th-login")}
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

                            <div className="menu-item-group login-group">
                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                    <h4>{__("Scroll Percentage (%)", "th-login")}</h4>
                                    <p className="description">
                                        {__("Percentage of the page scrolled before the modal opens.", "th-login")}
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
                                __nextHasNoMarginBottom={true}
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
                                __nextHasNoMarginBottom={true}
                                checked={settings.display_triggers.auto_open_on_time_on_page?.enabled || false}
                                onChange={(isChecked) => handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'enabled'], isChecked)}
                                />
                            </div>
                        </div>

                        {settings.display_triggers.auto_open_on_time_on_page?.enabled && (

                            <div className="menu-item-group login-group">
                                <div className="setting-row under-small-portion">
                                    <div className="setting-label">
                                    <h4>{__("Time on Page (seconds)", "th-login")}</h4>
                                    <p className="description">
                                        {__("Time in seconds before the modal opens.", "th-login")}
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
                             </div>
                        )}

                    </div>
                )}

                {activeTab === "page_conditions" && (
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
                                    label={__('Select Pages/Posts', 'th-login')}
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
                                        <h4>{__("Page/Post IDs", "th-login")}</h4>
                                        <p className="description">
                                        {__("Comma-separated list of IDs", "th-login")}
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
                                        <h4>{__("Page/Post Slugs", "th-login")}</h4>
                                        <p className="description">
                                        {__("Comma-separated list of slugs", "th-login")}
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
                                <h4>{__("Show on Specific Categories", "th-login")}</h4>
                                <p className="description">
                                {__("Control modal display on posts within specific categories.", "th-login")}
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
                                    label={__('Select Categories', 'th-login')}
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
                                        <h4>{__("Category IDs (comma-separated)", "th-login")}</h4>
                                        <p className="description">
                                        {__("Enter category IDs (e.g., 5, 12).", "th-login")}
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
                                    <h4>{__("Category Slugs (comma-separated)", "th-login")}</h4>
                                    <p className="description">
                                    {__("Enter category slugs (e.g., news, blog).", "th-login")}
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
                                <h4>{__("Show on Specific Tags", "th-login")}</h4>
                                <p className="description">
                                {__("Control modal display on posts with specific tags.", "th-login")}
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
                                    label={__('Select Tags', 'th-login')}
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
                                        <h4>{__("Tag IDs (comma-separated)", "th-login")}</h4>
                                        <p className="description">
                                        {__("Enter tag IDs (e.g., 7, 15).", "th-login")}
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
                                        <h4>{__("Tag Slugs (comma-separated)", "th-login")}</h4>
                                        <p className="description">
                                        {__("Enter tag slugs (e.g., featured, popular).", "th-login")}
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

                    </div>
                )}

                {activeTab === "device" && (
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
                            <h4>{__("Tablet", "th-login")}</h4>
                            <p className="description">
                            {__("Show on tablet devices", "th-login")}
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
                            <h4>{__("Mobile", "th-login")}</h4>
                            <p className="description">
                            {__("Show on mobile devices", "th-login")}
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
                          <div className="menu-item-group login-group">
                            <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                    <h4>{__("Frequency Type", "th-login")}</h4>
                                    <p className="description">
                                    {__("How to limit pop-up frequency", "th-login")}
                                    </p>
                                </div>


                                <div className="setting-control thlogin-toggle-group" style={{maxWidth: '350px'}}>
                                    <div className="custom-tabs">
                                        {[
                                        { key: "session", label: __("Once per session", "th-login") },
                                        { key: "days", label: __("Once every X days", "th-login") },
                                        ].map((tab) => (
                                        <button
                                            key={tab.key}
                                            className={`custom-tab-button ${
                                            settings.display_triggers.pop_up_frequency?.type === tab.key ? "active" : ""
                                            }`}
                                            onClick={() =>
                                            handleSettingChange("display_triggers", ["pop_up_frequency", "type"], tab.key)
                                            }
                                        >
                                            {tab.label}
                                        </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                          </div>
                            {settings.display_triggers.pop_up_frequency?.type ===
                            "days" && (
                            <div className="setting-row under-small-portion">
                                <div className="setting-label">
                                <h4>{__("Days to Hide", "th-login")}</h4>
                                <p className="description">
                                    {__("Days before showing again", "th-login")}
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
                                <div className="menu-item-group login-group">
                                    <div className="setting-row under-small-portion">
                                        <div className="setting-label">
                                            <h4>{__("Item Text", "th-login")}</h4>
                                            <p className="description">
                                            {__("Text for menu item", "th-login")}
                                            </p>
                                        </div>

                                        <div className="setting-control">
                                            <TextControl
                                                __next40pxDefaultSize = {true}
                                                __nextHasNoMarginBottom={true}
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

                                    <div className="setting-row under-small-portion">
                                        <div className="setting-label">
                                            <h4>{__("Login Item Icon", "th-login")}</h4>
                                            <p className="description">
                                            {__("Dashicon for login menu item", "th-login")}
                                            </p>
                                        </div>
                                        <div className="setting-control">

                                            <div className="thl-icon-picker">
                                            <label className="components-base-control__label">
                                                {__("Choose Icon", "th-login")}
                                            </label>

                                            <div
                                                className="icon-picker-trigger"
                                                onClick={() => setIconPickerOpen((open) => !open)}
                                            >
                                                <div
                                                    className="selected-icon"
                                                    dangerouslySetInnerHTML={{
                                                        __html: THL_ICONS[settings.display_triggers.menu_integration?.item_icon_login] || "",
                                                    }}
                                                />
                                                <span className="icon-name">{settings.display_triggers.menu_integration?.item_icon_login || ""}</span>
                                                <span className="icon-caret">▾</span>
                                            </div>

                                                {iconPickerOpen && (
                                                    <div className="icon-picker-dropdown">
                                                    {Object.keys(THL_ICONS).map((key) => (
                                                        <div
                                                            key={key}
                                                            className={`icon-option ${
                                                                settings.display_triggers.menu_integration?.item_icon_login === key ? "active" : ""
                                                            }`}
                                                            onClick={() => {
                                                                handleSettingChange(
                                                                    "display_triggers",
                                                                    ["menu_integration", "item_icon_login"],
                                                                    key
                                                                    )
                                                                setIconPickerOpen(false);
                                                            }}
                                                            title={key}
                                                            dangerouslySetInnerHTML={{ __html: THL_ICONS[key] }}
                                                        />
                                                    ))}
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="menu-item-group login-group log-out-menu-integration">

                                    <div className="setting-row under-small-portion">

                                        <div className="setting-row">
                                            <div className="setting-label">
                                                <h4>{__("Enable Log Out Button", "th-login")}</h4>
                                                <p className="description">
                                                    {__("Add log out button to menus", "th-login")}
                                                </p>
                                            </div>
                                            <div className="setting-control">
                                                <ToggleControl
                                                __nextHasNoMarginBottom={true}
                                                checked={
                                                    settings.display_triggers.menu_integration?.logout ||
                                                    false
                                                }
                                                onChange={(isChecked) =>
                                                    handleSettingChange(
                                                    "display_triggers",
                                                    ["menu_integration", "logout"],
                                                    isChecked
                                                    )
                                                }
                                                />
                                            </div>
                                        </div>

                                        {settings.display_triggers.menu_integration?.logout && (
                                            <div className="th-login-out-menu-inetgration">
                                                
                                                <div className="setting-row under-small-portion th-login-logout-integration">
                                                    <div className="setting-label">
                                                        <h4>{__("Item Text", "th-login")}</h4>
                                                        <p className="description">
                                                        {__("Text for menu item", "th-login")}
                                                        </p>
                                                    </div>

                                                    <div className="setting-control">
                                                        <TextControl
                                                            __next40pxDefaultSize = {true}
                                                            __nextHasNoMarginBottom={true}
                                                            value={
                                                                settings.display_triggers.menu_integration
                                                                ?.item_text_logout || __("Login", "th-login")
                                                            }
                                                            onChange={(newValue) =>
                                                                handleSettingChange(
                                                                "display_triggers",
                                                                ["menu_integration", "item_text_logout"],
                                                                newValue
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="setting-row under-small-portion th-login-logout-integration">
                                                    <div className="setting-label">
                                                        <h4>{__("Logout Item Icon", "th-login")}</h4>
                                                        <p className="description">
                                                        {__("Dashicon for logout menu item", "th-login")}
                                                        </p>
                                                    </div>
                                                    <div className="setting-control">

                                                        <div className="thl-icon-picker">
                                                        <label className="components-base-control__label">
                                                            {__("Choose Icon", "th-login")}
                                                        </label>

                                                        <div
                                                            className="icon-picker-trigger"
                                                            onClick={() => setIconPickerOpenlog((open) => !open)}
                                                        >
                                                            <div
                                                                className="selected-icon"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: THL_ICONS[settings.display_triggers.menu_integration?.item_icon_logout] || "",
                                                                }}
                                                            />
                                                            <span className="icon-name">{settings.display_triggers.menu_integration?.item_icon_logout || ""}</span>
                                                            <span className="icon-caret">▾</span>
                                                        </div>

                                                            {iconPickerOpenlog && (
                                                                <div className="icon-picker-dropdown">
                                                                {Object.keys(THL_ICONS).map((key) => (
                                                                    <div
                                                                        key={key}
                                                                        className={`icon-option ${
                                                                            settings.display_triggers.menu_integration?.item_icon_logout === key ? "active" : ""
                                                                        }`}
                                                                        onClick={() => {
                                                                            handleSettingChange(
                                                                                "display_triggers",
                                                                                ["menu_integration", "item_icon_logout"],
                                                                                key
                                                                                )
                                                                            setIconPickerOpenlog(false);
                                                                        }}
                                                                        title={key}
                                                                        dangerouslySetInnerHTML={{ __html: THL_ICONS[key] }}
                                                                    />
                                                                ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        )}
                                        
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