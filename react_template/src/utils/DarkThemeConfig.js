/**
 * Dark theme configuration utility with red accents for a unique personal style
 */
const DarkThemeConfig = {
  // Color palette with dark background and red accents
  colors: {
    // Primary color (red) in all shades
    primary: {
      50: '#ffebee',  // Lightest red
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ff3131',
      500: '#e51400',  // Main red
      600: '#d32f2f',
      700: '#c62828',
      800: '#b71c1c',
      900: '#991b1b',  // Darkest red
      950: '#8d0000',
    },
    
    // Dark gray/black shades for backgrounds
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
    
    // Accent colors
    accent: {
      success: '#00c853', // Green
      error: '#ff1744',   // Bright red
      warning: '#ffab00', // Amber
      info: '#2979ff',    // Blue
    },
    
    // Gradients
    gradients: {
      redPrimary: 'linear-gradient(135deg, #ff3131, #e51400, #991b1b)',
      redSubtle: 'linear-gradient(135deg, rgba(255, 49, 49, 0.08), transparent 80%)',
      darkBg: 'linear-gradient(135deg, #080808 0%, #101010 50%, #151515 100%)',
      glow: '0 0 25px rgba(229, 20, 0, 0.5)',
    }
  },

  // Typography settings
  typography: {
    fontFamily: {
      sans: '"Outfit", system-ui, -apple-system, sans-serif',
      mono: '"Fira Code", ui-monospace, SFMono-Regular, monospace',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    textEffects: {
      gradientText: {
        background: 'linear-gradient(to right, #ff3131, #e51400)',
        webkitBackgroundClip: 'text',
        webkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 0 30px rgba(229, 20, 0, 0.2)',
      },
      shimmerText: {
        animation: 'textShimmer 3s linear infinite',
      },
    },
  },
  
  // Animation settings
  animation: {
    transitionDuration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    keyframes: {
      fadeIn: 'fadeIn 0.6s ease-out forwards',
      slideUp: 'slideUp 0.6s ease-out forwards',
      slideInRight: 'slideInRight 0.6s ease-out forwards',
      glowPulse: 'glowPulse 3s ease-in-out infinite',
      shimmer: 'shimmer 2s infinite',
      textShimmer: 'textShimmer 3s linear infinite',
    },
  },
  
  // Common styles for reusable components with dark theme and red accents
  components: {
    // Card styles
    card: {
      light: 'bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover-border-glow',
      dark: 'bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 hover-border-glow',
      hover: 'transform -translate-y-1 shadow-lg shadow-red-500/20',
    },
    
    // Button styles
    button: {
      primary: 'bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow-sm hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300',
      secondary: 'bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 rounded-lg shadow-sm border border-gray-700 hover:shadow-white/10 hover:-translate-y-1 transition-all duration-300',
      outline: 'border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-1',
    },
    
    // Section styles
    section: {
      padding: 'py-12 md:py-20',
      title: 'text-2xl md:text-3xl lg:text-4xl font-bold mb-6',
      subtitle: 'text-lg md:text-xl text-gray-300 mb-8 max-w-2xl',
    },
    
    // Form elements
    form: {
      input: 'bg-gray-900 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white rounded-lg shadow-inner',
      label: 'text-gray-300 mb-2 block',
    },
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index values for stacking elements
  zIndex: {
    navbar: 50,
    modal: 100,
    tooltip: 150,
    toast: 200,
  },
};

export default DarkThemeConfig;