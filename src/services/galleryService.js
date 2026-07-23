import { supabase } from "../lib/supabase";

function withImageUrl(image) {
  return {
    ...image,
    imageUrl: image.image || "",
  };
}

// Get Active Gallery Images
export async function getGalleryImages() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(withImageUrl);
}

// Featured Gallery Images (optional)
export async function getFeaturedGalleryImages(limit = 6) {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .order("created_at", { ascending:false })
    .limit(limit);

  if (error) throw error;

  return data.map(withImageUrl);
}