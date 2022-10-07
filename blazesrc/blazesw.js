function Serve(path) {
	let serve = serves[path];
	let content = serve.content;
	return new Response(content, {
		headers: {
			"content-type": serve.type
		}
	})
}

self.addEventListener("fetch", (event) => {
	if (serves[new URL(event.request.url).pathname]) {
		event.respondWith(Serve(new URL(event.request.url).pathname));
	}
});