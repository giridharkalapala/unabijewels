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

// Get All Products
export async function getAllProducts() {
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
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(withImageUrl);
}

// Get All Categories
export async function getAllCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw error;

  return data;
}


// Get Products by Category Slug
export async function getProductsByCategorySlug(slug) {
  // Get the category
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (categoryError) throw categoryError;

  // Get products in that category
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (productsError) throw productsError;

  return {
    category,
    products: products.map(withImageUrl),
  };
}