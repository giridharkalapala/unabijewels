// import { supabase } from "../lib/supabase";

// export async function getTestimonials() {
//   const { data, error } = await supabase
//     .from("testimonials")
//     .select("*")
//     .eq("is_active", true)
//     .order("created_at", { ascending: false });

//   if (error) throw error;

//   return data;
// }