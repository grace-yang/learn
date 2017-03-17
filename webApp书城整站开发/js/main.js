(function(){
	

	function main(){
		//		整个项目的入口函数
		/*var readerModel = ReaderModel();
		readerModel.init();*/
		EventHanlder();
	}

	function ReaderModel(){
		//		实现和阅读器相关的数据交互的方法
		
		var Chapter_id;
		var init = function(){
			getFictionInfo(function(){
				getCurChapterContent(Chapter_id,function(){
					//TODO
				})
			})
		}
		var getFictionInfo = function(callback){//	获得章节列表信息
			$.get('../data/chapter.json',function(data){
				//	获得章节信息之后的回调
				
				Chapter_id = data.chapters[1].chapter_id;
				callback && callback();
			//},'json');
		//}
		//	获得当前章节的内容
		var getCurChapterContent = function(chapter_id,data){
			$.get('../data/data' + chapter_id + '.json',function(data){
				if (data.result == 0) {
					var url =data.jsonp;
					Util.getBSONP(url,function(data){
						callback && callback(data);
					});
				}
			//},'json');
		//}
		//return ;
	}



function main() {
			
					// 绑定事件
					var ScrollLock = false;
					var Doc = document;
					var Screen = Doc.body;
					var Win = $(window);

					//是否是夜间模式
					var NightMode = false;

					

					

					

						var tool_bar = Util.StorageGetter('toolbar_background_color');
						var bottomcolor = Util.StorageGetter('bottom_color');
						var color = Util.StorageGetter('background_color');
						var font = Util.StorageGetter('font_color');
						var bkCurColor = Util.StorageGetter('background_color');
						var fontColor = Util.StorageGetter('font_color');

						for (var i = 0; i < colorArr.length; i++) {
							var display = 'none';
							if (bkCurColor == colorArr[i].value) {
								display = '';
							}
							Dom.bk_container.append('<div class="bk-container" id="' + colorArr[i].id + '" data-font="' + colorArr[i].font + '"  data-bottomcolor="' + colorArr[i].bottomcolor + '" data-color="' + colorArr[i].value + '" style="background-color:' + colorArr[i].value + '"><div class="bk-container-current" style="display:' + display + '"></div><span style="display:none">' + colorArr[i].name + '</span></div>');
						}

						RootContainer.css('min-height', $(window).height() - 100);

						if (bottomcolor) {
							$('#bottom_tool_bar_ul').find('li').css('color', bottomcolor);
						}

						if (color) {
							$('body').css('background-color', color);
						}

						if (font) {
							$('.m-read-content').css('color', font);
						}

						//夜间模式
						if (fontColor == '#4e534f') {
							NightMode = true;
							$('#day_icon').show();
							$('#night_icon').hide();
							$('#bottom_tool_bar_ul').css('opacity', '0.6');
						}

					

					

					//页面中的零散交互事件处理
					var EventHandler = (function() {
						//夜间和白天模式的转化
						Dom.night_button.click(function() {
							if (NightMode) {
								$('#day_icon').hide();
								$('#night_icon').show();
								$('#font_normal').trigger('click');
								NightMode = false;
							} else {
								$('#day_icon').show();
								$('#night_icon').hide();
								$('#font_night').trigger('click');
								NightMode = true;
							}

						});

						//字体和背景颜色的信息设置
						Dom.bk_container.delegate('.bk-container', 'click', function() {
							var color = $(this).data('color');
							var font = $(this).data('font');
							var bottomcolor = $(this).data('bottomcolor');
							var tool_bar = font;
							Dom.bk_container.find('.bk-container-current').hide();
							$(this).find('.bk-container-current').show();
							if (!font) {
								font = '#000';
							}
							if (!tool_bar) {
								tool_bar = '#fbfcfc';
							}

							if (bottomcolor && bottomcolor != "undefined") {
								$('#bottom_tool_bar_ul').find('li').css('color', bottomcolor);
							} else {
								$('#bottom_tool_bar_ul').find('li').css('color', '#a9a9a9');
							}
							$('body').css('background-color', color);
							$('.m-read-content').css('color', font);

							Util.StorageSetter('toolbar_background_color', tool_bar);
							Util.StorageSetter('bottom_color', bottomcolor);
							Util.StorageSetter('background_color', color);
							Util.StorageSetter('font_color', font);

							var fontColor = Util.StorageGetter('font_color');
							//夜间模式
							if (fontColor == '#4e534f') {
								NightMode = true;
								$('#day_icon').show();
								$('#night_icon').hide();
								$('#bottom_tool_bar_ul').css('opacity', '0.6');
							} else {
								NightMode = false;
								$('#day_icon').hide();
								$('#night_icon').show();
								$('#bottom_tool_bar_ul').css('opacity', '0.9');
							}
						});

						//按钮的多态样式效果
						$('.spe-button').on('touchstart', function() {
							$(this).css('background', 'rgba(255,255,255,0.3)');
						}).on('touchmove', function() {
							$(this).css('background', 'none');
						}).on('touchend', function() {
							$(this).css('background', 'none');
						});

						

						var font_container = $('.font-container');
						var font_button = $('#font-button');
						var menu_container = $('#menu_container');

						font_button.click(function() {
							if (font_container.css('display') == 'none') {
								font_container.show();
								font_button.addClass('current');
							} else {
								font_container.hide();
								font_button.removeClass('current');

							}
						});

						RootContainer.click(function() {
							font_container.hide();
							font_button.removeClass('current');
						});

						
	
})();