import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import "./Trash.css";

function Trash() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrashProducts();
  }, []);

  async function fetchTrashProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        categories(name)
      `
      )
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  async function restoreProduct(id) {
    const { error } = await supabase
      .from("products")
      .update({
        deleted_at: null,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchTrashProducts();
  }

  async function deleteForever(id) {
    const confirmDelete = window.confirm(
      "This will permanently delete the product. Continue?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchTrashProducts();
  }

  return (
    <div className="trash-page">
      <h1>🗑 Recycle Bin</h1>

      <p>
        Deleted products remain here until permanently removed.
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <div className="empty-trash">
          <h2>Recycle Bin is Empty</h2>
        </div>
      ) : (
        <table className="trash-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Deleted On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="trash-thumb"
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.categories?.name}</td>

                <td>
                  {new Date(product.deleted_at).toLocaleDateString("en-IN")}
                </td>

                <td>
                  <button
                    className="restore-btn"
                    onClick={() => restoreProduct(product.id)}
                  >
                    Restore
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteForever(product.id)}
                  >
                    Delete Forever
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

export default Trash;