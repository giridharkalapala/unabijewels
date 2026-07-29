import { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  FaGem,
  FaTags,
  FaImages,
  FaStar,
  FaFire,
  FaCommentDots,
  FaSyncAlt,
} from "react-icons/fa";
import StatCard from "../components/StatCard/StatCard";
import QuickActions from "../components/QuickActions/QuickActions";
import RecentEnquiries from "../components/RecentEnquiries/RecentEnquiries";
import {
  getDashboardStats,
  getRecentProducts,
  getRecentEnquiries,
} from "../../services/dashboardService";
import DashboardCharts from "../components/DashboardCharts/DashboardCharts";

function refreshDashboard() {
  loadDashboard();
}

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    gallery: 0,
    featured: 0,
    newArrivals: 0,
    testimonials: 0,
  });

  const [recentProducts, setRecentProducts] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [statsData, productsData, enquiriesData] = await Promise.all([
        getDashboardStats(),
        getRecentProducts(),
        getRecentEnquiries(),
      ]);

      setStats(statsData);
      setRecentProducts(productsData);
      setRecentEnquiries(enquiriesData);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats">
        <StatCard
          title="Products"
          value={loading ? "..." : stats.products}
          icon={<FaGem />}
          color="#C98F7B"
        />

        <StatCard
          title="Categories"
          value={loading ? "..." : stats.categories}
          icon={<FaTags />}
          color="#5B8DEF"
        />

        <StatCard
          title="Gallery"
          value={loading ? "..." : stats.gallery}
          icon={<FaImages />}
          color="#38B27F"
        />

        <StatCard
          title="Featured"
          value={loading ? "..." : stats.featured}
          icon={<FaStar />}
          color="#F6B100"
        />

        <StatCard
          title="New Arrivals"
          value={loading ? "..." : stats.newArrivals}
          icon={<FaFire />}
          color="#FF6B6B"
        />

        <StatCard
          title="Testimonials"
          value={loading ? "..." : stats.testimonials}
          icon={<FaCommentDots />}
          color="#8B5CF6"
        />
      </div>

      <QuickActions />

      <DashboardCharts />

      <RecentEnquiries enquiries={recentEnquiries} />

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
