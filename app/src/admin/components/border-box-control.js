import { TextControl, Tooltip, IconButton } from '@wordpress/components';
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { grid } from '@wordpress/icons'; // Any icon, can change to 'fullscreen', 'block-table', etc.

export const BorderBoxControl = ({ label, values = {}, onChange }) => {
	const [syncAll, setSyncAll] = useState(false);

	const handleChange = (side, value) => {
		const cleanValue = parseInt(value) || 0;
		if (syncAll) {
			onChange({
				top: cleanValue,
				right: cleanValue,
				bottom: cleanValue,
				left: cleanValue,
			});
		} else {
			onChange({
				...values,
				[side]: cleanValue,
			});
		}
	};

	return (
		<div className="th-border-inline-box">
			{label && <label className="th-label">{label}</label>}

			<div className="th-border-row">
				<TextControl
				                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
					value={values.top ?? 0}
					type="number"
					onChange={(val) => handleChange('top', val)}
				/>
				<TextControl
				                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
					
					value={values.right ?? 0}
					type="number"
					onChange={(val) => handleChange('right', val)}
				/>
				<TextControl
				                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
					
					value={values.bottom ?? 0}
					type="number"
					onChange={(val) => handleChange('bottom', val)}
				/>
				<TextControl
				                                __next40pxDefaultSize = {true}
                                __nextHasNoMarginBottom={true}
					
					value={values.left ?? 0}
					type="number"
					onChange={(val) => handleChange('left', val)}
				/>

				<Tooltip text={__('Apply same to all sides', 'th-login')}>
					<IconButton
						icon={<Icon icon={grid} />}
						label={__('Apply to all sides', 'th-login')}
						isPressed={syncAll}
						onClick={() => setSyncAll(!syncAll)}
					/>
				</Tooltip>
			</div>
		</div>
	);
};
