class Floor
{
	#rooms=[];
	#halls=[];
	#connected=[];
	#walls=[];
	#overhangs=[];
	#pos;
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
		let lop=0;
		for(let i1=1;i1<l;i1++)
		{
			lop=i1;
			let r=new RandRect();
			let hl=this.#halls.length;
			if(!this.#connected[i1])
			{
				for(let i2=0;i2<l;i2++)
				{
					if(i2!==i1)
					{
						if(this.#connected[i2])
						{
							if(this.#rooms[i1].overlapsX(this.#rooms[i2]))
							{
								//Utils.logMessage("room x checked\n");
								let over=this.#rooms[i1].getOverlapX(this.#rooms[i2]);
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
										if((i3!==i2)&&(i3!==i1))
										{
											if(r.overlaps(this.#rooms[i3]))
											{
												good=false;
												break;
											}
										}
									}
									for(let i3=0;i3<hl;i3++)
									{
										if(r.overlaps(this.#halls[i3]))
										{
											good=false;
											break;
										}
									}
									if(good)
									{
										this.#halls.push(r);
										this.#connected[i1]=true;
										con++;
										//Utils.logMessage("room x: "+i1+"\ni1: "+
										//this.#rooms[i1].x+", "+
										//this.#rooms[i1].y+", "+
										//this.#rooms[i1].w+", "+
										//this.#rooms[i1].h+"\ni2: "+
										//this.#rooms[i2].x+", "+
										//this.#rooms[i2].y+", "+
										//this.#rooms[i2].w+", "+
										//this.#rooms[i2].h+"\nr: "+
										//r.x+", "+
										//r.y+", "+
										//r.w+", "+
										//r.h+"\n");
										i1=0;
										break;
									}
								}
							}
							if(this.#rooms[i1].overlapsY(this.#rooms[i2]))
							{
								let over=this.#rooms[i1].getOverlapY(this.#rooms[i2]);
								if((over.e-over.s)>=3)
								{
									let pos=over.s+Math.floor(Math.random((over.e-over.s)-3));
									r.h=3;
									r.y=pos;
									if(this.#rooms[i1].x<this.#rooms[i2].x)
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
										if((i3!==i2)&&(i3!==i1))
										{
											if(r.overlaps(this.#rooms[i3]))
											{
												good=false;
												break;
											}
										}
									}
									for(let i3=0;i3<hl;i3++)
									{
										if(r.overlaps(this.#halls[i3]))
										{
											good=false;
											break;
										}
									}
									if(good)
									{
										this.#halls.push(r);
										this.#connected[i1]=true;
										con++;
										//Utils.logMessage("room y: "+i1+"\ni1: "+
										//this.#rooms[i1].x+", "+
										//this.#rooms[i1].y+", "+
										//this.#rooms[i1].w+", "+
										//this.#rooms[i1].h+"\ni2: "+
										//this.#rooms[i2].x+", "+
										//this.#rooms[i2].y+", "+
										//this.#rooms[i2].w+", "+
										//this.#rooms[i2].h+"\nr: "+
										//r.x+", "+
										//r.y+", "+
										//r.w+", "+
										//r.h+"\n");
										i1=0;
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
							let over=this.#rooms[i1].getOverlapX(this.#halls[i2]);
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
										if(r.overlaps(this.#rooms[i3]))
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
										if(r.overlaps(this.#halls[i3]))
										{
											good=false;
											break;
										}
									}
								}
								if(good)
								{
									this.#halls.push(r);
									this.#connected[i1]=true;
									con++;
									//Utils.logMessage("hall x: "+i1+"\ni1: "+
									//this.#rooms[i1].x+", "+
									//this.#rooms[i1].y+", "+
									//this.#rooms[i1].w+", "+
									//this.#rooms[i1].h+"\ni2: "+
									//this.#halls[i2].x+", "+
									//this.#halls[i2].y+", "+
									//this.#halls[i2].w+", "+
									//this.#halls[i2].h+"\nr: "+
									//r.x+", "+
									//r.y+", "+
									//r.w+", "+
									//r.h+"\n");
									i1=0;
									break;
								}
							}
						}
						if(this.#rooms[i1].overlapsY(this.#halls[i2]))
						{
							let over=this.#rooms[i1].getOverlapY(this.#halls[i2]);
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
										if(r.overlaps(this.#rooms[i3]))
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
										if(r.overlaps(this.#halls[i3]))
										{
											good=false;
											break;
										}
									}
								}
								if(good)
								{
									this.#halls.push(r);
									this.#connected[i1]=true;
									con++;
									//Utils.logMessage("hall y: "+i1+"\ni1: "+
									//this.#rooms[i1].x+", "+
									//this.#rooms[i1].y+", "+
									//this.#rooms[i1].w+", "+
									//this.#rooms[i1].h+"\ni2: "+
									//this.#halls[i2].x+", "+
									//this.#halls[i2].y+", "+
									//this.#halls[i2].w+", "+
									//this.#halls[i2].h+"\nr: "+
									//r.x+", "+
									//r.y+", "+
									//r.w+", "+
									//r.h+"\n");
									i1=0;
									break;
								}
							}
						}
					}
				}
			}
			if((i1>=(l-1))&&(con<l))
			{
				i1=0;
				let c=Math.random();
				let size=5+Math.floor(Math.random()*15);
				let side=Math.random();
				if(c>0.5||hl===0)
				{
					let sel=Math.floor(Math.random()*l);
					while(!this.#connected[sel])
					{
						sel=Math.floor(Math.random()*l);
					}
					let s=this.#rooms[sel];
					if(side>0.5)
					{
						r.h=3;
						r.y=s.y+Math.floor(Math.random(s.h-3));
						r.w=size;
						if(side>0.75)
						{
							r.x=s.x+s.w;
						}
						else
						{
							r.x=s.x-r.w;
						}
					}
					else
					{
						r.w=3;
						r.x=s.x+Math.floor(Math.random(s.w-3));
						r.h=size;
						if(side>0.25)
						{
							r.y=s.y+s.h;
						}
						else
						{
							r.y=s.y-r.h;
						}
					}
					let good=true;
					for(let i3=0;i3<l;i3++)
					{
						if(i3!==sel)
						{
							if(r.overlaps(this.#rooms[i3]))
							{
								good=false;
								break;
							}
						}
					}
					for(let i3=0;i3<hl;i3++)
					{
						if(r.overlaps(this.#halls[i3]))
						{
							good=false;
							break;
						}
					}
					if(good)
					{
						this.#halls.push(r);
					}
				}
				else
				{
					let sel=Math.floor(Math.random()*hl);
					let s=this.#halls[sel];
					if(side>0.5)
					{
						r.h=3;
						r.y=s.y+Math.floor(Math.random(s.h-3));
						r.w=size;
						if(side>0.75)
						{
							r.x=s.x+s.w;
						}
						else
						{
							r.x=s.x-r.w;
						}
					}
					else
					{
						r.w=3;
						r.x=s.x+Math.floor(Math.random(s.w-3));
						r.h=size;
						if(side>0.25)
						{
							r.y=s.y+s.h;
						}
						else
						{
							r.y=s.y-r.h;
						}
					}
					let good=true;
					for(let i3=0;i3<l;i3++)
					{
						if(r.overlaps(this.#rooms[i3]))
						{
							good=false;
							break;
						}
					}
					for(let i3=0;i3<hl;i3++)
					{
						if(i3!==sel)
						{
							if(r.overlaps(this.#halls[i3]))
							{
								good=false;
								break;
							}
						}
					}
					if(good)
					{
						this.#halls.push(r);
					}
				}
			}
		}
		//Utils.logMessage(""+l+", "+con+", "+lop);
		for(let i=0;i<l;i++)
		{
			this.createWalls(this.#rooms[i]);
			this.createOverhangs(this.#rooms[i]);
		}
		let hl=this.#halls.length;
		for(let i=0;i<hl;i++)
		{
			this.createWalls(this.#halls[i]);
			this.createOverhangs(this.#halls[i]);
		}
	}
	use()
	{
		let l=this.#rooms.length;
		for(let i=0;i<l;i++)
		{
			let r=this.#rooms[i];
			FloorShape.addFromRectangle((r.x-50)*64,(r.y-50)*64,r.w*64,r.h*64);
		}
		let hl=this.#halls.length;
		for(let i=0;i<hl;i++)
		{
			let r=this.#halls[i];
			FloorShape.addFromRectangle((r.x-50)*64,(r.y-50)*64,r.w*64,r.h*64);
		}
		let wl=this.#walls.length;
		for(let i=0;i<wl;i++)
		{
			let r=this.#walls[i];
			WallShape.addFromRectangle((r.x-50)*64,(r.y-50)*64,r.w*64,r.h*64);
		}
		let ol=this.#overhangs.length;
		for(let i=0;i<ol;i++)
		{
			let r=this.#overhangs[i];
			OverhangShape.addFromRectangle((r.x-50)*64,(r.y-50)*64,r.w*64,r.h*64);
		}
	}
	createWalls(rect)
	{
		let w=rect.w;
		let s=rect.x;
		let topY=rect.y+rect.h;
		let top=[];
		let l=this.#rooms.length;
		let hl=this.#halls.length;
		for(let i1=0;i1<w;i1++)
		{
			let use=true;
			for(let i2=0;i2<l;i2++)
			{
				if(this.#rooms[i2].contains(s+i1+0.5,topY+0.5))
				{
					use=false;
					break;
				}
			}
			if(use)
			{
				for(let i2=0;i2<hl;i2++)
				{
					if(this.#halls[i2].contains(s+i1+0.5,topY+0.5))
					{
						use=false;
						break;
					}
				}
			}
			top.push(use);
		}
		let inPut=top[0];
		let start=0;
		for(let i=1;i<w;i++)
		{
			if(inPut)
			{
				if(!top[i])
				{
					let nw=i-start;
					let nx=s+start;
					inPut=false;
					let r=new RandRect();
					r.x=nx;
					r.y=topY;
					r.w=nw;
					r.h=1;
					this.#walls.push(r);
				}
			}
			else if(top[i])
			{
				inPut=true;
				start=i;
			}
		}
		if(inPut)
		{
			let nw=w-start;
			let nx=s+start;
			let r=new RandRect();
			r.x=nx;
			r.y=topY;
			r.w=nw;
			r.h=1;
			this.#walls.push(r);
		}
	}
	createOverhangs(rect)
	{
		let w=rect.w;
		let s=rect.x;
		let botY=rect.y;
		let top=[];
		let l=this.#rooms.length;
		let hl=this.#halls.length;
		for(let i1=0;i1<w;i1++)
		{
			let use=true;
			for(let i2=0;i2<l;i2++)
			{
				if(this.#rooms[i2].contains(s+i1+0.5,botY-0.5))
				{
					use=false;
					break;
				}
			}
			if(use)
			{
				for(let i2=0;i2<hl;i2++)
				{
					if(this.#halls[i2].contains(s+i1+0.5,botY-0.5))
					{
						use=false;
						break;
					}
				}
			}
			top.push(use);
		}
		let inPut=top[0];
		let start=0;
		for(let i=1;i<w;i++)
		{
			if(inPut)
			{
				if(!top[i])
				{
					let nw=i-start;
					let nx=s+start;
					inPut=false;
					let r=new RandRect();
					r.x=nx;
					r.y=botY;
					r.w=nw;
					r.h=1;
					this.#overhangs.push(r);
				}
			}
			else if(top[i])
			{
				inPut=true;
				start=i;
			}
		}
		if(inPut)
		{
			let nw=w-start;
			let nx=s+start;
			let r=new RandRect();
			r.x=nx;
			r.y=botY;
			r.w=nw;
			r.h=1;
			this.#overhangs.push(r);
		}
	}
	getPos()
	{
		if(!this.pos);
		{
			let type=Math.random;
			let sel=0;
			if(type>0.5)
			{
				sel=this.#rooms[Math.floor(Math.random()*this.#rooms.length)];
			}
			else
			{
				sel=this.#halls[Math.floor(Math.random()*this.#halls.length)];
			}
			let x=sel.x+Math.floor(Math.random()*sel.w)+0.5;
			let y=sel.y+Math.floor(Math.random()*sel.h)+0.5;
			utils.logMessage("sel: "+sel.x", "+sel.y", "+sel.w", "+sel.h);
			this.pos=[x*64,y*64];
		}
		return this.pos;
	}
}