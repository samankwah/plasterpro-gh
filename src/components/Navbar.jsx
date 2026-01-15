import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingBag, Home, Info, Package, Briefcase, BookOpen, Mail, ChevronRight } from "lucide-react";
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
    { name: "Home", link: "/", icon: Home },
    { name: "About", link: "/about-us", icon: Info },
    { name: "Products", link: "/products", icon: Package },
    { name: "Services", link: "/services", icon: Briefcase },
    { name: "Blog", link: "/blogpage", icon: BookOpen },
    { name: "Contact", link: "/contact", icon: Mail },
  ];

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className={`fixed top-0 w-full flex justify-center px-4 pt-4 ${isOpen ? 'z-[80]' : 'z-[100]'}`}>
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
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[110] md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl md:hidden z-[120] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
          <img
            src={LogoWhite}
            alt="PlasterPro Logo"
            className="h-10"
          />
        </div>

        {/* Menu Items */}
        <ul className="py-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 170px)" }}>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                    isActive(item.link)
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Menu Footer with CTA */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200">
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full"
            onClick={() => setIsOpen(false)}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
