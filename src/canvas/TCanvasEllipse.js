(function (t) {
	'use strict';
	
	t.Class.define('t.canvas.ellipse',{
		
		Extend : t.canvas.object,
		
		init : function (options) {
			this.defaultOptions = t.canvas.ellipse.options;
			this.callParent(options);
		},
		set: function (key, val, fire) {
			this.callParent(key, val, fire);
			if(key == 'xRadius'){
				this.set('width',val*2);
			
			}
			if(key == 'yRadius') {
				this.set('height',val*2);
			}
			return this;
		},
		_render : function (ctx) {	
			this._counted();		
			ctx.beginPath();
			ctx.save();	
			ctx.transform(1, 0, 0, this.getYRadius()/this.getXRadius(), 0, 0);
			ctx.arc(
				this._cx,
				this._cy, 
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
			this._cx = (!this.isTransform()) ? this.getX() + this.getXRadius() :   0;
			this._cy =  (!this.isTransform()) ? (this.getY() + this.getYRadius()) * this.getXRadius()/this.getYRadius() :  0;
		}
	});

	t.canvas.ellipse.options = t.combine (t.canvas.object.options, {
		xRadius: 20,
		yRadius: 10,
		start: 0,
		end : 360
	});
})(window.t)