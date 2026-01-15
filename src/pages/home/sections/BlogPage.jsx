import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  User,
  Tag,
  MessageCircle,
  ArrowRight,
  Clock,
  Mail,
  Send,
  ChevronRight,
  BookOpen,
  Search,
  Share2,
  Heart,
  Bookmark,
  ArrowLeft,
  Filter,
  X,
  ThumbsUp,
  CheckCircle,
} from "lucide-react";
import { usePageMeta } from "../../../hooks/usePageMeta";
import { PAGE_METADATA } from "../../../constants/pageMetadata";

// Enhanced blog data with more posts and content
const blogPosts = [
  {
    id: 1,
    title: "Choosing the Right Ceiling Design for Your Home",
    excerpt:
      "Explore aesthetic and functional options for your ceiling design that can transform any room.",
    content: `
      <p>When it comes to interior design, ceilings are often overlooked. However, the right ceiling design can completely transform your space and add significant value to your home.</p>
      
      <h2>Understanding Ceiling Design Basics</h2>
      <p>Ceiling design isn't just about aesthetics—it's about creating harmony in your space while considering practical aspects like room height, lighting, and acoustics.</p>
      
      <h3>Popular Ceiling Styles</h3>
      <ul>
        <li><strong>Tray Ceilings:</strong> Perfect for adding depth and elegance to living rooms</li>
        <li><strong>Coffered Ceilings:</strong> Classic design that adds architectural interest</li>
        <li><strong>Vaulted Ceilings:</strong> Creates a sense of spaciousness in smaller rooms</li>
        <li><strong>Beamed Ceilings:</strong> Rustic charm with structural appeal</li>
      </ul>
      
      <h2>Factors to Consider</h2>
      <p>Before choosing a ceiling design, consider your room's dimensions, natural light sources, and overall design theme. Professional consultation can help you make the right choice.</p>
      
      <h2>Material Selection</h2>
      <p>The choice of materials plays a crucial role in both aesthetics and functionality. From traditional plaster to modern gypsum boards, each material offers unique benefits.</p>
      
      <h3>Cost Considerations</h3>
      <p>Budget is always an important factor. While some ceiling designs may seem expensive initially, they can add significant value to your property in the long run.</p>
    `,
    author: "Michael Asamoah",
    authorRole: "Lead Designer",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    date: "February 15, 2025",
    category: "Home Improvement",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    tags: [
      "ceiling design",
      "home improvement",
      "interior design",
      "residential",
    ],
    readTime: "5 min read",
    comments: 3,
    likes: 12,
    shares: 4,
    featured: true,
  },
  {
    id: 2,
    title: "The Benefits of Acoustic Ceilings for Offices & Studios",
    excerpt:
      "Discover how acoustic ceilings can reduce noise and improve work environments significantly.",
    content: `
      <p>In today's busy workplace environments, noise pollution is a significant concern that affects productivity, concentration, and overall employee wellbeing.</p>
      
      <h2>Why Acoustic Solutions Matter</h2>
      <p>Modern offices and studios require specialized acoustic treatment to maintain optimal working conditions. Acoustic ceilings absorb sound waves, reducing echo and background noise.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Improved speech clarity and privacy</li>
        <li>Reduced stress levels among employees</li>
        <li>Enhanced audio quality in recording studios</li>
        <li>Better concentration and productivity</li>
        <li>Energy efficiency through better insulation</li>
      </ul>
      
      <h2>Installation Process</h2>
      <p>Professional installation ensures optimal performance. Our team follows a systematic approach to ensure perfect results every time.</p>
      
      <h3>Maintenance Tips</h3>
      <p>Acoustic ceilings require minimal maintenance but proper care can extend their lifespan significantly.</p>
    `,
    author: "Sarah Adjei",
    authorRole: "Acoustic Specialist",
    authorImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    date: "February 10, 2025",
    category: "Commercial Spaces",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    tags: [
      "acoustic ceilings",
      "office design",
      "sound reduction",
      "commercial",
    ],
    readTime: "7 min read",
    comments: 1,
    likes: 8,
    shares: 2,
    featured: true,
  },
  {
    id: 3,
    title: "Plasterboard vs. POP – Which One is Right for You?",
    excerpt:
      "Compare durability, cost, and installation of these popular ceiling options in detail.",
    content: `
      <p>When it comes to ceiling and wall finishes, two popular options stand out: Plasterboard and Plaster of Paris (POP). Each has its own set of advantages and considerations.</p>
      
      <h2>Material Comparison</h2>
      <p>Understanding the differences between these materials can help you make an informed decision for your project.</p>
      
      <h3>Plasterboard Advantages</h3>
      <ul>
        <li>Quick installation process</li>
        <li>Consistent finish quality</li>
        <li>Good fire resistance properties</li>
        <li>Easier to repair and modify</li>
        <li>Cost-effective for large areas</li>
      </ul>
      
      <h3>POP Advantages</h3>
      <ul>
        <li>Superior flexibility for complex designs</li>
        <li>Excellent seamless finish</li>
        <li>Better for curved surfaces</li>
        <li>Traditional craftsmanship appeal</li>
        <li>Can create intricate designs and moldings</li>
      </ul>
      
      <h2>Cost Analysis</h2>
      <p>While POP might seem more expensive initially, its durability and aesthetic appeal can provide better long-term value.</p>
    `,
    author: "Kwame Boateng",
    authorRole: "Materials Expert",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "February 5, 2025",
    category: "Materials",
    imageUrl:
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800",
    tags: ["plasterboard", "POP", "materials comparison", "installation"],
    readTime: "6 min read",
    comments: 0,
    likes: 15,
    shares: 3,
    featured: false,
  },
  {
    id: 4,
    title: "Modern Ceiling Trends for 2025",
    excerpt:
      "Explore the latest ceiling design trends that are shaping interior spaces this year.",
    content: `
      <p>The world of ceiling design is evolving rapidly, with new trends emerging that combine aesthetics with functionality.</p>
      
      <h2>Top Trends for 2025</h2>
      
      <h3>1. Sustainable Materials</h3>
      <p>Eco-friendly materials are becoming increasingly popular as homeowners become more environmentally conscious.</p>
      
      <h3>2. Smart Ceilings</h3>
      <p>Integration of technology for lighting control, climate management, and even audio systems.</p>
      
      <h3>3. Mixed Materials</h3>
      <p>Combining different materials like wood, metal, and plaster for unique visual effects.</p>
      
      <h3>4. Minimalist Designs</h3>
      <p>Clean lines and simple designs that create a sense of spaciousness and calm.</p>
      
      <h2>Implementation Tips</h2>
      <p>Working with professionals can help you incorporate these trends in a way that suits your space and budget.</p>
    `,
    author: "Michael Asamoah",
    authorRole: "Lead Designer",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    date: "January 28, 2025",
    category: "Design Trends",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    tags: ["trends", "modern design", "2025 trends", "innovation"],
    readTime: "4 min read",
    comments: 2,
    likes: 10,
    shares: 5,
    featured: false,
  },
];

// Main Blog List Component
const BlogList = () => {
  usePageMeta(PAGE_METADATA.blog.title, PAGE_METADATA.blog.description);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());

  const categories = [
    "All",
    "Home Improvement",
    "Commercial Spaces",
    "Materials",
    "Design Trends",
  ];

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter(
      (post) =>
        (selectedCategory === "All" || post.category === selectedCategory) &&
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "most-liked":
          return b.likes - a.likes;
        case "most-commented":
          return b.comments - a.comments;
        default:
          return 0;
      }
    });

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const navigateToPost = (postId) => {
    // For demo purposes, we'll use a simple alert
    // In a real app, you would use React Router or similar
    alert(
      `Navigating to post ${postId}. In a real app, this would open the detailed blog page.`
    );
    // window.location.href = `/blog/${postId}`;
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 min-h-screen">
      {/* Enhanced Hero Section - Reduced Height & Gray Color */}
      <section className="relative bg-gradient-to-br from-gray-300 via-gray-700 to-gray-900 text-white py-12 md:py-16 pt-24 md:pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gray-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gray-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/30">
            <BookOpen className="w-4 h-4" />
            Industry Insights & Expert Tips
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            PlasterPro Blog
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the latest trends, expert advice, and innovative solutions
            in ceiling and wall finishing
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filter and Sort Section */}
      <section className="py-6 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Categories - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex flex-wrap gap-2 flex-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gray-700 text-white shadow-lg shadow-gray-500/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort and Mobile Filter */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 lg:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-commented">Most Commented</option>
              </select>

              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className={`lg:hidden px-3 py-2 border rounded-lg flex items-center gap-2 flex-shrink-0 transition-colors ${
                  mobileFiltersOpen
                    ? "bg-gray-700 text-white border-gray-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium">{selectedCategory}</span>
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="lg:hidden mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Filter by Category</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setMobileFiltersOpen(false);
                    }}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-gray-700 text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{category}</span>
                    {selectedCategory === category && (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Blog Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              {/* Featured Posts - FIXED LAYOUT */}
              {filteredPosts.filter((post) => post.featured).length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-6 bg-gray-700 rounded-full"></div>
                    Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredPosts
                      .filter((post) => post.featured)
                      .map((post) => (
                        <FeaturedPostCard
                          key={post.id}
                          post={post}
                          onBookmark={toggleBookmark}
                          onLike={toggleLike}
                          onNavigate={navigateToPost}
                          isBookmarked={bookmarkedPosts.has(post.id)}
                          isLiked={likedPosts.has(post.id)}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* All Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onBookmark={toggleBookmark}
                    onLike={toggleLike}
                    onNavigate={navigateToPost}
                    isBookmarked={bookmarkedPosts.has(post.id)}
                    isLiked={likedPosts.has(post.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <NewsletterSection />

      {/* Enhanced CTA Section */}
      <CTASection />

      {/* Enhanced Popular Topics */}
      <PopularTopics />
    </div>
  );
};

// Enhanced Post Card Component
const PostCard = ({
  post,
  onBookmark,
  onLike,
  onNavigate,
  isBookmarked,
  isLiked,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer"
      onClick={() => onNavigate(post.id)}
    >
      <div className="relative h-56 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <img
          src={post.imageUrl}
          alt={post.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {post.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBookmark(post.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isBookmarked
                ? "bg-gray-700 text-white"
                : "bg-white/90 text-gray-700 hover:bg-white"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLike(post.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-700 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-500">{post.authorRole}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.likes + (isLiked ? 1 : 0)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
          </div>

          <button className="flex items-center gap-1 text-gray-700 font-semibold text-sm hover:gap-2 transition-all group/readmore">
            Read More
            <ArrowRight className="w-4 h-4 transition-transform group-hover/readmore:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

// Featured Post Card Component - COMPLETELY REWRITTEN to fix layout issues
const FeaturedPostCard = ({
  post,
  onBookmark,
  onLike,
  onNavigate,
  isBookmarked,
  isLiked,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer"
      onClick={() => onNavigate(post.id)}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section - Fixed width and height */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          <img
            src={post.imageUrl}
            alt={post.title}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:bg-gradient-to-r from-black/30 to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured • {post.category}
            </span>
          </div>
        </div>

        {/* Content Section - Fixed layout */}
        <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Date and Read Time */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          {/* Author and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{post.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLike(post.id);
                }}
                className={`p-2 rounded-full transition-all ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onBookmark(post.id);
                }}
                className={`p-2 rounded-full transition-all ${
                  isBookmarked
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// Enhanced Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get the latest articles, project insights, and industry trends
                delivered directly to your inbox. No spam, just valuable
                content.
              </p>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Weekly digest
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Exclusive content
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 bg-white/5 backdrop-blur-sm">
              {subscribed ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Welcome Aboard!
                  </h4>
                  <p className="text-gray-300">
                    Check your email to confirm your subscription.
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="text-xl font-bold text-white mb-6">
                    Join Our Community
                  </h4>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Send className="w-4 h-4" />
                      Subscribe Now
                    </button>
                  </form>
                  <p className="text-xs text-gray-300 mt-4 text-center">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced CTA Section
const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Ready to Transform Your Space?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Bring Your Vision to Life
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            From consultation to completion, our team of experts is here to help
            you create the perfect ceiling and wall solutions for your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="inline-flex items-center gap-3 bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Your Project
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => (window.location.href = "/portfolio")}
              className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
            >
              View Our Work
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Popular Topics
const PopularTopics = () => {
  const topics = [
    "Ceiling Design",
    "POP Installation",
    "Acoustic Solutions",
    "Plasterboard",
    "Interior Design",
    "Commercial Projects",
    "Home Renovation",
    "Materials Guide",
    "Modern Trends",
    "Cost Estimation",
    "Maintenance Tips",
    "DIY Solutions",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Popular Topics
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dive deeper into specific areas of ceiling and wall finishing with
              our curated topics
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <button
                key={topic}
                className="group p-6 bg-gray-50 hover:bg-gray-100 rounded-2xl text-left transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-gray-300"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-300 transition-colors">
                  <Tag className="w-6 h-6 text-gray-700" />
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {topic}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Detailed Blog Post Component - FIXED ERROR HANDLING
const BlogPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({ name: "", email: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    // Simulate API call with proper error handling
    const fetchPost = () => {
      try {
        setTimeout(() => {
          const foundPost = blogPosts.find((p) => p.id === parseInt(postId));
          if (foundPost) {
            setPost(foundPost);
          }
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setComment({ name: "", email: "", content: "" });
      setSubmitting(false);
    }, 1000);
  };

  const sharePost = (platform) => {
    if (!post) return;

    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => (window.location.href = "/blog")}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Enhanced Hero Section - Reduced Height & Gray Color */}
      <section className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white py-16 md:py-20 pt-24 md:pt-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <button
            onClick={() => (window.location.href = "/blog")}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </button>

          <div className="mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-white/20">
            <div className="flex items-center gap-4">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              />
              <div>
                <p className="font-semibold text-white">{post.author}</p>
                <p className="text-gray-300 text-sm">{post.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/20">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                bookmarked
                  ? "bg-gray-700 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
              />
              <span>Save</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>

              {showShareOptions && (
                <div className="absolute top-12 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 min-w-40 z-50">
                  <button
                    onClick={() => sharePost("twitter")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        𝕏
                      </span>
                    </div>
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => sharePost("facebook")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        f
                      </span>
                    </div>
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => sharePost("linkedin")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        in
                      </span>
                    </div>
                    <span>LinkedIn</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="h-80 md:h-96 bg-gray-200 relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-ul:list-disc prose-ul:pl-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                    Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Comments Section */}
      <CommentsSection
        post={post}
        comment={comment}
        submitting={submitting}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleCommentSubmit}
      />

      {/* Enhanced Related Posts */}
      <RelatedPosts currentPostId={post.id} />
    </div>
  );
};

// Enhanced Comments Section Component
const CommentsSection = ({
  post,
  comment,
  submitting,
  onCommentChange,
  onCommentSubmit,
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <MessageCircle className="w-8 h-8 text-gray-700" />
              Discussion ({post.comments})
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the conversation and share your thoughts with our community
            </p>
          </div>

          {/* Comment Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100 mb-12">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">
              Share Your Thoughts
            </h3>
            <p className="text-gray-600 mb-8">
              We'd love to hear your perspective on this topic
            </p>

            <form onSubmit={onCommentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={comment.name}
                    onChange={onCommentChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={comment.email}
                    onChange={onCommentChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Comment *
                </label>
                <textarea
                  name="content"
                  value={comment.content}
                  onChange={onCommentChange}
                  placeholder="What are your thoughts on this article?..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none transition-all"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 flex items-center gap-3 shadow-lg hover:shadow-xl min-w-40 justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Post Comment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sample Comments (would be dynamic in real app) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                  alt="Commenter"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      David Thompson
                    </h4>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    This article perfectly captures the challenges we faced in
                    our office renovation. The acoustic solutions mentioned here
                    made a huge difference in our open-plan space.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">3</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Related Posts Component
const RelatedPosts = ({ currentPostId }) => {
  const relatedPosts = blogPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Continue Reading
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore more articles that might interest you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                onClick={() => (window.location.href = `/blog/${post.id}`)}
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <button className="text-gray-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all group/readmore">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/readmore:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { BlogList, BlogPost };
