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





  
  //根据li宽高设置ul的宽度
  function setStyle (element, options, ulwidth) {

    // 共同设置的样式



    if (options.effect == 'slide') {   // 当切换效果为slide时，设置的样式

      // 根据图片一张图片宽度设置展示页面框的大小
      element.css('width', options.imgWidth)

      //根据图片数量设置ul的宽度
      element.find('.centerbox').css('width', ulwidth)

      // 设置图片及其容器的大小（由于图片宽高随li改变，所以只设置li的宽高）
      element.find('.centerbox li').css({
        'width': options.imgWidth,
        'height': options.imgHeight
      })

    } else if (options.effect == 'fade') { //当切换效果为fade时，设置的样式

      element.css({
        'position': 'relative',
        'width': options.imgWidth
      });

      element.find('.centerbox').css({
        'width': options.imgWidth,
        'height': options.imgHeight
      })

      element.find('.centerbox li').css({
        'position': 'absolute',
        'width': options.imgWidth,
        'height': options.imgHeight,
        'display': 'none'
      })

      element.find('.centerbox li').eq(0).fadeIn();

    }

  }

  class Basic {
    constructor(element, option) {
      this.elemnet = element;

      this.defaults = {
        effect: 'slide',
        imgWidth: '800px',
        imgHeight: '500px',
      }

      this.options = $.extend({}, this.defaults, option)
    }

    show () {
      let i = 0; //定义索引数
      let $this = this.elemnet //便于调用元素
      let $options = this.options //便于调用options

      let $liNum = $this.find('.centerbox li').length //获取li的数量
      let $imgWidth = parseInt(this.options.imgWidth) //获取图片的宽度，并且取整
      let $ulwidth = $liNum * $imgWidth//设置ul的宽度为li的数量*li的宽度

      setStyle($this, $options, $ulwidth)
    }

    bbc(){
      console.log('1')
    }
  }


  $.fn.GmaFocus = function (options) {
    // let Focus = new Gma_Focus(this, options);

    let Focus = new Basic(this, options);

    Focus.show();
    Focus.bbc()
  }
})(jQuery);





