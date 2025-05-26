/**
 * Security Service
 * 
 * This service provides cybersecurity functionality for the AI Researcher Portfolio:
 * - XSS protection
 * - Authentication security
 * - CSRF protection
 * - Content Security Policy configuration
 * - Input validation
 * - Security auditing
 */

// Initialize Content Security Policy
const configureCsp = () => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' http://localhost:5000";
  document.head.appendChild(meta);
};

// XSS Protection - Sanitize input
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// CSRF Protection - Generate tokens
export const generateCsrfToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// JWT token validation
export const validateToken = (token) => {
  if (!token) return false;
  
  // Simple client-side validation (structure, not cryptographic)
  const parts = token.split('.');
  return parts.length === 3; // Header, payload, signature
};

// Security risk audit
export const auditSecurityRisks = () => {
  const risks = [];
  
  // Check for secure connection
  if (window.location.protocol !== 'https:' && 
      window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1') {
    risks.push('Site not using HTTPS connection');
  }
  
  // Check localStorage for sensitive data
  if (localStorage.getItem('password') || localStorage.getItem('creditcard')) {
    risks.push('Sensitive data stored in localStorage');
  }
  
  // Check for proper token storage
  if (localStorage.getItem('token') && !validateToken(localStorage.getItem('token'))) {
    risks.push('Invalid authentication token format');
  }
  
  return risks;
};

// Check input validation for common vulnerabilities
export const validateFormInput = (type, value) => {
  const validators = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /.{8,}/, // Minimum 8 characters
    name: /^[a-zA-Z\s]{2,50}$/,
    text: /.{1,5000}/ // Non-empty with reasonable length
  };
  
  return validators[type] ? validators[type].test(value) : false;
};

// Main security check function
export const securityCheck = () => {
  // Configure Content Security Policy
  configureCsp();
  
  // Perform security audit
  const securityRisks = auditSecurityRisks();
  
  // Log any security issues
  if (securityRisks.length > 0) {
    console.warn('Security audit detected issues:', securityRisks);
  }
  
  // Add security headers polyfill
  if (import.meta.env.PROD) {
    document.addEventListener('DOMContentLoaded', () => {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'X-XSS-Protection';
      meta.content = '1; mode=block';
      document.head.appendChild(meta);
    });
  }
  
  // Return security status
  return {
    secure: securityRisks.length === 0,
    risks: securityRisks
  };
};