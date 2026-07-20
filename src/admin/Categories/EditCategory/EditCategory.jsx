import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import CategoryForm from "../CategoryForm/CategoryForm";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  async function fetchCategory() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setCategory(data);
  }

  async function handleSubmit(formData) {
    setLoading(true);

    const { error } = await supabase
      .from("categories")
      .update(formData)
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Category Updated Successfully");

    navigate("/admin/categories");
  }

  if (!category) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h1>Edit Category</h1>

      <CategoryForm
        initialData={category}
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
}

export default EditCategory;