/***
* TEQ JS
* PLUGINS DropZone
*
*
*
**/

(function () {
	
	var 		
		defaultOptions = {
			contentTypes : [],
			clsDrop : false,
			clsOver : false,
			clsOut	: false,
			onDrop : t.emptyFunc,
			onEnter : t.emptyFunc,
			onOut : t.emptyFunc,
			onOver : t.emptyFunc,
		},
		checkContentType = function (types,contentTypes) {
			if(t.isEmpty(contentTypes)){
				return true;
			} 
			if(t.isEmpty(types)){
				return false;
			}
			var error = [];
			console.log(types);
			types.forEach(function (type) {
				if(!t.contains(contentTypes,type)){
					error.push(false);
				}
			});
			return (error.length > 0) ? false : true;
		},
		getOptions = function (type,allOptions) {
			switch(type) {
				case 'dragenter' :
					return {cls : allOptions.clsOver,fn : allOptions.onEnter, removeCls : [allOptions.clsOut,allOptions.clsDrop]};
				break;
				case 'dragover':
					return {cls : allOptions.clsOver,fn : allOptions.onOver, removeCls : [allOptions.clsOut,allOptions.clsDrop]};
				break;
				case 'dragleave' :
					return {cls : allOptions.clsOut,fn : allOptions.onOut, removeCls : [allOptions.clsOver,allOptions.clsDrop]};
				break;
				case 'drop' : 
					return {cls : allOptions.clsDrop,fn : allOptions.onDrop, removeCls : [allOptions.clsOut,allOptions.clsOver]};
				break;
			}
		};
		var TeqDropZone = function (selector,options) {
			if (! (this instanceof TeqDropZone)) {
				return new TeqDropZone(selector,options);
			}
			console.log(options);
			var domNode = this.domNode = t.dom(selector);
			if(domNode.length == 0){
				throw new Error("can not find the item");
			}
			this.params = t.combine(defaultOptions,options);
			domNode.bind('dragover',this,false);
			domNode.bind('dragenter',this,false);
			domNode.bind('dragleave',this ,false);
			domNode.bind('drop',this ,false);
			return this;
		};
		
		TeqDropZone.prototype = {
			constructor: TeqDropZone,
			domNode : false,
			params : defaultOptions,
			_disable : false,
			get node () {
				return this.domNode;
			},
			destroy : function () {
				var node = this.node;
				node.unbind('dragover',this ,false);
				node.unbind('dragenter',this ,false);
				node.unbind('dragleave',this,false);
				node.unbind('drop',this,false);
			},
			disable : function () {
				this._disable = true;
				return this;
			},
			enable : function () {
				this._disable = false;
				return this;
			},
			options : t.accessor({
				get : function (key) {					
					return this.params[key];
				},
				set : function (key,val) {							
					this.params[key] = val;
				}
			}),
			handleEvent : function (e) {
				if(this._disable){
					return;
				}
				e.preventDefault();
				var eventType = e.type;	
				var contentType = e.dataTransfer.types;
				if(!checkContentType(contentType,this.params.contentTypes)){
					return false;
				}				
				var options = getOptions(eventType,this.params);				
				var self = this;
				options.removeCls.forEach(function (cls) {
					if(cls){
						self.node.removeClass(cls);
					}
				});			
				if(options.cls){
					this.node.addClass(options.cls);
				}
				options.fn(e,this);
				return false;		
			}
			
		}
		t.dropZone = TeqDropZone;
}());