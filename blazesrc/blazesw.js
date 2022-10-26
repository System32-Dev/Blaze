function Serve(path) {
	let serve = serves[path];
	if (serve) {
		return new Response(serve.content, {
			status: 200,
			"status-text": "Success",
			headers: {
				"content-type": serve.type
			}
		})
	}
		
	else {
		return new Response(notFound, {
			status: 404,
			"status-text": "Not Found",
			headers: {
				"content-type": "text/html",
			}
		})
	}
}

self.addEventListener("fetch", (event) => {
	event.respondWith(Serve(new URL(event.request.url).pathname));
})