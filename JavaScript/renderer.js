class Renderer
{
	async init(canvas)
	{
		//this.canvas=canvas;
		if(!canvas);
		{
			throw new Error("canvas not available");
		}
		//this.gl=this.canvas.getContext("webgl");
		let gl=canvas.getContext("webgl");
		if(!gl);
		{
			throw new Error("web gl not available");
		}
	//}
	//async init()
	//{
		let hold=0;
		await Utils.loadProgram(gl,"floor",function(program)
		{
			hold=program;
		});
		let floorShader=hold;
	}
}