/*******
 * @authors zx122248006
 * @email   zx122248006@qq.com
 * @date    2018年10月30日
 * @copy    Copyright © Powered by zx122248006
 ********/


// 改变left值的焦点轮播图
(function ($, windwow, document, undefind) {
  // 定义构造函数，设置默认值
  let Gma_Focus = function (element, option) {
    this.$elemnet = element;
    this.defaults = {
      effect: 'slide', //切换的效果
      autoMove: 'true', //是否自动移动
      showBtn: 'true', //是否显示切换按钮
      showIndex: 'true', //是否显示切换索引
      autoTime: '3500', //自动切换的时间
      clickTime: '500', //点击切换按钮切换的时间
      imgWidth: '800px', //图片默认宽度
      imgHeight: '500px', //图片默认高度
    }
    this.options = $.extend({}, this.defaults, option)
  }

  // 实例化
  Gma_Focus.prototype = {
    Gma_Focus: function () {
      let i = 0; //定义索引数
      let $clickTime = this.options.clickTime; //定义变量存储点击时，切换的效果时间
      let $autoTime = this.options.autoTime; //定义变量存储自动切换的时间
      let $this = this.$elemnet; //将DOM 设置为常量，便于调用
      let $options = this.options;
      let $ulNum = $this.find('.centerbox li').length; //获取焦点轮播图的图片数量
      let $imgWidth = parseInt(this.options.imgWidth); //获取图片宽度
      let $centerbox = $this.find('.centerbox'); //获取焦点轮播图内容部分
      let $ulwidth = $ulNum * $imgWidth; //根据图片数量定义ul的宽度

      let $fadeTime = 'all ' + ($options.clickTime / 1000) + 's'; //为fade切换定义点击时切换的时间

      // 根据传入的值，设置css功能区
      {
        $this.find('.centerbox').css('width', $ulwidth) //根据图片数量设置ul的宽度

        $this.css('width', $imgWidth) // 根据图片一张图片宽度设置展示页面框的大小

        // 设置图片及其容器的大小
        $this.find('.centerbox li').css({
          'width': $options.imgWidth,
          'height': $options.imgHeight
        })

      }

      //主要功能区域
      {
        function autoChange() {
          i++;
          if (i > $ulNum - 1) {
            i = 0;
            changeto(i);
          } else {
            changeto(i);
          }
        }

        // 设置定时器
        function setAutoChange() {
          return setInterval(function () {
            autoChange();
          }, $autoTime)
        }

        // 变换的主要函数
        function changeto(num) {
          let $fbtn = $this.find('.fbtn ul li'); //获取切换索引
          let $go = num * $imgWidth;

          if ($options.effect == 'slide') { //判断切换的效果为滑动时
            $centerbox.animate({
              left: '-' + $go + 'px'
            }, $clickTime);
          } else if ($options.effect == 'fade') { //判断切换效果为fade时
            $centerbox.find('li').eq(num).css({
              'opacity': '1'
            }).siblings().css({
              'opacity': '0'
            })
          }
          $fbtn.removeClass('on').eq(num).addClass('on');
        }

      }

      // 主要判断功能区
      {
        // 判断切换效果为fade时，需要定义与滑动的不同的结构。
        if ($options.effect == 'fade') {
          let $this_Li = $this.find('.centerbox li');
          $this_Li.css({
            'transition': $fadeTime,
            'opacity': '0'
          })
          $this_Li.eq(0).css({
            'opacity': '1'
          })
          $this.css({
            'position': 'relative'
          });
          $this_Li.css({
            'position': 'absolute'
          })
          $centerbox.css({
            'width': $options.imgWidth,
            'height': $options.imgHeight
          })
        }


        // 判断切换按钮是否显示
        if ($options.showBtn == 'true') {

          let $prev = $this.find('.prev'); //在动态增加切换按钮之后获取切换按钮
          let $next = $this.find('.next'); //在动态增加切换按钮之后获取切换按钮
      
          $next.click(function () {
            if (!$centerbox.is(':animated')) {
              i++;
              if (i > $ulNum - 1) {
                i = 0;
                changeto(i);
              } else {
                changeto(i);
              }
            }
          })

          $prev.click(function () {
            if (!$this.find('.centerbox').is(':animated')) {
              i--;
              if (i < 0) {
                i = $ulNum - 1;
                changeto(i);

              } else {
                changeto(i);
              }
            }
          })

          $this.hover(
            function () {
              $prev.stop().animate({
                opacity: '0.8'
              });
              $next.stop().animate({
                opacity: '0.8'
              })
            },
            function () {
              $prev.stop().animate({
                opacity: '0'
              });
              $next.stop().animate({
                opacity: '0'
              })
            }
          )
        } else if ($options.showBtn == 'flase') {
          $this.find('.Gma-Focus-btn').remove()
        }

        // 判断切换索引是否显示
        if ($options.showIndex == 'true') {

          // 显示索引，动态增加索引栏目
          $this.find('.Gma-focus').append('<div class="fbtn"></div>').find('.fbtn').append('<ul></ul>');
          $liNum = $this.find('.centerbox li');
          for (let i = 0; i < $liNum.length; i++) {
            if (i == 0) {
              $this.find('.fbtn ul').append('<li class="on"><a href="javascript:void(0)"></a></li>');
            } else {
              $this.find('.fbtn ul').append('<li><a href="javascript:void(0)"></a></li>');
            }
          }

          let $fbtn = $this.find('.fbtn ul li');
          $fbtn.on('click', function () {
            let index = $(this).index();
            changeto(index);
            $fbtn.removeClass('on').eq(index).addClass('on');
            // 返回改变的i值
            return i = index;
          });
        }

        // 判断是否自动切换
        if ($options.autoMove == 'true') {
          let stopAutoChange = setAutoChange()
          // 鼠标移入移出时，定时器的开关
          $this.hover(
            function () {
              clearInterval(stopAutoChange)
            },
            function () {
              stopAutoChange = setAutoChange()
            }
          )
        }
      }
    },
  }

  $.fn.GmaFocus = function (options) {
    let Focus = new Gma_Focus(this, options);
    return Focus.Gma_Focus();
  }
})(jQuery, window, document);