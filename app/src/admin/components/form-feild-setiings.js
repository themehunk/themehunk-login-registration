import { __ } from "@wordpress/i18n";
import {
  Button,
  TextControl,
  ToggleControl,
} from "@wordpress/components";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import classnames from "classnames";
import { THL_ICONS } from './icons';
import { CustomSelectControl } from './custom-select-control';

const TAB_KEYS = {
  login: __("Login", "th-login"),
  register: __("Register", "th-login"),
  forgot_password: __("Forgot Password", "th-login"),
};

const DEFAULT_FIELD = () => ({
  id: "ff_" + Math.random().toString(36).substring(2, 9),
  label: __("New Field", "th-login"),
  placeholder: "",
  icon: "admin-users",
  required: false,
  name: "",
  type: "text",
  show: true,
});

const SortableFieldItem = ({ field, onClick, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="field-item"
      onClick={() => onClick?.(field)}
    >
      <span className="field-drag-handle" {...attributes} {...listeners}>
        <span className="dashicons dashicons-move"></span>
      </span>

      <div
        className="selected-icon"
        dangerouslySetInnerHTML={{ __html: THL_ICONS[field.icon] || "" }}
      />
      <span
        className="field-label"
        dangerouslySetInnerHTML={{ __html: field.label || field.placeholder }}
      ></span>
      {field.required ? (
        <span className="field-action-icon lock" title="Required field">
          <span className="dashicons dashicons-lock"></span>
        </span>
      ) : (
        <span
          className="field-action-icon delete"
          title="Delete field"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(field.id);
          }}
        >
          <span className="dashicons dashicons-trash"></span>
        </span>
      )}
    </div>
  );
};

const FormFieldsSettings = ({ settings, handleSettingChange }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [selectedField, setSelectedField] = useState(null);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fields = (settings.form_fields?.[activeTab] || []).filter(
    (f) => !f.hidden
  );

  const updateFields = (newFields) => {
    handleSettingChange("form_fields", [activeTab], newFields);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      const reordered = arrayMove(fields, oldIndex, newIndex);
      updateFields(reordered);
    }
  };

  const handleAddField = () => {
    const newField = DEFAULT_FIELD();
    updateFields([...fields, newField]);
  };

  const handleDeleteField = (fieldId) => {
    const filtered = fields.filter((f) => f.id !== fieldId);
    updateFields(filtered);
    if (selectedField?.id === fieldId) setSelectedField(null);
  };

  const handleFieldChange = (key, value) => {
    if (!selectedField) return;
    const updated = fields.map((f) =>
      f.id === selectedField.id ? { ...f, [key]: value } : f
    );
    updateFields(updated);
    setSelectedField((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckToggle = (key) => {
    const current = selectedField.check || {
      text: false,
      number: false,
      special_character: false,
    };
    const updated = {
      ...current,
      [key]: !current[key],
    };
    handleFieldChange("check", updated);
  };

  return (
    <div className="thl-form-fields-settings">
      <div className="thl-left-panel">
        <div className="tabs">
          {Object.keys(TAB_KEYS).map((key) => (
            <button
              key={key}
              className={classnames("tab-button", {
                active: key === activeTab,
              })}
              onClick={() => {
                setActiveTab(key);
                setSelectedField(
                  (settings.form_fields?.[key] || []).find((f) => !f.hidden) ||
                    null
                );
              }}
            >
              {TAB_KEYS[key]}
            </button>
          ))}
        </div>

        <div className="fields-list scrollable">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="fields-group">
                <h4 className="fields-group-title">
                  {TAB_KEYS[activeTab]} {__("Fields", "th-login")}
                </h4>
                {fields.length === 0 ? (
                  <p className="no-fields">{__("No fields yet.", "th-login")}</p>
                ) : (
                  fields.map((field) => (
                    <SortableFieldItem
                      key={field.id}
                      field={field}
                      onClick={setSelectedField}
                      onDelete={handleDeleteField}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="add-field-button-wrapper">
          <Button isSecondary onClick={handleAddField}>
            + {__("Add Field", "th-login")}
          </Button>
        </div>
      </div>

      <div className="thl-right-panel">
        {selectedField ? (
          <div className="field-editor">
            <h3 className="field-editor-title">
              {selectedField.label || selectedField.id}
            </h3>

            <TextControl
              label={__("Label", "th-login")}
              value={selectedField.label}
              onChange={(val) => handleFieldChange("label", val)}
            />

            <TextControl
              label={__("Placeholder", "th-login")}
              value={selectedField.placeholder || ""}
              onChange={(val) => handleFieldChange("placeholder", val)}
            />

            <TextControl
              label={__("Name", "th-login")}
              value={selectedField.name || ""}
              onChange={(val) => handleFieldChange("name", val)}
            />

            <TextControl
              label={__("ID", "th-login")}
              value={selectedField.id || ""}
              onChange={(val) => handleFieldChange("id", val)}
            />

            <CustomSelectControl
              label={__("Logic Key (Avoid Changing This)", "th-login")}
              value={selectedField.logic_key || ""}
              options={[
                { label: __("None", "th-login"), value: "" },
                { label: __("Username", "th-login"), value: "user" },
                { label: __("Email", "th-login"), value: "email" },
                { label: __("Password", "th-login"), value: "password" },
                { label: __("Confirm Password", "th-login"), value: "confirm_password" },
                { label: __("Terms & Conditions", "th-login"), value: "terms_and_conditions" },
                { label: __("Number", "th-login"), value: "number" },
                { label: __("Address", "th-login"), value: "address" },
                { label: __("First Name", "th-login"), value: "first_name" },
                { label: __("Last Name", "th-login"), value: "last_name" },
              ]}
              onChange={(val) => handleFieldChange("logic_key", val)}
            />

            <CustomSelectControl
              label={__("Field Type", "th-login")}
              value={selectedField.type || "text"}
              options={[
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Password", value: "password" },
                { label: "Checkbox", value: "checkbox" },
              ]}
              onChange={(val) => handleFieldChange("type", val)}
            />

            <div className="thl-icon-picker">
              <label className="components-base-control__label">
                {__("Choose Icon", "th-login")}
              </label>

              <div
                className="icon-picker-trigger"
                onClick={() => setIconPickerOpen((open) => !open)}
              >
                <div
                  className="selected-icon"
                  dangerouslySetInnerHTML={{ __html: THL_ICONS[selectedField.icon] || "" }}
                />
                <span className="icon-name">{selectedField.icon}</span>
                <span className="icon-caret">▾</span>
              </div>

              {iconPickerOpen && (
                <div className="icon-picker-dropdown">
                  {Object.keys(THL_ICONS).map((key) => (
                    <div
                      key={key}
                      className={`icon-option ${selectedField.icon === key ? "active" : ""}`}
                      onClick={() => {
                        handleFieldChange("icon", key);
                        setIconPickerOpen(false);
                      }}
                      title={key}
                      dangerouslySetInnerHTML={{ __html: THL_ICONS[key] }}
                    />
                  ))}
                </div>
              )}
            </div>

            <ToggleControl
              label={__("Required", "th-login")}
              checked={selectedField.required}
              onChange={(val) => handleFieldChange("required", val)}
            />

            <ToggleControl
              label={__("Show Field", "th-login")}
              checked={selectedField.show !== false}
              onChange={(val) => handleFieldChange("show", val)}
            />
        
            {(selectedField.type === "password" && selectedField.logic_key !== 'confirm_password' ) && (
              <>
  
                <TextControl
                  label={__("Minimum Length", "th-login")}
                  type="number"
                  value={selectedField.minInput || ""}
                  onChange={(val) => handleFieldChange("minInput", parseInt(val))}
                />
                <TextControl
                  label={__("Maximum Length", "th-login")}
                  type="number"
                  value={selectedField.maxInput || ""}
                  onChange={(val) => handleFieldChange("maxInput", parseInt(val))}
                />
                <div className="check-group">
                  <ToggleControl
                    label={__("Require Letters (A-Z)", "th-login")}
                    checked={selectedField.check?.text || false}
                    onChange={() => handleCheckToggle("text")}
                  />
                  <ToggleControl
                    label={__("Require Numbers (0-9)", "th-login")}
                    checked={selectedField.check?.number || false}
                    onChange={() => handleCheckToggle("number")}
                  />
                  <ToggleControl
                    label={__("Require Special Characters", "th-login")}
                    checked={selectedField.check?.special_character || false}
                    onChange={() => handleCheckToggle("special_character")}
                  />
                </div>
              </>
            )}

          </div>  
        ) : (
          <div className="placeholder">
            <p>{__("Click a field to edit its settings", "th-login")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFieldsSettings;
