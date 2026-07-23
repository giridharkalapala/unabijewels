import { Link } from "react-router-dom";
import styles from "./About.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import aboutImage from "../../assets/images/Breadcrumb.png";

function About() {
  return (
    <>
      <Breadcrumb
        title="About Us"
        items={[{ label: "Home", link: "/" }, { label: "About Us" }]}
      />
      <section className={styles.about}>
        <div className={styles.hero}>
          <h1>About Unabi Jewels</h1>
          <p>Crafting timeless elegance with passion and precision.</p>
        </div>

        <div className={styles.story}>
          <div className={styles.image}>
            <img src={aboutImage} alt="About Unabi Jewels" />
          </div>

          <div className={styles.content}>
            <h2>Our Story</h2>

            <p>
              At Unabi Jewels, we believe jewellery is more than an accessory.
              Every piece is designed with elegance, quality, and timeless
              beauty to celebrate life's most precious moments.
            </p>

            <p>
              Our collections combine traditional craftsmanship with modern
              designs, creating jewellery that can be treasured for generations.
            </p>
          </div>
        </div>

        <div className={styles.features}>
          <h2>Why Choose Unabi Jewels?</h2>

          <div className={styles.grid}>
            <div>💎 Premium Craftsmanship</div>
            <div>✨ Elegant Designs</div>
            <div>🛡 Hallmarked Jewellery</div>
            <div>🎁 Perfect for Every Occasion</div>
            <div>🧵 Custom Orders Available</div>
            <div>🤝 Trusted Quality</div>
          </div>
        </div>

        <div className={styles.mission}>
          <div>
            <h2>Our Mission</h2>
            <p>
              To create beautiful jewellery that reflects individuality,
              confidence, and lasting memories.
            </p>
          </div>

          <div>
            <h2>Our Vision</h2>
            <p>
              To become a trusted jewellery brand known for elegance,
              craftsmanship, and exceptional customer experience.
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <h2>Discover Our Collection</h2>

          <Link to="/collections" className={styles.button}>
            Explore Collection
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;
