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
		logMessage("Shader failed:\n"+gl.getShaderInfoLog(shader)+"\nIn:\n"+source);
		gl.deleteShader(shader);
	}
	static createShaderProgram(gl,vertexCode,fragmentCode)
	{
		let vertexShader=createShader(gl,gl.VERTEX_SHADER,vertexCode);
		let fragmentShader=createShader(gl,gl.FRAGMENT_SHADER,fragmentCode);
		var program=gl.createProgram();
		gl.attachShader(program,vertexShader);
		gl.attachShader(program,fragmentShader);
		gl.linkProgram(program);
		let success=gl.getProgramParameter(program,gl.LINK_STATUS);
		if(success)
		{
			return program;
		}
		document.getElementById("test").innerHTML="shader failed to compile";
		gl.deleteProgram(program);
	}
}