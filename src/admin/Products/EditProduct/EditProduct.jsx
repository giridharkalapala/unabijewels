import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import ProductForm from "../ProductForm/ProductForm";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    setCategories(data || []);
  }

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      navigate("/admin/products");
      return;
    }

    setProduct(data);
    setLoading(false);
  }

  async function handleUpdate(updatedProduct) {
    setSaving(true);

    const { error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Product updated successfully!");
    navigate("/admin/products");
  }

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Edit Product</h2>

      <ProductForm
        initialData={product}
        categories={categories}
        onSubmit={handleUpdate}
        loading={saving}
      />
    </div>
  );
}

export default EditProduct;