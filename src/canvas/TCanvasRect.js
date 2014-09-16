t.Class.define('t.canvas.rect',{
	Extend : t.canvas.object,
	
	init : function (options) {
		this.defaultOptions = t.canvas.rect.options;
		this.callParent(options);
	},
	_render : function (ctx) {		
		this._renderFill(ctx);
		this._renderStroke(ctx);
	},
	_renderFill : function (ctx) {
		if(this.getFill()){
			ctx.fillRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
		}		
	},
	_renderStroke : function (ctx) {
		if(this.getStrokeStyle()){
			ctx.lineWidth = this.getStrokeWidth();
			ctx.strokeRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
		}
	}
});

t.canvas.rect.options = t.combine (t.canvas.object.options, {
	width: 20,
	height: 20,
});