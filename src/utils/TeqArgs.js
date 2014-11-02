(function (t) {

	'use strict';
	
	
	var Args = function (args,mode) {
		if(!(this instanceof Args)){
			return new Args(args,mode);
		}
		this.args = args;
	};
	Args.prototype = {	
		constructor: Args,
		
		args : null,
		processed : null,
		
		toArray : function (indexs) {
			var i, array = [];
			if(t.isArray(this.args[0])) {
				array = this.args[0];
			}
			else if(t.isObject(this.args[0])) {
				for(i = 0; i < this.args[0].length; i++){
					if(this.args[0][i]) {
						array[i] = this.args[0][i];
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
				object = object;
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
			
		},		
		required : function (){
			if(arguments[0] == 'all') {
				return this.allRequired();
			}
		},
		allRequired : function () {
			
		}
		
		
	};

	
	t.args = Args;
})(window.t);