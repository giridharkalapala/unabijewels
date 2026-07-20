import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import CategoryForm from "../CategoryForm/CategoryForm";

function AddCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    const { error } = await supabase
      .from("categories")
      .insert([data]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Category added successfully!");

    navigate("/admin/categories");
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