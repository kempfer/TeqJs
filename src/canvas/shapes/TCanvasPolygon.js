(function (t) {
	'use strict';

	t.Class.define('t.canvas.shapes.polygon',{
	
		Extend : t.canvas.shape,
		
		
		init : function (options) {
			this.defaultOptions = t.canvas.shapes.polygon.options;
			this.callParent(options);
			var rect = this._getRect();
			this.originalOptions.x = rect.x;
			this.originalOptions.x = rect.y;
			this.set('x',rect.x);
			this.set('y',rect.y);
			this.set('width',rect.w);
			this.set('height',rect.h);
		},
		_render : function (ctx) {	
			this._counted();
			var i,points,point;
			points = this._points;	
			ctx.polygon(points, true);
			this._renderFill(ctx);
			this._renderStroke(ctx);
		},
		_counted : function () {
			this._points = [];
			var i,points,point, center;
			if(this.isTransform()) {
				points = this.getPoints();
				center = this.getCenter();
				for(i = 0; i < points.length; i++){
					point = points[i];	this._points[i] = {};		
					this._points[i].x = point.x - center.x - (this.originalOptions.x - this.getX());
					this._points[i].y = point.y - center.y - (this.originalOptions.x - this.getY());
				}
			}
			else{
				points = this.getPoints();
				for(i = 0; i < points.length; i++){
					point = points[i];	this._points[i] = {};		
					this._points[i].x = point.x  - (this.originalOptions.x - this.getX());
					this._points[i].y = point.y - (this.originalOptions.x - this.getY());
				}
			}
		},
		_getRect : function () {
			var	min = this.getMin(), 
				max = this.getMax();
			return {
				x : min.x,
				y : min.y,
				w : (max.x - min.x) || 1,
				h : (max.y - min.y) || 1
			};
		
		},
		getMin : function () {
			var points,i,
				minX, minY;
			points = this.getPoints();	
			minX = points[0].x; minY = points[0].y;
			for(i = 0; i < points.length; i++){
				minX = Math.min(minX,points[i].x);
				minY = Math.min(minY,points[i].y);
			}
			return { x : minX, y : minY};			
		},
		getMax : function () {
			var points,i,
				maxX, maxY;
			points = this.getPoints();	
			maxX = points[0].x; maxY = points[0].y;
			for(i = 0; i < points.length; i++){
				maxX = Math.max(maxX,points[i].x);
				maxY = Math.max(maxY,points[i].y);
			}
			return { x : maxX, y : maxY};	
		}
	});

	t.canvas.shapes.polygon.options = t.combine (t.canvas.shape.options, {
		points: []	
	});

})(window.t)