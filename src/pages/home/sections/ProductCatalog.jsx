import { useState, useMemo } from "react";
import {
  Search,
  Grid,
  List,
  X,
  ChevronRight,
  Filter,
  Star,
  Eye,
} from "lucide-react";

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
import roomdeco from "../../../assets/roomdeco.jpg";
import roomdeco1 from "../../../assets/roomdeco1.jpg";
import curtains from "../../../assets/curtains.jpg";
import poptruck from "../../../assets/poptruck.jpg";
import kitchenInterior from "../../../assets/kitchenInterior.jpg";
import galvanisedprofiles from "../../../assets/galvanisedprofiles.jpg";
import pop1 from "../../../assets/pop1.jpg";
import outdoorinetrior from "../../../assets/outdoorinetrior.jpg";
import tappingscrew from "../../../assets/tappingscrew.jpg";
import tappingscrew2 from "../../../assets/tappingscrew2.jpeg";
import wwallangle from "../../../assets/wwallangle.jpg";
import drywallscrews from "../../../assets/drywallscrews.jpg";

// Sample product images (replace with actual imports)
const sampleProducts = [
  {
    id: 1,
    title: "POP Ceiling Installation",
    description:
      "High-quality Plaster of Paris (POP) ceiling designs for modern homes and offices.",
    images: [ceiling1, ceiling2, ceiling3, ceiling4],
    category: "Ceilings",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Room Lighting Solutions",
    description:
      "Professional installation of stylish and energy-efficient lighting for interiors.",
    images: [lighting1, lighting2, lighting3, lighting4],
    category: "Lighting",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Tapping Screws",
    description:
      "Durable tapping screws for securing metal and wood surfaces with precision.",
    images: [tappingscrew, drywallscrews, wwallangle, galvanisedprofiles],
    category: "Hardware",
    rating: 4.3,
  },
  {
    id: 4,
    title: "Drywall Screws",
    description:
      "Reliable drywall screws for securing plasterboard installations with ease.",
    images: [drywallscrews, tappingscrew, tappingscrew2],
    category: "Hardware",
    rating: 4.7,
  },
  {
    id: 5,
    title: "Wall Angle Brackets",
    description:
      "Premium wall angle brackets for strong and lasting interior structures.",
    images: [wwallangle, galvanisedprofiles, tappingscrew],
    category: "Hardware",
    rating: 4.5,
  },
  {
    id: 6,
    title: "Galvanized Profiles",
    description:
      "Corrosion-resistant galvanized profiles for durable ceiling and wall support.",
    images: [galvanisedprofiles, wwallangle, ceiling2, ceiling3],
    category: "Profiles",
    rating: 4.9,
  },
  {
    id: 7,
    title: "Hardware Installation Services",
    description:
      "Expert installation of various building hardware for residential and commercial spaces.",
    images: [roomdeco1, roomdeco, curtains, tappingscrew],
    category: "Services",
    rating: 5.0,
  },
  {
    id: 8,
    title: "Repairs & Maintenance",
    description:
      "Professional repair and maintenance services for ceilings, walls, and lighting fixtures.",
    images: [poptruck, ceiling1, drywallscrews, wwallangle],
    category: "Services",
    rating: 4.4,
  },
];

const QuickViewImageGallery = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get all images (either from images array or single imageUrl)
  const allImages = product.images || [product.imageUrl];
  const currentImage = allImages[selectedImageIndex];

  return (
    <div>
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4">
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
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
                alt={`${product.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.category === "Services"
              ? "bg-purple-100 text-purple-700"
              : product.category === "Hardware"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {product.category}
        </span>
      </div>
    </div>
  );
};

const ProductCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState("nameAsc");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const allProducts = useMemo(() => sampleProducts, []);

  const categories = useMemo(
    () => [
      { name: "All", count: allProducts.length },
      ...Object.entries(
        allProducts.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, count]) => ({ name, count })),
    ],
    [allProducts]
  );

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortType) {
        case "nameAsc":
          return a.title.localeCompare(b.title);
        case "nameDesc":
          return b.title.localeCompare(a.title);
        case "ratingDesc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [allProducts, selectedCategory, sortType, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Our Products & Services
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our comprehensive range of quality construction materials
            and professional services for your next project.
          </p>
        </div>

        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-slate-100"
          >
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-500" />
              <span className="font-medium text-slate-800">
                Filters & Search
              </span>
            </div>
            <ChevronRight
              className={`h-5 w-5 text-slate-400 transition-transform ${
                showFilters ? "rotate-90" : ""
              }`}
            />
          </button>

          {showFilters && (
            <div className="mt-4 bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <div className="relative mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search product..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    {searchInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchInput("");
                          setSearchQuery("");
                        }}
                        className="absolute right-3 top-3"
                      >
                        <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center shadow-sm"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-slate-800">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`py-2 px-4 rounded-full text-sm transition-colors ${
                        selectedCategory === category.name
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-8 relative">
          <div className="hidden md:block w-80 flex-shrink-0">
            <div className="sticky top-24 w-80 bg-white p-6 rounded-xl shadow-lg border border-slate-100 overflow-y-auto max-h-[calc(100vh-8rem)]">
              <h2 className="text-xl font-semibold mb-6 text-slate-800">
                FILTER BY
              </h2>

              <div className="relative mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search product..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    {searchInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchInput("");
                          setSearchQuery("");
                        }}
                        className="absolute right-3 top-3"
                      >
                        <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center shadow-sm"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-slate-800">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left flex justify-between items-center py-2 px-3 rounded-lg transition-colors ${
                          selectedCategory === category.name
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm text-slate-400">
                          ({category.count})
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1 md:ml-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-slate-600 font-medium">
                {filteredAndSortedProducts.length} Products found
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="nameAsc">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                  <option value="ratingDesc">Top Rated</option>
                </select>
              </div>
            </div>

            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "grid-cols-1 gap-4"
              }`}
            >
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 transition-all hover:shadow-md relative ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images ? product.images[0] : product.imageUrl}
                      alt={product.title}
                      className={`object-cover transition-transform group-hover:scale-105 ${
                        viewMode === "list" ? "w-48 h-full" : "w-full h-56"
                      }`}
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.category === "Services"
                            ? "bg-purple-100 text-purple-700"
                            : product.category === "Hardware"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="bg-white text-gray-900 py-2 px-5 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Eye size={18} />
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderRating(product.rating)}
                      </div>
                      <span className="text-sm text-slate-500">
                        {product.rating}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold mb-2 text-slate-800 leading-tight">
                      {product.title}
                    </h2>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setSearchInput("");
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl p-8 rounded-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
              onClick={() => setQuickViewProduct(null)}
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <QuickViewImageGallery product={quickViewProduct} />
              </div>

              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  {quickViewProduct.title}
                </h2>

                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderRating(quickViewProduct.rating)}
                  </div>
                  <span className="text-sm text-slate-500">
                    {quickViewProduct.rating} out of 5
                  </span>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <button
                  onClick={() => {
                    window.open(
                      "https://wa.me/233249718356?text=Hi%2C%20I%27m%20interested%20in%20" +
                        encodeURIComponent(quickViewProduct.title),
                      "_blank"
                    );
                  }}
                  className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  Contact Us for Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
