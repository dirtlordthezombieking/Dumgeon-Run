class Renderer
{
	gl;
	canvas;
	floorShader;
	async init(canvas)
	{
		if(!canvas);
		{
			throw new Error("canvas not available");
		}
		this.canvas=canvas;
		if(!this.canvas);
		{
			throw new Error("this canvas not available");
		}
		let gl=canvas.getContext("webgl");
		if(!gl);
		{
			throw new Error("web gl not available");
		}
		this.gl=gl;
		if(!this.gl);
		{
			throw new Error("this web gl not available");
		}
	//}
	//async init()
	//{
		let hold=0;
		await Utils.loadProgram(gl,"floor",function(program)
		{
			hold=program;
		});
		this.floorShader=hold;
		Utils.logMessage("done");
	}
}