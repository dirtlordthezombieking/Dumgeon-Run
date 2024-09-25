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
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buff);
		this.gl.bufferData(this.gl.ARRAY_BUFFER,this.value,this.gl.STATIC_DRAW);
	}
	use()
	{
		let buff=this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buff);
		this.gl.enableVertexAttribArray(this.loc);
		this.gl.vertexAttribPointer(this.loc,this.size,this.gl.FLOAT,false,0,0);
	}
}