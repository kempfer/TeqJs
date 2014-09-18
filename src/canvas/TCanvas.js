
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
		console.time('renderAll'); 
		this.clear();
		var buffer = this._ctx ;//t.canvas.buffer(this.width,this.height);
		for(var key in this.objects) {
			this.objects[key].render(buffer);
		}		
		//this._ctx.drawImage(buffer.canvas, 0, 0);
		console.timeEnd('renderAll');
	},
	clear : function () {
		this.context.clearRect ( 0 , 0 , this.width , this.height );
	}

});

/** @private */

t.canvas.buffer =  function (width,height) {
	return t.dom.create('canvas',{width: width, height:height}).first.getContext('2d');
};

t.canvas.degree = function (num) {
	return Math.PI / 180 * num ;
}

t.canvas.lengthSegment = function (x,y,x2,y2) {
	return Math.sqrt(Math.pow(x - x2,2) + Math.pow(y - y2,2) );
}