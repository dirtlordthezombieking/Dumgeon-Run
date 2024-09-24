
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
	getOverlapX(other)
	{
		let rs1=this.x;
		let re1=this.x+this.w;
		let rs2=other.x;
		let re2=other.x+other.w;
		let order=[rs1,re1,rs2,re2];
		for(let i1=0;i1<4;i1++)
		{
			let t=order[i1];
			let pos=i1;
			for(let i2=i1-1;i2>-1;i2--)
			{
				if(t<order[i2])
				{
					order[pos]=order[i2];
					order[i2]=t;
					pos--;
				}
			}
		}
		return new OneDLine(order[1],order[2]);
	}
	getOverlapY(other)
	{
		let rs1=this.y;
		let re1=this.y+this.h;
		let rs2=other.y;
		let re2=other.y+other.h;
		let order=[rs1,re1,rs2,re2];
		for(let i1=0;i1<4;i1++)
		{
			let t=order[i1];
			let pos=i1;
			for(let i2=i1-1;i2>-1;i2--)
			{
				if(t<order[i2])
				{
					order[pos]=order[i2];
					order[i2]=t;
					pos--;
				}
			}
		}
		return new OneDLine(order[1],order[2]);
	}
}