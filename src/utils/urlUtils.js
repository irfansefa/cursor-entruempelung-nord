import { siteInfo } from '../data/siteInfo.js';

/**
 * Utility functions for URL handling to ensure consistent and SEO-friendly URLs
 */

/**
 * Creates a clean, SEO-friendly URL slug from a string
 * @param {string} text - The text to convert to a slug
 * @returns {string} - A URL-friendly slug
 */
export function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .trim(); // Trim leading/trailing whitespace
}

/**
 * Creates a full URL from a path
 * @param {string} path - The path to append to the site URL
 * @returns {string} - The full URL
 */
export function createUrl(path) {
  // Make sure the path starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteInfo.url}${cleanPath}`;
}

/**
 * Creates a service URL
 * @param {string} serviceName - The name of the service
 * @returns {string} - The service URL
 */
export function createServiceUrl(serviceName) {
  const slug = createSlug(serviceName);
  return createUrl(`/services/${slug}/`);
}

/**
 * Creates a location URL
 * @param {string} locationName - The name of the location
 * @returns {string} - The location URL
 */
export function createLocationUrl(locationName) {
  const slug = createSlug(locationName);
  return createUrl(`/standorte/${slug}/`);
}

/**
 * Creates a breadcrumb trail
 * @param {Array} path - Array of objects with name and path properties
 * @returns {Array} - Array of objects with name and url properties
 */
export function createBreadcrumbs(path) {
  return [
    { name: "Startseite", url: siteInfo.url },
    ...path.map(item => ({
      name: item.name,
      url: createUrl(item.path)
    }))
  ];
}

/**
 * Canonicalize URLs by trimming trailing slashes and removing query parameters
 * @param {string} url - The URL to canonicalize
 * @returns {string} - The canonicalized URL
 */
export function canonicalize(url) {
  // Parse the URL
  const parsed = new URL(url);
  
  // Remove trailing slash if it exists (except for the root)
  let path = parsed.pathname;
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  
  // Build the canonical URL without query parameters or fragments
  return `${parsed.protocol}//${parsed.host}${path}`;
} 