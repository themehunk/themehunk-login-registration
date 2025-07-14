import { useState } from "react";
import { __ } from "@wordpress/i18n";
import AccordionSection from "./design-editor/accordion-section";
import BackgroundSettingsPanel from "./design-editor/background-panel";
import BorderSettingsPanel from "./design-editor/border-settings-panel";
import { PaddingSettingsPanel } from "./design-editor/padding-settings-panel";
import { CustomSelectControl } from './custom-select-control';
import { TabPanel, Dashicon } from "@wordpress/components";

const tabs = [
  { key: "login", label: __("Login", "th-login") },
  { key: "register", label: __("Register", "th-login") },
  { key: "forgot", label: __("Forgot", "th-login") },
];

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

const DesignEditor = ({ settings, handleSettingChange }) => {
	const [activeForm, setActiveForm] = useState("login");

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

	const getBorderStyle = (border) => {
		const width = border?.width || {};
		const radius = border?.radius || {};
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
		...getBackgroundStyle(settings.design.modal.modal_background),
		...getBorderStyle(settings.design.modal.modal_border),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const formStyle = {
		...getBackgroundStyle(settings.design.form.form_background),
		...getBorderStyle(settings.design.form.form_border),
		...getPaddingStyle(settings.design.form.form_padding),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		gap: '30px',
	};

	const inputBase = settings.design.Input;
	const buttonBase = settings.design.button;

	const renderFormPreview = () => {
		const commonHeadingStyle = {
			color: settings.design.heading.color,
			fontSize: settings.design.heading.typography.size,
			fontWeight: settings.design.heading.typography.fontWeight,
			margin: 0,
		};

		const inputProps = {
			base: {
				'--th-login-input-color': inputBase.color,
				'--th-login-input-background-color': inputBase.background,
				fontSize: inputBase.typography.size,
				fontWeight: inputBase.typography.fontWeight,
				padding: '10px',
				border: '1px solid #ccc',
				width: '100%',
				borderRadius: '4px',
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

		const renderInputs = (fields) => fields.map((props, i) => (
			<InteractiveInput key={i} {...inputProps} {...props} />
		));

		const renderContent = () => {
			switch (activeForm) {
			case 'register':
				return (
				<>
					<h3 style={commonHeadingStyle}>{__('Register', 'th-login')}</h3>
					{renderInputs([
					{ type: 'text', placeholder: 'Username' },
					{ type: 'email', placeholder: 'Email' },
					{ type: 'password', placeholder: 'Password' },
					{ type: 'password', placeholder: 'Confirm Password' },
					])}
					<InteractiveButton {...buttonProps}>{__('Register', 'th-login')}</InteractiveButton>
				</>
				);
			case 'forgot':
				return (
				<>
					<h3 style={commonHeadingStyle}>{__('Forgot Password', 'th-login')}</h3>
					{renderInputs([{ type: 'text', placeholder: 'Username or Email' }])}
					<InteractiveButton {...buttonProps}>{__('Reset Password', 'th-login')}</InteractiveButton>
				</>
				);
			default:
				return (
				<>
					<h3 style={commonHeadingStyle}>{__('Login', 'th-login')}</h3>
					{renderInputs([
					{ type: 'text', placeholder: 'Username or Email' },
					{ type: 'password', placeholder: 'Password' },
					])}
					<div style={{ textAlign: "left", margin: "10px 0" }}>
					<label>
						<input type="checkbox" /> {__('Remember Me', 'th-login')}
					</label>
					</div>
					<InteractiveButton {...buttonProps}>{__('Login', 'th-login')}</InteractiveButton>
				</>
				);
			}
		};

		return (
			<div className="modal-box-preview" style={modalStyle}>
		
				<form onSubmit={(e) => e.preventDefault()} className="form-background-preview" style={formStyle}>
					{renderContent()}
				</form>

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

	return (
		<div className="settings-card">

		<h2 className="section-title">
			<i className="dashicons dashicons-art"></i>
			{__("Design Settings", "th-login")}
		</h2>

		<div className="design-editor-layout">
			{/* Right Settings Panel */}
			<div className="settings-panel">
				<TabPanel
					className="th-login-tabs"
					activeClass="active-tab"
					tabs={[
						{ name: "layout", title: __("Modal", "th-login") },
						{ name: "container", title: __("Form", "th-login") },
						{ name: "more", title: __("Components", "th-login") },
					]}
				>
					{(tab) => (
						<>
							{tab.name === "layout" && (
								<>
									<AccordionSection title={__("Layout", "th-login")} defaultOpen={false}>
										<div className="th-layout-picker">
											{[
											{
												key: "popup",
												icon: "align-center",
												label: __("Popup", "th-login"),
												demoClass: "popup",
											},
											{
												key: "slide_in_left",
												icon: "align-pull-left",
												label: __("Slide-in-left", "th-login"),
												demoClass: "slide-left",
											},
											{
												key: "slide_in_right",
												icon: "align-pull-right",
												label: __("Slide-in-right", "th-login"),
												demoClass: "slide-right",
											},
											].map((option) => (
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
												</div>
											</div>
											))}
										</div>
									</AccordionSection>

									<BackgroundSettingsPanel
										title={__("Background", "th-login")}
										background={settings.design.modal.modal_background}
										path={["modal", "modal_background"]}
										handleSettingChange={handleSettingChange}
									/>

									<BorderSettingsPanel
										title={__("Border", "th-login")}
										border={settings.design.modal.modal_border}
										path={["modal", "modal_border"]}
										handleSettingChange={handleSettingChange}
									/>

								</>
							)}

							{tab.name === "container" && (
								<>
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
								</>
							)}

							{tab.name === "more" && (
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
														label = {__("Font Weight", "th-login")}
														value={settings.design.heading.typography.fontWeight}
														onChange={(value) =>
															handleSettingChange("design", ["heading", "typography", "fontWeight"], value)
														}
														options={[
															{ label: __("Normal", "th-login"), value: 400 },
															{ label: __("Medium", "th-login"), value: 500 },
															{ label: __("Semi-Bold", "th-login"), value: 600 },
															{ label: __("Bold", "th-login"), value: 700 },
														]}
													/>
												</div>
											</div>

										</div>
									</AccordionSection>

									<AccordionSection title={__("Input", "th-login")} defaultOpen={false}>
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
												<label className="th-setting-label">{__("Active Background", "th-login")}</label>
												<input
													type="color"
													className="th-color-input"
													value={settings.design.Input.activeBackground}
													onChange={(e) =>
														handleSettingChange("design", ["Input", "activeBackground"], e.target.value)
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
														options={[
															{ label: __("Normal", "th-login"), value: 400 },
															{ label: __("Medium", "th-login"), value: 500 },
															{ label: __("Semi-Bold", "th-login"), value: 600 },
															{ label: __("Bold", "th-login"), value: 700 },
														]}
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
														options={[
															{ label: __("Normal", "th-login"), value: 400 },
															{ label: __("Medium", "th-login"), value: 500 },
															{ label: __("Semi-Bold", "th-login"), value: 600 },
															{ label: __("Bold", "th-login"), value: 700 },
														]}
													/>
												</div>
											</div>

										</div>
													
										<div className="th-login-border-managemnt-border">
											{/* Reuse Padding Panel */}
											<PaddingSettingsPanel
												title={__("Padding", "th-login")}
												padding={settings.design.button.padding}	
												path={["button", "padding"]}
												handleSettingChange={handleSettingChange}
											/>

											{/* Reuse Border Panel */}
											<BorderSettingsPanel
												title={__("Border", "th-login")}
												border={settings.design.button.border}
												path={["button", "border"]}
												handleSettingChange={handleSettingChange}
											/>
										</div>

									</AccordionSection>
								</>
							)}
						</>
					)}
				</TabPanel>
			</div>

			{/* Left Preview Panel */}
			<div className="preview-panel">
				<div
					className={`preview-overlay layout-${settings.general.display_mode}`}
					style={modalStyle}
				>
					{renderFormPreview()}
				</div>

				<div className="preview-switcher">
					{renderTabs()}
				</div>
			</div>
		</div>

		</div>
	);
};

export default DesignEditor;