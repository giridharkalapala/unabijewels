import "./Header.css";
import { FaSyncAlt } from "react-icons/fa";

function Header() {
  function refreshPage() {
    window.location.reload();
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
      </div>
    </header>
  );
}

export default Header;