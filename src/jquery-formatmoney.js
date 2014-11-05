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
	 			precision: 2
	 		}, options);

 			return this.each(function() {
 				var $that = $(this),
 					isInputNode = $that.is('input[type="text"]');

 				// format the value based on the configuration
 				function format(value) {
 					var plainValue = value.replace(options.prefix, ''),
 						fixedValue = Number(plainValue).toFixed(options.precision),
 						decimalPart = '',
 						integerPart,
 						splitValue,
 						newValue;

 					// split the fixed value, get the integer part and decimal part, in order to add the thousands symbol
 					splitValue = fixedValue.replace(/-/, '').split(options.decimal);
 					integerPart = splitValue[0];

 					// if the precision is bigger than 0, means here should add the decimal part, otherwise it will be ''
 					if(options.precision > 0) {
 						decimalPart = splitValue[1];
 					}

 					// add the thousands symbol
 					integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousands);

 					newValue = (isNegative(value) ? '-' : '') + integerPart;

                    if(options.precision > 0) {
                        newValue = newValue + options.decimal + decimalPart;
                    }
                    
 					return setSymbol(newValue);
  				}

  				// set the prefix symbol
 				function setSymbol(value) {
 					return options.prefix + value;
 				}

 				function isNegative(value) {
 					return /-/.test(value);
 				}

 				function changeSign(value) {
 					value = value.replace('-', '').replace(options.prefix, '');
 					return setSymbol('-' + value);
 				}

                // move the cursort to the end
 				function moveCursort2End() {
                    var range;

  					if($that.createTextRange) {
 						range = $that.createTextRange();
 						range.collapse(false);
 						range.select();
 					}
 				}

 				function focusEvent() {
 					moveCursort2End();
 				}

 				function keypressEvent(e) {
 					e = e || window.event;

 					var key = e.which || e.charCode || e.keyCode,
 						thousandsRe = new RegExp(options.thousands, 'gm'),
 						inputChar,
 						splitValue,
 						integerPart,
 						decimalPart,
 						finalValue,
 						value;

 					if(key === undefined) {
 						return false;
 					}

					if (key < 48 || key > 57) {
                        // -(minus) key
                        if (key === 45) {
                            $that.val(changeSign($that.val()));
                            return false;
                        // +(plus) key
                        } else if (key === 61) {
                            $that.val($input.val().replace('-', ''));
                            return false;
                        // enter key or tab key
                        } else if (key === 13 || key === 9) {
                            return true;
                        } else if ($.browser.mozilla && (key === 37 || key === 39) && e.charCode === 0) {
                            // needed for left arrow key or right arrow key with firefox
                            // the charCode part is to avoid allowing "%"(e.charCode 0, e.keyCode 37)
                            return true;
                        } else { // any other key with keycode less than 48 and greater than 57
                            preventDefault(e);
                            return true;
                        }
                    } else {
                    	e.preventDefault();

                    	inputChar = String.fromCharCode(key);
                    	value = $that.val().replace(options.prefix, '').replace(thousandsRe, '');


                    	if(options.precision > 0) {
                    		// move the decimal symbol
                    		splitValue = value.replace('-', '').split(options.decimal);
                    		integerPart = splitValue[0];
                    		decimalPart = splitValue[1];

                    		integerPart = integerPart + decimalPart[0];
                    		decimalPart = decimalPart.substring(1, decimalPart.length) + inputChar;

                    		finalValue = integerPart + options.decimal + decimalPart;

                    	} else {
                    		// integer
                    		finalValue = value + inputChar;
                    	}
                    	
                    	$that.val(format(finalValue));
                    }

 					// after set the value, move it to the end.
 					moveCursort2End();
 				}

 				function keydownEvent(e) {
 					e = e || window.event;
                    var key = e.which || e.charCode || e.keyCode,
                        value,
                        splitValue,
                        integerPart,
                        decimalPart,
                        isNegative,
                        constructValue,
                        newValue;
                    //needed to handle an IE "special" event
                    if (key === undefined) {
                        return false;
                    }

                    if (key === 8 || key === 46 || key === 63272) { // backspace or delete key (with special case for safari)
                        e.preventDefault();

                        value = $that.val();
                        isNegative = /-/.test(value);

                        value = value.replace(new RegExp(options.thousands, 'gm'), '').replace(options.prefix, '').replace('-', '');

                        splitValue = value.split(options.decimal);
                        integerPart = splitValue[0];
                        decimalPart = splitValue[1];

                        decimalPart = integerPart[integerPart.length - 1] + decimalPart;
                       	integerPart = integerPart.substring(0, integerPart.length - 1);

                       	constructValue = integerPart + options.decimal + decimalPart;

                        newValue = Number(constructValue).toFixed(options.precision);
                        newValue = options.prefix + (isNegative ? '-' : '') + constructValue;

                        $that.val(format(newValue));
 					}
 				}

 				// if the node is a plain text node, just format it.
 				// but if the node is an input node, it should be binded events.
 				if(isInputNode) {
 					$that.val(format($that.val()));
 					$that.unbind('.formatmoney');
 					$that.bind('focus.formatmoney', focusEvent);
 					$that.bind('keypress.formatmoney', keypressEvent);
 					$that.bind('keydown.formatmoney', keydownEvent);
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

 })(window.jQuery);