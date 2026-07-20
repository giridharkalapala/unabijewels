import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <HeroContent />
      </div>

      <ScrollIndicator />
    </section>
  );
}

export default Hero;