import { __ } from "@wordpress/i18n";
import { Button,Spinner, TextareaControl, Dashicon } from "@wordpress/components";

const ToolsSettings = ({ 
  settings, 
  exportedSettings, 
  setExportedSettings,
  importSettingsText,
  setImportSettingsText,
  handleExportSettings,
  handleImportSettings,
  isSaving,
  setIsResetConfirmOpen
}) => {
  return (
 <section className="settings-section">
              <div className="settings-card">
                <h2 className="section-title">
                  <i className="dashicons dashicons-admin-tools"></i>
                  {__("Tools", "th-login")}
                </h2>

                <div className="settings-group">
                  <h3 className="group-title">
                    {__("Export Settings", "th-login")}
                  </h3>

                  <div className="setting-row">
                    <div className="setting-label">
                      <h4>{__("Export Current Settings", "th-login")}</h4>
                      <p className="description">
                        {__("Backup your current configuration", "th-login")}
                      </p>
                    </div>
                    <div className="setting-control">
                      <Button isSecondary onClick={handleExportSettings}>
                        <Dashicon icon="download" />
                        {__("Export Settings", "th-login")}
                      </Button>
                    </div>
                  </div>

                  <div className="setting-row">
                    <div className="setting-label">
                      <h4>{__("Exported Settings", "th-login")}</h4>
                      <p className="description">
                        {__("Copy this JSON to save your settings", "th-login")}
                      </p>
                    </div>
                    <div className="setting-control">
                      <TextareaControl
                        value={exportedSettings}
                        readOnly
                        rows={10}
                        className="export-textarea"
                      />
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">
                    {__("Import Settings", "th-login")}
                  </h3>

                  <div className="setting-row">
                    <div className="setting-label">
                      <h4>{__("Import Settings", "th-login")}</h4>
                      <p className="description">
                        {__(
                          "Paste previously exported settings JSON",
                          "th-login"
                        )}
                      </p>
                    </div>
                    <div className="setting-control">
                      <TextareaControl
                        value={importSettingsText}
                        onChange={(newValue) => setImportSettingsText(newValue)}
                        rows={10}
                        className="import-textarea"
                      />
                    </div>
                  </div>

                  <div className="setting-row">
                    <div className="setting-control">
                      <Button
                        isPrimary
                        onClick={handleImportSettings}
                        disabled={isSaving || !importSettingsText.trim()}
                      >
                        {isSaving ? (
                          <Spinner />
                        ) : (
                          <>
                            <Dashicon icon="upload" />
                            {__("Import Settings", "th-login")}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">
                    {__("Reset Settings", "th-login")}
                  </h3>

                  <div className="setting-row">
                    <div className="setting-label">
                      <h4>{__("Reset All Settings", "th-login")}</h4>
                      <p className="description">
                        {__(
                          "Restore all settings to default values",
                          "th-login"
                        )}
                      </p>
                    </div>
                    <div className="setting-control">
                      <Button
                        isDestructive
                        onClick={() => setIsResetConfirmOpen(true)}
                      >
                        <Dashicon icon="undo" />
                        {__("Reset Settings", "th-login")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    );
};

export default ToolsSettings;