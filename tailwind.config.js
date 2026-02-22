/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      keyframes: {
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '33%': { transform: 'scale(1.8)', opacity: '1' }, // Fully expanded
          '66%': { transform: 'scale(1.8)', opacity: '1' }, // Holding breath
        },
      },
      animation: {
        'breath-slow': 'breath 12s ease-in-out infinite',
      },
    },
  },
}