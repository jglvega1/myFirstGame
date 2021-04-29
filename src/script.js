import Character from './character.js';
import Particles from './particles.js';
import Coalition from './coalition.js';

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


let canvas = document.createElement('canvas');
let ctx =  canvas.getContext('2d');
const height = vh - 20;
const width = vw - 20; 
canvas.height = height;
canvas.width = width;
document.getElementsByTagName('body')[0].appendChild(canvas);

let lastTime = 0;

let coalition = new Coalition(height, width);

let charact = new Character(height, width);
charact.events()

let particles = new Particles(width, height);
particles.update();

function gameLoop(timeStamp) {
	//timeing
	let dt = timeStamp - lastTime;
	lastTime = timeStamp;
	//clear
		ctx.clearRect(0,0,width,height)
	//update
		charact.update(dt)
		coalition.detect(charact, height, width)
		particles.update();
	//draw
		charact.draw(ctx);
		particles.draw(ctx);

	//next frame calling
	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);