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
	float wave1=cos(flat1);
	float pre1=sign(wave1);
	float bodymult=(pre1+1.0)/2.0;
	vec4 body=vec4(0.05,0.2,0.8,1.0)*bodymult;

	vec2 theta=vec2(sin(u_eye.x),cos(u_eye.x));

	float rad2=distance(pix,theta*u_eye.y);
	float clip2=pi*min(rad2,8.0);
	float flat2=clip2/8.0;
	float wave2=cos(flat2);
	float pre2=sign(wave2);
	float prepreeyemult=(pre2+1.0)/2.0;

	float rad3=distance(pix,theta*u_eye.z);
	float clip3=pi*min(rad3,4.0);
	float flat3=clip3/4.0;
	float wave3=cos(flat3);
	float pre3=sign(wave3);
	float prepupmult=(pre3+1.0)/2.0;
	float pupmult=floor((prepupmult+prepreeyemult)*0.55);
	vec4 pup=vec4(0.9,0.9,0.9,1.0)*pupmult;

	float preeyemult=(((((prepreeyemult-prepupmult)+1.0)/2.0)-bodymult)+1.0)/2.0;
	vec4 eye=vec4(0.5,0.8,0.2,1.0)*preeyemult;

	gl_FragColor=body+pup+eye;
}