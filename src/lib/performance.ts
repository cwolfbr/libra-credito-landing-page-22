/**
 * Módulo de otimização de performance
 */

// Recursos críticos que devem ser pré-carregados
const CRITICAL_RESOURCES = [
  {
    url: 'https://i.ytimg.com/vi_webp/E9lwL6R2l1s/hqdefault.webp',
    type: 'image',
    as: 'image'
  }
];

// Domínios que precisam de preconnect
const PRECONNECT_DOMAINS = [
  'https://www.youtube-nocookie.com',
  'https://i.ytimg.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

/**
 * Inicializa otimizações de performance
 */
export function initializePerformanceOptimizations() {
  // Adiciona preconnect para domínios críticos
  PRECONNECT_DOMAINS.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload de recursos críticos
  CRITICAL_RESOURCES.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.url;
    link.as = resource.as;
    if (resource.type) {
      link.type = resource.type;
    }
    document.head.appendChild(link);
  });

  // Otimiza o TTFB
  if ('requestIdleCallback' in window) {
    // @ts-ignore
    requestIdleCallback(() => {
      // Pré-carrega recursos secundários quando o navegador estiver ocioso
      prefetchSecondaryResources();
    });
  }
}

/**
 * Pré-carrega recursos secundários
 */
function prefetchSecondaryResources() {
  // Adiciona prefetch para recursos que serão necessários em breve
  const secondaryResources = [
    '/images/logos/logo-libra.svg',
    'https://i.ytimg.com/vi/ETQRA4cvADk/hqdefault.webp' // Thumbnail do vídeo de depoimento
  ];

  secondaryResources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
} 