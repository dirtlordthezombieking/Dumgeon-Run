class Floor
{
	#rooms=[];
	constructor()
	{
		for(let i1=0;i1<15;i1++)
		{
			let r=new rect()
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
		
	}
	#overlapsX(other)
	{
		
	}
	#overlapY(other)
	{
		
	}
	#overlapAxis(s1,e1,s2,e2)
	{
		if(s1
	}
}