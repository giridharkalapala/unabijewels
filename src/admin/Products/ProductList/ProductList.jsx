import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import "./ProductList.css";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error(error.message);
      return;
    }

    setCategories(data || []);
  }

  async function handleDelete() {
    if (!deleteProduct) return;

    setDeleting(true);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", deleteProduct.id);

    setDeleting(false);

    if (error) {
      alert(error.message);
      return;
    }

    setDeleteProduct(null);

    fetchProducts();
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      product.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (

    <div className="product-list">
      <DeleteModal
        open={!!deleteProduct}
        title="Delete Product"
        message={
          deleteProduct
            ? `Are you sure you want to delete "${deleteProduct.name}"? This action cannot be undone.`
            : ""
        }
        loading={deleting}
        onCancel={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
      />

      <div className="top-bar">
        <h2>Products</h2>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <Link to="/admin/products/add" className="add-btn">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <div className="empty">
          <h3>No Products Found</h3>
          <p>Add your first product.</p>
        </div>
      ) : (
        <table>

          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Material</th>
              <th>Price</th>
              <th>Featured</th>
              <th>New</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((product) => (
              <tr key={product.id}>

                <td>
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/70"
                    }
                    alt={product.name}
                    className="thumb"
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.categories?.name}</td>

                <td>{product.material}</td>

                <td>
                  ₹{product.price || "-"}
                </td>

                <td>
                  {product.featured ? "✅" : "-"}
                </td>

                <td>
                  {product.new_arrival ? "🆕" : "-"}
                </td>

                <td>
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="edit"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    className="delete"
                    onClick={() => setDeleteProduct(product)}
                  >
                    🗑 Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default ProductList;