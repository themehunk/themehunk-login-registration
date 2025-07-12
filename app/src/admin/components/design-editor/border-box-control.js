import { TextControl, Button } from '@wordpress/components';
import { useState } from 'react';
import { __ } from '@wordpress/i18n';

export const BorderBoxControl = ({
  label,
  values = { top: 0, right: 0, bottom: 0, left: 0 },
  onChange,
  min = 0,
  max = 100,
}) => {
  const [syncAll, setSyncAll] = useState(false);

  const handleChange = (side, value) => {
    let cleanValue = parseInt(value, 10) || 0;
    cleanValue = Math.max(min, Math.min(max, cleanValue));

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

  const toggleSync = () => {
    const newSyncState = !syncAll;
    setSyncAll(newSyncState);
    
    if (newSyncState) {
      onChange({
        top: values.top || 0,
        right: values.top || 0,
        bottom: values.top || 0,
        left: values.top || 0,
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
            label={__('Top', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.top}
            onChange={(val) => handleChange('top', val)}
          />
        </div>

        <div className="components-border-box-control__input-container">
          <TextControl
            label={__('Right', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.right}
            onChange={(val) => handleChange('right', val)}
          />
        </div>

        <div className="components-border-box-control__input-container">
          <TextControl
            label={__('Bottom', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.bottom}
            onChange={(val) => handleChange('bottom', val)}
          />
        </div>

        <div className="components-border-box-control__input-container">
          <TextControl
            label={__('Left', 'th-login')}
            type="number"
            min={min}
            max={max}
            value={values.left}
            onChange={(val) => handleChange('left', val)}
          />
        </div>
      </div>

      
    </div>
  );
};