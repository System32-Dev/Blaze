import { Blaze } from '../index.mjs';

const BlazeServer = new Blaze("./examples/public", {
	watch: true,
	PWA: true
});

BlazeServer.listen(8080);