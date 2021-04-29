function inRange (ap, as, bp, bs){
	//ap >= bp
	//ap + as >= bp
	//ap <= bp + bs
	if ((ap + as >= bp) && (ap <= bp + bs)) {
		return true;
	}
	return false;
}

export default class Coalition {
	constructor (h,w) {
		window.coalitionSubs = {
			top:{
				left:[],
				right:[]
			},
			buttom:{
				left:[],
				right:[]
			}
		};
		window.coalitionAppend = function (obj){
			let y = obj.position.y > (h/2)? "buttom" : "top";
			let x = obj.position.x > (w/2)? "left" : "right";
			window.coalitionSubs[y][x].push(obj);
		}
	}
	detect (obj,h,w) {
		let y = obj.position.y > (h/2)? "buttom" : "top";
		let x = obj.position.x > (w/2)? "left" : "right";
		let subs = window.coalitionSubs[y][x];
		if ((obj.position.x <= (w/2)) && (obj.position.x + obj.width >= (w/2))) {
			let opsite = x == "right"? "left": "right";
			subs = subs.concat(window.coalitionSubs[y][opsite]);
		}
		if (subs.length > 0) {
			for (let sub of subs) {
				sub.coalitionZone();
				if (inRange(sub.position.y, sub.height, obj.position.y, obj.height)) {
					if (inRange(sub.position.x, sub.width, obj.position.x, obj.width)) {
						sub.coalition();
					}
				}
			}
		}
	}
}