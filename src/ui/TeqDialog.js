(function () {
	'use strict';
	var createButton = function (buttons) {
		var i = 0, elButtons = [], button;
		for(i = 0; i < buttons.length; i++){
			button = t.dom.create("button",{"class" : "teq_button"});
			button.html  = buttons[i].text || "Ok";
			button.bind("click",buttons[i].handler);
			elButtons.push(button);
		}
		return elButtons;
	};
	var createHtmlView = function () {
		var div = t.dom.create("div",{"class" : "teq_dialog"});
		div.append(t.dom.create("div",{"class" : "dialog_title"}));
		div.append(t.dom.create("div",{"class" : "dialog_content"}));
		div.append(t.dom.create("div",{"class" : "dialog_button_container"}));
		return div;
	};
	var TeqDialog = function (dialog ,options) {
		if (! (this instanceof TeqDialog)) {
			return new TeqDialog(dialog,options);
		}
		this.options = t.combine(TeqDialog.defaultOptions,options);
		this._open = false;
		this.dialogEl = createHtmlView();
		this.dialogEl.find(".dialog_title").html = this.option("title");
		this.dialogEl.find(".dialog_content").append(dialog);
		var elButtons = createButton(this.option("buttons"));
		elButtons.forEach(function (el){
			this.dialogEl.find(".dialog_button_container").append(el);
		}.bind(this));		
		this.modelEl = null;		
		if(this.option("modal") === true){
			this.modelEl = t.dom.create("div",{"class" : "teq_modal"});
		}		
		if(this.option("autoOpen") === true){
			this.open();
		}		
		return this;
	};
	TeqDialog.prototype = {
		_open : false,
		dialogEl : null,	
		modelEl : null,
		option : t.accessor({
			get : function (key) {
				return this.options[key];
			},
			set : function (key,val) {
				this.options[key] = val;
			}
		}),
		get isOpen () {
			return this._open;
		},
		open : function () {
			var appendTo = t.dom(this.option("appendTo"));
			this.dialogEl.css("height", this.option("height"));
			this.dialogEl.css("width", this.option("width"));
			appendTo.append(this.dialogEl);
			console.log(this.modelEl);
			if(this.modelEl !== null){
				appendTo.append(this.modelEl);
			}
		},
		hide : function () {
			this.dialogEl.css("display","none");
			if(this.modelEl !== null){
				this.modelEl.css("display","none");
			}
		},
		show : function () {
			this.dialogEl.css("display","block");
			if(this.modelEl !== null){
				this.modelEl.css("display","block");
			}
		},
		remove : function () {
			this.dialogEl.remove();
			if(this.modelEl !== null){
				this.modelEl.remove();
			}
		}
	};
	TeqDialog.defaultOptions = {
		appendTo : "body",
		autoOpen : true,
		buttons : [],		
		height : 200,
		width: 300,
		title : "",
		modal : true
	}
	t.dialog = TeqDialog;
})();