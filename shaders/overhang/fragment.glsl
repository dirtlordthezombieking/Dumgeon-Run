precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texCoord;
void main()
{
	vec2 pix=floor(v_texCoord/2.0);
	float alpha=distance(pix,vec2(0.0,0.0);
	gl_FragColor=vec4(0,0,0,alpha);
}