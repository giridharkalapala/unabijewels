import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import ProductForm from "../ProductForm/ProductForm";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    console.log("Categories Data:", data);
    console.log("Categories Error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    setCategories(data || []);
  }

  async function handleSubmit(product) {
    console.log("Submitting Product:", product);

    setLoading(true);

    const { error } = await supabase.from("products").insert([
      {
        name: product.name,
        slug: product.slug,
        // category_id: product.category_id,
        category_id: product.category_id || null,
        material: product.material,
        description: product.description,
        image: product.image,
        price: product.price || null,
        featured: product.featured,
        new_arrival: product.new_arrival,
        is_active: product.is_active,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Product added successfully!");

    navigate("/admin/products");
  }

  return (
    <div>
      <h2>Add Product</h2>

      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddProduct;