class Utils
{
	static logMessage(msg)
	{
		document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"\n"+msg;
	}
	static createShader(gl,type,source)
	{
		let shader=gl.createShader(type);
		gl.shaderSource(shader,source);
		gl.compileShader(shader);
		var success=gl.getShaderParameter(shader,gl.COMPILE_STATUS);
		if(success)
		{
			return shader;
		}
		this.logMessage("Shader failed:\n"+gl.getShaderInfoLog(shader)+"\nIn:\n"+source);
		gl.deleteShader(shader);
	}
	static createShaderProgram(gl,vertexCode,fragmentCode)
	{
		let vertexShader=this.createShader(gl,gl.VERTEX_SHADER,vertexCode);
		let fragmentShader=this.createShader(gl,gl.FRAGMENT_SHADER,fragmentCode);
		var program=gl.createProgram();
		gl.attachShader(program,vertexShader);
		gl.attachShader(program,fragmentShader);
		gl.linkProgram(program);
		let success=gl.getProgramParameter(program,gl.LINK_STATUS);
		if(success)
		{
			return program;
		}
		this.logMessage("shader failed to compile");
		gl.deleteProgram(program);
	}
	static loadImage(src,finishImageLoad)
	{
		let image=new Image();
		image.src=src;
		image.onload=function()
		{
			try
			{
				finishImageLoad(image);
			}
			catch(e)
			{
				this.logMessage("error:\n"+e.message);
			}
		};
	}
	async function getTextData(src,onDone)
	{
		const url="https://raw.githubusercontent.com/dirtlordthezombieking/Dumgeon-Run/main/"+src;
		try
		{
			const response=await fetch(url);
			if(!response.ok)
			{
				throw new Error("Error: "+response.status);
			}
			const text=await response.text();
			onDone(text);
		}
		catch (e)
		{
			this.logMessage("Error: "+e.message);
		}
	}
}