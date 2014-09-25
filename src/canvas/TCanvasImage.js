(function (t) {
	'use strict';
	
	t.Class.define('t.canvas.image', {
		
		Extend : t.canvas.object,
		name : '',
		_img : null,
		/**
		* Constructor
		* @param {Object} [options] Options object
		* @return {Object} thisArg
		*/
		init : function initTriangle (options) {
			this.defaultOptions = t.canvas.image.options;
			this.callParent(options);
			this._loadImage().then(function (img) {
				this.fire('loadImage');
			}.bind(this));
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
		_loadImage  : function () {
			var src = this.getSrc();
			return new t.promise(function (resolve, reject) {
				if(this._img === null){
					var img = new Image(); 
					img.onload = function (e){
						this._img = img;
						resolve(img); 
					}.bind(this);
					img.onerorr = function (e) {
						reject();
						console.error(e);
					}
					img.src = src;
				}
				else{
					resolve(this._img);
				}

			}.bind(this));

		}
	});

	t.canvas.image.options = t.combine (t.canvas.object.options, {
		src : 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
		width : 100,
		height : 100
	});
})(window.t)