

(function () {
	
	var 		
		defaultOptions = {			
			onDrag : t.emptyFunc,
			onStart : t.emptyFunc,
			onStop : t.emptyFunc,
		},
		getOptions = function (type,self) {			
			switch(type){
				case 'dragstart':
					return {fn : self.options('onStart')};
				break;
				case 'drag' :
					return {fn : self.options('onDrag')};					
				break;
				case  'dragend' :
					return {fn : self.options('onStop')};					
				break;				
			}
		};
	var TeqDragZone = function (selector,options) {
		if (! (this instanceof TeqDragZone)) {
			return new TeqDragZone(selector,options);
		}
		var dragZone = this.dragZone = t.dom(selector);
		if(dragZone.length == 0){
			throw new Error("can not find the item");
		}
		var options = this._options = t.combine(defaultOptions,options);		
		var dragNodes = this.dragNodes = dragZone.children();		
		dragNodes.attr('draggable',true);		
		dragNodes.bind('dragstart',this);
		dragNodes.bind('drag',this);
		dragNodes.bind('dragend',this);
	};
	TeqDragZone.prototype = {
		constructor: TeqDragZone,
		_options : defaultOptions,
		_disable : false,
		dragNodes : [],		
		dragZone : [],		
		destroy : function () {
			dragNodes.unbind('dragstart',this);
			dragNodes.unbind('drag',this);
			dragNodes.unbind('dragend',this);
		},
		disable : function () {
			this._disable = true;
		},
		enable : function () {
			this._disable = false;
		},
		options : t.accessor({
			get : function (key) {					
				return this._options[key];
			},
			set : function (key,val) {							
				this._options[key] = val;
			}
		}),
		handleEvent : function (e) {
			var fn, options,type,node;
			if(this._disable ){
				e.preventDefault();
				return false;
			}
			type = e.type;
			node = t.dom(e.target);
			options = getOptions(type,this);
			options.fn(e,node);
		},
		addItem : function () {
			
		}
	};
	t.dragZone = TeqDragZone;
}());