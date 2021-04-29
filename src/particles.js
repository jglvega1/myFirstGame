class Particle {
	constructor (x, y, uid) {
		this.id = `particle-${Date.now()}-${uid}-${Math.random()}`
		this.position = {x:x, y:y};
		this.height = 10;
		this.width = 10;
		this.hue = Math.floor(Math.random() * (270 - 90) + 90);
		this.coalitionZone = function () {
			this.hue > 270? this.hue = 90 : this.hue+=10;
		}
		this.coalition = function () {
			let filtered = []
			for(let particle of window.particles){
				if (particle.id != this.id) {
					filtered.push(particle)
				}
			}
			window.score += 1;
			window.particles = filtered;
		}
	}
}

export default class Particles {
	constructor (w,h) {
		this.density = Math.floor(Math.random() * (20 - 5) + 5);
		window.particles = [];
		this.ctx = {x:w,y:h};
	}
	update () {
		if ((score > 0) && (this.density < 100)) {
			this.density += Math.floor(score / 5)
		}
		while(window.particles.length < this.density){
			let maxX = this.ctx.x - 30;
			let maxY = (this.ctx.y - 30) - 50;
			let x = Math.floor(Math.random() * (maxX - 0) +0);
			let y = Math.floor(Math.random() * (maxY - 300) + 300);
			let n = new Particle(x,y, window.particles.length+1);
			window.coalitionAppend(n)
			window.particles.push(n)
		}
	}
	draw (ctx) {
		for(let p of window.particles){
			ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`
			ctx.fillRect(p.position.x, p.position.y, p.width, p.height)
		}
		ctx.font = "12px Arial";
		ctx.fillStyle = "hsl(0,0%,100%)"
		ctx.fillText(`density:${this.density}`, 0, 46);
	}
}