import { supabase } from "../lib/supabase";

export async function submitEnquiry(enquiry) {
  const { data, error } = await supabase
    .from("enquiries")
    .insert([enquiry])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}