const CACHE_NAME = 'libra-cache-v1';
const STATIC_CACHE = 'libra-static-v1';
const DYNAMIC_CACHE = 'libra-dynamic-v1';
const IMAGE_CACHE = 'libra-images-v1';

// Recursos críticos para cache estático
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/images/logos/logo-libra.svg',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
];

// Cache de imagens com TTL de 7 dias
const IMAGE_TTL = 7 * 24 * 60 * 60 * 1000;

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache estático para recursos críticos
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      // Cache separado para imagens
      caches.open(IMAGE_CACHE)
    ])
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName.startsWith('libra-') && 
                   ![STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE].includes(cacheName);
          })
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Estratégia específica para cada tipo de recurso
  if (request.url.includes('youtube.com') || request.url.includes('img.youtube.com')) {
    // YouTube content - cache with short TTL
    handleYouTubeContent(event);
  } else if (request.url.includes('/images/')) {
    // Images - cache with TTL
    handleImageRequest(event);
  } else if (CRITICAL_RESOURCES.some(resource => request.url.includes(resource))) {
    // Critical resources - cache first, network fallback
    handleCriticalResource(event);
  } else {
    // Other resources - network first, cache fallback
    handleDefaultResource(event);
  }
});

function handleYouTubeContent(event) {
  event.respondWith(
    caches.open(DYNAMIC_CACHE).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          // Check if cached version is still fresh (1 hour)
          const cachedTime = new Date(response.headers.get('sw-cached-at') || 0);
          const isExpired = Date.now() - cachedTime.getTime() > 3600000;
          
          if (!isExpired) return response;
        }
        
        return fetchAndCache(event.request, cache, 3600000); // 1 hour TTL
      });
    })
  );
}

function handleImageRequest(event) {
  event.respondWith(
    caches.open(IMAGE_CACHE).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          const cachedTime = new Date(response.headers.get('sw-cached-at') || 0);
          const isExpired = Date.now() - cachedTime.getTime() > IMAGE_TTL;
          
          if (!isExpired) return response;
        }
        
        return fetchAndCache(event.request, cache, IMAGE_TTL);
      });
    })
  );
}

function handleCriticalResource(event) {
  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetchAndCache(event.request, cache);
      });
    })
  );
}

function handleDefaultResource(event) {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
}

async function fetchAndCache(request, cache, ttl = null) {
  try {
    const fetchResponse = await fetch(request);
    if (fetchResponse.status === 200) {
      const responseToCache = fetchResponse.clone();
      
      // Add timestamp header if TTL is specified
      if (ttl) {
        const headers = new Headers(responseToCache.headers);
        headers.set('sw-cached-at', new Date().toISOString());
        
        const modifiedResponse = new Response(responseToCache.body, {
          status: responseToCache.status,
          statusText: responseToCache.statusText,
          headers: headers
        });
        
        cache.put(request, modifiedResponse.clone());
      } else {
        cache.put(request, responseToCache);
      }
    }
    return fetchResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline content not available');
  }
}
