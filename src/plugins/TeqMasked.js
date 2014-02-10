(function () {
    'use strict';

    var createMaske = function (node,options) {
        var teqMasked = '';
    },
    removeMaske = function (node) {
        //;
    },
    setMasked = function (node,masked,options){
        options = !options ? {} : options;
        var element = (node instanceof t.dom) ? node : t.dom('body');
        if(masked){
            createMaske(element,options);
        }
        else{
            removeMaske(element);
        }
    };
    var TeqMaske = function(optinos){
        if (! (this instanceof TeqMaske)) {
			return new TeqMaske(optinos);
		}
    };
    TeqMaske.defaultOptions = {
        msg : 'Loading...',
        useMsg: true,
        renderTpl : '<div style="position:relative" class="teq-mask-msg"></div>',
        modal: true,
        baseCls: 'teq-masked'
    };
    t.setMasked = function (masked,options) {
        setMasked(null,masked,options);
    }
    t.dom.prototype.setMasked = function (masked,options){
        setMasked(this,masked,options);
    }
 }());