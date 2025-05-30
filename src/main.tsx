
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Renderização otimizada
const renderApp = () => {
  const root = document.getElementById("root");
  if (root) {
    // Remove loading screen se ainda estiver presente
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.remove(), 300);
    }
    
    createRoot(root).render(<App />);
  }
};

// Setup de acessibilidade otimizado
const setupAccessibility = () => {
  // Skip Link
  if (!document.querySelector('a[href="#main-content"]')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-libra-navy focus:rounded';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  // Language
  document.documentElement.lang = 'pt-BR';
};

// Inicialização otimizada
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupAccessibility();
    renderApp();
  });
} else {
  setupAccessibility();
  renderApp();
}
