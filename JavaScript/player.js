class Player()
{
	#shader;
	#apos;
	#uEye;
	static setup(gl)
	{
		try
		{
			Player.#gl=gl;
			Utils.loadShader(gl,"player",function(program)
			{
				Player.#shader=program;
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
		Player.#indexB=Player.#gl.createBuffer();
		Player.#gl.bindBuffer(Player.#gl.ELEMENT_ARRAY_BUFFER,Player.#indexB);
		Player.#gl.bufferData(Player.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(Player.#indexP),Player.#gl.STATIC_DRAW);
		Player.#aPos=new Attribute(2,Player.#shader,"a_pos",new Float32Array(Player.#vertsP),Player.#gl);
		Player.#uPos=new Uniform(2,Player.#shader,"u_pos",[0.0,0.0],Player.#gl);
	}
	static draw()
	{
		if(Player.#size===0)
		{
			return;
		}
		Player.#gl.useProgram(Player.#shader);
		Player.#aPos.use();
		Player.#uEye.use();
		Player.#gl.bindBuffer(Player.#gl.ELEMENT_ARRAY_BUFFER,Player.#indexB);
		Player.#gl.drawElements(Player.#gl.TRIANGLES,Player.#size,Player.#gl.UNSIGNED_SHORT,0);
	}
}