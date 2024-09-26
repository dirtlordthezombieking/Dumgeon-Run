class Minimap
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
			Minimap.#gl=gl;
			Utils.loadShader(gl,"boxes",function(program)
			{
				Minimap.#shader=program;
				onDone();
			});
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
	}
	static set(rooms,halls)
	{
		Minimap.#uTexture=Minimap.gl.createTexture();
	}
	static addFromRectangle(x,y,w,h)
	{
		Minimap.addFromShape(new Minimap(x,y,w,h));
	}
	static addFromShape(shape)
	{
		Minimap.#list.push(shape);
	}
	static reset()
	{
		Minimap.#list=[];
		if(Minimap.#aPos)
		{
			Minimap.#aPos.clear;
			Minimap.#aPos=null;
		}
		if(Minimap.#indexB)
		{
			Minimap.#gl.deleteBuffer(Minimap.#indexB);
			Minimap.#indexB=null;
		}
	}
	static update()
	{
		let l=Minimap.#list.length;
		Minimap.#vertsP=[];
		Minimap.#indexP=[];
		Minimap.#size=l*6;
		for(let i=0;i<l;i++)
		{
			Minimap.#vertsP.push(Minimap.#list[i].#x);
			Minimap.#vertsP.push(Minimap.#list[i].#y);
			Minimap.#vertsP.push(Minimap.#list[i].#x+Minimap.#list[i].#w);
			Minimap.#vertsP.push(Minimap.#list[i].#y);
			Minimap.#vertsP.push(Minimap.#list[i].#x);
			Minimap.#vertsP.push(Minimap.#list[i].#y+Minimap.#list[i].#h);
			Minimap.#vertsP.push(Minimap.#list[i].#x+Minimap.#list[i].#w);
			Minimap.#vertsP.push(Minimap.#list[i].#y+Minimap.#list[i].#h);
			let p=i*4;
			Minimap.#indexP.push(p);
			Minimap.#indexP.push(p+1);
			Minimap.#indexP.push(p+2);
			Minimap.#indexP.push(p+2);
			Minimap.#indexP.push(p+1);
			Minimap.#indexP.push(p+3);
		}
	}
	static refresh()
	{
		if(Minimap.#aPos)
		{
			Minimap.#aPos.set(new Float32Array(Minimap.#vertsP))
		}
	}
	static prep()
	{
		Minimap.#indexB=Minimap.#gl.createBuffer();
		Minimap.#gl.bindBuffer(Minimap.#gl.ELEMENT_ARRAY_BUFFER,Minimap.#indexB);
		Minimap.#gl.bufferData(Minimap.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(Minimap.#indexP),Minimap.#gl.STATIC_DRAW);
		Minimap.#uTexture=new Texture(Minimap.#shader,"u_texture",Minimap.#tex,0,Minimap.#gl);
		Minimap.#uTexture.push();
		Minimap.#aPos=new Attribute(2,Minimap.#shader,"a_pos",new Float32Array(Minimap.#vertsP),Minimap.#gl);
	}
	static draw(t,off)
	{
		if(FloorShape.#size===0)
		{
			return;
		}
		Minimap.#gl.useProgram(Minimap.#shader);
		Minimap.#uPos.set(off);
		Minimap.#uTexture.use();
		Minimap.#aPos.use();
		Minimap.#gl.bindBuffer(Minimap.#gl.ELEMENT_ARRAY_BUFFER,Minimap.#indexB);
		Minimap.#gl.drawElements(Minimap.#gl.TRIANGLES,Minimap.#size,Minimap.#gl.UNSIGNED_SHORT,0);
	}
}