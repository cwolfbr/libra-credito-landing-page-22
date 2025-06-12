import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * Ponto de entrada da aplicação React.
 * Responsável por inicializar a árvore de componentes e aplicar
 * pequenas melhorias de acessibilidade antes do primeiro render.
 */

/**
 * Insere elementos de acessibilidade básicos na página
 * e define o idioma padrão do documento.
 */
const setupAccessibility = (): void => {
  // Adicionar Skip Link para navegação por teclado
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-libra-navy focus:rounded';
  skipLink.textContent = 'Pular para o conteúdo principal';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Definir idioma da página
  document.documentElement.lang = 'pt-BR';
};

/**
 * Monta a aplicação React dentro do elemento #root.
 */
const renderApp = (): void => {
  setupAccessibility();
  
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

renderApp();
