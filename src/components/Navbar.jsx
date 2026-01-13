import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LogoWhite from "../assets/plasterpro-high-resolution-logo-transparent-white.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Navbar menu items
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about-us" },
    { name: "Products", link: "/products" },
    { name: "Services", link: "/services" },
    { name: "Blog", link: "/blogpage" },
    { name: "Contact", link: "/contact" },
  ];

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 w-full flex justify-center z-50 px-4 pt-4">
      <nav
        className={`container w-full rounded-full transition-all duration-500
        ${
          scrolled
            ? "bg-gradient-to-r from-blue-900 to-blue-800 py-2 shadow-lg"
            : "bg-gradient-to-r from-blue-950 to-blue-900 py-3 bg-opacity-95 backdrop-blur-md"
        }`}
      >
        <div className="flex justify-between items-center px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={LogoWhite}
              alt="PlasterPro Logo"
              className="h-11 transform hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-8 mr-6">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className={`transition-colors relative text-white text-base ${
                      isActive(item.link)
                        ? "font-semibold text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-full after:h-1 after:bg-white after:rounded-full"
                        : "hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Shop Now Button */}
            {/* <Link
              to="https://paystack.shop/plasterpro-gha"
              className="flex items-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300"
            >
              <ShoppingBag size={18} className="mr-2" />
              Shop Now
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 rounded-lg bg-blue-800 hover:bg-blue-700 text-white transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-full left-0 right-0 mx-auto mt-2 w-full max-w-5xl bg-gradient-to-b from-blue-900 to-blue-950 py-4 shadow-lg rounded-2xl md:hidden animate-fadeIn"
          >
            <ul className="flex flex-col space-y-2 px-6">
              {navLinks.map((item) => (
                <li
                  key={item.name}
                  className="border-b border-blue-800 pb-2 last:border-0"
                >
                  <Link
                    to={item.link}
                    className={`block py-2 px-3 rounded transition-colors duration-300 ${
                      isActive(item.link)
                        ? "font-bold text-white bg-blue-800 bg-opacity-50"
                        : "text-gray-200 hover:bg-blue-800 hover:bg-opacity-30 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Shop Now Button for Mobile */}
              <li className="pt-2">
                <Link
                  to=""
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Shop Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
