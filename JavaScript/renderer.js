class Renderer
{
	gl;
	canvas;
	floorShader;
	async init(canvas)
	{
		Utils.logMessage("start");
		if(!canvas);
		{
			throw new Error("canvas not available");
		}
		Utils.logMessage("canvas");
		this.canvas=canvas;
		if(!this.canvas);
		{
			throw new Error("this canvas not available");
		}
		Utils.logMessage("this.camnvas");
		let gl=canvas.getContext("webgl");
		if(!gl);
		{
			throw new Error("web gl not available");
		}
		Utils.logMessage("gl");
		this.gl=gl;
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
}