class Player()
{
	#shader;
	#apos;
	#u_eye;
	static setup(gl)
	{
		try
		{
			OverhangShape.#gl=gl;
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
		FloorShape.#indexB=FloorShape.#gl.createBuffer();
		FloorShape.#gl.bindBuffer(FloorShape.#gl.ELEMENT_ARRAY_BUFFER,FloorShape.#indexB);
		FloorShape.#gl.bufferData(FloorShape.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(FloorShape.#indexP),FloorShape.#gl.STATIC_DRAW);
		FloorShape.#uTexture=new Texture(FloorShape.#shader,"u_texture",FloorShape.#tex,0,FloorShape.#gl);
		FloorShape.#uTexture.push();
		FloorShape.#aPos=new Attribute(2,FloorShape.#shader,"a_pos",new Float32Array(FloorShape.#vertsP),FloorShape.#gl);
		FloorShape.#uPos=new Uniform(2,FloorShape.#shader,"u_pos",[0.0,0.0],FloorShape.#gl);
	}
	static draw()
	{
		if(FloorShape.#size===0)
		{
			return;
		}
		FloorShape.#gl.useProgram(FloorShape.#shader);
		FloorShape.#uTexture.use();
		FloorShape.#aPos.use();
		FloorShape.#uPos.use();
		FloorShape.#gl.bindBuffer(FloorShape.#gl.ELEMENT_ARRAY_BUFFER,FloorShape.#indexB);
		FloorShape.#gl.drawElements(FloorShape.#gl.TRIANGLES,FloorShape.#size,FloorShape.#gl.UNSIGNED_SHORT,0);
	}
}