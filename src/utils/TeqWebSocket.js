/***
* TEQ JS
* PLUGINS WebSocket
*
*
*
**/
(function (webSocket) {
	'use strict';
	var  
		handleEvent  = function (e, self) {
			var typeEvent = e.type;
			switch(typeEvent){
				case 'open':					
					self.Online = true;					
					var onOpen = self.option('onOpen');
					onOpen.apply(self,[e]);
				break;
				case 'close':					
					self.Online  = false;					
					var onClose = self.option('onClose');
					onClose.apply(self,[e]);
				break;
				case 'message':				
					var onMsg = self.option('onMsg');
					var decode = self.option('json');
					var payload = (decode === true) ? t.decode(e.data) : e.data;					
					onMsg.apply(self,[payload,e]);
				break;
			}
		};
	
	var TeqSocket = function (options) {
		if (! (this instanceof TeqSocket)) {
			return new TeqSocket(options);
		}
		this.options = t.combine(TeqSocket.defaultOptions,options);
		this.socket = new webSocket("ws://" + this.options.serverIp + ":" + this.options.port + "/" + this.options.appName);
		var self = this;
		this.socket.addEventListener('open',function (e) {handleEvent(e,self)},false);
		this.socket.addEventListener('close',function (e) {handleEvent(e,self)},false);
		this.socket.addEventListener('message',function (e) {handleEvent(e,self)},false);
	};
	
	TeqSocket.prototype = {
		constructor: TeqSocket,		
		version : '0.0.1',
		Online : false, 
		option : t.accessor({
			get : function (key) {					
				return this.options[key];
			},
			set : function (key,val) {							
				this.options[key] = val;
			}
		}),
		close : function () {
			this.socket.close();
		},
		send : function (data) {
			var decode = this.option('json'); 
			var payload = (decode === true) ? t.encode(data) : data;
			this.socket.send(payload);			
		}		
	};
	
	TeqSocket.defaultOptions = {
			serverIp : location.host,
			port : '8000',
			appName : 'test',
			json : false,
			onOpen : t.emptyFunc,
			onClose : t.emptyFunc,
			onMsg : t.emptyFun
		};
	Teq.socket = TeqSocket;
}(window.WebSocket));