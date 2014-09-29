(function (t) {
	'use strict';
	
	t.Class.define('t.canvas.shapes.text',{
	
		Extend : t.canvas.shape,
		
		init : function (options) {
			this.defaultOptions = t.canvas.shapes.text.options;
			this.callParent(options);
			this.set('width',this.getMaxWidth() || this._getWidth());
			this.set('height',this._getHeight());
		},
		getFontString : function () {
			return this.getFontStyle() + ' ' +
				this.getFontVariant() + ' ' + 
				this.getFontWeight() + ' ' + 
				this.getFontSize() + 'px ' +
				this.getFontFamily();
		},
		getTextLines : function () {
			return this.getText().split(this.getLineBreak());
		},
		_render : function (ctx) {
			var textLines,i;
			this._counted();
			ctx.save();
			ctx.textAlign = this.getAlign();
			ctx.textBaseline = this.getBaseLine();
			ctx.fillStyle = this.getColor();
			ctx.strokeStyle = this.getColor();
			ctx.font = this.getFontString();
			this._renderFill(ctx);
			this._renderStroke(ctx);
			ctx.restore();
		},
		_renderFill : function (ctx) {
			var textLines,i,y;
			if(this.getFill()){
				textLines = this.getTextLines();
				for(i = 0; i < textLines.length; i++){
					y = (i == 0) ? this._y +   this.getFontSize() : this._y +  ((i + 1) * this._getLineHeight());
					ctx.fillText(
						textLines[i],
						this._x,
						y
					);
				}
			}
		},
		_renderStroke : function  (ctx) {
			var textLines,i,y;
			if(this.getStroke()) {
				textLines = this.getTextLines();
				for(i = 0; i < textLines.length; i++){
					y = (i == 0) ? this._y +   this.getFontSize() : this._y +  ((i + 1) * this._getLineHeight());
					ctx.strokeText(
						textLines[i],
						this._x,
						y
					);
				}
			}
		},
		_counted : function () {
			var center = this.getCenter();
			this._x = (!this.isTransform()) ? this.getX()/this.getScaleX() : - this.option('width')/2;
			this._y = (!this.isTransform()) ? this.getY()/this.getScaleY()  : - this.option('height')/2;
		},
		_getWidth : function (ctx,max,textLines) {
			var i, max, width;
			textLines = textLines || this.getTextLines();
			ctx = ctx || this._prepareContex();
			max = ctx.measureText(textLines[0]).width;
			for(i = 0 ; i < textLines.length; i++) {
				width = ctx.measureText(textLines[i]).width;
				if(width > max){
					max = width;
				}
			}
			return parseInt(max);
		},
		_getHeight : function (textLines) {
			textLines = textLines || this.getTextLines();
			return textLines.length * this._getLineHeight();
		},
		_getLineHeight : function () {
			return this.getFontSize() + this.getLineHeight();
		},
		_prepareContex: function () {
			var buffer = t.canvas.buffer();
			buffer.font = this.getFontString();
			return buffer;
		} 
	});

	t.canvas.shapes.text.options = t.combine (t.canvas.shape.options, {
		x : 0,
		y : 0,
		text: 'Teq Canvas Text',
		color : '#000',
		align: 'left',
		baseLine : 'bottom',
		stroke : false,
		fill : true,
		maxWidth : false,
		fontSize : 20,
		fontFamily : 'Times New Roman',
		fontWeight : 'normal',
		textDecoration : '',
		fontStyle : 'normal',
		fontVariant : 'normal',
		lineHeight : 1.5,
		lineBreak : '<br>'
	});
})(window.t)