import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_METADATA } from "../constants/pageMetadata";

const ProjectsPage = () => {
  usePageMeta(PAGE_METADATA.projects.title, PAGE_METADATA.projects.description);
  const [activeGalleryTab, setActiveGalleryTab] = useState("all");
  const [expandedCaseStudy, setExpandedCaseStudy] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  // Project categories data
  const projectCategories = [
    { id: "all", name: "All Projects", count: 8 },
    { id: "pop", name: "POP Ceilings", count: 3 },
    { id: "acoustic", name: "Acoustic Solutions", count: 2 },
    { id: "decorative", name: "Decorative Panels", count: 2 },
    { id: "commercial", name: "Commercial Projects", count: 1 },
  ];

  // Unsplash image URLs for different project categories
  const unsplashImages = {
    pop: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80", // Modern ceiling
      "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1757&q=80", // Elegant ceiling design
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80", // Luxury interior
    ],
    acoustic: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80", // Modern office
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80", // Conference room
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80", // Studio space
    ],
    decorative: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80", // Textured walls
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80", // 3D wall panels
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80", // Modern interior
    ],
    commercial: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80", // Office ceiling
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80", // Commercial space
      "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80", // Large office
    ],
    caseStudy:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    beforeAfter:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80",
  };

  // Gallery data with Unsplash images
  const galleryItems = [
    {
      id: 1,
      title: "Modern POP Ceiling Design",
      category: "pop",
      description:
        "Luxury home with custom POP ceiling design and integrated LED lighting",
      location: "East Legon, Accra",
      duration: "2 weeks",
      size: "45 sqm",
      image: unsplashImages.pop[0],
      before: true,
      featured: true,
    },
    {
      id: 2,
      title: "Acoustic Ceiling Installation",
      category: "acoustic",
      description:
        "Conference room with premium acoustic panels for optimal sound quality",
      location: "Airport Residential Area, Accra",
      duration: "1 week",
      size: "35 sqm",
      image: unsplashImages.acoustic[0],
      before: true,
      featured: false,
    },
    {
      id: 3,
      title: "Decorative Wall Panel System",
      category: "decorative",
      description: "Custom decorative wall panels for luxury hotel lobby",
      location: "Cantonments, Accra",
      duration: "3 weeks",
      size: "120 sqm",
      image: unsplashImages.decorative[0],
      before: false,
      featured: true,
    },
    {
      id: 4,
      title: "Commercial Ceiling Suspension",
      category: "commercial",
      description: "Office complex with modern suspended ceiling grid system",
      location: "Osu, Accra",
      duration: "4 weeks",
      size: "500 sqm",
      image: unsplashImages.commercial[0],
      before: false,
      featured: false,
    },
    {
      id: 5,
      title: "Traditional POP Design",
      category: "pop",
      description: "Classic POP ceiling with modern lighting integration",
      location: "Labone, Accra",
      duration: "2.5 weeks",
      size: "60 sqm",
      image: unsplashImages.pop[1],
      before: true,
      featured: false,
    },
    {
      id: 6,
      title: "Studio Acoustic Treatment",
      category: "acoustic",
      description: "Professional acoustic solution for recording studio",
      location: "Adabraka, Accra",
      duration: "2 weeks",
      size: "25 sqm",
      image: unsplashImages.acoustic[1],
      before: false,
      featured: false,
    },
  ];

  // Filter gallery items based on active tab
  const filteredGallery = galleryItems.filter(
    (item) => activeGalleryTab === "all" || item.category === activeGalleryTab
  );

  // Statistics data
  const stats = [
    { number: "200+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Repeat Clients" },
    { number: "5", label: "Years Experience" },
  ];

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-70"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-blue-300 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-blue-500 rounded-full opacity-30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 bg-opacity-20 border border-blue-400 border-opacity-30 text-blue-200 text-sm mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Showcasing Excellence in Ceiling Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our <span className="text-blue-400">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Witness the transformation we bring to spaces through exceptional
              craftsmanship, innovative designs, and premium quality materials.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-blue-200">
            <span className="text-sm mb-2">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-blue-300 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Intro */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent">
                Excellence in Every Detail
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                At <strong className="text-blue-600">PlasterPro Ghana</strong>,
                we transform ordinary spaces into extraordinary environments.
                Our portfolio showcases residential, commercial, and industrial
                projects that highlight our expertise in innovative ceiling and
                wall solutions.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {[
                {
                  icon: "🎨",
                  title: "Creative Design",
                  description:
                    "Custom solutions tailored to your vision and space requirements",
                },
                {
                  icon: "⚡",
                  title: "Expert Craftsmanship",
                  description:
                    "Skilled artisans with years of experience in premium finishes",
                },
                {
                  icon: "🛠️",
                  title: "Quality Materials",
                  description:
                    "Premium materials ensuring durability and aesthetic appeal",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Before & After Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent"
            >
              Project Gallery
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              Explore our transformative work through real projects that
              showcase our commitment to quality and innovation in ceiling
              design and installation.
            </motion.p>
          </motion.div>

          {/* Enhanced Gallery Filter Tabs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {projectCategories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center space-x-2 ${
                  activeGalleryTab === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
                onClick={() => setActiveGalleryTab(category.id)}
              >
                <span>{category.name}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeGalleryTab === category.id
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                >
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Gallery Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={item.id}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(item.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative cursor-pointer"
                onClick={() => navigate(`/projects/${item.id}`)}
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    {/* Unsplash Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {item.before && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Before & After
                        </span>
                      )}
                      {item.featured && (
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center"
                    >
                      <div className="text-white text-center p-4">
                        <div className="text-2xl font-bold mb-2">
                          View Project
                        </div>
                        <div className="text-blue-100">
                          Click to see full details
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                            />
                          </svg>
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl border border-blue-200 hover:bg-blue-50 hover:shadow-md transition-all duration-300 flex items-center mx-auto">
              Load More Projects
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Project Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent"
            >
              Our Specializations
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              Discover our comprehensive range of specialized ceiling and wall
              solutions, each delivered with uncompromising quality and
              attention to detail.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: "✨",
                title: "Modern POP Ceilings",
                description:
                  "Custom-designed Plaster of Paris ceilings with integrated lighting, intricate cornices, and contemporary designs for residential and commercial spaces.",
                image: unsplashImages.pop[2],
                features: [
                  "Custom Designs",
                  "LED Integration",
                  "Cornice Work",
                  "Multi-level Designs",
                ],
              },
              {
                icon: "🔇",
                title: "Acoustic Solutions",
                description:
                  "Professional acoustic panel installations for noise reduction in conference rooms, studios, offices, and entertainment spaces.",
                image: unsplashImages.acoustic[2],
                features: [
                  "Sound Absorption",
                  "Noise Reduction",
                  "Studio Quality",
                  "Custom Sizing",
                ],
              },
              {
                icon: "🎭",
                title: "Decorative Wall Panels",
                description:
                  "Elegant 3D wall panels and decorative finishes that transform ordinary walls into stunning feature elements.",
                image: unsplashImages.decorative[1],
                features: [
                  "3D Patterns",
                  "Textured Finishes",
                  "Custom Designs",
                  "Easy Maintenance",
                ],
              },
              {
                icon: "🏢",
                title: "Commercial Installations",
                description:
                  "Large-scale commercial ceiling solutions including suspended grids, integrated systems, and corporate interior packages.",
                image: unsplashImages.commercial[2],
                features: [
                  "Large Scale",
                  "HVAC Integration",
                  "Fire Rated",
                  "Quick Installation",
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 group"
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent"
            >
              Project Case Studies
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              Detailed insights into our most challenging and rewarding
              projects, showcasing our problem-solving capabilities and
              technical expertise.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-6xl mx-auto"
          >
            <div className="md:flex">
              <div className="md:w-2/5 relative">
                <img
                  src={unsplashImages.caseStudy}
                  alt="Luxury Apartment Complex Ceiling Installation"
                  className="w-full h-80 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
              </div>

              <div className="md:w-3/5 p-8 md:p-12">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center mb-6"
                >
                  <div className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    Featured Case Study
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    Completed: March 2024
                  </div>
                </motion.div>

                <motion.h3
                  variants={itemVariants}
                  className="text-3xl font-bold mb-6 text-gray-900 leading-tight"
                >
                  Luxury Apartment Complex Ceiling Transformation
                </motion.h3>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-6 mb-8"
                >
                  {[
                    {
                      label: "Client",
                      value: "Premium Real Estate Developers",
                    },
                    { label: "Location", value: "East Legon, Accra" },
                    { label: "Scope", value: "30+ Luxury Apartments" },
                    { label: "Timeline", value: "6 Weeks" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                      <p className="text-gray-500 text-sm font-medium mb-1">
                        {item.label}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className={`transition-all duration-500 overflow-hidden ${
                    expandedCaseStudy ? "max-h-screen" : "max-h-32"
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Project Challenges
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        Tight 6-week deadline for 30+ apartments, complex
                        multi-level ceiling designs, coordination with multiple
                        contractors, and sourcing premium materials during
                        supply chain constraints.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-3 text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Our Solution
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        Implemented phased installation approach, deployed 3
                        specialized teams working simultaneously, used
                        prefabricated components to reduce on-site work, and
                        established direct communication channels with material
                        suppliers.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-3 text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Key Outcomes
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        Completed 2 days ahead of schedule, achieved 100% client
                        satisfaction, received referral for 3 additional
                        projects, and established new efficiency standards for
                        large-scale residential projects.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  onClick={() => setExpandedCaseStudy(!expandedCaseStudy)}
                  className="mt-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center group"
                >
                  {expandedCaseStudy ? "Show Less" : "Read Full Case Study"}
                  <svg
                    className={`ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                      expandedCaseStudy ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent"
            >
              Client Testimonials
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              Hear from our satisfied clients about their experience working
              with PlasterPro Ghana and the quality of our craftsmanship.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {[
              {
                name: "Kofi Osei",
                role: "Business Owner",
                company: "Tech Solutions Ltd.",
                image: "KO",
                content:
                  "PlasterPro Ghana completely transformed our office space with a sleek and modern ceiling design! Their team was professional, efficient, and delivered beyond our expectations. The attention to detail was remarkable.",
                rating: 5,
                project: "Office Ceiling Installation",
              },
              {
                name: "Sandra Amponsah",
                role: "Homeowner",
                company: "Residential Project",
                image: "SA",
                content:
                  "We hired PlasterPro for our home renovation, and they delivered exceptional work. The POP ceiling looks amazing and has completely changed the feel of our living space. Highly recommended!",
                rating: 5,
                project: "Residential POP Ceiling",
              },
              {
                name: "Michael Tetteh",
                role: "Project Manager",
                company: "Prime Developers",
                image: "MT",
                content:
                  "Working with PlasterPro on our luxury apartment complex was seamless. Their ability to handle large-scale projects while maintaining quality and meeting deadlines is impressive.",
                rating: 5,
                project: "Commercial Complex",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-blue-600 text-sm font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="mb-4">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    {testimonial.project}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl border border-blue-200 hover:bg-blue-50 hover:shadow-md transition-all duration-300 inline-flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Video Testimonials
            </button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Ready to Transform Your Space?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              Let's discuss your vision and create a ceiling solution that
              exceeds your expectations while staying within your budget and
              timeline.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/contact"
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Get Free Consultation
              </Link>

              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 inline-flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Portfolio
              </button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-blue-200 mt-8 text-sm"
            >
              ⚡ Quick response within 2 hours • 📞 24/7 customer support • 💰
              Competitive pricing
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
