precision mediump float;
attribute vec2 a_pos;
uniform vec2 u_pos;
varying vec2 v_texCoord;
void main()
{
	v_texCoord=apos*0.5;
	vec2 pos=(a_pos-(u_pos*64.0))/vec2(320,240);
	gl_Position=vec4(pos,0,1);
}