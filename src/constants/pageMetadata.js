/**
 * Centralized page metadata configuration for PlasterPro Ghana application
 * All page titles and meta descriptions are managed here
 */

export const PAGE_METADATA = {
  home: {
    title: 'PlasterPro Ghana - Premium Ceiling & Wall Solutions',
    description: 'Transform your spaces with premium ceiling and wall finishing solutions. Expert POP ceilings, acoustic panels, decorative walls, and commercial installations in Ghana.',
    noSuffix: true // Home page uses full title without suffix
  },
  services: {
    title: 'Our Services',
    description: 'Professional ceiling and wall installation services including POP ceilings, acoustic solutions, decorative panels, and commercial installations across Accra, Ghana.'
  },
  aboutUs: {
    title: 'About Us',
    description: 'Learn about PlasterPro Ghana\'s commitment to excellence in ceiling and wall solutions. Discover our story, values, and dedication to transforming spaces.'
  },
  products: {
    title: 'Products',
    description: 'Explore our range of premium ceiling and wall products including POP materials, acoustic panels, decorative finishes, and installation supplies.'
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with PlasterPro Ghana for free consultations, quotes, and expert advice on your ceiling and wall projects. Available 24/7 across Accra.'
  },
  installation: {
    title: 'Installation Guide',
    description: 'Professional installation services and guides for ceiling and wall solutions. Expert tips, process overview, and quality assurance from PlasterPro Ghana.'
  },
  productCatalog: {
    title: 'Product Catalog',
    description: 'Browse our comprehensive catalog of ceiling and wall products including POP materials, lighting solutions, profiles, screws, and decorative elements.'
  },
  projects: {
    title: 'Our Projects',
    description: 'View our portfolio of completed ceiling and wall projects across Ghana. Residential, commercial, and industrial installations showcasing quality craftsmanship.'
  },
  blog: {
    title: 'Blog',
    description: 'Expert insights, tips, and trends in ceiling and wall design. Stay updated with the latest from PlasterPro Ghana\'s team of professionals.'
  },
  productCard: {
    title: 'Product Details',
    description: 'Detailed information about our premium ceiling and wall products, specifications, pricing, and installation options.'
  },
  meetingRequest: {
    title: 'Request a Meeting',
    description: 'Schedule a consultation with PlasterPro Ghana experts. Discuss your project requirements, get professional advice, and receive custom quotes.'
  },
  error404: {
    title: 'Page Not Found',
    description: 'The page you\'re looking for doesn\'t exist. Return to PlasterPro Ghana\'s homepage to explore our ceiling and wall solutions.'
  }
};

/**
 * Helper function to get metadata for a specific page
 *
 * @param {string} pageKey - The key of the page in PAGE_METADATA
 * @param {Object} fallback - Fallback metadata if page key doesn't exist
 * @returns {Object} Page metadata object with title and description
 */
export const getPageMeta = (pageKey, fallback = {}) => {
  return PAGE_METADATA[pageKey] || {
    title: fallback.title || 'PlasterPro Ghana',
    description: fallback.description || 'Premium ceiling and wall solutions in Ghana.'
  };
};

/**
 * Generate dynamic metadata for project detail pages
 *
 * @param {Object} project - Project object with title, description, location, duration, size
 * @returns {Object} Metadata object with title and description
 */
export const getDynamicProjectMeta = (project) => {
  if (!project) {
    return PAGE_METADATA.error404;
  }

  return {
    title: project.title,
    description: `${project.description.substring(0, 100)}... | ${project.location} | ${project.duration} completion | ${project.size} area.`
  };
};

/**
 * Generate dynamic metadata for blog post pages (future use)
 *
 * @param {Object} post - Blog post object with title, excerpt, content
 * @returns {Object} Metadata object with title and description
 */
export const getDynamicBlogMeta = (post) => {
  if (!post) {
    return PAGE_METADATA.error404;
  }

  const description = post.excerpt || post.content?.substring(0, 155) + '...';

  return {
    title: post.title,
    description: description
  };
};
