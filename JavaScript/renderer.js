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
		this.gl=this.canvas.getContext("webgl",{premultipliedAlpha:false});
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
					OverhangShape.setup(hold.gl,function()
					{
						FloorShape.reset();
						WallShape.reset();
						OverhangShape.reset();
						hold.init();
					});
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
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
		//FloorShape.addFromRectangle(-640,-480,500,960);
		//FloorShape.addFromRectangle( 140,-480,500,960);
		//FloorShape.addFromRectangle(-140, 140,280,340);
		//FloorShape.addFromRectangle(-140,-480,280,340);
		this.floor.use();
		FloorShape.update();
		FloorShape.prep();
		//WallShape.addFromRectangle(-140,-140, 30,280);
		//WallShape.addFromRectangle( 110,-140, 30,280);
		//WallShape.addFromRectangle(-110,-140,220, 30);
		//WallShape.addFromRectangle(-110, 120,220, 30);
		WallShape.update();
		WallShape.prep();
		OverhangShape.update();
		OverhangShape.prep();
		this.draw();
	}
	draw()
	{
		this.gl.clearColor(1,0,1,1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
		FloorShape.draw();
		//WallShape.draw();
		OverhangShape.draw();
	}
}