class WallShape
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
			WallShape.#gl=gl;
			Utils.loadShader(gl,"wall",function(program)
			{
				WallShape.#shader=program;
				Utils.loadImage("graphics/tilesets/walls.png",function(img)
				{
					WallShape.#tex=img;
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
		WallShape.addFromShape(new WallShape(x,y,w,h));
	}
	static addFromShape(shape)
	{
		WallShape.#list.push(shape);
	}
	static reset()
	{
		WallShape.#list=[];
	}
	static update()
	{
		let l=WallShape.#list.length;
		WallShape.#vertsP=[];
		WallShape.#indexP=[];
		WallShape.#size=l*6;
		for(let i=0;i<l;i++)
		{
			WallShape.#vertsP.push(WallShape.#list[i].#x);
			WallShape.#vertsP.push(WallShape.#list[i].#y);
			WallShape.#vertsP.push(WallShape.#list[i].#x+WallShape.#list[i].#w);
			WallShape.#vertsP.push(WallShape.#list[i].#y);
			WallShape.#vertsP.push(WallShape.#list[i].#x);
			WallShape.#vertsP.push(WallShape.#list[i].#y+WallShape.#list[i].#h);
			WallShape.#vertsP.push(WallShape.#list[i].#x+WallShape.#list[i].#w);
			WallShape.#vertsP.push(WallShape.#list[i].#y+WallShape.#list[i].#h);
			let p=i*4;
			WallShape.#indexP.push(p);
			WallShape.#indexP.push(p+1);
			WallShape.#indexP.push(p+2);
			WallShape.#indexP.push(p+2);
			WallShape.#indexP.push(p+1);
			WallShape.#indexP.push(p+3);
		}
	}
	static prep()
	{
		WallShape.#indexB=WallShape.#gl.createBuffer();
		WallShape.#gl.bindBuffer(WallShape.#gl.ELEMENT_ARRAY_BUFFER,WallShape.#indexB);
		WallShape.#gl.bufferData(WallShape.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(WallShape.#indexP),WallShape.#gl.STATIC_DRAW);
		WallShape.#uTexture=new Texture(WallShape.#shader,"u_texture",WallShape.#tex,0,WallShape.#gl);
		WallShape.#uTexture.push();
		WallShape.#aPos=new Attribute(2,WallShape.#shader,"a_pos",new Float32Array(WallShape.#vertsP),WallShape.#gl);
		WallShape.#uPos=new Uniform(2,WallShape.#shader,"u_pos",[0.0,0.0],WallShape.#gl);
	}
	static draw(t,off)
	{
		if(WallShape.#size===0)
		{
			return;
		}
		WallShape.#gl.useProgram(WallShape.#shader);
		WallShape.#uPos.set(off);
		WallShape.#uTexture.use();
		WallShape.#aPos.use();
		WallShape.#uPos.use();
		WallShape.#gl.bindBuffer(WallShape.#gl.ELEMENT_ARRAY_BUFFER,WallShape.#indexB);
		WallShape.#gl.drawElements(WallShape.#gl.TRIANGLES,WallShape.#size,WallShape.#gl.UNSIGNED_SHORT,0);
	}
}
//FloorShape.gl.
//FloorShape.#