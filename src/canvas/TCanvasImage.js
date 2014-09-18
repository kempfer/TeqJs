t.Class.define('t.canvas.image', {
	
	Extend : t.canvas.object,
	
	_img : null,
	/**
	* Constructor
	* @param {Object} [options] Options object
	* @return {Object} thisArg
	*/
	init : function initTriangle (options) {
		this.defaultOptions = t.canvas.image.options;
		this.callParent(options);
	},
	_render : function (ctx) {	
		this._counted();
		this.getImage().then(function (img) {
			ctx.save();
			this._transform(ctx);
			ctx.drawImage(img, this._x, this._y,this.getWidth(),this.getHeight());
			ctx.restore();
		}.bind(this));
	},
	_counted : function () {
		this._x = (!this.getAngle()) ? this.getX() : - this.getWidth()/2;
		this._y = (!this.getAngle()) ? this.getY() : - this.getHeight()/2;
	},
	getImage  : function () {
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