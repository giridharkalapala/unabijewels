import { NavLink } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import "./Navbar.css";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/images/logo.png";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {

    function handleScroll() {

      setIsScrolled(window.scrollY > 80);

    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  useEffect(() => {

    document.body.style.overflow =
      menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [menuOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={
        isScrolled
          ? "navbar navbar-scrolled"
          : "navbar"
      }
    >
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="container navbar-container">

        {/* Logo */}

        <NavLink to="/" className="logo">
          <img src={logo} alt="Unabi Jewels" />
        </NavLink>

        {/* Desktop Navigation */}

        <nav className="nav-links">

          {navLinks.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.name}
            </NavLink>

          ))}

        </nav>

        {/* Mobile Button */}

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <HiOutlineBars3 />
        </button>

      </div>

    </header>
  );
}

export default Navbar;