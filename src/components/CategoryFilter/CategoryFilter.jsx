import styles from "./CategoryFilter.module.css";

const categories = [
  "All",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Pendants",
];

function CategoryFilter({ selected, onSelect }) {
  return (
    <div className={styles.filter}>
      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? styles.active : ""}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;