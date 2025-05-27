/**
 * Theme configuration utility with color and style constants
 */
const ThemeConfig = {
  // Color palette
  colors: {
    // Primary color in all shades
    primary: {
      50: '#eef2ff',  // Lightest indigo
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',  // Main indigo
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',  // Darkest indigo
      950: '#1e1b4b',
    },
    
    // Gray shades for neutral colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    
    // Accent colors
    accent: {
      success: '#10b981', // Emerald
      error: '#ef4444',   // Red
      warning: '#f59e0b', // Amber
      info: '#3b82f6',    // Blue
    }
  },

  // Typography settings
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
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
  
  // Common styles for reusable components
  components: {
    // Card styles
    card: {
      light: 'bg-white shadow-md rounded-xl overflow-hidden',
      dark: 'bg-gray-800 shadow-md rounded-xl overflow-hidden',
    },
    
    // Button styles
    button: {
      primary: 'bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm',
      secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm',
      outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/20 rounded-lg',
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

export default ThemeConfig;