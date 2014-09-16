t.Class.define('t.canvas.rect',{
	Extend : t.canvas.object,
	
	_x : 0,
	
	_y : 0,
	
	init : function (options) {
		this.defaultOptions = t.canvas.rect.options;
		this.callParent(options);
	},
	_render : function (ctx) {	
		this._counted();

		this._renderFill(ctx);
		this._renderStroke(ctx);
	},
	_renderFill : function (ctx) {
		if(this.getFill()){
			ctx.fillRect(this._x,this._y,this.getWidth(),this.getHeight());
		}		
	},
	_renderStroke : function (ctx) {
		if(this.getStrokeStyle()){
			ctx.lineWidth = this.getStrokeWidth();
			ctx.strokeRect(this._x,this._y,this.getWidth(),this.getHeight());
		}
	},
	_counted : function () {
		this._x = (!this.getAngle()) ? this.getX() : - this.getWidth()/2;
		this._y = (!this.getAngle()) ? this.getY() : - this.getHeight()/2;
	}
});

t.canvas.rect.options = t.combine (t.canvas.object.options, {
	width: 20,
	height: 20,
});