 
 (function (context, $, undefined) {
	"use strict";

	var APP_NAME = context.APP_NAME = "dev";
	var core = context[ APP_NAME ] || (context[ APP_NAME ] = {});

	core.$win = $(context);
	core.$doc = $(document);
	core.$html = $(document.documentElement);
	core.$html.addClass("js");
    ("ontouchstart" in context) && core.$html.addClass("touch");
    ("orientation" in context) && core.$html.addClass("mobile");
   
     if($('.forte-area').length > 0) {$('.forte-area').addClass('N-forte-area');}
	
	/*	@@ core.isvar _itemText = null;
	 *	Array
	 *	Object
	 *	Number
	 *	Empty
	 */
	core.is = {
		Array: function(v){
			return Array.isArray(v);
          document.documentElement.classList.add('')
       ;
        },
		Object: function(v){
			return v.constructor === Object;
			//return (typeof v === "object" || typeof v === 'function') && (v !== null);
		},
		Number: function(v){
			return v.constructor === Number;
		},
		Empty: function(v){
			return ( v == "" || v == null || v == undefined || ( v != null && typeof v == "object" && !Object.keys(v).length ) ) ? true : false;
		},
		Function: function(v){
			return v.constructor === Function;
		},
		True: function(v){
			return v === true;
		},
		False: function(v){
			return v === false;
		}
	}
	
	core.support = {
		multiple : 'multiple' in document.createElement('input'),
		fileReader : (window.File && window.FileReader && window.FileList && window.Blob) ? true : false,
		touch: 'ontouchstart' in document.documentElement
	}
	
	/*	@@ core.debug
	 *	function : init(), 
				 : log(@@Object);
				 
		core.debug.log({
			string : data
		});
	 */ 
	core.debug = (function(){
		var $el = $("<div id='debug' style='position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.5);color:#fff;z-index:9999'></div>");
		
		return {
			init: function(){
				$("body").append($el);
				this.init = null
			},
			log: function( msg ){
				var Message = this._getStringMessage(msg);
				$el.html(Message);
			},
			stack: function( msg ){
				var Message = this._getStringMessage(msg);
				$el.prepend(Message);
			},
			_getStringMessage: function( msg ){
				var output = "",
					date = new Date(),
					dateMS = "["+date.getMinutes()+":"+date.getSeconds()+"]";

				if(core.is.Object(msg)){
					for(var i in msg){
						output += i +" : " + msg[i] +" / ";
					}
				}else if(core.is.Array(msg)){
					output = msg.join(", ");
				}else output = msg;
				
				return "<span><em>"+ dateMS +"</em> "+ output + "</span>";
			},
		}
	})();
	
	/*	@@ core.observer
	 *	core.observer.on(eventName@@string, handler@@function, context);
	 *	core.observer.off(eventName@@string, handler@@function, context);
	 *	core.observer.notify(eventName@@string, data);
	 */
	core.observer = {
		handlers: {},
		on: function(eventName, fn, context, one){
			var events = eventName.split(" ");
			for(var eIdx = 0; eIdx < events.length; eIdx++){
				var handlerArray = this.handlers[events[eIdx]];
				if(undefined === handlerArray){
					handlerArray = this.handlers[events[eIdx]] = [];
				}
				handlerArray.push({ fn: fn, context: context, once: one});
			}
		},
		one: function(eventName, fn, context){
			this.on(eventName, fn, context, 1)
		},
		off: function(eventName, fn, context){
			var handlerArray = this.handlers[eventName];
			if(undefined === handlerArray) return;
			
			for(var hIdx = 0; hIdx < handlerArray.length; hIdx++){
				var currentHandler = handlerArray[hIdx];
				if (fn === currentHandler["fn"] && context === currentHandler["context"]){
					handlerArray.splice(hIdx, 1);
				}
			}
		},
		notify: function(eventName, data){
			var observer = this,
				handlerOffArray = [],
				handlerArray = this.handlers[eventName];
				
			if (undefined === handlerArray) return;

			for (var hIdx = 0; hIdx < handlerArray.length; hIdx++){
				var currentHandler = handlerArray[hIdx];
				currentHandler["fn"].call(currentHandler["context"], {type:eventName, data: data, fn:currentHandler["fn"]});
				
				if(currentHandler.once) handlerOffArray.push({type: eventName, fn: currentHandler["fn"]});
			}
			
			handlerOffArray.forEach(function(obj){
				observer.off(obj.type, obj.fn);
			})
		}
	};
	
	core.browser = (function(){
		var detect = {},
			win = context,
			na = win.navigator,
			ua = na.userAgent,
			lua = ua.toLowerCase(),
			match;
		
		detect.isMobile = typeof orientation !== "undefined";
		detect.isRetina = "devicePixelRatio" in window && window.devicePixelRatio > 1;
		detect.isAndroid = lua.indexOf("android") !== -1;
		detect.isOpera = win.opera && win.opera.buildNumber;
		detect.isWebKit = /WebKit/.test(ua);
		detect.isTouch = !!("ontouchstart" in window);

		match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ["",null,-1];
		detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null;		//(/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName);
		detect.isIE6 = detect.isIE && /MSIE [56]/i.test(ua);
		detect.isIE7 = detect.isIE && /MSIE [567]/i.test(ua);
		detect.isOldIE = detect.isIE && /MSIE [5678]/i.test(ua);
		detect.ieVersion = parseInt(match[2], 10);		// 사용법: if (browser.isIE && browser.version > 8) { // 9이상인 ie브라우저

		detect.isWin = (na.appVersion.indexOf("Win")!=-1);
		detect.isMac = (ua.indexOf("Mac") !== -1);
		detect.isLinux = (na.appVersion.indexOf("Linux")!=-1);

		detect.isChrome = (ua.indexOf("Chrome") !== -1);
		detect.isGecko = (ua.indexOf("Firefox") !==-1);
		detect.isAir = ((/adobeair/i).test(ua));
		detect.isIOS = /(iPad|iPhone)/.test(ua);
		detect.isSafari = !detect.isChrome && (/Safari/).test(ua);
		detect.isIETri4 = (detect.isIE && ua.indexOf("Trident/4.0") !== -1);

		detect.msPointer = na.msPointerEnabled && na.msMaxTouchPoints && !win.PointerEvent;
		detect.pointer = (win.PointerEvent && na.pointerEnabled && na.maxTouchPoints) || detect.msPointer;

		detect.isNotSupporte3DTransform = /android 2/i.test(lua);
		detect.isGingerbread = /android 2.3/i.test(lua);
		detect.isIcecreamsandwith = /android 4.0/i.test(lua);
		detect.hash = window.location.hash;

		if(detect.isAndroid) {
			detect.androidVersion = (function(match){ if(match){ return match[1]|0; } else { return 0; } })(lua.match(/android ([\w.]+)/));
		} else if(detect.isIOS) {
			detect.iosVersion = (function(match){ if(match){ return match[1]|0; } else { return 0; } })(ua.match(/OS ([[0-9]+)/));
		}
		return detect;
	})();
	
	/*	@@ core.event
	 *	core.observer.notify("READY");
	 *	core.observer.notify("LOAD");
	 *	core.observer.notify("SCROLL);
	 *	core.observer.notify("RESIZE");
	 *	core.observer.notify("WHEEL_DOWN", "WHEEL_UP");
	 *	core.observer.notify("LOAD");
	 */
	 
	core.event = (function(){
		var evt = {
			init: function(){
				var Event = {
					screen: "scroll resize orientationchange",
					wheel: "wheel"
				}
				core.$doc.ready(this.ready); // jquery 3.x 대응
				core.$win.on('load', this.load);
				document.addEventListener("DOMContentLoaded", this.ready);
				window.addEventListener("load", this.load);
				core.$win.on(Event.screen, this.screen);
				core.$win.on(Event.wheel, this.wheel);
			},
			ready: function(){
				core.$body = $("body");
				core.observer.notify("READY");
				core.observer.notify("SCROLL", false);
				core.observer.notify("RESIZE", false);
				
				evt.initUI();
			},
			load: function(){
				core.observer.notify("LOAD");
			},
			screen: function(e){
				var e = (e.type).toUpperCase();
				core.observer.notify(e);
			},
			wheel: function(e){
				var delta = (e.originalEvent.deltaY < 0) ? 100 : -100;
				if(delta > 0){
					core.observer.notify("WHEEL_UP", {dir:-1});
				}else{
					core.observer.notify("WHEEL_DOWN", {dir:1});
				}

				if(core.browser.ieScrollBug){
					e.preventDefault();
					var left = context.pageXOffset;
					var top = context.pageYOffset - delta;
					
					context.scrollTo(left, top);
				}
			},
			initUI: function(){
				var ui = core.ui,
					ins = document.body._ui || {};
				
				for(var name in ui){
					if(ui[name].init && !ins[name]){
						ui[name].init();
						ins[name] = true;
					}
				}
			}
		}
		evt.init();
	})();
	
	/*	@@ core.screen
	 *	return { width, height, scrollTop}
	 *	callBack
	 *		$(window).ready(){}	core.observer.notify("READY");
	 *		$(window).load(){}		core.observer.notify("LOAD");
	 *		$(window).scroll(){}	core.observer.notify("SCROLL");
	 *		$(window).resize(){}	core.observer.notify("RESIZE");
	 */
	core.screen = (function(){
		var me = {
			data : {
				width : context.innerWidth,
				height : context.innerHeight,
				scrollTop : core.$win.scrollTop(),
				scrollLeft : document.documentElement.scrollLeft
			},
			init: function(){
				if(context.orientation > 0){
					core.$html.addClass("landscape");
				}else{
					core.$html.removeClass("landscape");
				}
				core.observer.on("READY LOAD RESIZE", $.proxy(this.detect.all, this.detect));
				core.observer.on("SCROLL", this.detect.scroll);
				core.observer.on("ORIENTATIONCHANGE", this.detect.orientation);
			},
			detect: {
				all: function(){
					this.size();
					this.scroll();
				},
				size: function(){
					me.data.width = context.innerWidth;
					me.data.height = context.innerHeight;
				},
				scroll: function(){
					me.data.scrollTop = core.$win.scrollTop();
					me.data.scrollLeft = document.documentElement.scrollLeft;
				},
				orientation: function(){
					if(context.orientation > 0){
						core.$html.addClass("landscape");
					}else{
						core.$html.removeClass("landscape");
					}
				}
			},
		}
		me.init();
		return me.data;
	})();
	
	/*	@@ core.scroll
	 *	event : SCROLL, SCROLL_DOWN, SCROLL_UP, SCROLL_FIRST, SCROLL_LAST
	 *	public : enable(), disable(), to(direction[string(first, last) || number], duration) 
	 */
	core.scroll = (function(){
		var me = {
			originTop : core.screen.scrollTop,
			originLeft: core.screen.scrollLeft,
			init: function(){
				core.observer.on("SCROLL", this._scroll);
			},
			_scroll: function(){
				core.screen.scrollTop = core.$win.scrollTop();
				core.screen.scrollMax = me.calc.MaxScroll();
				core.screen.scrollPer = me.calc.Percent();
				
				if(core.screen.scrollTop < me.originTop) core.observer.notify("SCROLL_UP");
				if(core.screen.scrollTop > me.originTop) core.observer.notify("SCROLL_DOWN");
				if(core.screen.scrollTop < me.originTop || core.screen.scrollTop > me.originTop) core.observer.notify("SCROLL_VER");
				
				if(core.screen.scrollLeft < me.originLeft) core.observer.notify("SCROLL_LEFT");
				if(core.screen.scrollLeft > me.originLeft) core.observer.notify("SCROLL_RIGHT");
				if(core.screen.scrollLeft > me.originLeft || core.screen.scrollLeft > me.originLeft) core.observer.notify("SCROLL_RIGHT");
				core.observer.notify("SCROLL_HOR");
				
				if(core.screen.scrollTop < 1) core.observer.notify("SCROLL_FIRST");
				if(core.screen.scrollTop > core.screen.scrollMax-1) core.observer.notify("SCROLL_LAST");
				
				me.originTop = core.screen.scrollTop;
				me.originLeft = core.screen.scrollLeft;
			},
			calc : {
				MaxScroll: function(){
					return document.documentElement.scrollHeight - core.screen.height;
				},
				Percent: function(){
					return parseInt(core.screen.scrollTop/core.screen.scrollMax * 100);
				},
				Direction: function(dir){
					switch(dir){
						case "first" : return 0;
						case "last" : return me.calc.MaxScroll();
						default : return dir;
					}
				},
				Duration: function(dur){
					return dur !== undefined ? dur : 700;
				}
			},
			public: {
				enable: function(){
					core.$body.css("overflow", "");
				},
				disable: function(){
					core.$body.css("overflow","hidden");
				},
				to: function(direction, duration, fn){
					if(me.isScroll) return;
					me.isScroll = true;
					
					var arg = arguments,
						argLast = arg[arg.length-1],
						dir = me.calc.Direction(direction),
						dur = me.calc.Duration(duration);
					
					if(core.screen.scrollTop == dir) return me.isScroll = false;
					
					$("html, body").stop().animate({
						"scrollTop" : dir
					}, dur, function(){ 
						if(this.tagName == 'BODY'){
							me.isScroll = false;
							if(core.is.Function(argLast)) argLast();
						}
					});
				},
				toElem: function(el, dur){
					var $el = $(el);
					var pos = $el.offset().top;
					var $scrollParent = core.methods.ScrollParent($el);
					this.to(pos, dur);
					
					$scrollParent.stop().animate({
						scrollTop: pos,
					}, dur)
				},
				ieScrollBug: function(e){
					core.browser.ieScrollBug = true;
				}
			}
		}
		me.init();
		return me.public;
	})();
	
	/*	core.ui
	 *	@param {String} name
	 *	@param {String} selector
	 *	@paran {Object} option
	 
	 *	ui(name, selector);
	 *	return ui.events.public
	 */
	core.ui = function(name, container, option){
		if(!core.ui[name]) throw new Error("not ui "+name);
		var $container = $(container).filter(function(){
				return this.parentElement.nodeName !== "PRE";
			}),
			length = 0,
			supr = [];

		$container.each(function(){
			this._ui = this._ui || {};

			var hasUI = this._ui[name];
			if(hasUI){
				//이미 UI 구성됐을경우 새로 선언한 변수에 기존에 있는 public 담아줌
				//console.dir('already created UI : '+name);
				supr.push(hasUI);
			}else{
				var UI = new core.ui[name](this, option);
				UI.events._init();
				this._ui[name] = UI.events.public || "undefined public";
				supr.push(this._ui[name]);
			}

			++length;
		});

		if(length == 1) supr = supr[0];
		return supr;
	}
	
	/*	@@core.Selector
	 *	var selector = core.Selector(".layer",{
			body : ".body",
			close : ".btn_close"
		});
		selector.$container = $(".layer");
		selector.$body = $(".layer").find(".body");
		selector.$close = $(".layer").find(".btn_close");
	 */
	core.Selector = function(container, selector){
		function modeling(){
			for(var i in selector){
				selectors[i] = selectors.container.find(selector[i]);
			}
		}
		var selectors = { container : $(container) };
		modeling();
		
		selectors._dataSet = selectors.container.data();
		selectors.reInit = function(){
			modeling();
		}
		return selectors;
	}
	
	core.DataSet = function(dataSet, opts){
		function modeling(){
			for(var key in dataSet){
				if(dataSet[key].constructor === Object) {
					opts[key] = opts[key] || {};
					for(var i in dataSet[key]){
						opts[key][i] = dataSet[key][i];
					}
				}else{
					opts[key] = dataSet[key];
				}
			}
		}
		modeling();
		opts.reInit = function(){
			modeling();
		}
		return opts;
	}
	
	core.Data = function(_orgData, _data){
		// var options = _data || _orgData,
			// data = {};
		
		// Object.keys(_orgData).map(function(key, index){
			// data[key] = options[key] || _orgData[key];
		// });
		// var a = $.extend({}, _orgData, _data)
		
		// console.dir(_data);
		// console.dir(a);
		
		return $.extend({}, _orgData, _data);
	}
	
	core.OFFSET = {
		scrollParent: function($el, includeHidden){
			var position = $el.css( "position" ),
				excludeStaticParent = position === "absolute",
				overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				scrollParent = $el.parents().filter( function() {
					var parent = $( this );
					if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
						return false;
					}
					return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) +
						parent.css( "overflow-x" ) );
				} ).eq( 0 );

			return position === "fixed" || !scrollParent.length ? $( window ) : scrollParent;
		},
		DOMRect: function($el){
			return $el.get(0).getBoundingClientRect();
		},
		Viewport: function(obj){
			var totalHeight = obj.$wrap.outerHeight();
			var offTop = core.OFFSET.DOMRect(obj.$wrap).top;
			var limitHeight = window.innerHeight;
			var minusHeight = 0;
			
			if(obj.$plus){
				obj.$plus.each(function(){
					totalHeight += $(this).outerHeight(true);
				});
			}
			if(obj.$minus){
				obj.$minus.each(function(){
					minusHeight += $(this).outerHeight(true);
				});
			}

			return {
				show: offTop + totalHeight - minusHeight >= limitHeight ? false : true,
				spaceTop: totalHeight < offTop,
			}
		}
	}
	
	core.methods = {
		object2Array: function( value ){
			var arr = [];
			for(var i in value){
				arr.push(value[i])
			}
			return arr;
		},
		MinNumber: function(arr){
			arr = this.object2Array(arr);
			arr = arr.sort(function(a, b){
				return a-b;
			});
			return arr[0];
		},
		MaxNumber: function(arr){
			arr = this.object2Array(arr);
			arr = arr.sort(function(a, b){
				return b-a;
			});
			return arr[0];
		},
		Random: function(max, min){
			return Math.floor(Math.random() * max) + min;
		},
		RandomExceptValue: function(array, value){
			var max = array.length;
			var ran = core.methods.Random(max, 0);
			return array[ran] !== value
			? ran
			: max > 1 
				? core.methods.RandomExceptValue(array, value) 
				: ran;
		},
		RandomExceptIndex: function(array, idx){
			var max = array.length;
			var ran = core.methods.Random(max, 0);
			return array[ran] !== array[idx]
			? ran
			: max > 1 
				? core.methods.RandomExceptIndex(array, idx) 
				: ran;
		},
		Shuffle: function(array){
			var limit = array.length;
			var arr = array.slice();
			
			while(limit > 0){
				arr.length = limit;
				var randomIndex = core.methods.RandomExceptIndex(arr, --limit);
				//var randomIndex = core.methods.RandomExceptValue(arr, array[--limit]);
					
				var tempValue = array[limit];
				array[limit] = array[randomIndex];
				array[randomIndex] = tempValue;
			}
			return array;
		},
		Clone: function(value){
			return JSON.parse(JSON.stringify(value));
		},
		ScrollParent: function($el){
			var $parents = $el.parents().not('html, body'),
				scrollParent = [];
				
			$parents.each(function(i){
				var hasScroll = this.scrollHeight > this.clientHeight
				|| $(this).css('overflow').indexOf('scroll') > -1;
				
				scrollParent[i] = hasScroll ? $(this) : $('html, body');
			});
			
			return scrollParent[0];
		}
	}
})(this, jQuery);

(function($, core, ui, undefined){
    ui.PARALLAX_SCROLL = function(){
		var $item = $(arguments[0]),
			$wrapper = $item.closest('.ui-parallax-wrapper');

        var options = {
			ratio: 0.5,
			from : {},
        }

		var _itemText = null;
        var data = $.extend(options, $item.data('parallax'));
		
		this.events = {
			_init: function(){
                _itemText = $item[0].innerText;
				this._detectSetFromValue();
				core.observer.on("SCROLL", this._detectPosition);
            },
			_detectSetFromValue: function(){
				for(var value in data.to){
					if(!data.from[value]) data.from[value] = 0;
				}
			},
			_detectPosition: function(){
                var itemHeight = $item[0].clientHeight,
                    gap = (isAppCheck() ? 0 : data.enter) - $wrapper[0].getBoundingClientRect().top,
					calcGap = gap < 0 ? 0 : gap,
                    per = (calcGap / itemHeight),// * data.ratio,
					limitPer = per > 1 ? 1 : per;

				for(var value in data.to){
					var dist = data.from[value] - data.to[value],
						distCalc = dist * limitPer;
                  
                  if($item[0].parentNode.classList.contains('N-cHeadline')) {
						/*if(parseInt(data.from[value] / 1.2) > parseInt(data.from[value] - distCalc)) {
							$item[0].textContent = _itemText;
						} else {
							$item[0].innerText = _itemText.replace(/ /g, '<br>');
						}*/

						if(parseInt(data.from[value] / 1.3) > parseInt(data.from[value] - distCalc)) {
							/* 230503 인터넷>요금제 상세페이지 마이페이지용 */
							if ( $('.m-prodetail').hasClass('m-prodetail--my') ){
								$item[0].innerText = _itemText;
							}else {
								$item[0].textContent = $item[0].innerText = _itemText.replace(/(\n|\r\n)/g, ' ');
							}
							/* // 230503 인터넷>요금제 상세페이지 마이페이지용 */
						} else {
							$item[0].innerText = _itemText;
						}
					}

					$item.css('font-size', parseInt(data.from[value] - distCalc));
				}
            },
		}
	}

    ui.STICKY = {
        init: function(){
          /*core.observer.on('LOAD', $.proxy(function(){
				this.set();
				this.bindEvent();
				//this.detectScroll();
			}, this));*/
          
          this.set();
          this.bindEvent();
        },
        set: function(){
			var sumH = 0;
            $('.ui-sticky-wrapper').each(function(i){
              var jThis = this;
              
              
              setTimeout(function() {
                jThis.style.height = jThis.offsetHeight+'px';
              }, 500);
                $(this).addClass('init');

				sumH = sumH + this.offsetHeight;
            });
        },
        bindEvent: function(){
            core.observer.on('SCROLL', this.detectScroll);
        },
        getData: function(tar){
            var $me = $(tar),
                $item = $me.children(),
                $container = $me.closest('.ui-sticky-container'),
                $wrapper = $me.closest('.ui-sticky-wrapper'),
				wrapperHeight = $wrapper[0].offsetHeight,
                standardPos = Object.keys($item.data('sticky'))[0],
                stickyValue = isAppCheck() ? 0 : $item.data('sticky')[standardPos],
                stickyTargetValue = typeof stickyValue !== 'string' ? stickyValue : $(stickyValue)[0].getBoundingClientRect().bottom,
                offset = tar.getBoundingClientRect()[standardPos],
                isSticky = (standardPos == 'top') ? offset < stickyTargetValue : offset <= core.screen.height - stickyTargetValue;

            return {
                $container: $container,
                $wrapper: $wrapper,
                $item: $item,
				isSticky: isSticky,
                standardPos: standardPos,
                stickyValue: stickyTargetValue,
				stickyProgress: ((stickyTargetValue-offset) / wrapperHeight).toFixed(2),
                height: $me.outerHeight(true),
            }
        },
        detectScroll: function(){
            $('.ui-sticky-wrapper').each(function(){
                var data = ui.STICKY.getData(this);
                ui.STICKY.detectSticky(data);
                ui.STICKY.detectContainer(data);
				$(this).trigger('sticky', data);
            });
        },
        detectSticky: function(data){
            if(data.isSticky){
                ui.STICKY.active(data);
            }else{
                ui.STICKY.deActive(data);
            }
        },
        detectContainer: function(data){
            if(data.$container.length > 0){
                var rectBottom = data.$container[0].getBoundingClientRect().bottom,
                    gap = data.standardPos == 'top' ? rectBottom - data.height : rectBottom - core.screen.height,
                    transY = data.stickyValue + gap;
                
                if(gap < 0){
                    if(data.standardPos == 'bottom') transY *= -1;
                    data.$item.css(data.standardPos, transY);
                }
            }
        },
        active: function(o){
            o.$item.css({
                position: 'fixed',
                //width: o.$wrapper.outerWidth(),
                //[o.pos]: o.stickyPos ,,,,,,,,, IE error
            });
            
            o.$item.css(o.standardPos, o.stickyValue).addClass('sticky');
            if(isAppCheck() == true) {o.$item.addClass('appPos')}
        },
        deActive: function(o){
            o.$item.css({
                position: 'static',
                //width: 'auto',
            })
            .removeClass('sticky');
        }
    }

	ui.accordion = function(el, extned) {
		var $accordionRow = $(el),
			_close,
			options = {
				clickredClass: 'active'
			}

		this.events = {
			_init: function(){
				const variable = typeof extned === 'object' ? extned.num : extned;

				$('.N-pdt-accordion-tit').attr('aria-expanded','false'); // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가
				el.parentElement.children[variable].getElementsByClassName('N-pdt-accordion-tit')[0].classList.add(options.clickredClass);
				el.parentElement.children[variable].getElementsByClassName('N-pdt-accordion-tit')[0].setAttribute('aria-expanded','true'); // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가
				$(el.parentElement.children[variable]).find('.N-pdt-accordion-cont').slideDown(400);

				if(extned.flag) {
					const self = this;
					setTimeout(function() {
						self.moveAnchor(variable);
					}, 500);
				}

				if(el.getElementsByClassName('opener')[0].classList.contains(options.clickredClass)) {
					el.getElementsByClassName('N-pdt-accordion-cont')[0].style.display = 'block';
					el.getElementsByClassName('opener')[0].classList.add(options.clickredClass);
					el.getElementsByClassName('opener')[0].setAttribute('aria-expanded','true'); // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가
					ui.Event.wa(el.getElementsByClassName('opener')[0], options.clickredClass);
				}
				this.bindEvent();
				_close = this.close;
			},
			bindEvent : function() {
				$accordionRow.find('.opener').on('click', this.opener);
			},
			opener: function(){
				if(el.getElementsByClassName('opener')[0].classList.contains(options.clickredClass)) {
					_close();

					return;
				}
				el.getElementsByClassName('opener')[0].classList.add(options.clickredClass);
				el.getElementsByClassName('opener')[0].setAttribute('aria-expanded','true'); // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가
				ui.Event.wa(el.getElementsByClassName('opener')[0], options.clickredClass);
				$accordionRow.find('.N-pdt-accordion-cont').slideDown(400);
			},
			close: function(){
				$accordionRow.find('.N-pdt-accordion-cont').slideUp(400, function() {
					el.getElementsByClassName('opener')[0].classList.remove(options.clickredClass);
					el.getElementsByClassName('opener')[0].setAttribute('aria-expanded','false'); // 230306 접근성 결함 : 아코디언 aria-expanded 속성 값 추가
					ui.Event.wa(el.getElementsByClassName('opener')[0], options.clickredClass);
				});
			},
			moveAnchor: function(num) {
				const Y = el.parentElement.children[num].offsetTop;
                const H = document.querySelector('.ui-sticky-wrapper').offsetHeight;
                $j('html, body').stop().animate({'scrollTop':(Y-H)-52}, 300);
			}
		}
	}
    
    ui.sns = function(el) {
		var options = {
			clickredClass: 'active'
        }

		this.events = {
			_init: function() {
				this._bindEvent();
				ui.Event.wa(el, options.clickredClass);
			},
			_bindEvent: function() {
				el.addEventListener('click', function() {
					const getAria = new ComProduct();
					const All = getAria.getAllSiblings(this.parentNode);
					const hasClass = this.classList.contains(options.clickredClass);

					this.classList.toggle(options.clickredClass);
					ui.Event.dToggle(this, options.clickredClass);

					!hasClass ? getAria.setWaAriaToggle(this, true) : getAria.setWaAriaToggle(this);

					for(let i=0; i < All.length; i++) {
						if(All[i].matches('.N-head-btn-column')) {
							if(All[i].querySelector('.N-head-btn-area').style.display === 'block') {
								All[i].querySelector('button').classList.remove('active');
								All[i].querySelector('.N-head-btn-area').style.display = 'none';
							}
						}
					}
					if(this.parentNode.getAttribute('aria-hidden')) {this.parentNode.removeAttribute('aria-hidden')}
				});
			}
		}
	}

	ui.popLayer = function(el) {
		var uiPopScrollTop = 0;

		this.events = {
			_init: function() {
				this._setup();
				this._bindEvent();
			},
			_bindEvent: function() {
				el.addEventListener('click', function() {
					var dataId = document.getElementById(el.dataset.id),
						dataTitle = el.dataset.title,
						_this = this;

                  document.getElementsByTagName('body')[0].classList.add('expand');
                  document.getElementsByTagName('html')[0].classList.add('expand');

                  ui.Event.dBlock(dataId);
                  dataId.querySelectorAll('.N-pop-head')[0].innerText = dataTitle + ' 채널보기';
                  
                  uiPopScrollTop = window.pageYOffset;
                  
				core.$body.css({
					position: 'fixed',
					top: -uiPopScrollTop+'px',
					width: '100%'
				}).attr('data-scroll', uiPopScrollTop);
                  
                  if(core.$body.data().scroll > 65) {
                    setTimeout(function() {
                      $('.ui-menu-state').css('display', 'block');
                    }, 100);
					}

					ui.Event.wafocus(dataId.getElementsByClassName('N-pop-head')[0], true);
					ui.Event.waAriaToggle(true, dataId);

					dataId.getElementsByClassName('N-pop-close')[0].addEventListener('click', function() {
						document.getElementsByTagName('body')[0].classList.remove('expand');
						document.getElementsByTagName('html')[0].classList.remove('expand');

						ui.Event.dNone(dataId);
						core.$body.css({
							position: 'static',
							top: 0,
							width: 'auto'
						});

						window.scrollTo(0, core.$body.attr('data-scroll'));
						ui.Event.wafocus(_this, dataId.getElementsByClassName('N-pop-head')[0]);
						ui.Event.waAriaToggle(false);
					});
                });
			},
			_setup: function() {
				var dataId = document.getElementById(el.dataset.id);

				dataId.remove();
				core.$body.append(dataId.cloneNode(true));
			}
		}
	}

	ui.TABSCROLL = {
		init : function() {
			this.setup();
		},
		setup: function() {
			var elem = this.getData().el;

			Array.from(elem).map(a => {
				if(a.dataset.scroll == 'Y') {
                  var w = typeof a.dataset.w == 'undefined' ? '' : 'style=width:'+a.dataset.w+'%';
					$(a).wrap('<div class="N-pdt-scroll-cover"><div class="N-pdt-scroll" tabindex="0"><div class="ev" '+w+'></div></div></div>');

					a.closest('.N-pdt-accordion-column').classList.add('scroll-column');
					//$(a).unwrap().unwrap().unwrap(); 삭제
				}
			});
		},
		getData : function() {
			var gData = {},
				el = document.querySelectorAll('.N-pdt-tbl-plan');

			gData.el = el;

			return gData;
		}
	}
    
    ui.sliderImpat = function(el) {
		var smove,
			pductSlider;
		const fThis = this;

		this.events = {
			_init: function() {
				this._slider();
			},
			_slider: function() {
              var script = document.getElementsByTagName('script'),
					bxFlag = null;

				Array.from(script).map(a => {
					if(a.src.search('bxslider') > 0) {
						bxFlag = a;
					}
				});
              
              if(bxFlag == null) {return}
			  
			  pductSlider = $(el).bxSlider({
					minSlides: 1,
					maxSlides: 1,
					controls: false,
					infiniteLoop: false,
					onSliderLoad: function(currentIndex) {
						const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

						for(let i=0; i < $pageItems.length; i++) {
							$pageItems.eq(i).removeAttr('title');
						}
						fThis.events._sliderAriaSelected($pageItems, currentIndex, true);
						fThis.events._sliderPageTextChagne($pageItems);

						this[0].closest('.bx-wrapper').classList.add('N-pdt-compare-section-bxslider');
					}, onSliderResize: function(currentIndex) {
						const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

						fThis.events._sliderAriaSelected($pageItems, currentIndex, true);
						fThis.events._sliderPageTextChagne($pageItems);
					}, onSlideAfter: function($slideElement, oldIndex, newIndex){
						const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

						fThis.events._sliderAriaSelected($pageItems, oldIndex);
						fThis.events._sliderAriaSelected($pageItems, newIndex, true);
					}
				});
				
				smove = this._sliderMove;
				core.observer.on('RESIZE', smove);
			},
			_sliderMove: function() {
				if(window.innerWidth > pductSlider.children()[0].clientWidth * pductSlider.children().length) {
					pductSlider.destroySlider();
				} else if(700 >= window.innerWidth) {
					pductSlider[0].classList.add('N-pd-compare-column-slider-move');
					pductSlider.reloadSlider({
						minSlides: 1,
						maxSlides: 1,
						controls: false,
						infiniteLoop: false,
						onSliderLoad: function(currentIndex) {
							const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

							for(let i=0; i < $pageItems.length; i++) {
								$pageItems.eq(i).removeAttr('title');
							}
							fThis.events._sliderAriaSelected($pageItems, currentIndex, true);
							fThis.events._sliderPageTextChagne($pageItems);

							this[0].closest('.bx-wrapper').classList.add('N-pdt-compare-section-bxslider');
						}, onSliderResize: function(currentIndex) {
							const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

							fThis.events._sliderAriaSelected($pageItems, currentIndex, true);
							fThis.events._sliderPageTextChagne($pageItems);
						}, onSlideAfter: function($slideElement, oldIndex, newIndex){
							const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

							fThis.events._sliderAriaSelected($pageItems, oldIndex);
							fThis.events._sliderAriaSelected($pageItems, newIndex, true);
						}
					});
				} else {
					pductSlider[0].classList.remove('N-pd-compare-column-slider-move');
					pductSlider.reloadSlider({
						slideWidth: 243,
						minSlides: 'auto',
						maxSlides: 'auto',
						moveSlides: 'auto',
						controls: false,
						infiniteLoop: false,
						onSliderLoad: function(currentIndex) {
							const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

							for(let i=0; i < $pageItems.length; i++) {
								$pageItems.eq(i).removeAttr('title');
							}
							fThis.events._sliderAriaSelected($pageItems, currentIndex, true);
							fThis.events._sliderPageTextChagne($pageItems);

							this[0].closest('.bx-wrapper').classList.add('N-pdt-compare-section-bxslider');
						}, onSliderResize: function(currentIndex) {
							const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

							fThis.events._sliderAriaSelected($pageItems, currentIndex, true);
							fThis.events._sliderPageTextChagne($pageItems);
						}, onSlideAfter: function($slideElement, oldIndex, newIndex){
							const $pageItems = $(el).parents('.bx-wrapper').find('.bx-pager-item .bx-pager-link');

							fThis.events._sliderAriaSelected($pageItems, oldIndex);
							fThis.events._sliderAriaSelected($pageItems, newIndex, true);
						}
					});
				}
			},
			_sliderAriaSelected: function(element, index, flag) {
				const $element = element;
				flag ? $element.eq(index).attr('title', '선택됨') : $element.eq(index).removeAttr('title');
			},
			_sliderPageTextChagne: function(element) {
				const $element = element;
				for(let i=0; i < element.length; i++) {
					$element.eq(i).text('슬라이드 ' + (i+1));
				}
			}
		}
	}

	ui.Event = {
		dBlock: function(t) {
			t.style.display = 'block';
		},
		dNone: function(t) {
			t.style.display = 'none';
		},
		dToggle: function(t, clickredClass) {
			var hasClass = t.classList.contains(clickredClass);

			if(!hasClass) {
				ui.Event.dNone(t.nextElementSibling);
				ui.Event.wa(t, clickredClass);
			} else {
				ui.Event.dBlock(t.nextElementSibling);
				ui.Event.wa(t, clickredClass);
			}
		},
		wa : function(t, clickredClass) {
			var hasClass = t.classList.contains(clickredClass),
				getData = {};

			getData.title = '하위메뉴 열기';
			getData.alt = ' 열기';

			if(!hasClass) {
				getData.title = '하위메뉴 열기';
				getData.alt = ' 열기';
			} else {
				getData.title = '하위메뉴 닫기';
				getData.alt = ' 닫기';
			}

			typeof t.dataset.title == 'undefined' ? t.setAttribute('title', getData.title) : t.setAttribute('title', t.dataset.title + getData.alt);

			return getData;
		},
		wafocus : function(t, tabFleg) {
			tabFleg === true ? t.setAttribute('tabindex', 0) : tabFleg.removeAttribute('tabindex');
			t.focus();
		},
		waAriaToggle : function(active, t) {
			Array.from(core.$body.children()).map(a => {
				if(active) {
					if(a != t) {
						a.setAttribute('aria-hidden', true);
					}

					return;
				}

				a.removeAttribute('aria-hidden');
			});
		},
        accordionMove: function(el, index, timer) {
			$(el).on('click', function(){
				var target = $('.N-pdt-accordion-column').eq(index);

				if(target.length > 0) {
					var h = 0;
					if($('.N-cHeadline-cover').length > 0) {
						h = $('.N-cHeadline-cover').outerHeight() + target.find('.N-pdt-accordion-tit').outerHeight();
					}

					$('html, body').animate({'scrollTop':target.offset().top-h}, timer ? timer : 300);
					if (!target.find('.N-pdt-accordion-tit').hasClass('active') ){
						setTimeout(function(){
							target.find('.N-pdt-accordion-tit').trigger('click');
						}, timer ? timer : 300);
					}
				}
				return false;
			});
		}
	}

    
	core.observer.on('READY', function(){
		setTimeout(function() {
			ui('PARALLAX_SCROLL', '.ui-parallax-scroll');
		}, 550);
		ui('accordion', '.N-pdt-accordion-column', 0);
		ui('sns', '.N-head-btn-column .opener');
		ui('popLayer', '.pop-start');
		ui('sliderImpat', '.N-pdt-compare-section');

		/* (아코디언)요금안내 내 Y덤 내용 관련 - QR코드 레이어 팝업 */
		$('.y-bonus-qr_button').each(function(){
			var ybonusTrigger = $(this),
				 ybonusQRlayer = ybonusTrigger.attr('href');

			ybonusTrigger.on('click', function(){
				$(ybonusQRlayer).addClass('active').focus();
				return false;
			});

			$('.y-bonus-qr_close').on('click', function(){
				$(ybonusQRlayer).removeClass('active');
				ybonusTrigger.focus();
				return false;
			});
		});		
		/* // (아코디언)요금안내 내 Y덤 내용 관련 - QR코드 레이어 팝업 */
	});
	
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}

})(jQuery, window[APP_NAME], window[APP_NAME].ui);
