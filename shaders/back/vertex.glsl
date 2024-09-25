precision mediump float;
attribute vec2 a_pos;
uniform vec3 u_pos;
varying vec2 v_texCoord;
void main()
{
	v_texCoord=(a_pos*vec2(320,240))-((u_pos.xy*0.25))*64.0);
	gl_Position=vec4(a_pos,0,1);
}