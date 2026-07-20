import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import "./MobileMenu.css";
import logo from "../../assets/images/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Collections", path: "/collections" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function MobileMenu({ open, onClose }) {
  return (
    <>
      <div
        className={`mobile-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`mobile-menu ${open ? "open" : ""}`}>

        <div className="mobile-header">

          <NavLink to="/" className="logo">
                    <img src={logo} alt="Unabi Jewels" />
                  </NavLink>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <RxCross2 />
          </button>

        </div>

        <nav>

          {navLinks.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "mobile-link active" : "mobile-link"
              }
            >
              {item.name}
            </NavLink>

          ))}

        </nav>

      </aside>
    </>
  );
}

export default MobileMenu;