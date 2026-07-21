import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedCategories } from "../../services/categoryService";
import styles from "./FeaturedCollections.module.css";

function FeaturedCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {
    try {
      const data = await getFeaturedCategories();
      setCollections(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className={styles.section}>
        <h2>Loading Collections...</h2>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>FEATURED COLLECTIONS</p>

        <h2>Explore Our Collections</h2>

        <span>
          Discover handcrafted jewellery created with timeless elegance.
        </span>
      </div>

      <div className={styles.grid}>
        {collections.map((item) => (
          <div className={styles.card} key={item.id}>
            <img src={item.imageUrl} alt={item.name} loading="lazy" />

            <div className={styles.overlay}>
              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <Link to={`/collections/${item.slug}`} className={styles.button}>
                View Collection →
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.viewAll}>
        <Link to="/collections">View All Collections →</Link>
      </div>
    </section>
  );
}

export default FeaturedCollections;
