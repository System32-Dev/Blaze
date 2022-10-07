const serves = {"/":{"content":"<html><head>\n\t\t<title>Blaze Demo</title>\n\t\t<link rel=\"stylesheet\" href=\"style.css\">\n\t<script>if (\"serviceWorker\" in navigator) {navigator.serviceWorker.register(\"/blazesw.js\", {scope: \"/\",});}</script></head>\n\n\t<body>\n\t\t<div class=\"content\">\n\t\t\t<header>\n\t\t\t\t<div class=\"title\">\n\t\t\t\t\t<h1>Blaze</h1>\n\t\t\t\t</div>\n\t\t\t</header>\n\t\t</div>\n\t\n</body></html>","type":"text/html"},"/style.css":{"content":".content {\n\tposition: absolute;\n\ttop: 0px; left: 0px;\n\tdisplay: block;\n\twidth: 100%; height: 100%;\n\tfont-family: -apple-system, BlinkMacSystemFont, sans-serif;\n\tbackground-color: #999999;\n}\n\nheader {\n\tmargin-top: 5vw;\n\theight: 10vw;\n\tbackground-color: #c2c2c2;\n\tborder: 3px solid black;\n\ttext-align: center;\n}\n\n.title {\n\tdisplay: inline;\n\tmargin-top: 2.5vw;\n\tfont-size: 32px;\n\tcolor: black;\n\ttext-decoration: underline;   \n    text-decoration-color: #b51a00;\n}\n\n.button {\n\twidth: 30%; height: 50px;\n}","type":"text/css"}};

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