import styles from "./FeaturedCollections.module.css";

const collections = [
  {
    id: 1,
    title: "Rings",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800",
  },
  {
    id: 2,
    title: "Necklaces",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800",
  },
  {
    id: 3,
    title: "Earrings",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
  },
];

function FeaturedCollections() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>FEATURED COLLECTIONS</p>
        <h2>Explore Our Collections</h2>
      </div>

      <div className={styles.grid}>
        {collections.map((item) => (
          <div className={styles.card} key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className={styles.overlay}>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCollections;