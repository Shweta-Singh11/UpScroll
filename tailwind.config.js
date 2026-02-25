/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Leonardo-style dark tones
        'dark-bg': '#050505',
        'dark-card': '#0c0c0e',
      },
      keyframes: {
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '33%': { transform: 'scale(1.8)', opacity: '1' }, 
          '66%': { transform: 'scale(1.8)', opacity: '1' }, 
        },
      },
      animation: {
        'breath-slow': 'breath 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}