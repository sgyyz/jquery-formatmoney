"use strict";

module("keypress");
test("key in the numbers", function() {
	var input = $("#input").formatmoney();

	keypress(input, 1);
	keypress(input, 2);
	keypress(input, 3);
	keypress(input, 4);
	keypress(input, 5);
	keypress(input, 6);

	equal(input.val(), "1,234.56", "format the value after keypressed.");
});

test("delete the numbers", function() {
	var input = $("#input").formatmoney();

	keypress(input, 1);
	keypress(input, 2);
	keypress(input, 3);

	// delete the last number.
	keydown(input, "backspace");

	equal(input.val(), "0.12", "delete the last number.");
});