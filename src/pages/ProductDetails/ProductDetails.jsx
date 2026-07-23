import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useEffect, useState } from "react";
import {
  getProductBySlug,
  getRelatedProducts,
} from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(slug);

        setProduct(data);
        setSelectedImage(data.imageUrl);

        const related = await getRelatedProducts(data.category_id, data.id);

        setRelatedProducts(related);

        console.log("Current Product:", data);
        console.log("Related Products:", related);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);
  if (loading) {
    return (
      <section className={styles.details}>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (!product) {
    return (
      <section className={styles.details}>
        <h2>Product not found.</h2>
      </section>
    );
  }

  return (
    <>
      <Breadcrumb
        title={product.name}
        items={[
          { label: "Home", link: "/" },
          { label: "Collections", link: "/collections" },
          { label: product.name },
        ]}
      />
      <section className={styles.details}>
        <div className={styles.container}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={selectedImage} alt={product.name} />
            </div>

            <div className={styles.thumbnails}>
              <button
                className={`${styles.thumb} ${
                  selectedImage === product.imageUrl ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(product.imageUrl)}
              >
                <img src={product.imageUrl} alt={product.name} />
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <span className={styles.category}>{product.categories?.name}</span>

            <h1>{product.name}</h1>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span>Material</span>
                <strong>{product.material}</strong>
              </div>

              <div className={styles.infoCard}>
                <span>Category</span>
                <strong>{product.categories?.name}</strong>
              </div>

              <div className={styles.infoCard}>
                <span>Quality</span>
                <strong>Premium</strong>
              </div>

              <div className={styles.infoCard}>
                <span>Availability</span>
                <strong>Made to Order</strong>
              </div>
            </div>

            <div className={styles.features}>
              <div>✔ Premium Craftsmanship</div>
              <div>✔ Hallmark Jewellery</div>
              <div>✔ Custom Orders Available</div>
              <div>✔ Secure Packaging</div>
            </div>

            <div className={styles.buttons}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
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

      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <span>You May Also Like</span>
            <h2>Related Jewellery</h2>
          </div>

          <div className={styles.relatedGrid}>
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default ProductDetails;
