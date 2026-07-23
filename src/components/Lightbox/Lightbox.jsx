import { useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Lightbox.module.css";

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === null) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, onNext, onPrev]);

  if (currentIndex === null) return null;

  const image = images[currentIndex];

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <FaTimes />
        </button>

        <button className={styles.prev} onClick={onPrev}>
          <FaChevronLeft />
        </button>

        <img src={image.imageUrl} alt={image.title} />

        <button className={styles.next} onClick={onNext}>
          <FaChevronRight />
        </button>

      </div>
    </div>
  );
}

export default Lightbox;
