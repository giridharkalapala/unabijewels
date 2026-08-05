import "./Header.css";
import { FaSyncAlt } from "react-icons/fa";
import { logout } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload();
  }

  async function handleLogout() {
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  }

  return (
    <header className="admin-header">
      <div className="header-left">
        <span className="header-subtitle">ADMIN PANEL</span>

        <h2>Welcome Back 👋</h2>

        <p>Manage your jewellery store from one place.</p>
      </div>

      <div className="header-right">
        <span className="today">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

        <button className="refresh-btn" onClick={refreshPage}>
          <FaSyncAlt />
          Refresh
        </button>

        <div className="profile">Admin</div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;