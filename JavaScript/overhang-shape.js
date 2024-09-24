class OverhangShape
{
	static #list=[];
	static #vertsP=[];
	static #indexP=[];
	static #indexB;
	static #size=0;
	static #gl;
	static #shader;
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
			OverhangShape.#gl=gl;
			Utils.loadShader(gl,"overhang",function(program)
			{
				OverhangShape.#shader=program;
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
		OverhangShape.addFromShape(new OverhangShape(x,y,w,h));
	}
	static addFromShape(shape)
	{
		OverhangShape.#list.push(shape);
	}
	static reset()
	{
		OverhangShape.#list=[];
	}
	static update()
	{
		let l=OverhangShape.#list.length;
		OverhangShape.#vertsP=[];
		OverhangShape.#indexP=[];
		OverhangShape.#size=l*6;
		for(let i=0;i<l;i++)
		{
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#x);
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#y);
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#x+OverhangShape.#list[i].#w);
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#y);
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#x);
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#y+OverhangShape.#list[i].#h);
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#x+OverhangShape.#list[i].#w);
			OverhangShape.#vertsP.push(OverhangShape.#list[i].#y+OverhangShape.#list[i].#h);
			let p=i*4;
			OverhangShape.#indexP.push(p);
			OverhangShape.#indexP.push(p+1);
			OverhangShape.#indexP.push(p+2);
			OverhangShape.#indexP.push(p+2);
			OverhangShape.#indexP.push(p+1);
			OverhangShape.#indexP.push(p+3);
		}
	}
	static prep()
	{
		OverhangShape.#indexB=OverhangShape.#gl.createBuffer();
		OverhangShape.#gl.bindBuffer(OverhangShape.#gl.ELEMENT_ARRAY_BUFFER,OverhangShape.#indexB);
		OverhangShape.#gl.bufferData(OverhangShape.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(OverhangShape.#indexP),OverhangShape.#gl.STATIC_DRAW);
		OverhangShape.#aPos=new Attribute(2,OverhangShape.#shader,"a_pos",new Float32Array(OverhangShape.#vertsP),OverhangShape.#gl);
		OverhangShape.#uPos=new Uniform(2,OverhangShape.#shader,"u_pos",[0.0,0.0],OverhangShape.#gl);
	}
	static draw()
	{
		if(OverhangShape.#size===0)
		{
			return;
		}
		OverhangShape.#gl.useProgram(OverhangShape.#shader);
		OverhangShape.#aPos.use();
		OverhangShape.#uPos.use();
		OverhangShape.#gl.bindBuffer(OverhangShape.#gl.ELEMENT_ARRAY_BUFFER,OverhangShape.#indexB);
		OverhangShape.#gl.drawElements(OverhangShape.#gl.TRIANGLES,OverhangShape.#size,OverhangShape.#gl.UNSIGNED_SHORT,0);
	}
}