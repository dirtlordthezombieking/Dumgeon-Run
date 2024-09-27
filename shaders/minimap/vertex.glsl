precision mediump float;
attribute vec2 a_pos;
void main()
{
	vec2 pos=(a_pos-vec2(50.0,50.0))/vec2(150.0,150.0);
	gl_Position=vec4(pos,0.0,1.0);
}