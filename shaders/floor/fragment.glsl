precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texCoord;
void main()
{
	float ax=floor(v_texCoord.x);
	float ay=floor(v_texCoord.y);
	float bx=ax+0.129;
	float by=ay+0.371;
	float cx=mod(9.25*sin(bx),1);
	float cy=mod(8.99*cos(by),1);
	float dx=floor(4*cx);
	float dy=floor(4*cy);
	vec2 texCoord=vec2(dx+mod(v_texCoord.x,1),dy+mod(v_texCoord.y,1));
	gl_FragColor=texture2D(u_colourTexture,texCoord);
}