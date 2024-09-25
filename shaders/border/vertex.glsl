attribute vec2 a_pos;
uniform vec2 u_pos;
void main()
{
	vec2 pos=(a_pos-u_pos)*64.0/vec2(320.0,240.0);
	gl_Position=vec4(pos,0,1);
}