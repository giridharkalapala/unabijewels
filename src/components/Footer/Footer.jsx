import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <img src={logo} alt="Unabi Jewels Logo" className={styles.logo} />

          <p className={styles.tagline}>
            Timeless Elegance.
            <br />
            Crafted with Passion.
          </p>

          <div className={styles.socials}>
            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Collections */}
        <div className={styles.column}>
          <h3>Collections</h3>

          <a href="#">Necklaces</a>
          <a href="#">Earrings</a>
          <a href="#">Bangles</a>
          <a href="#">Bracelets</a>
          <a href="#">Rings</a>
          <a href="#">Pendants</a>
        </div>

        {/* Contact */}
        <div className={styles.column}>
          <h3>Contact Us</h3>

          <p>📍 Vijayawada, Andhra Pradesh</p>

          <p>📞 +91 XXXXX XXXXX</p>

          <p>✉ hello@unabijewels.com</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © 2026 Unabi Jewels. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
