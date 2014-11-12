(function (t) {

	'use strict';
	
	
	var TeqArgs = function (args) {
		if(!(this instanceof TeqArgs)){
			return new TeqArgs(args);
		}
		this.args = args;
	};
	TeqArgs.prototype = {	
		constructor: TeqArgs,
		
		args : null,
		
		toArray : function (indexs) {
			var i, array = [];
			if(t.isArray(this.args[0])) {
				array = this.args[0];
			}
			else if(t.isObject(this.args[0])) {
				for(i = 0; i < indexs.length; i++){
					if(this.args[0][indexs[i]]) {
						array[i] = this.args[0][indexs[i]];
					}
				}
			}
			else{
				array = Array.prototype.slice.call(this.args);
			}
			return array;
		},
		toObject : function (indexs) {
			var i, object = {}, array;
			if(t.isObject(this.args[0])) {
				object = this.args[0];
			}
			else{
				array = (!t.isArray(this.args[0])) ? Array.prototype.slice.call(this.args) :  this.args[0];				
				for(i = 0; i < indexs.length; i++){
					object[indexs[i]] = array[i];
				}
			}
			return object;
		},
		defaults : function () {
			var i, 
				l = arguments.length;
			for(i = 0; i < l; i++) {
				if(typeof this.args[i] === "undefined" ){
					this.args[i] = arguments[i];
				}
			}
			return this;
		}		
	};	
	TeqArgs.clean = function clean (args) {
		var i,
			l = args.length;
		for(i = args.length -1; i >= 0; i--){						
			if(typeof args[i] === "undefined"){								
				[].pop.apply(args);
			}
		}	
	};
	t.args = TeqArgs;
})(window.t);