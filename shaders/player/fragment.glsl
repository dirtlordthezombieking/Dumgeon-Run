precision mediump float;
varying vec2 v_texCoord;
void main()
{
	vec2 pix=floor(v_texCoord/2.0);
	float r1=distance(pix,vec2(0.0,0.0));
	gl_FragColor=vec4(0.0,0.0,0.0,alpha);
}