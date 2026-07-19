import styles from "./Gallery.module.css";

const galleryImages = [
  {
    id: 1,
    category: "Rings",
    image: "https://via.placeholder.com/400x500?text=Ring",
  },
  {
    id: 2,
    category: "Necklaces",
    image: "https://via.placeholder.com/400x500?text=Necklace",
  },
  {
    id: 3,
    category: "Earrings",
    image: "https://via.placeholder.com/400x500?text=Earrings",
  },
  {
    id: 4,
    category: "Bracelets",
    image: "https://via.placeholder.com/400x500?text=Bracelet",
  },
  {
    id: 5,
    category: "Pendants",
    image: "https://via.placeholder.com/400x500?text=Pendant",
  },
  {
    id: 6,
    category: "Bangles",
    image: "https://via.placeholder.com/400x500?text=Bangles",
  },
];

function Gallery() {
  return (
    <section className={styles.gallery}>
      <div className={styles.heading}>
        <p>OUR GALLERY</p>
        <h1>Jewellery Showcase</h1>
      </div>

      <div className={styles.grid}>
        {galleryImages.map((item) => (
          <div className={styles.card} key={item.id}>
            <img src={item.image} alt={item.category} />
            <div className={styles.overlay}>
              <h3>{item.category}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;