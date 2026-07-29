import { Link } from "react-router-dom";
import "./ProductTable.css";

function ProductTable({ products, onDelete, onPreview }) {
  return (
    <table className="products-table">
      <thead>
        <tr>
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
            <td className="product-id">#{String(product.id).slice(0, 6)}</td>

            <td>
              <img src={product.image} alt={product.name} className="thumb" />
            </td>

            <td>
              <div className="product-info">
                <strong>{product.name}</strong>

                <small>{product.material}</small>
              </div>
            </td>

            <td>{product.categories?.name}</td>

            <td className="price">
              ₹
              {product.price
                ? Number(product.price).toLocaleString("en-IN")
                : "-"}
            </td>

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

            <td>{new Date(product.created_at).toLocaleDateString("en-IN")}</td>

            <td>
              <div className="actions">
                <button className="view" onClick={() => onPreview(product)}>
                  👁
                </button>

                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="edit"
                >
                  ✏
                </Link>

                <button className="delete" onClick={() => onDelete(product)}>
                  🗑
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
