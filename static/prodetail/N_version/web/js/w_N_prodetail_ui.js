(function (context, $, undefined) {
  "use strict";
  var APP_NAME = (context.APP_NAME = "dev");
  var core = context[APP_NAME] || (context[APP_NAME] = {});

  core.$win = $(context);
  core.$doc = $(document);
  core.$html = $(document.documentElement);
  core.$html.addClass("js");
  "ontouchstart" in context && core.$html.addClass("touch");
  "orientation" in context && core.$html.addClass("mobile");

  if ($(".forte-area").length > 0) {
    $(".forte-area").addClass("N-forte-area");
  }

  /*	@@ core.is
   *	Array
   *	Object
   *	Number
   *	Empty
   */
  core.is = {
    Array: function (v) {
      return Array.isArray(v);
    },
    Object: function (v) {
      return v.constructor === Object;
      //return (typeof v === "object" || typeof v === 'function') && (v !== null);
    },
    Number: function (v) {
      return v.constructor === Number;
    },
    Empty: function (v) {
      return v == "" || v == null || v == undefined || (v != null && typeof v == "object" && !Object.keys(v).length) ? true : false;
    },
    Function: function (v) {
      return v.constructor === Function;
    },
    True: function (v) {
      return v === true;
    },
    False: function (v) {
      return v === false;
    },
  };

  /*	@@ core.debug
	 *	function : init(), 
				 : log(@@Object);
				 
		core.debug.log({
			string : data
		});
	 */
  core.debug = (function () {
    var $el = $("<div id='debug' style='position:fixed;left:0;top:0;background-color:rgba(0,0,0,0.5);color:#fff;z-index:9999'></div>");

    return {
      init: function () {
        $("body").append($el);
        this.init = null;
      },
      log: function (msg) {
        var Message = this._getStringMessage(msg);
        $el.html(Message);
      },
      stack: function (msg) {
        var Message = this._getStringMessage(msg);
        $el.prepend(Message);
      },
      _getStringMessage: function (msg) {
        var output = "",
          date = new Date(),
          dateMS = "[" + date.getMinutes() + ":" + date.getSeconds() + "]";

        if (core.is.Object(msg)) {
          for (var i in msg) {
            output += i + " : " + msg[i] + " / ";
          }
        } else if (core.is.Array(msg)) {
          output = msg.join(", ");
        } else output = msg;

        return "<span><em>" + dateMS + "</em> " + output + "</span>";
      },
    };
  })();

  /*	@@ core.observer
   *	core.observer.on(eventName@@string, handler@@function, context);
   *	core.observer.off(eventName@@string, handler@@function, context);
   *	core.observer.notify(eventName@@string, data);
   */
  core.observer = {
    handlers: {},
    on: function (eventName, fn, context, one) {
      var events = eventName.split(" ");
      for (var eIdx = 0; eIdx < events.length; eIdx++) {
        var handlerArray = this.handlers[events[eIdx]];
        if (undefined === handlerArray) {
          handlerArray = this.handlers[events[eIdx]] = [];
        }
        handlerArray.push({ fn: fn, context: context, once: one });
      }
    },
    one: function (eventName, fn, context) {
      this.on(eventName, fn, context, 1);
    },
    off: function (eventName, fn, context) {
      var handlerArray = this.handlers[eventName];
      if (undefined === handlerArray) return;

      for (var hIdx = 0; hIdx < handlerArray.length; hIdx++) {
        var currentHandler = handlerArray[hIdx];
        if (fn === currentHandler["fn"] && context === currentHandler["context"]) {
          handlerArray.splice(hIdx, 1);
        }
      }
    },
    notify: function (eventName, data) {
      var observer = this,
        handlerOffArray = [],
        handlerArray = this.handlers[eventName];

      if (undefined === handlerArray) return;

      for (var hIdx = 0; hIdx < handlerArray.length; hIdx++) {
        var currentHandler = handlerArray[hIdx];
        currentHandler["fn"].call(currentHandler["context"], { type: eventName, data: data, fn: currentHandler["fn"] });

        if (currentHandler.once) handlerOffArray.push({ type: eventName, fn: currentHandler["fn"] });
      }

      handlerOffArray.forEach(function (obj) {
        observer.off(obj.type, obj.fn);
      });
    },
  };

  core.browser = (function () {
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

    match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ["", null, -1];
    detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null; //(/MSIE/gi).test(ua) && (/Explorer/gi).test(na.appName);
    detect.isIE6 = detect.isIE && /MSIE [56]/i.test(ua);
    detect.isIE7 = detect.isIE && /MSIE [567]/i.test(ua);
    detect.isOldIE = detect.isIE && /MSIE [5678]/i.test(ua);
    detect.ieVersion = parseInt(match[2], 10); // 사용법: if (browser.isIE && browser.version > 8) { // 9이상인 ie브라우저

    detect.isWin = na.appVersion.indexOf("Win") != -1;
    detect.isMac = ua.indexOf("Mac") !== -1;
    detect.isLinux = na.appVersion.indexOf("Linux") != -1;

    detect.isChrome = ua.indexOf("Chrome") !== -1;
    detect.isGecko = ua.indexOf("Firefox") !== -1;
    detect.isAir = /adobeair/i.test(ua);
    detect.isIOS = /(iPad|iPhone)/.test(ua);
    detect.isSafari = !detect.isChrome && /Safari/.test(ua);
    detect.isIETri4 = detect.isIE && ua.indexOf("Trident/4.0") !== -1;

    detect.msPointer = na.msPointerEnabled && na.msMaxTouchPoints && !win.PointerEvent;
    detect.pointer = (win.PointerEvent && na.pointerEnabled && na.maxTouchPoints) || detect.msPointer;

    detect.isNotSupporte3DTransform = /android 2/i.test(lua);
    detect.isGingerbread = /android 2.3/i.test(lua);
    detect.isIcecreamsandwith = /android 4.0/i.test(lua);
    detect.hash = window.location.hash;

    if (detect.isAndroid) {
      detect.androidVersion = (function (match) {
        if (match) {
          return match[1] | 0;
        } else {
          return 0;
        }
      })(lua.match(/android ([\w.]+)/));
    } else if (detect.isIOS) {
      detect.iosVersion = (function (match) {
        if (match) {
          return match[1] | 0;
        } else {
          return 0;
        }
      })(ua.match(/OS ([[0-9]+)/));
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
  core.event = (function () {
    var evt = {
      init: function () {
        var Event = {
          screen: "scroll resize orientationchange",
          wheel: "wheel",
        };
        core.$doc.ready(this.ready); // jquery 3.x 대응
        core.$win.on("load", this.load);
        document.addEventListener("DOMContentLoaded", this.ready);
        window.addEventListener("load", this.load);
        core.$win.on(Event.screen, this.screen);
        core.$win.on(Event.wheel, this.wheel);
      },
      ready: function () {
        core.$body = $("body");
        core.observer.notify("READY");
        core.observer.notify("SCROLL", false);
        core.observer.notify("RESIZE", false);

        evt.initUI();
      },
      load: function () {
        core.observer.notify("LOAD");
      },
      screen: function (e) {
        var e = e.type.toUpperCase();
        core.observer.notify(e);
      },
      wheel: function (e) {
        var delta = e.originalEvent.deltaY < 0 ? 100 : -100;
        if (delta > 0) {
          core.observer.notify("WHEEL_UP", { dir: -1 });
        } else {
          core.observer.notify("WHEEL_DOWN", { dir: 1 });
        }

        if (core.browser.ieScrollBug) {
          e.preventDefault();
          var left = context.pageXOffset;
          var top = context.pageYOffset - delta;

          context.scrollTo(left, top);
        }
      },
      initUI: function () {
        var ui = core.ui,
          ins = document.body._ui || {};

        for (var name in ui) {
          if (ui[name].init && !ins[name]) {
            ui[name].init();
            ins[name] = true;
          }
        }
      },
    };
    evt.init();
  })();

  /*	core.ui
	 *	@param {String} name
	 *	@param {String} selector
	 *	@paran {Object} option
	 
	 *	ui(name, selector);
	 *	return ui.events.public
	 */
  core.ui = function (name, container, option) {
    if (!core.ui[name]) throw new Error("not ui " + name);
    var $container = $(container).filter(function () {
        return this.parentElement.nodeName !== "PRE";
      }),
      length = 0,
      supr = [];

    $container.each(function () {
      this._ui = this._ui || {};

      var hasUI = this._ui[name];
      if (hasUI) {
        //이미 UI 구성됐을경우 새로 선언한 변수에 기존에 있는 public 담아줌
        //console.dir('already created UI : '+name);
        supr.push(hasUI);
      } else {
        var UI = new core.ui[name](this, option);
        UI.events._init();
        this._ui[name] = UI.events.public || "undefined public";
        supr.push(this._ui[name]);
      }

      ++length;
    });

    if (length == 1) supr = supr[0];
    return supr;
  };

  /*	@@core.Selector
	 *	var selector = core.Selector(".layer",{
			body : ".body",
			close : ".btn_close"
		});
		selector.$container = $(".layer");
		selector.$body = $(".layer").find(".body");
		selector.$close = $(".layer").find(".btn_close");
	 */
  core.Selector = function (container, selector) {
    function modeling() {
      for (var i in selector) {
        selectors[i] = selectors.container.find(selector[i]);
      }
    }
    var selectors = { container: $(container) };

    modeling();

    selectors._dataSet = selectors.container.data();
    selectors.reInit = function () {
      modeling();
    };
    return selectors;
  };

  core.DataSet = function (dataSet, opts) {
    function modeling() {
      for (var key in dataSet) {
        if (dataSet[key].constructor === Object) {
          opts[key] = opts[key] || {};
          for (var i in dataSet[key]) {
            opts[key][i] = dataSet[key][i];
          }
        } else {
          opts[key] = dataSet[key];
        }
      }
    }
    modeling();
    opts.reInit = function () {
      modeling();
    };
    return opts;
  };

  core.Data = function (_orgData, _data) {
    // var options = _data || _orgData,
    // data = {};

    // Object.keys(_orgData).map(function(key, index){
    // data[key] = options[key] || _orgData[key];
    // });
    // var a = $.extend({}, _orgData, _data)

    // console.dir(_data);
    // console.dir(a);

    return $.extend({}, _orgData, _data);
  };
})(this, jQuery);

(function ($, core, ui, undefined) {
  ui.accordion = function (el, extned) {
    var $accordionRow = $(el),
      _close,
      options = {
        clickredClass: "active",
      };

    this.events = {
      _init: function () {
        const variable = typeof extned === "object" ? extned.num : extned;

        el.parentElement.children[variable].getElementsByClassName("N-pdt-accordion-tit")[0].classList.add(options.clickredClass);
        $(el.parentElement.children[variable]).find(".N-pdt-accordion-cont").slideDown(400);

        if (extned.flag) {
          const self = this;
          setTimeout(function () {
            self.moveAnchor(variable);
          }, 500);
        }

        if (el.getElementsByClassName("opener")[0].classList.contains(options.clickredClass)) {
          el.getElementsByClassName("N-pdt-accordion-cont")[0].style.display = "block";
          el.getElementsByClassName("opener")[0].classList.add(options.clickredClass);
          ui.Event.wa(el.getElementsByClassName("opener")[0], options.clickredClass);
        }
        this.bindEvent();
        _close = this.close;
      },
      bindEvent: function () {
        $accordionRow.find(".opener").on("click", this.opener);
      },
      opener: function () {
        if (el.getElementsByClassName("opener")[0].classList.contains(options.clickredClass)) {
          _close();

          return;
        }
        el.getElementsByClassName("opener")[0].classList.add(options.clickredClass);
        ui.Event.wa(el.getElementsByClassName("opener")[0], options.clickredClass);
        $accordionRow.find(".N-pdt-accordion-cont").slideDown(400);
      },
      close: function () {
        $accordionRow.find(".N-pdt-accordion-cont").slideUp(400, function () {
          el.getElementsByClassName("opener")[0].classList.remove(options.clickredClass);
          ui.Event.wa(el.getElementsByClassName("opener")[0], options.clickredClass);
        });
      },
      moveAnchor: function (num) {
        const Y = el.parentElement.children[num].offsetTop;

        $j("html, body").stop().animate({ scrollTop: Y }, 200);
      },
    };
  };

  ui.dynamic = function (el) {
    var $d = $(el),
      $dEvent = $d.find("a"),
      itemImg = $dEvent.find(".icon img")[0],
      itemMosion = $dEvent.find(".tit");

    this.events = {
      _init: function () {
        if ($d.length < 1) {
          return;
        }
        $dEvent.on("mouseenter", function () {
          itemMosion.css("left", itemImg.offsetWidth + 50);
        });

        $dEvent.on("mouseleave", function () {
          itemMosion.css("left", 24);
        });
      },
    };
  };

  ui.sns = function (el) {
    var options = {
      clickredClass: "active",
    };

    this.events = {
      _init: function () {
        this._bindEvent();
        ui.Event.wa(el, options.clickredClass);
      },
      _bindEvent: function () {
        el.addEventListener("click", function () {
          this.classList.toggle(options.clickredClass);
          ui.Event.dToggle(this, options.clickredClass);
        });
        el.addEventListener("mouseenter", function () {
          el.classList.add(options.clickredClass);
          ui.Event.dBlock(this.nextElementSibling);
          ui.Event.wa(el, options.clickredClass);
        });
        el.parentNode.addEventListener("mouseleave", function () {
          el.classList.remove(options.clickredClass);
          ui.Event.dNone(el.nextElementSibling);
          ui.Event.wa(el, options.clickredClass);
        });
      },
    };
  };

  ui.popLayer = function (el) {
    this.events = {
      _init: function () {
        this._bindEvent();
      },
      _bindEvent: function () {
        var dataId = document.getElementById(el.dataset.id),
          dataTitle = el.dataset.title,
          _this = null;

        el.addEventListener("click", function () {
          _this = this;
          ui.Event.dBlock(dataId);
          dataId.childNodes[1].innerText = dataTitle + " 채널보기";
          ui.Event.wafocus(dataId, true);

          dataId.getElementsByClassName("N-pop-close")[0].addEventListener("click", function () {
            ui.Event.dNone(dataId);
            ui.Event.wafocus(_this, dataId);
          });
        });
      },
    };
  };

  ui.sliderImpat = function (el) {
    this.events = {
      _init: function () {
        this._slider();
      },
      _slider: function () {
        var maxNum = 3;
        if (el.querySelectorAll(".N-pdt-compare-column").length <= 3) {
          return;
        }

        $(el).wrap('<div class="N-pdt-compare-slider"></div>');
        $(el).bxSlider({
          auto: false,
          maxSlides: maxNum,
          slideMargin: 16,
          slideWidth: 210,
          hideControlOnEnd: true,
          adaptiveHeight: true,
          infiniteLoop: false,
          touchEnabled: false,
          onSlideAfter: function () {
            if (this.getCurrentSlide() == Math.floor(this.getSlideCount() / maxNum)) {
              var total = this.getSlideCount();

              for (var i = 0; i < maxNum - 1; i++) {
                --total;
                this.getSlideElement(total - 1).attr("aria-hidden", false);
              }
            }
          },
        });
      },
    };
  };

  ui.Event = {
    dBlock: function (t) {
      t.style.display = "block";
    },
    dNone: function (t) {
      t.style.display = "none";
    },
    dToggle: function (t, clickredClass) {
      var hasClass = t.classList.contains(clickredClass);

      if (!hasClass) {
        ui.Event.dNone(t.nextElementSibling);
        ui.Event.wa(t, clickredClass);
      } else {
        ui.Event.dBlock(t.nextElementSibling);
        ui.Event.wa(t, clickredClass);
      }
    },
    wa: function (t, clickredClass) {
      var hasClass = t.classList.contains(clickredClass),
        getData = {};

      getData.title = "하위메뉴 열기";
      getData.alt = " 열기";

      if (!hasClass) {
        getData.title = "하위메뉴 열기";
        getData.alt = " 열기";
      } else {
        getData.title = "하위메뉴 닫기";
        getData.alt = " 닫기";
      }

      typeof t.dataset.title == "undefined" ? t.setAttribute("title", getData.title) : t.setAttribute("title", t.dataset.title + getData.alt);

      return getData;
    },
    wafocus: function (t, tabFleg) {
      tabFleg === true ? t.setAttribute("tabindex", 0) : tabFleg.removeAttribute("tabindex");
      t.focus();
    },
    accordionMove: function (el, index, timer) {
      $(el).on("click", function () {
        var target = $(".N-pdt-accordion-column").eq(index);

        if (target.length > 0) {
          $("html, body").animate({ scrollTop: target.offset().top - 110 }, timer ? timer : 300);
          if (!target.find(".N-pdt-accordion-tit").hasClass("active")) {
            setTimeout(
              function () {
                target.find(".N-pdt-accordion-tit").trigger("click");
              },
              timer ? timer : 300
            );
          }
        }
        return false;
      });
    },
  };

  core.observer.on("READY", function () {
    ui("accordion", ".N-pdt-accordion-column", 0);
    ui("dynamic", ".N-compare-dynamic");
    ui("sns", ".N-head-btn-column .opener");
    ui("popLayer", ".pop-start");
    ui("sliderImpat", ".N-pdt-compare-section");

    /* (아코디언)요금안내 내 Y덤 내용 관련 - QR코드 레이어 팝업 */
    $(".y-bonus-qr_button").each(function () {
      var ybonusTrigger = $(this),
        ybonusQRlayer = ybonusTrigger.attr("href");

      ybonusTrigger.on("click", function () {
        $(ybonusQRlayer).addClass("active").focus();
        return false;
      });

      $(".y-bonus-qr_close").on("click", function () {
        $(ybonusQRlayer).removeClass("active");
        ybonusTrigger.focus();
        return false;
      });
    });
    /* // (아코디언)요금안내 내 Y덤 내용 관련 - QR코드 레이어 팝업 */
  });
})(jQuery, window[APP_NAME], window[APP_NAME].ui);
