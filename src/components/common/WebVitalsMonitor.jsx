import React from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Component pour monitorer les Core Web Vitals et les envoyer à Google Analytics
 * Ceci aide à améliorer les performances SEO et l'expérience utilisateur
 */

// Fonction pour envoyer les métriques à Google Analytics
function sendToGoogleAnalytics({ name, delta, value, id }) {
  // Vérifier si gtag est disponible
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
      custom_map: {
        metric_id: 'dimension1',
        metric_value: 'metric1',
        metric_delta: 'metric2',
      }
    });
  }
  
  // Aussi afficher en console pour le développement
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c[Web Vitals] ${name}:`, 'color: #4CAF50; font-weight: bold;', {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      delta: Math.round(name === 'CLS' ? delta * 1000 : delta),
      id
    });
  }
}

// Fonction pour afficher les conseils d'optimisation
function logOptimizationTips(metric) {
  if (process.env.NODE_ENV === 'development') {
    const tips = {
      CLS: [
        '• Ajouter des dimensions d\'image explicites',
        '• Éviter l\'insertion dynamique de contenu',
        '• Utiliser transform au lieu de changer layout'
      ],
      INP: [
        '• Réduire les tâches JavaScript longues',
        '• Optimiser les event listeners',
        '• Utiliser le code splitting'
      ],
      LCP: [
        '• Optimiser les images critiques',
        '• Améliorer le serveur/CDN',
        '• Éliminer les ressources bloquantes'
      ],
      FCP: [
        '• Minimiser CSS/JS critique',
        '• Optimiser les fonts',
        '• Utiliser resource hints'
      ],
      TTFB: [
        '• Optimiser le serveur',
        '• Utiliser un CDN',
        '• Mettre en cache les ressources'
      ]
    };
    
    const thresholds = {
      CLS: { good: 100, poor: 250 }, // En millisecondes pour l'affichage
      INP: { good: 200, poor: 500 },
      LCP: { good: 2500, poor: 4000 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    };
    
    const value = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);
    const threshold = thresholds[metric.name];
    
    let status = 'good';
    let color = '#4CAF50';
    
    if (value > threshold.poor) {
      status = 'poor';
      color = '#F44336';
    } else if (value > threshold.good) {
      status = 'needs improvement';
      color = '#FF9800';
    }
    
    console.log(`%c[${metric.name}] ${value}${metric.name === 'CLS' ? '' : 'ms'} - ${status}`, 
      `color: ${color}; font-weight: bold;`);
    
    if (status !== 'good' && tips[metric.name]) {
      console.log(`%cConseils d'optimisation pour ${metric.name}:`, 'color: #2196F3; font-weight: bold;');
      tips[metric.name].forEach(tip => console.log(`%c${tip}`, 'color: #666;'));
    }
  }
}

// Hook pour initialiser le monitoring des Web Vitals
export const useWebVitals = () => {
  React.useEffect(() => {
    // Monitorer toutes les métriques Core Web Vitals
    onCLS((metric) => {
      sendToGoogleAnalytics(metric);
      logOptimizationTips(metric);
    });
    
    onINP((metric) => {
      sendToGoogleAnalytics(metric);
      logOptimizationTips(metric);
    });
    
    onFCP((metric) => {
      sendToGoogleAnalytics(metric);
      logOptimizationTips(metric);
    });
    
    onLCP((metric) => {
      sendToGoogleAnalytics(metric);
      logOptimizationTips(metric);
    });
    
    onTTFB((metric) => {
      sendToGoogleAnalytics(metric);
      logOptimizationTips(metric);
    });
    
    // Monitorer les erreurs JavaScript
    window.addEventListener('error', (event) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'javascript_error', {
          event_category: 'Error',
          event_label: event.message,
          value: 1,
          non_interaction: true
        });
      }
    });
    
    // Monitorer les erreurs de ressources
    window.addEventListener('error', (event) => {
      if (event.target !== window && typeof gtag !== 'undefined') {
        gtag('event', 'resource_error', {
          event_category: 'Error',
          event_label: event.target.src || event.target.href,
          value: 1,
          non_interaction: true
        });
      }
    }, true);
    
  }, []);
};

// Component pour initialiser le monitoring
const WebVitalsMonitor = () => {
  useWebVitals();
  return null;
};

export default WebVitalsMonitor;
