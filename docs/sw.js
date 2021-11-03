var cacheName = "HappyPlaceCache"
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(
                [
                    "./index.html",
                    "./style.css",
                    "./manifest.webmanifest",
                    "./js/app.js",
                    "./js/default_list.json",
                    "./assets/fonts/comfortaa.ttf",
                    "./assets/fonts/dripicons-v2.woff",
                    "./assets/icons/apple-touch-icon.png",
                    "./assets/icons/favicon.ico",
                    "./assets/icons/hp-icon192.png",
                    "./assets/icons/hp-icon512.png"
                ]
            );
        })
    );
});