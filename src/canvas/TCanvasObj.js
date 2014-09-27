(function (t) {
	'use strict';

	t.Class.define('t.canvas.object', {

		Implements : [t.Base.Class.Event],
		
		init : function (options) {
			this.originalOptions = t.combine(this.defaultOptions,options);
			this.options = {};
			this.type = this.type || this.name;
			var self = this;
			for(var i in this.originalOptions) {
				this['get' + t.string.ucfirst(i)] = (function () {			
					var key = i;
					return function(){ return self.option(key); };
				})();
			}
			this.reset();
		},
		option : t.accessor({
			get : function (key) {
				return this.options[key];
			},
			set : function (key,val) {
				this.options[key] = val;
			}
		}),
		set : function (key,val, fire) {
			if(key == 'scaleX' && val < 0) {
				this.options['flipX'] = !this.getFlipX();
				val *= -1;
			}
			if(key == 'scaleY' && val < 0) {
				this.options['flipY'] = !this.getFlipY();
				val *= -1;
			}
			this.options[key] = val;
			fire = fire || true;
			if(fire){
				this.fire('change',key);
			}
			return this;
		}, 
		render : function (ctx) {
			var ctx = ctx || t.canvas.buffer();
			ctx.save();
			ctx.globalAlpha = this.getOpacity();
			this._transform(ctx);
			this._render(ctx);
			ctx.restore();
			this.fire('render');
		},
		clone : function () {
			return t.canvas[this.name].factory(this.options);
		},
		renderTo : function  (ctx) {
			if(ctx instanceof t.canvas) {
				this.render(ctx.context);
			}
			else if(ctx instanceof CanvasRenderingContext2D){
				this.render(ctx);
			}
		},
		getCenter : function () {
			var rect = this.getRect();
			return t.canvas.centerRectangle(
				rect.x ,
				rect.y ,
				rect.w,
				rect.h
			);
		},
		getRect : function () {
			return {
				x : this.option('x'),
				y : this.option('y'),
				w : this.option('width') * this.getScaleX(),
				h : this.option('height') * this.getScaleY()
			}
		},
		reset : function () {
			for(var key in this.originalOptions){
				this.set(key,this.originalOptions[key], false);
			}
		},
		remove : function (ctx) {
			var context = ctx || this.context;
			var rect = this.getRect();
			context.clearRect(rect.x,rect.y,rect.w,rect.h);
		},
		_renderFill : function (ctx) {
			if(this.getFill()){
				ctx.fillStyle = this.getFill();
				ctx.fill();
			}	
		},
		_renderStroke : function (ctx) {
			if(this.getStrokeStyle()){
				ctx.strokeStyle = this.getStrokeStyle();
				ctx.lineWidth = this.getStrokeWidth();
				ctx.stroke();
			}
		},
		_transform : function (ctx) {
			if(this.isTransform()) {
				var center = this.getCenter();
				ctx.translate(center.x, center.y);
				ctx.rotate(t.canvas.degree(this.getAngle()));
			}
			ctx.scale(
				this.getScaleX() * (!t.isEmpty(this.getFlipX()) ? -1 : 1),
				this.getScaleY() * (!t.isEmpty(this.getFlipY()) ? -1 : 1)
			);
		},
		_showCenter : function () {
		
		},
		isTransform : function () {
			return (this.getAngle() || !t.isEmpty(this.getFlipX()) || !t.isEmpty(this.getFlipY()));
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
		opacity: 1,
		isShowCenter: false,
		shadowColor : false,
		shadowOffsetX : false,
		shadowOffsetY : false,
		shadowBlur : false
	}
})(window.t)