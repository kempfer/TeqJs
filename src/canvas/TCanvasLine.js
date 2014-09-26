(function (t) {
	'use strict';
	t.Class.define('t.canvas.line', {

		Extend : t.canvas.object,
		/**
		* Constructor
		* @param {Object} [options] Options object
		* @return {Object} thisArg
		*/
		init : function initTriangle (options) {
			this.defaultOptions = t.canvas.line.options;
			this.callParent(options);
			this.set('width',Math.abs(this.originalOptions.x2 - this.originalOptions.x) || 1);
			this.set('height',Math.abs(this.originalOptions.y2 - this.originalOptions.y) || this.getStrokeWidth());
			return this;
		},
		_render : function (ctx) {	
			this._counted();
			ctx.beginPath();
			ctx.moveTo(this._x , this._y );
			ctx.lineTo(this._x2 , this._y2);
			ctx.closePath();
			this._renderStroke(ctx);
		},
		_counted : function () {
			this._x = (!this.isTransform()) ? this.getX()/this.getScaleX() : - this.option('width')/2;
			this._y = (!this.isTransform()) ? this.getY()/this.getScaleY()  : -this.option('height')/2;
			this._x2 = (!this.isTransform()) ? this.getX2()/this.getScaleX()  : this.option('width')/2 ;
			this._y2 = (!this.isTransform()) ? this.getY2()/this.getScaleY()   : this.option('height')/2 ;
		}

	});
	t.canvas.line.options = t.combine (t.canvas.object.options, {
		x: 50,
		y: 50,
		x2 : 60,
		y2 : 60,
		strokeStyle: '#000'
	});
})(window.t)