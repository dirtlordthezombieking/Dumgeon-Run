class Renderer
{
	gl;
	canvas;
	floorShader;
	floorATexCoord;
	constructor(canvas)
	{
		this.canvas=canvas;
		if(!this.canvas)
		{
			throw new Error("canvas invalid");
		}
		this.gl=this.canvas.getContext("webgl");;
		if(!this.gl)
		{
			throw new Error("web gl not available");
		}
	}
	async load assets()
	{
		try
		{
			let hold=0;
			await Utils.loadShader(this.gl,"floor",function(program)
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
	init()
	{
		const displayWidth=this.canvas.clientWidth;
		const displayHeight=this.canvas.clientHeight;
		if(this.canvas.width!==displayWidth||this.canvas.height!==displayHeight)
	{
		this.canvas.width=displayWidth;
		this.canvas.height=displayHeight;
	}
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
	this.floorATexCoord=new Attribute(2,this.program,"a_texCoord",new Float32Array
		(
			[
				 0.0, 0.0,
				40.0, 0.0,
				 0.0,30.0,
				 0.0,30.0,
				40.0, 0.0,
				40.0,30.0
			]
		),this.gl);
	}
	draw()
	{
		this.gl.clearColor(0,0,0,a);
		this.gl.clear(this gl.COLOR_BUFFER_BIT);
	}
}