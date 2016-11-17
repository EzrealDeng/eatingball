define(function (require,exports,module) {
	function initDirKeyEvent(){
		var direction = {
			x:0,
			y:0,
			s:false
		}
		document.onkeydown = function(event){
		  var e = event || window.event || arguments.callee.caller.arguments[0];
		  var shift = e.shiftKey;
		  if(e && e.keyCode == 83 && !shift){ // 按 left 
		     direction.x = 0;
		     direction.y = 0;
		   }
		  if(e && e.keyCode == 37 && !shift){ // 按 left 
		     direction.x = -1 ;
		     direction.y = 0;
		   }
		  if(e && e.keyCode == 38 && !shift){ // 按 up 
			direction.x = 0;
			direction.y = -1 ;
		    }      
		  if(e && e.keyCode == 39 && !shift){ // rigth 键
			direction.x = 1 ;
			direction.y = 0;
		  }
		  if(e && e.keyCode == 40 && !shift){ // down 键
		  	direction.x = 0;
		    direction.y = 1 ;
		  }
		  if(e && shift && e.keyCode == 37 ){ //shift 和方向键同时按住
			direction.x = -1 ;
		  }
		  if(e && shift && e.keyCode == 38 ){
			direction.y = -1 ;
		  }
		  if(e && shift && e.keyCode == 39 ){
			direction.x = 1 ;
		  }
		  if(e && shift && e.keyCode == 40 ){
			direction.y = 1 ;
		  }
		  if(e && e.keyCode == 32 ){
		  	console.log("Space");
			direction.s = true ;
		  }
		}; 
		return direction;
	}
	
	exports.initDirKeyEvent = initDirKeyEvent;
})