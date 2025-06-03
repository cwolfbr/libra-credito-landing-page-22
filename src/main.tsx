import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Preconnect com domínios críticos
const preconnectDomains = [
  'https://www.youtube-nocookie.com',
  'https://i.ytimg.com'
];

preconnectDomains.forEach(domain => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

// Preload da thumbnail principal
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'image';
preloadLink.href = 'https://i.ytimg.com/vi/E9lwL6R2l1s/hqdefault.jpg';
document.head.appendChild(preloadLink);

// Renderização
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
