# rewrite-links

Makes a reasonable attempt to rewrite all links in an HTML5 document,
including those found in inline styles and stylesheets. It even parses
`<img srcset>` attributes to find the links hidden in there.

The actual rewriting is done by a user-supplied function.

```js
const RewriteLinks = require("rewrite-links");

function rewrite(url) {
	// Return rewritten URL
}
const rewriter = new RewriteLinks(rewrite);

rewriter.rewrite(input_document)
	.then((rewritten_document) => {
		// Do something with the rewritten document
	})
	.catch((error) => console.error(error));
```
Note that `input_document` can be a string, a Buffer, or a Readable stream.

Alternatively you can use the `.rewriteDocument` method to rewrite
an AST produced by [parse5](https://github.com/inikulin/parse5).

## Example application
The [`rebase`](bin/rebase) script is an example usage that rewrites
relative URLs in a document to be relative to a different base. This
could be useful as part of a large-scale website reorganisation, for
example. (Traditionally one might have used `<base href>` in such a
situation, but that breaks self-references like `#anchor` links and
`<form action="">`.)

## Limitations
* Doesn’t attempt to parse stylesheets properly: just rewrites anything
  that looks like a `url(…)` reference.
* Obviously it can’t do anything about URLs that are constructed using
  JavaScript code.
* Because it relies on parsing and serialising the HTML, it may change
  formatting details that are meaningless to the HTML5 parser, such as
  whitespace between the `<html>` and `<head>` tags.
* In [*really* pathological cases](https://github.com/whatwg/html/issues/1280),
  the semantics of (invalid) HTML can be changed simply by parsing and
  serialising it.
