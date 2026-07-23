import Hero from "../../components/Hero/Hero";
import FeaturedCollections from "../../components/FeaturedCollections/FeaturedCollections";
import Categories from "../../components/Categories/Categories";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Instagram from "../../components/Instagram/Instagram";
// import Testimonials from "../../components/Testimonials/Testimonials";
import ContactCTA from "../../components/ContactCTA/ContactCTA";


function Home() {
  return (
    <>
      <Hero />

      <FeaturedCollections />
      <Categories />
      <NewArrivals />
      <WhyChoose />
      {/* <Testimonials /> */}
      <Instagram />
      <ContactCTA />
      
    </>
  );
}

export default Home;
