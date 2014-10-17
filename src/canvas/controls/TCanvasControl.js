(function (t){

	'use strict';

	t.Class.define('t.canvas.control',{
		
		_start : false,
		
		_stop : false,
		
		init : function () {
			
		},
		start : function () {
			if(this._start){
				return;
			}
		},
		stop : function () {
			if(this._stop) {
				return;
			}
		}
	});
	
})(window.t);