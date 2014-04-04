(function () {
	'use strict';
	
	var cloneFn = function () {
	
	};
	
	var TeqPromise = function (resolver) {
        if (! (this instanceof TeqPromise)) {
            return new TeqPromise(resolver);
        }

		return new Promise(resolver);		
	};
	t.promise = TeqPromise;
})();