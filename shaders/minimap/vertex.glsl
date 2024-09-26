precision mediump float;
attribute vec2 a_pos;
void main()
{
	vec2 pos=(a_pos-vec2(50,50))/vec2(150,150);
	gl_Position=vec4(pos,0,1);
}