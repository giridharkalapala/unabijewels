import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./Categories.module.css";
import CategoryCard from "./CategoryCard";
import { getAllActiveCategories } from "../../services/categoryService";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getAllActiveCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>CATEGORIES</p>

        <h2>Shop By Category</h2>

        <span>
          Explore every jewellery collection crafted with elegance.
        </span>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={categories.length > 4}
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Categories;