define(function(require, exports, module) {
	var random = require('./random.js');
	var action = require('./action.js');

	//定义一个球的类
	function Ball(id ,ctx, positionX , positionY , r ,speed , bgcolor){
		//初始化小球

		this.id = id ;//每个球的唯一性标识
		this.ctx = ctx;
		this.positionX = positionX;
		this.positionY = positionY;
		this.r = r;
		this.bgcolor = bgcolor;
		this.area = Math.PI * this.r * this.r ;
		this.initSpeed = speed; //初始速度，用于后续速度改变计算
		this.speed = speed ; //实际速度


		this.draw = function(){
			this.ctx.fillStyle= bgcolor;
			this.ctx.beginPath();
			this.ctx.arc(this.positionX,this.positionY,this.r,0,2*Math.PI);
			this.ctx.closePath();
			this.ctx.fill();
		}
	};
  	//移动
	Ball.prototype.move = function(derection,isMove){
		var that = this;//将小球的this 传给that ，否则，setInterval里的this会变成window
		var canvasWidth = window.innerWidth;
		var canvasHeight = window.innerHeight;
		
		if(isMove){
			setInterval(function(){
				that.ctx.clearRect(0,0,canvasWidth,canvasHeight);
				that.positionY += that.speed * derection.y;
				that.positionX += that.speed * derection.x;

				// 边缘碰撞检测
				if(that.positionY <= that.r){
					that.positionY = that.r
				}
				if(that.positionX <= that.r){
					that.positionX = that.r;
				}

				if(canvasHeight - that.positionY < that.r){
					that.positionY = canvasHeight - that.r;
				}

				if(canvasWidth - that.positionX < that.r){
					that.positionX = canvasWidth - that.r;
				}
				//产生随机点并在地图上显示
				var positionArr = random.randomPositon();
				for(var i = 0 ;i < positionArr.length; i++){
					that.ctx.fillRect(positionArr[i].x,positionArr[i].y,positionArr[i].w,positionArr[i].w);
				}
				that.draw();
				that.eatParticle(positionArr);
			},200);
		}
	}
	//吐球


	//分裂
	Ball.prototype.splitBall = function(){
		var that = this;
		var splitArea = that.area / 2;
		var splitR = Math.sqrt(splitArea / Math.PI);
		var splitedBallArr = [];
		splitedBallArr.push(new Ball('second',that.ctx,that.positionX ,that.positionY ,splitR,10,"#CCCCC"));
		splitedBallArr.push(new Ball('third',that.ctx,that.positionX + 1.5  * that.r ,that.positionY + 1.5  * that.r,splitR,10,"#CCCCC"));
		return splitedBallArr;
	}

	//吃小粒子
	Ball.prototype.eatParticle = function( particleArr ){
		var that = this;
		//球与粒子之间碰撞检测
		for(var i in particleArr){
			//球与小粒子之间的距离
			var distance = Math.sqrt((that.positionX - particleArr[i].x - 10) * (that.positionX - particleArr[i].x - particleArr[i].w /2) + (that.positionY- particleArr[i].y - particleArr[i].w /2) * (that.positionY- particleArr[i].y - particleArr[i].w /2));
			if( distance < that.r  ){
				//球的半径变大
				that.area += particleArr[i].w * particleArr[i].w;
				that.r = Math.sqrt(that.area / Math.PI);
				particleArr.splice(i,1);
				//球的速度变小
				that.speed = that.initSpeed / that.r * that.initSpeed * 1.2  ;
			}
		}
	}
	//吃球


  module.exports = Ball ;

});