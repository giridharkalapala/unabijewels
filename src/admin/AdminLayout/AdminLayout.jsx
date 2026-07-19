import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <Header />

        <div className="admin-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;