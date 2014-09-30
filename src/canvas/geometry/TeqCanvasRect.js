(function (t) {

	'use strict';
	
	if(!t.geometry){
		t.geometry = {};
	};
		
	t.geometry.rect.getCenter = function getCenter (rect) {
		return {
			x : rect.x + (rect.x + rect.w - rect.x)/2,
			y : rect.y + (rect.y + rect.h - rect.y)/2
		};
	};
	t.geometry.rect.getVertices = function getVertices (rect) {
		return [
			{ x : rect.x, y : rect.y},
			{ x : rect.x + rect.w, y : rect.y},
			{ x : rect.x + rect.w, y : rect.y + rect.h},
			{ x : rect.x, y :rect.y + rect.h},
		];
	};
	t.geomery.rect.intersects = function  intersects (rect,rect2) {
		
	};
	t.geomery.rect.hasPoint = function hasPoint  (point, rect){
		
	};
	t.geomery.rect.area = function area (rect) {
		return rect.w * rect.h;
	};
})(window.t);