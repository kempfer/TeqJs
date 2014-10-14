(function (t) {
	'use strict';
	
	var pathPart = function pathPart (part) {
		var methods = ['moveTo','lineTo','curveTo'];
		if(!t.contains(methods,part.method)){
			new Error('unknown method -> ' + part.method);
		}
		this.method = part.method;
		this.points = part.points;
		return this;
	};
	
	
	t.Class.define('t.canvas.shapes.path',{
		
		Extend : t.canvas.shape,
		
		init : function (options) {
			this.defaultOptions = t.canvas.shapes.path.options;
			this.callParent(options);
		},
		set : function (key,val, fire) {
			if(key == 'parts'){
				var i;
				this.options['parts'] = [];
				for(i = 0; i < val.length; i++) {
					this.push(val[i]);
				}
			}
			this.callParent(key,val, fire);
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
			return  this.getParts().push(new pathPart(part));
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
		_render : function (ctx) {	
			var i,part,
				parts = this.getParts();
			this._counted();
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
			
		}
	});
	t.canvas.shapes.path.options = t.combine (t.canvas.shape.options, {
		strokeStyle : '#000',
		fill : false,
		parts : []
	});
})(window.t)