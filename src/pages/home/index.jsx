import React from "react";
import Hero from "./sections/Hero";
import AboutProduct from "./sections/AboutProduct";
import AboutInnovator from "./sections/AboutInnovator";
import Showcase from "./sections/Showcase";
import Contact from "./sections/Contact";
import { usePageMeta } from "../../hooks/usePageMeta";
import { PAGE_METADATA } from "../../constants/pageMetadata";

const Home = () => {
  usePageMeta(
    PAGE_METADATA.home.title,
    PAGE_METADATA.home.description,
    { noSuffix: true }
  );

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
