import { __ } from "@wordpress/i18n";
import { Button, TextControl, ToggleControl } from "@wordpress/components";
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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import classnames from "classnames";
import { THL_ICONS } from "./icons";
import { CustomSelectControl } from "./custom-select-control";

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
  predefined: false,
});

const ToastNotice = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="thl-toast-notice">{message}</div>;
};

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
      {field.predefined ? (
        <span className="field-action-icon lock" title="Predefined field (locked)">
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
  const [toastMessage, setToastMessage] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fields = (settings.form_fields?.[activeTab] || []).filter((f) => !f.hidden);

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
    setToastMessage(__("Field added successfully!", "th-login"));
  };

  const handleDeleteField = (fieldId) => {
    const filtered = fields.filter((f) => f.id !== fieldId);
    updateFields(filtered);
    if (selectedField?.id === fieldId) setSelectedField(null);
    setToastMessage(__("Field deleted", "th-login"));
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

  useEffect(() => {
    const firstVisible = fields[0] || null;
    setSelectedField(firstVisible);
  }, []);

  
    const tabs = [
        { key: "general", label: __("Login", "th-login") },
        { key: "redirect", label: __("Register", "th-login") },
        { key: "shortcodes", label: __("Forgot Password", "th-login") },
    ];
    
    const renderTabs = () => (
      <div className="custom-tabs">
      {Object.keys(TAB_KEYS).map((key) => (
          <button
            key={key}
            className={classnames("custom-tab-button", {
                active: key === activeTab,
            })}
          onClick={() => {
            setActiveTab(key);
            setSelectedField(
              (settings.form_fields?.[key] || []).find((f) => !f.hidden) || null
            );
          }}
          >
          {TAB_KEYS[key]}
          </button>
      ))}
      </div>
  );

  return (
       <div className="settings-card">
          <h2 className="section-title">
              <i className="dashicons dashicons-feedback"></i>
              {__("Form feild Settings", "th-login")}
          </h2>

      <div className="thl-form-fields-settings">
      
        <div className="thl-left-panel">

          {renderTabs()}

          <div className="fields-list scrollable">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
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
                      <div
                        key={field.id}
                        className={classnames("sortable-field-wrapper", {
                          selected: selectedField?.id === field.id, // ✅ Highlight selected field
                        })}
                      >
                        <SortableFieldItem
                          key={field.id}
                          field={field}
                          onClick={setSelectedField}
                          onDelete={handleDeleteField}
                        />
                      </div>
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
                                              __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                label={__("Label", "th-login")}
                value={selectedField.label}
                onChange={(val) => handleFieldChange("label", val)}
              />

              <TextControl
                                              __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                label={__("Placeholder", "th-login")}
                value={selectedField.placeholder || ""}
                onChange={(val) => handleFieldChange("placeholder", val)}
              />

              {selectedField.type === "checkbox" && selectedField.id === "terms_and_conditions" && (
                <TextControl
                                                __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                  label={__("Terms & Conditions Link", "th-login")}
                  placeholder="https://example.com/terms"
                  value={selectedField.link || ""}
                  onChange={(val) => handleFieldChange("link", val)}
                />
              )}

              <TextControl
                                              __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                label={__("Error Message", "th-login")}
                value={selectedField.error_message || ""}
                onChange={(val) => handleFieldChange("error_message", val)}
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
                    dangerouslySetInnerHTML={{
                      __html: THL_ICONS[selectedField.icon] || "",
                    }}
                  />
                  <span className="icon-name">{selectedField.icon}</span>
                  <span className="icon-caret">▾</span>
                </div>

                {iconPickerOpen && (
                  <div className="icon-picker-dropdown">
                    {Object.keys(THL_ICONS).map((key) => (
                      <div
                        key={key}
                        className={`icon-option ${
                          selectedField.icon === key ? "active" : ""
                        }`}
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

              {!selectedField.predefined && (
                <>
                  <TextControl
                                                  __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                    label={__("Name", "th-login")}
                    value={selectedField.name || ""}
                    onChange={(val) => handleFieldChange("name", val)}
                  />
                  <TextControl
                                                  __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                    label={__("ID", "th-login")}
                    value={selectedField.id || ""}
                    onChange={(val) => handleFieldChange("id", val)}
                  />
                  <CustomSelectControl
                    label={__("Field Type", "th-login")}
                    value={selectedField.type || "text"}
                    options={[
                      { label: "Text", value: "text" },
                      { label: "Email", value: "email" },
                      { label: "Checkbox", value: "checkbox" },
                    ]}
                    onChange={(val) => handleFieldChange("type", val)}
                  />
                  <div className="thlogin-toggle-one-line">
                    <ToggleControl
                    __nextHasNoMarginBottom={true}
                      label={__("Required", "th-login")}
                      checked={selectedField.required}
                      onChange={(val) => handleFieldChange("required", val)}
                    />
                    <ToggleControl
                    __nextHasNoMarginBottom={true}
                      label={__("Show Field", "th-login")}
                      checked={selectedField.show !== false}
                      onChange={(val) => handleFieldChange("show", val)}
                    />
                  </div>
                </>
              )}

              {activeTab === "register" &&
                selectedField.type === "password" &&
                selectedField.predefined &&
                selectedField.id !== "confirm_password" && (
                  <>
                    <TextControl
                                                    __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                      label={__("Minimum Length", "th-login")}
                      type="number"
                      value={selectedField.minInput || ""}
                      onChange={(val) => handleFieldChange("minInput", parseInt(val))}
                    />
                    <TextControl
                                                    __next40pxDefaultSize = {true}
                                  __nextHasNoMarginBottom={true}
                      label={__("Maximum Length", "th-login")}
                      type="number"
                      value={selectedField.maxInput || ""}
                      onChange={(val) => handleFieldChange("maxInput", parseInt(val))}
                    />
                    <div className="check-group">
                      <ToggleControl
                      __nextHasNoMarginBottom={true}
                        label={__("Require Letters (A-Z)", "th-login")}
                        checked={selectedField.check?.text || false}
                        onChange={() => handleCheckToggle("text")}
                      />
                      <ToggleControl
                      __nextHasNoMarginBottom={true}
                        label={__("Require Numbers (0-9)", "th-login")}
                        checked={selectedField.check?.number || false}
                        onChange={() => handleCheckToggle("number")}
                      />
                      <ToggleControl
                      __nextHasNoMarginBottom={true}
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

        {toastMessage && (
          <ToastNotice message={toastMessage} onClose={() => setToastMessage("")} />
        )}

      </div>
    </div>
  );
};

export default FormFieldsSettings;
