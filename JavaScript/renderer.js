class Renderer
{
	gl;
	canvas;
	floor;
	frameTime;
	errframes=0;
	pos;
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
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
		this.floor.use();
		FloorShape.update();
		FloorShape.prep();
		WallShape.update();
		WallShape.prep();
		Player.prep()
		OverhangShape.update();
		OverhangShape.prep();
		this.frameTime=performance.now();
		//Utils.logMessage("time: "+this.frameTime);
		this.pos=this.floor.getPos();
		//Utils.logMessage("inpos: "+this.pos[0]+", "+this.pos[1]);
		let tis=this;
		requestAnimationFrame(function(ts){tis.draw(ts);});
		this.canvas.requestFullscreen();
	}
	fullscreen()
	{
		this.canvas.requestFullscreen();
	}
	draw(t)
	{
		let d=t-this.frameTime;
		this.frameTime=performance.now();
		//Utils.logMessage("drawpos: "+this.pos[0]+", "+this.pos[1]);
		try
		{
			this.gl.clearColor(0,0,0,1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			FloorShape.draw(d,this.pos);
			WallShape.draw(d,this.pos);
			Player.draw(d);
			OverhangShape.draw(d,this.pos);
			this.errframes=0
		}
		catch(e)
		{
			this.errframes++;
			Utils.logMessage("error:\n"+e.message);
		}
		try
		{
			//this.gl.flush();
			//this.gl.bindVertexArray(null);
			if(this.errframes>30)
			{
				Utils.logMessage("Too many consecutive draw errors, stopping render loop.");
			}
			else
			{
				let tis=this;
				requestAnimationFrame(function(ts){tis.draw(ts);});
			}
		}
		catch(e)
		{
			this.errframes++;
			Utils.logMessage("error:\n"+e.message);
		}
	}
}