import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { getDynamicProjectMeta, PAGE_METADATA } from "../constants/pageMetadata";

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Unsplash image URLs for project details
  const unsplashImages = {
    pop: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1757&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    ],
    acoustic: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    ],
    decorative: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    ],
    commercial: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    ],
    beforeAfter: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80",
    ],
  };

  // Project data with Unsplash images
  const projects = {
    1: {
      id: 1,
      title: "Modern POP Ceiling Design",
      category: "pop",
      description:
        "Custom luxury POP ceiling with integrated LED lighting for a contemporary residential space in East Legon. This project features intricate geometric patterns and hidden LED strips that create a warm, ambient atmosphere.",
      fullDescription:
        "This luxury residential project in East Legon showcases our expertise in modern POP ceiling designs. The client wanted a contemporary look that incorporated smart lighting and acoustic considerations. We designed a multi-level ceiling with custom cornices and integrated LED lighting that can be controlled via smartphone. The project required precise craftsmanship to achieve the complex geometric patterns while maintaining structural integrity.",
      location: "East Legon, Accra",
      duration: "2 weeks",
      size: "45 sqm",
      year: "2024",
      client: "Private Homeowner",
      budget: "Premium",
      status: "Completed",
      images: [...unsplashImages.pop, ...unsplashImages.beforeAfter],
      beforeAfter: true,
      featured: true,
      challenges: [
        "Complex geometric patterns requiring precise measurements",
        "Integration of smart LED lighting system",
        "Maintaining ceiling height while adding multiple levels",
        "Coordinating with other contractors during renovation",
      ],
      solutions: [
        "Used 3D modeling software for precise planning",
        "Collaborated with electricians for seamless LED integration",
        "Implemented lightweight framing to minimize height loss",
        "Created detailed project timeline for contractor coordination",
      ],
      materials: [
        "Premium POP compounds",
        "Steel framing system",
        "Smart LED lighting strips",
        "Acoustic underlayment",
        "Fire-retardant coatings",
      ],
      testimonials: [
        {
          text: "The POP ceiling completely transformed our living room. The attention to detail and professional installation exceeded our expectations.",
          author: "Mr. & Mrs. Ansah",
          role: "Homeowners",
        },
      ],
    },
    2: {
      id: 2,
      title: "Acoustic Ceiling Installation",
      category: "acoustic",
      description:
        "Premium acoustic panel installation for corporate conference room with advanced sound optimization technology.",
      fullDescription:
        "Corporate conference room acoustic treatment for a leading financial institution. The project required reducing echo and improving speech clarity while maintaining a professional aesthetic.",
      location: "Airport Residential Area, Accra",
      duration: "1 week",
      size: "35 sqm",
      year: "2024",
      client: "Financial Services Ltd.",
      budget: "Corporate",
      status: "Completed",
      images: [...unsplashImages.acoustic, ...unsplashImages.beforeAfter],
      beforeAfter: true,
      featured: false,
      challenges: [
        "Achieving NRC 0.85+ sound absorption",
        "Maintaining elegant corporate appearance",
        "Quick installation during business hours",
        "Integrating with existing lighting",
      ],
      solutions: [
        "Used Class A acoustic panels",
        "Custom fabric wrapping to match decor",
        "Phased installation over weekend",
        "Collaborated with electrical team",
      ],
      materials: [
        "Class A acoustic panels",
        "Custom fabric wraps",
        "Aluminum grid system",
        "Sound isolation clips",
      ],
    },
    3: {
      id: 3,
      title: "Decorative Wall Panel System",
      category: "decorative",
      description:
        "Custom 3D wall panels for luxury hotel lobby with intricate geometric patterns and premium finishes.",
      fullDescription:
        "Luxury hotel lobby transformation using custom 3D wall panels. The design creates visual interest and acoustic benefits while maintaining the hotel's premium brand image.",
      location: "Cantonments, Accra",
      duration: "3 weeks",
      size: "120 sqm",
      year: "2024",
      client: "Luxury Hotels Group",
      budget: "Luxury",
      status: "Completed",
      images: unsplashImages.decorative,
      beforeAfter: false,
      featured: true,
      challenges: [
        "Large-scale installation in operational hotel",
        "Complex 3D pattern alignment",
        "Durability requirements for high-traffic area",
        "Matching existing luxury finishes",
      ],
      solutions: [
        "Night installation to avoid guest disruption",
        "Custom templates for pattern alignment",
        "Commercial-grade materials and coatings",
        "Color matching with existing decor",
      ],
      materials: [
        "GRG (Glass Reinforced Gypsum)",
        "Commercial-grade coatings",
        "Stainless steel fixings",
        "Acoustic backing",
      ],
    },
    4: {
      id: 4,
      title: "Commercial Ceiling Suspension",
      category: "commercial",
      description:
        "Large-scale suspended ceiling system for modern office complex with integrated HVAC and lighting systems.",
      fullDescription:
        "Complete ceiling solution for a new corporate headquarters featuring integrated HVAC, lighting, and fire protection systems in a seamless design.",
      location: "Osu, Accra",
      duration: "4 weeks",
      size: "500 sqm",
      year: "2024",
      client: "Corporate Solutions Inc.",
      budget: "Commercial",
      status: "Completed",
      images: unsplashImages.commercial,
      beforeAfter: false,
      featured: false,
      challenges: [
        "Coordinating multiple building systems",
        "Large area with consistent finish",
        "Meeting tight construction schedule",
        "Access requirements for maintenance",
      ],
      solutions: [
        "BIM coordination with all trades",
        "Modular installation approach",
        "24/7 work schedule with multiple teams",
        "Integrated access panels",
      ],
      materials: [
        "Metal suspended grid",
        "Mineral fiber tiles",
        "Integrated LED panels",
        "Access panels",
      ],
    },
  };

  const project = projects[projectId];

  // Set dynamic page metadata based on project
  const meta = project
    ? getDynamicProjectMeta(project)
    : PAGE_METADATA.error404;

  usePageMeta(meta.title, meta.description);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Project Not Found
          </h2>
          <Link to="/projects" className="text-blue-600 hover:text-blue-800">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Projects
            </button>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                  {project.category.toUpperCase()}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-medium">
                  {project.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                {project.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Image Gallery */}
                <motion.div variants={itemVariants} className="mb-12">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative">
                      <div className="h-96 bg-gray-200 relative overflow-hidden">
                        {/* Main Image */}
                        <img
                          src={project.images[activeImage]}
                          alt={project.title}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setLightboxOpen(true)}
                        />
                      </div>

                      {/* Image Thumbnails */}
                      <div className="p-4 bg-gray-50">
                        <div className="flex space-x-2 overflow-x-auto">
                          {project.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveImage(index)}
                              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                activeImage === index
                                  ? "border-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <img
                                src={image}
                                alt={`${project.title} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Project Description */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-8 mb-8"
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Project Overview
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {project.fullDescription}
                    </p>

                    {/* Before & After Section */}
                    {project.beforeAfter && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                          Transformation Gallery
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="bg-gray-200 h-48 rounded-lg mb-2 flex items-center justify-center">
                              <span className="text-gray-600">
                                Before Photo
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Before Installation
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="bg-gray-200 h-48 rounded-lg mb-2 flex items-center justify-center">
                              <span className="text-gray-600">After Photo</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              After Installation
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Challenges & Solutions */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Challenges
                    </h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Solutions
                    </h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Materials Used */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-6 text-gray-900">
                    Materials & Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Project Info Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Location</p>
                      <p className="font-semibold text-gray-900">
                        {project.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Duration</p>
                      <p className="font-semibold text-gray-900">
                        {project.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Size</p>
                      <p className="font-semibold text-gray-900">
                        {project.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Year</p>
                      <p className="font-semibold text-gray-900">
                        {project.year}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Client</p>
                      <p className="font-semibold text-gray-900">
                        {project.client}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Budget</p>
                      <p className="font-semibold text-gray-900">
                        {project.budget}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      to="/contact"
                      className="w-full bg-blue-600 text-white text-center font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 block"
                    >
                      Start Similar Project
                    </Link>
                  </div>
                </motion.div>

                {/* Testimonials */}
                {project.testimonials && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      Client Feedback
                    </h3>
                    {project.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-700 italic mb-3">
                          "{testimonial.text}"
                        </p>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {testimonial.author}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Related Services */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Related Services
                  </h3>
                  <div className="space-y-3">
                    {[
                      "POP Ceiling Design",
                      "Acoustic Solutions",
                      "3D Wall Panels",
                      "Commercial Ceilings",
                    ].map((service, index) => (
                      <Link
                        key={index}
                        to="/services"
                        className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {service}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl z-10"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
            <img
              src={project.images[activeImage]}
              alt={project.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's transform your space with our expert ceiling and wall
            solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Get Free Quote
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
