/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d2dae7',
          300: '#adbcd2',
          400: '#8096b9',
          500: '#5f7aa1',
          600: '#4a6285',
          700: '#3d506d',
          800: '#35455d',
          900: '#2f3c4f',
          950: '#1e2736',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#0284c7',
              '&:hover': {
                color: '#0369a1',
              },
            },
            h1: {
              color: '#075985',
              fontWeight: '700',
            },
            h2: {
              color: '#0369a1',
              fontWeight: '600',
            },
            h3: {
              color: '#0284c7',
              fontWeight: '600',
            },
            strong: {
              color: '#1e293b',
              fontWeight: '700',
            },
            li: {
              margin: '0.5em 0',
            },
            'li::marker': {
              color: '#0284c7',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'prose',
    }),
  ],
}; 