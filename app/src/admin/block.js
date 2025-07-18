import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Register the block
registerBlockType('thlogin/form-block', {
    // Block title (visible in editor)
    title: __('TH Login Form/Trigger', 'thlogin'),

    // Block description (visible in editor)
    description: __('Embed a login, registration, or forgot password form, or a link to trigger the popup.', 'thlogin'),

    // Block category (where it appears in the block inserter)
    category: 'widgets', // Common category for utility blocks

    // Block icon (Dashicon or custom SVG)
    icon: 'admin-users',

    // Keywords to help users find the block
    keywords: [
        __('login', 'thlogin'),
        __('register', 'thlogin'),
        __('form', 'thlogin'),
        __('popup', 'thlogin'),
        __('th login', 'thlogin'),
    ],

    // Block attributes (defined in PHP as well for server-side rendering)
    attributes: {
        formType: {
            type: 'string',
            default: 'login',
        },
        linkText: {
            type: 'string',
            default: '',
        },
        displayAs: {
            type: 'string',
            default: 'popup', 
        },
    },


    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { formType, linkText, displayAs } = attributes;

        // Options for the form type select control
        const formTypeOptions = [
            { label: __('Login Form', 'thlogin'), value: 'login' },
            { label: __('Registration Form', 'thlogin'), value: 'register' },
            { label: __('Forgot Password Form', 'thlogin'), value: 'forgot-password' },
        ];

        // Options for display as select control
        const displayAsOptions = [
            { label: __('Popup Trigger Link', 'thlogin'), value: 'popup' },
            { label: __('Inline Form', 'thlogin'), value: 'inline' },
        ];

        // Render the block in the editor
        return (
            <>
                {/* InspectorControls for block settings in the sidebar */}
                <InspectorControls>
                    <PanelBody title={__('Form Settings', 'thlogin')} initialOpen={true}>
                        <SelectControl
                            label={__('Select Form Type', 'thlogin')}
                            value={formType}
                            options={formTypeOptions}
                            onChange={(newType) => setAttributes({ formType: newType })}
                        />
                        <SelectControl
                            label={__('Display As', 'thlogin')}
                            value={displayAs}
                            options={displayAsOptions}
                            onChange={(newDisplayAs) => setAttributes({ displayAs: newDisplayAs })}
                        />
                        {displayAs === 'popup' && (
                            <TextControl
                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
                                label={__('Link Text', 'thlogin')}
                                value={linkText}
                                onChange={(newText) => setAttributes({ linkText: newText })}
                                placeholder={__('e.g., Open Login', 'thlogin')}
                                help={__('Text for the link that triggers the popup. Leave empty for default.', 'thlogin')}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>

                {/* Render the block preview in the editor */}
                <div {...blockProps}>
                    {displayAs === 'popup' ? (
                        <div className="thlogin-block-preview thlogin-block-preview--popup">
                            <Dashicon icon="external" />
                            <p>
                                {__('TH Login Popup Trigger:', 'thlogin')}
                                <strong> {formTypeOptions.find(opt => opt.value === formType)?.label || formType}</strong>
                            </p>
                            {linkText && <p>Link Text: "{linkText}"</p>}
                            <p className="thlogin-block-note">{__('This will render a link that opens the popup on the frontend.', 'thlogin')}</p>
                        </div>
                    ) : (
                        <div className="thlogin-block-preview thlogin-block-preview--inline">
                            <Dashicon icon="forms" />
                            <p>
                                {__('TH Login Inline Form:', 'thlogin')}
                                <strong> {formTypeOptions.find(opt => opt.value === formType)?.label || formType}</strong>
                            </p>
                            <p className="thlogin-block-note">{__('This will render the form directly on the page.', 'thlogin')}</p>
                        </div>
                    )}
                </div>
            </>
        );
    },

    save: () => {
        return null; // Content is rendered server-side by PHP.
    },
});
