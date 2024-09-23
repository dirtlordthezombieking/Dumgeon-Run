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
		this.gl=this.canvas.getContext("webgl");;
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
			await FloorShape.setup(this gl);
			this.init();
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
//floor texture
		this.draw();
	}
	draw()
	{
		this.gl.clearColor(0,0,0,1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.useProgram(this.floorShader);
		this.floorATexCoord.use();
		this.floorUTexture.use();
		this.floorAPos.use();
		this.floorUPos.use();
		this.gl.drawArrays(this.gl.TRIANGLES,0,6);
	}
}