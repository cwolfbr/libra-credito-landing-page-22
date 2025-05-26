
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Função para verificar necessidades de acessibilidade
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

// Use a separate chunk for the app with improved loading strategy
const renderApp = () => {
  setupAccessibility();
  
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Execute when the document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Register service worker for better performance and offline capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// Add preloading for key pages when idle
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Preload key components that will be lazy-loaded
    import('./pages/Index.tsx');
    // Use link preloading for critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = '/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png';
    document.head.appendChild(preloadLink);
  });
}
