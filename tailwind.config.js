/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fut: {
          gold: '#e2b34a',
          goldDark: '#997321',
          goldLight: '#fded96',
          bg: '#0a0d14',
          darkCard: '#111726',
          border: '#1f293d',
          neonCyan: '#00f0ff',
          neonPink: '#ff007f',
          neonGreen: '#00ff66',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Impact', 'Arial Black', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'var-scan': 'var-scan 2s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 15px rgba(226, 179, 74, 0.6))' },
          '50%': { opacity: 0.8, filter: 'drop-shadow(0 0 25px rgba(226, 179, 74, 0.9))' },
        },
        'var-scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}
