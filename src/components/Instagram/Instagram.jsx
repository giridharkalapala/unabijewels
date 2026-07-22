import styles from "./Instagram.module.css";
// import { Instagram as InstagramIcon } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const posts = [
  { id: 1, image: "/images/instagram/1.jpg" },
  { id: 2, image: "/images/instagram/2.jpg" },
  { id: 3, image: "/images/instagram/3.jpg" },
  { id: 4, image: "/images/instagram/4.jpg" },
  { id: 5, image: "/images/instagram/5.jpg" },
  { id: 6, image: "/images/instagram/6.jpg" },
];

function Instagram() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span>FOLLOW OUR JOURNEY</span>

        <h2>@unabijewels</h2>

        <p>
          Discover our latest jewellery collections, behind-the-scenes
          moments, styling inspiration and customer favourites.
        </p>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.card}>
            <img src={post.image} alt="Instagram Post" />

            <div className={styles.overlay}>
              <FaInstagram size={36} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <a
          href="https://instagram.com/unabijewels"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}

export default Instagram;