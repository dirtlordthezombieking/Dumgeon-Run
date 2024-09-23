
class RandRect
{
	x;
	y;
	w;
	h;
	constructor()
	{
		this.x=RandRect.randInt(95);
		this.y=RandRect.randInt(95);
		if(this.x>90)
		{
			this.w=5+RandRect.randInt((100-this.x)-5);
		}
		else
		{
			this.w=5+RandRect.randInt(5);
		}
		if(this.y>90)
		{
			this.h=5+RandRect.randInt((100-this.y)-5);
		}
		else
		{
			this.h=5+RandRect.randInt(5);
		}
	}
	static randInt(max)
	{
		return Math.floor(Math.random()*max);
	}
	overlaps(other)
	{
		return this.overlapsX(other)&&this.overlapsY(other);
	}
	overlapsX(other)
	{
		return RandRect.overlapsAdjusted(this.x,this.w,other.x,other.w);
	}
	overlapsY(other)
	{
		return RandRect.overlapsAdjusted(this.y,this.h,other.y,other.h);
	}
	static overlapsAdjusted(s1,l1,s2,l2)
	{
		let rs1=s1;
		let re1=s1+l1;
		if(l1<0)
		{
			let t1=rs1;
			rs1=re1;
			re1=t1;
		}
		let rs2=s2;
		let re2=s2+l2;
		if(l2<0)
		{
			let t2=rs2;
			rs2=re2;
			re2=t2;
		}
		return RandRect.overlapsAxis(rs1,re1,rs2,re2);
	} 
	static overlapsAxis(s1,e1,s2,e2)
	{
		return!((e1<s2)||(e2<s1));
	}
}