import { useEffect, useState } from "react";

import {
  getWebsiteSettings,
  saveWebsiteSettings,
} from "../../services/websiteSettingsService";
import "./SettingsForm.css";

function SettingsForm() {
  const [loading, setLoading] = useState(false);

  const [currentSettings, setCurrentSettings] = useState(null);

  const [form, setForm] = useState({
    company_name: "",
    tagline: "",
    phone: "",
    alternate_phone: "",
    email: "",
    address: "",
    maps_url: "",
    business_hours: "",
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
    copyright: "",
    logo: null,
    favicon: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await saveWebsiteSettings(form, currentSettings);

      alert("Website settings saved successfully!");

      loadSettings();
    } catch (error) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getWebsiteSettings();

      if (!data) return;

      setCurrentSettings(data);

      setForm({
        ...data,
        logo: data.logo,
        favicon: data.favicon,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="settings-card">
        <h3>General Information</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              placeholder="Unabi Jewels"
            />
          </div>

          <div className="form-group">
            <label>Tagline</label>

            <input
              type="text"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              placeholder="Luxury Jewellery"
            />
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>Branding</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Logo</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  logo: e.target.files[0],
                })
              }
            />

            {form.logo && (
              <img
                src={
                  form.logo instanceof File
                    ? URL.createObjectURL(form.logo)
                    : form.logo
                }
                alt="Logo Preview"
                className="preview-image"
              />
            )}
          </div>

          <div className="form-group">
            <label>Favicon</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  favicon: e.target.files[0],
                })
              }
            />

            {form.favicon && (
              <img
                src={
                  form.favicon instanceof File
                    ? URL.createObjectURL(form.favicon)
                    : form.favicon
                }
                alt="Favicon Preview"
                className="preview-image favicon"
              />
            )}
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>Contact Information</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Alternate Phone</label>

            <input
              type="text"
              name="alternate_phone"
              value={form.alternate_phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>

            <textarea
              rows="3"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Business Hours</label>

            <input
              type="text"
              name="business_hours"
              value={form.business_hours}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Google Maps URL</label>

            <input
              type="text"
              name="maps_url"
              value={form.maps_url}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>Social Media</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Facebook</label>

            <input
              type="url"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Instagram</label>

            <input
              type="url"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>YouTube</label>

            <input
              type="url"
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>WhatsApp</label>

            <input
              type="text"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>Footer</h3>

        <div className="form-group">
          <label>Copyright</label>

          <input
            type="text"
            name="copyright"
            value={form.copyright}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="submit-area">
        <button className="save-btn" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* <button type="submit">
        Save Settings
      </button> */}
    </form>
  );
}

export default SettingsForm;
