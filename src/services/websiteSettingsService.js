import { supabase } from "../lib/supabase";

const TABLE = "website_settings";
const BUCKET = "products"; // Change if you create a dedicated bucket

// Get existing settings
export async function getWebsiteSettings() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data;
}

// Upload image
export async function uploadWebsiteImage(file, folder) {
  if (!file) return null;

  const filePath = `website/${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Save or update settings
export async function saveWebsiteSettings(values, currentSettings) {
  let logo = currentSettings?.logo || "";
  let favicon = currentSettings?.favicon || "";

  if (values.logo instanceof File) {
    logo = await uploadWebsiteImage(values.logo, "logo");
  }

  if (values.favicon instanceof File) {
    favicon = await uploadWebsiteImage(values.favicon, "favicon");
  }

  const payload = {
    company_name: values.company_name,
    tagline: values.tagline,
    phone: values.phone,
    alternate_phone: values.alternate_phone,
    email: values.email,
    address: values.address,
    maps_url: values.maps_url,
    business_hours: values.business_hours,
    facebook: values.facebook,
    instagram: values.instagram,
    youtube: values.youtube,
    whatsapp: values.whatsapp,
    copyright: values.copyright,
    logo,
    favicon,
    updated_at: new Date().toISOString(),
  };

  if (currentSettings?.id) {
    const { error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", currentSettings.id);

    if (error) throw error;

    return;
  }

  const { error } = await supabase
    .from(TABLE)
    .insert(payload);

  if (error) throw error;
}