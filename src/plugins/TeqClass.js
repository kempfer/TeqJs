/***
* TEQ JS
* PLUGINS Number
*
*
*
**/
'use strict';

(function () {
	
	var TeqNumber = {
		
		random : function (min,max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	};
	t.number = TeqNumber;
}());