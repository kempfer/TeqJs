t.Class.define('t.canvas.polygon',{
	Extend : t.canvas.object,
	
	
	init : function (options) {
		this.defaultOptions = t.canvas.polygon.options;
		this.callParent(options);
	},
	_render : function (ctx) {	
		this._counted();
		var i,points,point;
		points = this.getPoints();		
		ctx.beginPath();
		ctx.moveTo(points[0].x, points.y);
		for(i = 0; i < points.length; i++){
			point = points[i];			
			ctx.lineTo(point.x,point.y);
		}
		ctx.closePath();
		this._renderFill(ctx);
		this._renderStroke(ctx);
	},
	
	_counted : function () {
				
	}
});

t.canvas.polygon.options = t.combine (t.canvas.object.options, {
	points: []	
});