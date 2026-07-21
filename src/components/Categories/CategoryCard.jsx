import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/collections/${category.slug}`}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <img
          src={category.imageUrl}
          alt={category.name}
          loading="lazy"
        />
      </div>

      <h3>{category.name}</h3>
    </Link>
  );
}

export default CategoryCard;