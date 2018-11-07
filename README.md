# 兼容性

施工中

# 结构

```
<div id="Gma-wrap">
  <div class="Gma-focus">
    <ul class="centerbox">
      <li>
        <a href="javascript:void(0)">
          内容				
        </a>
      </li>
      <li>
        <a href="javascript:void(0)">
          内容				
        </a>
      </li>
      <li>
        <a href="javascript:void(0)">
          内容
        </a>
      </li>
    </ul>
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

# 可选参数
| 名称 | 默认值 | 说明 | 默认值说明 |
| ------ | ------ | ------ | ------ |
| effect | slide | 默认切换效果 | 默认左右切换 |
| autoMove | true | 是否自动切换 | 默认自动切换 |
| showBtn | true | 是否显示切换按钮 | 默认显示切换按钮 |
| showIndex | true | 是否显示切换索引 | 默认显示切换索引 |
| autoTime | 2500 | 自动切换的时间 | 2500ms |
| clickTime | 500 | 点击切换按钮切换的时间 | 500ms |
| imgWidth | 800px | 图片默认宽度 | 1400px |
| imgHeight | 500px | 图片默认高度 | 500px |