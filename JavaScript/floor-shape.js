class FloorShape
{
	static #list=[];
	static #vertsP=[];
	static #indexP=[];
	static #indexB;
	static #size=0;
	static #gl;
	static #shader;
	static #tex;
	static #uTexture;
	static #aPos;
	static #uPos;
	#x;
	#y;
	#w;
	#h;
	constructor(x,y,w,h)
	{
		this.#x=x;
		this.#y=y;
		this.#w=w;
		this.#h=h;
	}
	static setup(gl,onDone)
	{
		try
		{
			FloorShape.#gl=gl;
			Utils.loadShader(gl,"floor",function(program)
			{
				FloorShape.#shader=program;
				Utils.loadImage("graphics/tilesets/floors2.png",function(img)
				{
					FloorShape.#tex=img;
					onDone();
				});
			});
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
		FloorShape.#list.push(shape);
	}
	static reset()
	{
		FloorShape.#list=[];
	}
	static update()
	{
		let l=FloorShape.#list.length;
		FloorShape.#vertsP=[];
		FloorShape.#indexP=[];
		FloorShape.#size=l*6;
		for(let i=0;i<l;i++)
		{
			FloorShape.#vertsP.push(FloorShape.#list[i].#x);
			FloorShape.#vertsP.push(FloorShape.#list[i].#y);
			FloorShape.#vertsP.push(FloorShape.#list[i].#x+FloorShape.#list[i].#w);
			FloorShape.#vertsP.push(FloorShape.#list[i].#y);
			FloorShape.#vertsP.push(FloorShape.#list[i].#x);
			FloorShape.#vertsP.push(FloorShape.#list[i].#y+FloorShape.#list[i].#h);
			FloorShape.#vertsP.push(FloorShape.#list[i].#x+FloorShape.#list[i].#w);
			FloorShape.#vertsP.push(FloorShape.#list[i].#y+FloorShape.#list[i].#h);
			let p=i*4;
			FloorShape.#indexP.push(p);
			FloorShape.#indexP.push(p+1);
			FloorShape.#indexP.push(p+2);
			FloorShape.#indexP.push(p+2);
			FloorShape.#indexP.push(p+1);
			FloorShape.#indexP.push(p+3);
		}
	}
	static prep()
	{
		FloorShape.#indexB=FloorShape.#gl.createBuffer();
		FloorShape.#gl.bindBuffer(FloorShape.#gl.ELEMENT_ARRAY_BUFFER,FloorShape.#indexB);
		FloorShape.#gl.bufferData(FloorShape.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(FloorShape.#indexP),FloorShape.#gl.STATIC_DRAW);
		FloorShape.#uTexture=new Texture(FloorShape.#shader,"u_texture",FloorShape.#tex,0,FloorShape.#gl);
		FloorShape.#uTexture.push();
		FloorShape.#aPos=new Attribute(2,FloorShape.#shader,"a_pos",new Float32Array(FloorShape.#vertsP),FloorShape.#gl);
		FloorShape.#uPos=new Uniform(2,FloorShape.#shader,"u_pos",[0.0,0.0],FloorShape.#gl);
	}
	static draw(t,off)
	{
		if(FloorShape.#size===0)
		{
			return;
		}
		FloorShape.#uPos.set(off);
		FloorShape.#gl.useProgram(FloorShape.#shader);
		FloorShape.#uTexture.use();
		FloorShape.#aPos.use();
		FloorShape.#uPos.use();
		FloorShape.#gl.bindBuffer(FloorShape.#gl.ELEMENT_ARRAY_BUFFER,FloorShape.#indexB);
		FloorShape.#gl.drawElements(FloorShape.#gl.TRIANGLES,FloorShape.#size,FloorShape.#gl.UNSIGNED_SHORT,0);
	}
}
//FloorShape.gl.
//FloorShape.#