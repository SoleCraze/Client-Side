import React from "react";
import Newsletter from "../../components/newsletter/newsletter";
import Products from "../../components/products/products";
import HeroSection from "../../components/hero/hero";
import Brands from "../../components/brands/brands";
import AboutSection from "../../components/aboutSection/aboutSection";
import Testimonials from "../../components/testimonials/testimonials";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Brands />
      <Products/>
      <AboutSection />
      <Testimonials/>
    </div>
  );
};

export default Home;
