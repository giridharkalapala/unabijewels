import Hero from "../../components/Hero/Hero";
import FeaturedCollections from "../../components/FeaturedCollections/FeaturedCollections";
import Categories from "../../components/Categories/Categories";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import WhyChoose from "../../components/WhyChoose/WhyChoose";

function Home() {
  return (
    <>
      <Hero />

      <FeaturedCollections />
      <Categories />
      <NewArrivals />
      <WhyChoose />
    </>
  );
}

export default Home;