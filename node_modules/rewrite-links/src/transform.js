"use strict";

const fs = require("fs"),
      stream = require("stream"),

      parse5 = require("parse5");

class Transform {
	constructor(transformer) {
		this.transformer = transformer;
	}

	transform(input) {
		if (typeof input === "string") {
			return this.transformString(input);
		}
		if (typeof input === "object") {
			if (input instanceof Buffer) {
				return this.transformBuffer(input);
			}
			if (input instanceof stream.Readable) {
				return this.transformStream(input);
			}
		}
		return Promise.reject(Error("Don’t know what to do with input: " + input));
	}

	transformString(string) {
		const document = parse5.parse(string)
		return this.transformDocument(document)
			.then(parse5.serialize);
	}

	transformBuffer(buffer) {
		return this.transformString(buffer.toString("utf8"));
	}

	transformStream(stream) {
		return new Promise(function(resolve, reject) {
			const chunks = [];

			stream
				.on("data", (chunk) => {
					chunks.push(chunk);
				})
				.on("end", () => {
					resolve(Buffer.concat(chunks));
				})
				.on("error", () => {
					reject(error);
				});
		})
		.then(this.transformBuffer.bind(this));
	}

	transformDocument(document) {
		this.transformElement(document);
		return Promise.resolve(document);
	}

	transformElement(element) {
		const prune = this.transformer(element);
		if (prune) return;

		const child_nodes = element.childNodes;
		if (!child_nodes) return;

		for (let child of child_nodes) {
			this.transformElement(child);
		}
	}
}

module.exports = Transform;
