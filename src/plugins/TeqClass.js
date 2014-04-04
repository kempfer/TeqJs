/***
* TEQ JS
* PLUGINS Number
*
*
*
**/
// accessors 
(function () {
	var define = function (object, property, accessors) {
		if (accessors) {
			if (accessors.getter) {
				object.__defineGetter__(property, accessors.get);
			}
			if (accessors.setter){
				 object.__defineSetter__(property, accessors.set);
			}
		}
		return object;
	},
	Accessors = {
		lookup : function (object, key) {
			var getter, setter;
			getter = object.__lookupGetter__(key);
			setter = object.__lookupSetter__(key);
			return !!(getter || setter);
		},
		find : function (object, key) {
			return {
				getter : object.__lookupGetter__(key),
				setter = object.__lookupSetter__(key)
			}
		},
		define : function (object, property, accessors) {
			if (typeof property == 'object') {
				for (var i in property){
					define(object, i, property[i]);
				} 
			} 
			else {
				define(object, prop, accessors);
			}
			return object;
		},
		has: function (object, key) {
			return t.accessors.lookup(object, key);
		},
		inherit: function (object, to, key) {
			var is = t.accessors.lookup(object, key);
			if ( is ) {
				t.accessors.define(to, key, a);
				return true;
			}
			return false;
		}
	}
	
	
	t.accessors = Accessors;
})()

(function () {
	'use strict';
	var TeqClass = function (name,object) {
		if (! (this instanceof TeqClass)) {
            return new TeqClass(name,object);
        }
		return this;
	}
	TeqClass.prototype = {
		constructor: TeqClassDefine,
		extend : function (name) {
			
		},
		implement : function () {
		
		},
		callParent : function () {
			
		}
	},
	TeqClass.extend = function (name, func) {
		if (typeof name == 'string') {
			var object = {};
			object[name] = fn;
		} 
		else {
			object = name;
		}
		for (var i in object) {
			if (!t.accessors.inherit(object, this, i)) {
				this[i] = object[i];
			}
		}
		return this;
	};
	TeqClass.defaultOptions = {
		Implements : [],
		Extends : null,
		Static : {},
		initialize : t.emptyFunc
	} 
})();
