(function (t) {

	'use strict';
	

	var rect = {
	
		getCenter : function getCenter (rect) {
			return {
				x : rect.x + rect.w/2,
				y : rect.y + rect.h/2
			};
		},
		getVertices : function getVertices (rect) {
			return [
				{ x : rect.x, y : rect.y},
				{ x : rect.x + rect.w, y : rect.y},
				{ x : rect.x + rect.w, y : rect.y + rect.h},
				{ x : rect.x, y :rect.y + rect.h},
			];
		},
		/** @returns {boolean} */
		intersects : function  intersects (rect,rect2) {
			var vertices, vertices2,from,from2,to,to2;
			vertices = t.geometry.rect.getVertices(rect), vertices2 = t.geometry.rect.getVertices(rect2);
			from = vertices[0], to = vertices[2];
			from2 = vertices2[0], to2 = vertices2[2];
			return from.x < to2.x && to.x > from2.x
				&& from.y < to2.y && to.y > from2.y;
		},
		/** @returns {boolean} */
		hasPoint : function hasPoint  (rect,point){
			var vertices , from, to;
			point = point || {x : null, y : null};
			vertices = t.geometry.rect.getVertices(rect);
			from = vertices[0], to = vertices[2];
			
			return	point.x != null &&
					point.y != null &&
					t.number.between(point.x,Math.min(from.x, to.x), Math.max(from.x, to.x), true) && 
					t.number.between(point.y, Math.min(from.y, to.y), Math.max(from.y, to.y), true);
		},
		area : function area (rect) {
			return rect.w * rect.h;
		}
	};
	
	if(!t.geometry){
		t.geometry = {};
	};
	t.geometry.rect = rect;	
})(window.t);
