class Back
{
	static #shader;
	static #aPos;
	static #uPos;
	static #gl;
	static #indexB;
	static #angle=0;
	static #time=0;
	static setup(gl,onDone)
	{
		try
		{
			Back.#gl=gl;
			Utils.loadShader(gl,"back",function(program)
			{
				Back.#shader=program;
				onDone();
			});
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
	}
	static prep()
	{
		Back.#indexB=Back.#gl.createBuffer();
		Back.#gl.bindBuffer(Back.#gl.ELEMENT_ARRAY_BUFFER,Back.#indexB);
		Back.#gl.bufferData(Back.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array
		(
			[
				0,1,2,
				2,1,3
			]
		),Back.#gl.STATIC_DRAW);
		Back.#aPos=new Attribute(2,Back.#shader,"a_pos",new Float32Array
		(
			[
				-2,-2,
				 2,-2,
				-2, 2,
				 2, 2
			]
		),Back.#gl);
		Back.#uPos=new Uniform(3,Back.#shader,"u_pos",[0.0,0.0,0.0],Back.#gl);
	}
	static draw(t,off)
	{
		Back.#gl.useProgram(Back.#shader);
		Back.#uPos.set([off[0],off[1],Back.#time);
		Back.#aPos.use();
		Back.#uPos.use();
		Back.#time+=t;
		Back.#gl.bindBuffer(Back.#gl.ELEMENT_ARRAY_BUFFER,Back.#indexB);
		Back.#gl.drawElements(Back.#gl.TRIANGLES,6,Back.#gl.UNSIGNED_SHORT,0);
	}
}