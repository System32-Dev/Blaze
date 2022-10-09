import { parse, parseFragment, serialize } from 'parse5';

export default function (source, inject) {
	var parsed = parse(source);
	parsed.childNodes[0].childNodes[2].childNodes.push(parseFragment(inject).childNodes[0]);
	return serialize(parsed);
}