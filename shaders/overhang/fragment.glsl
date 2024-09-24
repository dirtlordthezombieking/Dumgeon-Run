precision mediump float;
varying vec2 v_texCoord;
void main()
{
	vec2 pix=floor(v_texCoord/2.0);
	float alpha=(2.0*(clamp(distance(pix,vec2(0.0,0.0))/64.0,0.5,1.0)))-1.0;
	gl_FragColor=vec4(0.0,alpha,0.0,alpha);
}