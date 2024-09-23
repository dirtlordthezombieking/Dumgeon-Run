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
	static createShaderProgram(gl,vertexCode,fragmentCode)
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
				Utils.logMessage("error:\n"+e.message);
			}
		};
	}
	static async getTextData(src,onDone)
	{
Utils.logMessage("start");
		const url="https://raw.githubusercontent.com/dirtlordthezombieking/Dumgeon-Run/main/"+src;
		try
		{
Utils.logMessage("try");
			const response=await fetch(url);
Utils.logMessage("fetch");
			if(!response.ok)
			{
				throw new Error("Error: "+response.status);
			}
Utils.logMessage("err");
			const text=await response.text();
Utils.logMessage("text");
			onDone(text);
Utils.logMessage("done");
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
			let hold=0
Utils.logMessage("start");
			//let vert="";
			//let frag="";
			//Utils.getTextData("shaders/"+src+"/vertex.glsl",function(text)
			//{
				//vert=text;
				//hold=10;
			//});
			//while(hold<5)
			//{}
			//hold=0;
Utils.logMessage("load vert");
			//Utils.getTextData("shaders/"+src+"/fragment.glsl",function(text)
			//{
				//frag=text;
				//hold=10;
			//});
			//while(hold<5)
			//{}
Utils.logMessage("load frag");
			//let ret=this.createShaderProgram(gl,vert,frag);
Utils.logMessage("create program");
			//onDone(ret);
Utils.logMessage("done");
		}
		catch (e)
		{
			Utils.logMessage("Error: "+e.message);
		}
	}
}