import { TextControl, Button } from '@wordpress/components';
import { useState } from 'react';
import { __ } from '@wordpress/i18n';

export const BorderRadiusControl = ({
  label,
  values = { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
  onChange,
  min = 0,
  max = 100,
}) => {
  const [syncAll, setSyncAll] = useState(false);

  const handleChange = (corner, value) => {
    let cleanValue = parseInt(value, 10) || 0;
    cleanValue = Math.max(min, Math.min(max, cleanValue));

    if (syncAll) {
      onChange({
        topLeft: cleanValue,
        topRight: cleanValue,
        bottomRight: cleanValue,
        bottomLeft: cleanValue,
      });
    } else {
      onChange({
        ...values,
        [corner]: cleanValue,
      });
    }
  };

  const toggleSync = () => {
    const newSyncState = !syncAll;
    setSyncAll(newSyncState);
    
    if (newSyncState) {
      onChange({
        topLeft: values.topLeft || 0,
        topRight: values.topLeft || 0,
        bottomRight: values.topLeft || 0,
        bottomLeft: values.topLeft || 0,
      });
    }
  };

  return (
    <div className="components-border-box-control">
      {label && (
        <div className="components-border-box-control__header">
          <span className="components-border-box-control__label">{label}</span>
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
      )}

      <div className="components-border-box-control__input-wrapper">
        <div className="components-border-box-control__input-container">
          <TextControl
          __next40pxDefaultSize={true}
          __nextHasNoMarginBottom={true}
            label={__('Top Left', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.topLeft}
            onChange={(val) => handleChange('topLeft', val)}
          />
        </div>

        <div className="components-border-box-control__input-container">
          <TextControl
          __next40pxDefaultSize={true}
          __nextHasNoMarginBottom={true}
            label={__('Top Right', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.topRight}
            onChange={(val) => handleChange('topRight', val)}
          />
        </div>

        <div className="components-border-box-control__input-container">
          <TextControl
          __next40pxDefaultSize={true}
          __nextHasNoMarginBottom={true}
            label={__('Bottom Right', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.bottomRight}
            onChange={(val) => handleChange('bottomRight', val)}
          />
        </div>

        <div className="components-border-box-control__input-container">
          <TextControl
          __next40pxDefaultSize={true}
          __nextHasNoMarginBottom={true}
            label={__('Bottom Left', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.bottomLeft}
            onChange={(val) => handleChange('bottomLeft', val)}
          />
        </div>
      </div>
    </div>
  );
};


