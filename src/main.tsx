
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a separate chunk for the app
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

// Add preloading for key pages when idle
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Preload key components that will be lazy-loaded
    import('./pages/Index.tsx');
  });
}
