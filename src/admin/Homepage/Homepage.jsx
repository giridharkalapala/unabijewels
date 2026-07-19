import Hero from "./Hero/Hero";
import FeaturedCollections from "./FeaturedCollections/FeaturedCollections";
import NewArrivals from "./NewArrivals/NewArrivals";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import HomepageSEO from "./HomepageSEO/HomepageSEO";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage-admin">
      <h1>Homepage Management</h1>

      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <WhyChooseUs />
      <HomepageSEO />
    </div>
  );
}

export default Homepage;