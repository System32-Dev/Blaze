const serves = {"/":{"content":"<html><head>\n    <title>Blaze Demo</title>\n    <link rel=\"stylesheet\" href=\"style.css\">\n\t<meta charset=\"utf-8\">\n  </head>\n\n  <body>\n    <div class=\"content\">\n      <header>\n        <div class=\"title\">\n          <h1>🔥Blaze</h1>\n        </div>\n        <div class=\"page\">\n          <div class=\"tagline\">\n            <p>\n              Moving at the speed of light.\n            </p>\n          </div>\n          \n          <div class=\"stats\">\n            <h1>\n              Say goodbye to slow loading times.\n            </h1>\n\n\t\t\t<a href=\"/speed.html\">\n\t\t\t\t<button>\n\t\t\t\t\tSpeed Test\n\t\t\t\t</button>\n\t\t\t</a>\n\t\t\t  \n          </div>\n        </div>\n      </header>\n    </div>\n  \n\n<script>caches.open('serviceworker').then( cache => {cache.add('/blazersw.js').then( () => {console.log(\"ServiceWorker cached\")});});if (\"serviceWorker\" in navigator) {navigator.serviceWorker.register(\"/blazesw.js\", {scope: \"/\",});}</script></body></html>","type":"text/html"},"/speed.html":{"content":"<html><head>\n\t\t<title>Speed Test</title>\n\t\t<meta charset=\"utf-8\">\n\t\t<style>\n\t\t\t@import url(\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&display=swap\");\n\n\t\t\th1 {\n\t\t\t\tfont-family: \"Space Grotesk\", sans-serif;\n\t\t\t\ttext-align: center;\n  \t\t\t\tfont-size: 100px;\n  \t\t\t\tfont-weight: normal;\n  \t\t\t\tfont-style: normal;\n\t\t\t\tletter-spacing: 5px;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<h1>Loaded 🤯</h1>\n\t\t<a>Hello</a>\n\t\t<p>OMG Test</p>\n\t\n<script>caches.open('serviceworker').then( cache => {cache.add('/blazersw.js').then( () => {console.log(\"ServiceWorker cached\")});});if (\"serviceWorker\" in navigator) {navigator.serviceWorker.register(\"/blazesw.js\", {scope: \"/\",});}</script></body></html>","type":"text/html"},"/style.css":{"content":"@import url(\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&display=swap\");\n\n@keyframes speedIn {\n    0% {\n        position: relative;\n        left: -200%;\n    }\n\n    90% {\n        position: relative;\n        left: 30px;\n    }\n\n    100% {\n        position: relative;\n        left: 0px;\n    }\n}\n\n:root {\n    --bg: #d7620f;\n    --accent: #f2a60a;\n    --border: #f4f880;\n    --other: #e4e6f3;\n}\n\n.content {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    display: block;\n    width: 100%;\n    height: 100%;\n    font-family: \"Space Grotesk\", sans-serif;\n    overflow: hidden;\n}\n\n.content h1,\np,\na {\n    animation: slideIn 0.5s;\n}\n\nheader .title {\n    display: flex;\n    justify-content: center;\n}\n\nheader .title h1 {\n    text-align: center;\n    font-size: 100px;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: underline;\n    margin-bottom: 0px;\n}\n\nheader .page {\n    display: flex;\n    flex-wrap: wrap;\n    height: calc(100% - 200px);\n    width: 100%;\n    background-color: var(--bg);\n    display: flex;\n    justify-content: center;\n}\n\nheader .page .tagline {\n    width: 100%;\n    height: 50px;\n    background-color: #f2a60a;\n    font-style: italic;\n    text-align: center;\n    color: white;\n    overflow: hidden;\n}\n\nheader .page .tagline p {\n    font-style: italic;\n    font-weight: normal;\n}\n\nheader .page .stats {\n    z-index: 99;\n    width: 70%;\n    height: 50%;\n    background: darkgrey;\n    border: 5px solid grey;\n    text-align: center;\n}\n\nheader .page .stats h1 {\n    font-weight: normal;\n    font-style: normal;\n    color: white;\n}\n","type":"text/css"}};

const notFound = `<center><h1>404 Not Found</h1><hr><p>blaze</p></center>`

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