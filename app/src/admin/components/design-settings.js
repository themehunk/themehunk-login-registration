import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { TabPanel } from "@wordpress/components";
import AccordionSection from "./accordion-section";

import { ColorPicker} from "@wordpress/components";
import { GradientPicker ,TextControl,RangeControl} from "@wordpress/components";
import {CustomSelectControl} from "./custom-select-control";
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { BorderBoxControl } from './border-box-control';
import { __experimentalBorderRadiusControl as BorderRadiusControl } from '@wordpress/components';


const DesignEditor = ({ settings, handleSettingChange }) => {
	const [activeForm, setActiveForm] = useState("login");
	const background = settings.design.modal.modal_background || {};
	const bgType = background.type || "color";
	const bgColor = background.color || "#ffffff";
	const bgGradient = background.gradient || "";
	const bgImage = background.image || {};
	const imageURL = bgImage.url || "";
	const position = bgImage.position || "center center";
	const size = bgImage.size || "cover";
	const repeat = bgImage.repeat || "no-repeat";

	const formBackground = settings.design.modal.form_background || {};
	const formBgType = formBackground.type || "color";
	const formBgColor = formBackground.color || "#ffffff";
	const formBgGradient = formBackground.gradient || "";
	const formBgImage = formBackground.image || {};
	const formImageURL = formBgImage.url || "";
	const formPosition = formBgImage.position || "center center";
	const formSize = formBgImage.size || "cover";
	const formRepeat = formBgImage.repeat || "no-repeat";

	const getFormBackgroundStyle = () => {
		const base = settings.design.modal.form_background || {};
		const type = base.type || "color";

		if (type === "gradient") {
			return {
				backgroundImage: base.gradient,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center center",
				opacity: base.opacity,
			};
		} else if (type === "image" && base.image?.url) {
			return {
				backgroundImage: `url(${base.image.url})`,
				backgroundSize: base.image.size || "cover",
				backgroundRepeat: base.image.repeat || "no-repeat",
				backgroundPosition: base.image.position || "center center",
				opacity: base.opacity,
			};
		} else {
			return {
				backgroundColor: base.color || "#ffffff",
				opacity: base.opacity,
			};
		}
	};

	const getModalBackgroundStyle = () => {
		const base = settings.design.modal.modal_background || {};
		const type = base.type || "color";

		if (type === "gradient") {
			return {
				backgroundImage: base.gradient,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center center",
				opacity: base.opacity,
			};
		} else if (type === "image" && base.image?.url) {
			return {
				backgroundImage: `url(${base.image.url})`,
				backgroundSize: base.image.size || "cover",
				backgroundRepeat: base.image.repeat || "no-repeat",
				backgroundPosition: base.image.position || "center center",
				opacity: base.opacity,
			};
		} else {
			return {
				backgroundColor: base.color || "#ffffff",
				opacity: base.opacity,
			};
		}
	};

	const getFormBorderStyle = () => {
		const border = settings.design.modal.form_border || {};
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
			borderWidth: "1px",
		};
	};

	const renderFormPreview = () => {
		const formContent = (() => {
			switch (activeForm) {
				case "register":
					return (
						<form className="preview-form" style={getFormBackgroundStyle()}>
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
						<form className="preview-form" style={getFormBackgroundStyle()}>
							<h3>{__("Forgot Password", "th-login")}</h3>
							<input type="text" placeholder="Username or Email" />
							<button>{__("Reset Password", "th-login")}</button>
						</form>
					);
				default:
					return (
						<form className="preview-form" style={getFormBackgroundStyle()}>
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

		const layoutType = settings.design.modal.layout_type || "popup";

		const wrappedContent = (
			<div className="form-background-preview" >
				{formContent}
			</div>
		);

		return layoutType === "sliding" ? (
			<div className="preview-sliding-wrapper">
				<div className="side-panel-preview">{wrappedContent}</div>
			</div>
		) : (
			<div className="modal-box-preview">{wrappedContent}</div>
		);
	};

	return (
		<div className="design-editor-layout">
			{/* Left Preview Panel */}
			<div className="preview-panel">
				<div
					className={`preview-overlay layout-${settings.design.modal.layout_type}`}
					style={getModalBackgroundStyle()}
				>
					{renderFormPreview()}
				</div>

				<div className="preview-switcher">
					<button onClick={() => setActiveForm("login")} className={activeForm === "login" ? "active" : ""}>
						{__("Login", "th-login")}
					</button>
					<button onClick={() => setActiveForm("register")} className={activeForm === "register" ? "active" : ""}>
						{__("Register", "th-login")}
					</button>
					<button onClick={() => setActiveForm("forgot")} className={activeForm === "forgot" ? "active" : ""}>
						{__("Forgot", "th-login")}
					</button>
				</div>
			</div>

			{/* Right Settings Panel */}
			<div className="settings-panel">
				<h2 className="settings-title">{__("Design Settings", "th-login")}</h2>
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
										<div className="layout-style-grid">
											{/* Popup Modal Card */}
											<div
												className={`layout-style-card ${settings.design.modal.layout_type === "popup" ? "selected" : ""}`}
												onClick={() => handleSettingChange("design", ["modal", "layout_type"], "popup")}
											>
												<div className="layout-visual layout-popup">
													<div className="modal-box"></div>
												</div>
												<p className="layout-name">{__("Popup Modal", "th-login")}</p>
											</div>

											{/* Sliding Panel Card */}
											<div
												className={`layout-style-card ${settings.design.modal.layout_type === "sliding" ? "selected" : ""}`}
												onClick={() => handleSettingChange("design", ["modal", "layout_type"], "sliding")}
											>
												<div className="layout-visual layout-sliding">
													<div className="side-panel"></div>
												</div>
												<p className="layout-name">{__("Sliding Panel", "th-login")}</p>
											</div>
										</div>
									</AccordionSection>

									<AccordionSection title={__("Background", "th-login")} defaultOpen = {false}>

										<ToggleGroupControl
											label={__("Background Type", "th-login")}
											value={bgType}
											isBlock
											onChange={(newType) => {
												handleSettingChange("design", ["modal", "modal_background", "type"], newType);
											}}
										>
											<ToggleGroupControlOption value="color" label={__("Color", "th-login")} />
											<ToggleGroupControlOption value="gradient" label={__("Gradient", "th-login")} />
											<ToggleGroupControlOption value="image" label={__("Image", "th-login")} />
										</ToggleGroupControl>

										{/* Color Picker */}
										{bgType === "color" && (
											<div className="background-color-picker">
												<ColorPicker
													color={bgColor}
													onChangeComplete={(value) => {
														handleSettingChange("design", ["modal", "modal_background", "color"], value.hex);
													}}
													disableAlpha={false}
												/>
											</div>
										)}

										{bgType === "gradient" && (
											<div className="background-gradient-picker">
												<GradientPicker
													value={bgGradient}
													onChange={(value) =>
														handleSettingChange("design", ["modal", "modal_background", "gradient"], value)
													}
													gradients={[
														{
															name: __("Default", "th-login"),
															gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
															slug: "default",
														},
														{
															name: __("Ocean Blue", "th-login"),
															gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)",
															slug: "ocean-blue",
														},
													]}
												/>
											</div>
										)}

										{/* Image Upload */}
										{bgType === "image" && (
											<>
												{/* Image URL Input */}
												<div className="image-url-input">
													<TextControl
														label={__("Image URL", "th-login")}
														value={imageURL}
														onChange={(val) =>
															handleSettingChange("design", ["modal", "modal_background", "image", "url"], val)
														}
														placeholder="https://example.com/image.jpg"
													/>
												</div>

												{/* Image Preview */}
												{imageURL && (
													<>
														<div style={{ marginTop: "10px" }}>
															<img
																src={imageURL}
																alt="Preview"
																style={{
																	width: "100%",
																	height: "auto",
																	borderRadius: "6px",
																	border: "1px solid #ccc",
																	objectFit: "cover",
																}}
															/>
														</div>
														
														<div className="th-login-media-image">
														{/* Image Position */}
														<CustomSelectControl
															label={__("Position", "th-login")}
															value={position}
															options={[
																{ label: __("Top Left", "th-login"), value: "top left" },
																{ label: __("Top Center", "th-login"), value: "top center" },
																{ label: __("Top Right", "th-login"), value: "top right" },
																{ label: __("Center Left", "th-login"), value: "center left" },
																{ label: __("Center Center", "th-login"), value: "center center" },
																{ label: __("Center Right", "th-login"), value: "center right" },
																{ label: __("Bottom Left", "th-login"), value: "bottom left" },
																{ label: __("Bottom Center", "th-login"), value: "bottom center" },
																{ label: __("Bottom Right", "th-login"), value: "bottom right" },
															]}
															onChange={(val) =>
																handleSettingChange("design", ["modal", "modal_background", "image", "position"], val)
															}
														/>

														{/* Image Size */}
														<CustomSelectControl
															label={__("Size", "th-login")}
															value={size}
															options={[
																{ label: __("Cover", "th-login"), value: "cover" },
																{ label: __("Contain", "th-login"), value: "contain" },
																{ label: __("Auto", "th-login"), value: "auto" },
															]}
															onChange={(val) =>
																handleSettingChange("design", ["modal", "modal_background", "image", "size"], val)
															}
														/>

														{/* Image Repeat */}
														<CustomSelectControl
															label={__("Repeat", "th-login")}
															value={repeat}
															options={[
																{ label: __("No Repeat", "th-login"), value: "no-repeat" },
																{ label: __("Repeat", "th-login"), value: "repeat" },
																{ label: __("Repeat X", "th-login"), value: "repeat-x" },
																{ label: __("Repeat Y", "th-login"), value: "repeat-y" },
															]}
															onChange={(val) =>
																handleSettingChange("design", ["modal", "modal_background", "image", "repeat"], val)
															}
														/>
														</div>

													</>
												)}

											</>
										)}

										<div className="background-opacity-slider" style={{ marginTop: "16px" }}>
											<RangeControl
												label={__("Opacity", "th-login")}
												value={background.opacity ?? 1}
												onChange={(val) => {
													handleSettingChange("design", ["modal", "modal_background", "opacity"], val);
												}}
												min={0}
												max={1}
												step={0.1}
												withInputField
											/>
										</div>

									</AccordionSection>
								</>
							)}

							{tab.name === "container" && (
								<>
									<AccordionSection title={__("Background", "th-login")} defaultOpen={false}>
										<ToggleGroupControl
											label={__("Background Type", "th-login")}
											value={formBgType}
											isBlock
											onChange={(newType) => {
												handleSettingChange("design", ["modal", "form_background", "type"], newType);
											}}
										>
											<ToggleGroupControlOption value="color" label={__("Color", "th-login")} />
											<ToggleGroupControlOption value="gradient" label={__("Gradient", "th-login")} />
											<ToggleGroupControlOption value="image" label={__("Image", "th-login")} />
										</ToggleGroupControl>

										{formBgType === "color" && (
											<ColorPicker
												color={formBgColor}
												onChangeComplete={(val) =>
													handleSettingChange("design", ["modal", "form_background", "color"], val.hex)
												}
												disableAlpha={false}
											/>
										)}

										{formBgType === "gradient" && (
											<GradientPicker
												value={formBgGradient}
												onChange={(val) =>
													handleSettingChange("design", ["modal", "form_background", "gradient"], val)
												}
												gradients={[
													{ name: __("Default", "th-login"), gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)", slug: "default" },
													{ name: __("Ocean Blue", "th-login"), gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)", slug: "ocean-blue" },
												]}
											/>
										)}

										{formBgType === "image" && (
											<>
												<TextControl
													label={__("Image URL", "th-login")}
													value={formImageURL}
													onChange={(val) =>
														handleSettingChange("design", ["modal", "form_background", "image", "url"], val)
													}
												/>

												{formImageURL && (
													<>
														<img
															src={formImageURL}
															alt="Form Background Preview"
															style={{
																width: "100%",
																height: "auto",
																borderRadius: "6px",
																border: "1px solid #ccc",
																objectFit: "cover",
																marginTop: "10px"
															}}
														/>

														<div className="th-login-media-image">
															<CustomSelectControl
																label={__("Position", "th-login")}
																value={formPosition}
																options={[
																	{ label: __("Top Left", "th-login"), value: "top left" },
																	{ label: __("Top Center", "th-login"), value: "top center" },
																	{ label: __("Top Right", "th-login"), value: "top right" },
																	{ label: __("Center Left", "th-login"), value: "center left" },
																	{ label: __("Center Center", "th-login"), value: "center center" },
																	{ label: __("Center Right", "th-login"), value: "center right" },
																	{ label: __("Bottom Left", "th-login"), value: "bottom left" },
																	{ label: __("Bottom Center", "th-login"), value: "bottom center" },
																	{ label: __("Bottom Right", "th-login"), value: "bottom right" },
																]}
																onChange={(val) =>
																	handleSettingChange("design", ["modal", "form_background", "image", "position"], val)
																}
															/>

															<CustomSelectControl
																label={__("Size", "th-login")}
																value={formSize}
																options={[
																	{ label: __("Cover", "th-login"), value: "cover" },
																	{ label: __("Contain", "th-login"), value: "contain" },
																	{ label: __("Auto", "th-login"), value: "auto" },
																]}
																onChange={(val) =>
																	handleSettingChange("design", ["modal", "form_background", "image", "size"], val)
																}
															/>

															<CustomSelectControl
																label={__("Repeat", "th-login")}
																value={formRepeat}
																options={[
																	{ label: __("No Repeat", "th-login"), value: "no-repeat" },
																	{ label: __("Repeat", "th-login"), value: "repeat" },
																	{ label: __("Repeat X", "th-login"), value: "repeat-x" },
																	{ label: __("Repeat Y", "th-login"), value: "repeat-y" },
																]}
																onChange={(val) =>
																	handleSettingChange("design", ["modal", "form_background", "image", "repeat"], val)
																}
															/>
														</div>
													</>
												)}
											</>
										)}

										{/* Opacity Control */}
										<RangeControl
											label={__("Opacity", "th-login")}
											value={formBackground.opacity ?? 1}
											onChange={(val) => {
												handleSettingChange("design", ["modal", "form_background", "opacity"], val);
											}}
											min={0}
											max={1}
											step={0.1}
											withInputField
										/>
									</AccordionSection>

									<AccordionSection title={__("Border", "th-login")} defaultOpen={false}>
										{/* Border Widths */}
										<div className="th-login-border-controls">
											<BorderBoxControl
												label={__("Border Width", "th-login")}
												values={settings.design.modal.form_border?.width || {}}
												onChange={(newVal) =>
													handleSettingChange("design", ["modal", "form_border", "width"], newVal)
												}
												min={0}
												max={20}
											/>
										</div>

										{/* Border Style */}
										<CustomSelectControl
											label={__("Style", "th-login")}
											value={settings.design.modal.form_border?.style || "solid"}
											options={[
												{ label: __("Solid", "th-login"), value: "solid" },
												{ label: __("Dashed", "th-login"), value: "dashed" },
												{ label: __("Dotted", "th-login"), value: "dotted" },
												{ label: __("Double", "th-login"), value: "double" },
												{ label: __("None", "th-login"), value: "none" },
											]}
											className="modern-border-select-control"
											onChange={(val) => handleSettingChange("design", ["modal", "form_border", "style"], val)}
										/>

										{/* Border Color */}
										<ColorPicker
											color={settings.design.modal.form_border?.color || "#000000"}
											onChangeComplete={(val) => handleSettingChange("design", ["modal", "form_border", "color"], val.hex)}
											disableAlpha={false}
										/>

										<hr style={{ margin: "16px 0" }} />

										<BorderRadiusControl
											label={__("Border Radius", "th-login")}
											values={settings.design.modal.form_border?.radius || {}}
											onChange={(newRadius) =>
												handleSettingChange("design", ["modal", "form_border", "radius"], newRadius)
											}
										/>
									</AccordionSection>

								</>
							)}

							{tab.name === "more" && (
								<>
									<AccordionSection title={__("Heading", "th-login")} defaultOpen={false}></AccordionSection>
									<AccordionSection title={__("Input", "th-login")} defaultOpen={false}></AccordionSection>
									<AccordionSection title={__("Button", "th-login")} defaultOpen={false}></AccordionSection>
								</>
							)}
						</>
					)}
				</TabPanel>
			</div>
		</div>
	);
};

export default DesignEditor;
