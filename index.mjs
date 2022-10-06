import { Blaze } from './blazesrc/index.mjs';
import path from 'path';

const blazeServer = new Blaze(path.resolve("./public"));

Blaze.listen(8080);