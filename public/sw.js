// Self-unregistering service worker.
// The previous site registered a caching SW; returning visitors still have it.
// This version takes over, wipes all caches, and unregisters itself so the new
// static site is always served fresh. The new site does NOT register any SW.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        await self.registration.unregister();
        const clients = await self.clients.matchAll();
        clients.forEach((c) => c.navigate(c.url));
      } catch (e) {}
    })()
  );
});
