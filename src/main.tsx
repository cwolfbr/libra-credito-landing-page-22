
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

// Otimização para carregamento mais rápido
const renderApp = () => {
  setupAccessibility();
  
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Execute immediately for faster loading
renderApp();

// Register service worker for better performance and offline capabilities
if ('serviceWorker' in navigator) {
  // Delay service worker registration to not block initial render
  setTimeout(() => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  }, 2000);
}

// Preload critical resources when browser is idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload key components that will be lazy-loaded
    import('./pages/Index.tsx').catch(() => {});
    import('./components/Hero.tsx').catch(() => {});
    import('./components/Benefits.tsx').catch(() => {});
    
    // Preload critical YouTube thumbnails
    const heroVideoId = 'E9lwL6R2l1s';
    const testimonialVideoId = 'ETQRA4cvADk';
    
    [heroVideoId, testimonialVideoId].forEach(videoId => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      document.head.appendChild(preloadLink);
    });
  });
}
