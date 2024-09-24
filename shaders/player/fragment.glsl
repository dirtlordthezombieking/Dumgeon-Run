precision mediump float;
varying vec2 v_texCoord;
uniform vec3 u_eye;
void main()
{
	float pi=3.1415926535897932384626433832795;
	vec2 pix=floor(v_texCoord/2.0);
	float rad1=distance(pix,vec2(0.0,0.0));
	float clip1=pi*min(rad1,16.0);
	float flat1=clip1/16.0;
	float wave1=sin(flat1);
	float pre1=sign(wave1);
	float bodymult=(pre1+1.0)/2.0;
	vec4 body=vec4(0.05,0.2,0.8,1.0)*bodymult;
	gl_FragColor=body;
}