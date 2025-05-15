
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Execute when the document is ready
const renderApp = () => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Check if the document is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Add preloading for key pages when idle
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Preload key components that will be lazy-loaded
    import('./pages/Index.tsx')
      .catch(e => console.error('Error preloading component:', e));
  }, { timeout: 2000 });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(() => {
    import('./pages/Index.tsx')
      .catch(e => console.error('Error preloading component:', e));
  }, 2000);
}

// Add service worker registration in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
