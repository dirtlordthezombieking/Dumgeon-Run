class Utils
{
	static logMessage(msg)
	{
	                        if(msg==null);
                        {
                                document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"\nWhy... Just why?????";
                        }	document.getElementById("log").innerHTML=document.getElementById("log").innerHTML+"\n"+msg;
	}
	static createShader(gl,type,source)
	{
		let shader=gl.createShader(type);
		gl.shaderSource(shader,source);
		gl.compileShader(shader);
		let success=gl.getShaderParameter(shader,gl.COMPILE_STATUS);
		if(success)
		{
			return shader;
		}
		gl.deleteShader(shader);
		throw new Error("Shader failed:\n"+gl.getShaderInfoLog(shader)+"\nIn:\n"+source);
	}
	static createShaderProgram(gl,vertexCode,fragmentCode)
	{
		let vertexShader=this.createShader(gl,gl.VERTEX_SHADER,vertexCode);
		let fragmentShader=this.createShader(gl,gl.FRAGMENT_SHADER,fragmentCode);
		let program=gl.createProgram();
		gl.attachShader(program,vertexShader);
		gl.attachShader(program,fragmentShader);
		gl.linkProgram(program);
		let success=gl.getProgramParameter(program,gl.LINK_STATUS);
		if(success)
		{
			return program;
		}
		gl.deleteProgram(program);
		throw new Error("shader failed to compile");
	}
	static loadImage(src,onDone)
	{
		let image=new Image();
		image.src=src;
		image.onload=function()
		{
			try
			{
				onDone(image);
			}
			catch(e)
			{
				this.logMessage("error:\n"+e.message);
			}
		};
	}
	async getTextData(src,onDone)
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
	static async loadShader(gl,src,onDone)
	{
		let vert="";
		let frag="";
		await this.getTextData("shaders/"+src+"/vertex.glsl",function(text)
		{
			vert=text;
		});
		await this.getTextData("shaders/"+src+"/fragment.glsl",function(text)
		{
			frag=text;
		});
		let ret=this.createShaderProgram(gl,vert,frag);
		onDone(ret);
	}
}