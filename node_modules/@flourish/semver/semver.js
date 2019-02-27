'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function toNumber(x) {
	if (x.match(/^\d+$/)) return +x;
	else return x;
}

function parse(v) {
	const mo = v.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:[a-zA-Z0-9-]*[a-zA-Z-][a-zA-Z0-9-]*|0|[1-9]\d*)(?:\.(?:[a-zA-Z0-9-]*[a-zA-Z-][a-zA-Z0-9-]*|0|[1-9]\d*))*))?$/);
	if (!mo) throw new Error("Failed to parse version number: " + v);
	return [ mo[1], mo[2], mo[3] ].concat(mo[4] ? mo[4].split(".") : []).map(toNumber);
}

function join(a) {
	let r = a.slice(0, 3).join(".");
	if (a.length > 3) r += "-" + a.slice(3).join(".");
	return r;
}

function cmp(a, b) {
	if (a == b) return 0;
	if (a < b) return -1;
	if (a > b) return +1;
}

// Numbers sort numerically; strings sort lexicographically; numbers come before strings
function cmpAlphanum(a, b) {
	const a_is_numeric = (typeof a === "number"),
	      b_is_numeric = (typeof b === "number");

	if (a_is_numeric && !b_is_numeric) return -1;
	if (!a_is_numeric && b_is_numeric) return +1;

	return cmp(a, b);
}

// Compare parsed version numbers per semver spec
function cmpVersions(a, b) {
	const n = Math.min(a.length, b.length);
	for (var i = 0; i < n; i++) {
		const c = cmpAlphanum(a[i], b[i]);
		if (c != 0) return c;
	}
	if (n == 3) {
		return cmp(b.length, a.length);
	}
	return cmp(a.length, b.length);
}

exports.parse = parse;
exports.join = join;
exports.cmp = cmpVersions;
