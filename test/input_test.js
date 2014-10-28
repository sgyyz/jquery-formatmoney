"use strict";

module("input");
test("format the value in the input field", function() {
	var input = $("#input");
	input.val("1.0");
	input.formatmoney({prefix: "$"});

	equal(input.val(), "$1.00", "format the value in the input field.");
});