import { __ } from "@wordpress/i18n";
import { TextControl, ToggleControl } from "@wordpress/components";

const FormFieldsSettings = ({
  settings,
  handleSettingChange,
  addCustomField,
  updateCustomField,
  removeCustomField
}) => {
  return (
        <section className="settings-section">
            <div className="settings-card">
            <h2 className="section-title">
                <i className="dashicons dashicons-feedback"></i>
                {__("Form Fields Settings", "th-login")}
            </h2>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Login Form Fields", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Username/Email Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the username/email field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.login?.username_label || ""}
                    onChange={(newValue) =>
                        handleSettingChange(
                        "form_fields",
                        ["login", "username_label"],
                        newValue
                        )
                    }
                    placeholder={__(
                        "Username or Email Address",
                        "th-login"
                    )}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Username/Email Placeholder", "th-login")}</h4>
                    <p className="description">
                    {__(
                        "Placeholder text for the username/email field",
                        "th-login"
                    )}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={
                        settings.form_fields.login?.username_placeholder || ""
                    }
                    onChange={(newValue) =>
                        handleSettingChange(
                        "form_fields",
                        ["login", "username_placeholder"],
                        newValue
                        )
                    }
                    placeholder={__(
                        "Enter your username or email",
                        "th-login"
                    )}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Password Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the password field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.login?.password_label || ""}
                    onChange={(newValue) =>
                        handleSettingChange(
                        "form_fields",
                        ["login", "password_label"],
                        newValue
                        )
                    }
                    placeholder={__("Password", "th-login")}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Password Placeholder", "th-login")}</h4>
                    <p className="description">
                    {__("Placeholder text for the password field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.login?.password_placeholder || ""}
                    onChange={(newValue) =>
                        handleSettingChange(
                        "form_fields",
                        ["login", "password_placeholder"],
                        newValue
                        )
                    }
                    placeholder={__("Enter your password", "th-login")}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show Remember Me", "th-login")}</h4>
                    <p className="description">
                    {__("Display the remember me checkbox", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.form_fields.login?.show_remember_me || false}
                    onChange={(isChecked) =>
                        handleSettingChange(
                        "form_fields",
                        ["login", "show_remember_me"],
                        isChecked
                        )
                    }
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Remember Me Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the remember me checkbox", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.login?.remember_me_label || ""}
                    onChange={(newValue) =>
                        handleSettingChange(
                        "form_fields",
                        ["login", "remember_me_label"],
                        newValue
                        )
                    }
                    placeholder={__("Remember Me", "th-login")}
                    disabled={!settings.form_fields.login?.show_remember_me}
                    />
                </div>
                </div>
                
                {/* More form fields... */}
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Registration Form Fields", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Username Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the username field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={
                        settings.form_fields.register?.username_label || ""
                    }
                    onChange={(newValue) =>
                        handleSettingChange(
                        "form_fields",
                        ["register", "username_label"],
                        newValue
                        )
                    }
                    placeholder={__("Choose a Username", "th-login")}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Email Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the email field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.register?.email_label || ''}
                    onChange={(newValue) => handleSettingChange('form_fields', ['register', 'email_label'], newValue)}
                    placeholder={__('Email Address', 'th-login')}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Email Placeholder", "th-login")}</h4>
                    <p className="description">
                    {__("Placeholder for the email field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.register?.email_placeholder || ''}
                    onChange={(newValue) => handleSettingChange('form_fields', ['register', 'email_placeholder'], newValue)}
                    placeholder={__('Enter your email', 'th-login')}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Password Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the password field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.register?.password_label || ''}
                    onChange={(newValue) => handleSettingChange('form_fields', ['register', 'password_label'], newValue)}
                    placeholder={__('Create Password', 'th-login')}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Password Placeholder", "th-login")}</h4>
                    <p className="description">
                    {__("Placeholder for the password field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.register?.password_placeholder || ''}
                    onChange={(newValue) => handleSettingChange('form_fields', ['register', 'password_placeholder'], newValue)}
                    placeholder={__('Create a strong password', 'th-login')}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Confirm Password Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the confirm password field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.register?.confirm_password_label || ''}
                    onChange={(newValue) => handleSettingChange('form_fields', ['register', 'confirm_password_label'], newValue)}
                    placeholder={__('Confirm Password', 'th-login')}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Confirm Password Placeholder", "th-login")}</h4>
                    <p className="description">
                    {__("Placeholder for the confirm password field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.register?.confirm_password_placeholder || ''}
                    onChange={(newValue) => handleSettingChange('form_fields', ['register', 'confirm_password_placeholder'], newValue)}
                    placeholder={__('Confirm your password', 'th-login')}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show First Name Field", "th-login")}</h4>
                    <p className="description">
                    {__("Display the first name field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.form_fields.register?.show_first_name || false}
                    onChange={(isChecked) => handleSettingChange('form_fields', ['register', 'show_first_name'], isChecked)}
                    />
                </div>
                </div>

                {settings.form_fields.register?.show_first_name && (
                    <>
                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("First Name Label", "th-login")}</h4>
                            <p className="description">
                            {__("Label for the first name field", "th-login")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <TextControl
                            value={settings.form_fields.register?.first_name_label || ''}
                            onChange={(newValue) => handleSettingChange('form_fields', ['register', 'first_name_label'], newValue)}
                            placeholder={__('First Name', 'th-login')}
                            />
                        </div>
                        </div>

                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("First Name Placeholder", "th-login")}</h4>
                            <p className="description">
                            {__("Placeholder for the first name field", "th-login")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <TextControl
                            value={settings.form_fields.register?.first_name_placeholder || ''}
                            onChange={(newValue) => handleSettingChange('form_fields', ['register', 'first_name_placeholder'], newValue)}
                            placeholder={__('Your first name', 'th-login')}
                            />
                        </div>
                        </div>
                    </>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Show Last Name Field", "th-login")}</h4>
                    <p className="description">
                    {__("Display the last name field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.form_fields.register?.show_last_name || false}
                    onChange={(isChecked) => handleSettingChange('form_fields', ['register', 'show_last_name'], isChecked)}
                    />
                </div>
                </div>

                {settings.form_fields.register?.show_last_name && (
                    <>
                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Last Name Label", "th-login")}</h4>
                            <p className="description">
                            {__("Label for the last name field", "th-login")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <TextControl
                            value={settings.form_fields.register?.last_name_label || ''}
                            onChange={(newValue) => handleSettingChange('form_fields', ['register', 'last_name_label'], newValue)}
                            placeholder={__('Last Name', 'th-login')}
                            />
                        </div>
                        </div>

                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Last Name Placeholder", "th-login")}</h4>
                            <p className="description">
                            {__("Placeholder for the last name field", "th-login")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <TextControl
                            value={settings.form_fields.register?.last_name_placeholder || ''}
                            onChange={(newValue) => handleSettingChange('form_fields', ['register', 'last_name_placeholder'], newValue)}
                            placeholder={__('Your last name', 'th-login')}
                            />
                        </div>
                        </div>
                    </>
                )}

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Enable Terms & Conditions Checkbox", "th-login")}</h4>
                    <p className="description">
                    {__("Display terms and conditions checkbox", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <ToggleControl
                    checked={settings.form_fields.register?.terms_and_conditions?.enabled || false}
                    onChange={(isChecked) => handleSettingChange('form_fields', ['register', 'terms_and_conditions', 'enabled'], isChecked)}
                    />
                </div>
                </div>

                {settings.form_fields.register?.terms_and_conditions?.enabled && (
                    <>
                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Terms & Conditions Label (HTML allowed)", "th-login")}</h4>
                            <p className="description">
                            {__("Label for terms checkbox with optional HTML", "th-login")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <TextControl
                            value={settings.form_fields.register.terms_and_conditions.label || ''}
                            onChange={(newValue) => handleSettingChange('form_fields', ['register', 'terms_and_conditions', 'label'], newValue)}
                            />
                        </div>
                        </div>

                        <div className="setting-row">
                        <div className="setting-label">
                            <h4>{__("Terms & Conditions Required", "th-login")}</h4>
                            <p className="description">
                            {__("Make accepting terms mandatory", "th-login")}
                            </p>
                        </div>
                        <div className="setting-control">
                            <ToggleControl
                            checked={settings.form_fields.register.terms_and_conditions.required || false}
                            onChange={(isChecked) => handleSettingChange('form_fields', ['register', 'terms_and_conditions', 'required'], isChecked)}
                            />
                        </div>
                        </div>
                    </>
                )}
                {/* More registration fields... */}
            </div>

            <div className="settings-group">
                <h3 className="group-title">
                {__("Forgot Password Form Fields", "th-login")}
                </h3>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Email Label", "th-login")}</h4>
                    <p className="description">
                    {__("Label for the email field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={
                        settings.form_fields.forgot_password?.email_label ||
                        ""
                    }
                    onChange={(newValue) =>
                        handleSettingChange(
                        "form_fields",
                        ["forgot_password", "email_label"],
                        newValue
                        )
                    }
                    placeholder={__("Email Address", "th-login")}
                    />
                </div>
                </div>

                <div className="setting-row">
                <div className="setting-label">
                    <h4>{__("Email Placeholder", "th-login")}</h4>
                    <p className="description">
                    {__("Placeholder for the email field", "th-login")}
                    </p>
                </div>
                <div className="setting-control">
                    <TextControl
                    value={settings.form_fields.forgot_password?.email_placeholder || ''}
                    onChange={(newValue) => handleSettingChange('form_fields', ['forgot_password', 'email_placeholder'], newValue)}
                    placeholder={__('Enter your email to reset password', 'th-login')}
                    />
                </div>
                </div>

                {/* More forgot password fields... */}
            </div>
            </div>

            <div className="settings-card">
            <h2 className="section-title">
                <i className="dashicons dashicons-feedback"></i>
                {__("Registration Settings", "th-login")}
            </h2>

            <div className="settings-group">
                <div className="group-header">
                <h3 className="group-title">
                    {__("Custom Registration Fields", "th-login")}
                </h3>
                <button
                    className="add-field-button"
                    onClick={addCustomField}
                >
                    <i className="dashicons dashicons-plus"></i>
                    {__("Add Field", "th-login")}
                </button>
                </div>

                <p className="description">
                {__(
                    "Add custom fields to your registration form. These can be mapped to user meta.",
                    "th-login"
                )}
                </p>

                <div className="custom-fields-container">
                {settings.form_fields.register.custom_fields.map(
                    (field, index) => (
                    <div key={index} className="custom-field">
                        <div className="field-header">
                        <h4>
                            {field.label || __("New Field", "th-login")}
                        </h4>
                        <button
                            className="remove-field"
                            onClick={() => removeCustomField(index)}
                        >
                            <i className="dashicons dashicons-trash"></i>
                        </button>
                        </div>

                        <div className="field-settings">
                        <div className="setting-row">
                            <div className="setting-label">
                            <h5>{__("Field ID", "th-login")}</h5>
                            <p className="description">
                                {__(
                                "Unique identifier (no spaces)",
                                "th-login"
                                )}
                            </p>
                            </div>
                            <div className="setting-control">
                            <TextControl
                                value={field.id}
                                onChange={(newValue) =>
                                updateCustomField(
                                    index,
                                    "id",
                                    newValue.replace(/\s/g, "").toLowerCase()
                                )
                                }
                                placeholder="field_id"
                            />
                            </div>
                        </div>

                        <div className="setting-row">
                            <div className="setting-label">
                            <h5>{__("Field Label", "th-login")}</h5>
                            <p className="description">
                                {__("Display name for the field", "th-login")}
                            </p>
                            </div>
                            <div className="setting-control">
                            <TextControl
                                value={field.label}
                                onChange={(newValue) =>
                                updateCustomField(index, "label", newValue)
                                }
                                placeholder={__("Field Label", "th-login")}
                            />
                            </div>
                        </div>

                        <div className="setting-row">
                            <div className="setting-label">
                            <h5>{__("Field Type", "th-login")}</h5>
                            <p className="description">
                                {__("Type of input field", "th-login")}
                            </p>
                            </div>
                            <div className="setting-control">
                            <select
                                value={field.type}
                                onChange={(e) =>
                                updateCustomField(
                                    index,
                                    "type",
                                    e.target.value
                                )
                                }
                            >
                                <option value="text">
                                {__("Text", "th-login")}
                                </option>
                                <option value="textarea">
                                {__("Textarea", "th-login")}
                                </option>
                                <option value="checkbox">
                                {__("Checkbox", "th-login")}
                                </option>
                                <option value="select">
                                {__("Select", "th-login")}
                                </option>
                                <option value="email">
                                {__("Email", "th-login")}
                                </option>
                                <option value="url">
                                {__("URL", "th-login")}
                                </option>
                                <option value="number">
                                {__("Number", "th-login")}
                                </option>
                            </select>
                            </div>
                        </div>

                        {(field.type === "text" ||
                            field.type === "email" ||
                            field.type === "url" ||
                            field.type === "number" ||
                            field.type === "textarea") && (
                            <div className="setting-row">
                            <div className="setting-label">
                                <h5>{__("Placeholder", "th-login")}</h5>
                                <p className="description">
                                {__("Hint text for the field", "th-login")}
                                </p>
                            </div>
                            <div className="setting-control">
                                <TextControl
                                value={field.placeholder}
                                onChange={(newValue) =>
                                    updateCustomField(
                                    index,
                                    "placeholder",
                                    newValue
                                    )
                                }
                                placeholder={__(
                                    "Enter value...",
                                    "th-login"
                                )}
                                />
                            </div>
                            </div>
                        )}

                        {field.type === "select" && (
                            <div className="setting-row">
                            <div className="setting-label">
                                <h5>{__("Options", "th-login")}</h5>
                                <p className="description">
                                {__("Comma-separated options", "th-login")}
                                </p>
                            </div>
                            <div className="setting-control">
                                <TextControl
                                value={field.options.join(", ")}
                                onChange={(newValue) =>
                                    updateCustomField(
                                    index,
                                    "options",
                                    newValue
                                        .split(",")
                                        .map((item) => item.trim())
                                    )
                                }
                                placeholder="Option 1, Option 2, Option 3"
                                />
                            </div>
                            </div>
                        )}

                        <div className="setting-row">
                            <div className="setting-label">
                            <h5>{__("Required Field", "th-login")}</h5>
                            <p className="description">
                                {__("Is this field mandatory?", "th-login")}
                            </p>
                            </div>
                            <div className="setting-control">
                            <ToggleControl
                                checked={field.required}
                                onChange={(isChecked) =>
                                updateCustomField(
                                    index,
                                    "required",
                                    isChecked
                                )
                                }
                            />
                            </div>
                        </div>

                        <div className="setting-row">
                            <div className="setting-label">
                            <h5>{__("Map to User Meta", "th-login")}</h5>
                            <p className="description">
                                {__(
                                "Save this field as user metadata",
                                "th-login"
                                )}
                            </p>
                            </div>
                            <div className="setting-control">
                            <ToggleControl
                                checked={field.map_to_user_meta}
                                onChange={(isChecked) =>
                                updateCustomField(
                                    index,
                                    "map_to_user_meta",
                                    isChecked
                                )
                                }
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                )}
                </div>
            </div>
            </div>
        </section>
     );
};

export default FormFieldsSettings;