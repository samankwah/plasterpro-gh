import { useEffect, useState } from "react";
import { usePageMeta } from "../../../hooks/usePageMeta";
import { PAGE_METADATA } from "../../../constants/pageMetadata";

// Import local images
import ceiling1 from "../../../assets/ceiling1.jpg";
import ceiling2 from "../../../assets/ceiling2.jpg";
import ceiling3 from "../../../assets/ceiling3.jpg";
import ceiling4 from "../../../assets/ceiling4.jpg";
import popbucket from "../../../assets/popbucket.jpg";
import lighting1 from "../../../assets/lighting1.jpg";
import lighting2 from "../../../assets/lighting2.jpg";
import lighting3 from "../../../assets/lighting3.jpg";
import lighting4 from "../../../assets/lighting4.jpg";
import basement from "../../../assets/basement.jpeg";
import roomdeco from "../../../assets/roomdeco.jpg";
import roomdeco1 from "../../../assets/roomdeco1.jpg";
import curtains from "../../../assets/curtains.jpg";
import poptruck from "../../../assets/poptruck.jpg";
import kitchenInterior from "../../../assets/kitchenInterior.jpg";
import roomcurtains from "../../../assets/room curtains.jpeg";
import pop1 from "../../../assets/pop1.jpg";
import outdoorinetrior from "../../../assets/outdoorinetrior.jpg";
import popwindow from "../../../assets/pop window.jpeg";
import wwallangle from "../../../assets/wwallangle.jpg";
import drywallscrews from "../../../assets/drywallscrews.jpg";

const Showcase = () => {
  usePageMeta(PAGE_METADATA.products.title, PAGE_METADATA.products.description);

  const [selectedItem, setSelectedItem] = useState(null);
  const [animateItems, setAnimateItems] = useState(false);

  const productDetails = {
    "POP Cement (Plaster of Paris Cement)": {
      description:
        "Plaster of Paris (POP) Cement is a fine, white powder derived from gypsum (calcium sulfate dihydrate), which, when mixed with water, forms a quick-setting paste that hardens over time. It is widely used for ceiling molding, wall coatings, false ceilings, and decorative elements.",
      keyFeatures: [
        "Smooth Finish – Ideal for interior walls and ceilings.",
        "Fast Drying – Sets in 10-15 minutes, fully cures within 24 hours.",
        "Lightweight & Crack-Resistant – Reduces surface shrinkage.",
        "Fire-Resistant & Non-Toxic – Enhances safety in buildings.",
      ],
      commonUses:
        "False ceilings, wall decorations, cornices, medallions, and molding designs.",
    },
    "Plasterboard (Gypsum Board / Drywall)": {
      description:
        "Plasterboard, also called drywall or gypsum board, is a sandwich-like panel consisting of a gypsum core pressed between two sheets of paper or fiberglass. It is commonly used for partition walls, ceilings, and wall linings.",
      keyFeatures: [
        "Quick & Easy Installation – Reduces construction time.",
        "Smooth, Paintable Surface – Ideal for finishing.",
        "Fire-Resistant & Soundproofing Capabilities – Improves safety and acoustics.",
        "Moisture-Resistant Options Available – Perfect for bathrooms & kitchens.",
      ],
      commonUses:
        "Wall partitions, false ceilings, and commercial & residential interiors.",
    },
    "Fiber Ceiling Boards": {
      description:
        "Fiber ceiling boards are made of compressed mineral fibers, which provide excellent acoustic insulation, fire resistance, and durability. They are ideal for commercial and office ceilings.",
      keyFeatures: [
        "Durable & Moisture-Resistant – Great for humid environments.",
        "Excellent Acoustic Performance – Reduces noise pollution.",
        "Fire-Resistant – Enhances safety in buildings.",
        "Eco-Friendly – Made with natural & recycled materials.",
      ],
      commonUses:
        "Suspended ceilings in offices, schools, hospitals, and shopping malls.",
    },
    "Home Charm Paints": {
      description:
        "Home Charm Paints are premium-quality wall coatings designed to provide long-lasting color, smooth finishes, and protection against environmental damage.",
      keyFeatures: [
        "Vibrant, Long-Lasting Colors – Fade-resistant technology.",
        "Easy to Apply & Quick Drying – Low maintenance and hassle-free.",
        "Washable & Stain-Resistant – Great for high-traffic areas.",
        "Low VOC (Volatile Organic Compounds) – Eco-friendly and non-toxic.",
      ],
      commonUses:
        "Interior & exterior walls, ceilings, trims, and decorative finishes.",
    },
    "Metallic Channels": {
      description:
        "Metallic channels are galvanized steel or aluminum profiles used for suspending ceilings, holding ceiling boards, and supporting gypsum or fiber ceiling panels.",
      keyFeatures: [
        "High Strength & Load-Bearing Capacity – Supports heavy ceiling materials.",
        "Rust & Corrosion Resistant – Long-lasting durability.",
        "Lightweight & Easy to Install – Saves time in ceiling setup.",
      ],
      commonUses:
        "False ceilings, gypsum ceiling grids, and office ceiling structures.",
    },
    "Acoustic Ceilings": {
      description:
        "Acoustic ceilings are sound-absorbing panels designed to reduce noise levels in commercial, residential, and industrial spaces.",
      keyFeatures: [
        "Superior Sound Absorption – Reduces echoes & noise pollution.",
        "Fire-Resistant & Lightweight – Enhances safety.",
        "Moisture-Resistant Coating – Prevents mold growth.",
      ],
      commonUses:
        "Offices, recording studios, conference rooms, restaurants, and homes.",
    },
    "Decorative Panels": {
      description:
        "Decorative panels are artistic, textured panels used to enhance wall and ceiling aesthetics. They come in various patterns, textures, and finishes.",
      keyFeatures: [
        "Visually Appealing & Luxurious Designs – Elevates interior décor.",
        "Durable & Impact-Resistant – Long-lasting beauty.",
        "Moisture & Fire-Resistant Options Available – Suitable for various environments.",
      ],
      commonUses:
        "Feature walls, luxury ceilings, hotel lobbies, and interior design accents.",
    },
    "Room Lighting Solutions": {
      description:
        "Professional lighting solutions designed to enhance the ambiance and functionality of any space. Our options include modern fixtures for both aesthetic appeal and practical illumination.",
      keyFeatures: [
        "Energy-Efficient Designs – Reduces electricity consumption.",
        "Customizable Brightness – Adjustable to suit different needs.",
        "Modern Aesthetics – Enhances interior design.",
        "Professional Installation – Ensures safety and optimal positioning.",
      ],
      commonUses:
        "Living rooms, offices, kitchens, showrooms, and commercial spaces.",
    },
    "Hardware Installation Services": {
      description:
        "Professional installation services for all types of building hardware components. Our experienced team ensures proper fitting and functionality.",
      keyFeatures: [
        "Expert Technicians – Trained in industry best practices.",
        "Quality Assurance – Rigorous testing after installation.",
        "Time-Efficient – Minimizes disruption to your space.",
        "Comprehensive Service – Handles all hardware types.",
      ],
      commonUses:
        "Ceiling frames, wall brackets, electrical fittings, doors and windows hardware.",
    },
    "Repairs & Maintenance": {
      description:
        "Complete repair and maintenance services to keep your property in pristine condition. We handle all aspects of ceiling, wall, and lighting maintenance.",
      keyFeatures: [
        "Prompt Response – Quick attention to urgent issues.",
        "Preventative Care – Identifies potential problems early.",
        "Skilled Technicians – Experienced in various repair types.",
        "Quality Materials – Uses only industry-approved products.",
      ],
      commonUses:
        "Damaged ceilings, wall cracks, lighting issues, routine maintenance checks.",
    },
  };

  const showcaseItems = [
    {
      title: "POP Cement (Plaster of Paris Cement)",
      description:
        "High-quality Plaster of Paris (POP) ceiling designs for modern homes and offices. Enhances aesthetics and improves interior ambiance.",
      images: [ceiling1, ceiling2, ceiling3, ceiling4],
      badge: "Best Seller",
    },
    {
      title: "Room Lighting Solutions",
      description:
        "Professional installation of stylish and energy-efficient lighting for residential and commercial spaces.",
      images: [lighting1, lighting2, lighting3, lighting4],
      badge: "New",
    },
    {
      title: "Hardware Installation Services",
      description:
        "Expert installation of various building hardware, including ceiling frames, wall brackets, and electrical fittings.",
      images: [roomdeco1, roomdeco, curtains, popwindow],
      badge: "Premium",
    },
    {
      title: "Repairs & Maintenance",
      description:
        "Reliable repairs and maintenance services for ceilings, walls, and lighting fixtures to keep your space in top condition.",
      images: [poptruck, ceiling1, drywallscrews, wwallangle],
      badge: "Community",
    },
    {
      title: "Plasterboard (Gypsum Board / Drywall)",
      description:
        "Sandwich-like panels with a gypsum core for partition walls, ceilings, and wall linings. Easy to install with excellent finishing properties.",
      images: [popbucket, pop1],
      badge: "Versatile",
    },
    {
      title: "Fiber Ceiling Boards",
      description:
        "Compressed mineral fiber boards providing acoustic insulation, fire resistance, and durability for commercial and office ceilings.",
      images: [ceiling2, ceiling3, roomcurtains],
      badge: "Commercial",
    },
    {
      title: "Home Charm Paints",
      description:
        "Premium wall coatings with long-lasting color, smooth finishes, and protection against environmental damage.",
      images: [
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=500",
      ],
      badge: "Eco-Friendly",
    },
    {
      title: "Decorative Panels",
      description:
        "Artistic, textured 3D panels to enhance wall and ceiling aesthetics with various patterns, textures, and finishes.",
      images: [kitchenInterior, outdoorinetrior, basement],
      badge: "Luxury",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedItem]);

  const QuickViewModal = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const details = productDetails[selectedItem.title] || {
      description: selectedItem.description,
      keyFeatures: [],
      commonUses: "",
    };

    // Get all images (either from images array or single imageUrl)
    const allImages = selectedItem.images || [selectedItem.imageUrl];
    const currentImage = allImages[selectedImageIndex];

    return (
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
        onClick={() => setSelectedItem(null)}
      >
        <div
          className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 sm:p-8">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors text-2xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden mb-4">
                  <img
                    src={currentImage}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedItem.badge && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      {selectedItem.badge}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedImageIndex === index
                            ? "ring-2 ring-blue-600 ring-offset-2"
                            : "ring-1 ring-gray-200 hover:ring-gray-400"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedItem.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedItem.title}
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm uppercase text-gray-500 font-semibold mb-2">
                    Description
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {details.description}
                  </p>
                </div>

                {details.keyFeatures && details.keyFeatures.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm uppercase text-gray-500 font-semibold mb-2">
                      Key Features
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {details.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {details.commonUses && (
                  <div className="mb-6">
                    <h4 className="text-sm uppercase text-gray-500 font-semibold mb-2">
                      Common Uses
                    </h4>
                    <p className="text-gray-700">{details.commonUses}</p>
                  </div>
                )}

                <div className="mt-8">
                  <button
                    onClick={() => {
                      window.open(
                        "https://wa.me/233249718356?text=Hi%2C%20I%27m%20interested%20in%20" +
                          encodeURIComponent(selectedItem.title),
                        "_blank"
                      );
                    }}
                    className="w-full px-6 py-4 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition-all duration-300 text-lg"
                  >
                    Contact Us for Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Featured Services
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Discover top-quality ceiling installations, lighting solutions, and
            maintenance services tailored for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-500 transform ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="relative h-64 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.images ? item.images[0] : item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    {item.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-center">
                    <span className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow-lg">
                      Quick View
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && <QuickViewModal />}

        <div
          className={`text-center mt-16 transition-all duration-500 ${
            animateItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${showcaseItems.length * 100 + 100}ms` }}
        >
          <a
            href="/product-catalog"
            className="inline-flex items-center gap-2 py-3 px-8 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-300"
            aria-label="View all products"
          >
            View All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
