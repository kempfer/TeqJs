
(function (t,window) {
	'use strict';
	
	var requestAnimFrame = requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function(callback){
					window.setTimeout(callback, 1000 / 60);
				};
    })();
		
						
	var TeqAnimation =  function (options) {
		if (! (this instanceof TeqAnimation)) {
			return new TeqAnimation(options);
		}
		this.options = t.combine(TeqAnimation.defaultOptions,options);
		this._abort = false;
		this._stop = false;
		requestAnimFrame(function (timestamp) {				
			var onStart,onChange,onComplete,
				startTime, finishTime, onAbort, 
				easing,duration,startValue,endValue,
				byValue,start,finish,time,self,abort;
			start = timestamp || +new Date();
			duration = this.option('duration');
			startValue = this.option('startValue');
			endValue = this.option('endValue');
			byValue = this.option('byValue') || endValue - startValue;
			onStart = this.option('onStart');
			onChange = this.option('onChange');
			onComplete = this.option('onComplete');
			onAbort = this.option('onAbort');
			finishTime = start + duration;
			easing = this.option('easing');
			onStart.apply(this);
			self = this;
			abort = function () {return this._abort}.bind(this);
			(function step (stepTime) {
				var currentTime;
				time = stepTime || +new Date();
				if(abort()) {
					onAbort.apply(self);
					return;
				}
				//if(!this._stop){
					currentTime = time > finishTime ? duration : (time - start);						
					onChange.apply(self,[easing(currentTime, startValue, byValue, duration)]);
				//}					
				if (time > finishTime) {
					onComplete.apply(self);
					return;
				}
				requestAnimFrame(step);
			})(start);
		}.bind(this));
	};
	
	TeqAnimation.prototype = {
		constructor: TeqAnimation,
		option : t.accessor({
			get : function (key) {
				return this.options[key];
			},
			set : function (key,val) {
				this.options[key] = val;
			}
		}),
		_abort : false,
		_stop : false,
		abort : function () {
			this._abort = true;
		}
	}
	
	TeqAnimation.defaultOptions = {
		duration : 500,
		onStart : t.emptyFunc,
		onComplete : t.emptyFunc,
		onAbort : t.emptyFunc,
		onChange : t.emptyFunc,
		delay : 0,
		iterationCount : 1,
		startValue : 0,
		endValue : 100,
		byValue : false,
		easing : function(a, b, c, d) {return -c * Math.cos(a / d * (Math.PI / 2)) + c + b;}
	};
	
	t.animation = TeqAnimation;
	t.requestAnimFrame = requestAnimFrame;
	if(t.dom){
		t.dom.prototype.animation = function (params) {
			this.each(function (elem) {
				elem['animate'] = new t.animation(params);
			});
		};
		t.dom.prototype.animationAbort = function () {
			this.each(function (elem) {
				if(elem['animate']){
					elem['animate'].abort();
				}				
			});
		}
	}
}(window.t, window));