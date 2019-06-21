// click → start → resizeCanvas → drawAll →circleArray→ animate→ requestAnimationFrame∞  → clearRect→ update(Ntimes)→ draw

const button = document.querySelector('.js-menu__btn');
button.addEventListener('click', function(e){
			
	e.preventDefault();
	start();

});

const start = function() {
	let canvas = document.querySelector('canvas');
	const c = canvas.getContext('2d');

	window.addEventListener('resize', resizeCanvas, false);
	
	function resizeCanvas() {
		canvas.width = window.innerWidth ;
		canvas.height = window.innerHeight;
		
		drawAll();
	}
	
	resizeCanvas();

	function drawAll() {
		
		const hexMaxColor = 16777215;

		//Menu Parameters:
		let circleNumbers =  document.querySelector('.js-menu__number-input').value;
		circleNumbers = parseInt(circleNumbers,10);
		let radius =  document.querySelector('.js-menu__size-input').value;
		radius = parseInt(radius,10);
		let speedBoost = 20;



		function randomNumber(number) {
			return Math.floor(Math.random()*(number + 1));
		}
		
		function Circle (x, y, dx, dy, radius) {
			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.radius = radius;

			//how it moves:
			this.update = function() {
				if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
					this.dx = -this.dx;
				} 
				this.x += this.dx;
			
				if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
					this.dy = -this.dy;
				} 
				this.y += this.dy
				this.draw();
			}

			this.draw = function() {
				c.beginPath();
				c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
	
				c.strokeStyle = '#' + randomNumber(hexMaxColor).toString(16);
				c.stroke();

				// c.fillStyle = 'white';
				// c.fill();
			}
		}
		
		const circleArray = [];
		for ( let i = 0; i < circleNumbers; i++ ){
			
			// problem » circles span at edges, solution:
			// "+ radius" » left & up sides fix
			let x = Math.random() * (innerWidth - radius*2)+ radius;
			let y = Math.random() * (innerHeight- radius*2) + radius;
			let dx = (Math.random() - 0.5) * speedBoost;
			let dy = (Math.random() - 0.5) * speedBoost;
			circleArray.push(new Circle(x,y,dx,dy,radius));
		}

		function animate() {
			requestAnimationFrame(animate); // here ∞ loop

			c.clearRect(0, 0, innerWidth, innerHeight);
			
			for ( let i = 0; i < circleArray.length; i++ ){ 
				circleArray[i].update();
			}
			// for ( let elem of circleArray){ 
			// 	circleArray[elem].update();
			// }
			// circleArray.forEach(function (elem) {
			// 	circleArray[elem].update();
			// });
			
		};
		animate();

	}
};

