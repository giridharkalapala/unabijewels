import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Lightbox from "../../components/Lightbox/Lightbox";
import { getGalleryImages } from "../../services/galleryService";

const categories = [
  "All",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Pendants",
  "Bangles",
];

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await getGalleryImages();
        setGalleryImages(data);
      } catch (error) {
        console.error("Error loading gallery:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === selectedCategory);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Gallery...</h2>;
  }

  if (galleryImages.length === 0) {
    return (
      <>
        <Breadcrumb
          title="Gallery"
          items={[{ label: "Home", link: "/" }, { label: "Gallery" }]}
        />

        <section className={styles.gallery}>
          <h2>No gallery images found.</h2>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb
        title="Gallery"
        items={[{ label: "Home", link: "/" }, { label: "Gallery" }]}
      />

      <section className={styles.gallery}>
        <div className={styles.heading}>
          <p>OUR GALLERY</p>
          <h1>Jewellery Showcase</h1>
        </div>

        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? styles.active : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredImages.map((item, index) => (
            <div
              className={styles.card}
              key={item.id}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={item.imageUrl} alt={item.title} />

              <div className={styles.overlay}>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <span>Click to View</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        images={filteredImages}
        currentIndex={currentIndex}
        onClose={() => setCurrentIndex(null)}
        onNext={() =>
          setCurrentIndex((currentIndex + 1) % filteredImages.length)
        }
        onPrev={() =>
          setCurrentIndex(
            (currentIndex - 1 + filteredImages.length) % filteredImages.length,
          )
        }
      />
    </>
  );
}

export default Gallery;
