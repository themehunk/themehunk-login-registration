import { __ } from "@wordpress/i18n";
import { ColorPalette, GradientPicker, TextControl, RangeControl } from "@wordpress/components";
import { CustomSelectControl } from "../custom-select-control";
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import AccordionSection from "./accordion-section";

const BackgroundSettingsPanel = ({ title, background = {}, path = [], handleSettingChange, blur=false ,onlycolor= false}) => {
	const type = background.type || "color";
	const color = background.color || "#ffffff";
	const gradient = background.gradient || "";
	const image = background.image || {};
	const imageURL = image.url || "";
	const position = image.position || "center center";
	const size = image.size || "cover";
	const repeat = image.repeat || "no-repeat";
	const filter  = background?.filter;

	return (
		<AccordionSection title={title} defaultOpen={false}>

			{!onlycolor ? (
				<>
					<ToggleGroupControl
						__nextHasNoMarginBottom={true}
						__next40pxDefaultSize = {true}
						label={__("Background Type", "themehunk-login-registration")}
						value={type}
						isBlock
						onChange={(newType) => {
							handleSettingChange("design", [...path, "type"], newType);
						}}
					>
						<ToggleGroupControlOption value="color" label={__("Color", "themehunk-login-registration")} />
						<ToggleGroupControlOption value="gradient" label={__("Gradient", "themehunk-login-registration")} />
						<ToggleGroupControlOption value="image" label={__("Image", "themehunk-login-registration")} />
					</ToggleGroupControl>
			
					{type === "color" && (
						<div className="background-color-picker">

							<ColorPalette
								value={color}
								onChange={(value) => {
									handleSettingChange("design", [...path, "color"], value);
								}}
								colors={[
									{ color: '#f00', name: 'Red' },
									{ color: '#fff', name: 'White' },
									{ color: '#00f', name: 'Blue' },
									{ color: '#000', name: 'Black' },
									{ color: '#ff9800', name: 'Orange' },
									{ color: '#4caf50', name: 'Green' },
									{ color: '#9c27b0', name: 'Purple' },
									{ color: '#03a9f4', name: 'Sky Blue' },
									{ color: 'transparent', name: 'Transparent' }
								]}

								enableAlpha={true}
							/>
						</div>
					)}

					{type === "gradient" && (
						<div className="background-gradient-picker">
							<GradientPicker
								value={gradient}
								onChange={(value) => handleSettingChange("design", [...path, "gradient"], value)}
								gradients={[
									{
										name: __("Default", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
										slug: "default",
									},
									{
										name: __("Ocean Blue", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)",
										slug: "ocean-blue",
									},
									{
										name: __("Sunset", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#ff7e5f 0%,#feb47b 100%)",
										slug: "sunset",
									},
									{
										name: __("Cool Sky", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#2980b9 0%,#6dd5fa 100%)",
										slug: "cool-sky",
									},
									{
										name: __("Peach", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#ed4264 0%,#ffedbc 100%)",
										slug: "peach",
									},
									{
										name: __("Purple Dream", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)",
										slug: "purple-dream",
									},
									{
										name: __("Mango", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#ffe259 0%,#ffa751 100%)",
										slug: "mango",
									},
									{
										name: __("Frost", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#000428 0%,#004e92 100%)",
										slug: "frost",
									},
									{
										name: __("Cherry Blossom", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#ff9a9e 0%,#fad0c4 99%,#fad0c4 100%)",
										slug: "cherry-blossom",
									},
									{
										name: __("Lush Green", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#56ab2f 0%,#a8e063 100%)",
										slug: "lush-green",
									},
									{
										name: __("Deep Space", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#000000 0%,#434343 100%)",
										slug: "deep-space",
									},
									{
										name: __("Rose Gold", "themehunk-login-registration"),
										gradient: "linear-gradient(135deg,#b76e79 0%,#ffe6e6 100%)",
										slug: "rose-gold",
									},
								]}
							/>
						</div>
					)}

					{type === "image" && (
						<>
							<div className="image-url-input">
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom={true}
									label={__("Image URL", "themehunk-login-registration")}
									value={imageURL}
									onChange={(val) =>
										handleSettingChange("design", [...path, "image", "url"], val)
									}
									placeholder="https://example.com/image.jpg"
								/>
							</div>

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

									<div className="thlogin-media-image">
										<CustomSelectControl
											label={__("Position", "themehunk-login-registration")}
											value={position}
											options={[
												{ label: __("Top Left", "themehunk-login-registration"), value: "top left" },
												{ label: __("Top Center", "themehunk-login-registration"), value: "top center" },
												{ label: __("Top Right", "themehunk-login-registration"), value: "top right" },
												{ label: __("Center Left", "themehunk-login-registration"), value: "center left" },
												{ label: __("Center Center", "themehunk-login-registration"), value: "center center" },
												{ label: __("Center Right", "themehunk-login-registration"), value: "center right" },
												{ label: __("Bottom Left", "themehunk-login-registration"), value: "bottom left" },
												{ label: __("Bottom Center", "themehunk-login-registration"), value: "bottom center" },
												{ label: __("Bottom Right", "themehunk-login-registration"), value: "bottom right" },
											]}
											onChange={(val) =>
												handleSettingChange("design", [...path, "image", "position"], val)
											}
										/>

										<CustomSelectControl
											label={__("Size", "themehunk-login-registration")}
											value={size}
											options={[
												{ label: __("Cover", "themehunk-login-registration"), value: "cover" },
												{ label: __("Contain", "themehunk-login-registration"), value: "contain" },
												{ label: __("Auto", "themehunk-login-registration"), value: "auto" },
											]}
											onChange={(val) =>
												handleSettingChange("design", [...path, "image", "size"], val)
											}
										/>

										<CustomSelectControl
											label={__("Repeat", "themehunk-login-registration")}
											value={repeat}
											options={[
												{ label: __("No Repeat", "themehunk-login-registration"), value: "no-repeat" },
												{ label: __("Repeat", "themehunk-login-registration"), value: "repeat" },
												{ label: __("Repeat X", "themehunk-login-registration"), value: "repeat-x" },
												{ label: __("Repeat Y", "themehunk-login-registration"), value: "repeat-y" },
											]}
											onChange={(val) =>
												handleSettingChange("design", [...path, "image", "repeat"], val)
											}
										/>
									</div>
								</>
							)}
						</>
					)}
				</>
			):(
				<div className="background-color-picker">
					<ColorPalette
						value={color}
						onChange={(value) => {
							handleSettingChange("design", [...path, "color"], value);
						}}
						colors={[
							{ color: '#f00', name: 'Red' },
							{ color: '#fff', name: 'White' },
							{ color: '#00f', name: 'Blue' },
							{ color: '#000', name: 'Black' },
							{ color: '#ff9800', name: 'Orange' },
							{ color: '#4caf50', name: 'Green' },
							{ color: '#9c27b0', name: 'Purple' },
							{ color: '#03a9f4', name: 'Sky Blue' },
							{ color: 'transparent', name: 'Transparent' }
						]}

						enableAlpha={true}
					/>
				</div>
			)}

			{blur && (

				<div className="background-opacity-slider" style={{ marginTop: "16px" }}>
					<RangeControl
						label={__("Backdrop Filter", "themehunk-login-registration")}
						value={filter}
						onChange={(val) => {
							handleSettingChange("design", [...path, "filter"], val);
						}}
						min={0}
						max={30}
						step={1}
						withInputField
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
				</div> 
			)}

		</AccordionSection>
	);
};

export default BackgroundSettingsPanel;
