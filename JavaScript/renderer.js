class Renderer
{
	gl;
	canvas;
	floor;
	frameTime;
	errframes=0;
	pos;
	action=-1;
	off=[0,0]
	actTime=0;
	activeKey=-1;
	arrowsPressed=[false,false,false,false,false,false,false,false];
	keyOrder=[0,1,2,3,4,5,6,7];
	keyTracker=[0,1,2,3,4,5,6,7]
	arrowAdd=[[0,1],[0,1],[0,-1],[0,-1],[-1,0],[-1,0],[1,0],[1,0]]
	angles[0,0,180,180,270,270,90,90];
	angle;
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
			if(this.actTime>0)
			{
				this.actTime-=d;
				this.act(d);
			}
			else
			{
				this.startAct();
				this.actTime=0;
			}
			let playPos=[this.pos[0]+this.off[0]+0.5,this.pos[1]+this.off[1]+0.5];
			this.gl.clearColor(0,0,0,1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			Back.draw(d,playPos);
			BorderShape.draw(d,playPos);
			FloorShape.draw(d,playPos);
			WallShape.draw(d,playPos);
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
	keyUp(e)
	{
		switch(e.code)
		{
			case "KeyW":
				this.moveToBack(0);
				this.arrowsPressed[0]=false;
				break;
			case "ArrowUp":
				this.moveToBack(1);
				this.arrowsPressed[1]=false;
				break;
			case "KeyS":
				this.moveToBack(2);
				this.arrowsPressed[2]=false;
				break;
			case "ArrowDown":
				this.moveToBack(3);
				this.arrowsPressed[3]=false;
				break;
			case "KeyA":
				this.moveToBack(4);
				this.arrowsPressed[4]=false;
				break;
			case "ArrowLeft":
				this.moveToBack(5);
				this.arrowsPressed[5]=false;
				break;
			case "KeyD":
				this.moveToBack(6);
				this.arrowsPressed[6]=false;
				break;
			case "ArrowRight":
				this.moveToBack(7);
				this.arrowsPressed[7]=false;
				break;
		
	}
	keyDown(e)
	{
		switch(e.code)
		{
			case "KeyW":
				this.moveToFront(0);
				this.arrowsPressed[0]=true;
				break;
			case "ArrowUp":
				this.moveToFront(1);
				this.arrowsPressed[1]=true;
				break;
			case "KeyS":
				this.moveToFront(2);
				this.arrowsPressed[2]=true;
				break;
			case "ArrowDown":
				this.moveToFront(3);
				this.arrowsPressed[3]=true;
				break;
			case "KeyA":
				this.moveToFront(4);
				this.arrowsPressed[4]=true;
				break;
			case "ArrowLeft":
				this.moveToFront(5);
				this.arrowsPressed[5]=true;
				break;
			case "KeyD":
				this.moveToFront(6);
				this.arrowsPressed[6]=true;
				break;
			case "ArrowRight":
				this.moveToFront(7);
				this.arrowsPressed[7]=true;
				break;
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
		this.reorderKeys();
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
		this.reorderKeys();
	}
	reorderKeys()
	{
		for(let i=0;i<8;i++)
		{
			this.keyTracker[this.keyOrder[i]]=i
		}
	}
	startAct()
	{
		this.activeKey=this.keyOrder[this.keyTracker[0]];
		if(this.arrowsPressed[this.activeKey]);
		{
			if(this.angles[this.activeKey]==angle)
			{
				this.action=1;
				this.actTime=1000;
			}
			else
			{
				this.action=2;
				this.actTime=1000;
			}
		}
	}
	act(d)
	{
		if(this.action=1
		{
			let a=this angles[this.activeKey]
			if
		}
		else if(this action==2)
		{
			if(this.actTime>0)
			{
				off=[0,0]
			}
			else
			{
				off=
			}
		}
	}
}