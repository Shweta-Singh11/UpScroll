/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#050505',
        'dark-card': '#0c0c0e',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '33%': { transform: 'scale(1.8)', opacity: '1' }, 
          '66%': { transform: 'scale(1.8)', opacity: '1' }, 
        },
        glow: {
          '0%, 100%': { opacity: 0.3, transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: 0.5, transform: 'translateX(-50%) scale(1.1)' },
        }
      },
      animation: {
        'shake': 'shake 0.2s ease-in-out infinite',
        'breath-slow': 'breath 12s ease-in-out infinite',
        'glow-pulse': 'glow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}