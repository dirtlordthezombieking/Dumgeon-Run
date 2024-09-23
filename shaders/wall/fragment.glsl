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
	float dx=mod(floor(((4.0*cx)*ay)+ax),4.0);
	float dy=mod(floor(((4.0*cy)*ax)+ay),4.0);
	vec2 texCoord=floor(vec2(dx+mod(v_texCoord.x,1.0),dy+mod(v_texCoord.y,1.0))*32.0)/128.0;


	float ex=floor(v_texCoord.x*32.0)/32.0;
	float fx=sin(1.3ex);
	float gx=cos(0.8ex);
	float hx=(0.25*fx*gx)+0.75;

	float ey=floor(v_texCoord.y*32.0)/32.0;
	float fy=sin(1.2ex);
	float gy=cos(0.9ex);
	float hy=(0.25*fy*gy)+0.75;

	float c=(hx+hy)/2.0;

	float at=
	float bt=sin(1.4at);
	float ct=cos(0.7at);
	float dt=(0.25*bt*ct)+0.75;

	float grime=((13.0*c)+(7.0*dt))/20.0;
	gl_FragColor=texture2D(u_texture,texCoord)*grime;
}