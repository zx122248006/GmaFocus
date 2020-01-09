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
        imgWidth: '800px',
        imgHeight: '500px',
        showBtn: 'true'
      }
      this.options = $.extend({}, this.defaults, option)


    }

    GmaFocus () {
      let $index = 0; //定义索引数
      let $this = this.elemnet //便于调用元素
      let $options = this.options //便于调用options

      let $liNum = $this.innerLi.length //获取li的数量
      let $imgWidth = parseInt($options.imgWidth) //获取图片的宽度，并且取整
      let $ulwidth = $liNum * $imgWidth//设置ul的宽度为li的数量*li的宽度


      let test = {
        b: {
          liNum: $liNum,
          imgWidth: $imgWidth,
          ulwidth: $ulwidth
        }
      }



      console.log($options)

      $options = $.extend({}, $options, test)

      console.log($options)

      setStyle($this, $options, $ulwidth)
      setBtn($this, $options)

    }
  }


  //根据li宽高设置ul的宽度
  function setStyle (element, options, ulwidth) {

    // 设置共同的样式

    // 根据图片一张图片宽度设置展示页面框的大小
    element.Gma_wrap.css('width', options.imgWidth)

    // 设置图片及其容器的大小（由于图片宽高随li改变，所以只设置li的宽高）
    element.innerLi.css({
      'width': options.imgWidth + 'px',
      'height': options.imgHeight
    })

    if (options.effect == 'slide') {   // 当切换效果为slide时，设置的样式

      //根据图片数量设置ul的宽度
      element.centerbox.css('width', ulwidth)

    } else if (options.effect == 'fade') { //当切换效果为fade时，设置的样式

      element.Gma_wrap.css({
        'position': 'relative'
      });

      //与slide不同，fade效果下centerbox的宽度与li的宽高应该相同。
      element.centerbox.css({
        'width': options.imgWidth,
        'height': options.imgHeight
      })

      element.innerLi.css({
        'position': 'absolute',
        'display': 'none'
      })

      element.innerLi.eq(0).fadeIn();
    }

  }

  // 判断是否显示切换按钮，及点击切换按钮
  function setBtn (element, options) {
    let i = 0;

    let $prev = element.Gma_wrap.find('.prev'); //在动态增加切换按钮之后获取切换按钮
    let $next = element.Gma_wrap.find('.next');

    if (options.showBtn) {
      element.Gma_wrap.hover(
        function () {
          btnHover($prev, $next, 0.8)
        },
        function () {
          btnHover($prev, $next, 0.0)
        }
      )

      $next.click(function () {
        let $liNum = element.innerLi.length //获取li的数量
        if (!element.centerbox.is(':animated')) {
          i++;
          if (i > $liNum - 1) {
            i = 0;
            changeto(i, element, options);
          } else {
            changeto(i, element, options);
          }
        }
        console.log('1')
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
        console.log('2')
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




  $.fn.GmaFocus = function (options) {
    // let Focus = new Gma_Focus(this, options);

    let Focus = new Basic(this, options);

    Focus.GmaFocus();
  }
})(jQuery);

