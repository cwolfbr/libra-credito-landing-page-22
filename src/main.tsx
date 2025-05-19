
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Identify critical elements and initialize immediately
const setupAccessibility = () => {
  // Add Skip Link for keyboard navigation (skipping to main content)
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-libra-navy focus:rounded';
  skipLink.textContent = 'Pular para o conteúdo principal';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Set page language to help screen readers
  document.documentElement.lang = 'pt-BR';
};

// Optimized rendering setup
const renderApp = () => {
  setupAccessibility();
  
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Execute when the document is ready - optimize for first contentful paint
if (document.readyState === 'loading') {
  // Fix: Explicitly type document to ensure TypeScript recognizes addEventListener
  (document as Document).addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Register service worker for better performance and offline capabilities
// Move to requestIdleCallback to avoid blocking rendering
if ('serviceWorker' in navigator) {
  const registerSW = () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  };
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(registerSW, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    window.addEventListener('load', () => {
      setTimeout(registerSW, 1000); // Delay to prioritize UI rendering
    });
  }
}

// Use intelligent preloading for key resources after initial render
const preloadCriticalResources = () => {
  // Preconnect to critical domains if not already preconnected
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://img.youtube.com'
  ];
  
  preconnectDomains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

// Defer non-critical operations
if ('requestIdleCallback' in window) {
  // Very low priority operations
  window.requestIdleCallback(() => {
    preloadCriticalResources();
    
    // Prefetch other pages for faster navigation
    const prefetchLinks = [
      './pages/NotFound.tsx'
    ];
    
    prefetchLinks.forEach(link => {
      const linkElement = document.createElement('link');
      linkElement.rel = 'prefetch';
      linkElement.href = link;
      linkElement.as = 'script';
      document.head.appendChild(linkElement);
    });
  }, { timeout: 3000 });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(preloadCriticalResources, 2000);
}
