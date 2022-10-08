function Serve(path) {
	let serve = serves[path];
	return new Response(serve.content, {
		status: 200,
		statusText: "Success",
		headers: {
			"content-type": serve.type
		}
	})
}

self.addEventListener("fetch", (event) => {
	if (serves[new URL(event.request.url).pathname]) {
		event.respondWith(Serve(new URL(event.request.url).pathname));
	} /*else {
		event.respondWith(new Response(notFound, {
			status: 404,
			statusText: "Not Found",
			headers: {
				"content-type": "text/html"
			}
		}));
	}*/
});