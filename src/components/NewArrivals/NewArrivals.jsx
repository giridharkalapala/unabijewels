import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./NewArrivals.module.css";

import ProductCard from "./ProductCard";
import { getNewArrivalProducts } from "../../services/productService";

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getNewArrivalProducts(8);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.loading}>Loading our latest jewellery...</div>
      </section>
    );
  }

  if (products.length === 0) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>NEW ARRIVALS</p>

        <h2>Latest Jewellery Collection</h2>

        <span>Discover our newest handcrafted jewellery pieces.</span>
      </div>

      <div className={styles.loading}>
        No new arrivals available yet.
      </div>
    </section>
  );
}

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>NEW ARRIVALS</p>

        <h2>Latest Jewellery Collection</h2>

        <span>Discover our newest handcrafted jewellery pieces.</span>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={products.length > 4}
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.viewAll}>
        <Link to="/products">View All Products →</Link>
      </div>
    </section>
  );
}

export default NewArrivals;
