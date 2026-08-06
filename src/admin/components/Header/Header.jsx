import "./Header.css";
import { FaSyncAlt, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAdminProfile from "../../../hooks/useAdminProfile";

function Header() {
  const navigate = useNavigate();
  const { profile } = useAdminProfile();

  const [showMenu, setShowMenu] = useState(false);

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

        <h2>
          Welcome Back,{" "}
          <span className="admin-name">
            {profile?.full_name || "Admin"}
          </span>{" "}
          👋
        </h2>

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

        <div
          className="profile-menu"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src={
              profile?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile?.full_name || "Admin"
              )}`
            }
            alt="Admin"
            className="header-avatar"
          />

          <div className="profile-details">
            <strong>{profile?.full_name || "Admin"}</strong>
            <small>{profile?.email}</small>
          </div>

          {showMenu && (
            <div className="profile-dropdown">
              <button onClick={() => navigate("/admin/profile")}>
                <FaUserCircle />
                My Profile
              </button>

              <button onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;