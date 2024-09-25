class Player
{
	static #shader;
	static #aPos;
	static #uEye;
	static #gl;
	static #indexB;
	static #angle=0;
	static setup(gl,onDone)
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
		Player.#gl.bufferData(Player.#gl.ELEMENT_ARRAY_BUFFER,new Uint16Array
		(
			[
				0,1,2,
				2,1,3
			]
		),Player.#gl.STATIC_DRAW);
		Player.#aPos=new Attribute(2,Player.#shader,"a_pos",new Float32Array
		(
			[
				-32,-32,
				 32,-32,
				-32, 32,
				 32, 32
			]
		),Player.#gl);
		Player.#uEye=new Uniform(3,Player.#shader,"u_eye",[Math.PI,8.0,12.0],Player.#gl);
	}
	static draw()
	{
		//Player.#uEye.set([Player.#angle*Math.PI/180,8.0,12.0])
		Player.#gl.useProgram(Player.#shader);
		Player.#aPos.use();
		Player.#uEye.use();
		Player.#angle++;
		Player.#gl.bindBuffer(Player.#gl.ELEMENT_ARRAY_BUFFER,Player.#indexB);
		Player.#gl.drawElements(Player.#gl.TRIANGLES,6,Player.#gl.UNSIGNED_SHORT,0);
	}
}
//ss,es,se,ee
//0,1,2,2,1,3

//sin=o/h
//sin*h=o
//cos*h=a
//x=a
//y=o