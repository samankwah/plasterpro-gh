import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import PlasterProVideo from "../../../assets/ouroffice.mp4";
import { useSanity } from "../../../hooks/useSanity";

const HERO_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  heroHeadline,
  heroSubtext,
  scrollingBanner
}`;

const DEFAULT_BANNER = [
  "BUILDING MATERIALS",
  "INTERIOR DESIGN",
  "POP CEILINGS",
  "LIGHTING SOLUTIONS",
  "WALL FIXTURES",
  "PLASTERPRO GHANA",
];

const Hero = () => {
  const controls = useAnimationControls();
  const { data: siteSettings } = useSanity(HERO_SETTINGS_QUERY);

  const bannerItems =
    siteSettings?.scrollingBanner?.length > 0
      ? siteSettings.scrollingBanner
      : DEFAULT_BANNER;
  const duplicatedBanner = [...bannerItems, ...bannerItems];

  const headline =
    siteSettings?.heroHeadline || "Elevate Your Space with PlasterPro Ghana";
  const subtext =
    siteSettings?.heroSubtext ||
    "Welcome to PlasterPro Ghana. Your number one home of quality ceiling products. Blending traditional craftsmanship with modern digital convenience.";

  useEffect(() => {
    const startSlideAnimation = async () => {
      await controls.start({
        x: [0, -1920],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    startSlideAnimation();
  }, [controls]);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-white pt-8 lg:pt-16">
      <div className="container mx-auto px-6 py-16">
        <ScrollToTopButton />
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left column - Text content */}
          <motion.div
            className="w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {headline}
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">{subtext}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="/product-catalog"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                Shop Now <ArrowRight size={16} />
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-gray-300 hover:border-blue-500 hover:text-blue-500 text-gray-700 font-medium rounded-md transition-colors duration-200"
              >
                Get a Quote
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-amber-500">★★★★★</div>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">
                  Trusted by homeowners & construction experts
                </span>{" "}
                across Ghana.
              </p>
            </div>
          </motion.div>

          {/* Right column - Hero video (stays local — too large for Sanity CDN) */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -z-10 w-4/5 h-4/5 top-8 right-0 bg-blue-200 rounded-lg"></div>
              <video
                src={PlasterProVideo}
                autoPlay
                loop
                muted
                playsInline
                className="relative z-10 rounded-lg shadow-md w-full h-auto object-cover"
              ></video>
            </div>
          </motion.div>
        </div>

        {/* Scrolling banner */}
        <motion.div
          className="mt-16 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-center text-gray-500 mb-4 text-sm font-medium">
            TRUSTED BY HOMEOWNERS & PROFESSIONALS
          </p>
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex items-center gap-16 whitespace-nowrap"
              animate={controls}
            >
              {duplicatedBanner.map((label, index) => (
                <div
                  key={`${label}-${index}`}
                  className="text-gray-400 font-bold px-8 flex-shrink-0"
                >
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
