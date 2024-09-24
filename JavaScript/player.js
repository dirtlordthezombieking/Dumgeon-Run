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
}