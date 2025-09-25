import { TextControl, Button } from '@wordpress/components';
import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

export const BorderRadiusControl = ({
  label,
  values = { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
  onChange,
  min = 0,
  max = 100,
}) => {
  const [syncAll, setSyncAll] = useState(false);

  // Auto-enable sync if all values match on mount
  useEffect(() => {
    const allSame =
      values.topLeft === values.topRight &&
      values.topRight === values.bottomRight &&
      values.bottomRight === values.bottomLeft;
    if (allSame) {
      setSyncAll(true);
    }
  }, []);

  const handleChange = (corner, value) => {
  const clean = value === '' ? '' : Math.max(min, Math.min(max, parseInt(value, 10) || 0));

  if (syncAll) {
    onChange({
      topLeft: clean,
      topRight: clean,
      bottomRight: clean,
      bottomLeft: clean,
    });
  } else {
    onChange({
      ...values,
      [corner]: clean,
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

  const corners = [
    { key: 'topLeft', label: __('Top Left', 'themehunk-login-registration') },
    { key: 'topRight', label: __('Top Right', 'themehunk-login-registration') },
    { key: 'bottomRight', label: __('Bottom Right', 'themehunk-login-registration') },
    { key: 'bottomLeft', label: __('Bottom Left', 'themehunk-login-registration') },
  ];

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
            label={__('Toggle sync', 'themehunk-login-registration')}
            showTooltip
          />
        </div>
      )}

      <div className="components-border-box-control__input-wrapper">
        {corners.map(({ key, label }) => (
          <div key={key} className="components-border-box-control__input-container">
            <TextControl
              __next40pxDefaultSize={true}
              __nextHasNoMarginBottom={true}
              label={label}
              type="number"
              min={min}
              max={max}
             value={values[key] === 0 ? '0' : values[key] || ''}

              onChange={(val) => handleChange(key, val)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
