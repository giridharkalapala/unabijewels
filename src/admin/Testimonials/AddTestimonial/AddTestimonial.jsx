import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import TestimonialForm from "../TestimonialForm/TestimonialForm";

function AddTestimonial() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);

    try {
      let imageUrl = "";

      if (formData.image) {
        const fileName = `testimonials/${Date.now()}-${formData.image.name}`;

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
        .from("testimonials")
        .insert([
          {
            name: formData.name,
            designation: formData.designation,
            review: formData.review,
            rating: Number(formData.rating),
            is_active: formData.is_active,
            image: imageUrl,
          },
        ]);

      if (error) throw error;

      alert("Testimonial added successfully!");

      navigate("/admin/testimonials");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Add Testimonial</h1>

      <TestimonialForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddTestimonial;