(function (t) {

	'use strict';
	
	var TeqColor = function () {
		var args, values,colorName;
			args = arguments;
		if(!(this instanceof TeqColor)){
			return new TeqColor(Array.prototype.slice.call(args));
		};
		if(args.length == 1 && t.isString(args[0])){
			colorName = color.toLowerCase();
			if(TeqColor.checkHex(args[0])) {
				values = TeqColor.hexToRgb(args[0]);
			}
			else if (colorName in t.color.colorList){
				values = TeqColor.hexToRgb(t.color.colorList[colorName]);
			}
			else {
				new Error('Invalid color format');
			}
		} 
		else{
			values = t.args(arguments).toArray(['r','g','b','a']);
		}
		this.r = values[0];
		this.g = values[1];
		this.b = values[2];
		this.a = (typeof values[3] === "undefined") ? 1 : values[3];
		return this;
	};
	
	TeqColor.prototype = {
		
		constructor: TeqColor,
		
		r : 0,
		
		g : 0,
		
		b : 0,
		
		a : 1,
		
		get red () {
			return this.r;
		},
		get green () {
			return this.g;
		},
		get blue () {
			return this.b;
		},
		get alpha () {
			return this.a;
		},
		set red (red) {
			this.r = red;
		},
		set green (green) {
			this.g = green;
		},
		set blue (blue) {
			this.b = blue; 
		},
		set alpha (alpha) {
			this.a = alpha;
		},
		
		move : function (color) {
			color = TeqColor.form(color);
			this.r += color.r;
			this.g += color.g;
			this.b += color.b;
			this.a += color.a;
			return this;
		},
		
		diff : function (color) {
			color = TeqColor.form(color);
			return TeqColor.color([
				this.r - color.r,
				this.g - color.g,
				this.b - color.b,
			]);
		},
		add : function (factor) {
			this.r += factor;
			this.g += factor;
			this.b += factor;
			return this;
		},
		
		toHex : function () {
			return TeqColor.rgbToHex(this.toRgba());
		},
		toRgb : function () {
			return [this.r, this.g, this.b];
		},
		toRgba : function () {
			return [this.r, this.g, this.b, this.a];
		},
		toString : function (type) {
			var result;
			switch(type) {
				case 'rgb' :
					result = 'rgb( ' + this.r + ', ' + this.g + ', ' + this.b + ' )';
				break;
				case 'rgba' :
					result = 'rgba( ' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ' )';
				break;
				default :
					result = TeqColor.rgbToHex(this.toRgba());
				break;
			}
			return result;
		},	
		clone : function () {
			return new TeqColor(this.toRgba());
		},
		equals : function (color) {
			color = TeqColor.from(color);
			return 	this.r == color.r &&
					this.g == color.g &&
					this.b == color.b &&
					this.a == color.a;
		}
	};
	TeqColor.componentToHex = function (color) {
		var hex = color.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	},
	TeqColor.rgbToHex = function () {
		var color = t.args(arguments).toArray(['r','g','b']);
		return "#" + TeqColor.componentToHex(color[0]) + TeqColor.componentToHex(color[1]) + TeqColor.componentToHex(color[2]);
	};
	TeqColor.hexToRgb = function (hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? [
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16)
		] : null;
	};
	TeqColor.random = function () {
		return [t.number.random(0,255),t.number.random(0,255),t.number.random(0,255)];
	};
	TeqColor.checkHex = function (hex) {
		return /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(hex);
	};
	TeqColor.colorList = {
		red : '#FF0000',
		cyan : '#00FFFF',
		blue : '#0000FF',
		purple : '#800080',
		yellow : '#FFFF00',
		lime : '#00FF00',
		magenta: '#FF00FF',
		white : '#FFFFFF',
		silver : '#C0C0C0',
		grey : '#808080',
		black : '#000000',
		orange: '#FFA500',
		brown: '#A52A2A',
		maroon : '#800000',
		green : '#008000',
		olive : '#808000',
	};
	TeqColor.from = function (object) {
		return object instanceof TeqColor ? object : new TeqColor (object);
	}
	t.color = TeqColor;
})(window.t);