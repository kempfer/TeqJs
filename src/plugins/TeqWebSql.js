/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function (t,openDatabase) {
    'use strict';
    
	var toASSOC = function (results) {
		var length, i,response;		
		length = results.rows.length;
		response = new Array();
		for (i = 0; i < length; i++){
			response.push(results.rows.item(i));
		}
		return response;
	},
	toColumn = function (results) {
		var length, i,response,assoc;	
		assoc = toASSOC(results);
		length = assoc.length;
		response = [];
		for (i = 0; i < length; i++){
			response.push(t.object.first(assoc[i]));
		}
		return response;
	};
    var TeqWebSql = function (options) {
        if (! (this instanceof TeqWebSql)) {
            return new TeqWebSql(options);
        }
        this.options = t.combine(TeqWebSql.defaultOptions,options);
        
        this.db = null;
		if(this.option("autoConnect") === true){
			this.connect();
		}
        return this;
    }
    
    TeqWebSql.prototype = {
		constructor: TeqWebSql,
		options : {},
        option : t.accessor({
			get : function (key) {					
				return this.options[key];
			},
			set : function (key,val) {							
				this.options[key] = val;
			}
		}),
        db : null,
        
        connect : function () {
            var databaseName, version, description, size;
            databaseName = this.option("name");
            version = this.option("version");
            description = this.option("description");
            size = this.option("name");
            this.db = openDatabase(databaseName, version, description, size);
            if(this.db === null){
                throw new Error("Failed to connect to database.");
            }
            return true;
        },
		close : function () {
			this.db = null;
		},
        execute : function (sql,params) {            
            params = params || [];			
            return new t.promise(function (resolve,reject) { 					
                this.db.transaction(function(tx) {					
                    tx.executeSql(sql,params,
                    function successExecute  (tx,result) {									
                        resolve(result);
                    },
                    function errorExecute (tx, error) {						
                        reject(error);
                    }
                    );
                });
            }.bind(this));
        },
        queryAll : function (sql, params) {
            return t.promise(function (resolve,reject) { 
				this.execute(sql, params).then(
					function   (result) {						
						resolve(toASSOC(result));
					},
					function  (error) {											
						reject(error);
					}
				);
            }.bind(this));
        },
        queryRow : function (sql, params) {
			return t.promise(function (resolve,reject) { 
				this.execute(sql, params).then(
					function   (result) {	
						var response = 	toASSOC(result);				
						if(t.isEmpty(response)){
							resolve([]);
							return;
						}
						else{
							resolve(response[0]);
						}
					},
					function  (error) {											
						reject(error);
					}
				);
			}.bind(this));
        },
        queryScalar : function (sql, params) {
			return t.promise(function (resolve,reject) { 
				this.execute(sql, params).then(
					function   (result) {								
						resolve(toColumn(result));
					},
					function  (error) {											
						reject(error);
					}
				);
			}.bind(this));
        },
        queryColumn : function (sql, params) {
			return t.promise(function (resolve,reject) { 
				this.execute(sql, params).then(
					function   (result) {									
						resolve(toColumn(result)[0]);
					},
					function  (error) {											
						reject(error);
					}
				);
			}.bind(this));
        }
    };
    
    TeqWebSql.defaultOptions = {
        name : "database",
        version : "0.1",
        description : "Main Database",
        size : 5 * 1024 * 1024,
        autoConnect : true
    }
    
    t.webSql = TeqWebSql;
})(t,openDatabase);