precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texCoord;
void main()
{
	float ax=floor(v_texCoord.x);
	float ay=floor(v_texCoord.y);
	float bx=ax+0.129;
	float by=ay+0.371;
	float cx=mod(9.25*sin(bx),1.0);
	float cy=mod(8.99*cos(by),1.0);
	float dx=floor(4.0*cx);
	float dy=floor(4.0*cy);
	vec2 texCoord=floor(vec2(dx+mod(v_texCoord.x,1.0),dy+mod(v_texCoord.y,1.0))*32.0)/128.0;
	gl_FragColor=texture2D(u_texture,texCoord);
}