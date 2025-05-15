
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a separate chunk for the app with improved loading strategy
const renderApp = () => {
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
