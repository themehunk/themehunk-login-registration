import { __ } from "@wordpress/i18n";
import { ColorPicker, GradientPicker, TextControl, RangeControl } from "@wordpress/components";
import { CustomSelectControl } from "../custom-select-control";
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import AccordionSection from "./accordion-section";

const BackgroundSettingsPanel = ({ title, background = {}, path = [], handleSettingChange }) => {
	const type = background.type || "color";
	const color = background.color || "#ffffff";
	const gradient = background.gradient || "";
	const image = background.image || {};
	const imageURL = image.url || "";
	const position = image.position || "center center";
	const size = image.size || "cover";
	const repeat = image.repeat || "no-repeat";
	const opacity = background.opacity ?? 1;

	return (
		<AccordionSection title={title} defaultOpen={false}>
			<ToggleGroupControl
				__nextHasNoMarginBottom={true}
				__next40pxDefaultSize = {true}
				label={__("Background Type", "thlogin")}
				value={type}
				isBlock
				onChange={(newType) => {
					handleSettingChange("design", [...path, "type"], newType);
				}}
			>
				<ToggleGroupControlOption value="color" label={__("Color", "thlogin")} />
				<ToggleGroupControlOption value="gradient" label={__("Gradient", "thlogin")} />
				<ToggleGroupControlOption value="image" label={__("Image", "thlogin")} />
			</ToggleGroupControl>

			{type === "color" && (
				<div className="background-color-picker">
					<ColorPicker
						color={color}
						onChangeComplete={(value) => {
							handleSettingChange("design", [...path, "color"], value.hex);
						}}
						disableAlpha={false}
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
								name: __("Default", "thlogin"),
								gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
								slug: "default",
							},
							{
								name: __("Ocean Blue", "thlogin"),
								gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)",
								slug: "ocean-blue",
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
							label={__("Image URL", "thlogin")}
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
									label={__("Position", "thlogin")}
									value={position}
									options={[
										{ label: __("Top Left", "thlogin"), value: "top left" },
										{ label: __("Top Center", "thlogin"), value: "top center" },
										{ label: __("Top Right", "thlogin"), value: "top right" },
										{ label: __("Center Left", "thlogin"), value: "center left" },
										{ label: __("Center Center", "thlogin"), value: "center center" },
										{ label: __("Center Right", "thlogin"), value: "center right" },
										{ label: __("Bottom Left", "thlogin"), value: "bottom left" },
										{ label: __("Bottom Center", "thlogin"), value: "bottom center" },
										{ label: __("Bottom Right", "thlogin"), value: "bottom right" },
									]}
									onChange={(val) =>
										handleSettingChange("design", [...path, "image", "position"], val)
									}
								/>

								<CustomSelectControl
									label={__("Size", "thlogin")}
									value={size}
									options={[
										{ label: __("Cover", "thlogin"), value: "cover" },
										{ label: __("Contain", "thlogin"), value: "contain" },
										{ label: __("Auto", "thlogin"), value: "auto" },
									]}
									onChange={(val) =>
										handleSettingChange("design", [...path, "image", "size"], val)
									}
								/>

								<CustomSelectControl
									label={__("Repeat", "thlogin")}
									value={repeat}
									options={[
										{ label: __("No Repeat", "thlogin"), value: "no-repeat" },
										{ label: __("Repeat", "thlogin"), value: "repeat" },
										{ label: __("Repeat X", "thlogin"), value: "repeat-x" },
										{ label: __("Repeat Y", "thlogin"), value: "repeat-y" },
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

			{/* <div className="background-opacity-slider" style={{ marginTop: "16px" }}>
				<RangeControl
					label={__("Opacity", "thlogin")}
					value={opacity}
					onChange={(val) => {
						handleSettingChange("design", [...path, "opacity"], val);
					}}
					min={0}
					max={1}
					step={0.1}
					withInputField
					__next40pxDefaultSize={true}
					__nextHasNoMarginBottom={true}
				/>
			</div> */}
		</AccordionSection>
	);
};

export default BackgroundSettingsPanel;
