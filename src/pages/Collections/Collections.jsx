import styles from "./Collections.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const products = [
  {
    id: 1,
    name: "Rose Gold Ring",
    category: "Rings",
    price: "₹3,499",
    image: "https://via.placeholder.com/400x450?text=Ring",
  },
  {
    id: 2,
    name: "Diamond Necklace",
    category: "Necklaces",
    price: "₹12,999",
    image: "https://via.placeholder.com/400x450?text=Necklace",
  },
  {
    id: 3,
    name: "Pearl Earrings",
    category: "Earrings",
    price: "₹2,799",
    image: "https://via.placeholder.com/400x450?text=Earrings",
  },
];

function Collections() {
  return (
    <>
      <Breadcrumb
        title="Our Collection"
        items={[{ label: "Home", link: "/" }, { label: "Collections" }]}
      />
      <section className={styles.collections}>
        <div className={styles.heading}>
          <p>OUR COLLECTIONS</p>
          <h1>Discover Timeless Jewellery</h1>
        </div>

        <div className={styles.filters}>
          <button>All</button>
          <button>Rings</button>
          <button>Necklaces</button>
          <button>Earrings</button>
          <button>Bangles</button>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.name} />

              <div className={styles.info}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>

                <button>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Collections;
