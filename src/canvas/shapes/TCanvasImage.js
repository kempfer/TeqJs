(function (t) {
	'use strict';
	
	t.Class.define('t.canvas.shapes.image', {
		
		Extend : t.canvas.shape,

		_img : null,
		
		/**
		* Constructor
		* @param {Object} [options] Options object
		* @return {Object} thisArg
		*/
		init : function initTriangle (options) {
			this.defaultOptions = t.canvas.shapes.image.options;
			this.callParent(options);
			this.loadImage();
		},
		_render : function (ctx) {	
			this._counted();
			if(this._img === null){
				console.error('Image not load');
			}
			ctx.drawImage(this._img, this._x, this._y,this.getWidth(),this.getHeight());
		},
		_counted : function () {
			this._x = (!this.isTransform()) ? this.getX()/this.getScaleX() : - this.getWidth()/2;
			this._y = (!this.isTransform()) ? this.getY()/this.getScaleY()  : - this.getHeight()/2;
		},
		loadImage  : function () {
			var src = this.getSrc();
			return new t.promise(function (resolve, reject) {
					var img = new Image(); 
					img.onload = function (e){
						this._img = img;
						this.fire('loadImage');
						resolve(img); 
					}.bind(this);
					img.onerorr = function (e) {
						reject();
						console.error(e);
					}
					img.src = src;
			}.bind(this));

		},
		resetOriginal : function () {
			if(this._img === null){
				console.error('Image not load');
			}
			this.reset();
			this.set('width',this._img.width);
			this.set('height',this._img.height);
		}
	});

	t.canvas.shapes.image.options = t.combine (t.canvas.shape.options, {
		src : 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
		width : 100,
		height : 100
	});
})(window.t)