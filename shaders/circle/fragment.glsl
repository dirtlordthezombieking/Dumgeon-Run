precision mediump float;
varying vec2 v_texCoord;
uniform vec3 u_data;
uniform vec4 u_colour;
uniform vec3 u_alphamod;
void main()
{
	float pi=3.1415926535897932384626433832795;
	vec2 pix=floor(v_texCoord/2.0);
	float rad1=distance(pix,vec2(0.0,0.0));
	float clip1=pi*min(rad1,u_data.x+0.5);
	float flat1=clip1/u_data.x+0.5;
	float wave1=cos(flat1);
	float pre1=sign(wave1);
	float bodymult=floor((pre1+1.0)/2.0);
	float smoothrange=(u_data.z-u_data.y)/2.0;
	float bodysmooth=(smoothrange*wave1*bodymult)+u_data.y;
	float alpha=((bodymult*max(bodysmooth,u_alphamod.x))*u_alphamod.y)+u_alphamod.z;
	gl_FragColor=vec4(u_alphamod.xyz*bodysmooth,alpha*u_colour.w);
}