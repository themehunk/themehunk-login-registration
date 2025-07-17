import { TextControl, Button } from '@wordpress/components';
import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

export const BorderBoxControl = ({
  label,
  values = { top: 0, right: 0, bottom: 0, left: 0 },
  onChange,
  min = 0,
  max = 100,
}) => {
  const [syncAll, setSyncAll] = useState(false);

  //  Auto-enable sync if all values are the same initially
  useEffect(() => {
    const allSame =
      values.top === values.right &&
      values.right === values.bottom &&
      values.bottom === values.left;
    if (allSame) {
      setSyncAll(true);
    }
  }, []); // run once on mount

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
      // Use top as master when syncing
      onChange({
        top: values.top || 0,
        right: values.top || 0,
        bottom: values.top || 0,
        left: values.top || 0,
      });
    }
  };

  return (
    <>
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
        {['top', 'right', 'bottom', 'left'].map((side) => (
          <div
            key={side}
            className="components-border-box-control__input-container"
          >
            <TextControl
              __next40pxDefaultSize={true}
              __nextHasNoMarginBottom={true}
              label={__(side.charAt(0).toUpperCase() + side.slice(1), 'th-login')}
              type="number"
              min={min}
              max={max}
              value={values[side]}
              onChange={(val) => handleChange(side, val)}
            />
          </div>
        ))}
      </div>
    </>
  );
};