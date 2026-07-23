import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import styles from "./ContactCTA.module.css";
import ctaBg from "../../assets/images/cta-bg.jpg";

function ContactCTA() {
  return (
    <section
      className={styles.cta}
      style={{
        backgroundImage: `linear-gradient(rgba(20,18,16,.78), rgba(20,18,16,.82)), url(${ctaBg})`,
      }}
    >
      {/* Decorative Glow */}
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      <div className={styles.content}>

        <span className={styles.subtitle}>
          ✦ UNABI JEWELS ✦
        </span>

        <h2 className={styles.title}>
          Crafting Timeless Jewellery
          <br />
          for Every Precious Moment
        </h2>

        <p className={styles.description}>
          Discover handcrafted jewellery inspired by elegance,
          tradition and contemporary artistry, designed to make
          every celebration unforgettable.
        </p>

        <div className={styles.buttons}>

          <Link
            to="/collections"
            className={styles.primaryBtn}
          >
            Explore Collection
          </Link>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            <FaWhatsapp />

            WhatsApp Us
          </a>

        </div>

      </div>
    </section>
  );
}

export default ContactCTA;