precision mediump float;
attribute vec2 a_pos;
varying vec2 v_texCoord;
void main()
{
	v_texCoord=a_pos*vec2(1.0,-1.0);
	vec2 pos=(a_pos+vec2(165.0,85.0))/vec2(320.0,240.0);
	gl_Position=vec4(pos,0.0,1.0);
}