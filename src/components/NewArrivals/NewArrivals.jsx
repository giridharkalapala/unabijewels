import { useEffect, useState } from "react";
import styles from "./NewArrivals.module.css";
import { supabase } from "../../lib/supabase";

function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("new_arrival", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setProducts(data);
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p>NEW ARRIVALS</p>
        <h2>Latest Jewellery</h2>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            {console.log("Image URL:", product.image)}

            <img
              src={
                product.image ||
                "https://via.placeholder.com/400x400?text=No+Image"
              }
              alt={product.name}
            />

            <div className={styles.info}>
              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

              <button>View Product</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;