import styles from "./WhyChoose.module.css";

const features = [
  {
    icon: "💎",
    title: "Premium Quality",
    description: "Crafted with the finest materials and exceptional attention to detail."
  },
  {
    icon: "🛡️",
    title: "Certified Jewellery",
    description: "Every piece is quality checked and certified for authenticity."
  },
  {
    icon: "🚚",
    title: "Free Shipping",
    description: "Fast and secure delivery across India."
  },
  {
    icon: "❤️",
    title: "Customer Support",
    description: "Friendly support before and after every purchase."
  }
];

function WhyChoose() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>WHY CHOOSE US</p>
        <h2>Why Choose Unabi Jewels</h2>
      </div>

      <div className={styles.grid}>
        {features.map((item) => (
          <div key={item.title} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;