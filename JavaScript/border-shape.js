class BorderShape
{
	static #list=[];
	static #vertsP=[];
	static #indexP=[];
	static #indexB;
	static #size=0;
	static #gl;
	static #shader;
	static #aPos;
	static #uPos
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
			BorderShape.#gl=gl;
			Utils.loadShader(gl,"border",function(program)
			{
				BorderShape.#shader=program;
				onDone();
			});
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
	}
	static addFromRectangle(x,y,w,h)
	{
		BorderShape.addFromShape(new BorderShape(x,y,w,h));
	}
	static addFromShape(shape)
	{
		BorderShape.#list.push(shape);
	}
	static reset()
	{
		BorderShape.#list=[];
		if(BorderShape.#aPos)
		{
			BorderShape.#aPos.clear;
			BorderShape.#aPos=null;
		}
		if(Minimap.#indexB)
		{
			BorderShape.#gl.deleteBuffer(BorderShape.#indexB);
			BorderShape.#indexB=null;
		}
	}
	static update()
	{
		let l=BorderShape.#list.length;
		BorderShape.#vertsP=[];
		BorderShape.#indexP=[];
		BorderShape.#size=l*6;
		for(let i=0;i<l;i++)
		{
			BorderShape.#vertsP.push(BorderShape.#list[i].#x);
			BorderShape.#vertsP.push(BorderShape.#list[i].#y);
			BorderShape.#vertsP.push(BorderShape.#list[i].#x+BorderShape.#list[i].#w);
			BorderShape.#vertsP.push(BorderShape.#list[i].#y);
			BorderShape.#vertsP.push(BorderShape.#list[i].#x);
			BorderShape.#vertsP.push(BorderShape.#list[i].#y+BorderShape.#list[i].#h);
			BorderShape.#vertsP.push(BorderShape.#list[i].#x+BorderShape.#list[i].#w);
			BorderShape.#vertsP.push(BorderShape.#list[i].#y+BorderShape.#list[i].#h);
			let p=i*4;
			BorderShape.#indexP.push(p);
			BorderShape.#indexP.push(p+1);
			BorderShape.#indexP.push(p+2);
			BorderShape.#indexP.push(p+2);
			BorderShape.#indexP.push(p+1);
			BorderShape.#indexP.push(p+3);
		}
	}
	static prep()
	{
		BorderShape.#indexB=BorderShape.#gl.createBuffer();
		BorderShape.#gl.bindBuffer(BorderShape.#gl.ELEMENT_ARRAY_BUFFER,BorderShape.#indexB);
		BorderShape.#gl.bufferData(BorderShape.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(BorderShape.#indexP),BorderShape.#gl.STATIC_DRAW);
		BorderShape.#aPos=new Attribute(2,BorderShape.#shader,"a_pos",new Float32Array(BorderShape.#vertsP),BorderShape.#gl);
		BorderShape.#uPos=new Uniform(2,BorderShape.#shader,"u_pos",[0.0,0.0],BorderShape.#gl);
	}
	static draw(t,off)
	{
		if(BorderShape.#size===0)
		{
			return;
		}
		BorderShape.#gl.useProgram(BorderShape.#shader);
		BorderShape.#uPos.set(off);
		BorderShape.#aPos.use();
		BorderShape.#uPos.use();
		BorderShape.#gl.bindBuffer(BorderShape.#gl.ELEMENT_ARRAY_BUFFER,BorderShape.#indexB);
		BorderShape.#gl.drawElements(BorderShape.#gl.TRIANGLES,BorderShape.#size,BorderShape.#gl.UNSIGNED_SHORT,0);
	}
}