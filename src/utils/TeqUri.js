(function (t,window) {
	'use strict';
	
	var regex  = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
	urlKeys = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
			 'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
			 'anchor'],
	queryRegex = /(?:^|&)([^&=]*)=?([^&]*)/g;	
	
	var uri = function parseUri (str) {
		var m = regex.exec(str || window.location.href),
			values = {},
			i = 14;
		while(i--){
			 values[urlKeys[i]] = m[i] || '';
		}
		values['queryKey'] = {};
		values['query'].replace(queryRegex,function (match, p1, p2, p3, offset, string) {
			if(match){
				values['queryKey'][p1] = p2;
			}
		});
		return values;
	};
	t.uri = uri;
})(window.t,window);