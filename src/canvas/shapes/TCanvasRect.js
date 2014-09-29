(function (t) {
	'use strict';
	
	t.Class.define('t.canvas.shapes.rect',{
	
		Extend : t.canvas.shape,
		
		init : function (options) {
			this.defaultOptions = t.canvas.shapes.rect.options;
			this.callParent(options);
		},
		_render : function (ctx) {	
			this._counted();
			ctx.beginPath();
			ctx.rect(this._x,this._y,this.getWidth(),this.getHeight());
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

	t.canvas.shapes.rect.options = t.combine (t.canvas.shape.options, {
		width: 1,
		height: 1,
	});
})(window.t)
