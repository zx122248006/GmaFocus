// 2017.11.9
// js置于</body>标签后

$(function(){
	// 自动调用图片切换
	setAutoChange();
})

// 定义变量
var $prev = $('.wrap .prev');
var $next = $('.wrap .next');
var i = 0;//定义索引数
var $fbtn = $('.fbtn ul li');//获取切换按钮
var $ulLength = $('.wrap ul.centerbox li').length;//获取焦点轮播图的图片数量
var $centerbox = $('.wrap ul.centerbox');//获取焦点轮播图内容部分
var $imgWidth = parseInt($('.wrap ul.centerbox li').css('width'));//定义图片宽度
var $ulwidth = $ulLength * $imgWidth;//根据图片数量定义ul的宽度

// 定义定时器相关
var $autochange = null;
var $autoTime = 2500;//定义自动变换的间隔
var $clickTime = 500;//定义点击切换的时间

// 切换按钮点击，切换到对应图片
$fbtn.click(function(){
	var index = $(this).index();
	changeto(index)
	// 返回改变的i值
	return i=index;
});


// 右边切换按钮
// if(!$centerbox.is(':animated')) 用于判读焦点轮播图部分是否在运动中
// 点击之后，i的值增加，当i的值大于图片最大数量-1时（即i为图片最右一张的索引值），
// 使i重置为0（最左边的图）
$next.click(function(){
	if(!$centerbox.is(':animated')){
		i++;
		if(i > $ulLength - 1){
			i=0;
			changeto(i);
		}else{
			changeto(i);
		}
	}else{
		console.log(i)
	}
})

// 左边切换按钮
// 与右边切换按钮逻辑相反
$prev.click(function(){
	if(!$('.wrap ul.centerbox').is(':animated')){
		i--;
		if(i < 0){
			i = $ulLength -1;
			changeto(i)
		}else{
			changeto(i);
		}
	}
})


// 变换的主体函数
// 根据传入的i（num）值，设置每次移动的方向
// 并且改变切换按钮的样式，先全部移除，再单独增加
function changeto(num){
	var $go = num * $imgWidth;
	$centerbox.animate({left:'-' + $go + 'px'},$clickTime);
	$fbtn.removeClass('on').eq(num).addClass('on');
}

// 鼠标移入移出时改变切换按钮的透明度
// 由于修改了html结构，将切换按钮从focus中提取到wrap中，所以将移入的对象从focus改为wrap
$('.wrap').hover(
	function(){
		$prev.stop().animate({opacity:'0.5'})
		$next.stop().animate({opacity:'0.5'})
		stopAutoChange();
	},
	function(){
		$prev.stop().animate({opacity:'0'})
		$next.stop().animate({opacity:'0'})
		setAutoChange();
	}
)

// 开始自动切换的函数
function setAutoChange(){
	$autoChange = setInterval('autoChange()',$autoTime);
}

// 停止自动切换的函数
function stopAutoChange(){
	clearInterval($autoChange)
}

// 自动切换的主体，由于幻灯是向右切换，所以与向右点击函数一致，
function autoChange(){
	i++;
	if(i > $ulLength -1){
		i=0;
		changeto(i);
	}else{
		changeto(i);
	}
}

//根据图片数量设置ul的宽度
$('.wrap ul.centerbox').css('width',$ulwidth)

// 根据图片一张图片宽度设置展示页面框的大小
$(".wrap").css('width', $imgWidth)
