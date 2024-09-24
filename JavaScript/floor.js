class Floor
{
	#rooms=[];
	#halls;
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
				if(!over)
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
		for(let i1=1;i1<15;i1++)
		{
			let r=new RandRect();
		}
	}
	use()
	{
		let l=this.#rooms.length;
		for(let i=0;i<l;i++)
		{
			let r=this.#rooms[i];
			FloorShape.addFromRectangle((r.x-50)*4,(r.y-50)*4,r.w*4,r.h*4);
		}
		let r=this.#rooms[0];
		WallShape.addFromRectangle((r.x-50)*4,(r.y-50)*4,r.w*4,r.h*4);
	}
}