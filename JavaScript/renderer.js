class Renderer
{
	gl;
	canvas;
	floorShader;
	floorATexCoord;
	floorTex;
	floorUTexture;
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
			await loadImage("images/stand in.png",function(img)
			{
				hold=img;
			});
			this.floorTex=hold;
			init();
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
//floor texcoord
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
//floor texture
		this.floorUTexture=new Texture(this.program,"u_texture",this.floorTex,0,this.gl);
		this.text.push();
	}
	draw()
	{
		this.gl.clearColor(0,0,0,a);
		this.gl.clear(this gl.COLOR_BUFFER_BIT);
		this.gl.useProgram(this.floorShader);
		this.floorATexCoord.use();
	}
}