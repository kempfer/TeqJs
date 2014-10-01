/***
* TEQ JS
* PLUGINS Cookie
*
*
*
**/
'use strict';

(function () {
	var cookie = {
		
		get : function (name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		set : function(name, value, options) {
			options = options || {};			
			var expires = options.expires;
			if (expires && typeof expires == "number") {
				var dateExpires = new Date();
				dateExpires.setTime(dateExpires.getTime() + expires * 1000);
				expires = dateExpires;
				if (expires.toUTCString) { 
					options.expires = expires.toUTCString();
				}
			}
			var cookie = [name + "=" + encodeURIComponent(value)];
			for (var key in options){
				cookie.push(
					options[key] === true ? key : key + "=" + options[key]
				);
			}
			console.log(cookie);
			document.cookie = cookie.join('; ');
			return this;
		},
		remove : function (name) {
			return cookie.set(name, '', { expires: -1 });
		},
		has: function (name) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		get keys () {
			var keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);		
			keys.forEach(function (el,index){
				keys[index] = decodeURIComponent(keys[index]); 
			});			
			return keys;
		},
		get enabled () {
			return 	navigator.cookieEnabled ||
					("cookie" in document && (document.cookie.length > 0 ||
					(document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
		},
		version : '0.0.1'
	}
	t.cookie = cookie;
}());