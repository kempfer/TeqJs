(function () {
	
	'use strict';
	var mapCodes = {
		// Alphabet
		a:65, 
		b:66, 
		c:67, 
		d:68, 
		e:69,
		f:70,
		g:71, 
		h:72, 
		i:73, 
		j:74,
		k:75,
		l:76, 
		m:77, 
		n:78, 
		o:79,
		p:80, 
		q:81, 
		r:82, 
		s:83,
		t:84,
		u:85, 
		v:86, 
		w:87, 
		x:88,
		y:89, 
		z:90,
		// Symbols
		equals: 61,
		hyphen   :109, 
		coma  :188, 
		dot:190,
		gravis:192,
		backslash:220,
		sbopen:219,
		sbclose:221,
		slash :191, 
		semicolon: 59, 
		apostrophe: 222,
		// Numbers
		n0:48, 
		n1:49, 
		n2:50, 
		n3:51, 
		n4:52,
		n5:53, 
		n6:54, 
		n7:55, 
		n8:56, 
		n9:57,
		// numpad
		np0: 96,
		np1: 97, 
		np2: 98, 
		np3: 99, 
		np4:100,
		np5:101, 
		np6:102, 
		np7:103, 
		np8:104, 
		np9:105,
		npslash:11,
		npstar:106,
		nphyphen:109,
		npplus:107,
		npdot:110,
		// Controls
		tab: 9, 
		enter:13, 
		shift:16, 
		backspace:8,
		ctrl:17,
		alt  :18, 
		esc  :27, 
		space    :32,
		menu:93, 
		pause:19,
		cmd  :91,
		insert  :45, 
		home:36, 
		pageup  :33,
		'delete':46, 
		end :35, 
		pagedown:34,
		//Arrows
		aleft:37,
		aup:38,
		aright:39, 
		adown:40,
		// F*
		f1:112, 
		f2:113,
		f3:114, 
		f4 :115, 
		f5 :116, 
		f6 :117,
		f7:118,
		f8:119, 
		f9:120,
		f10:121, 
		f11:122, 
		f12:123,
		// Lock
		capslock:20, 
		numlock:144, 
		scrolllock:145,
	},
	mapNames = {};
	t.object.each(mapCodes, function (val,key) {
		mapNames[val] = key;
	});
	t.Class.define('t.Base.Class.Keyboard', {
		
		Extend : t.Base.Class.Event,
		
		_eventList: {
			keyup : 'up',
			keydown : 'down',
			keypress : 'press'
		},
		
		init : function (element) {
			this.element = t.dom(element);
			if(!t.dom.isElement(this.element.first)){
				console.error('Not element');
			}
			this.keyListen();
		},
		onKeyEvent : function (e) {
			e.preventDefault();
			var name, type,fireEvent,
				first = '';
			type = e.type;
			name = t.Base.Class.Keyboard.getKeyName(e);
			if(e.ctrlKey){
				first = 'ctrl ';
			}
			if(e.altKey){
				first+= 'alt '
			}
			if(type == 'keyup'){
				fireEvent = first + name + ':up';
				this.fire(fireEvent,e);
			}
			else if (type == 'keypress') {
				fireEvent = first + name + ':press';
				this.fire(fireEvent,e);
			}
			else if(type == 'keydown'){
				fireEvent = first + name;
				this.fire(fireEvent,e);
			}
		},
		keyListen : function () {
			var events = [],key;
			t.object.each(this._eventList, function (val,key) {
				events.push(key);
			});
			this.element.bind(events.join(' '), this.onKeyEvent.bind(this));
		}
	});
	t.Base.Class.Keyboard.keyCodes = mapCodes;
	t.Base.Class.Keyboard.codeNames = mapNames;
	t.Base.Class.Keyboard.getKeyName = function (e) {
		var code;
		if (e && e.keyCode != null) {
				code = e.keyCode;
		}
		var type = typeof code;
		if (type == 'number') {
			return t.Base.Class.Keyboard.codeNames[code];
		} 
		else if (type == 'string' && code in t.Base.Class.Keyboard.keyCodes) {
			return code;
		}
		return null;
	}
})(window.t)