(function (t) {

	'use strict';
	
	var circle = {
	
		/** @returns {boolean} */
		hasPoint : function hasPoint (circle,point) {
			var lengthSegment, x, x2, y, y2;
			point = point || {x : null, y : null};
			x = circle.x, x2 = point.x;
			y = circle.y, y2 = point.y;
			lengthSegment = Math.sqrt(Math.pow(x - x2,2) + Math.pow(y - y2,2) );
			return lengthSegment <= circle.r;
		},
		/** @returns {boolean} */
		intersects : function intersects (circle,circle2) {
			var lengthSegment, x, x2, y, y2;
			point = point || {x : null, y : null};
			x = circle.x, x2 = circle2.x;
			y = circle.y, y2 = circle2.y;
			lengthSegment = Math.sqrt(Math.pow(x - x2,2) + Math.pow(y - y2,2) );
			return lengthSegment <= circle.r + circle2.r;
		},
		area : function area (circle) {
			return Math.PI * circle.r * circle.r;
		}
	};
	
	if(!t.geometry){
		t.geometry = {};
	};
	
	t.geometry.circle = circle;	
})(window.t);