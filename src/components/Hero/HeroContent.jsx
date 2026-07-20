import HeroButtons from "./HeroButtons";

function HeroContent() {
  return (
    <div className="hero-content">

      <span className="hero-subtitle">
        Luxury Jewellery Collection
      </span>

      <h1>
        Timeless Jewellery
        <br />
        Crafted For You
      </h1>

      <p>
        Discover handcrafted jewellery designed to celebrate
        life's most beautiful moments with elegance and
        craftsmanship.
      </p>

      <HeroButtons />

    </div>
  );
}

export default HeroContent;