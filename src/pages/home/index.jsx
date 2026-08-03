import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
import { usePageMeta } from "../../hooks/usePageMeta";
import { PAGE_METADATA } from "../../constants/pageMetadata";

const Home = () => {
  usePageMeta(PAGE_METADATA.home.title, PAGE_METADATA.home.description, {
    noSuffix: true,
  });

  return (
    <div>
      <Hero />
      <Showcase />
    </div>
  );
};

export default Home;
