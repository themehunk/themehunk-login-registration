import { useState } from "react";
import { __ } from "@wordpress/i18n";
import AccordionSection from "./design-editor/accordion-section";
import BackgroundSettingsPanel from "./design-editor/background-panel";
import BorderSettingsPanel from "./design-editor/border-settings-panel";
import { PaddingSettingsPanel } from "./design-editor/padding-settings-panel";
import { CustomSelectControl } from './custom-select-control';
import { Dashicon, RangeControl } from "@wordpress/components";
import {tabs, layoutOptions, fontWeightOptions} from '../contant';
import { THL_ICONS } from "./icons";

//intertivity
const InteractiveInput = ({ base, hover, active, ...props }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const style = {
    ...base,
    ...(hovered ? hover : {}),
    ...(focused ? active : {}),
  };

  return (
    <input
      {...props}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete={props.type === 'password' ? 'current-password' : 'on'}
      className={`th-preview-input ${props.className || ''}`}
    />
  );
};

const InteractiveButton = ({ base, hover, children }) => {
  const [hovered, setHovered] = useState(false);

  const style = {
    ...base,
    ...(hovered ? hover : {}),
  };

  return (
    <button
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
};

const InteractiveCheckbox = ({ base, children }) => {
  const checkboxStyle = {
    accentColor: base.checkboxbackground,
    marginRight: '5px',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  };

  const labelStyle = {
    color: base.color,
    fontSize: base.typography.size,
    fontWeight: base.typography.fontWeight,
    cursor: 'pointer',
  };

  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}>
      <input type="checkbox" style={checkboxStyle} />
      <span style={labelStyle}>{children}</span>
    </label>
  );
};

//login-loader
const LoginFormHeader = ({ settings }) => {
  const { design = {}, general = {} } = settings;
  const { header = {} } = design;
  const { form_type = 'double', close_button = true } = general;

  const buttonStyle = header?.button || {};
  const cancelStyle = header?.cancel_button || {};

  const applyButtonStyle = (style) => ({
    color: style.color,
    backgroundColor: style.background,
    padding: `${style.padding?.top || 0}px ${style.padding?.right || 0}px ${style.padding?.bottom || 0}px ${style.padding?.left || 0}px`,
    fontSize: style.typography?.size || '14px',
    fontWeight: style.typography?.fontWeight || 'normal',
    borderStyle: style.border?.style || 'solid',
    borderColor: style.border?.color || '#000',
    borderWidth: `${style.border?.width?.top || 0}px ${style.border?.width?.right || 0}px ${style.border?.width?.bottom || 0}px ${style.border?.width?.left || 0}px`,
    borderRadius: `${style.border?.radius?.topLeft || 0}px ${style.border?.radius?.topRight || 0}px ${style.border?.radius?.bottomRight || 0}px ${style.border?.radius?.bottomLeft || 0}px`,
    cursor: 'pointer'
  });

  return (
    <div className="thloginpreview-form-header-part">
      <div className="thloginpreview-cancel">
        {close_button && (
          <button 
            className="thloginpreview-popup-close-button" 
            aria-label={__('Close', 'th-login')}
            style={applyButtonStyle(cancelStyle)}
          >
            <Dashicon icon="no-alt" />
          </button>
        )}
      </div>

      {form_type === 'double' && (
        <div className="thlogin-prevuiew-form-toggle">
          <button 
            type="button" 
            className="thlogin-prevuiew-toggle-button thlogin-prevuiew-toggle-button--login" 
            data-th-popup-action="login"
            style={applyButtonStyle(buttonStyle)}
          >
            {__('Login', 'th-login')}
          </button>

          <button 
            type="button" 
            className="thlogin-preview-toggle-button thlogin-preview-toggle-button--register" 
            data-th-popup-action="register"
            style={applyButtonStyle(buttonStyle)}
          >
            {__('Register', 'th-login')}
          </button>
        </div>
      )}

    </div>
  );
};

const DesignEditor = ({ settings, handleSettingChange }) => {
	const [activeForm, setActiveForm] = useState("login");
	const [insidetab, setinsidetab] = useState('form');
	const inputBase = settings.design.Input;
	const buttonBase = settings.design.button;

	const getBackgroundStyle = (background) => {
		const type = background?.type || "color";
		if (type === "gradient") {
		return {
			backgroundImage: background.gradient,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			opacity: background.opacity,
		};
		} else if (type === "image" && background.image?.url) {
		return {
			backgroundImage: `url(${background.image.url})`,
			backgroundSize: background.image.size || "cover",
			backgroundRepeat: background.image.repeat || "no-repeat",
			backgroundPosition: background.image.position || "center center",
			opacity: background.opacity,
		};
		} else {
		return {
			backgroundColor: background.color || "#ffffff",
			opacity: background.opacity,
		};
		}
	};

	const getBorderStyle = (border = {}) => {
		const width = border.width || {};
		const radius = border.radius || {};
		return {
			borderTopWidth: `${width.top ?? 0}px`,
			borderRightWidth: `${width.right ?? 0}px`,
			borderBottomWidth: `${width.bottom ?? 0}px`,
			borderLeftWidth: `${width.left ?? 0}px`,
			borderStyle: border.style || "solid",
			borderColor: border.color || "#000000",
			borderTopLeftRadius: `${radius.topLeft ?? 0}px`,
			borderTopRightRadius: `${radius.topRight ?? 0}px`,
			borderBottomRightRadius: `${radius.bottomRight ?? 0}px`,
			borderBottomLeftRadius: `${radius.bottomLeft ?? 0}px`,
		};
	};

	const getPaddingStyle = (padding) => {
		const pad = padding || {};
		return {
			paddingTop: `${pad.top ?? 0}px`,
			paddingRight: `${pad.right ?? 0}px`,
			paddingBottom: `${pad.bottom ?? 0}px`,
			paddingLeft: `${pad.left ?? 0}px`,
		};
	};

	const modalStyle = {
		...getBackgroundStyle(settings.design.modal?.modal_background),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		'--th-input-color': inputBase.color,
		'--th-backgroundColor': `0 0 0 1000px ${inputBase.background} inset`,
	};

	const formStyle = {
		...getBackgroundStyle(settings.design.form?.form_background),
		...getBorderStyle(settings.design.form?.form_border),
		...getPaddingStyle(settings.design.form?.form_padding),
		gap: `${settings.design.form.form_gap || 0}px`,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		width: '100%',
		maxWidth: '400px',
		margin: '0 auto',
	};

	const renderFormPreview = () => {
		const commonHeadingStyle = {
			color: settings.design.heading.color,
			fontSize: settings.design.heading.typography.size,
			fontWeight: settings.design.heading.typography.fontWeight,
			margin: 0,
		};

		const inputProps = {
			base: {
				padding: '10px',
				border: '1px solid #ccc',
				width: '100%',
				borderRadius: '4px',
				color: inputBase.color,
				backgroundColor: inputBase.background,
				fontSize: inputBase.typography.size,
				fontWeight: inputBase.typography.fontWeight,
			},
			active: { backgroundColor: inputBase.activeBackground },
		};

		const buttonProps = {
			base: {
				color: buttonBase.color,
				backgroundColor: buttonBase.background,
				fontSize: buttonBase.typography.size,
				fontWeight: buttonBase.typography.fontWeight,
				padding: `${buttonBase.padding.top}px ${buttonBase.padding.right}px`,
				border: `${buttonBase.border.width?.top ?? 1}px ${buttonBase.border.style || 'solid'} ${buttonBase.border.color || '#000'}`,
				borderRadius: `${buttonBase.border.radius?.topLeft ?? 4}px`,
				cursor: 'pointer',
			},
			hover: { backgroundColor: buttonBase.hoverBackground },
		};

		const checkboxProps = {
			base: {
				color: settings.design.rememberme.color,
				checkboxbackground: settings.design.rememberme.checkboxbackground,
				typography: settings.design.rememberme.typography,
			},
		};

		const renderInputs = (fields) => fields
		.filter(field => field.show !== false)
		.map((field, i) => {
			const Icon = field.icon && THL_ICONS[field.icon] ? THL_ICONS[field.icon] : null;

			return (
				<div key={i} className="th-preview-field-group" style={{ width: '100%' }}>
					<div className="design-label-wrapper">
					{Icon && (
						<div
						dangerouslySetInnerHTML={{ __html: THL_ICONS[field.icon] }}
						style={{
							color: settings.design.icon.color,
							width: settings.design.icon.size,
							flexShrink: 0,
						}}
						/>
					)}

					{field.type !== 'checkbox' && field.label && (
						<label
						style={{
							display: "block",
							marginBottom: "5px",
							fontSize: inputBase.labeltypography.size,
							fontWeight: inputBase.labeltypography.fontWeight,
							color: inputBase.labelcolor || '#333',
						}}
						>
						{field.label}
						</label>
					)}
					</div>

					{field.type === 'checkbox' ? (
						<InteractiveCheckbox {...checkboxProps}>
							{field.label}
						</InteractiveCheckbox>
					) : (
					<InteractiveInput
						type={field.type || "text"}
						placeholder={field.placeholder || ""}
						base={inputProps.base}
						active={inputProps.active}
					/>
					)}
				</div>
			);
		});

		const renderContent = () => {
			const fields = settings.form_fields?.[activeForm] || [];
			let headingLabel = __("Login", "th-login");

			if (activeForm === "register") headingLabel = __("Register", "th-login");
			else if (activeForm === "forgot_password") headingLabel = __("Forgot Password", "th-login");

			return (
				<>

					<LoginFormHeader settings={settings} />

					<h3 style={commonHeadingStyle}>{headingLabel}</h3>
					{renderInputs(fields)}
					<InteractiveButton {...buttonProps}>
						{headingLabel}
					</InteractiveButton>
				</>
			);
		};

		return (
			<div className="th-modal-preview-wrapper">
				<div className="th-modal-preview" style={modalStyle}>

				<form 
					onSubmit={(e) => e.preventDefault()} 
					className="th-form-preview" 
					style={formStyle}
				>
					{renderContent()}
				</form>
				</div>
			</div>
		);
	};

	const renderTabs = () => (
		<div className="custom-tabs">
			{tabs.map((tab) => (
				<button
				key={tab.key}
				className={`custom-tab-button ${activeForm === tab.key ? "active" : ""}`}
				onClick={() => setActiveForm(tab.key)}
				>
				{tab.label}
				</button>
			))}
		</div>
	);

	const tabinside = [
		{ key: "form", label: __("Form", "th-login") },
		{ key: "label", label: __("Label", "th-login") },
		{ key: "header", label: __("Header", "th-login") },
	];

	const getLoginPreviewUrl = (option) => {

		let finalurl = '';

		if (
			typeof thlogin_admin_data !== 'undefined' &&
			settings?.integration?.woocommerce?.enabled &&
			thlogin_admin_data.woo_enabled &&
			thlogin_admin_data.myaccount_url
		) {
			finalurl = thlogin_admin_data.myaccount_url;
		} else if (
			typeof thlogin_admin_data !== 'undefined' &&
			thlogin_admin_data.thlogin_url &&
			settings?.general?.display_mode === 'page'
		) {
			finalurl = thlogin_admin_data.thlogin_url;
		}

		if (finalurl && option.key === 'page') {
			return (
				<div className="th-login-previre-button">
					<a
						style={{textDecoration: 'none', cursor:'pointer'}}
						href={finalurl}
						target="_blank"

						rel="noopener noreferrer"
					>

						<span className="dashicons dashicons-external" ></span>	
					</a>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="settings-card">
			<h2 className="section-title">
				<i className="dashicons dashicons-art"></i>
				{__("Design Settings", "th-login")}
			</h2>

			<div className="preview-switcher">
				{renderTabs()}
			</div>

			<div className="design-editor-layout">
				
				<div className="settings-panel">

					<div className="custom-tabs">
						{tabinside.map((tab) => (
							<button
								key={tab.key}
								className={`custom-tab-button ${insidetab === tab.key ? "active" : ""}`}
								onClick={() => setinsidetab(tab.key)}
							>
								{tab.label}
							</button>
						))}
					</div>

					<div className="cutsom-tabs-inside-panel">
						{insidetab === "form" && (
						<>
							<BackgroundSettingsPanel
							title={__("Foreground", "th-login")}
							background={settings.design.modal.modal_background}
							path={["modal", "modal_background"]}
							handleSettingChange={handleSettingChange}
							/>

							<BackgroundSettingsPanel
							title={__("Background", "th-login")}
							background={settings.design.form.form_background}
							path={["form", "form_background"]}
							handleSettingChange={handleSettingChange}
							/>

							<BorderSettingsPanel
							title={__("Border", "th-login")}
							border={settings.design.form.form_border}
							path={["form", "form_border"]}
							handleSettingChange={handleSettingChange}
							/>

							<PaddingSettingsPanel
							title={__("Padding", "th-login")}
							padding={settings.design.form.form_padding}
							path={["form", "form_padding"]}
							handleSettingChange={handleSettingChange}
							/>

							<AccordionSection title={__("Field Gap", "th-login")} defaultOpen={false}>
								<RangeControl
									label={__('Gap', 'th-login')}
									value={parseInt(settings.design.form.form_gap || 0)}
									onChange={(value) => handleSettingChange("design", ["form", "form_gap"], parseInt(value))}
									min={0}
									max={50}
									step={1}
									withInputField
								/>
							</AccordionSection>
						</>
						)}

						{insidetab === "label" && (
							<>
								<AccordionSection title={__("Heading", "th-login")} defaultOpen={false}>
								<div className="th-heading-settings">
									<div className="th-setting-row">
									<label className="th-setting-label">{__("Text Color", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.heading.color}
										onChange={(e) =>
										handleSettingChange("design", ["heading", "color"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Font Size", "th-login")}</label>
									<input
										type="number"
										className="th-number-input"
										value={parseInt(settings.design.heading.typography.size)}
										onChange={(e) =>
										handleSettingChange("design", ["heading", "typography", "size"], `${e.target.value}px`)
										}
										min={1}
									/>
									</div>

									<div className="th-setting-row">
									<div className="th-select-wrapper modern-sleect-heaidng">
										<CustomSelectControl
										label={__("Font Weight", "th-login")}
										value={settings.design.heading.typography.fontWeight}
										onChange={(value) =>
											handleSettingChange("design", ["heading", "typography", "fontWeight"], value)
										}
										options={fontWeightOptions}
										/>
									</div>
									</div>
								</div>
								</AccordionSection>

								<AccordionSection title={__("Input Label", "th-login")} defaultOpen={false}>
									<div className="th-heading-settings">
										<div className="th-setting-row">
										<label className="th-setting-label">{__("Label Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.Input.labelcolor}
												onChange={(e) =>
												handleSettingChange("design", ["Input", "labelcolor"], e.target.value)
												}
											/>
										</div>

										<div className="th-setting-row">
											<label className="th-setting-label">{__("Label Font Size", "th-login")}</label>
											<input
												type="number"
												className="th-number-input"
												value={parseInt(settings.design.Input.labeltypography.size)}
												onChange={(e) =>
												handleSettingChange("design", ["Input", "labeltypography", "size"], `${e.target.value}px`)
												}
												min={1}
											/>
										</div>

										<div className="th-setting-row">
											<div className="th-select-wrapper modern-sleect-heaidng">
												<CustomSelectControl
												label={__("Label Font Weight", "th-login")}
												value={settings.design.Input.labeltypography.fontWeight}
												onChange={(value) =>
													handleSettingChange("design", ["Input", "labeltypography", "fontWeight"], value)
												}
												options={fontWeightOptions}
												/>
											</div>
										</div>
									</div>
								</AccordionSection>

								<AccordionSection title={__("Input Box", "th-login")} defaultOpen={false}>
									<div className="th-heading-settings">
										<div className="th-setting-row">
											<label className="th-setting-label">{__("Text Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.Input.color}
												onChange={(e) =>
												handleSettingChange("design", ["Input", "color"], e.target.value)
												}
											/>
										</div>

										<div className="th-setting-row">
											<label className="th-setting-label">{__("Background Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.Input.background}
												onChange={(e) =>
												handleSettingChange("design", ["Input", "background"], e.target.value)
												}
											/>
										</div>

										<div className="th-setting-row">
											<label className="th-setting-label">{__("Font Size", "th-login")}</label>
											<input
												type="number"
												className="th-number-input"
												value={parseInt(settings.design.Input.typography.size)}
												onChange={(e) =>
												handleSettingChange("design", ["Input", "typography", "size"], `${e.target.value}px`)
												}
												min={1}
											/>
										</div>

										<div className="th-setting-row">
											<div className="th-select-wrapper modern-sleect-heaidng">
												<CustomSelectControl
												label={__("Font Weight", "th-login")}
												value={settings.design.Input.typography.fontWeight}
												onChange={(value) =>
													handleSettingChange("design", ["Input", "typography", "fontWeight"], value)
												}
												options={fontWeightOptions}
												/>
											</div>
										</div>
									</div>
								</AccordionSection>

								<AccordionSection title={__("Button", "th-login")} defaultOpen={false}>
								<div className="th-heading-settings">
									<div className="th-setting-row">
									<label className="th-setting-label">{__("Text Color", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.button.color}
										onChange={(e) =>
										handleSettingChange("design", ["button", "color"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Background Color", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.button.background}
										onChange={(e) =>
										handleSettingChange("design", ["button", "background"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Hover Background", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.button.hoverBackground}
										onChange={(e) =>
										handleSettingChange("design", ["button", "hoverBackground"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Font Size", "th-login")}</label>
									<input
										type="number"
										className="th-number-input"
										value={parseInt(settings.design.button.typography.size)}
										onChange={(e) =>
										handleSettingChange("design", ["button", "typography", "size"], `${e.target.value}px`)
										}
										min={1}
									/>
									</div>

									<div className="th-setting-row">
									<div className="th-select-wrapper modern-sleect-heaidng">
										<CustomSelectControl
										label={__("Font Weight", "th-login")}
										value={settings.design.button.typography.fontWeight}
										onChange={(value) =>
											handleSettingChange("design", ["button", "typography", "fontWeight"], value)
										}
										options={fontWeightOptions}
										/>
									</div>
									</div>
								</div>
								
								<div className="thlogin-border-managemnt-border">
									<PaddingSettingsPanel
									title={__("Padding", "th-login")}
									padding={settings.design.button.padding}  
									path={["button", "padding"]}
									handleSettingChange={handleSettingChange}
									/>

									<BorderSettingsPanel
									title={__("Border", "th-login")}
									border={settings.design.button.border}
									path={["button", "border"]}
									handleSettingChange={handleSettingChange}
									/>
								</div>
								</AccordionSection>

								<AccordionSection title={__("Remember Me", "th-login")} defaultOpen={false}>
									<div className="th-heading-settings">
										<div className="th-setting-row">
										<label className="th-setting-label">{__("Text Color", "th-login")}</label>
										<input
											type="color"
											className="th-color-input"
											value={settings.design.rememberme.color}
											onChange={(e) =>
											handleSettingChange("design", ["rememberme", "color"], e.target.value)
											}
										/>
										</div>

										<div className="th-setting-row">
										<label className="th-setting-label">{__("Checkbox Color", "th-login")}</label>
										<input
											type="color"
											className="th-color-input"
											value={settings.design.rememberme.checkboxbackground}
											onChange={(e) =>
											handleSettingChange("design", ["rememberme", "checkboxbackground"], e.target.value)
											}
										/>
										</div>

										<div className="th-setting-row">
										<label className="th-setting-label">{__("Font Size", "th-login")}</label>
										<input
											type="number"
											className="th-number-input"
											value={parseInt(settings.design.rememberme.typography.size)}
											onChange={(e) =>
											handleSettingChange("design", ["rememberme", "typography", "size"], `${e.target.value}px`)
											}
											min={1}
										/>
										</div>

										<div className="th-setting-row">
										<div className="th-select-wrapper modern-sleect-heaidng">
											<CustomSelectControl
											label={__("Font Weight", "th-login")}
											value={settings.design.rememberme.typography.fontWeight}
											onChange={(value) =>
												handleSettingChange("design", ["rememberme", "typography", "fontWeight"], value)
											}
											options={fontWeightOptions}
											/>
										</div>
										</div>
									</div>
								</AccordionSection>

								<AccordionSection title={__("Icon", "th-login")} defaultOpen={false}>
									<div className="th-heading-settings">
										<div className="th-setting-row">
										<label className="th-setting-label">{__("Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.icon.color}
												onChange={(e) =>
													handleSettingChange("design", ["icon", "color"], e.target.value)
												}
											/>
										</div>

										
										<div className="th-setting-row">
											<label className="th-setting-label">{__("Size", "th-login")}</label>
											<input
												type="number"
												className="th-number-input"
												value={parseInt(settings.design.icon.size)}
												onChange={(e) =>
													handleSettingChange("design", ["icon", "size"], `${e.target.value}px`)
												}
												min={1}
											/>
										</div>

									</div>

								</AccordionSection>
							</>
						)}

						{insidetab === 'header' && (
							<>
								{/* Add Cancel Button Settings */}
								<AccordionSection title={__("Cancel Button", "th-login")} defaultOpen={false}>
								<div className="th-heading-settings">
									<div className="th-setting-row">
									<label className="th-setting-label">{__("Text Color", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.header.cancel_button.color}
										onChange={(e) =>
										handleSettingChange("design", ["header", "cancel_button", "color"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Background", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.header.cancel_button.background}
										onChange={(e) =>
										handleSettingChange("design", ["header", "cancel_button", "background"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Hover Background", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.header.cancel_button.hoverBackground}
										onChange={(e) =>
										handleSettingChange("design", ["header", "cancel_button", "hoverBackground"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Font Size", "th-login")}</label>
									<input
										type="number"
										className="th-number-input"
										value={parseInt(settings.design.header.cancel_button.typography.size)}
										onChange={(e) =>
										handleSettingChange("design", ["header", "cancel_button", "typography", "size"], `${e.target.value}px`)
										}
									/>
									</div>

									<div className="th-setting-row modern-sleect-heaidng">
									<CustomSelectControl
										label={__("Font Weight", "th-login")}
										value={settings.design.header.cancel_button.typography.fontWeight}
										onChange={(value) =>
										handleSettingChange("design", ["header", "cancel_button", "typography", "fontWeight"], value)
										}
										options={fontWeightOptions}
									/>
									</div>
								</div>

								<PaddingSettingsPanel
									title={__("Padding", "th-login")}
									padding={settings.design.header.cancel_button.padding}
									path={["header", "cancel_button", "padding"]}
									handleSettingChange={handleSettingChange}
								/>

								<BorderSettingsPanel
									title={__("Border", "th-login")}
									border={settings.design.header.cancel_button.border}
									path={["header", "cancel_button", "border"]}
									handleSettingChange={handleSettingChange}
								/>
								</AccordionSection>

								{/* Add Header Button (Submit) Settings */}
								<AccordionSection title={__("Button", "th-login")} defaultOpen={false}>
								<div className="th-heading-settings">
									<div className="th-setting-row">
									<label className="th-setting-label">{__("Text Color", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.header.button.color}
										onChange={(e) =>
										handleSettingChange("design", ["header", "button", "color"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Background", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.header.button.background}
										onChange={(e) =>
										handleSettingChange("design", ["header", "button", "background"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Hover Background", "th-login")}</label>
									<input
										type="color"
										className="th-color-input"
										value={settings.design.header.button.hoverBackground}
										onChange={(e) =>
										handleSettingChange("design", ["header", "button", "hoverBackground"], e.target.value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Font Size", "th-login")}</label>
									<input
										type="number"
										className="th-number-input"
										value={parseInt(settings.design.header.button.typography.size)}
										onChange={(e) =>
										handleSettingChange("design", ["header", "button", "typography", "size"], `${e.target.value}px`)
										}
									/>
									</div>

									<div className="th-setting-row modern-sleect-heaidng">
									<CustomSelectControl
										label={__("Font Weight", "th-login")}
										value={settings.design.header.button.typography.fontWeight}
										onChange={(value) =>
										handleSettingChange("design", ["header", "button", "typography", "fontWeight"], value)
										}
										options={fontWeightOptions}
									/>
									</div>
								</div>

								<PaddingSettingsPanel
									title={__("Padding", "th-login")}
									padding={settings.design.header.button.padding}
									path={["header", "button", "padding"]}
									handleSettingChange={handleSettingChange}
								/>

								<BorderSettingsPanel
									title={__("Border", "th-login")}
									border={settings.design.header.button.border}
									path={["header", "button", "border"]}
									handleSettingChange={handleSettingChange}
								/>
								</AccordionSection>
							</>
						)}
					</div>
						
				</div>

				<div className="preview-panel">
					<div className={`th-preview-container layout-${settings.general.display_mode}`}>
					{renderFormPreview()}
					</div>
				</div>

				<div className="th-layout-picker">
					{layoutOptions.map((option) => (
						<div
							key={option.key}
							className={`th-layout-card ${settings.general.display_mode === option.key ? "active" : ""}`}
							onClick={() => handleSettingChange("general", ["display_mode"], option.key)}
						>
							<div className={`layout-preview ${option.demoClass}`}>
								<div className="form-box">
									<div className="form-line"></div>
									<div className="form-line short"></div>
									<div className="form-button"></div>
								</div>
							</div>

							<div className="layout-label">
								<Dashicon icon={option.icon} size={16} />
								<span>{option.label}</span>

								{getLoginPreviewUrl(option)}

							</div>

						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DesignEditor;