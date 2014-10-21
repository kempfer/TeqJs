(function (t) {

	'use strict';
		
	var oldGetContext = HTMLCanvasElement.prototype.getContext,
	
	contextList = {};
	
	HTMLCanvasElement.prototype.getContext = function(name) {
		if(name in contextList) {
			return new contextList[name](this);
		}
		else{
			return oldGetContext.apply(this, arguments);
		}
	}
	HTMLCanvasElement.addContext = function(name,context) {
		contextList[name] = context;
	};
	
	t.Class.define('t.canvas.context2d', {
		//"10px sans-serif"
		get font () {
			return this.originalCtx2D.font;
		} ,
		set font (value) {
			return this.originalCtx2D.font = value;
		},
		//1
		get globalAlpha () {
			return this.originalCtx2D.globalAlpha;
		},
		set globalAlpha (value) {
			return this.originalCtx2D.globalAlpha = value;
		},
		//"source-over"
		get globalCompositeOperation () {
			return this.originalCtx2D.globalCompositeOperation;
		},
		set globalCompositeOperation (value) {
			return this.originalCtx2D.globalCompositeOperation = value;
		},
		get imageSmoothingEnabled () {
			return this.originalCtx2D.imageSmoothingEnabled;
		},
		set imageSmoothingEnabled (value) {
			return this.originalCtx2D.imageSmoothingEnabled = value;
		},
		get lineCap () {
			return this.originalCtx2D.lineCap;
		},
		set lineCap (value) {
			return this.originalCtx2D.lineCap = value;
		},
		get lineDashOffset () {
			return  this.originalCtx2D.lineDashOffset;
		},
		set lineDashOffset (value) {
			return  this.originalCtx2D.lineDashOffset = value;
		},
		get lineJoin () {
			return this.originalCtx2D.lineJoin;
		},
		set lineJoin (value) {
			return this.originalCtx2D.lineJoin = value;
		},
		get lineWidth () {
			return this.originalCtx2D.lineWidth;
		},
		set lineWidth (value) {
			return this.originalCtx2D.lineWidth = value;
		},
		get miterLimit () {
			return this.originalCtx2D.miterLimit; 
		},
		set miterLimit (value) {
			return this.originalCtx2D.miterLimit = value; 
		},
		get shadowBlur  () {
			return this.originalCtx2D.shadowBlur;
		}, 
		set shadowBlur  (value) {
			return this.originalCtx2D.shadowBlur = value;
		}, 
		get shadowColor  () {
			return this.originalCtx2D.shadowColor;
		},
		set shadowColor  (value) {
			return this.originalCtx2D.shadowColor = value;
		},
		get shadowOffsetX () {
			return this.originalCtx2D.shadowOffsetX;
		},
		set shadowOffsetX (value) {
			return this.originalCtx2D.shadowOffsetX = value;
		},
		get shadowOffsetY () {
			return this.originalCtx2D.shadowOffsetY;
		},
		set shadowOffsetY (value) {
			return this.originalCtx2D.shadowOffsetY = value;
		},
		get strokeStyle () {
			return this.originalCtx2D.strokeStyle;
		},
		set strokeStyle (value) {
			return this.originalCtx2D.strokeStyle = value;
		},
		get textAlign () {
			return this.originalCtx2D.textAlign;
		},
		set textAlign (value) {
			return this.originalCtx2D.textAlign = value;
		},
		get textBaseline () {
			return this.originalCtx2D.textBaseline;
		},
		set textBaseline (value) {
			return this.originalCtx2D.textBaseline = value;
		},
		get width () {
			return this.canvas.width;
		},
		get height () {
			return this.canvas.height;
		},
		
		canvas : null,
		
		init : function (canvas) {
			this.canvas = canvas;
			this.originalCtx2D = canvas.getContext('2d');
			return this;
		},
		original : function (method,arg,isReturn) {
			var result = this.originalCtx2D[method].apply(this.originalCtx2D,arg || []);
			return isReturn ? result : this;
		},
		set : function (name, value) {
			var i;
			if(t.isObject(name)){
				for (i in name) {
					this[i] = name[i];
				}
			}
			else{
				this[name] = value;
			}
			return this;
		},
		arc: function () {
			return this.original('arc',arguments);
		},
		fill : function () {
			return this.original('fill',arguments);
		},
		beginPath : function () {
			return this.original('beginPath',arguments);
		},
		bezierCurveTo : function () {
			return this.original('bezierCurveTo',arguments);
		},
		clearRect: function () {
			return this.original('clearRect',arguments);
		},
		clearShadow: function () {
			return this.original('clearShadow',arguments);
		},
		clip : function () {
			return this.original('clip',arguments);
		},
		closePath: function () {
			return this.original('closePath',arguments);
		},
		createImageData : function () {
			return this.original('createImageData',arguments, true);
		},
		createLinearGradient : function () {
			return this.original('createLinearGradient',arguments, true);
		},
		createPattern : function () {
			return this.original('createPattern',arguments, true);
		},
		createRadialGradient : function () {
			return this.original('createRadialGradient',arguments, true);
		},
		drawFocusIfNeeded : function () {
			return this.original('drawFocusIfNeeded',arguments);
		},
		drawImage : function () {
			return this.original('drawImage',arguments);
		},
		drawImageFromRect : function () {
			return this.original('drawImageFromRect',arguments);
		},
		ellipse : function () {
			//TODO Реализовать этот метод
			return this;
		},
		fillRect : function () {
			return this.original('fillRect',arguments);
		},
		fillText : function () {
			return this.original('fillText',arguments, true);
		},
		getContextAttributes : function () {
			return this.original('getContextAttributes',arguments, true);
		},
		getLineDash : function () {
			return this.original('getLineDash',arguments, true);
		},
		isPointInPath : function () {
			return this.original('isPointInPath',arguments, true);
		},
		isPointInStroke : function () {
			return this.original('isPointInStroke',arguments, true);
		},
		lineTo : function () {
			return this.original('lineTo',arguments);
		},
		measureText : function () {
			return this.original('lineTo',arguments, true);
		},
		moveTo : function () {
			return this.original('moveTo',arguments);
		},
		putImageData : function () {
			return this.original('putImageData',arguments);
		},
		quadraticCurveTo : function () {
			return this.original('quadraticCurveTo',arguments);
		},
		rect : function () {
			return this.original('rect',arguments);
		},
		resetTransform: function () {
			return this.original('resetTransform',arguments);
		},
		restore : function () {
			return this.original('restore',arguments);
		},
		rotate : function () {
			return this.original('rotate',arguments);
		},
		save : function () {
			return this.original('save',arguments);
		} ,
		scale : function () {
			return this.original('scale',arguments);
		},
		setTransform : function () {
			return this.original('setTransform',arguments);
		},
		stroke : function () {
			return this.original('stroke',arguments);
		},
		strokeRect : function () {
			return this.original('strokeRect',arguments);
		},
		strokeText : function () {
			return this.original('strokeText',arguments);
		},
		transform: function () {
			return this.original('transform',arguments);
		},
		translate : function () {
			return this.original('translate',arguments);
		},
		clearAll : function () {
			return this.original('clearRect',[0,0,this.width,this.height]);
		},
		drawWindow : function () {
			return this.original('drawWindow', arguments);
		}
	});
	
	HTMLCanvasElement.addContext('2d-t',t.canvas.context2d);
})(window.t);