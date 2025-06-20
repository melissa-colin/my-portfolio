/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ff3131',
          500: '#e51400',
          600: '#d32f2f',
          700: '#c62828',
          800: '#b71c1c',
          900: '#991b1b',
          950: '#8d0000',
        },
        gray: {
          50: '#e0e0e0',
          100: '#c0c0c0',
          200: '#a0a0a0',
          300: '#808080',
          400: '#606060',
          500: '#404040',
          600: '#303030',
          700: '#202020',
          800: '#151515',
          900: '#101010',
          950: '#080808',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'text-shimmer': 'textShimmer 3s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glowPulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(229, 20, 0, 0.5)' },
          '50%': { boxShadow: '0 0 25px rgba(229, 20, 0, 0.5)' },
        },
        'textShimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'slideUp': {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slideInRight': {
          'from': { 
            opacity: '0',
            transform: 'translateX(20px)',
          },
          'to': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-red': 'linear-gradient(135deg, #ff3131, #e51400, #991b1b)',
        'grid-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNmM4LjUzNyAwIDE1LjQ1LTYuOTE0IDE1LjQ1LTE1LjQ1QzUxLjQ1IDEwLjkxNCA0NC41MzcgNCAzNiA0UzIwLjU1IDEwLjkxNCAyMC41NSAyMC41NWM4LjUzNyAwIDE1LjQ1LTYuOTE0IDE1LjQ1LTE1LjQ1IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')",
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(229, 20, 0, 0.5)',
        'red-glow-lg': '0 0 30px rgba(229, 20, 0, 0.5)',
      },
      textShadow: {
        'red-sm': '0 0 10px rgba(229, 20, 0, 0.2)',
        'red-md': '0 0 20px rgba(229, 20, 0, 0.3)',
        'red-lg': '0 0 30px rgba(229, 20, 0, 0.4)',
      },
    },
  },
  plugins: [],
}