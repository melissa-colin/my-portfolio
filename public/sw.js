const CACHE_NAME = 'melissa-portfolio-v1';
const STATIC_CACHE_NAME = 'melissa-static-v1';
const DYNAMIC_CACHE_NAME = 'melissa-dynamic-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/images/profile-image.webp',
  '/assets/images/profile-image.jpeg',
  '/assets/images/favicon.ico',
  // Add critical CSS and JS files (will be populated by build process)
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          console.log('Serving from cache:', request.url);
          return response;
        }

        // Clone the request because it's a stream
        const fetchRequest = request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a stream
            const responseToCache = response.clone();

            // Determine which cache to use
            let cacheName = DYNAMIC_CACHE_NAME;
            
            // Cache images for longer
            if (request.url.includes('/assets/images/')) {
              cacheName = STATIC_CACHE_NAME;
            }

            // Cache the response
            caches.open(cacheName)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Fallback for offline scenarios
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // Fallback for images
            if (request.destination === 'image') {
              return caches.match('/assets/images/fallback.svg');
            }
          });
      })
  );
});

// Background sync for analytics when online
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

// Handle push notifications (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/images/favicon.png',
      badge: '/assets/images/favicon.png',
      data: data.data
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Utility function to sync analytics data
async function syncAnalytics() {
  try {
    // Implement analytics sync logic here
    console.log('Syncing analytics data...');
  } catch (error) {
    console.error('Failed to sync analytics:', error);
  }
}
