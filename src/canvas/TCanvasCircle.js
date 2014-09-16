t.Class.define('t.canvas.circle', {

	Extend : t.canvas.object,
	
	_x : 0,
	
	_y : 0,
	
	init : function (options) {
		this.defaultOptions = t.canvas.circle.options;
		this.callParent(options);
	},
	_render : function (ctx) {	
		this._counted();
		ctx.beginPath();
		ctx.arc(this._x ,this._y,this.getRadius(),0,2 * Math.PI, false);
		this._renderFill(ctx);
		this._renderStroke(ctx);
		ctx.closePath();
	},
	_counted : function () {
		this._x = this.getX();
		this._y =  this.getY();
	}
});


t.canvas.circle.options = t.combine (t.canvas.object.options, {
	radius: 5
});