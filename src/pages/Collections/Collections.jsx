import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import styles from "./Collections.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import {
  getAllProducts,
  getAllCategories,
} from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";

function Collections() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    setVisibleProducts(8);
  }, [search, category]);

  useEffect(() => {
    if (!initialCategory || categories.length === 0) return;

    const selected = categories.find((cat) => cat.slug === initialCategory);

    if (selected) {
      setCategory(selected.name);
    }
  }, [initialCategory, categories]);

  if (loading) {
    return (
      <>
        <Breadcrumb
          title="Our Collection"
          items={[{ label: "Home", link: "/" }, { label: "Collections" }]}
        />

        <section className={styles.products}>
          <div className={styles.grid}>
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </section>
      </>
    );
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        category === "All" || product.categories?.name === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "A-Z":
          return a.name.localeCompare(b.name);

        case "Z-A":
          return b.name.localeCompare(a.name);

        case "Newest":
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });


  return (
    <>
      <Breadcrumb
        title="Our Collection"
        items={[{ label: "Home", link: "/" }, { label: "Collections" }]}
      />

      <section className={styles.products}>
        <div className={styles.heading}>
          <p>OUR COLLECTION</p>
          <h1>Jewellery Collection</h1>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search jewellery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.toolbarRight}>
            <span className={styles.productCount}>
              Showing {Math.min(visibleProducts, filteredProducts.length)} of{" "}
              {filteredProducts.length} Products
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option>Newest</option>
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
        </div>

        {/* Dynamic Category Filter */}
        <div className={styles.filters}>
          {[{ id: 0, name: "All" }, ...categories].map((item) => (
            <button
              key={item.id}
              className={category === item.name ? styles.active : ""}
              onClick={() => setCategory(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💎</div>

            <h2>No Jewellery Found</h2>

            <p>
              We couldn't find any jewellery matching your search. Try another
              category or search term.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {filteredProducts.length > visibleProducts && (
          <div className={styles.loadMoreWrapper}>
            <button
              className={styles.loadMoreButton}
              onClick={() => setVisibleProducts((prev) => prev + 8)}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Collections;
