t.Class.define('t.canvas.ellipse',{
	
	Extend : t.canvas.object,
	
	_x : 0,
	
	_y : 0,
	
	init : function (options) {
		this.defaultOptions = t.canvas.ellipse.options;
		this.callParent(options);
	},
	_render : function (ctx) {	
		this._counted();		
		var transform = !!this.getAngle();
		ctx.beginPath();
		ctx.save();	
		ctx.transform(1, 0, 0, this.getYRadius()/this.getXRadius(), 0, 0);
		ctx.arc(
			transform ? 0 : this.getX() + this.getYRadius(),
			transform ? 0 : (this.getY() + this.getYRadius()) * this.getXRadius()/this.getYRadius(), 
			this.getXRadius(),
			t.canvas.degree(this.getStart()), 
			t.canvas.degree(this.getEnd()),
			false
		);
		ctx.restore();
		this._renderFill(ctx);
		this._renderStroke(ctx);
		ctx.closePath();
	},
	_counted : function () {
		this._x =  this.getX();
		this._y =  this.getY();
	}
});

t.canvas.ellipse.options = t.combine (t.canvas.object.options, {
	xRadius: 20,
	yRadius: 10,
	start: 0,
	end : 360
});