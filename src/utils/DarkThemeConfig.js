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
      400: '#ef5350',
      500: '#f44336',  // Main red
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',  // Darkest red
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
  },
  
  // Animation settings
  animation: {
    transitionDuration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Common styles for reusable components with dark theme and red accents
  components: {
    // Card styles
    card: {
      light: 'bg-gray-900 shadow-md rounded-xl overflow-hidden border border-gray-800',
      dark: 'bg-gray-900 shadow-md rounded-xl overflow-hidden border border-gray-800',
    },
    
    // Button styles
    button: {
      primary: 'bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm',
      secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg shadow-sm',
      outline: 'border border-red-600 text-red-500 hover:bg-red-900/20 rounded-lg',
    },
    
    // Section styles
    section: {
      padding: 'py-12 md:py-20',
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