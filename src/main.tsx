
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Identify critical elements and initialize immediately
const setupAccessibility = () => {
  // Adicionar Skip Link para navegação por teclado (pulando para o conteúdo principal)
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-libra-navy focus:rounded';
  skipLink.textContent = 'Pular para o conteúdo principal';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Definir idioma da página para ajudar leitores de tela
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
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Register service worker for better performance and offline capabilities
// Move to requestIdleCallback to avoid blocking rendering
if ('serviceWorker' in navigator && 'requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  }, { timeout: 2000 });
} else if ('serviceWorker' in navigator) {
  // Fallback for browsers without requestIdleCallback
  window.addEventListener('load', () => {
    setTimeout(() => {
      navigator.serviceWorker.register('/service-worker.js')
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    }, 1000); // Delay to prioritize UI rendering
  });
}

// Use intelligent preloading for key resources
const preloadCriticalResources = () => {
  // Preconnect to critical domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://img.youtube.com'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // Preload critical images
  const preloadImage = (src: string) => {
    if (document.querySelector(`link[rel="preload"][href="${src}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  };
  
  preloadImage('/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png'); // Logo
};

// Defer non-critical operations
if ('requestIdleCallback' in window) {
  // Very low priority operations
  window.requestIdleCallback(() => {
    // Lazy load future pages
    import('./pages/Index.tsx').catch(() => {});
    
    preloadCriticalResources();
  }, { timeout: 3000 });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(preloadCriticalResources, 2000);
}
