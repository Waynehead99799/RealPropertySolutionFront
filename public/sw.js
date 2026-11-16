/*
 * Retirement notice for the old next-pwa service worker.
 * Returning visitors still have the previous worker (and its caches) installed.
 * When the browser fetches this file it replaces that worker, clears every cache
 * it created, unregisters itself and reloads open tabs, so nobody is stuck on a
 * stale copy of the old site.
 */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
            await self.registration.unregister();
            const clients = await self.clients.matchAll({ type: "window" });
            clients.forEach((c) => c.navigate(c.url));
        })(),
    );
});
