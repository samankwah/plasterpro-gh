import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/home"));
const AboutProduct = lazy(() => import("./pages/home/sections/AboutProduct"));
const AboutInnovator = lazy(() =>
  import("./pages/home/sections/AboutInnovator"),
);
const Showcase = lazy(() => import("./pages/home/sections/Showcase"));
const Contact = lazy(() => import("./pages/home/sections/Contact"));
const Error = lazy(() => import("./components/Error"));
const ProductCatalog = lazy(() =>
  import("./pages/home/sections/ProductCatalog"),
);
const AboutInstallation = lazy(() =>
  import("./components/AboutInstallation"),
);
const MeetingRequest = lazy(() => import("./components/MeetingRequest "));
const ProjectsPage = lazy(() => import("./components/ProjectsPage"));
const BlogList = lazy(() =>
  import("./pages/home/sections/BlogPage").then((module) => ({
    default: module.BlogList,
  })),
);
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));

const PageLoader = () => (
  <div
    className="route-page-loader flex min-h-[50vh] items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
    <span className="sr-only">Loading page</span>
  </div>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <Navbar />
      <main className="route-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<AboutProduct />} />
            <Route path="/about-us" element={<AboutInnovator />} />
            <Route path="/products" element={<Showcase />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/installation" element={<AboutInstallation />} />
            <Route path="/product-catalog" element={<ProductCatalog />} />
            <Route path="/request-meeting" element={<MeetingRequest />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blogpage" element={<BlogList />} />
            <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
