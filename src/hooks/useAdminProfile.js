import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function useAdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

    if (!error && data) {
      setProfile({
        id: user.id,
        email: user.email,
        full_name: data.full_name,
        avatar: data.avatar,
        role: data.role,
      });
    }

    setLoading(false);
  }

  return {
    profile,
    loading,
    refreshProfile: fetchProfile,
  };
}

export default useAdminProfile;