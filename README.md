
![image](logo_design.png)


## 版本 V1.2

## 更新说明
+ 修改了切换按钮的样式；
+ 将原本使用字体作为切换按钮改变为使用图片作为切换按钮，修改起来更方便；
+ 可能修复了一些BUG；
___

## 简介

+ 可以在调用时定义轮播图中图片的宽高，在一些特定环境使用比较方便。
+ 将需要引用的样式文件和js文件上传到github中，方便调用，不需要使用时重复复制调用。
+ 需要修改样式时，新建一个样式文件覆盖原本的即可，或者将原本的样式文件复制到本地修改后使用。

___


## 使用方式

1. 引用位置及引用地址
+ 在`<head></head>`中的合适位置引入css
`<link rel="stylesheet" href="./css/GmaFocus.css">`
___
+ 在`</body>`之后引入jQuery
`<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>`
___
+ 在jQuery之后引入js
`<script src="./js/GmaFocus.js"></script>`
___

2. 结构预览

```
<div class="Gma-wrap" id="Gma-wrap1">
    <div class="Gma-focus">
      <ul class="centerbox">
        <li>
          <a href="javascript:void(0)">
            <img src="https://placehold.it/2000x3000//332331?text=HELLO%20WORLD" alt="">
            <p>肉坏特比么棋幸代黑错变编习罗皮？担帮万！</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="https://placehold.it/2000x3000//332331?text=HELLO%20WORLD" alt="">
            <p>肉坏特比么棋幸代黑错变编习罗皮？担帮万！</p>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <img src="https://placehold.it/2000x3000//332331?text=HELLO%20WORLD" alt="">
            <p>肉坏特比么棋幸代黑错变编习罗皮？担帮万！</p>
          </a>
        </li>
      </ul>
    </div>
    <a href="javascript:void(0)" class="Gma-Focus-btn prev"></a>
    <a href="javascript:void(0)" class="Gma-Focus-btn next"></a>
</div>
```
___
3. 调用设置

```
<script>
  $('#Gma-wrap1').GmaFocus({
    effect: 'slide',
    autoTime: '500'
  })
</script>

```
___
## 说明

1. 样式说明
+ 切换按钮
+ 切换索引

___

2. 可选参数

| 名称 | 默认值 | 说明 | 默认值说明 | 可选数值 |
| ------ | ------ | ------ | ------ | ------ |
| effect | slide | 默认切换效果 | 默认左右切换 | fade |
| autoMove | true | 是否自动切换 | 默认自动切换 | 无 |
| showBtn | true | 是否显示切换按钮 | 默认显示切换按钮 | flase |
| showIndex | true | 是否显示切换索引 | 默认显示切换索引 | 无 |
| autoTime | 3500 | 自动切换的时间 | 3500ms | 无 |
| clickTime | 500 | 点击切换按钮切换的时间 | 500ms | 无 |
| imgWidth | 800px | 图片默认宽度 | 1400px | 无 |
| imgHeight | 500px | 图片默认高度 | 500px | 无 |

___
3. 特别说明
   + 当图片数量等于 【1】 时，默认不显示切换按钮、切换索引，无切换效果。
   + 当图片数量等于 【2】 时，默认切换效果为淡入淡出效果。
   
___

## 在线引用地址

+ css 线上引用地址 
`<link rel="stylesheet" href="https://zx122248006.github.io/GmaFocus/css/GmaFocus.css">`


+ js 线上引用地址
`<script src="https://zx122248006.github.io/GmaFocus/js/GmaFocus.js"></script>`


## 预览地址

<a href="https://zx122248006.github.io/GmaFocus" target="_blank">Demo</a>