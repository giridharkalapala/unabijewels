import { supabase } from "../lib/supabase";

export async function uploadImage(file, bucket = "products") {
  if (!file) {
    throw new Error("No file selected.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image should be less than 5MB.");
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
}