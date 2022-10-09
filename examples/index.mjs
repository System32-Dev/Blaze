import { Blaze } from '../index.mjs';

const BlazeServer = new Blaze("./public", {
	watch: true,
});

BlazeServer.listen(8080);