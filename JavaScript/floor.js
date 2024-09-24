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
		let con=1;
		let failsafe=false;
		for(let i1=1;i1<l;i1++)
		{
			if(!this.#connected[i1])
			{
				let r=new RandRect();
				let hl=this.#halls.length;
				for(let i2=0;i2<l;i2++)
				{
					if(i2!==i1)
					{
						if(this.#connected[i2])
						{
							if(this.#rooms[i1].overlapsX(this.#rooms[i2]))
							{
								let over=this.#rooms[i1].getOverlapX(this.#rooms[i2];
								if((over.e-over.s)>=3)
								{
									let pos=over.s+Math.floor(Math.random((over.e-over.s)-3));
									r.w=3;
									r.x=pos;
									if(this.#rooms[i1].y<this.#rooms[i2].y)
									{
										r.y=this.#rooms[i1].y+this.#rooms[i1].h;
										r.h=this.#rooms[i2].y-r.y;
									}
									else
									{
										r.y=this.#rooms[i2].y+this.#rooms[i2].h;
										r.h=this.#rooms[i1].y-r.y;
									}
									let good=true;
									for(let i3=0;i3<l;i3++)
									{
										if((i3!==i2)$$(i3!==i1))
										{
											if(r.overlaps(this.#rooms[i3])
											{
												good=false;
												break;
											}
										}
									}
									for(let i3=0;i3<hl;i3++)
									{
										if(r.overlaps(this.#halls[i3])
										{
											good=false;
											break;
										}
									}
									if(good)
									{
										i1=0;
										this.#halls.push(r);
										break;
									}
								}
							}
							if(this.#rooms[i1].overlapsY(this.#rooms[i1]))
							{
								let over=this.#rooms[i1].getOverlapY(this.#rooms[i1];
								if((over.e-over.s)>=3)
								{
									let pos=over.s+Math.floor(Math.random((over.e-over.s)-3));
									r.h=3;
									r.y=pos;
									if(this.#rooms[i1].X<this.#rooms[i2].y)
									{
										r.x=this.#rooms[i1].x+this.#rooms[i1].w;
										r.w=this.#rooms[i2].x-r.x;
									}
									else
									{
										r.x=this.#rooms[i2].x+this.#rooms[i2].w;
										r.w=this.#rooms[i1].x-r.x;
									}
									let good=true;
									for(let i3=0;i3<l;i3++)
									{
										if((i3!==i2)$$(i3!==i1))
										{
											if(r.overlaps(this.#rooms[i3])
											{
												good=false;
												break;
											}
										}
									}
									for(let i3=0;i3<hl;i3++)
									{
										if(r.overlaps(this.#halls[i3])
										{
											good=false;
											break;
										}
									}
									if(good)
									{
										i1=0;
										this.#halls.push(r);
										break;
									}
								}
							}
						}
					}
				}
			}
			if(!this.#connected[i1])
			{
				for(let i2=0;i2<hl;i2++)
				{
					if(i2!==i1)
					{
						if(this.#rooms[i1].overlapsX(this.#halls[i2]))
						{
							let over=this.#rooms[i1].getOverlapX(this.#halls[i2];
							if((over.e-over.s)>=3)
							{
								let pos=over.s+Math.floor(Math.random((over.e-over.s)-3));
								r.w=3;
								r.x=pos;
								if(this.#rooms[i1].y<this.#halls[i2].y)
								{
									r.y=this.#rooms[i1].y+this.#rooms[i1].h;
									r.h=this.#halls[i2].y-r.y;
								}
								else
								{
									r.y=this.#halls[i2].y+this.#halls[i2].h;
									r.h=this.#rooms[i1].y-r.y;
								}
								let good=true;
								for(let i3=0;i3<l;i3++)
								{
									if(i3!==i1)
									{
										if(r.overlaps(this.#rooms[i3])
										{
											good=false;
											break;
										}
									}
								}
								for(let i3=0;i3<hl;i3++)
								{
									if(i3!==i2)
									{
										if(r.overlaps(this.#halls[i3])
										{
											good=false;
											break;
										}
									}
								}
								if(good)
								{
									i1=0;
									this.#halls.push(r);
									break;
								}
							}
						}
						if(this.#rooms[i1].overlapsY(this.#rooms[i1]))
						{
							let over=this.#rooms[i1].getOverlapY(this.#rooms[i1];
							if((over.e-over.s)>=3)
							{
								let pos=over.s+Math.floor(Math.random((over.e-over.s)-3));
								r.h=3;
								r.y=pos;
								if(this.#rooms[i1].x<this.#halls[i2].x)
								{
									r.x=this.#rooms[i1].x+this.#rooms[i1].w;
									r.w=this.#halls[i2].x-r.x;
								}
								else
								{
									r.x=this.#halls[i2].x+this.#halls[i2].w;
									r.w=this.#rooms[i1].x-r.x;
								}
								let good=true;
								for(let i3=0;i3<l;i3++)
								{
									if(i3!==i1)
									{
										if(r.overlaps(this.#rooms[i3])
										{
											good=false;
											break;
										}
									}
								}
								for(let i3=0;i3<hl;i3++)
								{
									if(i3!==i2)
									{
										if(r.overlaps(this.#halls[i3])
										{
											good=false;
											break;
										}
									}
								}
								if(good)
								{
									i1=0;
									this.#halls.push(r);
									break;
								}
							}
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
		let hl=this.#halls.length;
		for(let i=0;i<hl;i++)
		{
			let r=this.#halls[i];
			WallShape.addFromRectangle((r.x-50)*4,(r.y-50)*4,r.w*4,r.h*4);
		}
	}
}