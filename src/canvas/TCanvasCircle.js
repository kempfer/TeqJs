(function (t) {
	'use strict';
	
	t.Class.define('t.canvas.circle', {

		Extend : t.canvas.object,
		
		init : function (options) {
			this.defaultOptions = t.canvas.circle.options;
			this.callParent(options);
		},
		set: function (key, val, fire) {
			this.callParent(key, val, fire);
			if(key == 'radius'){
				this.set('width',val*2);
				this.set('height',val*2);
			}
			return this;
		},
		_render : function (ctx) {	
			this._counted();
			ctx.beginPath();
			ctx.arc(
				this._cx ,
				this._cy,
				this.getRadius(),
				t.canvas.degree(this.getStart()),
				t.canvas.degree(this.getEnd()),
				false
			);
			ctx.closePath();
			this._renderFill(ctx);
			this._renderStroke(ctx);
		},
		_counted : function () {
			this._cx = (!this.isTransform()) ? this.getX() + this.getRadius() :   0;
			this._cy =  (!this.isTransform()) ? this.getY() + this.getRadius() :  0;
		}
	});


	t.canvas.circle.options = t.combine (t.canvas.object.options, {
		radius: 5,
		start: 0,
		end : 360
	});
	
})(window.t)
