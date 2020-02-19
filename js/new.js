;
(function ($) {
  // // 定义构造函数，设置默认值
  // let Gma_Focus = function (element, option) {
  //   this.elemnet = element;
  //   this.defaults = {
  //     effect: 'slide',
  //     imgWidth: '800px',
  //     imgHeight: '500px',
  //   }
  //   this.options = $.extend({}, this.defaults, option)
  // }

  // // 实例化
  // Gma_Focus.prototype = {
  //   Gma_Focus: function () {
  //     let i = 0; //定义索引数
  //     let $this = this.elemnet //便于调用元素
  //     let $options = this.options //便于调用options

  //     let $liNum = $this.find('.centerbox li').length //获取li的数量
  //     let $imgWidth = parseInt(this.options.imgWidth) //获取图片的宽度，并且取整
  //     let $ulwidth = $liNum * $imgWidth//设置ul的宽度为li的数量*li的宽度

  //     setStyle($this, $options, $ulwidth)

  //   }
  // }

  class Basic {
    constructor(element, option) {
      this.elemnet = {
        Gma_wrap: element,
        centerbox: element.find('.centerbox'),
        innerLi: element.find('.centerbox li')
      }

      this.defaults = {
        effect: 'slide',
        imgWidth: '800',
        imgHeight: '500',
        showBtn: 'true',
        switchTime: '500',
        iColorName: 'on',
        showIndex: 'true'
      }
      // 将默认值和传递过来的选项合并
      this.options = $.extend({}, this.defaults, option)


    }

    GmaFocus () {
      let $this = this.elemnet //便于调用元素
      let $options = this.options //便于调用options

      let $liNum = $this.innerLi.length //获取li的数量
      let $imgWidth = parseInt($options.imgWidth) //获取图片的宽度，并且取整
      let $ulwidth = $liNum * $imgWidth//设置ul的宽度为li的数量*li的宽度

      // 测试
      let test = {
        b: {
          liNum: $liNum,
          imgWidth: $imgWidth,
          $index: 0,
          $time: 0
        }
      }

      // 将测试选项合并到之前的设置中
      $options = $.extend({}, $options, test)

      // 调用设置样式的方法
      // setStyle($this, $options, $ulwidth)
      // 调用左右切换的方法
      // btnClick($this, $options)

      if ($options.showIndex) {
        setBtn($this, $options)
      }


      // document.onvisibilitychange = function () {
      //   console.log("hidden" + ":" + document.hidden);
      //   console.log("visibilityState" + ":" + document.visibilityState);
      // }

      // autoMove($this, $options, 'move')
      // intChange($this, $options)

      if ($options.b.liNum == 1) {
        // $options.autoMove = 'flase';
        $options.showBtn = 'flase'
        // $options.showIndex = 'flase'
      }
    }




  }

  class Basic1 {
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
        styleComplete: false // 用于判断是否处理完样式
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
        console.log('move')
        this.setTime()
      }

      if (status == 'stop') {
        console.log('stop')
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


  // //根据li宽高设置ul的宽度
  // function setStyle (ele, options, ulwidth) {

  //   // 设置共同的样式

  //   // 根据图片一张图片宽度设置展示页面框的大小
  //   ele.Gma_wrap.css('width', options.imgWidth)

  //   // 设置图片及其容器的大小（由于图片宽高随li改变，所以只设置li的宽高）
  //   ele.innerLi.css({
  //     'width': options.imgWidth,
  //     'height': options.imgHeight
  //   })

  //   if (options.effect == 'slide') {   // 当切换效果为slide时，设置的样式
  //     //根据图片数量设置ul的宽度
  //     ele.centerbox.css('width', ulwidth)

  //   } else if (options.effect == 'fade') { //当切换效果为fade时，设置的样式

  //     ele.Gma_wrap.css({
  //       'position': 'relative'
  //     });

  //     //与slide不同，fade效果下centerbox的宽度与li的宽高应该相同。
  //     ele.centerbox.css({
  //       'width': options.imgWidth,
  //       'height': options.imgHeight
  //     })

  //     ele.innerLi.css({
  //       'position': 'absolute',
  //       'display': 'none'
  //     })

  //     ele.innerLi.eq(0).fadeIn();
  //   }
  // }

  // // 判断是否显示切换按钮，及点击切换按钮
  // function btnClick (ele, opt) {

  //   let $prev = ele.Gma_wrap.find('.prev'); //在动态增加切换按钮之后获取切换按钮
  //   let $next = ele.Gma_wrap.find('.next');
  //   let $liNum = ele.innerLi.length //获取li的数量

  //   if (opt.showBtn == 'true') {
  //     ele.Gma_wrap.hover(
  //       function () {
  //         btnHover($prev, $next, 0.8)
  //       },
  //       function () {
  //         btnHover($prev, $next, 0.0)
  //       }
  //     )
  //     $next.click(function () {
  //       if (!ele.centerbox.is(':animated')) {
  //         opt.b.$index++;
  //         if (opt.b.$index > $liNum - 1) {
  //           opt.b.$index = 0;
  //           changeto(opt.b.$index, ele, opt);
  //         } else {
  //           changeto(opt.b.$index, ele, opt);
  //         }
  //       }
  //     })

  //     $prev.click(function () {
  //       if (!ele.centerbox.is(':animated')) {
  //         opt.b.$index--;
  //         if (opt.b.$index < 0) {
  //           opt.b.$index = $liNum - 1;
  //           changeto(opt.b.$index, ele, opt);
  //         } else {
  //           changeto(opt.b.$index, ele, opt);
  //         }
  //       }
  //     })
  //   }
  // }


  // // 设置定时器
  // function autoMove (ele, opt, status) {

  //   if (status == 'move') {
  //     console.log('move')
  //     opt.b.$time = setInterval(() => {
  //       opt.b.$index++;
  //       if (opt.b.$index > opt.b.liNum - 1) {
  //         opt.b.$index = 0;
  //         changeto(opt.b.$index, ele, opt);
  //       } else {
  //         changeto(opt.b.$index, ele, opt);
  //       }
  //     }, 3000);
  //   }

  //   if (status == 'stop') {
  //     console.log('stop')
  //     clearInterval(opt.b.$time)
  //   }
  // }


  // // 计时器停止与启动
  // function intChange (ele, opt) {

  //   ele.Gma_wrap.hover(function () {
  //     console.log('停止定时器')
  //     autoMove(ele, opt, 'stop')
  //   }, function () {
  //     console.log('设置定时器')
  //     autoMove(ele, opt, 'move')
  //   })

  // }


  // // 鼠标移入轮播范围时，显示/隐藏切换按钮
  // function btnHover (prev, next, opacityVal) {

  //   prev.stop(true, true).animate({
  //     'opacity': opacityVal
  //   });
  //   next.stop(true, true).animate({
  //     'opacity': opacityVal
  //   })
  // }

  // function changeto (num, ele, opt) {
  //   // let $fbtn = ele.innerLi; // 获取切换索引
  //   let $go = num * opt.imgWidth; // 设置移动的值

  //   let $fbtn = ele.Gma_wrap.find('.fbtn ul li');

  //   if (opt.effect == 'slide') { //判断切换的效果为slide时

  //     ele.centerbox.animate({
  //       left: '-' + $go
  //     }, opt.clickTime);

  //   } else if (opt.effect == 'fade') { //判断切换效果为fade时
  //     ele.innerLi.eq(num).fadeIn().siblings().fadeOut()
  //   }
  //   $fbtn.removeClass(opt.iColorName).eq(num).addClass(opt.iColorName);
  // }

  // function setBtn (ele, opt) {

  //   // 显示索引，动态增加索引栏目
  //   ele.Gma_wrap.append('<div class="fbtn"></div>').find('.fbtn').append('<ul></ul>');

  //   $liNum = ele.innerLi.length;
  //   for (let i = 0; i < $liNum; i++) {
  //     if (i == 0) {
  //       // 为第一个索引设置不同的样式
  //       ele.Gma_wrap.find('.fbtn ul').append('<li class="' + opt.iColorName + '"><a href="javascript:void(0)"></a></li>');
  //     } else {
  //       ele.Gma_wrap.find('.fbtn ul').append('<li><a href="javascript:void(0)"></a></li>');
  //     }
  //   }

  //   let $sIndexLi = ele.Gma_wrap.find('.fbtn ul li');

  //   // 当鼠标在切换索引时的效果
  //   $sIndexLi.on('click', function () {
  //     let index = $(this).index();
  //     changeto(index, ele, opt);
  //     $sIndexLi.removeClass(opt.iColorName).eq(index).addClass(opt.iColorName);

  //     // 返回改变的i值
  //     return opt.b.$index = index;
  //   });

  // }

  $.fn.GmaFocus = function (options) {
    // let Focus = new Gma_Focus(this, options);

    // 通过实例化，将页面中的预置参数传递到类中
    // let Focus = new Basic(this, options);
    let Fo = new Basic1(this, options);
    Fo.Focus();
    // Focus.GmaFocus();
  }
})(jQuery);



