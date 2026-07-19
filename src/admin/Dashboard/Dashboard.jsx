import StatCard from "../components/StatCard/StatCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="stats">

        <StatCard title="Products" value="25" />
        <StatCard title="Categories" value="8" />
        <StatCard title="Gallery Images" value="42" />
        <StatCard title="Featured" value="12" />
        <StatCard title="New Arrivals" value="6" />
        <StatCard title="Testimonials" value="15" />

      </div>

      <div className="recent">

        <h2>Recent Activity</h2>

        <ul>
          <li>Added Rose Gold Ring</li>
          <li>Updated Homepage Hero</li>
          <li>Uploaded Gallery Image</li>
          <li>Updated Contact Details</li>
        </ul>

      </div>

    </div>
  );
}

export default Dashboard;