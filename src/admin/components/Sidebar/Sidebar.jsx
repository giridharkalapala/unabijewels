import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
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
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Unabi Admin</h2>

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
    </aside>
  );
}

export default Sidebar;