define(function(require,exports,module){
	var Ball = require('./ball.js');
	var action = require('./action.js');
	
	var initBallR = 20;//初始半径
	var initSpeed = 20; //初始速度
	var canvas = document.getElementById('canvas');
	var c_width = window.innerWidth;
	var c_height = window.innerHeight;
	var ballList = [];//所有的球列表

	var ctx = canvas.getContext('2d');
	canvas.width = c_width;
	canvas.height = c_height;
	var ball = new Ball('first',ctx,c_width/2,c_height/2,initBallR,initSpeed,"#FFFFF");
	ballList.push(ball);
	var derection = action.initDirKeyEvent();
	if(derection.s){
		ballList = ballList.concat(ballList[0].splitBall());
		ballList.shift();
	}
	for(i in ballList){
		ballList[i].draw();
		ballList[i].move(derection,true)
	}

});