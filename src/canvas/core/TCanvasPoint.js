;(function (t) {
	'use strict';
		
	t.Class.define('t.canvas.point',{
	
		x : 0,
		
		y : 0,
		
		init : function (x,y) {
            var point = new t.args(arguments).toObject(['x','y']);
			this.x = Number(point.x);
			this.y = Number(point.y);
			return this;
		},
		/**
         * 
         * @returns {Object}
         */
		toObject: function () {
			return { x: this.x, y: this.y };
		},
        /**
         * 
         * @returns {Array}
         */
		toArray: function () {
			return [ this.x, this.y ];
		},
        /**
         * 
         * @returns {t.canvas.point}
         */
		clone : function () {
			return new t.canvas.point(this.x,this.y);
		},
        /**
         * 
         * @param {t.canvas.point} point
         * @returns {t.canvas.point}
         */
        diff: function (point) {
            return new t.canvas.point(this.x - point.x, this.y - point.y);
        },
        /**
         * 
         * @param {type} angle
         * @param {t.canvas.point} point
         * @returns {t.canvas.point}
         */
        rotate : function (angle, point) {
            var radius, newAnge, sides;
            radius = point.distance(this);
            sides = point.diff(this);
            newAnge =  Math.atan2(sides.x, sides.y) - angle;
            this.moveTo({
                x : Math.sin(newAngle) * radius + point.x,
				y : Math.cos(newAngle) * radius + point.y
			});
            return this;
        },
        scale : function (sclaX,scaleY, point) {
            var diff = this.diff(point);
			this.moveTo({
				x : pivot.x - diff.x  * sclaX,
				y : pivot.y - diff.y  * scaleY
			});
            return this;
        },
        /**
         * 
         * @param {t.canvas.point} point
         * @returns {Number}
         */
        distance : function (point) {
            point = new t.agrs(arguments).toObject(['x','y']);
            return Math.sqrt(
                Math.pow(point.x - this.x) + Math.pow(point.y - this.y)
            );
        },
        /**
         * 
         * @param {t.canvas.point} point
         * @param {Boolean} reverse
         * @returns {t.canvas.point}
         */
        move : function (point, reverse) {
            point = new t.agrs(arguments).toObject(['x','y']);
            reverse = reverse ? -1 : 1;
            this.x +=  point.x  * reverse;
            this.y +=  point.y  * reverse;
            return this;
        },
        /**
         * 
         * @param {t.canvas.point}  point
         * @returns {t.canvas.point} 
         */
        moveTo : function (point) {
            var distance;
            point = t.agrs(arguments).toObject(['x','y']);
            distance = this.diff(point);
            this.move(distance);
            return this;
        },
        /**
         * 
         * @param {t.canvas.point}  point
         * @returns {Boolean}
         */
        equals : function (point) {
            point = t.agrs(arguments).toObject(['x','y']);
            return this.x == point.x && this.y == point.y;
        }

	});
	t.canvas.point.from = function (object) {
		if(!object){
			return null;
		}
		return object instanceof t.canvas.point ? object : new t.canvas.point (object);
	};
})(window.t);