import { Blaze } from './blazesrc/index.mjs';
import path from 'path';

const blazeServer = new Blaze("./public");

blazeServer.listen(8080, "0.0.0.0");