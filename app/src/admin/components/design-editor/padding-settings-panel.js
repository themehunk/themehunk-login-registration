import { TextControl, Button } from '@wordpress/components';
import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import AccordionSection from './accordion-section';

export const PaddingSettingsPanel = ({
  title,
  padding = { top: 0, right: 0, bottom: 0, left: 0 },
  path,
  handleSettingChange,
  min = 0,
  max = 100,
}) => {
  const [syncAll, setSyncAll] = useState(false);

  // ✅ Auto-enable sync if all values are the same
  useEffect(() => {
    const allSame =
      padding.top === padding.right &&
      padding.right === padding.bottom &&
      padding.bottom === padding.left;

    if (allSame) {
      setSyncAll(true);
    }
  }, []); // run only on mount

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
      // When enabling sync, set all to top value
      const synced = {
        top: padding.top || 0,
        right: padding.top || 0,
        bottom: padding.top || 0,
        left: padding.top || 0
      };
      handleSettingChange('design', [...path], synced);
    }
  };

  const sides = [
    { key: 'top', label: __('Top', 'thlogin') },
    { key: 'right', label: __('Right', 'thlogin') },
    { key: 'bottom', label: __('Bottom', 'thlogin') },
    { key: 'left', label: __('Left', 'thlogin') },
  ];

  return (
    <AccordionSection title={title} defaultOpen={false}>
      <div className="components-border-box-control__header">
        <span className="components-border-box-control__label">
          {__('Padding Settings', 'thlogin')}
        </span>
        <Button
          className="components-border-box-control__sync-button"
          isSmall
          icon={syncAll ? 'admin-links' : 'editor-unlink'}
          onClick={toggleSync}
          aria-pressed={syncAll}
          label={__('Toggle sync', 'thlogin')}
          showTooltip
        />
      </div>

      <div className="components-border-box-control__input-wrapper">
        {sides.map(({ key, label }) => (
          <div key={key} className="components-border-box-control__input-container">
            <TextControl
              __next40pxDefaultSize={true}
              __nextHasNoMarginBottom={true}
              label={label}
              type="number"
              min={min}
              max={max}
              value={padding[key] || 0}
              onChange={(val) => handlePaddingChange(key, val)}
            />
          </div>
        ))}
      </div>
    </AccordionSection>
  );
};
