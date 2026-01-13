import { useEffect } from 'react';

/**
 * Custom hook for managing page metadata (title and description)
 *
 * @param {string} title - The page title (without suffix)
 * @param {string} description - The meta description content
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.titleSuffix=' | PlasterPro Ghana'] - Title suffix
 * @param {boolean} [options.noSuffix=false] - If true, no suffix is added
 *
 * @example
 * // Basic usage
 * usePageMeta('About Us', 'Learn about our company...');
 *
 * // Home page (no suffix)
 * usePageMeta('PlasterPro Ghana - Premium Ceiling Solutions', 'Transform your spaces...', { noSuffix: true });
 *
 * @since 1.0.0
 */
export function usePageMeta(title, description, options = {}) {
  useEffect(() => {
    // Check if we're in a browser environment (SSR safety)
    if (typeof document === 'undefined') return;

    // Extract options
    const { titleSuffix = ' | PlasterPro Ghana', noSuffix = false } = options;

    // Update document title
    const fullTitle = noSuffix ? title : `${title}${titleSuffix}`;
    document.title = fullTitle;

    // Update or create meta description tag
    let descriptionMeta = document.querySelector('meta[name="description"]');

    if (!descriptionMeta) {
      // Create meta description if it doesn't exist
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }

    // Update meta description content
    descriptionMeta.content = description;

    // Optional cleanup (can be used to reset to default on unmount if needed)
    // return () => {
    //   // Cleanup logic here if needed
    // };
  }, [title, description, options]);
}
