class Renderer
{
	gl;
	canvas;
	floorShader;
	constructor(canvas)
	{
		this.canvas=canvas;
		if(!this.canvas)
		{
			throw new Error("canvas invalid);
		}
		this.gl=this.canvas.getContext("webgl");;
		if(!this.gl)
		{
			throw new Error("web gl not available");
		}
	}
	async init()
	{
		try
		{
			let hold=0;
			await Utils.loadProgram(gl,"floor",function(program)
			{
				hold=program;
			});
			this.floorShader=hold;
			Utils.logMessage("done");
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
	}
}