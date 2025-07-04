/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          DEFAULT: '#f5f5f7',      // ivory white
          gold: '#e0c48f',         // muted luxury gold
          steel: '#1a1b26',        // executive blue-black
          accent: '#8aacc8',       // cool chromatic highlight
        },
      },
      fontFamily: {
        geist: ['"Geist"', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 8px 20px rgba(0,0,0,0.3)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
