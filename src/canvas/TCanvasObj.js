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
		this._render(ctx);
		ctx.restore();
	}
});
t.canvas.object.options = {
	x : 0,
	y : 0,	
	fill : 'red',
	angle : 0,
	strokeStyle : false,
	strokeWidth : 1,
	scaleX : 1,
	scaleY : 1,
	flipX : 0,
	flipY : 0,
	opacity: 1
}