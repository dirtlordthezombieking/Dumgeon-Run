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
	static #shader;
	static #tex;
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
	static async setup(gl)
	{
		try
		{
			FloorShape.gl=gl;
			let hold=0
			await Utils.loadShader(gl,"floor",function(program)
			{
				FloorShape.shader=program;
			});
			Utils.loadImage("graphics/tilesets/floors.png",function(img)
			{
				FloorShape.tex=img;
				hold=10;
			});
			while(hold<5)
			{}
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
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
		FloorShape.size=l*6;
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
	{


	FloorShape.gl.bindBuffer(FloorShape.gl.ELEMENT_ARRAY_BUFFER,indexB);	FloorShape.gl.drawElements(FloorShape.gl.TRIANGLES,size,FloorShape.gl.UNSIGNED_SHORT,0);
	}
}
//FloorShape.gl.
//FloorShape.