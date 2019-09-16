const assert = require("assert");

const semver = require("../semver");

describe("parse", function() {
	function check(version, result) {
		it("should parse " + version + " as " + JSON.stringify(result), function() {
			assert.deepEqual(semver.parse(version), result);
		});
	}

	function fail(version) {
		it("should not parse " + version, function() {
			const expected_message = "Failed to parse version number: " + version;
			try {
				semver.parse(version);
			}
			catch (e) {
				assert.equal(e.message, expected_message);
				return;
			}
			assert.fail(`Got no error; expected “${expected_message}”`);
		});
	}

	check("1.0.0", [1, 0, 0]);
	fail("1.0.01");
	fail("1.o.2");
	fail("1.2.3.4");
	fail("1.2..3");
	fail(".2.3");
	check("0.0.0", [0, 0, 0]);
	check("0.2.125", [0, 2, 125]);
	check("2.3.4-foo", [2, 3, 4, "foo"]);
	check("2.3.4-alpha.1", [2, 3, 4, "alpha", 1]);
	check("2.3.4-alpha.0", [2, 3, 4, "alpha", 0]);
	fail("2.3.4-alpha.01");
});

describe("join", function() {
	function check(version, expected) {
		it("should join " + JSON.stringify(version) + " to " + expected, function() {
			assert.deepEqual(semver.join(version), expected);
		});
	}

	check([1, 2, 3], "1.2.3");
	check([0, 1, 0, "alpha", 3], "0.1.0-alpha.3");
});

describe("cmp", function() {
	function describeComparator(c) {
		switch (c) {
			case "<": return "before";
			case "=": return "equal to";
			case ">": return "after";
		}
	}
	function comparatorValue(c) {
		switch (c) {
			case "<": return -1;
			case "=": return 0;
			case ">": return +1;
		}
	}
	function check(a, comparator, b) {
		it(`should sort ${a} ${describeComparator(comparator)} ${b}`, function() {
			assert.deepEqual(
				semver.cmp(semver.parse(a), semver.parse(b)),
				comparatorValue(comparator)
			);
		});
		if (comparator === "<") check(b, ">", a);
	}

	check("0.99.0", "<", "1.0.0");
	check("1.0.0-alpha", "<", "1.0.0");
	check("1.0.0", "=", "1.0.0");
	check("1.0.0-alpha", "<", "1.0.0-alpha.1");
	check("1.0.0-alpha.1", "<", "1.0.0-alpha.1.1");
	check("1.0.0-alpha.1.2", "<", "1.0.0-alpha.1.foo");
	check("1.0.0-alpha.1.1", "<", "1.0.0-alpha.1.2");
	check("1.2.9", "<", "1.2.10");
	check("1.2.9", "<", "1.3.0");
	check("1.2.9", "<", "3.0.0");
});

describe("sorting", function() {
	it("should sort a list of version numbers correctly", function() {
		const version_numbers = [
			"2.3.0",
			"1.0.0",
			"2.3.10-beta.1",
			"2.3.10",
			"2.3.10-alpha.2",
			"2.3.10-alpha.1.2",
			"2.3.9",
			"3.1.9",
			"2.3.10-alpha.1",
		];

		const sorted = version_numbers
			.map(semver.parse)
			.sort(semver.cmp)
			.map(semver.join);

		assert.deepEqual(sorted, [
			"1.0.0",
			"2.3.0",
			"2.3.9",
			"2.3.10-alpha.1",
			"2.3.10-alpha.1.2",
			"2.3.10-alpha.2",
			"2.3.10-beta.1",
			"2.3.10",
			"3.1.9",
		]);
	});
});
