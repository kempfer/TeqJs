(function (t) {
	'use strict';
	
	t.Class.define('t.canvas.shapes.roundedRect',{
	
		Extend : t.canvas.shape,
		
		init : function (options) {
			this.defaultOptions = t.canvas.shapes.roundedRect.options;
			this.callParent(options);
		},
		_render : function (ctx) {	
			var from, to,radius; 
			this._counted();
			ctx.beginPath();
			from = {x: this._x , y : this._y};
			to =  {x: this._x + this.getWidth() , y : this._y + this.getHeight() };
			radius = this.getRadius();
			ctx.moveTo (from.x, from.y+radius);
			ctx.lineTo (from.x,   to.y-radius);
			ctx.quadraticCurveTo(from.x, to.y, from.x + radius, to.y);
			ctx.lineTo (to.x-radius, to.y);
			ctx.quadraticCurveTo(to.x,to.y, to.x,to.y-radius);
			ctx.lineTo (to.x, from.y+radius);
			ctx.quadraticCurveTo(to.x, from.y, to.x-radius, from.y);
			ctx.lineTo (from.x+radius, from.y);
			ctx.quadraticCurveTo(from.x,from.y,from.x,from.y+radius);
			ctx.closePath();
			this._renderFill(ctx);
			this._renderStroke(ctx);
		},
		_counted : function () {
			var center = this.getCenter();
			this._x = (!this.isTransform()) ? this.getX()/this.getScaleX() : - this.getWidth()/2;
			this._y = (!this.isTransform()) ? this.getY()/this.getScaleY()  : - this.getHeight()/2;
		}
	});

	t.canvas.shapes.roundedRect.options = t.combine (t.canvas.shape.options, {
		width: 1,
		height: 1,
		radius: 1
	});
})(window.t)