precision mediump float;
varying vec2 v_texCoord;
void main()
{
	vec2 pix=floor(v_texCoord);
	float val1=pix.x+pix.y;
	float val2=sqrt((pix.x*pix.x)+(pix.y*pix.y));
	float xy=pix.x*pix.y;
	float val3=sqrt((xy+xy)*sign(xy));
	float red=((sin(val3)+cos(val1))*0.05)+0.2;
	float green=((sin(val2)+cos(val3))*0.05)+0.25;
	float blue=((sin(val1)+cos(val2))*0.05)+0.15;
	gl_FragColor=vec4(red,green,blue,1.0);
}