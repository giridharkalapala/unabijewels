import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import CategoryForm from "../CategoryForm/CategoryForm";

function AddCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
  setLoading(true);

  try {
    let imageName = null;

    // Upload image
    if (data.image) {
      const file = data.image;

      imageName = `${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("categories")
          .upload(imageName, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        throw uploadError;
      }

      console.log("Upload Success:", uploadData);
    }

    const { data: insertedData, error } = await supabase
      .from("categories")
      .insert([
        {
          name: data.name,
          slug: data.slug,
          description: data.description,
          image: imageName,
          is_active: data.is_active,
        },
      ])
      .select();

    if (error) throw error;

    console.log("Inserted:", insertedData);

    alert("Category added successfully!");

    navigate("/admin/categories");

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div>
      <h1>Add Category</h1>

      <CategoryForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddCategory;