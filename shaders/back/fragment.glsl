precision mediump float;
uniform vec3 u_pos;
varying vec2 v_texCoord;
void main()
{
	vec2 pix=floor(v_texCoord);
	float val1=pix.x+pix.y+u_pos.z;
	float val2=sqrt((pix.x*pix.x)+(pix.y*pix.y))+u_pos.z;
	float xy=pix.x*pix.y;
	float val3=sqrt((xy+xy)*sign(xy))+u_pos.z;
	float red=((sin(val3)*cos(val1))*0.05)+0.15;
	float green=((sin(val2)*cos(val3))*0.05)+0.15;
	float blue=((sin(val1)*cos(val2))*0.05)+0.15;
	gl_FragColor=vec4(red/2.0,green/2.0,blue/2.0,1.0);
}