import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import TestimonialForm from "../TestimonialForm/TestimonialForm";

function EditTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonial();
  }, []);

  async function fetchTestimonial() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setTestimonial(data);
  }

  async function handleSubmit(formData) {
    setLoading(true);

    try {
      let imageUrl = testimonial.image;

      // Upload new image if selected
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
        .update({
          name: formData.name,
          designation: formData.designation,
          review: formData.review,
          rating: Number(formData.rating),
          is_active: formData.is_active,
          image: imageUrl,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Testimonial updated successfully!");

      navigate("/admin/testimonials");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!testimonial) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Testimonial</h1>

      <TestimonialForm
        initialData={testimonial}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditTestimonial;