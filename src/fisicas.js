export default function gravity(obj, dt){
	let d = obj.ctx.y - (obj.position.y + obj.height); //distancia entre el objeto y el suelo
	let g = d > 0 ? 3 : 0;//si existe distacia existe atraccions
	let currentG = g > 0 ? obj.prevG + g : 0;//la atraccion es acumulativa
	if (d > 0) obj.position.y += (currentG * obj.mass) / dt;//se aplica a la posicion solo cuando existe distancia
	obj.prevG = currentG;//guradamos la atreccion actual
}