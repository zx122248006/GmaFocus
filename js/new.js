/*******
 * @authors zx122248006
 * @date    2020年2月21日
 * @copy    Copyright © Powered by zx122248006
 * @v 2.0
 ********/
;
(function ($) {
  class Gma_Focus {
    constructor(element, option) {
      this.ele = {
        Gma_wrap: element,
        centerbox: element.find('.centerbox'),
        innerLi: element.find('.centerbox li')
      };

      this.defaults = {
        effect: 'slide', // 切换效果
        imgWidth: 800,  // 轮播宽度
        imgHeight: 500, // 轮播高度
        showBtn: true, // 是否显示切换按钮
        showIndex: true, // 是否显示切换索引
        switchTime: 3000, // 切换时间
        effectTime: 500, // 切换速度
        styleComplete: false, // 用于判断是否处理完样式
        autoWidth: false // 用于判断是否需要根据外部的div自适应宽高
      };

      this.options = $.extend({}, this.defaults, option);

      this.otherOptions = {
        iColorName: 'on', // 切换索引样式
        liNum: this.ele.innerLi.length, // 获取li的个数
        ulWidth: this.ele.innerLi.length * this.defaults.imgWidth, // 根据li的个数乘以图片的宽度，获取ul的总宽度
        $index: 0, // 设置控制系数，用于轮播自增自减
        $time: 'none' // 用于存储定时器
      }

      this.options = $.extend({}, this.options, this.otherOptions);

    }

    // 设置样式
    setStyle () {
      let ele = this.ele;
      let opt = this.options;

      // 设置自动宽高可能还有问题
      if (opt.autoWidth) {
        // 使得img的宽高根据Gma_Focus外的元素的宽高进行设置,如果外部不使用百分比，则有可能需要刷新之后，才能呈现效果
        opt.imgWidth = ele.Gma_wrap.parent().width();
        opt.imgHeight = ele.Gma_wrap.parent().height();
        opt.ulWidth = opt.liNum * opt.imgWidth;
      }

      ele.Gma_wrap.css('width', opt.imgWidth)
      ele.innerLi.css({
        'width': opt.imgWidth,
        'height': opt.imgHeight
      })

      if (opt.effect == 'slide') {   // 当切换效果为slide时，设置的样式
        //根据图片数量设置ul的宽度
        ele.centerbox.css('width', opt.ulWidth)

      } else if (opt.effect == 'fade') { //当切换效果为fade时，设置的样式

        ele.Gma_wrap.css({
          'position': 'relative'
        });
        //与slide不同，fade效果下centerbox的宽度与li的宽高应该相同。
        ele.centerbox.css({
          'width': opt.imgWidth,
          'height': opt.imgHeight
        })
        ele.innerLi.css({
          'position': 'absolute',
          'display': 'none'
        })

        ele.innerLi.eq(0).fadeIn();
      }

    }

    // 鼠标移入轮播范围时，显示/隐藏切换按钮
    btnHover (prev, next, opacityVal) {
      prev.stop(true, true).animate({
        'opacity': opacityVal
      });
      next.stop(true, true).animate({
        'opacity': opacityVal
      })
    }

    // 切换按钮
    setBtnClick () {
      let $this = this;
      let ele = this.ele;
      let opt = this.options;
      let $prev = ele.Gma_wrap.find('.prev'); //在动态增加切换按钮之后获取切换按钮
      let $next = ele.Gma_wrap.find('.next');

      ele.Gma_wrap.hover(
        function () {
          $this.btnHover($prev, $next, 0.8)
        },
        function () {
          $this.btnHover($prev, $next, 0.0)
        }
      )

      $next.click(function () {
        if (!ele.centerbox.is(':animated') && !ele.innerLi.is(':animated')) {
          opt.$index++;
          if (opt.$index > opt.liNum - 1) {
            opt.$index = 0;
            $this.changeto();
          } else {
            $this.changeto();
          }
        }
      })

      $prev.click(function () {
        if (!ele.centerbox.is(':animated') && !ele.innerLi.is(':animated')) {
          opt.$index--;
          if (opt.$index < 0) {
            opt.$index = opt.liNum - 1;
            $this.changeto();
          } else {
            $this.changeto();
          }
        }
      })
    }

    // 处理切换
    changeto () {
      // 由于存在点击切换按钮和索引按钮，需要使用传参的方式获取当前的是第几个。来进行移动
      let ele = this.ele;
      let opt = this.options;
      let $go = opt.$index * opt.imgWidth; // 设置移动的值
      let $fbtn = ele.Gma_wrap.find('.fbtn ul li');

      if (opt.effect == 'slide') { //判断切换的效果为slide时
        ele.centerbox.animate({
          left: '-' + $go
        }, opt.effectTime);
      } else if (opt.effect == 'fade') { //判断切换效果为fade时
        ele.innerLi.eq(opt.$index).fadeIn(opt.effectTime).siblings().fadeOut(opt.effectTime)
      }

      $fbtn.removeClass(opt.iColorName).eq(opt.$index).addClass(opt.iColorName);
    }

    // 设置索引按钮及点击时的状况
    setShowIndex () {
      let $this = this;
      let ele = this.ele;
      let opt = this.options;
      // 显示索引，动态增加索引栏目
      ele.Gma_wrap.append('<div class="fbtn"></div>').find('.fbtn').append('<ul></ul>');

      for (let i = 0; i < opt.liNum; i++) {
        if (i == 0) {
          // 为第一个索引设置不同的样式
          ele.Gma_wrap.find('.fbtn ul').append('<li class="' + opt.iColorName + '"><a href="javascript:void(0)"></a></li>');
        } else {
          ele.Gma_wrap.find('.fbtn ul').append('<li><a href="javascript:void(0)"></a></li>');
        }
      }

      let $sIndexLi = ele.Gma_wrap.find('.fbtn ul li');

      // 当鼠标在切换索引时的效果
      $sIndexLi.on('click', function () {
        let index = $(this).index();

        // 返回改变的i值
        opt.$index = index;
        $this.changeto();
      });

    }

    // 自动循环
    autoMove (status) {
      let opt = this.options;
      if (status == 'move') {
        this.setTime()
      }

      if (status == 'stop') {
        // console.log('stop')
        this.clearTime()
      }
      // 触发自身之后，将styleComplete设置为true
      // 用于鼠标移入移出时，定时器的控制
      opt.styleComplete = true;
    }

    // 鼠标移入移除控制定时器
    intChange () {
      let $this = this;
      let opt = this.options;

      if (opt.styleComplete) {
        this.ele.Gma_wrap.hover(function () {
          $this.autoMove('stop')
        }, function () {
          $this.autoMove('move')
        })
      }
    }

    // 设置定时器
    setTime () {
      let $this = this;
      let opt = this.options;

      opt.$time = setInterval(() => {
        opt.$index++;
        if (opt.$index > opt.liNum - 1) {
          opt.$index = 0;
          $this.changeto()
        } else {
          $this.changeto()
        }
      }, opt.switchTime)
    }

    // 清除定时器
    clearTime () {
      clearInterval(this.options.$time)
    }

    // 当页面不显示时，停止计时器
    onVisbChange () {
      let $this = this;
      document.onvisibilitychange = function () {

        if (document.hidden == true || document.visibilityState == 'hidden') {
          $this.autoMove('stop')
        }

        if (document.hidden == false || document.visibilityState == 'visible') {
          $this.autoMove('move')
        }
      }
    }

    // 对一些选项进行判断。设置为其他的值
    setOptions () {
      let opt = this.options;

      if (opt.liNum == 1) {
        opt.autoMove = false;
        opt.showBtn = false;
        opt.showIndex = false;
      }

      if (opt.liNum == 2) {
        opt.effect = 'fade';
        opt.showIndex = false;
      }

      if (opt.switchTime <= 2000) {
        opt.switchTime = 2500;
      }
    }

    Focus () {
      let opt = this.options;
      this.setStyle();
      this.setOptions();

      if (opt.autoMove == true) {
        this.autoMove('move')
        if (opt.styleComplete == true) {
          setTimeout(() => {
            this.intChange()
          }, 0);
        }
      };

      if (opt.showIndex == true) {
        this.setShowIndex()
      };

      if (opt.showBtn == true) {
        this.setBtnClick()
      };

      this.onVisbChange();
    }
  }

  $.fn.GmaFocus = function (options) {
    // 通过实例化，将页面中的预置参数传递到类中
    let Gma = new Gma_Focus(this, options);
    Gma.Focus();
  }
})(jQuery);



