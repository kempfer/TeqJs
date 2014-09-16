t.Class.define('t.canvas.triangle', {
	
	Extend : t.canvas.object,
	
	_x : 0,
	
	_y : 0,
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
		var widthBy2 = this.getWidth() / 2,
			heightBy2 = this.getHeight() / 2;
	    ctx.beginPath();
	    ctx.moveTo(this._x , this._y - heightBy2);
	    ctx.lineTo(this._x + widthBy2, this._y  + heightBy2);
	    ctx.lineTo(this._x - widthBy2, this._y  + heightBy2);
	    ctx.closePath();
		this._renderFill(ctx);
		this._renderStroke(ctx);
	},
	_counted : function () {
		this._x = (!this.getAngle()) ? this.getX() : - this.getWidth()/2;
		this._y = (!this.getAngle()) ? this.getY() : - this.getHeight()/2;
	}
});

t.canvas.triangle.options = t.combine (t.canvas.object.options, {
	width: 50,
	height: 50,
});