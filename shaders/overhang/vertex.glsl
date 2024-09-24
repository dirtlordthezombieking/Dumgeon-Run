attribute vec2 a_pos;
uniform vec2 u_pos;
varying vec2 v_texCoord;
void main()
{
	vec2 pos=a_pos-u_pos;
	v_texCoord=pos;
	gl_Position=vec4(pos,0,1);
}