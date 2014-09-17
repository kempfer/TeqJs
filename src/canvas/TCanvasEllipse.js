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
		var degree = t.canvas.degree(this.getAngle());
		ctx.beginPath();		
		ctx.ellipse(
			this._x,
			this._y, 
			this.getXRadius(),
			this.getYRadius(),
			degree,
			t.canvas.degree(this.getStart()),
			t.canvas.degree(this.getEnd())
		);		
		this._renderFill(ctx);
		this._renderStroke(ctx);
		ctx.closePath();
	},
	_counted : function () {
		this._x =  this.getX();
		this._y =  this.getY();
	},
	_transform : function  () {
	}
});

t.canvas.ellipse.options = t.combine (t.canvas.object.options, {
	xRadius: 20,
	yRadius: 10,
	start: 0,
	end : 360
});