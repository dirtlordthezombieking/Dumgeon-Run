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
	bufferAngle=0;
	activeKey=-1;
	arrowsPressed=[false,false,false,false,false,false,false,false];
	keyOrder=[0,1,2,3,4,5,6,7];
	keyTracker=[0,1,2,3,4,5,6,7]
	arrowAdd=[[0,1],[0,1],[0,-1],[0,-1],[-1,0],[-1,0],[1,0],[1,0]]
	angles=[0,0,180,180,270,270,90,90];
	turn=[[0,90,180,-90],[-90,0,90,180],[180,-90,0,90],[90,180,-90,0]];
	angle=0;
	static main;
	constructor(canvas)
	{
		Renderer.main=this;
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
			Player.angle=this.angle+this.bufferAngle;
			Player.draw(d);
			OverhangShape.draw(d,playPos);
			this.errframes=0;
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
		try
		{
		//Utils.logMessage("up"+e.code);
		switch(e.code)
		{
			case "KeyW":
				Renderer.main.moveToBack(0);
				//Renderer.main.arrowsPressed[0]=false;
				break;
			case "ArrowUp":
				Renderer.main.moveToBack(1);
				//Renderer.main.arrowsPressed[1]=false;
				break;
			case "KeyS":
				Renderer.main.moveToBack(2);
				//Renderer.main.arrowsPressed[2]=false;
				break;
			case "ArrowDown":
				Renderer.main.moveToBack(3);
				//Renderer.main.arrowsPressed[3]=false;
				break;
			case "KeyA":
				Renderer.main.moveToBack(4);
				//Renderer.main.arrowsPressed[4]=false;
				break;
			case "ArrowLeft":
				Renderer.main.moveToBack(5);
				//Renderer.main.arrowsPressed[5]=false;
				break;
			case "KeyD":
				Renderer.main.moveToBack(6);
				//Renderer.main.arrowsPressed[6]=false;
				break;
			case "ArrowRight":
				Renderer.main.moveToBack(7);
				//Renderer.main.arrowsPressed[7]=false;
				break;
		}
		Utils.logMessage((Renderer.main.arrowsPressed.toString())+"\n"+(Renderer.main.keyOrder.toString())+"\n"+(Renderer.main.keyTracker.toString())+"\n"+Renderer.main.activeKey+", "+Renderer.main.action+", "+Renderer.main.actTime);
		}
		catch(e)
		{
			Utils.logMessage("key up error:\n"+e.message);
		}
	}
	keyDown(e)
	{
		try
		{
		//Utils.logMessage("up"+e.code);
		switch(e.code)
		{
			case "KeyW":
				Renderer.main.moveToFront(0);
				//Renderer.main.arrowsPressed[0]=true;
				break;
			case "ArrowUp":
				Renderer.main.moveToFront(1);
				//Renderer.main.arrowsPressed[1]=true;
				break;
			case "KeyS":
				Renderer.main.moveToFront(2);
				//Renderer.main.arrowsPressed[2]=true;
				break;
			case "ArrowDown":
				Renderer.main.moveToFront(3);
				//Renderer.main.arrowsPressed[3]=true;
				break;
			case "KeyA":
				Renderer.main.moveToFront(4);
				//Renderer.main.arrowsPressed[4]=true;
				break;
			case "ArrowLeft":
				Renderer.main.moveToFront(5);
				//Renderer.main.arrowsPressed[5]=true;
				break;
			case "KeyD":
				Renderer.main.moveToFront(6);
				//Renderer.main.arrowsPressed[6]=true;
				break;
			case "ArrowRight":
				Renderer.main.moveToFront(7);
				//Renderer.main.arrowsPressed[7]=true;
				break;
		}
		Utils.logMessage((Renderer.main.arrowsPressed.toString())+"\n"+(Renderer.main.keyOrder.toString())+"\n"+(Renderer.main.keyTracker.toString())+"\n"+Renderer.main.activeKey+", "+Renderer.main.action+", "+Renderer.main.actTime);
		}
		catch(e)
		{
			Utils.logMessage("key down error:\n"+e.message);
		}
	}
	moveToBack(key)
	{
		this.arrowsPressed[key]=false;
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
		this.arrowsPressed[key]=true;
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
			this.keyTracker[this.keyOrder[i]]=i;
		}
	}
	startAct()
	{
		this.activeKey=this.keyTracker[0];
		if(this.arrowsPressed[this.activeKey])
		{
			if(this.angles[this.activeKey]==this.angle)
			{
				this.action=1;
				this.actTime=10000;
			}
			else
			{
				this.action=2;
				this.actTime=10000;
			}
		}
	}
	act(d)
	{
		if(this.action==1)
		{
			if(this.actTime>0)
			{
				let mult=(10000-this.actTime)/10000;
				this.bufferAngle=this.turn[this.angle/90][this.angles[this.activeKey]/90]*mult;
				
			}
			else
			{
				this.angle=this.angles[this.activeKey];
				this.bufferAngle=0;
			}
		}
		else if(this.action==2)
		{
			if(this.actTime>0)
			{
				let mult=(10000-this.actTime)/10000;
				this.off=[this.arrowAdd[this.activeKey][1]*mult,this.arrowAdd[this.activeKey][1]*mult];
			}
			else
			{
				this.off=[0,0];
				this.pos=[this.pos+this.arrowAdd[this.activeKey][1],this.pos+this.arrowAdd[this.activeKey][1]];
			}
		}
	}
}