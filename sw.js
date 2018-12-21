self.addEventListener("install", (event) => {
	self.skipWaiting();
	if(!('caches') in self) return;
	console.log("service worker successfully installed");
		event.waitUntil(
			caches.open("version1").then((cache) => {
				return cache.addAll(['index.html', 'app.js', 'main.js', 'style.css']);
			})
		);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.open('version1').then((cache) => {
			return cache.match(event.request).then((response) => {
				let fetchPromise = fetch(event.request).then((networkResponse)=> {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
				event.waitUntil(fetchPromise);
				return response;
			})
		})
	);
})