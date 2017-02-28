$(document).ready(function () {
			$('#fullpage').fullpage({
				verticalCentered:false,
				anchors:['page1','page2','page3','page4'],
				navigation:true,
				navigationPosition:'right',
				naviationTooltips:['它，终于来了。','真正与你贴近的个人设备','非同一般的精准计时','在三个特点鲜明的系列中找到你的风格'],
				//当滚动到某一页时的动画效果
				afterLoad:function(link,index){
					switch(index){
						case 1:
							move('.section1 h1').scale(1.5).end();
							move('.section1 p').set('margin-top','5%').end();
							break;
						case 2:
							move('.section2 h1').scale(0.7).end();
							break;
						case 3:
							move('.section3 h1').set('margin-left','20%').end();
							move('.section3 p').set('margin-left','20%').end();
							break;
						case 4:
							move('.section4 img.primary').rotate(360).end(function(){
								move('.section4 img.sport').rotate(360).end(function(){
									move('.section4 img.edition').rotate(360).end(function(){
										move('.section4 h4.primary').scale(1.3).end(function(){
											move('.section4 h4.sport').scale(1.3).end(function(){
												move('.section4 h4.edition').scale(1.3).end();
											})
										})
									})
								})
							});
							break;
						default:
							break;
					}
				},
				//当页面离开时动画恢复原状
				onLeave:function(link,index){
					switch(index){
						case 1:
							move('.section1 h1').scale(1).end();
							move('.section1 p').set('margin-top','800px').end();
							break;
						case 2:
							move('.section2 h1').scale(1).end();
							break;
						case 3:
							move('.section3 h1').set('margin-left','-1500px').end();
							move('.section3 p').set('margin-left','1500px').end();
							break;
						case 4:
							move('.section4 img.primary').rotate(-360).end();
							move('.section4 img.sport').rotate(-360).end();
							move('.section4 img.edition').rotate(-360).end();
							move('.section4 h4.primary').scale(1).end();
							move('.section4 h4.sport').scale(1).end();
							move('.section4 h4.edition').scale(1).end();
							break;
						default:
							break;
					}
				},
				//当页面载入完毕的时候的动画
				afterRender:function(){
				},
			});
		});