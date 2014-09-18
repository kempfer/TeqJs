t.Class.define('t.canvas.line', {

	Extend : t.canvas.object,
	/**
	* Constructor
	* @param {Object} [options] Options object
	* @return {Object} thisArg
	*/
	init : function initTriangle (options) {
		this.defaultOptions = t.canvas.line.options;
		this.callParent(options);
	},
	_render : function (ctx) {	
		this._counted();
		ctx.beginPath();
		ctx.moveTo(this.getX() , this.getY());
		ctx.lineTo(this._x2 , this._y2);
		ctx.closePath();
		this._renderStroke(ctx);
	},
	_counted : function () {
		if(this.getAngle()) {
			var radians,l;
			radians = t.canvas.degree(this.getAngle());
			l = t.canvas.lengthSegment(this.getX(),this.getY(),this.getX2(),this.getY2());
			this._x2 = this.getX() + l* Math.cos(radians);
			this._y2 = this.getY() + l * Math.sin(radians);
		}
		else{
			this._x2 = this.getX2();
			this._y2 = this.getY2();
		}
	},
	_transform : function (ctx) {
		return;
	}

});
t.canvas.line.options = t.combine (t.canvas.object.options, {
	x: 50,
	y: 50,
	x2 : 60,
	y2 : 60,
	strokeStyle: '#000'
});
