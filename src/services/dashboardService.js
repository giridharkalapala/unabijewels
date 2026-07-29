import { supabase } from "../lib/supabase";

export async function getDashboardStats() {
  const [
    products,
    categories,
    featured,
    newArrivals,
    gallery,
    testimonials,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("categories")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("featured", true),

    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("new_arrival", true),

    supabase
      .from("gallery")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    products: products.count || 0,
    categories: categories.count || 0,
    featured: featured.count || 0,
    newArrivals: newArrivals.count || 0,
    gallery: gallery.count || 0,
    testimonials: testimonials.count || 0,
  };
}

export async function getRecentProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return data;
}

export async function getRecentEnquiries() {
  const { data, error } = await supabase
    .from("enquiries")
    .select("id, name, subject, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return data;
}

export async function getProductsByMonth() {
  const { data, error } = await supabase
    .from("products")
    .select("created_at");

  if (error) throw error;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const counts = new Array(12).fill(0);

  data.forEach((item) => {
    const month = new Date(item.created_at).getMonth();
    counts[month]++;
  });

  return months.map((month, index) => ({
    month,
    products: counts[index],
  }));
}

export async function getProductsByCategory() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      categories (
        name
      )
    `);

  if (error) throw error;

  const categoryMap = {};

  data.forEach((item) => {
    const name = item.categories?.name || "Uncategorized";

    categoryMap[name] = (categoryMap[name] || 0) + 1;
  });

  return Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));
}

export async function getEnquiriesByMonth() {
  const { data, error } = await supabase
    .from("enquiries")
    .select("created_at");

  if (error) throw error;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const counts = new Array(12).fill(0);

  data.forEach((item) => {
    const month = new Date(item.created_at).getMonth();
    counts[month]++;
  });

  return months.map((month, index) => ({
    month,
    enquiries: counts[index],
  }));
}