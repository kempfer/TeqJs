(function (t) {

	'use strict';
	
	t.Class.define('t.geometry.rect',{
	
		init : function (options) {
			//this.defaultOptions = t.canvas.shapes.rect.options;
			//this.callParent(options);
		},
		form: function () {
			
		},
		to: function () {
			
		},
		center : function () {
			
		},
		hasPoint : function () {
			
		}
	});
	
	t.geometry.rect.getCenter = function (x,y,w,h) {
		return {
			x : x + (x + w - x)/2,
			y : y + (y + h - y)/2
		};
	};
	t.geometry.rect.getVertices = function (x,y,w,h) {
		return [
			{ x : x, y : y},
			{ x : x + w, y :y},
			{ x : x + w, y :y + h},
			{ x : x, y :y + h},
		];
	};
	t.geomery.rect.intersects = function (rect,rect2) {
		
	};
})(window.t);