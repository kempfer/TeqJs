(function (t) {
	'use strict';
		
	t.Class.define('t.canvas.point',{
	
		x : 0,
		
		y : 0,
		
		init : function (x,y) {
			if (arguments.length != 2) {
				if(t.isArrayLike(x)) {
					y = x[1];
					x = x[0];
				}
				else if(t.isObject(x) && x.x != null && x.y != null) {
					y = x.y;
					x = x.x;
				}
				else{
					throw new TypeError( 'Wrong Arguments In Point' );
				}
			}
			this.x = Number(x);
			this.y = Number(y);
			return this;
		},
		/** @returns {object} */
		toObject: function () {
			return { x: this.x, y: this.y };
		},
		toArray: function () {
			return [ this.x, this.y ];
		},
		clone : function () {
			return new t.canvas.point(this.x,this.y);
		}

	});
	t.canvas.point.from = function (object) {
		if(!object){
			return null;
		}
		return object instanceof t.canvas.point ? object : new t.canvas.point (object);
	};
})(window.t)