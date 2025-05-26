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
          400: '#ef5350',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
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
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundImage: {
        'grid-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNmM4LjUzNyAwIDE1LjQ1LTYuOTE0IDE1LjQ1LTE1LjQ1QzUxLjQ1IDEwLjkxNCA0NC41MzcgNCAzNiA0UzIwLjU1IDEwLjkxNCAyMC41NSAyMC41NWM4LjUzNyAwIDE1LjQ1LTYuOTE0IDE1LjQ1LTE1LjQ1IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')",
      }
    },
  },
  plugins: [],
}