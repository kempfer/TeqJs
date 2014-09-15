
t.Class.define('t.canvas',{

	_canvas : null,
	_el : null,
	_ctx : null,
	
	objects : {},

	init : function (selector) {
		var el = t.dom(selector); 
		if(el.is()){
			this._canvas = el.first;
		}
		else{
			this._canvas = t.dom.create('canvas').first;
		}
		this._ctx = this._canvas.getContext('2d');
	},
	get context () {
		return this._ctx;
	},
	renderTo : function (selector) {
		t.dom(selector).append(t.dom(this._canvas));
		return this;
	},
	get width () {
		return this._canvas.width;
	},
	set width (width) {
		return this._canvas.width = width;
	},
	get height () {
		return this._canvas.height;
	},
	set height (height) {
		 this._canvas.height = height; 
	},
	add : function () {
		var obj;
		for (i = 0; i < arguments.length; i++) {
			obj = arguments[i];
			obj.id = t.uniqueId();
			this.objects[obj.id] = obj;
		}
		
	},
	renderAll : function () {
		this.clear();
		var ctx;
		for(var key in this.objects) {
			ctx = this.objects[key].render(this._ctx);
		}
	},
	clear : function () {
		this.context.clearRect ( 0 , 0 , this.width , this.height );
	}

});
/** @private */

t.canvas.buffer =  function (width,height) {
	return t.dom.create('canvas',{width: width, height:height}).first.getContext('2d');
};