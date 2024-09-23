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
			let hold=this;
			FloorShape.setup(this.gl,function()
			{
				WallShape.setup(hold.gl,function()
				{
					hold.init();
				});
			});
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
		FloorShape.addFromRectangle(-320,-240,260,480);
		FloorShape.addFromRectangle(  60,-240,260,480);
		FloorShape.addFromRectangle( -60,  60,120,180);
		FloorShape.addFromRectangle( -60,-240,120,180);
		FloorShape.update();
		FloorShape.prep();
		WallShape.addFromRectangle( -60, -60,  5,120);
		WallShape.addFromRectangle(  55, -60,  5,120);
		WallShape.addFromRectangle( -55, -60,110,  5);
		WallShape.addFromRectangle( -55,  55,110,  5);
		WallShape.update();
		WallShape.prep();
		this.draw();
	}
	draw()
	{
		this.gl.clearColor(0,0,0,1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		FloorShape.draw();
		WallShape.draw();
	}
}