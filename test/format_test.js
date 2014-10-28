"use strict";

module("format");
test("plain text emtpy test", function() {
	var span = $("#plaintext");
	span.formatmoney();
	equal(span.text(), "0.00", "set the 0.00 as the default value when the node is emtpy");
});

test("plain text integer value display with the 2 decimal test", function() {
	var span = $("#plaintext");
	span.text('123');
	span.formatmoney();
	equal(span.text(), "123.00", "format the integer value to 2 decimal");
});

test("plain text integer value test", function() {
	var span = $("#plaintext");
	span.text('123');
	span.formatmoney({precision: 0});
	equal(span.text(), "123", "integer format");
});

test("plain text integer value test", function() {
	var span = $("#plaintext");
	span.text('1235');
	span.formatmoney({precision: 0});
	equal(span.text(), "1,235", "integer format");
});

test("plain text decimal value test", function() {
	var span = $("#plaintext");
	span.text('123.5');
	span.formatmoney({precision: 3});
	equal(span.text(), "123.500", "decimal format");
});

test("plain text decimal value with prefix test", function() {
	var span = $("#plaintext");
	span.text('123.5');
	span.formatmoney({precision: 3, prefix: "$"});
	equal(span.text(), "$123.500", "decimal format");
});

