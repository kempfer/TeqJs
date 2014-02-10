(function (dragZone) {
	var 
		dragImage = t.dom.create('div').first,
		currentNode = false,
		currentDravEffect = false,
		currentAxis = false,		
		currentBoxContainment = [];
		currentNodeOffsetX = 0;
		currentNodeOffsetY = 0;
		dragstart = function (e,node,self) {	
			currentNodeOffsetX = e.offsetX;
			currentNodeOffsetY = e.offsetY;
			e.dataTransfer.setDragImage(dragImage,0,0);
			dravEffect = self.options('dravEffect');
			if(!t.isEmpty(dravEffect)){
				currentDravEffect = dravEffect.toLowerCase();
				currentNode = (currentDravEffect == 'copy') ? node.clone().insertAfter(node) : node;
			}
			else{
				currentNode = node;
			}
			checkAxis(self);
			determineBoxContainment(e,currentNode,self);
			currentNode.css('position', 'absolute');
		},
		drag = function (e,node,self) {
			console.log(currentNodeOffsetY);
			console.log(currentNodeOffsetX);
			if(checkContainment(e)){
				if(currentAxis != 'y'){
					currentNode.css('left', e.clientX - currentNodeOffsetX);
				}
				if(currentAxis !='x'){
					currentNode.css('top', e.clientY - currentNodeOffsetY);
				}		
			}	
		},
		dragend = function (e,node) {
			currentNode.attr('style','');
			if(currentDravEffect == 'copy'){
				currentNode.remove();
			}
			currentNode = false,
			currentDravEffect = false,
			currentAxis = false,
			currentBoxContainment = [];
			currentNodeOffsetX = 0;
			currentNodeOffsetY = 0;
		},
		checkAxis = function (self) {			
			var axis = self.options('axis');			
			if(!t.isEmpty(axis)){
				currentAxis = axis.toLowerCase();				
			}		
			else{
				currentAxis = false;
			}			
		},
		determineBoxContainment = function (e,node,self) {
			var offset, size ,container, containment, a, b, nodeSize;
			containment = self.options('containment');			
			if(!t.isEmpty(containment)){
				container = t.dom(containment);				
				if(container.length > 0){					
					offset = container.offset;
					size = container.size;				
					nodeSize = node.size;					
					a = offset['x'] + size['width'] - (nodeSize['width'] - currentNodeOffsetX);
					b = offset['y'] + size['height'] - (nodeSize['height'] - currentNodeOffsetY);					
					currentBoxContainment = [a,b];					
				}				
			}
			else{
				currentBoxContainment =  [];
			}			
		};
		checkContainment = function (e) {		
			if(currentBoxContainment.length > 0){		
				if(currentBoxContainment[0] < e.clientX || currentBoxContainment[1] < e.clientY){
					return false;
				}			
			}
			return true;
		},
		getOptions = function (type,self) {			
			switch(type){
				case 'dragstart':
					return {fn : self.options('onStart')};
				break;
				case 'drag' :
					return {fn : self.options('onDrag')};					
				break;
				case  'dragend' :
					return {fn : self.options('onStop')};					
				break;				
			}
		};
	
	dragZone.prototype.handleEvent = function (e){
		var fn, options,type,node;
		if(this._disable ){
			e.preventDefault();
			return false;
		}
		type = e.type;
		node = t.dom(e.target);
		switch(type){
			case  'dragstart' :
				dragstart(e,node,this);
			break;
			case 'drag' :
				drag(e,node,this);
			break;
			case 'dragend' :
				dragend(e,node);
			break;
		}		
		options = getOptions(type,this);
		options.fn(e,node);
	}
}(t.dragZone));