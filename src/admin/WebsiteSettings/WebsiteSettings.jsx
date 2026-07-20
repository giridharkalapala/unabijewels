import SettingsForm from "./SettingsForm";
import "./WebsiteSettings.css";

function WebsiteSettings() {
  return (
    <div className="website-settings-page">
      <div className="page-header">
        <h1>Website Settings</h1>
        <p>Manage your website information and branding.</p>
      </div>

      <SettingsForm />
    </div>
  );
}

export default WebsiteSettings;