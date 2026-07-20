import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import StatCard from "../components/StatCard/StatCard";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    gallery: 0,
    featured: 0,
    newArrivals: 0,
    testimonials: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
    fetchRecentProducts();
  }, []);

  async function fetchDashboardStats() {
    setLoading(true);

    try {
      const [
        productsResult,
        categoriesResult,
        featuredResult,
        newArrivalsResult,
        galleryResult,
        testimonialsResult,
      ] = await Promise.all([
        supabase
          .from("products")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("categories")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("featured", true),

        supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("new_arrival", true),

        supabase
          .from("gallery")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("testimonials")
          .select("*", { count: "exact", head: true }),
      ]);

      setStats({
        products: productsResult.count || 0,
        categories: categoriesResult.count || 0,
        featured: featuredResult.count || 0,
        newArrivals: newArrivalsResult.count || 0,
        gallery: galleryResult.count || 0,
        testimonials: testimonialsResult.count || 0,
      });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function fetchRecentProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);
    return;
  }

  setRecentProducts(data || []);
}

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="stats">

        <StatCard
          title="Products"
          value={loading ? "..." : stats.products}
        />

        <StatCard
          title="Categories"
          value={loading ? "..." : stats.categories}
        />

        <StatCard
          title="Gallery Images"
          value={loading ? "..." : stats.gallery}
        />

        <StatCard
          title="Featured"
          value={loading ? "..." : stats.featured}
        />

        <StatCard
          title="New Arrivals"
          value={loading ? "..." : stats.newArrivals}
        />

        <StatCard
          title="Testimonials"
          value={loading ? "..." : stats.testimonials}
        />

      </div>

      <div className="recent">

  <h2>Recent Products</h2>

  {recentProducts.length === 0 ? (

    <p>No products available.</p>

  ) : (

    <ul>

      {recentProducts.map((product) => (

        <li key={product.id}>

          🆕 <strong>{product.name}</strong>

          <br />

          <small>
            {new Date(product.created_at).toLocaleDateString()}
          </small>

        </li>

      ))}

    </ul>

  )}

</div>

    </div>
  );
}

export default Dashboard;