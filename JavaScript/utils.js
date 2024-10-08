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
		let success=gl.getShaderParameter(shader,gl.COMPILE_STATUS);
		if(success)
		{
			return shader;
		}
		gl.deleteShader(shader);
		throw new Error("Shader failed:\n"+gl.getShaderInfoLog(shader)+"\nIn:\n"+source);
	}
	static createShaderProgram(gl,vertexCode,fragmentCode,name)
	{
		let vertexShader=Utils.createShader(gl,gl.VERTEX_SHADER,vertexCode);
		let fragmentShader=Utils.createShader(gl,gl.FRAGMENT_SHADER,fragmentCode);
		let program=gl.createProgram();
		gl.attachShader(program,vertexShader);
		gl.attachShader(program,fragmentShader);
		gl.linkProgram(program);
		let success=gl.getProgramParameter(program,gl.LINK_STATUS);
		if(success)
		{
			return program;
		}
		let s=gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error("shader '"+name+"' failed to compile:\n"+s);
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
				Utils.logMessage("error:\n"+e.message);
			}
		};
	}
	static async getTextData(src,onDone)
	{
		const url="https://dirtlordthezombieking.github.io/Dumgeon-Run/"+src;
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
			Utils.logMessage("Error: "+e.message);
		}
	}
	static loadShader(gl,src,onDone)
	{
		try
		{
			let hold=0;
			let vert="";
			let frag="";
			Utils.getTextData("shaders/"+src+"/vertex.glsl",function(text)
			{
				vert=text;
				Utils.getTextData("shaders/"+src+"/fragment.glsl",function(text)
				{
					frag=text;
					let ret=Utils.createShaderProgram(gl,vert,frag,src);
					onDone(ret);
				});
			});
		}
		catch (e)
		{
			Utils.logMessage("Error: "+e.message);
		}
	}
}