
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
		this.start();
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
		start : function () {
			requestAnimFrame(function (timestamp) {
				var onStart,onChange,onComplete,
					startTime, finishTime, onAbort, 
					easing,duration,startValue,endValue,
					byValue,start,finish,time;
				start = timestamp || +new Date();
				duration = this.option('duration');
				startValue = this.option('startValue');
				endValue = this.option('endValue');
				byValue = this.option('byValue') || endValue - startValue;
				onStart = this.option('onStart');
				onChange = this.option('onChange');
				onComplete = this.option('onComplete');
				finish = start + duration;
				easing = this.option('easing');
				onStart.apply(this);
				(function step (stepTime) {
					var currentTime,value;
					time = stepTime || +new Date();
					//if(this._abort) {
					//	onAbort.apply(this);
					//	return;
					//}
					//if(!this._stop){
						currentTime = time > finishTime ? duration : (time - start);
						onChange.apply(this,[easing(currentTime, startValue, byValue, duration)]);
					//}
					if (time > finish) {
						onComplete.apply(this);
						return;
					}
					//return;
					requestAnimFrame(step);
				})(start);
			}.bind(this));
	
			//requestAnimFrame(step);
		},
		stop : function () {
		
		},
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
}(window.t, window));