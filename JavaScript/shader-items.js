Utils.logMessage("shader start");
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
	}
	use()
	{
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
class Texture
{
	prog;
	image:
	loc;
	id;
	gl;
	constructor(shaderProgram,location,imageSrc,referenceID,glCore)
	{
		this.prog=shaderProgram;
		this.image=imageSrc;
		this.loc=glCore.getUniformLocation(shaderProgram,location);
		this.id=referenceID;
		this.gl=glCore;
	}
	push()
	{
		this.texture=this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
		this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.image);
	}
	use()
	{
		this.gl.uniform1i(this.loc,this.id);
		this.gl.activeTexture(this.gl.TEXTURE0+this.id);
		this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture);
	}
}
class Attribute
{
	size;
	prog;
	loc;
	value;
	gl;
	constructor(attributeSize,shaderProgram,location,attributeValue,glCore)
	{
		this.size=attributeSize;
		this.prog=shaderProgram;
		this.loc=glCore.getAttribLocation(shaderProgram,location);
		this.value=attributeValue;
		this.gl=glCore;
	}
	use()
	{
		let buff=this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buff);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,this.value,this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(this.loc);
		this.gl.vertexAttribPointer(this.loc,this.size,this.gl.FLOAT,false,0,0);
	}
}
Utils.logMessage("shader end");