import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GalleryForm from "../GalleryForm/GalleryForm";
import { supabase } from "../../../lib/supabase";

function AddGallery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);

    try {
      let imageUrl = "";

      // Upload image to Storage
      if (formData.image) {
        const fileName = `gallery/${Date.now()}-${formData.image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("products") // <-- Change this if your bucket has a different name
          .upload(fileName, formData.image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // Save record in database
      const { error } = await supabase
        .from("gallery")
        .insert([
          {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            featured: formData.featured,
            is_active: formData.is_active,
            image: imageUrl,
          },
        ]);

      if (error) throw error;

      alert("Gallery image added successfully!");

      navigate("/admin/gallery");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Add Gallery Image</h1>

      <GalleryForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddGallery;