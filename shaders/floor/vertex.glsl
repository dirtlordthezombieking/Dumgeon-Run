attribute vec2 a_pos;
attribute vec2 a_texCoord;
uniform vec2 u_pos;
varying vec2 v_texCoord;
void main()
{
  v_texCoord=a_texCoord;
  vec2 pos=a_pos-u_pos;
  gl_Position=vec4(pos,0,1);
}