import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import GalleryForm from "../GalleryForm/GalleryForm";

function EditGallery() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setGallery(data);
  }

  async function handleSubmit(formData) {
    setLoading(true);

    try {
      let imageUrl = gallery.image;

      // Upload new image if selected
      if (formData.image) {
        const fileName = `gallery/${Date.now()}-${formData.image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("products") // Change if your bucket name is different
          .upload(fileName, formData.image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("gallery")
        .update({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          featured: formData.featured,
          is_active: formData.is_active,
          image: imageUrl,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Gallery updated successfully!");

      navigate("/admin/gallery");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!gallery) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Gallery Image</h1>

      <GalleryForm
        initialData={gallery}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditGallery;