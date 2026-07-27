import styles from "./SkeletonCard.module.css";

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>

      <div className={styles.content}>
        <div className={styles.lineSmall}></div>

        <div className={styles.line}></div>

        <div className={styles.button}></div>
      </div>
    </div>
  );
}

export default SkeletonCard;