/*
 *
 * jquery-formatmoney - v0.0.1
 *
 * jQuery plugin to format data entry in the input text or the text display in the form of money.
 * 
 * Made by Troy Young
 *
 */
 (function ($) {
 	"use strict";
 	if (!$.broswer) {
 		$.broswer = {};
 		$.broswer.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
 		$.broswer.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
 		$.broswer.opera = /opera/.test(navigator.userAgent.toLowerCase());
 		$.broswer.msie = /msie/.test(navigator.userAgent.toLowerCase());
 	}

 	var FormatMoney = {
 		init: function(options) {
 			options = $.extend({
	 			prefix: "",
				thousands: ",",
	 			decimal: ".",
	 			precision: 2,
	 			allowZero: false,
	 			allowNegative: false
	 		}, options);
 			return this.each(function() {
 				var $that = $(this),
 					isInputNode = $that.is('input[type="text"]'),
 					isNegative = false;

 				// common method to format the value.
 				function format(value) {
 					var plainValue = value.replace(options.prefix, ''),
 						virtualValue = value.replace(/\D/g, ''),
 						decimalPos = plainValue.indexOf(options.decimal),
 						integerPart,
 						decimalPart,
 						newValue;

 					if(options.allowNegative) {
 						isNegative = /-/.test(value);
 					}

 					if(isNegative) {
 						decimalPos = decimalPos - 1;
 					}

 					if(decimalPos > -1) {
 						integerPart = virtualValue.slice(0, decimalPos);
 						if (integerPart === '') {
 							integerPart = '0';
 							decimalPart = virtualValue;
 						} else {
 							decimalPart = virtualValue.slice(decimalPos + 1, virtualValue.length);
 						}
 					} else {
 						integerPart = virtualValue;
 						decimalPart = '';
 					}
					

					// construct the new value

					// construct the integer part
					newValue = (isNegative ? '-' : '') + integerPart + options.decimal;

					// construct the decimal part
					if(options.precision > 0) {
						decimalPart = decimalPart.slice(0, options.precision);

						if(decimalPart.length < options.precision) {
							decimalPart = decimalPart + new Array(options.precision - decimalPart.length + 1).join(0);
						}

						newValue += decimalPart;
 					} 

 					return setSymbol(newValue);
 				}

 				function setSymbol(value) {
 					return options.prefix + value;
 				}



 				// if the node is a plain text node, just format it.
 				// but if the node is an input node, it should be binded events.
 				if(isInputNode) {
 					
 				} else {
 					$that.text(format($that.text()));
 				}

 			});
 		}
 	};

 	
 	// jQuery plugin extension
 	$.fn.formatmoney = function (options) {
 		return FormatMoney.init.call(this, options);
 	};

 })(window.jQuery || window.Zepto);