import styles from "./Home.module.css";
import FeaturedCollections from "../../components/FeaturedCollections/FeaturedCollections";
import Categories from "../../components/Categories/Categories";
function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <p className={styles.subtitle}>
            Luxury Jewellery Collection
          </p>

          <h1>
            Timeless
            <br />
            Jewellery
            <br />
            Crafted For You
          </h1>

          <p className={styles.description}>
            Discover handcrafted jewellery designed to celebrate life's most beautiful moments.
          </p>

          <button className={styles.btn}>
            Explore Collection
          </button>
        </div>
      </section>

      <FeaturedCollections />
      <Categories />
    </>
  );
}

export default Home;