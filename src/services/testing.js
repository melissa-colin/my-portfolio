/**
 * Testing Service
 * 
 * This service provides testing functionality for the AI Researcher Portfolio:
 * - Component testing
 * - Accessibility testing
 * - Performance monitoring
 * - Browser compatibility checks
 * - Integration testing
 */

// Test component rendering
export const testComponentRendering = (component) => {
  try {
    // Simple check if component exists in the DOM
    const element = document.querySelector(component);
    return {
      status: !!element,
      message: element 
        ? `Component "${component}" rendered successfully` 
        : `Component "${component}" failed to render`
    };
  } catch (error) {
    return {
      status: false,
      message: `Error testing component "${component}": ${error.message}`
    };
  }
};

// Test accessibility
export const testAccessibility = () => {
  const issues = [];
  
  // Check for alt text on images
  const images = document.querySelectorAll('img:not([alt])');
  if (images.length > 0) {
    issues.push(`Found ${images.length} images without alt text`);
  }
  
  // Check for proper heading structure
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headingLevels = headings.map(h => parseInt(h.tagName.substring(1)));
  
  for (let i = 0; i < headingLevels.length - 1; i++) {
    if (headingLevels[i+1] > headingLevels[i] + 1) {
      issues.push(`Heading structure skips from h${headingLevels[i]} to h${headingLevels[i+1]}`);
    }
  }
  
  // Check for keyboard navigation
  const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
  const withoutFocus = Array.from(interactiveElements).filter(
    el => window.getComputedStyle(el).outlineStyle === 'none' && 
    !el.classList.contains('focus:outline')
  );
  
  if (withoutFocus.length > 0) {
    issues.push(`Found ${withoutFocus.length} interactive elements without visible focus styles`);
  }
  
  return {
    status: issues.length === 0,
    issues
  };
};

// Test performance
export const testPerformance = () => {
  if (!window.performance) {
    return {
      status: false,
      message: 'Performance API not available'
    };
  }
  
  const timing = window.performance.timing;
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
  
  const metrics = {
    loadTime: loadTime,
    domReady: domReady,
    networkLatency: timing.responseEnd - timing.fetchStart,
    domProcessing: timing.domComplete - timing.domLoading
  };
  
  return {
    status: loadTime < 3000, // Under 3 seconds is good
    metrics,
    message: `Page load: ${loadTime}ms, DOM ready: ${domReady}ms`
  };
};

// Check browser compatibility
export const testBrowserCompatibility = () => {
  const features = {
    flexbox: typeof document.createElement('div').style.flexGrow !== 'undefined',
    grid: typeof document.createElement('div').style.grid !== 'undefined',
    fetch: typeof window.fetch === 'function',
    localStorage: (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    })(),
    history: typeof window.history.pushState === 'function'
  };
  
  const missingFeatures = Object.entries(features)
    .filter(([_, supported]) => !supported)
    .map(([feature]) => feature);
  
  return {
    status: missingFeatures.length === 0,
    browser: navigator.userAgent,
    missingFeatures
  };
};

// Test form validation
export const testFormValidation = (formSelector) => {
  try {
    const form = document.querySelector(formSelector);
    if (!form) {
      return {
        status: false,
        message: `Form "${formSelector}" not found`
      };
    }
    
    const inputs = form.querySelectorAll('input, textarea, select');
    const validations = Array.from(inputs).map(input => {
      const isRequired = input.hasAttribute('required');
      const hasValidation = input.hasAttribute('pattern') || 
                           input.hasAttribute('minlength') ||
                           input.hasAttribute('type');
      
      return {
        name: input.name || input.id,
        validations: {
          required: isRequired,
          pattern: input.getAttribute('pattern'),
          minlength: input.getAttribute('minlength'),
          type: input.getAttribute('type')
        }
      };
    });
    
    return {
      status: true,
      form: formSelector,
      fields: validations
    };
  } catch (error) {
    return {
      status: false,
      message: `Error testing form "${formSelector}": ${error.message}`
    };
  }
};

// Language switch testing
export const testLanguageSwitching = async () => {
  // Check if language toggle exists
  const languageToggle = document.querySelector('[data-testid="language-toggle"]');
  if (!languageToggle) {
    return {
      status: false,
      message: 'Language toggle control not found'
    };
  }
  
  // Get some text elements before switching
  const beforeTexts = Array.from(document.querySelectorAll('h1, h2, p')).slice(0, 3).map(el => el.textContent);
  
  // Simulate language toggle click
  try {
    languageToggle.click();
    
    // Wait for re-render
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get text after switching
    const afterTexts = Array.from(document.querySelectorAll('h1, h2, p')).slice(0, 3).map(el => el.textContent);
    
    // Compare before and after
    const textChanged = beforeTexts.some((text, i) => text !== afterTexts[i]);
    
    return {
      status: textChanged,
      message: textChanged 
        ? 'Language switching successful' 
        : 'Language appears not to have changed'
    };
  } catch (error) {
    return {
      status: false,
      message: `Error testing language switching: ${error.message}`
    };
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('🧪 Running tests...');
  
  const results = {
    components: [
      testComponentRendering('header'),
      testComponentRendering('footer'),
      testComponentRendering('main')
    ],
    accessibility: testAccessibility(),
    performance: testPerformance(),
    browser: testBrowserCompatibility()
  };
  
  // Add form testing if on contact page
  if (window.location.pathname.includes('contact')) {
    results.form = testFormValidation('form');
  }
  
  // Test language switching
  if (document.querySelector('[data-testid="language-toggle"]')) {
    results.language = await testLanguageSwitching();
  }
  
  // Log test results
  console.log('🧪 Test Results:', results);
  
  // Summary of test results
  const failedTests = Object.entries(results)
    .filter(([_, result]) => {
      if (Array.isArray(result)) {
        return result.some(item => !item.status);
      }
      return !result.status;
    })
    .map(([name]) => name);
  
  if (failedTests.length > 0) {
    console.warn('❌ Failed tests:', failedTests);
  } else {
    console.log('✅ All tests passed!');
  }
  
  return {
    success: failedTests.length === 0,
    results,
    failedTests
  };
};