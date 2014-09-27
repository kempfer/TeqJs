(function (t) {
	'use strict';
	
	t.Class.define('t.Base.Class.Mouse',{
		
		Extend : t.Base.Class.Event,
		
		_offset : {},
		
		inside : false,
		
		_eventList: {
			click      : 'click',
			dblclick   : 'dblclick',
			contextmenu: 'contextmenu',
	
			mouseover : 'over',
			mouseout  : 'out',
			mousedown : 'down',
			mouseup   : 'up',
			mousemove : 'move',
	
			DOMMouseScroll: 'wheel',
			mousewheel    : 'wheel'
		},
		
		init : function (element,offset) {
			this._offset = offset || { x : 0 , y : 0};
			this.element = t.dom(element);
			if(!t.dom.isElement(this.element.first)){
				console.error('Not element');
			}
			this.point = {x : 0, y : 0};
			this.previous = {x : 0, y : 0};
			this.delta = { x : 0 , y : 0};
			this.listen();
		},
		onEvent : function (e) {
			var name, func;
			name = e.type;
			func = this.actions[this._eventList[name]];
			if(t.isFunction(func)){
				func.call(this,e);
			}
			this.fire(this._eventList[name],e);
		},
		set: function (e,inside) {
			var point = this.getOffset(e);
			this.previous = this.point;
			this.point = point;
			this.delta  = t.Base.Class.Mouse.diff(this.point,this.previous);
			this.inside = inside;
		},
		actions :  {
			wheel : function (e) {
				t.Base.Class.Mouse.addWheelDelta(e);
			},
			move : function (e) {
				this.set(e,true);
			},
			down : function (e) {
				this.set(e,true);
			},
			out : function (e) {
				this.set(e,false);
			}
		},
		listen: function () {
			var events = [],key;
			for(key in this._eventList){
				events.push(key);
			}
			this.element.bind(events.join(' '), this.onEvent.bind(this));
		},
		getOffset: function (e) {
			var offset = this.element.offset;
			return {
				x : e.pageX - offset.x  - this._offset.x,
				y : e.pageY - offset.y  - this._offset.y
			}
		}
	});
	
	t.Base.Class.Mouse.diff = function (point,previous){
		return {
			x : point.x - previous.x,
			y : point.y - previous.y
		};
	};
	t.Base.Class.Mouse.addWheelDelta = function (e) {
			e.delta =
			// IE, Opera, Chrome
			e.wheelDelta ? e.wheelDelta > 0 ? 1 : -1 :
			// Fx
			e.detail     ? e.detail     < 0 ? 1 : -1 : null;
			return e;
	}
})(window.t)