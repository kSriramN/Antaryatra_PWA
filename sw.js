/* =========================================================
   ANTAR YATRA — SERVICE WORKER

   Bump VERSION on every deploy.  Everything else takes care
   of itself.

   Strategy:
     - page navigations : network first, cache as fallback
                          (so a new deploy is always visible,
                           and the temple still opens offline)
     - everything else  : serve from cache immediately, then
                          quietly refresh it in the background
   ========================================================= */

const VERSION = "v4";
const CACHE = "antar-yatra-" + VERSION;

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./temple.css",
  "./app.js",
  "./panchang.js",
  "./vendor/mhah-panchang.esm.js",
  "./vendor/suncalc.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./lord-ram.jpg"
];


self.addEventListener("install", event => {

  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );

});


self.addEventListener("activate", event => {

  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(k => k !== CACHE)
            .map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );

});


self.addEventListener("fetch", event => {

  const request = event.request;

  // Never touch anything but plain GETs from our own origin.
  if (request.method !== "GET") return;

  if (new URL(request.url).origin !== self.location.origin) return;


  const isPage =
    request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");


  // ---- Pages: network first ----------------------------
  if (isPage) {

    /*
     * no-store, deliberately.  A plain fetch() still goes
     * through the browser's own HTTP cache, which is exactly
     * what makes a fresh deploy invisible.
     */
    const fresh = fetch(request.url, {
      cache: "no-store",
      credentials: "same-origin"
    });

    event.respondWith(
      fresh
        .then(response => {

          const copy = response.clone();

          caches
            .open(CACHE)
            .then(cache => cache.put(request, copy));

          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then(cached => cached || caches.match("./index.html"))
        )
    );

    return;
  }


  // ---- Assets: cache first, refresh behind the scenes ---
  event.respondWith(
    caches.open(CACHE).then(cache =>

      cache.match(request).then(cached => {

        const network = fetch(request)
          .then(response => {

            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }

            return response;
          })
          .catch(() => cached);

        return cached || network;
      })
    )
  );

});
