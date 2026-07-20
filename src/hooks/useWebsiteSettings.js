import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useWebsiteSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const { data, error } = await supabase
        .from("website_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      setSettings(data);
    } catch (error) {
      console.error("Error loading website settings:", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    settings,
    loading,
    refresh: loadSettings,
  };
}