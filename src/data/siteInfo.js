/**
 * Central data store for site information
 * Use this file for any business information that might appear in multiple places
 * This helps maintain consistency and makes updates easier
 */

export const siteInfo = {
  // Business name and branding
  name: "Entrümpelung Nord",
  slogan: "Professionelle Entrümpelung mit Herz und Verstand",
  
  // Domain information
  domain: "entrumpelungnord.de",
  url: "https://entrumpelungnord.de",
  
  // Contact information
  contact: {
    phone: "+4943112846305",
    email: "info@entrumpelungnord.de",
    address: {
      street: "Kaiserstraße 7",
      city: "Kiel",
      postcode: "24143",
      region: "Schleswig-Holstein",
      country: "DE",
      countryFull: "Deutschland"
    },
    // Coordinates for map and LocalBusiness schema
    coordinates: {
      lat: "54.3233",
      lng: "10.1228"
    }
  },
  
  // Business details
  business: {
    foundingYear: "2023", 
    numEmployees: "15",
    priceRange: "€€", // € to €€€€
    openingHours: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:30"
      },
      {
        days: ["Saturday"],
        opens: "09:00",
        closes: "14:00"
      },
      {
        days: ["Sunday"],
        status: "closed"
      }
    ]
  },
  
  // Social media profiles
  social: {
    facebook: "https://www.facebook.com/entruempelungnord",
    instagram: "https://www.instagram.com/entruempelung_nord"
  },
  
  // Service areas
  serviceAreas: [
    {
      type: "State",
      name: "Schleswig-Holstein"
    },
    {
      type: "City",
      name: "Kiel"
    },
    {
      type: "City",
      name: "Hamburg"
    },
    {
      type: "City",
      name: "Lübeck"
    },
    {
      type: "City",
      name: "Neumünster"
    },
    {
      type: "City",
      name: "Flensburg"
    },
    {
      type: "City",
      name: "Rendsburg"
    },
    {
      type: "City",
      name: "Eckernförde"
    },
    {
      type: "City",
      name: "Plön"
    },
    {
      type: "City",
      name: "Bad Segeberg"
    },
    {
      type: "City",
      name: "Pinneberg"
    }
  ],
  
  // Main services offered
  services: [
    {
      name: "Wohnungsauflösung",
      description: "Vollständige Auflösung und Entrümpelung von Wohnungen bei Umzügen, Nachlässen oder Immobilienverkäufen."
    },
    {
      name: "Haushaltsauflösung",
      description: "Komplette Räumung und Entsorgung von Haushalten, inkl. fachgerechter Verwertung"
    },
    {
      name: "Kellerentrümpelung",
      description: "Gezielte Entrümpelung von Kellerräumen und fachgerechte Entsorgung"
    },
    {
      name: "Dachbodenentrümpelung",
      description: "Befreiung von Dachböden von ungewünschtem Inventar und umweltgerechte Entsorgung"
    },
    {
      name: "Messie-Wohnungsentrümpelung",
      description: "Spezielle Entrümpelung und Grundreinigung von stark vermüllten Wohnungen mit diskreter und sensibler Vorgehensweise"
    },
    {
      name: "Gewerbliche Entrümpelung",
      description: "Entrümpelung von Büros, Lagerräumen und anderen gewerblichen Flächen"
    },
    {
      name: "Nachlassverwertung",
      description: "Fachgerechte Bewertung und Verwertung von Nachlassgegenständen"
    }
  ]
}; 