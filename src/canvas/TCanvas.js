(function (t) {
	'use strict';
	t.Class.define('t.canvas',{

		Implements : [t.Base.Class.Event],
		
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
			return this;
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
			var obj,i;
			for ( i = 0; i < arguments.length; i++) {
				obj = arguments[i];
				obj.id = t.uniqueId();
				this.objects[obj.id] = obj;
			}
			this.renderAll();
		},
		removeObj : function (object) {
			object.remove(this.context);
		},
		renderAll : function () {
			//console.time('renderAll'); 
			this.clear();
			var buffer = t.canvas.buffer(this.width,this.height);
			for(var key in this.objects) {
				this.objects[key].render(buffer);
			}		
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