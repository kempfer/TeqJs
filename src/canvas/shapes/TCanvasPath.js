(function (t) {
	'use strict';
	
	var pathPart = function pathPart (part) {
		var methods = ['moveTo','lineTo','curveTo'];
		if(!t.contains(methods,part.method)){
			new Error('unknown method -> ' + part.method);
		}
		this.method = part.method;
		this.points = part.points.map(t.canvas.point);
		return this;
	};
	
	
	t.Class.define('t.canvas.shapes.path',{
		
		Extend : t.canvas.shape,
		
		init : function (options) {
			this.defaultOptions = t.canvas.shapes.path.options;
			this.callParent(options);
			var rect = this.getRect();
			this.originalOptions.x = rect.x;
			this.originalOptions.y = rect.y;
			this.set('x',rect.x);
			this.set('y',rect.y);
			this.set('width',rect.w);
			this.set('height',rect.h);
		},
		set : function (key,val, fire) {
			this.callParent(key,val, fire);
			if(key == 'parts'){
				var i;
				this.options['parts'] = [];
				for(i = 0; i < val.length; i++) {
					this.push(val[i]);
				}
			}
			return this;
		},
		get length () {
			return this.getParts().length;
		},
		moveTo : function (point) {
			var part = { method : 'moveTo', points :  point};
			this.push(part);
		},
		lineTo : function (point) {
			var part = { method : 'lineTo', points :  point};
			this.push(part);
		},
		curveTo : function (point,cp,cp2) {
			var part = { method : 'lineTo', points :  point};
			this.push( part);
		},
		push : function (part) {
			this.getParts().push(new pathPart(part));
			return this;
		},
		unshift : function (part) {
			this.getParts().unshift(part);
			return this;
		},
		pop : function () {
			return this.getParts().pop();
		},
		shift : function () {
			return this.getParts().shift();
		},
		get points () {
			var i,k, part,
				points = [], parts = this.getParts();
			for(i = 0; i < parts.length; i++) {
				part = parts[i];
				for(k = 0; k < part.points.length; k++) {
					t.array.include(points,part.points[k]);
				}
			}
			return points;
		},
		getRect : function () {
			var from, to,
				points = this.points,
				length = points.length;
			while(length--){
				if(from){
					from.x = Math.min(from.x, points[length].x);
					from.y = Math.min(from.y, points[length].y);
					to.x = Math.max(to.x, points[length].x);
					to.y = Math.max(to.y, points[length].y);
					
				}
				else{
					from = points[length].clone();
					to = points[length].clone();
				}
				
			}
			return {
				x : from.x,
				y : from.y,
				w : (to.x - from.x) * this.getScaleX(),
				h : (to.y - from.y) * this.getScaleY()
			};
		},
		_render : function (ctx) {	
			var i,part,parts;
				this._counted();
				parts = this._parts;
			ctx.beginPath();
			for(i = 0; i < parts.length; i++) {
				part = parts[i];
				if(part.method == 'curveTo'){
					if(part.points.length == 2) {
						ctx.quadraticCurveTo(part.points[0].x, part.points[0].y,part.points[1].x, part.points[1].y);
					}
					else if (part.points.length == 3) {
						ctx.bezierCurveTo(part.points[0].x, part.points[0].y,part.points[1].x, part.points[1].y,part.points[2].x, part.points[2].y);
					}
				}
				else{
					ctx[part.method ](part.points[0].x, part.points[0].y);
				}
			}
			ctx.closePath();
			this._renderFill(ctx);
			this._renderStroke(ctx);
		},
		_counted : function () {
			var center, part,i,points,
				parts = this.getParts();
			this._parts = [];
			console.log(this.getX());
			for(i = 0; i < parts.length; i++) {
				part = parts[i];				
				if(this.isTransform()) {
					center = this.getCenter();											
					points = part.points.map(function (point) {						
						point = point.clone();
						point.x = point.x - center.x - (this.originalOptions.x - this.getX());
						point.y = point.y - center.y - (this.originalOptions.y - this.getY());												
						return point;
					}.bind(this));
				}
				else{
					points = part.points.map(function (point) {
						point = point.clone();						
						point.x = point.x  - (this.originalOptions.x - this.getX());
						point.y = point.y - (this.originalOptions.y - this.getY());
						return point;
					}.bind(this));
				}				
				this._parts.push(new pathPart({ method : part.method, points :  points}));
			}					
		}
	});
	t.canvas.shapes.path.options = t.combine (t.canvas.shape.options, {
		strokeStyle : '#000',
		fill : false,
		parts : []
	});
})(window.t)
