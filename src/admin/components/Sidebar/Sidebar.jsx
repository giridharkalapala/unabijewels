import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../assets/images/logo.png";
// import useAdminProfile from "../../../hooks/useAdminProfile";

function Sidebar() {
  // const { profile, loading } = useAdminProfile();
  const menus = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Homepage", path: "/admin/homepage" },
    { name: "Products", path: "/admin/products" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Gallery", path: "/admin/gallery" },
    { name: "Testimonials", path: "/admin/testimonials" },
    { name: "Enquiries", path: "/admin/enquiries" },
    { name: "Contact", path: "/admin/contact" },
    { name: "Site Settings", path: "/admin/settings" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Trash", path: "/admin/products/trash" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <img src={logo} alt="UNabi Jewels" className="logo-img" />

        <div className="logo-text">
          <h2>UNabi</h2>
          <p>Admin Panel</p>
        </div>
      </div>

      <nav>
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">Version 1.0</div>
    </aside>
  );
}

export default Sidebar;
