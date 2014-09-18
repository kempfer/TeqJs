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
		ctx.arc(
			this._x ,
			this._y,
			this.getRadius(),
			t.canvas.degree(this.getStart()),
			t.canvas.degree(this.getEnd()),
			false
		);
		ctx.closePath();
		this._renderFill(ctx);
		this._renderStroke(ctx);
		
	},
	_counted : function () {
		this._x = this.getX();
		this._y =  this.getY();
	}
});


t.canvas.circle.options = t.combine (t.canvas.object.options, {
	radius: 5,
	start: 0,
	end : 360
});