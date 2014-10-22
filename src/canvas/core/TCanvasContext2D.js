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
		get fillStyle () {
			return this.originalCtx2D.fillStyle;
		},
		set fillStyle (value) {
			return this.originalCtx2D.fillStyle = value;
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
		ellipse : function (cx,cy,rx,ry,start,end,counterclockwise,wrap) {
			if(wrap == true){
				this.beginPath();
			}
			if(!this.originalCtx2D.ellipse){
				counterclockwise = counterclockwise || false;
				this.original('save',arguments);	
				this.original('transform',[1, 0, 0, ry/rx, 0, 0]);
				this.original('arc',[cx, cy/(ry/rx), rx,start, end, counterclockwise]);
				this.original('restore',arguments);
			}
			else{
				this.original('ellipse',arguments);
			}
			if(wrap == true){
				this.closePath();
			}
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
		},
		//Custom Methods
		shadow : function (color,blur,offsetX,offsetY) {
			this.shadowColor = color || this.shadowColor;
			this.shadowBlur = blur || this.shadowBlur;
			this.shadowOffsetX = offsetX || this.shadowBlur;
			this.shadowOffsetY = offsetY || this.shadowOffsetY;
			return this;
		},
		fillAll : function (style) {
			this.save();
			this.fillStyle = style;
			return this.original('fillRect',[0,0,this.width,this.height]);
			this.restore();
			return this;
		},
		strokeAll : function (style)  {
			this.save();
			this.strokeStyle = style;
			return this.original('strokeRect',[0,0,this.width,this.height]);
			this.restore();
			return this;
		},
		opacity : function (value) {
			if(value > 1){
				value = value /100;
			}
			this.globalAlpha = value;
			return this;
		},
		roundedRect : function (x,y,w,h,r,wrap) {
			var from, to;
			if(wrap == true){
				this.beginPath();
			}
			from = {x: x , y : y};
			to =  {x: x + w , y : y + h };
			this.moveTo (from.x, from.y + r)
				.lineTo (from.x,   to.y - r)
				.quadraticCurveTo(from.x, to.y, from.x + r, to.y)
				.lineTo (to.x - r, to.y)
				.quadraticCurveTo(to.x,to.y, to.x,to.y-r)
				.lineTo (to.x, from.y + r)
				.quadraticCurveTo(to.x, from.y, to.x-r, from.y)
				.lineTo (from.x + r, from.y)
				.quadraticCurveTo(from.x,from.y,from.x,from.y + r)
			if(wrap == true){
				this.closePath();
			}
			return this;
		},
		polygon : function (points,wrap) {
			var i, point;
			if(wrap == true){
				this.beginPath();
			}
			this.moveTo(points[0].x, points[0].y);
			for(i = 1; i < points.length; i++){
				point = points[i];			
				this.lineTo(point.x,point.y);
			}
			if(wrap == true){
				this.closePath();
			}
			return this;
		}
	});
	
	HTMLCanvasElement.addContext('teq-2d',t.canvas.context2d);
})(window.t);