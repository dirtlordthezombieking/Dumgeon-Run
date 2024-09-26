precision mediump float;
attribute vec2 a_pos;
varying vec2 v_texCoord;
void main()
{
	v_texCoord=a_pos*vec2(1,-1);
	vec2 pos=(a_pos+vec2(190,110.0))/vec2(320,240);
	gl_Position=vec4(pos,0,1);
}