(function (t) {
	'use strict';

	t.Class.define('t.canvas.triangle', {
		
		Extend : t.canvas.object,
		
		/**
		* Constructor
		* @param {Object} [options] Options object
		* @return {Object} thisArg
		*/
		init : function initTriangle (options) {
			this.defaultOptions = t.canvas.triangle.options;
			this.callParent(options);
		},
		_render : function (ctx) {	
			this._counted();
			var widthByTo = this.getWidth() / 2,
				heightByTo = this.getHeight() / 2;
			ctx.beginPath();
			ctx.moveTo(this._x + widthByTo , this._y);
			ctx.lineTo(this._x + this.getWidth(), this._y + this.getHeight());
			ctx.lineTo(this._x, this._y + this.getHeight());
			ctx.closePath();
			this._renderFill(ctx);
			this._renderStroke(ctx);
		},
		_counted : function () {
			this._x = (!this.isTransform()) ? this.getX()/this.getScaleX() : - this.getWidth()/2;
			this._y = (!this.isTransform()) ? this.getY()/this.getScaleY()  : - this.getHeight()/2;
		}
	});

	t.canvas.triangle.options = t.combine (t.canvas.object.options, {
		width: 50,
		height: 50,
	});

})(window.t)