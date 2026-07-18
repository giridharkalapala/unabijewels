import { Link, NavLink } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>

        <Link to="/" className={styles.logo}>
          <span className={styles.logoBlack}>UNABI</span>
          <span className={styles.logoGold}> JEWELS</span>
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/collections"
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            Collections
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? styles.active : ""
            }
          >
            Contact
          </NavLink>
        </nav>

        <button className={styles.search}>
          <HiOutlineMagnifyingGlass />
        </button>

      </div>
    </header>
  );
}

export default Navbar;