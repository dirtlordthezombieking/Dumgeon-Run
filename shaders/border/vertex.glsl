attribute vec2 a_pos;
void main()
{
	vec2 pos=a_pos/vec2(320.0,240.0);
	gl_Position=vec4(pos,0,1);
}