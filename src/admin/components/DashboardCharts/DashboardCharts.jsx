import ProductsChart from "./ProductsChart";
import CategoriesChart from "./CategoriesChart";
import EnquiriesChart from "./EnquiriesChart";

import "./DashboardCharts.css";

function DashboardCharts() {
  return (
    <section className="dashboard-charts">
      <div className="section-header">
        <span className="section-subtitle">ANALYTICS</span>

        <h2>Business Insights</h2>

        <p>
          Monitor your products, customer enquiries, and category distribution
          with real-time analytics.
        </p>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>📦 Monthly Products</h3>

          <ProductsChart />
        </div>

        <div className="chart-card">
          <h3>💎 Products by Category</h3>

          <CategoriesChart />
        </div>
      </div>

      <div className="chart-card full-chart">
        <h3>📈 Monthly Enquiries</h3>

        <EnquiriesChart />
      </div>
    </section>
  );
}

export default DashboardCharts;