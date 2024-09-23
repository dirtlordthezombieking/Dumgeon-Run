class Renderer
{
	gl;
	canvas;
	floor;
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
	loadAssets()
	{
		try
		{
			this.floor=new Floor();
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
		FloorShape.addFromRectangle(-320,-240,250,480);
		FloorShape.addFromRectangle(  70,-240,250,480);
		FloorShape.addFromRectangle( -70,  70,140,170);
		FloorShape.addFromRectangle( -70,-240,140,170);
		floor.use();
		FloorShape.update();
		FloorShape.prep();
		WallShape.addFromRectangle( -70, -70, 15,140);
		WallShape.addFromRectangle(  55, -70, 15,140);
		WallShape.addFromRectangle( -55, -70,110, 15);
		WallShape.addFromRectangle( -55,  55,110, 15);
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