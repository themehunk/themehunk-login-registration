import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

const ForegroundSettingsPanel = ({ foreground, path, handleSettingChange }) => {
	return (

		<div className="thlogin-panel">
				<RangeControl
					label={<span className="thlogin-range-label">{__('Blur', 'th-login')}</span>}
					value={parseInt(foreground.blur)}
					min={0}
					max={20}
					onChange={(value) => handleSettingChange("design", [...path, "blur"], `${value}px`)}
				/>

				<RangeControl
					label={<span className="thlogin-range-label">{__('Brightness', 'th-login')}</span>}
					value={parseInt(foreground.brightness)}
					min={50}
					max={150}
					onChange={(value) => handleSettingChange("design",[...path, "brightness"], `${value}%`)}
				/>

				<RangeControl
					label={<span className="thlogin-range-label">{__('Contrast', 'th-login')}</span>}
					value={parseInt(foreground.contrast)}
					min={50}
					max={200}
					onChange={(value) => handleSettingChange("design",[...path, "contrast"], `${value}%`)}
				/>
		
		</div>
	);
};

export default ForegroundSettingsPanel;
