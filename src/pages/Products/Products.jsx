import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";

const products = [
  {
    id: 1,
    name: "Rose Gold Ring",
    category: "Rings",
    image: "https://via.placeholder.com/400x500?text=Rose+Gold+Ring",
  },
  {
    id: 2,
    name: "Diamond Necklace",
    category: "Necklaces",
    image: "https://via.placeholder.com/400x500?text=Diamond+Necklace",
  },
  {
    id: 3,
    name: "Pearl Earrings",
    category: "Earrings",
    image: "https://via.placeholder.com/400x500?text=Pearl+Earrings",
  },
  {
    id: 4,
    name: "Gold Bracelet",
    category: "Bracelets",
    image: "https://via.placeholder.com/400x500?text=Gold+Bracelet",
  },
];

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className={styles.products}>
      <div className={styles.heading}>
        <p>OUR COLLECTION</p>
        <h1>Jewellery Collection</h1>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search jewellery..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      {/* Category Filter */}
      <div className={styles.filters}>
        {["All", "Rings", "Necklaces", "Earrings", "Bracelets"].map((item) => (
          <button
            key={item}
            className={category === item ? styles.active : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <div className={styles.card} key={product.id}>
            <img src={product.image} alt={product.name} />

            <div className={styles.info}>
              <span>{product.category}</span>

              <h3>{product.name}</h3>

              <Link
                to={`/products/${product.id}`}
                className={styles.button}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className={styles.noResults}>No products found.</p>
        )}
      </div>
    </section>
  );
}

export default Products;