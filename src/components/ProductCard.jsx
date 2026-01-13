import { useState } from "react";
import { X } from "lucide-react"; // Close icon
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_METADATA } from "../constants/pageMetadata";

const ProductCard = ({ product }) => {
  usePageMeta(PAGE_METADATA.productCard.title, PAGE_METADATA.productCard.description);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Function to open the Quick View modal
  const openQuickView = () => {
    setIsQuickViewOpen(true);
  };

  // Function to close the Quick View modal
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <div className="relative group">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg shadow-md w-full h-auto object-cover"
      />

      {/* Quick View Button (Visible on Hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
        <button
          className="bg-white text-gray-900 py-2 px-5 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-50"
          onClick={openQuickView} // Open modal when clicked
        >
          Quick View
        </button>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[50%] p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={closeQuickView}
            >
              <X size={24} />
            </button>

            {/* Quick View Content */}
            <div className="flex flex-col md:flex-row items-center">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-amber-600 font-bold mt-2">
                  {/* ${product.price} */}
                </p>

                {/* View Full Product Button */}
                <button className="mt-4 bg-amber-600 text-white py-2 px-5 rounded-full hover:bg-amber-500">
                  View Full Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
