import { __ } from "@wordpress/i18n";
import { ColorPicker } from "@wordpress/components";
import AccordionSection from "./accordion-section";
import { BorderBoxControl } from "./border-box-control";
import { BorderRadiusControl } from "./border-radius-control";
import { CustomSelectControl } from "../custom-select-control";

const BorderSettingsPanel = ({ title, border = {}, path = [], handleSettingChange }) => {
  const width = border.width || {};
  const style = border.style || "solid";
  const color = border.color || "#000000";
  const radius = border.radius || {};

  return (
    <>
      <AccordionSection title={title} defaultOpen={false}>
        <div className="thlogin-border-controls">
          <BorderBoxControl
            label={__("Border Width", "th-login")}
            values={width}
            onChange={(newVal) =>
              handleSettingChange("design", [...path, "width"], newVal)
            }
            min={0}
            max={20}
          />
        </div>

        <CustomSelectControl
          label={__("Style", "th-login")}
          value={style}
          options={[
            { label: __("Solid", "th-login"), value: "solid" },
            { label: __("Dashed", "th-login"), value: "dashed" },
            { label: __("Dotted", "th-login"), value: "dotted" },
            { label: __("Double", "th-login"), value: "double" },
            { label: __("None", "th-login"), value: "none" },
          ]}
          className="modern-border-select-control"
          onChange={(val) =>
            handleSettingChange("design", [...path, "style"], val)
          }
        />

        <div className="background-color-picker">
          <ColorPicker
            color={color}
            onChangeComplete={(value) => {
              handleSettingChange("design", [...path, "color"], value.hex);
            }}
            disableAlpha={false}
          />
        </div>
      </AccordionSection>


      <AccordionSection title={__('Radius', 'th-login')} defaultOpen={false}>
        <div className="thlogin-border-controls">
          <BorderRadiusControl
            label={__("Border Radius", "th-login")}
            values={radius}
            onChange={(newVal) =>
              handleSettingChange("design", [...path, "radius"], newVal)
            }
            min={0}
            max={20}
          />
        </div>
      </AccordionSection>
    </>
  );
};

export default BorderSettingsPanel;