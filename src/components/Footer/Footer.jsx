import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <h2>UNABI JEWELS</h2>

          <p>
            Timeless elegance crafted with passion,
            precision, and exceptional craftsmanship.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3>Collections</h3>

          <ul>
            <li>Rings</li>
            <li>Necklaces</li>
            <li>Earrings</li>
            <li>Bracelets</li>
            <li>Pendants</li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>

          <ul>
            <li>📞 +91 98765 43210</li>
            <li>📧 info@unabijewels.com</li>
            <li>📍 Hyderabad, India</li>
            <li>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© 2026 Unabi Jewels. All Rights Reserved.</p>

        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;