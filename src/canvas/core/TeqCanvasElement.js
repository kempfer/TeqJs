;(function (t) {
    
    'use strict';
    
     t.Class.define('t.canvas.element', {
         
        Implements : [t.Base.Class.Event],
        
        /**
         * {t.canvas.layer}
         */
        layer : null,
        /**
         * {t.canvas.shape}
         */
        shape : null,
        
        _active : false,
        
        /**
         * 
         * @param {string} type
         * @param {Object} attrs
         * @param {t.canvas.layer} layer
         * @returns {t.canvas.element}
         */
        init : function (type,attrs,layer) {
            if(!t.canvas.shapes[type]){
                throw new Error('unknown element type: ' + type);
            }
            this.shape = new t.canvas.shapes[type](attrs);
            this.layer = layer;
            this._id = t.uniqueId();
            this._active = false;
            return this;
        },
        /**
         * 
         * @returns {Object}
         */
        get offset () {
             // TODO реализовать функционал
        },
        /**
         * 
         * @returns {integer}
         */
        get id () {
            return this._id;
        },
        /**
         * 
         * @returns {t.canvas.element}
         */
        remove : function () {
             // TODO реализовать функционал
            return this;
        },
        /**
         * 
         * @returns {t.canvas.element}
         */
        clone : function () {
             // TODO реализовать функционал
            return this;
        },
        /**
        * 
        * @returns {t.canvas.element}
        */
        show : function () {
             // TODO реализовать функционал
            this.fire('show');
            return this;
        },
        /**
         * 
         * @returns {t.canvas.element}
         */
        hide : function () {
             // TODO реализовать функционал
            this.fire('hide');
            return this;
        },
        /**
         * 
         * @returns {t.canvas.element}
         */
        move : function () {
             // TODO реализовать функционал
            this.fire('move');
            return this;
        },
        /**
         * 
         * @returns {t.canvas.element}
         */
        zoom : function () {
             // TODO реализовать функционал
            this.fire('zoom');
            return this;
        },
        /**
         * 
         * @param {float} degrees
         * @returns {t.canvas.element}
         */
        rotate : function (degrees) {
             // TODO реализовать функционал
            this.fire('rotate');
            return this;
        },
        /**
         * 
         * @returns {t.canvas.element}
         */
        resize : function () {
             // TODO реализовать функционал
            this.fire('rotate');
            return this;
        },
        
        animate : function () {
             // TODO реализовать функционал
        },
        /**
         * 
         * @returns {Boolean}
         */
        isVisible : function () {
            
            // TODO реализовать функционал
            return true;
        },
        /**
         * 
         * @returns {Boolean}
         */
        isActive : function () {
            // TODO реализовать функционал
            return false;
        },
        /**
         * 
         * @param {Boolean} active
         * @returns {t.canvas.element}
         */
        setActive : function (active) {
            if(this._active === active){
                return this;
            }
            this._active = active;
            // TODO реализовать функционал
            return this;
        }
         
    });
})(window.t);