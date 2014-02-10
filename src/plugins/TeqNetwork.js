/***
* TEQ JS
* PLUGINS Network
*
**/
'use strict';

 new function () {	
	var start = false;
	var network = function () {		
		if(start) return;
		start = true;
		setInterval(function () {
			var oldStatus = t.network.Online;
			var status = checkStatus();
			if(oldStatus != status){
				var events = (status === true ) ? t.network.eventListener.online : t.network.eventListener.offline;				
				events.forEach(function (event) {
					event();
				});
			}
		},
		500
		);
		function checkStatus () {
			t.network.Online = navigator.onLine;
			return t.network.Online;
		}
	};
	network.Online = false;
	network.eventListener = {
		online : [],
		offline : []
	};
	network.addEventListener = function (type,callback) {
		if(!t.isFunction(callback)){
			throw new Erorr("callback not function");
		}
		if(t.isArray(network.eventListener[type])){
			network.eventListener[type].push(callback);
		}		
	}
	network.version = '0.0.1';
	t.network = network;	
	t.network();
 }