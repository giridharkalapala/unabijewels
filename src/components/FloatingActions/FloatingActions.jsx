import { useEffect, useState } from "react";
import styles from "./FloatingActions.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Scroll To Top */}
      {showTop && (
        <button
          className={styles.top}
          onClick={scrollTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default FloatingActions;