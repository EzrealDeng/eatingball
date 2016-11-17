define(function(require,exports,module){
	var time = 800;
	var particleColor = '';
	var particleWidth = 5;
	var particle = [];
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	//定时产生一个点
	setInterval(function(){
			var position = {
				x:Math.floor(Math.random() * canvasWidth),
				y:Math.floor(Math.random() * canvasHeight),
				w:particleWidth
			};
			particle.push(position);
			if(particle.length > 2000){
				particle.shift();
			}
		},time);
	//地图上随机产生一个小粒子的位置
	function randomPositon(){
		//粒子的坐标
		return particle;
	}

	exports.randomPositon = randomPositon;
})