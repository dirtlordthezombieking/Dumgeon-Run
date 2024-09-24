class Floor
{
	#rooms=[];
	#halls=[];
	#connected=[];
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
			this.#connected.push(false);
		}
		this.#connected[0]=true;
		let l=this.#rooms.length;
		for(let i1=1;i1<l;i1++)
		{
			if(!connected()
			{
				let r=new RandRect();
				for(let i2=0;i2<l;i2++)
				{
					if(i2!==i1)
					{
						if(this.#rooms[i1].overlapsX(this.#rooms[i1]))
						{
							let over=this.#rooms[i1].getOverlapX(this.#rooms[i1]
						}
					}
				}
			}
		}
	}
	use()
	{
		let l=this.#rooms.length;
		for(let i=0;i<l;i++)
		{
			let r=this.#rooms[i];
			if(this.#connected[i])
			{
			WallShape.addFromRectangle((r.x-50)*4,(r.y-50)*4,r.w*4,r.h*4);
			}
			else
			{
			FloorShape.addFromRectangle((r.x-50)*4,(r.y-50)*4,r.w*4,r.h*4);
			}
		}
		//let r=this.#rooms[0];
		//WallShape.addFromRectangle((r.x-50)*4,(r.y-50)*4,r.w*4,r.h*4);
	}
}