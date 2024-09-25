class Renderer
{
	gl;
	canvas;
	floor;
	frameTime;
	errframes=0;
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
						Player.setup(hold.gl,function()
						{
							FloorShape.reset();
							WallShape.reset();
							OverhangShape.reset();
							hold.init();
						});
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
		//this.gl.enable(this.gl.DEPTH_TEST);
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
		Player.prep()
		OverhangShape.update();
		OverhangShape.prep();
		this.frameTime=Date.now();
		let tis=this;
		setTimeout(function(){tis.draw();},0);
	}
	draw()
	{
		try
		{
			this.gl.clearColor(0,0,0,1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);//|this.gl.DEPTH_BUFFER_BIT);
			FloorShape.draw();
			WallShape.draw();
			Player.draw();
			OverhangShape.draw();
			setTimeout(this.draw);
			let time=Date.now()-this.frameTime;
			this.errframes=0
		}
		catch(e)
		{
			this.errframes++;
			Utils.logMessage("error:\n"+e.message);
		}
		this.flush()
		if(this.errframes>30)
		{
			Utils.logMessage("Too many consecutive draw errors, stopping render loop.");
		}
		else
		{
			if(time>33)
			{
				time=33;
			}
			let tis=this;
			setTimeout(function(){tis.draw();},33-time);
		}
	}
}