import gravity from './fisicas.js';

export default class Character {
	constructor(h, w){
		this.position = {x:((w-50)/2), y:h/3};//initial position
		this.speed = {x:0, y:0};//speed of movement
		this.prevG = 0;
		this.ctx = {x:w,y:h}//context vars
		this.mass = 1.5;
		this.height = 50;
		this.width = 50;
		this.color = Math.floor(Math.random() * 360);
		window.score = 0;
		this.key = {};
	}
	event(keyCode){
		let functions = {
			jump: (obj) => {//jump
				if ((obj.prevG == 0)) {
					obj.speed.y = -(obj.ctx.y)
				}
			},
			right: (obj) => {//right
				obj.speed.x < -100 ? obj.speed.x *= -1 : false
				obj.speed.x > 100 ? obj.speed.x += 50 : obj.speed.x = 100
			},
			left: (obj) => {//left
				obj.speed.x > 100 ? obj.speed.x *= -1 : false
				obj.speed.x < -100 ? obj.speed.x += -50 : obj.speed.x = -100
			}
		}

		let tragets = {
			32: functions.jump,
			38: functions.jump,
			100: functions.right,
			68: functions.right,
			39: functions.right,
			97: functions.left,
			65: functions.left,
			37: functions.left
		}
		return (tragets[keyCode]? tragets[keyCode]: (s) => {let e = window.e; console.log(window.e)});
	}
	events(){
		document.addEventListener('keydown', e => {
			e = e || window.e;
			this.key[e.keyCode] = true;//addi
			for(let key in this.key) {
				console.log(key)
				if (this.key[key]) {
					let strategy = this.event(key) || false;
					strategy(this)
				}
			}
		});
		document.addEventListener('keyup', e => {
			e = e || window.e;
			this.key[e.keyCode] = false;//deletes one item from index i
		});
	}
	update(dt){
		//gravity
		gravity(this, dt)
		//movements
		const speedY = Math.floor(this.speed.y / dt);
		this.position.y += speedY;
		if (this.position.y > (this.ctx.y- this.height)) {
			this.position.y = this.ctx.y - this.height;
			this.speed.y = speedY;
			this.prevG = 0;
		}
		this.speed.y -= speedY;
		if (this.speed.y > 0) {
			this.speed.y = 0;
		}

		const speedX = Math.floor(this.speed.x / dt);
		this.position.x += speedX;
		if (this.position.x > (this.ctx.x- this.height)) {
			this.position.x = this.ctx.x - this.height;
			this.speed.x= speedX;
		}
		if (this.position.x < 0) {
			this.position.x = 0;
			this.speed.x=speedX;
		}
		this.speed.x -= speedX;

		//color
		this.color = this.color == 360? 0: this.color += (2 * this.prevG) / dt;//cambia el hue en el color en funcion de la aceleracion gravitacional
	}
	draw(ctx){
		ctx.fillStyle = `hsl(${this.color},100%,50%)`;
		ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
		ctx.font = "12px Arial";
		ctx.fillStyle = "hsl(0,0%,100%)"
		ctx.fillText(`speedY:${this.speed.y}`, 0, 10);
		ctx.fillText(`speedX:${this.speed.x}`, 0, 22);
		ctx.fillText(`gravity:${this.prevG}`, 0, 34);
		ctx.fillText(`score:${score}`, 0, 58);
		ctx.fillText(`keylist:${JSON.stringify(this.key)}`, 0, 70);
	}
}