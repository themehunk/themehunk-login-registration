import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Register the block
registerBlockType('th-login/form-block', {
    // Block title (visible in editor)
    title: __('TH Login Form/Trigger', 'th-login'),

    // Block description (visible in editor)
    description: __('Embed a login, registration, or forgot password form, or a link to trigger the popup.', 'th-login'),

    // Block category (where it appears in the block inserter)
    category: 'widgets', // Common category for utility blocks

    // Block icon (Dashicon or custom SVG)
    icon: 'admin-users', // Example: Dashicon for users

    // Keywords to help users find the block
    keywords: [
        __('login', 'th-login'),
        __('register', 'th-login'),
        __('form', 'th-login'),
        __('popup', 'th-login'),
        __('th login', 'th-login'),
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
            default: 'popup', // 'popup' or 'inline'
        },
    },

    /**
     * Edit function: Renders the block in the editor.
     * @param {Object} props - Block properties.
     * @param {Object} props.attributes - The block's attributes.
     * @param {Function} props.setAttributes - Function to update attributes.
     */
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { formType, linkText, displayAs } = attributes;

        // Options for the form type select control
        const formTypeOptions = [
            { label: __('Login Form', 'th-login'), value: 'login' },
            { label: __('Registration Form', 'th-login'), value: 'register' },
            { label: __('Forgot Password Form', 'th-login'), value: 'forgot-password' },
        ];

        // Options for display as select control
        const displayAsOptions = [
            { label: __('Popup Trigger Link', 'th-login'), value: 'popup' },
            { label: __('Inline Form', 'th-login'), value: 'inline' },
        ];

        // Render the block in the editor
        return (
            <>
                {/* InspectorControls for block settings in the sidebar */}
                <InspectorControls>
                    <PanelBody title={__('Form Settings', 'th-login')} initialOpen={true}>
                        <SelectControl
                            label={__('Select Form Type', 'th-login')}
                            value={formType}
                            options={formTypeOptions}
                            onChange={(newType) => setAttributes({ formType: newType })}
                        />
                        <SelectControl
                            label={__('Display As', 'th-login')}
                            value={displayAs}
                            options={displayAsOptions}
                            onChange={(newDisplayAs) => setAttributes({ displayAs: newDisplayAs })}
                        />
                        {displayAs === 'popup' && (
                            <TextControl
                                label={__('Link Text', 'th-login')}
                                value={linkText}
                                onChange={(newText) => setAttributes({ linkText: newText })}
                                placeholder={__('e.g., Open Login', 'th-login')}
                                help={__('Text for the link that triggers the popup. Leave empty for default.', 'th-login')}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>

                {/* Render the block preview in the editor */}
                <div {...blockProps}>
                    {displayAs === 'popup' ? (
                        <div className="th-login-block-preview th-login-block-preview--popup">
                            <Dashicon icon="external" />
                            <p>
                                {__('TH Login Popup Trigger:', 'th-login')}
                                <strong> {formTypeOptions.find(opt => opt.value === formType)?.label || formType}</strong>
                            </p>
                            {linkText && <p>Link Text: "{linkText}"</p>}
                            <p className="th-login-block-note">{__('This will render a link that opens the popup on the frontend.', 'th-login')}</p>
                        </div>
                    ) : (
                        <div className="th-login-block-preview th-login-block-preview--inline">
                            <Dashicon icon="forms" />
                            <p>
                                {__('TH Login Inline Form:', 'th-login')}
                                <strong> {formTypeOptions.find(opt => opt.value === formType)?.label || formType}</strong>
                            </p>
                            <p className="th-login-block-note">{__('This will render the form directly on the page.', 'th-login')}</p>
                        </div>
                    )}
                </div>
            </>
        );
    },

    /**
     * Save function: Defines the block's content for the frontend.
     * Since we are using PHP's render_callback, this function can return null or an empty div.
     * The actual HTML is generated server-side.
     */
    save: () => {
        return null; // Content is rendered server-side by PHP.
    },
});
