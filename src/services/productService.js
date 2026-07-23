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

// Get Product by Slug
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories(
        id,
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) throw error;

  return withImageUrl(data);
}

// Related Products
export async function getRelatedProducts(categoryId, currentProductId) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories(
        id,
        name,
        slug
      )
    `)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("id", currentProductId)
    .limit(4);

  if (error) throw error;

  return data.map(withImageUrl);
}