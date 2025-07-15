import { TextControl, Button } from '@wordpress/components';
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import AccordionSection  from './accordion-section';

export const PaddingSettingsPanel = ({
  title,
  padding = { top: 0, right: 0, bottom: 0, left: 0 },
  path,
  handleSettingChange,
  min = 0,
  max = 100,
}) => {
  const [syncAll, setSyncAll] = useState(false);

  const handlePaddingChange = (side, value) => {
    let cleanValue = parseInt(value, 10) || 0;
    cleanValue = Math.max(min, Math.min(max, cleanValue));

    if (syncAll) {
      const newPadding = {
        top: cleanValue,
        right: cleanValue,
        bottom: cleanValue,
        left: cleanValue
      };
      handleSettingChange('design', [...path], newPadding);
    } else {
      handleSettingChange('design', [...path, side], cleanValue);
    }
  };

  const toggleSync = () => {
    const newSyncState = !syncAll;
    setSyncAll(newSyncState);
    
    if (newSyncState) {
      // When enabling sync, set all sides to top value
      handleSettingChange('design', [...path], {
        top: padding.top || 0,
        right: padding.top || 0,
        bottom: padding.top || 0,
        left: padding.top || 0
      });
    }
  };

  return (
    <AccordionSection title={title} defaultOpen={false}>

        <div className="components-border-box-control__header">
          <span className="components-border-box-control__label">
            {__('Padding Settings', 'th-login')}
          </span>
          <Button
            className="components-border-box-control__sync-button"
            isSmall
            icon={syncAll ? 'admin-links' : 'editor-unlink'}
            onClick={toggleSync}
            aria-pressed={syncAll}
            label={__('Toggle sync', 'th-login')}
            showTooltip
          />
        </div>

        <div className="components-border-box-control__input-wrapper">
          <div className="components-border-box-control__input-container">
            <TextControl
            __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
              label={__('Top', 'th-login')}
              type="number"
              min={min}
              max={max}
              value={padding.top || 0}
              onChange={(val) => handlePaddingChange('top', val)}
            />
          </div>

          <div className="components-border-box-control__input-container">
            <TextControl
            __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
              label={__('Right', 'th-login')}
              type="number"
              min={min}
              max={max}
              value={padding.right || 0}
              onChange={(val) => handlePaddingChange('right', val)}
            />
          </div>

          <div className="components-border-box-control__input-container">
            <TextControl
            __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
              label={__('Bottom', 'th-login')}
              type="number"
              min={min}
              max={max}
              value={padding.bottom || 0}
              onChange={(val) => handlePaddingChange('bottom', val)}
            />
          </div>

          <div className="components-border-box-control__input-container">
            <TextControl
            __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
              label={__('Left', 'th-login')}
              type="number"
              min={min}
              max={max}
              value={padding.left || 0}
              onChange={(val) => handlePaddingChange('left', val)}
            />
          </div>
        </div>

    </AccordionSection>
  );
};