import fs from 'fs';
import path from 'path';

export function GenerateServiceWorker(routes, errFile) {
	if (!errFile) errFile = "<center><h1>404 Not Found</h1><hr><p>blaze</p></center>";
	delete routes["/blazesw.js"];
	let base = fs.readFileSync(path.resolve("./blazesrc/blazesw.js")).toString();
	let serveString = "const serves = " + JSON.stringify(routes) + ";\n\n";
	return serveString+"const notFound = `"+errFile+"`\n\n"+base;
}