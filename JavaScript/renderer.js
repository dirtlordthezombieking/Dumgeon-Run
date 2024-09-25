class Renderer
{
	gl;
	canvas;
	floor;
	frameTime;
	errframes=0;
	pos;
	arrowsPressed=[false,false,false,false,false,false,false,false];
	keyOrder=[0,1,2,3,4,5,6,7];
	keyTracker=[0,1,2,3,4,5,6,7]
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
							Back.setup(hold.gl,function()
							{
								BorderShape.setup(hold.gl,function()
								{
									FloorShape.reset();
									WallShape.reset();
									OverhangShape.reset();
									BorderShape.reset();
									hold.init();
								});
							});
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
		Player.prep();
		Back.prep();
		OverhangShape.update();
		OverhangShape.prep();
		BorderShape.update();
		BorderShape.prep();
		this.frameTime=performance.now();
		this.pos=this.floor.getPos();
		let tis=this;
		requestAnimationFrame(function(ts){tis.draw(ts);});
		this.canvas.requestFullscreen();
		document.onkeydown=this.keyDown;
		document.onkeyup=this.keyUp;
	}
	fullscreen()
	{
		this.canvas.requestFullscreen();
	}
	draw(t)
	{
		let d=t-this.frameTime;
		this.frameTime=performance.now();
		try
		{
			this.gl.clearColor(0,0,0,1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			Back.draw(d,this.pos);
			BorderShape.draw(d,this.pos);
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
	keyDown(e)
	{
		
	}
	keyUp(e)
	{
		switch(e.code)
		{
			case "KeyW":
			case "ArrowUp":
			case "KeyS":
			case "ArrowDown":
			case "KeyA":
			case "ArrowLeft":
			case "KeyD":
			case "ArrowRight":
		}
	}
	moveToBack(key)
	{
		let v=this.keyOrder[key];
		for(let i=0;i<8;i++)
		{
			if(this.keyOrder[i]>v)
			{
				this.keyOrder[i]--;
			}
		}
		this.keyOrder[key]=7;
		reorderKeys();
	}
	moveToFront(key)
	{
		let v=this.keyOrder[key];
		for(let i=0;i<8;i++)
		{
			if(this.keyOrder[i]<v)
			{
				this.keyOrder[i]++;
			}
		}
		this.keyOrder[key]=0;
		reorderKeys();
	}
	reorderKeys()
	{
		for(let i=0;i<8;i++)
		{
			this.keyTracker[this.keyOrder[i]]=i
		}
	}
}