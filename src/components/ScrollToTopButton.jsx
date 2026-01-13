// import React, { useState, useEffect } from "react";
// import { ChevronUp, MessageCircle } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";

// const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   // Show button when page is scrolled down
//   const toggleVisibility = () => {
//     if (window.pageYOffset > 300) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   // Scroll to top function
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // Open WhatsApp with a pre-filled message
//   const openWhatsApp = () => {
//     const phoneNumber = "1234567890"; // Replace with the innovator's WhatsApp number
//     const message = "Hello, I would like to get in touch with you."; // Optional pre-filled message
//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(url, "_blank");
//   };

//   // Add scroll event listener
//   useEffect(() => {
//     window.addEventListener("scroll", toggleVisibility);
//     return () => {
//       window.removeEventListener("scroll", toggleVisibility);
//     };
//   }, []);

//   return (
//     <>
//       {isVisible && (
//         <div className="fixed bottom-6 right-8 z-50 flex flex-row space-6 gap-2">
//           {/* WhatsApp Button */}
//           <button
//             onClick={openWhatsApp}
//             className="bg-green-500 text-white p-3 rounded-sm shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
//             aria-label="Contact on WhatsApp"
//           >
//             <FaWhatsapp size={28} />
//           </button>

//           {/* Scroll to Top Button */}
//           <button
//             onClick={scrollToTop}
//             className="bg-gray-300 text-white p-3 rounded-sm shadow-lg hover:bg-gray-400 transition-all duration-300 ease-in-out"
//             aria-label="Scroll to top"
//           >
//             <ChevronUp size={28} />
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default ScrollToTopButton;

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button only when scrolled down
  const toggleScrollTopVisibility = () => {
    if (window.pageYOffset > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Open WhatsApp with a pre-filled message
  const openWhatsApp = () => {
    const phoneNumber = "233249718356"; // PlasterPro WhatsApp number
    const message = "Hello, I would like to get in touch with you.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleScrollTopVisibility);
    return () => {
      window.removeEventListener("scroll", toggleScrollTopVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 md:right-8 z-50 flex flex-col gap-3">
      {/* WhatsApp Button - Always Visible */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300 ease-in-out group relative"
        aria-label="Contact on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 md:w-7 md:h-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us
        </span>
      </button>

      {/* Scroll to Top Button - Visible after scrolling */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 ease-in-out animate-fade-in group relative"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 md:w-7 md:h-7" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Back to top
          </span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
