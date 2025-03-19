// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    // Inline all Tailwind styles to avoid render-blocking
    applyBaseStyles: false
  })],
  build: {
    inlineStylesheets: "always"
  },
  vite: {
    build: {
      cssMinify: true,
      cssCodeSplit: false, // Prevent code splitting for CSS
    },
    css: {
      // Ensure styles are inlined in the build
      modules: {
        generateScopedName: '[hash:base64:8]'
      }
    }
  }
});