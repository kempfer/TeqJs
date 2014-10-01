QUnit.test( "Teqjs Core", function( assert ) {

	var object = {};
	//t.isFunction
	assert.ok( !t.isFunction(""), "!t.isFunction('')" );
	assert.ok( t.isFunction(function () {}), "t.isFunction(function () {})" );
	var func = function () {};
	assert.ok( t.isFunction(func), "t.isFunction(func)" );
	object = { func : function () {}, notFunction : {}};
	assert.ok( t.isFunction(object.func), "t.isFunction(object.func)" );
	assert.ok( !t.isFunction(object.notFunction), "!t.isFunction(object.notFunction)" );
	
	
	//t.isArray 
	
	assert.ok( !t.isArray(''), "!t.isArray('')" );
	assert.ok( !t.isArray({}), "!t.isArray({})" );
	assert.ok( t.isArray([]), "t.isArray([])" );
	object.array = []; 
	assert.ok( t.isArray(object.array), "t.isArray(object.array)" );
	object.notArray = null; 
	assert.ok( !t.isArray(object.notArray), "!t.isArray(object.notArray)" );
	
	//t.toArray
	assert.ok( t.isArray(t.toArray({a : 10})), "t.isArray(t.toArray({})" );
	
	//t.isEmpty
	assert.ok( t.isEmpty() , "t.isEmpty()" );
	assert.ok( t.isEmpty([]), "t.isEmpty([])" );
	assert.ok( t.isEmpty({}), "t.isEmpty({})" );
	assert.ok( t.isEmpty(0), "t.isEmpty(0)" );
	assert.ok( !t.isEmpty(1), "!t.isEmpty(1)" );
	assert.ok( !t.isEmpty('a'), "!t.isEmpty('a')" );
	assert.ok( !t.isEmpty([0]), "!t.isEmpty([0])" );
	assert.ok( !t.isEmpty({x:1}), "!t.isEmpty({x:1})" );
	assert.ok( t.isEmpty(''), "t.isEmpty('')" );
	assert.ok( t.isEmpty(false), "t.isEmpty(false)" );
	assert.ok( !t.isEmpty(true), "!t.isEmpty(true)" );
	assert.ok( t.isEmpty(undefined), "!t.isEmpty(undefined)" );
	
	//t.isObject 
	assert.ok( !t.isObject(''), "!t.isObject('')" );
	assert.ok( !t.isObject([]), "!t.isObject([])" );
	assert.ok( !t.isObject(1), "!t.isObject(1)" );
	assert.ok( !t.isObject(false), "!t.isObject(false)" );
	assert.ok( !t.isObject(true), "!t.isObject(true)" );
	assert.ok( !t.isObject(function () {}), "!t.isObject(function () {})" );
	assert.ok( t.isObject({}), "t.isObject({})" );
	
	//t.isString
	assert.ok( !t.isString(1), "!t.isString(1)" );
	assert.ok( !t.isString([]), "!t.isString([])" );
	assert.ok( !t.isString({}), "!t.isString({})" );
	assert.ok( !t.isString(false), "!t.isString(false)" );
	assert.ok( t.isString("string"), "t.isString('string')" );
	assert.ok( t.isString(new String('').toString()), "t.isString(new String('')).toString()" );
	
	//t.isBoolean
	assert.ok( !t.isBoolean(1), "!t.isBoolean(1)" );
	assert.ok( !t.isBoolean('false'), "!t.isBoolean('false')" );
	assert.ok( !t.isBoolean([]), "!t.isBoolean([])" );
	assert.ok( t.isBoolean(true), "t.isBoolean(true)" );
	
	//t.isNumber
	assert.ok( !t.isNumber("1"), "!t.isNumber('1')" );
	assert.ok( !t.isNumber(true), "!t.isNumber(true)" );
	assert.ok( t.isNumber(1), "t.isNumber(1)" );
	assert.ok( t.isNumber(1/2), "t.isNumber(1/2)" );
	
	
});