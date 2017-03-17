(function(){
	var Util = (function(){
		//localStorage在同一域名下是共享的，为了防止别人覆盖存储，要将localStorage加上前缀并进行封装
		var prefix = 'html5_reader_';
		var StorageGetter = function(key){
			return localStorage.getItem(prefix + key);
		}
		var StorageSetter = function(key,val){
			return localStorage.setItem(prefix + key,val);
		}
		//数据解密
		var getBSONP = function(url,callback){
			return $.jsonp({
				url:url,
				cache:true,
				callback:'duokan_function_chapter',
				success:function(result) {
					var data = $.base64.decode(result);
					var json = decodeURIComponent(escape(data));
					callback(json);
				}
			})
		}
		return {
			getBSONP:getBSONP,
			StorageGetter:StorageGetter,
			StorageSetter:StorageSetter
		}
	}) ();

	//dom节点的缓存
	var Dom = {
		top_nav :$('#top-nav'),
		bottom_nav :$('.bottom_nav'),
		font_container :$('.font-container'),
		icon_font_on :$('.icon-font-on'),
		icon_font :$('.icon-font'),
		day_icon :$('#day_icon'),
		night_icon :$('#night_icon'),
	}

	var Win = $(window);
	var Doc = $(document);
	//字体缓存状态获取设置
	var RootContainer = $('#fiction_container');
	var initFontSize = Util.StorageGetter('font_size');//尝试去取本地存储中的
	initFontSize = parseInt(initFontSize);
	if ( ! initFontSize) {
		initFontSize = 14;
	};
	RootContainer.css('font-size',initFontSize);

	//是否是夜间模式

	var BackGroundContainer = $('.container');
	var initBackGroundColor =Util.StorageGetter('background_color');
	initBackGroundColor = parseInt(initBackGroundColor);
	if (! initBackGroundColor) {
		initBackGroundColor = '#e9dfc7';
	}
	BackGroundContainer.css('background-color',initBackGroundColor);

	function main(){
		//		整个项目的入口函数
		var readerModel = ReaderModel();
		var readerUI = ReaderBaseFrame(RootContainer);

		readerModel.init(function(data){
			readerUI(data);
		});
		
		EventHanlder();
	}

	function ReaderModel(){
		//		实现和阅读器相关的数据交互的方法
		
		var Chapter_id;
		var init = function(UIcallback){
			getFictionInfo(function(){
				getCurChapterContent(Chapter_id,function(data){
					//TODO
					UIcallback && UIcallback(data);
				});
			})
		}
		var getFictionInfo = function(callback){//	获得章节列表信息
			$.get('../data/chapter.json',function(data){
				//	获得章节信息之后的回调
				Chapter_id = data.chapters[0].chapter_id;
				callback && callback();
			},'json');
		}
		var getCurChapterContent = function(chapter_id,callback){
			$.get('../data/data' + chapter_id + '.json',function(data){
				if (data.result == 0) {
					var url =data.jsonp;
					Util.getBSONP(url,function(data){
						
						callback && callback(data);
					});
				}
			},'json')
		}
		return {
			init:init
		}
	}

	function ReaderBaseFrame(container){
		//		渲染基本的UI结构
		function parseChapterData(jsonData){//解析数据
			var jsonObj = JSON.parse(jsonData);
			var html = '<h4>' + jsonObj.t + '</h4>;'
			for(var i =0;i<jsonObj.p.length;i++){
				html += "<p>" + jsonObj.p[i] +"</p>"
			}
			return html;
		}
		return function(data){
			container.html(parseChapterData(data));
		}
	}

	function EventHanlder(){
		//		交互的事件绑定
		
		//		触屏中央事件
		$('#action-mid').click(function(){
			if(Dom.top_nav.css('display') == 'none'){
				Dom.top_nav.show();
				Dom.bottom_nav.show();
			}else{
				Dom.top_nav.hide();
				Dom.bottom_nav.hide();
				Dom.font_container.hide();
			};
		});

		$('#font-button').click(function(){
			//唤起字体面板
			if (Dom.font_container.css('display') == 'none') {
				Dom.font_container.show();
				Dom.icon_font_on.show();
				Dom.icon_font.hide();

			}else{
				Dom.font_container.hide();
				Dom.icon_font_on.hide();
				Dom.icon_font.show();
			}
			
		});

		$('#night-button').click(function(){
			// 触发背景切换的事件
			if (Dom.night_icon.css('display') == 'none') {
				Dom.night_icon.show();
				Dom.day_icon.hide();
				BackGroundContainer.css('background-color','#e9dfc7');

			}else{
				Dom.day_icon.show();
				Dom.night_icon.hide();
				BackGroundContainer.css('background-color','#0f1410');
			}
			
		});

		//点击面板上圆圈，切换整个屏幕背景
		$('.bk-1').click(function(){
			BackGroundContainer.css('background-color','#f7eee5');
		});
		$('.bk-2').click(function(){
			BackGroundContainer.css('background-color','#e9dfc7');
		});              
		$('.bk-3').click(function(){
			BackGroundContainer.css('background-color','#a4a4a4');
		});
		$('.bk-4').click(function(){
			BackGroundContainer.css('background-color','#cdefce');
		});
		$('.bk-5').click(function(){
			BackGroundContainer.css('background-color','#283548');
		});
		$('.bk-6').click(function(){
			BackGroundContainer.css('background-color','#0f1410');
		});

		// 调节字体大小事件
		$('#large-font').click(function(){
			if (initFontSize > 20) {
				return;
			};
			initFontSize += 1;
			RootContainer.css('font-size',initFontSize);
			Util.StorageSetter('font_size',initFontSize);
		});
		$('#small-font').click(function(){
			if (initFontSize < 12) {
				return;
			};
			initFontSize -= 1;
			RootContainer.css('font-size',initFontSize);
			Util.StorageSetter('font_size',initFontSize);
		});

		Win.scroll(function(){
			Dom.top_nav.hide();
			Dom.bottom_nav.hide();
			Dom.font_container.hide();
		});
	}

	main();
}) ();