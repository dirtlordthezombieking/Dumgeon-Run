class Uniform
{
	size;
	prog;
	loc;
	value;
	gl;
	constructor(uniformSize,shaderProgram,location,uniformValue,glCore)
	{
		this.size=uniformSize;
		this.prog=shaderProgram;
		this.loc=glCore.getUniformLocation(shaderProgram,location);
		this.value=uniformValue;
		this.gl=glCore;
	}
	set(newValue)
	{
		this.value=newValue;
		Utils.logMessage("newpos: "+newValue[0]+", "+newValue[1]);
	}
	use()
	{
		Utils.logMessage("usepos: "+this.value[0]+", "+this.value[1]);
		if(this.size===1)
		{
			this.gl.uniform1f(this.loc,this.value[0]);
		}
		else if(this.size===2)
		{
			this.gl.uniform2f(this.loc,this.value[0],this.value[1]);
		}
		else if(this.size===3)
		{
			this.gl.uniform3f(this.loc,this.value[0],this.value[1],this.value[2]);
		}
		else if(this.size===4)
		{
			this.gl.uniform4f(this.loc,this.value[0],this.value[1],this.value[2],this.value[3]);
		}
	}
}