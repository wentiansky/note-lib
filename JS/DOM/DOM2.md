### DOM2样式

**1. style定义的属性和方法**

* cssText：访问到style特性中的代码；
* getPropertyValue(propertyName)：返回给定属性的字符串值；
* removeProperty(propertyName)：从样式中删除给定的属性；
* setProperty(propertyName, value, priority)：将给定属性设置值，并加上优先级（important或者空字符串）；

**2. 计算的样式（只读）**

* 其他浏览器：getComputedStyle(element, propertyName)；
* IE浏览器：element.currentStyle[propertyName];

**3. 元素大小**

* offsetHeight：元素在垂直方向上占用的空间大小；
* offsetWidth：元素在水平方向上占用的空间大小；
* offsetLeft：元素的左外边框至父元素内边框的像素距离；
* offsetTop：元素的上外边框至父元素内边框的像素距离；

```javascript
function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while(current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParant;
  }
  return actualLeft;
}

function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while(current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParant;
  }
  return actualTop;
}
```

**4. 客户区大小**

* clientWidth：元素内容区宽度加上左右内边距宽度；
* clientHeight：元素内容区高度加上上下内边距宽度；

```javascript
// 获取视口大小（兼容写法）
function getViewport() {
  if (document.compatMode == 'BackCompat') {
    // 混杂模式
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
}
```

**5. 滚动大小**

* scrollHeight：没有滚动条下，元素内容的总高度；
* scrollWidth：没有滚动条下，元素内容的总宽度；
* scrollLeft：在水平方向上滚动条的位置；
* scrollTop：在垂直方向上滚动条的位置；

在跨浏览器确定文档的总高度和总宽度时，如下：
```javascript
var docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);

var docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);

// 对于混杂模式的IE，要用document.body代替document.documentElement
```

**6. 确定元素大小**
* getBoundingClientRect()方法；

返回4个属性：left、top、right和bottom。描述了元素相对于视口的位置。