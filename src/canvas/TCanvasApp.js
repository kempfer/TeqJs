(function (t) {
	'use strict';
	
	t.Class.define('t.AppCanvas',{
		
		Implements : [t.Base.Class.Event],
		
		canvas : null,
		
		init : function (options) {
			this.options = t.combine(t.AppCanvas.options,options);
			this._createCanvas();
			return this;
		},
		option : t.accessor({
			get : function (key) {
				return this.options[key];
			},
			set : function (key,val) {
				this.options[key] = val;
			}
		}),
		addShapes : function () {
			this.canvas.add.apply(this.canvas,arguments);
		},
		removeShapes : function () {
			this.canvas.removeShapes.apply(this.canvas,arguments);
		},
		_createCanvas : function () {
			this.canvas = new t.canvas();
			this.canvas.appendTo(this.option('appendTo'));
			this.canvas.width = this.option('width');
			this.canvas.height = this.option('height');
		}
	
	});
	t.AppCanvas.options = {
		width : 500,
		height : 500,
		appendTo: 'body',
		mause: false,
		keyboard : false
	};
})(window.t);