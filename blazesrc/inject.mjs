import { parse, parseFragment, serialize } from 'parse5';

class Preloader {
	rewriteDocument(ast) {
		ast.childNodes.forEach(node => node = this.element(node));
	}
	
	element(node) {
		if (node.childNodes) {
			node.childNodes.forEach(childNode => this.element(childNode))
		}
	}
}

export default function (source, inject) {
	//console.log(new Preloader().rewriteDocument(source));
	var parsed = parse(source);
	parsed.childNodes[0].childNodes[2].childNodes.push(parseFragment(inject).childNodes[0]);
	return serialize(parsed);
}