"use strict";

const parseSrcset = require("parse-srcset");

const Transform = require("./transform");

// We only support attributes that are specified in HTML5,
// so no <applet archive>, <object codebase>, etc.

const URL_ATTRS = {
	"a": new Set(["href"]),
	"area": new Set(["href"]),
	"audio": new Set(["src"]),
	"base": new Set(["href"]),
	"blockquote": new Set(["cite"]),
	"button": new Set(["formaction"]),
	"command": new Set(["icon"]),
	"del": new Set(["cite"]),
	"embed": new Set(["src"]),
	"frame": new Set(["src"]),
	"html": new Set(["manifest"]),
	"iframe": new Set(["src"]),
	"img": new Set(["longdesc", "src"]),
	"input": new Set(["src", "formaction"]),
	"ins": new Set(["ins"]),
	"form": new Set(["action"]),
	"link": new Set(["href"]),
	"menuitem": new Set(["icon"]),
	"object": new Set(["data"]),
	"script": new Set(["src"]),
	"source": new Set(["src"]),
	"track": new Set(["src"]),
	"video": new Set(["src", "poster"]),
};

// Attributes that can contain a URL as part of a longer string
const SPECIAL_URL_ATTRS = {
	"meta": {
		"content": convertMetaContentIfRefresh
	},
	"img": {
		"srcset": convertImgSrcset
	},
};

const SVG_NAMESPACE = "http://www.w3.org/2000/svg",
      XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";

function serializeSrcsetEntry(entry) {
	let descriptor;
	if ("d" in entry) {
		descriptor = entry.d + "x";
	}
	else if ("w" in entry && "h" in entry) {
		descriptor = entry.w + "w " + entry.h + "h";
	}
	else if ("w" in entry) {
		descriptor = entry.w + "w";
	}
	else if ("h" in entry) {
		descriptor = entry.h + "h";
	}

	return entry.url + " " + descriptor;
}

function serializeSrcset(srcset) {
	return srcset.map(serializeSrcsetEntry).join(", ");
}

function convertImgSrcset(link_transformer, value) {
	const parsed_srcset = parseSrcset(value);
	for (let entry of parsed_srcset) {
		entry.url = link_transformer(entry.url);
	}
	return serializeSrcset(parsed_srcset);
}

function convertMetaContentIfRefresh(link_transformer, value, element) {
	let is_refresh = false;
	for (let attr of element.attrs) {
		if (attr.name == "http-equiv" && /^\s*refresh\s*$/i.test(attr.value)) {
			is_refresh = true;
		}
	}
	if (!is_refresh) return value;

	let mo = value.match(/^(\s*\d+;\s*url=)(.*)/i);
	if (!mo) return value;

	return mo[1] + transformURLWithSpaces(link_transformer, mo[2]);
}


// See https://www.w3.org/TR/html5/infrastructure.html#valid-url-potentially-surrounded-by-spaces
function stripSpace(s) {
	const leading_space = s.match(/^[ \t\r\n\x0C]*/)[0],
	      trailing_space = s.match(/[ \t\r\n\x0C]*$/)[0];

	return [
		leading_space,
		s.substring(leading_space.length,
		s.length - trailing_space.length), trailing_space
	];
}

function transformURLWithSpaces(link_transformer, url_with_spaces) {
	const [leading_space, url, trailing_space] = stripSpace(url_with_spaces);
	return leading_space + link_transformer(url) + trailing_space;
}

function transformStyle(link_transformer, css) {
	function replacer(s, prefix, url, suffix) {
		return prefix + transformURLWithSpaces(link_transformer, url) + suffix;
	}

	css = css.replace(/(url\(\s*")((?:\\.|[^"])*)("\s*\))/g, replacer);
	css = css.replace(/(url\(\s*')((?:\\.|[^'])*)('\s*\))/g, replacer);
	css = css.replace(/(url\(\s*)([^"'\s](?:\\.|[^)])*)(\s*\))/g, replacer);

	return css;
}

class RewriteLinks {
	constructor(link_transformer) {
		this.transform = new Transform(this.transformLinks.bind(this, link_transformer));
	}

	rewrite(source) {
		return this.transform.transform(source);
	}

	rewriteDocument(document) {
		return this.transform.transformDocument(document);
	}

	transformLinks(link_transformer, element) {
		// SVG elements use "href" consistently for links: glory be!
		// These may be in the legacy XLink namespace, or simply not namespaced.
		if (element.namespaceURI == SVG_NAMESPACE) {
			for (let attr of element.attrs) {
				if (attr.name == "href" && (!attr.namespace || attr.namespace == XLINK_NAMESPACE)) {
					attr.value = transformURLWithSpaces(link_transformer, attr.value);
				}
			}

			return;
		}

		if (element.tagName == "style") {
			let style_type;
			for (let attr of element.attrs) {
				if (attr.name == "type") style_type = attr.value;
			}
			if (!style_type || /^\s*text\/css\s*$/i.test(style_type)) {
				if (element.childNodes[0] && element.childNodes[0].nodeName == "#text") {
					let css = element.childNodes[0].value;
					element.childNodes[0] = {
						nodeName: "#text",
						parentNode: element,
						value: transformStyle(link_transformer, css)
					};
					element.childNodes.length = 1;
				}
			}
			return;
		}

		if (!element.attrs) return;

		const url_attrs = URL_ATTRS[element.tagName],
		      special_url_attrs = SPECIAL_URL_ATTRS[element.tagName];

		for (let attr of element.attrs) {
			if (attr.name == "style") {
				attr.value = transformStyle(link_transformer, attr.value);
			}
			else if (url_attrs && url_attrs.has(attr.name)) {
				attr.value = transformURLWithSpaces(link_transformer, attr.value);
			}
			else if (special_url_attrs && attr.name in special_url_attrs) {
				attr.value = special_url_attrs[attr.name](link_transformer, attr.value, element);
			}
		}
	}
}

module.exports = RewriteLinks;
