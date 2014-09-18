t.Class.define('t.canvas.object', {

	Implements : [t.Base.Class.Event],
	init : function (options) {
		this.options = t.combine(this.defaultOptions,options);
		var self = this;
		for(var i in this.options) {
			this['get' + t.string.ucfirst(i)] = (function () {			
				var key = i;			
				return function(){ return self.option(key); };
			})();
		}
	},
	option : t.accessor({
		get : function (key) {
			return this.options[key];
		},
		set : function (key,val) {
			this.options[key] = val;
		}
	}),
	set : function (key,val) {
		this.options[key] = val;
		return this;
	}, 
	render : function (ctx) {
		var ctx = ctx || t.canvas.buffer();
		ctx.save();
		ctx.fillStyle = this.getFill();
		ctx.strokeStyle = this.getStrokeStyle();
		ctx.globalAlpha = this.getOpacity();
		this._transform(ctx);
		this._render(ctx);
		ctx.restore();
	},
	_renderFill : function (ctx) {
		if(this.getFill()){
			ctx.fill();
		}	
	},
	_renderStroke : function (ctx) {
		if(this.getStrokeStyle()){
			ctx.lineWidth = this.getStrokeWidth();
			ctx.stroke();
		}
	},
	_transform : function (ctx) {
		if(this.getAngle()) {
			ctx.translate(this.getX() + this.getWidth()/2, this.getY() + this.getHeight()/2);
			ctx.rotate(t.canvas.degree(this.getAngle()));
		}
	}
});
t.canvas.object.options = {
	x : 0,
	y : 0,	
	fill : '#000000',
	angle : false,
	strokeStyle : false,
	strokeWidth : 1,
	scaleX : 1,
	scaleY : 1,
	flipX : false,
	flipY : false,
	opacity: 1
}