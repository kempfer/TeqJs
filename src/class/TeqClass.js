// accessors 
(function () {

	'use strict';
	var standard = !!Object.getOwnPropertyDescriptor, nonStandard = !!{}.__defineGetter__,
	define = nonStandard ? 
		function (object, property, accessors) {	
			if (accessors) {
				if (accessors.get) {
					object.__defineGetter__(property, accessors.get);
				}
				if (accessors.set){
					 object.__defineSetter__(property, accessors.set);
				}
			}
			return object;
		}
	: 
	function (object, prop, accessors) {
		if (accessors) {
			console.log(accessors);
			var desc = {
				get: accessors.get,
				set: accessors.set,
				configurable: true,
				enumerable: true
			};
			Object.defineProperty(object, prop, desc);
		}
		return Object;
	},
	lookup = nonStandard ?  
		function (object, key) {
				var getter, setter;
				getter = object.__lookupGetter__(key);
				setter = object.__lookupSetter__(key);
				return !!(getter || setter);
		}
	:
	function (object, key) {
		var proto, accessors;
		accessors = Object.getOwnPropertyDescriptor(object, key);
		if(!accessors) {
			proto = Object.getPrototypeOf(object);
			return t.accessors.lookup(proto,key);
		}
		else if (accessors.get || accessors.set ){
			return true;
		}
		else{
			return false;
		}
	},
	Accessors = {
		lookup : lookup,
		find : function (object, key) {
			if(t.accessors.lookup(object, key)){
				if(nonStandard) {
					return {
						get : object.__lookupGetter__(key),
						set : object.__lookupSetter__(key)
					}
				}
				else{
					return {
						get : object.get,
						set : object.set
					}
				}
				
			}
			return null;
		},
		define : function (object, property, accessors) {
			if (typeof property == 'object') {
				for (var i in property){
					define(object, i, property[i]);
				} 
			} 
			else {
				define(object, property, accessors);
			}
			return object;
		},
		has: function (object, key) {
			return t.accessors.lookup(object, key);
		},
		inherit: function (object, to, key) {
			var is = t.accessors.find(object, key);			
			if ( is ) {
				t.accessors.define(to, key, is);
				return true;
			}
			return false;
		}
	}
	
	
	t.accessors = Accessors;
})();

(function () {
	'use strict';
	
	/**
	* TYPE
	*/	
	var prototyping = false,
	factory = false,
	typeOf = function (item) {
		if (item == null) {
			 return 'null';
		}
		var types = {
			'[object Boolean]' 	: 'boolean',
			'[object Number]' 	: 'number',
			'[object String]' 	: 'string',
			'[object Function]' : 'function',
			'[object Array]' 	: 'array',
			'[object Date]' 	: 'date',
			'[object RegExp]' 	: 'regexp',
			'[object TeqClass]'	: 'teqclass'
		};
		var string = item.toString();
		//var string = toString.call(item);		
		for (var i in types){
			if (i == string) {								
				return types[i];
			}
		}		
		return typeof item;
		
	},
	clone  = function (object) {
		var cloneTypes = {
			'array' : function (array) {
				var length, newArray;				
				length = array.length,
				newArray = new Array(length);
				while(length--){
					newArray[length] = clone(array[length]);
				}
				return newArray;
			},
			'teqclass' : function (object) {
				return typeof object.clone == 'function' ?
					object.clone() : object;
			},
			'object' : function (object) {
				var  newObject;
				if (typeof object.clone == 'function'){
					 return object.clone();
				}
				newObject = {};
				for (var key in object) {
					if (!t.accessors.inherit(object, newObject, key)){
						newObject[key] = clone(object[key]);
					}
				}
				return newObject;
				
			}
		};
		var type = typeOf(object);		
		return type in cloneTypes ? cloneTypes[type](object) : object;
	},
	extend = function (elem, from) {		
		for (var key in from){ 
			if (key != 'constructor') {
				if(!t.accessors.inherit(from, elem, key)){
					elem[key] = clone(from[key]);	
				}
			}
		}
		return elem;
	},
	callParent = function(){			
		var name, parent, previous;
		if(!this.$caller){
			throw new Error('The method �parent� cannot be called.');
		}
		name    = this.$caller.$name;
		parent   = this.$caller.$owner.parent;
		previous = parent && parent.prototype[name];
		if(!previous){
			throw new Error('The method �' + name + '� has no parent.');
		}
		return previous.apply(this, arguments);
	},
	
	getInstance  = function (Class) {
		prototyping = true;
		var proto = new Class;
		prototyping = false;
		return proto;
	},
	wrap = function (self, key, method) {
		if (method.$origin){
			method = method.$origin;
		}
		var wrapper = function() {
			if (!this){
				 throw new TypeError('Context lost');
			}
			if (method.$protected && !this.$caller){
				throw new Error('The method �' + key + '� is protected.');
			}			
			var current = this.$caller;
			this.$caller = wrapper;
			var result = method.apply(this, arguments);
			this.$caller = current;
			return result;
		};
		wrapper.$owner  = self;
		wrapper.$origin = method;
		wrapper.$name   = key;
		return wrapper;
	},		
	define = function (path, object){
		var key, part, target = window;
		path = path.split('.');
		key  = path.pop();
		while (path.length) {
			part = path.shift();
			if (!target[part]) {
				target = target[part] = {};
			} 
			else {
				target = target[part];
			}
		}
		target[key] = object;
	},	
	Mutators = {
		Extend : function (parent) {
			if(parent == null){
				throw new TypeError('Cant extends from null');
			}
			this.extend(parent).reserved({ parent: parent });
			this.prototype = getInstance(parent);
		},
		Implements: function(items){
			this.mixin.apply(this, t.array.from(items));
		},
	},
	baseMethods = {
		mixin : function () {
			t.array.from(arguments).forEach(function (item) {
				this.implement(getInstance(item),false);
			}.bind(this));
			return this;
		},
		reserved : function (toProto, props) {
			if (arguments.length == 1) {
				props = toProto;
				toProto = false;
			}
			var target = toProto ? this.prototype : this;
			for (var name in props) {
				t.accessors.define(target, name, { get: t.lambdaFunc(props[name]) });
			}
				return this;
		},
		extend : function (name, func) {
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
		},
		implement : function (name, fn,retain) {			
			if (typeof name == 'string') {
				var params = {};
				params[name] = fn;
			} 
			else {
				params = name;
				retain = fn;		
			}
			for (var key in params) {
				if (!t.accessors.inherit(params, this.prototype, key)) {
					var value = params[key];
					if(Mutators.hasOwnProperty(key)) {
						value = Mutators[key].call(this, value);
						if (value == null) {
							continue;
						}
					}				
					if (typeof value == 'function' && typeOf(value) == 'function'){
						if (value.$origin){
							value = value.$origin;
						} 										
						this.prototype[key] = (retain) ? value : wrap(this, key, value);
					}
					else{						
						this.prototype[key] = clone(value);
					}
				}
			}
			return this;
		},
		invoke : function (){
			return this.factory( arguments );
		},
		factory : function () {
			factory = true;			
			return new this(arguments[0]);
		}
	},
	construct = function (Constructor, args){
		if (factory) {
			args = args[0];
			factory = false;
		}		
		if (prototyping) {
			return this;
		} 
		if (this instanceof Constructor) {		
			return this.init ? this.init.apply(this, args) : this;
		} 
		else {
			return Constructor.invoke.apply(Constructor, args);
		}
	},
	prepapreClass = function (Constructor,object) {
		object = object || {};
		if (typeof object == 'function') {
			object = { init: object };
		}
		for(var key in baseMethods) {
			Constructor[key] = baseMethods[key];
		}
		Constructor.implement(object, false);
		Constructor.reserved(true,{
			callParent: callParent			
		});		
		return Constructor;
	},
	TeqClass = {
		define : function (name,object) {
			var Constructor, arrayPath;
			Constructor = function (){
				return construct.call(this, Constructor, arguments);
			};						
			Constructor = prepapreClass(Constructor,object);			
			Constructor.prototype.constructor = Constructor;		
			Constructor.prototype.PATH = name;
			arrayPath = name.split('.');
			Constructor.prototype.name = arrayPath[arrayPath.length - 1];
			define(name, Constructor);			
		},
		create : function (object) { 
			var Constructor;
			Constructor = function (){
				return construct.call(this, Constructor, arguments);
			};						
			Constructor = prepapreClass(Constructor,object);			
			Constructor.prototype.constructor = Constructor;
			return Constructor;
		}
	};
	t.Class = TeqClass;
})()