import "./ProductPreviewModal.css";

function ProductPreviewModal({
  open,
  product,
  onClose,
}) {
  if (!open || !product) return null;

  return (
    <div
      className="preview-overlay"
      onClick={onClose}
    >
      <div
        className="preview-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="preview-grid">

          <div className="preview-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="preview-content">

            <span className="preview-category">
              {product.categories?.name}
            </span>

            <h2>{product.name}</h2>

            <p className="preview-description">
              {product.description ||
                "No description available."}
            </p>

            <div className="preview-info">

              <div>
                <span>Material</span>
                <strong>{product.material}</strong>
              </div>

              <div>
                <span>Price</span>
                <strong>
                  ₹
                  {product.price
                    ? Number(product.price).toLocaleString(
                        "en-IN"
                      )
                    : "-"}
                </strong>
              </div>

              <div>
                <span>Featured</span>
                <strong>
                  {product.featured ? "Yes" : "No"}
                </strong>
              </div>

              <div>
                <span>New Arrival</span>
                <strong>
                  {product.new_arrival ? "Yes" : "No"}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {product.is_active
                    ? "Active"
                    : "Inactive"}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductPreviewModal;