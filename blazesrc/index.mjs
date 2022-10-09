import { GenerateServiceWorker } from './swgen.mjs';
import { lookup } from 'mime-types';
import Inject from './inject.mjs';
import fs from 'fs';
import http from 'http';
import path from 'path';
import chalk from 'chalk';

function CompileFile(file, __endpoints, pathname, showStatus) {
	if (!showStatus) showStatus = true;
	try {
		let route = file == "index.html" ? "/" : "/" + file;
		let contents = fs.readFileSync(path.join(path.resolve(pathname), file)).toString();
		let contentType = lookup(file);
		if (contentType == "text/html") contents = Inject(contents, `<script>caches.open('serviceworker').then( cache => {cache.add('/blazersw.js').then( () => {console.log("ServiceWorker cached")});});if ("serviceWorker" in navigator) {navigator.serviceWorker.register("/blazesw.js", {scope: "/",});}</script>`);
		if (file != "blazesw.js" && showStatus) console.log("🟢 " + chalk.bold(chalk.green("Compiled:"+path.join(pathname,file)))+"\n");
		__endpoints[route] = {
			content: contents,
			type: contentType,
		}
		return true;
	} catch (e) {
		if (showStatus) console.log("🔴" + chalk.red("Could Not Compile\n"));
		return false;
	}
}

class Blaze {
	constructor(pathname, config) {
		if (!pathname) this.path = path.resolve("./public");
		else this.path = path.resolve(pathname);

		console.log(chalk.bold(chalk.hex("#e69500")("Compiling Files...\n")));
		
		var __endpoints = {};
		for (let i = 0; i < fs.readdirSync(this.path).length; i++) {
			var file = fs.readdirSync(this.path)[i];
			let compiled = CompileFile(file, __endpoints, pathname);
			if (compiled == true && config.watch == true) {
				// Watch File
				let watchedFile = file;
				if (file != "blazesw.js") {
					fs.watchFile(path.join(path.resolve(pathname), watchedFile), {interval:4000}, (...metaData) => {
						CompileFile(watchedFile, __endpoints, pathname, false);
						fs.writeFileSync(path.join(pathname, "blazesw.js"), GenerateServiceWorker(__endpoints));
					})
				}
			}
		}
		
		this.__endpoints = __endpoints;
		
		fs.writeFileSync(path.join(pathname, "blazesw.js"), GenerateServiceWorker(this.__endpoints));
		
		this.__endpoints["/blazesw.js"] = {
			content: fs.readFileSync(path.join(pathname, "blazesw.js")).toString(),
			type: "text/javascript"
		}

		console.log(chalk.bold(chalk.hex("#e69500")("Compiling Done\n")));
	}

	requestHandler(request, response, __endpoints) {
		let route = request.url=="/"?"/index.html":request.url;

		try {
			if (__endpoints[request.url]) {
				response.writeHeader(200, "Success", {
					"content-type": __endpoints[request.url].type,
				})

				response.end(__endpoints[request.url].content);
			}
		} catch (e) {
			response.writeHeader(404, "Not Found", {
				"content-type": "text/html"
			})
		}
	}

	findHost(host, port) {
		let url = "";
		if ('REPL_SLUG' in process.env) {
			url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`.toLowerCase();
		} else {
			url = `https://${host=="0.0.0.0"?"localhost":host}:${port}`;
		}
		return chalk.bold(chalk.hex("#d65610")(url));
	}

	listen(port, host) {
		if (!port) port = 80;
		if (!host) host = "0.0.0.0";
		const __endpoints = this.__endpoints;
		const requestHandler = this.requestHandler;
		const server = http.createServer((request, response) => {
			requestHandler(request, response, __endpoints)
		});
		server.listen(port, host);
		console.log("🔥"+`${chalk.red(chalk.bold("Blaze"))} ${chalk.hex("#FFA500")("Running On")} `+ chalk.underline(this.findHost(host, port)));
	}
}

export {
	Blaze
}