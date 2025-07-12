import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { TabPanel,Dashicon } from "@wordpress/components";
import AccordionSection from "./design-editor/accordion-section";
import BackgroundSettingsPanel from "./design-editor/background-panel";
import BorderSettingsPanel from "./design-editor/border-settings-panel";
import {PaddingSettingsPanel} from "./design-editor/padding-settings-panel";

const tabs = [
	{ key: "login", label: __("Login", "th-login") },
	{ key: "register", label: __("Register", "th-login") },
	{ key: "forgot", label: __("Forgot", "th-login") },
];

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
			borderWidth: "1px",
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
		display:'flex',
		alignItems:'center',
		justifyContent:'center'
	};

	const formStyle = {
		...getBackgroundStyle(settings.design.form.form_background),
		...getBorderStyle(settings.design.form.form_border),
		...getPaddingStyle(settings.design.form.form_padding),
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		flexDirection: 'column',
    	gap: '30px',
	};

	const renderFormPreview = () => {
		const formContent = (() => {
			switch (activeForm) {
				case "register":
					return (
						<form className="preview-form" style={formStyle}>
							<h3>{__("Register", "th-login")}</h3>
							<input type="text" placeholder="Username" />
							<input type="email" placeholder="Email" />
							<input type="password" placeholder="Password" />
							<input type="password" placeholder="Confirm Password" />
							<button>{__("Register", "th-login")}</button>
						</form>
					);
				case "forgot":
					return (
						<form className="preview-form" style={formStyle}>
							<h3>{__("Forgot Password", "th-login")}</h3>
							<input type="text" placeholder="Username or Email" />
							<button>{__("Reset Password", "th-login")}</button>
						</form>
					);
				default:
					return (
						<form className="preview-form" style={formStyle}>
							<h3>{__("Login", "th-login")}</h3>
							<input type="text" placeholder="Username or Email" />
							<input type="password" placeholder="Password" />
							<div style={{ textAlign: "left", margin: "10px 0" }}>
								<label>
									<input type="checkbox" /> {__("Remember Me", "th-login")}
								</label>
							</div>
							<button>{__("Login", "th-login")}</button>
						</form>
					);
			}
		})();

		return (
			<div className="modal-box-preview">
				<div className="form-background-preview" >
					{formContent}
				</div>
			</div>
		);
	};
    
    const renderTabs = () => (
        <div className="custom-tabs">
        {tabs.map((tab) => (
            <button
            key={tab.key}
            className={`custom-tab-button ${
                activeForm === tab.key ? "active" : ""
            }`}
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
											{/* color, typography */}
										</AccordionSection>
										<AccordionSection title={__("Input", "th-login")} defaultOpen={false}>
											{/* color, typography , Background, hover backgund, active backgrund*/}
										</AccordionSection>
										<AccordionSection title={__("Button", "th-login")} defaultOpen={false}>
											{/* color, typography , Background , hover backgund , padding*/}
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
