;(function (t) {
    
    'use strict';
    
    t.Class.define('t.canvas.layer', {
        
        Implements : [t.Base.Class.Event],
        
        canvas : null,
        
        context : null,
        
        elements : {},
        
        init : function (width,height,selector,zIndex) {
            var args = t.args(arguments).toObject(['width','height','selector','zIndex']);
            this.canvas = t.dom.create('canvas',{
                width : args.width,
                height : args.height
            });
            this.canvas.css('z-index', args.zIndex || 1);
            this.context =  this.el.getContext('teq-2d');
            this.elements = {};
            if( args.selector){
                this.appendTo(args.selector);
            }
            return this;
        },
        /**
         * @return {t.canvas.layer}
         */
        clear : function () {
            this.context.clearAll();
            this.fire('clear');
            return this;
        },
        /**
         * 
         * @param {String} type
         * @param {Object} attrs
         * @returns {t.canvas.laye}
         */
        createEl : function (type, attrs) {
            var el = new t.canvas.element(type,attrs, this);
            this.elements[el.id] = el;
            this.renderEl(el);
            return el;
        },
        /**
         * 
         * @param {t.canvas.element} element
         * @returns {t.canvas.layer}
         */
        drawEl : function (element) {
            if(!this.elements[element.id]) {
                this.elements[element.id] = element;
            }
            element.shape.render(this.context);
            return this;
        },
        /**
         * 
         * @param {t.canvas.element} element
         * @returns {t.canvas.layer}
         */
        removeEl : function (element) {
            delete this.elements[element.id];
            element.remove();
            return this;
        },
        /**
         * 
         * @param {String} type
         * @returns {String}
         */
        toImage : function (type) {
            type = type || 'png';
            return this.canvas.toDataURL("image/" + type);
        },
        /**
         * 
         * @param {selector} selector
         * @returns {t.canvas.layer}
         */
        appendTo : function (selector) {
            t.dom(selector).appendTo(this.canvas);
            return this;
        },
        /**
         * 
         * @returns {t.canvas.layer}
         */
        clone : function () {
            // TODO реализовать функционал
            return this;
        },
        /**
         * 
         * @returns {t.canvas.layer}
         */
        fill : function () {
            // TODO реализовать функционал
            return this;
        },
        /**
         * 
         * @returns {t.canvas.layer}
         */
        show : function () {
            this.canvas.css('display','block');
            this.fire('show');
            return this;
        },
        /**
         * 
         * @returns {t.canvas.layer}
         */
        hide : function () {
            this.canvas.css('display','hide');
            this.fire('hide');
            return this;
        }
        
    });
})(window.t);