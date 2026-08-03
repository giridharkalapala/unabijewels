import { Link } from "react-router-dom";
import "./ProductTable.css";

function ProductTable({
  products,
  onDelete,
  onPreview,
  selectedProducts,
  setSelectedProducts,
}) {
  function toggleSelectAll(e) {
    if (e.target.checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  }

  function toggleSelectProduct(id) {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((item) => item !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  }

  return (
    <>
      <table className="products-table">
        <thead>
          <tr>
            <th className="checkbox-cell">
              <input
                type="checkbox"
                checked={
                  products.length > 0 &&
                  selectedProducts.length === products.length
                }
                onChange={toggleSelectAll}
              />
            </th>

            <th>ID</th>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              {/* Checkbox */}
              <td className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                />
              </td>

              {/* ID */}
              <td className="product-id">#{String(product.id).slice(0, 6)}</td>

              {/* Image */}
              <td>
                <img src={product.image} alt={product.name} className="thumb" />
              </td>

              {/* Product */}
              <td>
                <div className="product-info">
                  <strong>{product.name}</strong>
                  <small>{product.material}</small>
                </div>
              </td>

              {/* Category */}
              <td className="category-cell">
                {product.categories?.name || "-"}
              </td>

              {/* Price */}
              <td className="price">
                {product.price
                  ? `₹${Number(product.price).toLocaleString("en-IN")}`
                  : "-"}
              </td>

              {/* Status */}
              <td>
                <div className="status-group">
                  {product.featured && (
                    <span className="badge featured">⭐ Featured</span>
                  )}

                  {product.new_arrival && (
                    <span className="badge new">🆕 New</span>
                  )}

                  <span
                    className={`badge ${
                      product.is_active ? "active" : "inactive"
                    }`}
                  >
                    {product.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </td>

              {/* Created */}
              <td className="created">
                {new Date(product.created_at).toLocaleDateString("en-IN")}
              </td>

              {/* Actions */}
              <td>
                <div className="actions">
                  <button
                    className="view"
                    onClick={() => onPreview(product)}
                    title="Preview"
                  >
                    👁
                  </button>

                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="edit"
                    title="Edit"
                  >
                    ✏
                  </Link>

                  <button
                    className="delete"
                    onClick={() => onDelete(product)}
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductTable;
