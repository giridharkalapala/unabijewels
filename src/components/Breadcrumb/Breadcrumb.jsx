import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import styles from "./Breadcrumb.module.css";

function Breadcrumb({ title, items = [] }) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <h1>{title}</h1>

        <div className={styles.breadcrumbCard}>
          {items.map((item, index) => (
            <span key={index} className={styles.item}>
              {index === 0 && <FaHome className={styles.homeIcon} />}

              {item.link ? (
                <Link to={item.link}>{item.label}</Link>
              ) : (
                <span className={styles.active}>{item.label}</span>
              )}

              {index < items.length - 1 && (
                <FaChevronRight className={styles.arrow} />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb;