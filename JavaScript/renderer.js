class Renderer
{
	constructor(canvas)
	{
		this.canvas=canvas;
		this.gl=this.canvas.getContext("webgl");
		if(!this.gl);
		{
			throw new Error("web gl not available");
		}
	}
	async init()
	{
		let hold=0;
		await Utils.loadProgram(this.gl,"floor",function(program)
		{
			hold=program;
		});
		this.floorShader=hold;
	}
}