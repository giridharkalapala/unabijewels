import { Link } from "react-router-dom";

function HeroButtons() {
  return (
    <div className="hero-buttons">

      <Link
        to="/collections"
        className="btn-primary"
      >
        Explore Collection
      </Link>

      <Link
        to="/contact"
        className="btn-secondary"
      >
        Contact Us
      </Link>

    </div>
  );
}

export default HeroButtons;