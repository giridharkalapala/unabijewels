import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} />

      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>

        <h3>{product.name}</h3>

        <button>
          <Link to={`/products/${product.slug}`}>
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;