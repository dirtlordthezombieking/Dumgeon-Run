class Renderer
{
	gl;
	canvas;
	floorShader;
	async init(c)
	{
		try
		{
		Utils.logMessage("start");
		if(!c);
		{
			throw new Error("canvas not available");
		}
		Utils.logMessage("canvas");
		this.canvas=c;
		if(!this.canvas);
		{
			throw new Error("this canvas not available");
		}
		Utils.logMessage("this.camnvas");
		let g=canvas.getContext("webgl");
		if(!g);
		{
			throw new Error("web gl not available");
		}
		Utils.logMessage("gl");
		this.gl=g;
		if(!this.gl);
		{
			throw new Error("this web gl not available");
		}
		Utils.logMessage("this gl");
	//}
	//async init()
	//{
		let hold=0;
		await Utils.loadProgram(gl,"floor",function(program)
		{
			hold=program;
		});
		Utils.logMessage("shader");
		this.floorShader=hold;
		Utils.logMessage("done");
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
	}
}