(function (t) {

	'use strict';
	
	var regexs = {		
		alpha : /^[a-z]+$/i,
		alphaNumeric : /^[a-z0-9]+$/i,
		alphaDash : /^[a-z0-9_\-]+$/i,
		numeric : /^[0-9]+$/,
		numericDash : /^[\d\-\s]+$/,
		integer : /^\-?[0-9]+$/,
		email : /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,
		ip : /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
		url : /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
	},
	/**
	 * Determine if any of the given attributes fail the required test.
	 *
	 * @param  array  attributes
	 * @return boolean
	 */
	anyFailingRequired = function anyFailingRequired (attributes) {
		for(var key in attributes){
			if(!rules.required(attributes,key)){
				return true;
			}
		}
		return false;
	},
	/**
	 * Determine if all of the given attributes fail the required test.
	 *
	 * @param  array  attributes
	 * @return boolean
	**/
	allFailingRequired = function allFailingRequired (attributes) {
		for(var key in attributes){
			if(rules.required(attributes,key)){
				return false;
			}
		}
		return true;
	},
	getSize = function getSize (v) {	
		if(t.isNumber(v)){		
			return v;
		}
		else if(t.isArray(v)  || t.isString(v)){			
			return v.length;
		}
		return v;
	},
	ruleMethods = {
		required : function validateRequired (attributes,name) {			
			if(attributes[name] === null || attributes[name] === undefined){				
				return false;
			}
			else if (t.isString(attributes[name]) && attributes[name].trim() === "") {
				return false;
			}
			return true;
		},
		requiredIf : function validateRequiredIf (attributes,name,parameters) {					
			if(parameters[1] == attributes[parameters[0]]){
				return ruleMethods.required(attributes,name);
			}
			return true;
		},
		requiredWithout: function validateRequiredWithout (attributes,name,parameters) {
			throw new Error("method is not yet implemented");
		},
		requiredWith: function validateRequiredWith () {
			throw new Error("method is not yet implemented");
		},
		regular : function validateRegular (attributes,name,parameters){
			throw new Error("method is not yet implemented");
		},
		'in' : function validateIN (attributes,name,parameters) {
			return t.contains(parameters,attributes[name]);
		},		
		notIn : function validateNotIN (attributes,name,parameters) {
			return !t.contains(parameters,attributes[name]);
		},
		between : function validateBetween (attributes,name,parameters) {
			var size =  getSize(attributes[name]);
			return size >= parameters[0] && size <= parameters[1];
		},
		confirmed : function validateConfirmed (attributes,name,parameters) {
			var other = attributes[parameters[0]];
			return other !== undefined && other == attributes[name];
		},
		max : function validateMax (attributes,name,parameters) {					
			return getSize(attributes[name]) <= parameters[0];
		},
		min : function validateMin (attributes,name,parameters) {
			return getSize(attributes[name]) >= parameters[0];
		},
		size : function validateSize (attributes,name,parameters) {			
			return getSize(attributes[name]) == parameters[0];
		},
		different: function validateDifferent (attributes,name,parameters) {
			var other = attributes[parameters[0]];
			return attributes[other] !== undefined && attributes[other] != attributes[name];
		},
		same : function validateSame (attributes,name,parameters) {
			var other = attributes[parameters[0]];
			return attributes[other] !== undefined && attributes[other] == attributes[name];
		},
		date : function validateDate (name, values) {
			throw new Error("method is not yet implemented");
		},
		image : function validateImage (name,values) {
			throw new Error("method is not yet implemented");
		},
		mimes: function validateMimeType () {
			throw new Error("method is not yet implemented");
		},
		email : function validateEmail (attributes,name){
			return regexs.email.test(attributes[name]);
		},		
		alpha : function validateAlpha (attributes,name) {
			return regexs.alpha.test(attributes[name]);
		},
		alphaNumeric : function validateAlphaNumeric (attributes,name) {
			return regexs.alpha.test(attributes[name]);
		},
		alphaDash : function validateAlphaDash(attributes,name) {
			return regexs.alpha.test(attributes[name]);
		},
		numeric : function validateNumeric (attributes,name) {
			return regexs.numeric.test(attributes[name]);
		},
		integer : function validateInteger  (attributes,name) {
			return regexs.integer.test(attributes[name]);
		},
		ip : function validateIP(attributes,name) {
			return regexs.ip.test(attributes[name]);
		},
		url : function validateUrl (attributes,name) {
			return regexs.url.test(attributes[name]);
		}		
	},	
	explodeParameters = function explodeParameters (values) {	
		return (t.isString(values)) ? values.split(",") : [];
	},
	explodeRules = function explodeRules (rules) {
		var  listRules, rule, ruleName, ruleValues,
			explode,processedRules = {};
		for(var key in rules){
			rule = rules[key];
			processedRules[key] = {};
			processedRules[key]["rules"] = [];
			listRules = rule.split("|");
			for(var i = 0; i < listRules.length; i++){
				explode = listRules[i].split(":");
				processedRules[key]["rules"].push({
					name : explode[0],
					parameters : explodeParameters(explode[1])
				})
			}			
		}
		return processedRules;
	};	
	var TeqValidator = function (attributes,rules) {
		if (! (this instanceof TeqValidator)) {
			return new TeqValidator(attributes,rules);
		}
		this.attributes = attributes;
		this.rules = explodeRules(rules);
		this.validateMethods = rules;		
		return this;
	};
	TeqValidator.prototype = {
		constructor: TeqValidator,
		fails : function () {
			var result = this.validate();
			return (result.validate === false) ? true : false;
		},
		passes : function () {
			var result = this.validate();
			return (result.validate === true) ? true : false;
		},
		validate : function () {
			var rules, result,rule;
			result = {
				validate : true,
				errorKeys : {},
				countError : 0
			};
			for(var key in this.rules){
				rules = this.rules[key]["rules"];
				for(var i = 0; i < rules.length; i++){
					rule = rules[i];						
					if(t.isFunction(ruleMethods[rule.name])){							
						if(!ruleMethods[rule.name](this.attributes,key,rule.parameters)){					
							if(!t.isArray(result.errorKeys[key])){
								result.errorKeys[key] = [];
							}
							result.errorKeys[key].push(rule.name);
							result.validate = false;
							result.countError = result.countError + 1;
						}
					}
					else{
						if(!t.isArray(result.errorKeys[key])){
							result.errorKeys[key] = [];
						}
						result.errorKeys[key].push(rule.name);		
						result.countError = result.countError + 1;							
					}
				}
			}
			return 	result;		
		}
	};
	t.validator = TeqValidator;
})(window.t)