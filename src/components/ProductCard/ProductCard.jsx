import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { FiHeart } from "react-icons/fi";
function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.imageUrl || product.image}
          alt={product.name}
        />

        <span className={styles.categoryBadge}>
          {product.categories?.name || product.category}
        </span>

        <button className={styles.favoriteBtn}>
          <FiHeart />
        </button>

        <div className={styles.overlay}>
          <Link
            to={`/products/${product.slug}`}
            className={styles.viewButton}
          >
            View Details
          </Link>
        </div>
      </div>

      <div className={styles.info}>
        <h3>{product.name}</h3>

        <p className={styles.category}>
          {product.categories?.name || product.category}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;