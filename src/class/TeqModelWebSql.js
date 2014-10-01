t.Class.define("t.data.ModelWebSlq",{
		
	
	init : function (values) {
		this.getDBConnect().execute(this.getTableSql());
		if(values){
			return this.loadRecord(values);
		}
	},	
	getDBConnect : function () {
		throw new Error("no connection to the database");
	},
	fields :[],
	
	__pk : null,
	
	__data: {},
	
	getPKName : function () {
		return "id";
	},
	getTableName : function () {
		throw new Error("not set table name");
	},
	getTableSql : function () {
		throw new Error("not set table sql");
	},
	validation : function (data) {
		return true;
	},
	isAttribute : function (name) {		
		return t.contains(this.fields,name);
	},
	add : function (values) {
		var query, keys;		
		return new t.promise(function (resolve,reject) { 
			delete values[this.getPKName()];						
			try {				
				if(this.validation(values)){
					keys = Object.keys(values);
					query = "INSERT INTO " + this.getTableName() + "(" + keys.join(", ") + ")";
					query+= " VALUES ( ";
					for(var i = 0; i < keys.length; i++){
						if( i == keys.length - 1){
							query+="? ";
						}
						else{
							query+="?, ";
						}
					}					
					query+=") ";					
					this.getDBConnect().execute(query,t.object.values(values)).then(
						function success (result) {							
							resolve(result.insertId);
						},
						function error(error) {
							reject(error);
						}
					);
				}
			}
			catch(e){				
				reject(e.message);
			}		
		}.bind(this));
		
	},
	findByPK : function (pk) {
		var query, values;		
		return new t.promise(function (resolve,reject) {
			try {
				query = "SELECT * FROM " + this.getTableName() + " WHERE  " + this.getPKName() + " = ? LIMIT 1";
				this.getDBConnect().queryRow(query,[pk]).then(
					function success(result) {						
						resolve(result);
					},
					function error (error) {
						reject(error);
					}
				);
			}
			catch(e){
				reject(e.message);
			}
		}.bind(this));
		
	},
	updateByPK : function (pk,data) {
		var query , values;
		return new t.promise(function (resolve,reject) {
			try{
				if(!this.validation(data)){
					reject("not validation data"); 
				}
				delete data[this.getPKName()]; 
				query = "UPDATE " + this.getTableName() + " SET ";
				values = [];
				for(var key in data){
					query+= key +  " = ?,";
					values.push(data[key]);
				}					
				query = query.substr(0,query.length-1);				
				query+=" WHERE " + this.getPKName() + " = ?";				
				values.push(pk);
				this.getDBConnect().execute(query,values).then(
					function success(result) {
						resolve(result.rowsAffected);
					},
					function error (error) {
						reject(error);
					}
				);
			}
			catch(e){
				reject(e.message);
			}
		}.bind(this));
	},
	removeByPK : function (pk) {
		var query ;
		return new t.promise(function (resolve,reject) {
			try{
				query = "DELETE FROM " + this.getTableName() + " WHERE " + this.getPKName() + " = ?";
				this.getDBConnect().execute(query,[pk]).then(
					function success(result) {
						resolve(result.rowsAffected);
					},
					function error (error) {
						reject(error);
					}
				);
			}
			catch(e){
				reject(e.message);
			}
		}.bind(this));
	},
	save : function () {
		if(this.__pk === null){
			return false;
		}
		var attibutes = this.getAttributes();		
		return this.updateByPK(this.__pk,attibutes);
	},
	remove : function () {
		if(this.__pk === null){
			return false;
		}
		return this.removeByPK(this.__pk);
	},
	setAttribute : function  (name,value) {		
		if(this.isAttribute(name)){
			this[name] = value;
			this.__data[name] = value;
			return true;
		}
		return false;
	},
	setAttributes : function (values) {
		var key;
		if(t.isObject(values)){					
			for(key in values){				
				this.setAttribute(key,values[key]);
			}
			return true;
		}
		return false;
	},
	getAttributes : function () {
		var values, attributes, i;
		attributes = this.__data;
		values = {};		
		for(var i = 0; i < this.fields.length; i++){					
			if(attributes[this.fields[i]] !== undefined){			
				values[this.fields[i]] = attributes[this.fields[i]];
			}
		}
		return values;
	},
	loadRecord : function (values) {
		if(t.isEmpty(values)){
			return false;
		}		        
		var model = this.getInstance();        
		model.setAttributes(values);
		model.__pk = values[model.getPKName()];		
		return model;
	},
    getInstance : function () {
        var key, part, target = window;
        path = this.PATH;
		path = path.split('.');
		key  = path.pop();
		while (path.length) {
			part = path.shift();			
			target = target[part];
			
		}
		return new target[key]();
    }
});