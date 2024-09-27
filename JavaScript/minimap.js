class Minimap
{
	static #list=[];
	static #vertsP=[];
	static #indexP=[];
	static #used=[];
	static #indexB;
	static #size=0;
	static #gl;
	static #shader;
	static #genshader;
	static #tex;
	static #uTexture;
	static #aPos;
	static #boxes;
	static #fBuff
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
			Utils.loadShader(gl,"minimap",function(genprogram)
			{
				Minimap.#genshader=genprogram;
				Utils.loadShader(gl,"minimapdraw",function(program)
				{
					Minimap.#shader=program;
					onDone();
				});
			});
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
	}
	static set(rooms,halls)
	{
		Minimap.#boxes=rooms.concat(halls);
		Minimap.#uTexture=Minimap.gl.createTexture();
		Minimap.#gl.bindTexture(Minimap.#gl.TEXTURE_2D,#uTexture);
		Minimap.#gl.texImage2D(Minimap.#gl.TEXTURE_2D,0,Minimap.#gl.RGBA,150,150,0,Minimap.#gl.RGBA,Minimap.#gl.UNSIGNED_BYTE,null);
		Minimap.#gl.texParameteri(Minimap.#gl.TEXTURE_2D,Minimap.#gl.TEXTURE_MIN_FILTER,Minimap.#gl.nearest);
		Minimap.#gl.texParameteri(Minimap.#gl.TEXTURE_2D,Minimap.#gl.TEXTURE_WRAP_S,Minimap.#gl.CLAMP_TO_EDGE);
		Minimap.#gl.texParameteri(Minimap.#gl.TEXTURE_2D,Minimap.#gl.TEXTURE_WRAP_T,Minimap.#gl.CLAMP_TO_EDGE);
		Minimap.#gl.bindFramebuffer(Minimap.#gl.FRAMEBUFFER,fBuff);
		let colourAtt=Minimap.#gl.COLOR_ATTACHMENT0
		Minimap.#gl.framebufferTexture2D(Minimap.#gl.FRAMEBUFFER,colourAtt,Minimap.#gl.TEXTURE_2D,Minimap.#uTexture,0);
		let l=Minimap.#boxes.length[]
		Minimap.#gl.useProgram(Minimap.#genshader)
		Minimap.#gl.viewport(0,0,150,150);
		Minimap.#gl.clearColor(0.5,0.5,0.5,1);
		Minimap.#gl.clear(Minimap.#gl.COLOR_BUFFER_BIT
		let uColour=new Uniform(4,Minimap.#genshader,"u_pos",[0,0,0,0.75],Minimap.#gl);
		for(let i=0,i<l;i++)
		{
			used.push(false);
			addFromRectangle(
		}
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
			Minimap.#aPos.clear();
			//Minimap.#aPos=null;
		}
		if(Minimap.#indexB)
		{
			Minimap.#gl.deleteBuffer(Minimap.#indexB);
			Minimap.#indexB=null;
		}
		if(Minimap.#fBuff)
		{
			Minimap.#gl.deleteBuffer(Minimap.#fBuff);
			Minimap.#fBuff=null;
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
		Minimap.#fBuff=Minimap.#gl.createFramebuffer();
		if(Minimap.#aPos)
		{
			Minimap.#aPos.set(new Float32Array(Minimap.#vertsP))
		}
		Minimap.#indexB=Minimap.#gl.createBuffer();
		Minimap.#gl.bindBuffer(Minimap.#gl.ELEMENT_ARRAY_BUFFER,Minimap.#indexB);
		Minimap.#gl.bufferData(Minimap.#gl.ELEMENT_ARRAY_BUFFER,new
Uint16Array(Minimap.#indexP),Minimap.#gl.STATIC_DRAW);
	}
	static prep()
	{
					Minimap.#aPos=new Attribute(2,Minimap.#shader,"a_pos",new Float32Array(Minimap.#vertsP),Minimap.#gl);
		Minimap.#uTexture=new Texture(Minimap.#shader,"u_texture",Minimap.#tex,0,Minimap.#gl);
		Minimap.#uTexture.push();
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