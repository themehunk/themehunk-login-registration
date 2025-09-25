  import { __ } from "@wordpress/i18n";
  import { Button, TextControl, ToggleControl ,TextareaControl} from "@wordpress/components";
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
    login: __("Login", "themehunk-login-registration"),
    register: __("Register", "themehunk-login-registration"),
    forgot_password: __("Forgot Password", "themehunk-login-registration"),
  };

  const DEFAULT_FIELD = () => ({
    id: "ff_" + Math.random().toString(36).substring(2, 9),
    label: __("New Field", "themehunk-login-registration"),
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
        {field.id === 'terms_and_conditions' ? (
          <>

            <span
              className="field-label"
              dangerouslySetInnerHTML={{ __html: 'Terms & Condition' }}
            ></span>
            </>
        ):(
          <>
            <div
              className="selected-icon"
              dangerouslySetInnerHTML={{ __html: THL_ICONS[field.icon] || "" }}
            />
            <span
              className="field-label"
              dangerouslySetInnerHTML={{ __html: field.label || field.placeholder }}
            ></span>
          </>
        )}

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
    const [isSubmitFieldSelected, setIsSubmitFieldSelected] = useState(false);

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
      setSelectedField(newField);
      setToastMessage(__("Field added successfully!", "themehunk-login-registration"));
    };

    const handleDeleteField = (fieldId) => {
      const filtered = fields.filter((f) => f.id !== fieldId);
      updateFields(filtered);
      if (selectedField?.id === fieldId) setSelectedField(null);
      setToastMessage(__("Field deleted", "themehunk-login-registration"));
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
              setIsSubmitFieldSelected(false);
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

    const decodeEntities = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };


    return (
        <div className="settings-card">
            <h2 className="section-title">
                <i className="dashicons dashicons-feedback"></i>
                {__("Form feild Settings", "themehunk-login-registration")}
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
                        {TAB_KEYS[activeTab]} {__("Fields", "themehunk-login-registration")}
                      </h4>
                      {fields.length === 0 ? (
                        <p className="no-fields">{__("No fields yet.", "themehunk-login-registration")}</p>
                      ) : (
                        fields.map((field) => (
                          <div
                            key={field.id}
                            className={classnames("sortable-field-wrapper", {
                              selected: selectedField?.id === field.id,
                            })}
                          >
                            <SortableFieldItem
                              key={field.id}
                              field={field}
                             onClick={(f) => {
                              setSelectedField(f);
                              setIsSubmitFieldSelected(false);
                            }}
                              onDelete={handleDeleteField}
                            />
                          </div>
                        ))
                      )}

                        {/* submit button */}
                       <div className={`sortable-field-wrapper non-draggable ${isSubmitFieldSelected ? 'selected' : ''}`}>
                          <div
                            className="field-item submit-field"
                            onClick={() => {
                              setSelectedField(null);
                              setIsSubmitFieldSelected(true);
                            }}
                          >
                            <span className="field-drag-handle disabled">
                              <span className="dashicons dashicons-minus"></span>
                            </span>
                            <span className="field-label">{__("Submit Button", "themehunk-login-registration")}</span>
                          </div>
                        </div>
            
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

              <div className="add-field-button-wrapper">
                <Button isSecondary onClick={handleAddField}>
                  + {__("Add Field", "themehunk-login-registration")}
                </Button>
              </div>
            </div>

            <div className="thl-right-panel">
              {selectedField ? (
                <div className="field-editor">
                  <h3 className="field-editor-title">
                    {selectedField.label || selectedField.id}
                  </h3>

                  {selectedField.type != "checkbox" && selectedField.id != "terms_and_conditions" ? (
                    <TextControl
                        __next40pxDefaultSize = {true}
                        __nextHasNoMarginBottom={true}
                        label={__("Label", "themehunk-login-registration")}
                        value={decodeEntities(selectedField.label)}
                        onChange={(val) => handleFieldChange("label", val)}
                    />
                  ):(
                    <div className="terms-conditions-editor">
                      <TextControl
                        label={__("Terms Text", "themehunk-login-registration")}
                        value={decodeEntities(selectedField.label) || "I agree to the [Terms] & [Conditions]"}
                        onChange={(val) => handleFieldChange("label", val)}
                        help={__("Wrap linkable text in [square brackets]", "themehunk-login-registration")}
                      />
                    </div>
                  )}
              
                  {selectedField.id !== "terms_and_conditions" && (
                    <>
                      <TextControl
                        __next40pxDefaultSize = {true}
                        __nextHasNoMarginBottom={true}
                        label={__("Placeholder", "themehunk-login-registration")}
                        value={selectedField.placeholder || ""}
                        onChange={(val) => handleFieldChange("placeholder", val)}
                      />
                    </>
                  )}

                  {selectedField.type === "checkbox" && selectedField.id === "terms_and_conditions" && (
                    <TextControl
                      __next40pxDefaultSize = {true}
                     __nextHasNoMarginBottom={true}
                      label={__("Terms & Conditions Link", "themehunk-login-registration")}
                      placeholder="https://example.com/terms"
                      value={selectedField.link || ""}
                      onChange={(val) => handleFieldChange("link", val)}
                    />
                  )}

                  <TextControl
                    __next40pxDefaultSize = {true}
                     __nextHasNoMarginBottom={true}
                    label={__("Error Message", "themehunk-login-registration")}
                    value={decodeEntities(selectedField.error_message) || ""}
                    onChange={(val) => handleFieldChange("error_message", val)}
                  />

                  {selectedField.type === "checkbox" && selectedField.id === "terms_and_conditions" && selectedField.label && (
                    <div className="terms-preview" style={{
                      padding: '12px',
                      backgroundColor: '#f6f7f7',
                      borderRadius: '4px',
                      gridColumn: '1 / -1',
                    }}>
                      <p style={{
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: '#757575'
                      }}>
                        {__("Live Preview:", "themehunk-login-registration")}
                      </p>
                      
                      <div style={{ fontSize: '14px' }}>
                        {decodeEntities(selectedField.label).split(/(\[.*?\])/).map((part, i) => {
                          if (part.startsWith('[') && part.endsWith(']')) {
                            const term = part.slice(1, -1);
                            const url = selectedField.links?.[term] || '#';
                            return (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer" 
                                style={{ color: '#007cba', textDecoration: 'none' }}>
                                {term}
                              </a>
                            );
                          }
                          return part;
                        })}
                      </div>

                      {/* Show URL hints if brackets exist but no links set */}
                      {decodeEntities(selectedField.label).includes('[') && !selectedField.links && (
                        <p style={{
                          marginTop: '8px',
                          fontSize: '12px',
                          color: '#d63638',
                          fontStyle: 'italic'
                        }}>
                          {__("Don't forget to set URLs for each bracketed term above", "themehunk-login-registration")}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedField.id !== "terms_and_conditions" && (
                    <>
                      <div className="thl-icon-picker">
                        <label className="components-base-control__label">
                          {__("Choose Icon", "themehunk-login-registration")}
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
                    </>
                  )}

                  {!selectedField.predefined && (
                    <>
                      <TextControl
                        __next40pxDefaultSize = {true}
                        __nextHasNoMarginBottom={true}
                        label={__("Name", "themehunk-login-registration")}
                        value={selectedField.name || ""}
                        onChange={(val) => handleFieldChange("name", val)}
                      />
                      <TextControl
                          __next40pxDefaultSize = {true}
                          __nextHasNoMarginBottom={true}
                        label={__("ID", "themehunk-login-registration")}
                        value={selectedField.id || ""}
                        onChange={(val) => handleFieldChange("id", val)}
                      />
                      <CustomSelectControl
                        label={__("Field Type", "themehunk-login-registration")}
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
                          label={__("Required", "themehunk-login-registration")}
                          checked={selectedField.required}
                          onChange={(val) => handleFieldChange("required", val)}
                        />
                        <ToggleControl
                        __nextHasNoMarginBottom={true}
                          label={__("Show Field", "themehunk-login-registration")}
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
                          label={__("Minimum Length", "themehunk-login-registration")}
                          type="number"
                          value={selectedField.minInput || ""}
                          onChange={(val) => handleFieldChange("minInput", parseInt(val))}
                        />
                        <TextControl
                           __next40pxDefaultSize = {true}
                            __nextHasNoMarginBottom={true}
                          label={__("Maximum Length", "themehunk-login-registration")}
                          type="number"
                          value={selectedField.maxInput || ""}
                          onChange={(val) => handleFieldChange("maxInput", parseInt(val))}
                        />
                        <div className="check-group">
                          <ToggleControl
                          __nextHasNoMarginBottom={true}
                          __next40pxDefaultSize = {true}
                            label={__("Require Letters (A-Z)", "themehunk-login-registration")}
                            checked={selectedField.check?.text || false}
                            onChange={() => handleCheckToggle("text")}
                          />
                          <ToggleControl
                          __nextHasNoMarginBottom={true}
                            label={__("Require Numbers (0-9)", "themehunk-login-registration")}
                            checked={selectedField.check?.number || false}
                            onChange={() => handleCheckToggle("number")}
                          />
                          <ToggleControl
                          __nextHasNoMarginBottom={true}
                            label={__("Require Special Characters", "themehunk-login-registration")}
                            checked={selectedField.check?.special_character || false}
                            onChange={() => handleCheckToggle("special_character")}
                          />
                        </div>
                      </>
                    )}
                </div>
              ) :  isSubmitFieldSelected ? (
                  <div className="submit-field-view">
                      <h3>{__("Submit Button Settings", "themehunk-login-registration")}</h3>
                      <TextControl
                        __next40pxDefaultSize={true}
                        __nextHasNoMarginBottom={true}
                        label={__("Button Text", "themehunk-login-registration")}
                        value={settings.design?.submitButton?.[activeTab] || ""}
                        onChange={(val) => {
                          const updated = {
                            ...settings.design.submitButton,
                            [activeTab]: val,
                          };
                          handleSettingChange("design", ["submitButton"], updated);
                        }}
                      />

                      <div className="preview-submit-button" style={{ marginTop: "12px" }}>
                        <Button isPrimary>
                          {settings.design?.submitButton?.[activeTab] || __("Submit", "themehunk-login-registration")}
                        </Button>
                      </div>
                    </div>
              ) : (
                <div className="placeholder">
                  <p>{__("Click a field to edit its settings", "themehunk-login-registration")}</p>
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