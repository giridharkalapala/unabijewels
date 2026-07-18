import styles from "./Categories.module.css";

const categories = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles",
  "Chains",
  "Bracelets",
  "Pendants",
  "Mangalsutra",
];

function Categories() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>CATEGORIES</p>
        <h2>Shop by Category</h2>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category} className={styles.card}>
            <div className={styles.icon}>💎</div>
            <h3>{category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;