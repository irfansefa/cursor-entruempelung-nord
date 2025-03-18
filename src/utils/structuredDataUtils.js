import { siteInfo } from '../data/siteInfo.js';

/**
 * Utility functions for generating structured data for schema.org
 * Uses the central data store to maintain consistency
 */

// Generate LocalBusiness schema
export function generateLocalBusinessSchema(additionalData = {}) {
  const { name, contact, business, social, url } = siteInfo;
  
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: name,
    description: additionalData.description || `Professioneller Entrümpelungsservice für Haushaltsauflösungen in Kiel und ganz Norddeutschland`,
    url: additionalData.url || url,
    logo: `${url}/images/logo.svg`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      postalCode: contact.address.postcode,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.coordinates.lat,
      longitude: contact.coordinates.lng
    },
    openingHoursSpecification: business.openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes
    })),
    sameAs: Object.values(social)
  };
  
  // Merge with any additional data provided
  return { ...baseSchema, ...additionalData };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

// Generate Website schema
export function generateWebsiteSchema() {
  const { name, url } = siteInfo;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${name} - Professionelle Entrümpelung in Kiel und Norddeutschland`,
    url: url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

// Generate Service schema
export function generateServiceSchema(serviceData = {}) {
  const { name, url, serviceAreas } = siteInfo;
  
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceData.name || "Entrümpelung & Haushaltsauflösung",
    description: serviceData.description || "Professionelle Entrümpelung und Haushaltsauflösung in Kiel und ganz Norddeutschland. Wir übernehmen die komplette Räumung von Wohnungen, Häusern, Kellern und Dachböden.",
    provider: {
      "@type": "LocalBusiness",
      name: name
    },
    areaServed: serviceAreas
  };
  
  // If we have service catalog data
  if (serviceData.serviceItems || siteInfo.services) {
    const items = serviceData.serviceItems || siteInfo.services;
    baseSchema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: serviceData.catalogName || "Entrümpelungsdienstleistungen",
      itemListElement: items.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description
        }
      }))
    };
  }
  
  // Merge with any additional data
  return { ...baseSchema, ...serviceData };
} 