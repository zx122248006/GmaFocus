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
$('.wrap').GmaFocus()
```

## 调用方式特别说明

在页面中存在两个及以上的焦点轮播图时，则需要在``` <div class="wrap">``` 中增加别的类名或者ID名用于区分。
例如
```
<div id="wrap1" class="wrap">
</div>

```
相应的调用方式也改变

```
$('#wrap1').left_Focus()
```

# 可选参数
| 名称 | 默认值 | 说明 |
| ------ | ------ | ------ |
| autoMove | true | 是否自动移动 |
| showBtn | true | 是否显示切换按钮 |
| showIndex | true | 是否显示切换索引 |
| autoTime | 2500 | 自动切换的时间 |
| clickTime | 500 | 点击切换按钮切换的时间 |
| imgWidth | 1400px | 图片默认宽度 |
| imgHeight | 500px | 图片默认高度 |