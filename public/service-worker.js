
// Service Worker para cache e melhor performance offline

const CACHE_NAME = 'libra-credito-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.tsx',
  '/src/App.tsx',
  '/lovable-uploads/75b290f8-4c51-45af-b45c-b737f5e1ca37.png',
  '/favicon.ico',
  '/placeholder.svg'
];

// Instalar o service worker e cachear recursos iniciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar requisições e servir do cache quando possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retornar resposta
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(
          response => {
            // Verificar se obtemos uma resposta válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar a resposta
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                // Não cachear APIs ou recursos externos
                if (!event.request.url.includes('/api/') && 
                    !event.request.url.includes('youtube.com') &&
                    !event.request.url.includes('superagentes.ai')) {
                  cache.put(event.request, responseToCache);
                }
              });
              
            return response;
          }
        );
      })
    );
});

// Limpar caches antigos quando uma nova versão do service worker é ativada
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
