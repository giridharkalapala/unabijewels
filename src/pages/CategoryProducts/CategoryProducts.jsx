import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductCard from "../../components/ProductCard/ProductCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

import styles from "./CategoryProducts.module.css";

import {
  getProductsByCategorySlug,
} from "../../services/productService";

function CategoryProducts() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [slug]);

  async function loadProducts() {
    try {
      const data = await getProductsByCategorySlug(slug);

      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className={styles.products}>
        <div className={styles.grid}>
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <Breadcrumb
        title={category?.name || "Collection"}
        items={[
          { label: "Home", link: "/" },
          { label: "Collections", link: "/collections" },
          { label: category?.name },
        ]}
      />

      <section className={styles.products}>
        <div className={styles.heading}>
          <p>COLLECTION</p>

          <h1>{category?.name}</h1>

          <span>{category?.description}</span>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className={styles.emptyState}>
            <h2>No Products Found</h2>

            <p>
              There are currently no products available in this collection.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default CategoryProducts;