import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./Profile.css";

import AvatarUpload from "../components/AvatarUpload/AvatarUpload";

function Profile() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    role: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setProfile({
        full_name: data.full_name || "",
        avatar: data.avatar || "",
        role: data.role || "Super Admin",
        email: user.email,
      });
    }

    setLoading(false);
  }

  async function saveProfile() {
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("admin_profiles")
      .update({
        full_name: profile.full_name,
        avatar: profile.avatar,
        updated_at: new Date(),
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Profile Updated");
  }

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <AvatarUpload
              value={profile.avatar}
              name={profile.full_name}
              onUpload={(url) =>
                setProfile((prev) => ({
                  ...prev,
                  avatar: url,
                }))
              }
            />

          </div>

          <h2>{profile?.full_name}</h2>

          <span>{profile?.role}</span>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <label>Email</label>

            <input value={profile.email} readOnly />
          </div>

          <div className="info-row">
            <label>Name</label>

            <input
              value={profile.full_name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  full_name: e.target.value,
                })
              }
            />
          </div>

          <div className="info-row">
            <label>Role</label>

            <p>{profile?.role}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="primary-btn"
            onClick={saveProfile}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button className="secondary-btn">Change Password</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
