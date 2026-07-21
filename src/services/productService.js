import { supabase } from "../lib/supabase";

function withImageUrl(product) {
  return {
    ...product,
    imageUrl: product.image || "",
  };
}

// Homepage - New Arrivals
export async function getNewArrivalProducts(limit = 8) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("is_active", true)
    .eq("new_arrival", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data.map(withImageUrl);
}

// Homepage - Featured Products
export async function getFeaturedProducts(limit = 8) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("is_active", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data.map(withImageUrl);
}