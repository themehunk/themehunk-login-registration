import { useState } from "react";
import { __ } from "@wordpress/i18n";
import AccordionSection from "./design-editor/accordion-section";
import BackgroundSettingsPanel from "./design-editor/background-panel";
import BorderSettingsPanel from "./design-editor/border-settings-panel";
import { PaddingSettingsPanel } from "./design-editor/padding-settings-panel";
import { CustomSelectControl } from './custom-select-control';
import { Dashicon, RangeControl,ToggleControl } from "@wordpress/components";
import {tabs,tabdeisgn, layoutOptions, fontWeightOptions, tabicon} from '../contant';
import { THL_ICONS } from "./icons";
import { envelope } from '@wordpress/icons';
import { Icon,TextControl } from '@wordpress/components';

const tabinside = [
	{ key: "form", label: __("Form", "th-login") },
	{ key: "label", label: __("Label", "th-login") },
	{ key: "header", label: __("Button", "th-login") },
];

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

const decodeEntities = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const InteractiveCheckbox = ({ base, terms, children }) => {
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

  // Decode HTML entities in the label text first
  const decodedLabel = decodeEntities(children);

  if (terms) {
    return (
      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}>
        <input type="checkbox" style={checkboxStyle} />
        <span style={labelStyle}>
          {decodedLabel.split(/(\[.*?\])/).map((part, i) => {
            if (part.startsWith('[') && part.endsWith(']')) {
              const term = part.slice(1, -1);
              return (
                <a 
                  key={i} 
                  href="#" 
                  style={{ 
                    color: base.linkColor || '#0073aa',
                    textDecoration: 'none'
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  {term}
                </a>
              );
            }
            return part;
          })}
        </span>
      </label>
    );
  }

  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}>
      <input type="checkbox" style={checkboxStyle} />
      <span style={labelStyle}>{decodedLabel}</span>
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

  const [hovered, setHovered] = useState(null); // 'login' | 'register' | 'cancel' | null


  const applyButtonStyle = (style, isHovered = false) => {
    const bg = isHovered && style?.hoverbackground
      ? style.hoverbackground
      : style.background;

    return {
      color: style.color,
      ...getBackgroundStyle(bg),
      padding: `${style.padding?.top || 0}px ${style.padding?.right || 0}px ${style.padding?.bottom || 0}px ${style.padding?.left || 0}px`,
      fontSize: style.typography?.size || '14px',
      fontWeight: style.typography?.fontWeight || 'normal',
      borderStyle: style.border?.style || 'solid',
      borderColor: style.border?.color || '#000',
      borderWidth: `${style.border?.width?.top || 0}px ${style.border?.width?.right || 0}px ${style.border?.width?.bottom || 0}px ${style.border?.width?.left || 0}px`,
      borderRadius: `${style.border?.radius?.topLeft || 0}px ${style.border?.radius?.topRight || 0}px ${style.border?.radius?.bottomRight || 0}px ${style.border?.radius?.bottomLeft || 0}px`,
      cursor: 'pointer'
    };
  };

  return (
    <div className="thloginpreview-form-header-part">
      <div className="thloginpreview-cancel">
        {close_button && (
          <button 
            className="thloginpreview-popup-close-button" 
            aria-label={__('Close', 'th-login')}
            onMouseEnter={() => setHovered('cancel')}
            onMouseLeave={() => setHovered(null)}
            style={applyButtonStyle(cancelStyle, hovered === 'cancel')}
          >
            <Dashicon icon="no-alt" />
          </button>
        )}
      </div>

      {settings.design.header.showButtons && form_type === 'double' && (
        <div className="thlogin-prevuiew-form-toggle">
          <button 
            type="button" 
            className="thlogin-prevuiew-toggle-button thlogin-prevuiew-toggle-button--login"
            data-th-popup-action="login"
            onMouseEnter={() => setHovered('login')}
            onMouseLeave={() => setHovered(null)}
            style={applyButtonStyle(buttonStyle, hovered === 'login')}
          >
            {__(settings.design.header?.loginText, 'th-login')}
          </button>

          <button 
            type="button" 
            className="thlogin-preview-toggle-button thlogin-preview-toggle-button--register"
            data-th-popup-action="register"
            onMouseEnter={() => setHovered('register')}
            onMouseLeave={() => setHovered(null)}
            style={applyButtonStyle(buttonStyle, hovered === 'register')}
          >
            {__(settings.design.header?.registerText, 'th-login')}
          </button>
        </div>
      )}
    </div>
  );
};

const DesignEditor = ({ settings, handleSettingChange }) => {
	const [activeForm, setActiveForm] = useState("login");
	const [insidetab, setinsidetab] = useState('form');
	const [deisgnpreview, setdeisgnpreview] = useState('preview');
	const [floatingFocused, setFloatingFocused] = useState(true);
	const [floatingFocusedplace, setFloatingFocusedplace] = useState(false);

	const inputBase = settings.design.Input;
	const buttonBase = settings.design.button;

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
		'--th-backgroundColor': `0 0 0 1000px ${inputBase.background.color} inset`,
		backdropFilter: `blur(${settings.design.modal?.modal_background?.filter}px)`,
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
				color: settings.design.Input?.color,
				...getBackgroundStyle(settings.design.Input?.background),
				fontSize: settings.design.Input?.typography.size,
				fontWeight: settings.design.Input?.typography.fontWeight,
				...(settings.design.icon.icon_position ==='inside-input' ? { paddingLeft: '30px' } : {}),
				'--hover-input-color': settings.design.Input?.activecolor,
			},
			hover: {
				borderColor: settings.design.Input?.activecolor,
			},
			active: {
				...getBackgroundStyle(settings.design.Input?.background),
				borderColor: settings.design.Input?.activecolor,
			},
		};

		const buttonProps = {
			base: {
				color: buttonBase.color,
				...getBackgroundStyle(buttonBase.background),
				fontSize: buttonBase.typography.size,
				fontWeight: buttonBase.typography.fontWeight,
				padding: `${buttonBase.padding.top}px ${buttonBase.padding.right}px`,
				border: `${buttonBase.border.width?.top ?? 1}px ${buttonBase.border.style || 'solid'} ${buttonBase.border.color || '#000'}`,
				borderRadius: `${buttonBase.border.radius?.topLeft ?? 4}px`,
				cursor: 'pointer',
				width: '100%',
			},
			hover: { ...getBackgroundStyle( buttonBase.hoverbackground)},
		};

		const checkboxProps = {
			base: {
				color: settings.design.rememberme.color,
				checkboxbackground: settings.design.rememberme.checkboxbackground,
				typography: settings.design.rememberme.typography,
			},
		};

		const termsProps = {
			base: {
				color: settings.design.term.color,
				linkColor: settings.design.term.link,
				typography: settings.design.term.typography, // Using same typography as remember me
			},
		};

		const renderInputs = (fields) =>
			fields
			.filter((field) => field.show !== false)
			.map((field, i) => {
				const Icon = field.icon && THL_ICONS[field.icon] ? THL_ICONS[field.icon] : null;
				const IconPosition = settings.design.icon.icon_position || 'with-label';
				const layout = settings.design.modal.modal_input_layout || 'stack';

				const showIconInside = Icon && IconPosition === 'inside-input';
				const iconSpan = showIconInside ? (
					<span
						className="icon-inside-th-login"
						dangerouslySetInnerHTML={{ __html: THL_ICONS[field.icon] }}
						style={{
							color: settings.design.icon.color,
							width: settings.design.icon.size,
						}}
					/>
				) : null;

			return (
				<div
					key={i}
					className={`th-preview-field-group layout-${layout}`}
					style={{ width: '100%' }}
				>
					{field.type === 'checkbox' ? (
						field.id === 'terms_and_conditions' ? (
							<InteractiveCheckbox {...termsProps} terms={true}>
							{field.label}
							</InteractiveCheckbox>
						) : (
							<InteractiveCheckbox {...checkboxProps}>
							{field.label}
							</InteractiveCheckbox>
						)
						) : layout === 'floating' ? (
							<div className="floating-wrapper layout-floating" style={{ position: 'relative' }}>
								{iconSpan}
								<InteractiveInput
									type={field.type || 'text'}
									placeholder=" "
									base={inputProps.base}
									active={inputProps.active}
									className="floating-input"
									style={showIconInside ? { paddingLeft: '30px' } : {}}
								/>
								<label className="floating-label" style={{background:inputProps.base.backgroundColor,fontSize: inputBase.	labeltypography.size,fontWeight: inputBase.labeltypography.fontWeight,color: inputBase.labelcolor || '#333', }}>{field.label}</label>
							</div>
						) : layout === 'placehold' ? (
							<div className="placehold-wrapper layout-placehold" style={{ position: 'relative' }}>
								{iconSpan}
								<InteractiveInput
									type={field.type || 'text'}
									placeholder=" "
									base={inputProps.base}
									active={inputProps.active}
									className="floating-input"
									style={showIconInside ? { paddingLeft: '30px' } : {}}
								/>
								<label
									className="placehold-label"
									style={{
										background: inputProps.base.backgroundColor,
										fontSize: inputBase.labeltypography.size,
										fontWeight: inputBase.labeltypography.fontWeight,
										color: inputBase.labelcolor || '#333',
									}}
								>
									{field.label}
								</label>
							</div>
						) : (
							<>
								{IconPosition === 'with-label' && (Icon || field.label) ? (
									<div className="icon-label-wrapper">
										{Icon && (
											<span
												className="icon-with-label"
												dangerouslySetInnerHTML={{ __html: THL_ICONS[field.icon] }}
												style={{
													color: settings.design.icon.color,
													width: settings.design.icon.size,
												}}
											/>
										)}
										{field.label && (
											<label
												className="inline-stack-label"
												style={{
													fontSize: inputBase.labeltypography.size,
													fontWeight: inputBase.labeltypography.fontWeight,
													color: inputBase.labelcolor || '#333',
													margin: 0,
												}}
											>
												{field.label}
											</label>
										)}
									</div>
								) : field.label && (
									<label
										className="inline-stack-label"
										style={{
											display: 'block',
											marginBottom: layout === 'stack' ? '6px' : '0',
											fontSize: inputBase.labeltypography.size,
											fontWeight: inputBase.labeltypography.fontWeight,
											color: inputBase.labelcolor || '#333',
										}}
									>
										{field.label}
									</label>
								)}

								<div style={{ position: 'relative' }}>
									{iconSpan}
									<InteractiveInput
										type={field.type || 'text'}
										placeholder={field.placeholder || ''}
										base={inputProps.base}
										active={inputProps.active}
									/>
								</div>
							</>
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

					{settings.design.logo?.url ? (
						<div className="logo-wrapper">
							<div
							className="th-preview-logo-wrapper"
							>
							<img
								src={settings.design.logo.url}
								alt="Logo"
								style={{
									height: settings.design.logo.size,
									maxHeight: settings.design.logo.size,
									objectFit: 'cover',
								}}
							/>
							</div>

							<h3 style={commonHeadingStyle}>{headingLabel}</h3>
						</div>
						) : (
						<h3 style={commonHeadingStyle}>{headingLabel}</h3>
					)}

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

	const renderDesignOptions = () => (
		<div className="deisgn-settings-select-icon-place">

			<div className="icon-th-setting-row">
				<label className="icon-setting-label">Icon Placement</label>
					<div className="custom-tabs">
						{tabicon.map((tab) => (
							<button
								key={tab.key}
								className={`custom-tab-button ${settings.design.icon.icon_position === tab.key ? "active" : ""}`}
								onClick={() => handleSettingChange("design", ["icon", "icon_position"], tab.key)}
							>
								{tab.label}
							</button>
						))}
					</div>
			</div>

			<div className="design-options-wrapper">
				{['stack', 'inline', 'floating', 'placehold'].map((type) => (
					<div
						key={type}
						className={`design-card ${settings.design.modal.modal_input_layout === type ? 'selected' : ''}`}
						onClick={() => handleSettingChange("design", ["modal", "modal_input_layout"], type)}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === 'Enter' && handleSettingChange("design", ["modal", "modal_input_layout"], type)}
					>

						<div className="label-title">
							{type === 'stack'
								? 'Label Top'
								: type === 'inline'
								? 'Label Inline'
								: type === 'floating'
								? 'Floating Label'
								: 'Placeholder Only'}
						</div>

						{type === 'stack' && (
							<div className="preview preview-stack">
								<label>
									{settings.design.icon.icon_position === 'with-label' && <Icon icon={envelope} className="email-icon label-icon" />}
									Email Address
								</label>
								<div className="input-wrap">
									{settings.design.icon.icon_position === 'inside-input' && <Icon icon={envelope} className="email-icon input-icon" />}
									<input type="email" placeholder="Enter your email" readOnly />
								</div>
							</div>
						)}

						{type === 'inline' && (
							<div className="preview preview-inline">
								<label>
									Email:
								</label>
								<div className="input-wrap">
									{settings.design.icon.icon_position === 'inside-input' && <Icon icon={envelope} className="email-icon input-icon" />}
									<input type="email" placeholder="you@example.com" readOnly />
								</div>
							</div>
						)}

						{type === 'floating' && (
							<div className="preview preview-floating">
								<div className="input-wrap">
									{settings.design.icon.icon_position === 'inside-input' && (
										<Icon icon={envelope} className="email-icon input-icon" />
									)}
									<input
										type="email"
										placeholder=" "
										className={`floating-input ${floatingFocused ? 'force-float' : ''}`}
										readOnly
										onFocus={() => setFloatingFocused(false)}
									/>
									<label className="floating-label">Email Address</label>
								</div>
							</div>
						)}

						{type === 'placehold' && (
							<div className="preview preview-placehold">
								<div className={`input-wrap placehold-input ${floatingFocusedplace ? 'focused' : ''}`}>
									{settings.design.icon.icon_position === 'inside-input' && (
										<Icon icon={envelope} className="email-icon input-icon" />
									)}
									<input
										type="email"
										placeholder=" "
										className="floating-input"
										readOnly
										onFocus={() => setFloatingFocusedplace(true)}
										onBlur={() => setFloatingFocusedplace(false)}
									/>
									<label className="placehold-label">Enter your email</label>
								</div>
							</div>
						)}

					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="settings-card">	
			<div className="settings-label-with-deisgn"> 
				<h2 className="section-title">
					<i className="dashicons dashicons-art"></i>
					{__("Design Settings", "th-login")}
				</h2>

				<div className="custom-tabs">
					{tabdeisgn.map((tab) => (
						<button
							key={tab.key}
							className={`custom-tab-button ${deisgnpreview === tab.key ? "active" : ""}`}
							onClick={() => setdeisgnpreview(tab.key)}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{deisgnpreview === 'preview' && (
				<div className="preview-switcher">
					{renderTabs()}
				</div>
			)}
			
			<div className="design-editor-layout">
				<div className={`settings-panel ${deisgnpreview === 'design' ? 'disabled-panel' : ''}`}>
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
								<AccordionSection title={__("layout", "th-login")} defaultOpen={false} className='deisgn-layout-adjust'>
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
								</AccordionSection>

								<BackgroundSettingsPanel
									title={__("Foreground", "th-login")}
									background={settings.design.modal.modal_background}
									path={["modal", "modal_background"]}
									handleSettingChange={handleSettingChange}
									blur={true}
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

								<AccordionSection title={__("Logo", "th-login")} defaultOpen={false}>
								<div className="th-heading-settings">
									<div className="th-setting-row">
									<label className="th-setting-label">{__("Image URL", "th-login")}</label>
									<TextControl
										value={settings.design.logo.url}
										onChange={(value) =>
										handleSettingChange("design", ["logo", "url"], value)
										}
									/>
									</div>

									<div className="th-setting-row">
									<label className="th-setting-label">{__("Size", "th-login")}</label>
									<input
										type="number"
										className="th-number-input"
										value={parseInt(settings.design.logo.size)}
										onChange={(e) =>
										handleSettingChange("design", ["logo", "size"], `${e.target.value}px`)
										}
										min={1}
									/>
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
											<label className="th-setting-label">{__("Active Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.Input.activecolor}
												onChange={(e) =>
													handleSettingChange("design", ["Input", "activecolor"], e.target.value)
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

										<BackgroundSettingsPanel
											title={__("Background", "th-login")}
											background={settings.design.Input.background}
											path={["Input", "background"]}
											handleSettingChange={handleSettingChange}
											blur={false}
											onlycolor={true}
										/>
									</div>

								</AccordionSection>

								<AccordionSection title={__("Terms and Condition", "th-login")} defaultOpen={false}>
									<div className="th-heading-settings">
										<div className="th-setting-row">
											<label className="th-setting-label">{__("Text Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.term.color}
												onChange={(e) =>
												handleSettingChange("design", ["term", "color"], e.target.value)
												}
											/>
										</div>

										<div className="th-setting-row">
											<label className="th-setting-label">{__("Link Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.term.link}
												onChange={(e) =>
												handleSettingChange("design", ["term", "link"], e.target.value)
												}
											/>
										</div>

										<div className="th-setting-row">
											<label className="th-setting-label">{__("Font Size", "th-login")}</label>
											<input
												type="number"
												className="th-number-input"
												value={parseInt(settings.design.term.typography.size)}
												onChange={(e) =>
												handleSettingChange("design", ["term", "typography", "size"], `${e.target.value}px`)
												}
												min={1}
											/>
											</div>

											<div className="th-setting-row">
											<div className="th-select-wrapper modern-sleect-heaidng">
												<CustomSelectControl
												label={__("Font Weight", "th-login")}
												value={settings.design.term.typography.fontWeight}
												onChange={(value) =>
													handleSettingChange("design", ["term", "typography", "fontWeight"], value)
												}
												options={fontWeightOptions}
												/>
											</div>
										</div>
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

										{/* <div className="th-setting-row">
											<label className="th-setting-label">{__("Checkbox Color", "th-login")}</label>
											<input
												type="color"
												className="th-color-input"
												value={settings.design.rememberme.checkboxbackground}
												onChange={(e) =>
												handleSettingChange("design", ["rememberme", "checkboxbackground"], e.target.value)
												}
											/>
										</div> */}

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

										<div className="th-setting-row">
											<CustomSelectControl
												label={__("Icon Position", "th-login")}
												value={settings.design.icon.icon_position}
												onChange={(value) =>
													handleSettingChange("design", ["icon", "icon_position"], value)
												}
												options={[
													{ label: __("With Label", "th-login"), value: "with-label" },
													{ label: __("Inside Input", "th-login"), value: "inside-input" },
												]}
												className="modrn-size-fixer-167"	
											/>
										</div>

									</div>

								</AccordionSection>
							</>
						)}

						{insidetab === 'header' && (
							<>

								{/* Add Header Button (Submit) Settings */}
								<AccordionSection title={__("Login/Registration Button", "th-login")} defaultOpen={false}>

									<div className="th-setting-row">
										<label className="th-setting-label">{__("Show Buttons", "th-login")}</label>
										<ToggleControl
											checked={settings.design.header.showButtons}
											onChange={(value) =>
												handleSettingChange("design", ["header", "showButtons"], value)
											}
										/>
									</div>

									{settings.design.header.showButtons && (
										<>

											<div className="th-setting-row th-setting-row-text">
												<label className="th-setting-label">{__("Login Button Text", "th-login")}</label>
												<input
													type="text"
													className="th-text-input"
													value={settings.design.header.loginText}
													onChange={(e) =>
														handleSettingChange("design", ["header", "loginText"], e.target.value)
													}
												/>
											</div>

											<div className="th-setting-row th-setting-row-text">
												<label className="th-setting-label">{__("Registration Button Text", "th-login")}</label>
												<input
													type="text"
													className="th-text-input"
													value={settings.design.header.registerText}
													onChange={(e) =>
														handleSettingChange("design", ["header", "registerText"], e.target.value)
													}
												/>
											</div>

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

												<BackgroundSettingsPanel
													title={__("Background", "th-login")}
													background={settings.design.header.button.background}
													path={["header", "button", "background"]}
													handleSettingChange={handleSettingChange}
													blur={false}
												/>

												<BackgroundSettingsPanel
													title={__("Hover Background", "th-login")}
													background={settings.design.header.button.hoverbackground}
													path={["header", "button", "hoverbackground"]}
													handleSettingChange={handleSettingChange}
													blur={false}
												/>
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
										
										</>
									)}

								</AccordionSection>

								<AccordionSection title={__("Submit Button", "th-login")} defaultOpen={false}>
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

								<BackgroundSettingsPanel
										title={__("Background", "th-login")}
										background={settings.design.button.background}
										path={["button", "background"]}
										handleSettingChange={handleSettingChange}
										blur={false}
									/>


									<BackgroundSettingsPanel
										title={__("Hover Background", "th-login")}
										background={settings.design.button.hoverbackground}
										path={["button", "hoverbackground"]}
										handleSettingChange={handleSettingChange}
										blur={false}
									/>

								
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

								<BackgroundSettingsPanel
										title={__("Background", "th-login")}
										background={settings.design.header.cancel_button.background}
										path={["header", "cancel_button", "background"]}
										handleSettingChange={handleSettingChange}
										blur={false}
									/>

									<BackgroundSettingsPanel
										title={__("Hover Background", "th-login")}
										background={settings.design.header.cancel_button.hoverbackground}
										path={["header", "cancel_button", "hoverbackground"]}
										handleSettingChange={handleSettingChange}
										blur={false}
									/>

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

							</>
						)}
					</div>
						
				</div>

				<div className="preview-panel">
					<div className={`th-preview-container layout-${settings.general.display_mode} layout-from-type-${activeForm}`}>

						{deisgnpreview === 'design' ? (
							<>
								{renderDesignOptions()}
							</>
						):(
							<>
								{renderFormPreview()}
							</>
						)}
						
					</div>
				</div>
			</div>

		</div>
	);
};

export default DesignEditor;