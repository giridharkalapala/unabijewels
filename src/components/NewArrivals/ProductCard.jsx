import { Link } from "react-router-dom";
import styles from "./NewArrivals.module.css";
import { FaRegHeart } from "react-icons/fa";

function ProductCard({ product }) {
  console.log({
  image: product.image,
  imageUrl: product.imageUrl,
  category_id: product.category_id,
  categories: product.categories,
});
  return (
    <div className={styles.card}>
      {product.new_arrival && <span className={styles.badge}>NEW</span>}
      {product.featured && (
        <span className={styles.featuredBadge}>★ Featured</span>
      )}

      <div className={styles.wishlist}>
        <FaRegHeart />
      </div>

      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <div className={styles.imageOverlay}>
          <Link
            to={`/products/${product.slug}`}
            className={styles.overlayButton}
          >
            View Details
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{product.categories?.name}</span>

        <h3>{product.name}</h3>

        {product.material && (
          <p className={styles.material}>{product.material}</p>
        )}

        <div className={styles.bottom}>
          <h4>₹ {Number(product.price || 0).toLocaleString("en-IN")}</h4>

          <Link to={`/products/${product.slug}`} className={styles.button}>
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
