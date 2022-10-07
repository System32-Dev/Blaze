import { GenerateServiceWorker } from './swgen.mjs';
import Inject from './inject.mjs';
import fs from 'fs';
import http from 'http';
import path from 'path';
import chalk from 'chalk';
import { lookup } from 'mime-types';

class Blaze {
	constructor(pathname, config) {
		if (!pathname) this.path = path.resolve("./public");
		else this.path = path.resolve(pathname);

		console.log(chalk.bold(chalk.hex("#e69500")("Compiling Files...\n")));
		
		var __endpoints = {};
		for (let i = 0; i < fs.readdirSync(this.path).length; i++) {
			let file = fs.readdirSync(this.path)[i];
			try {
				let route = file == "index.html" ? "/" : "/" + file;
				let contents = fs.readFileSync(path.join(path.resolve(pathname), file)).toString();
				let contentType = lookup(file);
				if (contentType == "text/html") contents = Inject(contents, `<script>if ("serviceWorker" in navigator) {navigator.serviceWorker.register("/blazesw.js", {scope: "/",});}</script>`);
				if (file != "blazesw.js") console.log("🟢 " + chalk.bold(chalk.green("Compiled:"+path.join(pathname,file)))+"\n");
				__endpoints[route] = {
					content: contents,
					type: contentType,
				}
			} catch (e) {
				console.log("🔴" + chalk.red("Could Not Compile\n"));
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