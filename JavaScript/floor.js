class Floor
{
	#rooms=[];
	constructor()
	{
		for(let i1=0;i1<15;i1++)
		{
			let r=0;
			let end=true;
			for(let i2=i1;i2<15;i2++)
			{
				r=new RandRect();
				let over=false;
				for(let i3=0;i3<i1;i3++)
				{
					if(r.overlaps(this.#rooms[i3]))
					{
						over=true;
						break;
					}
				}
				if(!over);
				{
					end=false;
					break;
				}
			}
			if(end)
			{
				break;
			}
			this.#rooms.push(r);
		}
	}
	use()
	{
		let l=this.#rooms.length;
		for(let i=0;i<l;i++)
		{
			let r=this.#rooms[i];
			FloorShape.addFromRectangle(r.x,r.y,r.w,r.h);
		}
	}
}
class RandRect()
{
	x;
	y;
	w;
	h;
	constructor()
	{
		this.x=RandRect.#randInt(95);
		this.y=RandRect.#randInt(95);
		if(this.x>90)
		{
			this.w=1+RandRect.#randInt(100-this.x);
		}
		else
		{
			this.w=1+RandRect.#randInt(10);
		}
		if(this.y>90)
		{
			this.h=1+RandRect.#randInt(100-this.y);
		}
		else
		{
			this.h=1+RandRect.#randInt(10);
		}
	}
	static #randInt(max)
	{
		return Math.floor(Math.random()*max);
	}
	overlaps(other)
	{
		return this.overlapsX(other)&&this.overlapsY(other)
	}
	#overlapsX(other)
	{
		return Floor.#overlapAdjusted(this.x,this.w,other.x,other.w);
	}
	#overlapY(other)
	{
		return Floor.#overlapAdjusted(this.y,this.h,other.y,other.h);
	}
	static #overlapAdjusted(s1,l1,s2,l2)
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
		return Floor.#overlapAxis(rs1,re1,rs2,re2)
	} 
	static #overlapAxis(s1,e1,s2,e2)
	{
		return!((e1<s2)||(e2<s1));
	}
}