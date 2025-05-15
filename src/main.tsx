
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Pré-carregar fontes críticas
const preloadFonts = () => {
  const fontLinks = document.querySelectorAll('link[rel="preconnect"][href*="fonts"]');
  if (fontLinks.length) {
    // As fontes já estão sendo pré-carregadas, não precisamos fazer nada
    return;
  }
};

// Executar quando o documento estiver pronto
const renderApp = () => {
  preloadFonts();
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Verificar se o documento já está carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Adicionar preloading para páginas chave quando estiver ocioso
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Pré-carregar componentes chave que serão lazy-loaded
    import('./pages/Index.tsx')
      .catch(e => console.error('Error preloading component:', e));
  }, { timeout: 1500 });
} else {
  // Fallback para navegadores que não suportam requestIdleCallback
  setTimeout(() => {
    import('./pages/Index.tsx')
      .catch(e => console.error('Error preloading component:', e));
  }, 1500);
}

// Adicionar registro de service worker em produção
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

// Adicionar strategy para imagens
const observerOptions = {
  rootMargin: '200px',
  threshold: 0.01
};

if ('IntersectionObserver' in window) {
  window.addEventListener('load', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, observerOptions);
    
    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  });
}
