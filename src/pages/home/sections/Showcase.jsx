import { useEffect, useState } from "react";
import { usePageMeta } from "../../../hooks/usePageMeta";
import { PAGE_METADATA } from "../../../constants/pageMetadata";
import { useSanity } from "../../../hooks/useSanity";
import { urlFor } from "../../../lib/urlFor";

const SHOWCASE_QUERY = `*[_type == "showcaseItem"] | order(displayOrder asc) {
  _id,
  title,
  description,
  badge,
  images,
  detailDescription,
  keyFeatures,
  commonUses
}`;

const ShowcaseSkeleton = () => (
  <div className="bg-gradient-to-b from-gray-50 to-white py-24 px-6 sm:px-8 lg:px-12">
    <div className="container mx-auto">
      <div className="text-center mb-20">
        <div className="h-10 w-72 bg-gray-200 rounded animate-pulse mx-auto mb-5"></div>
        <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse"></div>
            <div className="p-5">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Showcase = () => {
  usePageMeta(PAGE_METADATA.products.title, PAGE_METADATA.products.description);

  const { data: showcaseItems, loading } = useSanity(SHOWCASE_QUERY);
  const [selectedItem, setSelectedItem] = useState(null);
  const [animateItems, setAnimateItems] = useState(false);

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

    const details = {
      description:
        selectedItem.detailDescription || selectedItem.description || "",
      keyFeatures: selectedItem.keyFeatures || [],
      commonUses: selectedItem.commonUses || "",
    };

    const allImages = selectedItem.images || [];
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
                <div className="relative h-80 sm:h-[420px] rounded-lg overflow-hidden mb-4 bg-gray-100">
                  {currentImage && (
                    <img
                      src={urlFor(currentImage).width(800).url()}
                      alt={selectedItem.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                  {selectedItem.badge && (
                    <div className="absolute top-3 left-3 bg-brand-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      {selectedItem.badge}
                    </div>
                  )}
                </div>

                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedImageIndex === index
                            ? "ring-2 ring-brand-600 ring-offset-2"
                            : "ring-1 ring-gray-200 hover:ring-gray-400"
                        }`}
                      >
                        <img
                          src={urlFor(image).width(200).url()}
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

                {details.keyFeatures.length > 0 && (
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
                    className="w-full px-6 py-4 rounded-lg font-semibold bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg transition-all duration-300 text-lg"
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

  if (loading) return <ShowcaseSkeleton />;

  const items = showcaseItems || [];

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
          {items.map((item, index) => (
            <div
              key={item._id}
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
                {item.images?.[0] && (
                  <img
                    src={urlFor(item.images[0]).width(600).height(512).url()}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                )}
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    {item.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-center">
                    <span className="bg-brand-600 text-white px-5 py-2 rounded-lg font-medium shadow-lg">
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
                    className="text-brand-600 font-medium hover:text-brand-800 transition-colors"
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
          style={{ transitionDelay: `${items.length * 100 + 100}ms` }}
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
