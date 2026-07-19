import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { slug } = useParams();

  // Temporary sample product
  const product = {
    name: "Rose Gold Ring",
    category: "Rings",
    material: "Rose Gold",
    image: "https://via.placeholder.com/700x700?text=Jewellery",
    description:
      "Beautiful handcrafted jewellery designed with elegance and premium craftsmanship.",
  };

  return (
    <section className={styles.details}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={product.image} alt={product.name} />
        </div>

        <div className={styles.content}>
          <p className={styles.category}>{product.category}</p>

          <h1>{product.name}</h1>

          <h4>Material</h4>
          <p>{product.material}</p>

          <h4>Description</h4>
          <p>{product.description}</p>

          <div className={styles.features}>
            <span>✔ Premium Quality</span>
            <span>✔ Hallmark Jewellery</span>
            <span>✔ Custom Orders Available</span>
          </div>

          <div className={styles.buttons}>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsapp}
            >
              Enquire on WhatsApp
            </a>

            <a href="tel:+919876543210" className={styles.call}>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;