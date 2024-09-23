class FloorShape
{
	static #list=[];
	static #vertsP=[];
	static #indexP=[];
	static #vertsL;
	static #indexL;
	static #vertsB;
	static #indexB;
	static #size=0;
	static #gl;
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
		FloorShape.gl=gl;
	}
	static addFromRectangle(x,y,w,h)
	{
		FloorShape.addFromShape(new FloorShape(x,y,w,h));
	}
	static addFromShape(shape)
	{
		FloorShape.list.push(shape);
	}
	static reset()
	{
		FloorShape.list=[];
	}
	static update()
	{
		let l=FloorShape.list.length;
		FloorShape.vertsP=[];
		FloorShape.indexP=[];
		for(let i=0;i<l;i++);
		{
			FloorShape.vertsP.push(FloorShape.list[i].x);
			FloorShape.vertsP.push(FloorShape.list[i].y);
			FloorShape.vertsP.push(FloorShape.list[i].x+FloorShape.list[i].w);
			FloorShape.vertsP.push(FloorShape.list[i].y);
			FloorShape.vertsP.push(FloorShape.list[i].x);
			FloorShape.vertsP.push(FloorShape.list[i].y+FloorShape.list[i].h);
			FloorShape.vertsP.push(FloorShape.list[i].x+FloorShape.list[i].w);
			FloorShape.vertsP.push(FloorShape.list[i].y+FloorShape.list[i].h);
			let p=i*4;
			FloorShape.indexP.push(p);
			FloorShape.indexP.push(p+1);
			FloorShape.indexP.push(p+2);
			FloorShape.indexP.push(p+2);
			FloorShape.indexP.push(p+1);
			FloorShape.indexP.push(p+3);
		}
	}
	static prep()
	{
		FloorShape.vertsB=FloorShape.gl.createBuffer();
			FloorShape.gl.bindBuffer(FloorShape.gl.ELEMENT_ARRAY_BUFFER,indexB);
		FloorShape.gl.bufferData(FloorShape.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indexA),FloorShape.gl.STATIC_DRAW
);
	}
	static Draw()
}
//FloorShape.gl.