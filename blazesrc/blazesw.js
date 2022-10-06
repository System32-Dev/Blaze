function Serve(path) {
	let serve = serves[path];
	return new Response(serve.content, {
		headers: serve.headers
	})
}

self.addEventListener("fetch", (event) => {
	if (serves[new URL(event.request.url).pathname]) {
		event.respondWith(Serve(new URL(event.request.url).pathname));
	}
});