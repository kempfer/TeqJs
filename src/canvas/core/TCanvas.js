(function (t) {
	'use strict';
	t.Class.define('t.canvas',{

		Implements : [t.Base.Class.Event],
		
		_el : null,
		_ctx : null,
		
		shapes : {},

		init : function (selector) {
			var el = t.dom(selector); 
			if(el.is()){
				this._canvas = el.first;
			}
			else{
				this._canvas = t.dom.create('canvas').first;
			}
			this._ctx = this._canvas.getContext('2d');
			return this;
		},
		get context () {
			return this._ctx;
		},
		appendTo : function (selector) {
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
			var obj,i;
			for ( i = 0; i < arguments.length; i++) {
				obj = arguments[i];
				obj.id = t.uniqueId();
				obj.context = this._ctx;
				this.shapes[obj.id] = obj;
			}
			this.renderAll();
		},
		removeShapes : function () {
			t.object.each()
			object.remove(this.context);
		},
		renderShapes : function (object) {
			this.renderAll();
		},
		renderAll : function () {
			//console.time('renderAll'); 
			this.clear();
			var buffer = t.canvas.buffer(this.width,this.height);
			t.object.each(this.shapes, function (val,key) {
				val.render(buffer);
			});		
			this._ctx.drawImage(buffer.canvas, 0, 0);
			this.fire('renderAll');
			//console.timeEnd('renderAll');
			
		},
		clear : function () {
			this.context.clearRect ( 0 , 0 , this.width , this.height );
		},
		toImage : function (type) {
			type = type || "image/png";
			return this._canvas.toDataURL(type);
		},
		getActives : function () {
			var objects = [];
			for(var key in this.objects) {
				if(this.objects[key].isActive()){
					objects.push(this.objects[key]);
				}
			}		
			return objects;
		},
		activateMouse : function () {
			this.mouse = new t.Base.Class.Mouse(this._canvas);
			this.mouse.on('move');
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
	t.canvas.centerRectangle = function centerRectangle (x,y,w,h) {
		return {
			x : x + (x + w - x)/2,
			y : y + (y + h - y)/2
		};
	}

})(window.t)