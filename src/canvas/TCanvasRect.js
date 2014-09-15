t.Class.define('t.canvas.rect',{
	Extend : t.canvas.object,
	
	init : function (options) {
		this.defaultOptions = t.canvas.rect.options;
		this.callParent(options);
	},
	_render : function (ctx) {
		return ctx.fillRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
	}
});

t.canvas.rect.options = t.combine (t.canvas.object.options, {});