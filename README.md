![picture_1](logo_design.png)

# 说明

1.网上的焦点轮播图的插件很多，但是还是想要自己造轮子试试，同时也是为了方便自己以后写页面，所以就有了这个焦点轮播图的插件。

2.目前只有两种切换方式，淡入淡出和向左滑动。并且目前需要2.依赖jQuery才能够正常运行。目前版本是1.0。

3.还没有正式在工作环境中使用过，可能存在一定的BUG。

4.另外这个插件的兼容性不好。

# 结构

```
<div id="Gma-wrap">
  <div class="Gma-focus">
    <ul class="centerbox">
      <li>
        <a href="javascript:void(0)">
        
        </a>
      </li>
      <li>
        <a href="javascript:void(0)">
        
        </a>
      </li>
      <li>
        <a href="javascript:void(0)">
      
        </a>
      </li>
    </ul>
  </div>
  <a href="javascript:void(0)" class="Gma-Focus-btn prev"></a>
  <a href="javascript:void(0)" class="Gma-Focus-btn next"></a>
</div>
```

# 调用方式

```
$('#Gma-wrap').GmaFocus()
```

## 调用方式特别说明

在页面中存在两个及以上的焦点轮播图时，则需要在```<div id="Gma-wrap">``` 中增加别的类名用于区分。
例如
```
<div id="Gma-wrap" class="Gma-1">
</div>

```
相应的调用方式也改变

```
$('.Gma-1').left_Focus()
```

# 样式

使用了scss预编译的样式。也提供了编译之后的css样式。需要修改切换按钮样式，或是切换索引就可以修改scss或者css样式。
切换按钮的样式为`#Gma-wrap .Gma-Focus-btn`
切换索引的样式为`.fbtn`

# 切换按钮

切换按钮使用的是字体图标的嵌入方式，使用时，需要在`<head>`引入`<link rel="stylesheet" href="./css/font-style.css">`

再在切换按钮的样式中加入`	<a href="javascript:void(0)" class="Gma-Focus-btn prev icon-next-style2"></a>`

`icon-next-style2`的样式

# 可选参数
| 名称 | 默认值 | 说明 | 默认值说明 | 可选数值 |
| ------ | ------ | ------ | ------ | ------ |
| effect | slide | 默认切换效果 | 默认左右切换 | fade |
| autoMove | true | 是否自动切换 | 默认自动切换 | 无 |
| showBtn | true | 是否显示切换按钮 | 默认显示切换按钮 | flase |
| showIndex | true | 是否显示切换索引 | 默认显示切换索引 | 无 |
| autoTime | 2500 | 自动切换的时间 | 2500ms | 无 |
| clickTime | 500 | 点击切换按钮切换的时间 | 500ms | 无 |
| imgWidth | 800px | 图片默认宽度 | 1400px | 无 |
| imgHeight | 500px | 图片默认高度 | 500px | 无 |