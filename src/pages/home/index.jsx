import React from "react";
import Hero from "./sections/Hero";
import AboutProduct from "./sections/AboutProduct";
import AboutInnovator from "./sections/AboutInnovator";
import Showcase from "./sections/Showcase";
import Contact from "./sections/Contact";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutProduct />
      <Showcase />
      <AboutInnovator />

      <Contact />
    </div>
  );
};

export default Home;
