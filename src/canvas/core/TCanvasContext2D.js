(function (t) {

	'use strict';
		
	var oldGetContext = HTMLCanvasElement.prototype.getContext,
	
	contextList = {},
	toPoint = function (x,y) {
		return  new t.canvas.point(x,y);
	};
	HTMLCanvasElement.prototype.getContext = function(name) {
		if(name in contextList) {
			return new contextList[name](this);
		}
		else{
			return oldGetContext.apply(this, arguments);
		}
	},
	HTMLCanvasElement.addContext = function(name,context) {
		contextList[name] = context;
	},
	
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
		/**
		*@params x The x-coordinate of the center of the circle
		*@params y The y-coordinate of the center of the circle
		*@params r The x-coordinate of the center of the circle
		*@params sAngle The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
		*@params eAngle The ending angle, in radians
		*@params counterclockwise Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise. 
		*@return {t.canvas.context2d}
		**/
		arc: function (x,y,r,sAngle,eAngle,counterclockwise) {
			return this.original('arc',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		fill : function () {
			return this.original('fill',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		beginPath : function () {
			return this.original('beginPath',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		bezierCurveTo : function () {
			var point,point2,point3,
				arg = arguments;
			if(arguments.length  == 3){
				point =  new t.canvas.point(arguments[0]),
				point2 =  new t.canvas.point(arguments[1]),
				point3 =  new t.canvas.point(arguments[2])
				arg = [point.x,point.y,point2.x,point2.y,point3.x,point3.y];
			}
			return this.original('bezierCurveTo',arg);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		clearRect: function () {
			return this.original('clearRect',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		clearShadow: function () {
			return this.original('clearShadow',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		clip : function () {
			return this.original('clip',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
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
		/**
		*@return {t.canvas.context2d}
		**/
		drawFocusIfNeeded : function () {
			return this.original('drawFocusIfNeeded',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		drawImage : function () {
			return this.original('drawImage',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		drawImageFromRect : function () {
			return this.original('drawImageFromRect',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
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
		/**
		*@return {t.canvas.context2d}
		**/
		fillRect : function () {
			return this.original('fillRect',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		fillText : function () {
			return this.original('fillText',arguments);
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
		getImageData : function () {
			return this.original('getImageData',arguments, true);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		lineTo : function (x,y) {
			var point = toPoint(x,y);
			return this.original('lineTo',[point.x,point.y]);
		},
		measureText : function () {
			return this.original('measureText',arguments, true);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		moveTo : function (x,y) {
			var point = toPoint(x,y);
			return this.original('moveTo',[point.x,point.y]);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		putImageData : function () {
			return this.original('putImageData',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		quadraticCurveTo : function () {
			return this.original('quadraticCurveTo',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		rect : function () {
			return this.original('rect',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		resetTransform: function () {
			return this.original('resetTransform',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		restore : function () {
			return this.original('restore',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		rotate : function () {
			return this.original('rotate',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		save : function () {
			return this.original('save',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		scale : function () {
			return this.original('scale',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		setTransform : function () {
			return this.original('setTransform',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		stroke : function () {
			return this.original('stroke',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		strokeRect : function () {
			return this.original('strokeRect',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		strokeText : function () {
			return this.original('strokeText',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		transform: function () {
			return this.original('transform',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		translate : function () {
			return this.original('translate',arguments);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		clearAll : function () {
			return this.original('clearRect',[0,0,this.width,this.height]);
		},
		/**
		*@return {t.canvas.context2d}
		**/
		drawWindow : function () {
			return this.original('drawWindow', arguments);
		},
		//Custom Methods
		/**
		*@return {t.canvas.context2d}
		**/
		shadow : function (color,blur,offsetX,offsetY) {
			var shadow = t.args(arguments).toObject(['color','blur','offsetX','offsetY']);
			this.originalCtx2D.shadowColor = shadow.color || this.shadowColor;
			this.originalCtx2D.shadowBlur = shadow.blur || this.shadowBlur;
			this.originalCtx2D.shadowOffsetX = shadow.offsetX || this.shadowBlur;
			this.originalCtx2D.shadowOffsetY = shadow.offsetY || this.shadowOffsetY;
			return this;
		},
		/**
		*@return {t.canvas.context2d}
		*@param style string Specifies the font style. Possible values:	normal, italic, oblique
		*@param variant string Specifies the font variant. Possible values:	normal, small-caps
		*@param weight string Specifies the font weight. Possible values:	normal, bold, bolder,lighter,100,200,300,400,500,600,700,800,900
		*@param size integer Specifies the font size and the line-height, in pixels
		*@param family Specifies the font family
		**/
		setFont: function (style, variant, weight, size, family) {
			var value;
			if(arguments.length == 1 && t.isString(style)) {
				value = arguments[0];
			}
			else{
				value = t.args(arguments).toArray(['style','variant','weight','size','family']).join(" ");
			}
			this.originalCtx2D.font = value;
			return this;
		},
		/**
		*@return {t.canvas.context2d}
		**/
		fillAll : function (style) {
			this.save();
			this.fillStyle = style;
			return this.original('fillRect',[0,0,this.width,this.height]);
			this.restore();
			return this;
		},
		/**
		*@return {t.canvas.context2d}
		**/
		strokeAll : function (style)  {
			this.save();
			this.strokeStyle = style;
			return this.original('strokeRect',[0,0,this.width,this.height]);
			this.restore();
			return this;
		},
		/**
		*@return {t.canvas.context2d}
		**/
		opacity : function (value) {
			if(value > 1){
				value = value /100;
			}
			this.globalAlpha = value;
			return this;
		},
		/**
		*@return {t.canvas.context2d}
		**/
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
		/**
		*@return {t.canvas.context2d}
		**/
		polygon : function (points,wrap) {
			var i, point;
			if(wrap == true){
				this.beginPath();
			}
			this.moveTo(points[0].x, points[0].y);
			for(i = 1; i < points.length; i++){
				point = points[i];	
				this.lineTo(points[i]);
			}
			if(wrap == true){
				this.closePath();
			}
			return this;
		},
		/**
		*@return {t.canvas.context2d}
		**/
		path : function (parts,wrap) {
			var i, part;
			if(wrap == true){
				this.beginPath();
			}
			for(i = 0; i < parts.length; i++) {
				part = parts[i];
				this[part.method].apply(this,part.points);
			}
			if(wrap == true){
				this.closePath();
			}
			return this;
		},
		/**
		*@return {ImageData}
		**/ 
		getPixel: function (x,y) {
			var point = toPoint(x,y);
			return  this.getImageData(point.x, point.y, 1, 1);
		},
		getPixelColor : function (x,y) {
			var colorData,
				point = toPoint(x,y),
				ImageData = this.getPixel(point);
			colorData = [].slice.call(ImageData.data);
			colorData[3] /= 255;
			return t.color ? new t.color(colorData) : colorData;
		}
	});
	
	HTMLCanvasElement.addContext('teq-2d',t.canvas.context2d);
})(window.t);