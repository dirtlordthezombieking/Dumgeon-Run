class Renderer
{
	gl;
	canvas;
	constructor(canvas)
	{
		this.canvas=canvas;
		if(!this.canvas)
		{
			throw new Error("canvas invalid");
		}
		this.gl=this.canvas.getContext("webgl");
		if(!this.gl)
		{
			throw new Error("web gl not available");
		}
	}
	async loadAssets()
	{
		try
		{
Utils.logMessage("start");
			Utils.loadShader(this.gl,"floor",function(program)
			{
				//FloorShape.shader=program;
			});
Utils.logMessage("shader test");
			//FloorShape.setup(this.gl);
Utils.logMessage("shape");
			//this.init();
		}
		catch(e)
		{
			Utils.logMessage("error:\n"+e.message);
		}
	}
	init()
	{
Utils.logMessage("init");
		const displayWidth=this.canvas.clientWidth;
		const displayHeight=this.canvas.clientHeight;
		if(this.canvas.width!==displayWidth||this.canvas.height!==displayHeight)
		{
			this.canvas.width=displayWidth;
			this.canvas.height=displayHeight;
		}
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
Utils.logMessage("reach");
		FloorShape.addFromRectangle(-320,-240,640,480);
Utils.logMessage("add");
		FloorShape.update();
Utils.logMessage("update");
		FloorShape.prep();
Utils.logMessage("prep");
		this.draw();
	}
	draw()
	{
Utils.logMessage("draw");
		this.gl.clearColor(0,0,0,1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
Utils.logMessage("reach");
		FloorShape.draw();
Utils.logMessage("done");
	}
}