/***
* TEQ JS
* PLUGINS Anchor
*
*
*
**/

(function () {
	'use strict';

	var findPosition = function(anchors,domNode) {
		var positions = [], offset,anchor,parentOffset,position,
            scrollTop, scrollLeft;
		parentOffset = domNode.offset;
        scrollTop = domNode.first.scrollTop;
        scrollLeft = domNode.first.scrollLeft;
        console.log(scrollTop);
		anchors.each(function (node) {
			anchor = t.dom(node);
			offset = anchor.offset;
			position = {};
			position.y = offset.y  - parentOffset.y + scrollTop;
			position.x = offset.x - parentOffset.x + scrollLeft;
			position.hash = anchor.attr('name');
			positions.push(position);
		});
		return positions;
	},
	between = t.number || function (number, start, finish) {
			number = Number(number);
			start = Number(start);
			finish = Number(finish);
			return (start < finish) && (number  > start  && number  < finish);
	},
	handleEvent = function (e,self) {
		var scrollLeft,scrollTop,onChange,anchor,nextAnchor,currentY,currentActive;
		currentActive = self.currentActive;
		self.anchorsPosition = findPosition(self.anchors,self.domNode);
		onChange = self.option('onChange');
		scrollLeft = self.domNode.first.scrollLeft;
		scrollTop = self.domNode.first.scrollTop;
		if(scrollTop != self.lastScrollTop){
			for(var i = 0; i < self.anchorsPosition.length; i++){
				anchor = self.anchorsPosition[i];
				nextAnchor = self.anchorsPosition[i+1];
				if(typeof nextAnchor == "undefined"){
					nextAnchor = {};
					nextAnchor.y = scrollTop + 9999999;
				}
				if(between(scrollTop,anchor.y,nextAnchor.y)){
					var diffAnchor = Math.abs(anchor.y - scrollTop);
					var diffNextAnchor  = Math.abs(nextAnchor.y - scrollTop);
					if(diffAnchor < diffNextAnchor){
						currentActive = anchor.hash;
					}
					else{
						currentActive = nextAnchor.hash;
					}
				}
			}
			if(currentActive != self.currentActive){
				onChange.apply(self,[currentActive,e]);
				self.currentActive = currentActive;
			}
		}
		self.lastScrollTop = scrollTop;
		self.lastScrollLeft = scrollLeft;
	};
	var TeqAnchor = function (options) {
		if (! (this instanceof TeqAnchor)) {
			return new TeqAnchor(options);
		}
		this.options = t.combine(TeqAnchor.defaultOptions,options);
		var domNode = this.domNode = t.dom(this.option('selector'));
		try{
			var anchors = this.anchors = domNode.find(this.option('filter'));
		}
		catch(e){
			return null;
		}
		this.anchorsPosition = findPosition(anchors,domNode);
		var self = this;
		domNode.bind('scroll',function (e) {handleEvent(e,self)},false);
		return this;
	};
	TeqAnchor.prototype = {
		constructor: TeqAnchor,
		lastScrollTop : 0,
		lastScrollLeft : 0,
		anchors : [],
		anchorsPosition : [],
		domNode : null,
		currentActive : false,
		option : t.accessor({
			get : function (key) {
				return this.options[key];
			},
			set : function (key,val) {
				this.options[key] = val;
			}
		}),
		change : function (hash) {
			var position = {},
				scrollTop,scrollLeft ,offsetTop, offsetLeft;
			offsetTop = this.option('offsetTop');
			offsetLeft = this.option('offsetLeft');
			this.anchorsPosition = findPosition(this.anchors,this.domNode);
			this.anchorsPosition.forEach(function (el) {
				if(el.hash == hash){
					position = el;
					return;
				}
			});
			if(t.isEmpty(position)){
				return this;
			}
			scrollTop = position.y;
			scrollLeft = position.x;
			this.domNode.first.scrollTop = scrollTop - offsetTop;
			this.domNode.first.scrollLeft = scrollLeft - offsetLeft;
			return this;
		}
	};
	TeqAnchor.defaultOptions = {
		selector 	: document,
		filter 		: 'a',
		onChange 	: t.emptyFunc,
		offsetTop	: 0,
		offsetLeft	: 0
	};
	TeqAnchor.version = '0.0.1',
	t.anchor = TeqAnchor;
}());
