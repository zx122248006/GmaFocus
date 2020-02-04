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
        clickTime: '500',
        iColorName: 'on',
        showIndex: 'true'
      }
      // 将默认值和传递过来的选项合并
      this.options = $.extend({}, this.defaults, option)


    }

    GmaFocus () {
      // var $index = 0; //定义索引数
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
          ulwidth: $ulwidth,
          $index: 0
        }
      }

      // 将测试选项合并到之前的设置中
      $options = $.extend({}, $options, test)

      console.log($options)

      // 调用设置样式的方法
      setStyle($this, $options, $ulwidth)

      // 调用左右切换的方法
      btnClick($this, $options)

      if ($options.showIndex) {
        setBtn($this, $options)
      }

    }
  }

  //根据li宽高设置ul的宽度
  function setStyle (ele, options, ulwidth) {

    // 设置共同的样式

    // 根据图片一张图片宽度设置展示页面框的大小
    ele.Gma_wrap.css('width', options.imgWidth)

    // 设置图片及其容器的大小（由于图片宽高随li改变，所以只设置li的宽高）
    ele.innerLi.css({
      'width': options.imgWidth,
      'height': options.imgHeight
    })

    if (options.effect == 'slide') {   // 当切换效果为slide时，设置的样式
      //根据图片数量设置ul的宽度
      ele.centerbox.css('width', ulwidth)

    } else if (options.effect == 'fade') { //当切换效果为fade时，设置的样式

      ele.Gma_wrap.css({
        'position': 'relative'
      });

      //与slide不同，fade效果下centerbox的宽度与li的宽高应该相同。
      ele.centerbox.css({
        'width': options.imgWidth,
        'height': options.imgHeight
      })

      ele.innerLi.css({
        'position': 'absolute',
        'display': 'none'
      })

      ele.innerLi.eq(0).fadeIn();
    }

  }

  // 判断是否显示切换按钮，及点击切换按钮
  function btnClick (ele, opt) {
    let i = 0;



    let $prev = ele.Gma_wrap.find('.prev'); //在动态增加切换按钮之后获取切换按钮
    let $next = ele.Gma_wrap.find('.next');

    if (opt.showBtn) {
      ele.Gma_wrap.hover(
        function () {
          btnHover($prev, $next, 0.8)
        },
        function () {
          btnHover($prev, $next, 0.0)
        }
      )

      $next.click(function () {

        let $liNum = ele.innerLi.length //获取li的数量
        if (!ele.centerbox.is(':animated')) {
          opt.b.$index++;
          if (opt.b.$index > $liNum - 1) {
            opt.b.$index = 0;
            changeto(opt.b.$index, ele, opt);
          } else {
            changeto(opt.b.$index, ele, opt);
          }
        }
      })

      $prev.click(function () {
        // if (!$centerbox.is(':animated')) {
        //   i++;
        //   if (i > $liNum - 1) {
        //     i = 0;
        //     changeto(i);
        //   } else {
        //     changeto(i);
        //   }
        // }
      })
    }
  }

  // 鼠标移入轮播范围时，显示/隐藏切换按钮
  function btnHover (prev, next, opacityVal) {
    prev.stop(true, true).animate({
      'opacity': opacityVal
    });
    next.stop(true, true).animate({
      'opacity': opacityVal
    })
  }

  function changeto (num, ele, opt) {
    // let $fbtn = ele.innerLi; // 获取切换索引
    let $go = num * opt.imgWidth; // 设置移动的值

    let $fbtn = ele.Gma_wrap.find('.fbtn ul li');

    if (opt.effect == 'slide') { //判断切换的效果为slide时

      ele.centerbox.animate({
        left: '-' + $go
      }, opt.clickTime);

    } else if (opt.effect == 'fade') { //判断切换效果为fade时
      ele.innerLi.eq(num).fadeIn().siblings().fadeOut()
    }
    $fbtn.removeClass(opt.iColorName).eq(num).addClass(opt.iColorName);
  }

  function setBtn (ele, opt) {




    // 显示索引，动态增加索引栏目
    ele.Gma_wrap.append('<div class="fbtn"></div>').find('.fbtn').append('<ul></ul>');

    $liNum = ele.innerLi.length;
    for (let i = 0; i < $liNum; i++) {
      if (i == 0) {
        ele.Gma_wrap.find('.fbtn ul').append('<li class="' + opt.iColorName + '"><a href="javascript:void(0)"></a></li>');
      } else {
        ele.Gma_wrap.find('.fbtn ul').append('<li><a href="javascript:void(0)"></a></li>');
      }
    }

    let $fbtn = ele.Gma_wrap.find('.fbtn ul li');

    // 当鼠标在切换索引时的效果
    $fbtn.on('click', function () {
      let index = $(this).index();
      changeto(index, ele, opt);
      $fbtn.removeClass(opt.iColorName).eq(index).addClass(opt.iColorName);


      console.log(opt.b.$index)
      // 返回改变的i值
      return opt.b.$index = index;
    });

  }

  $.fn.GmaFocus = function (options) {
    // let Focus = new Gma_Focus(this, options);

    // 通过实例化，将页面中的预置参数传递到类中
    let Focus = new Basic(this, options);

    Focus.GmaFocus();
  }
})(jQuery);

