import styles from "./WhyChoose.module.css";
import { Gem, ShieldCheck, Sparkles, Headset } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Premium Craftsmanship",
    description:
      "Every jewellery piece is carefully crafted with exceptional attention to detail and timeless elegance.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    description:
      "Carefully selected materials and strict quality standards ensure lasting beauty and trusted authenticity.",
  },
  {
    icon: Sparkles,
    title: "Elegant Designs",
    description:
      "From traditional to contemporary collections, discover jewellery designed for every occasion.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "Our team is always ready to help you before and after your purchase with friendly assistance.",
  },
];

function WhyChoose() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span className={styles.tag}>WHY CHOOSE UNABI</span>

        <h2>
          Crafted with Passion,
          <br />
          Designed for Elegance
        </h2>

        <p className={styles.subtitle}>
          Experience timeless jewellery made with premium craftsmanship, quality
          materials, and attention to every detail.
        </p>
      </div>

      <div className={styles.grid}>
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className={styles.iconWrapper}>
                <Icon size={34} strokeWidth={1.8} />
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.stats}>
        <div>
          <h3>500+</h3>
          <p>Unique Designs</p>
        </div>

        <div>
          <h3>100%</h3>
          <p>Quality Checked</p>
        </div>

        <div>
          <h3>5K+</h3>
          <p>Happy Customers</p>
        </div>

        <div>
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
