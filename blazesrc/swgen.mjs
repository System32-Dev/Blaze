import fs from 'fs';
import path from 'path';

export function GenerateServiceWorker() {
	let base = fs.readFileSync(path.resolve("./blazesw.js")).toString();
	
}