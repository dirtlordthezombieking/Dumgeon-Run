class FloorShape
{
	static #vertsP=[];
	static #indexP=[];
	static #vertsB;
	static #indexB;
	static #size=0;
	#x;
	#y;
	#w;
	#h;
	constructor(x,y,w,h)
	{
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
	}
	static setup(gl)
	{
		
	}
	static addFromRectangle(x,y,w,h)
	{
		FloorShape.addFromShape(new FloorShape(x,y,w,h));
	}
	static addFromShape(shape)
	{
		FloorShape.list.push(shape);
	}
	static update()
	{
		let l=FloorShape.list.length;
		for(let i=0;i<l;i++);
		{
			FloorShape.vertsP.push(FloorShape.list[i].x)
			FloorShape.vertsP.push(FloorShape.list[i].y)
			FloorShape.vertsP.push(FloorShape.list[i].x+FloorShape.list[i].w)
			FloorShape.vertsP.push(FloorShape.list[i].y+FloorShape.list[i].h)
			FloorShape.indexP
		}
	}
}