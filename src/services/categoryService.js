import { supabase } from "../lib/supabase";

function withImageUrl(category) {
  let imageUrl = "";

  if (category.image) {
    const { data } = supabase.storage
      .from("categories")
      .getPublicUrl(category.image);

    imageUrl = data.publicUrl;
  }

  return {
    ...category,
    imageUrl,
  };
}

// Featured Collections (Only 3)
export async function getFeaturedCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) throw error;

  return data.map(withImageUrl);
}

// Categories Carousel (All Categories)
export async function getAllActiveCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(withImageUrl);
}