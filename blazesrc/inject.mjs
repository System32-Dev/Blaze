import { parse, parseFragment, serialize } from 'parse5';

export default function (source, inject) {
	var parsed = parse(source);
	parsed.childNodes[0].childNodes[2].childNodes.push(parseFragment(inject).childNodes[0]);
	let headnodes = parsed.childNodes[0].childNodes[0];
	headnodes.childNodes.push(parseFragment(`<link rel="manifest" href="/manifest.json"></link>`).childNodes[0]);
	parsed.childNodes[0].childNodes[0] = headnodes;
	return serialize(parsed);
}