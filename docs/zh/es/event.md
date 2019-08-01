# Event事件

## 事件冒泡（通用事件模型，IE支持）

事件从具体的元素逐级向上传播到文档。

## 事件捕获（很少用）

事件从文档逐级向下传播到具体的元素。

## 事件流

事件的三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

## 事件处理程序（on + 事件名）
* `HTML`事件处理程序；
  * 缺点1：才加载页面时，就点击事件，会报错，解决方法：用try-catch；
  * 缺点2：HTML代码和JavaScript代码紧密耦合；

* DOM0级事件处理程序；
  * 在事件流的冒泡阶段处理；
  * `btn.onclick = null`可以删除事件处理程序；

* DOM2级事件处理程序；
  * 要想删除事件处理程序，则第二参数不能是匿名函数；

* IE事件处理程序
  * `attachEvent`和`detachEvent`；

```jsx
/* html事件处理程序，this指的是当前元素 */
<button onclick="try{showMessage();}catch(e){}"></button>

/* DOM0级事件处理程序，this指的是当前元素 */
var btn = document.getElementById('my-btn');
btn.onclick = function() {
  alert('clicked');
}

/* DOM2级事件处理程序
第三个参数若为true，在事件捕获阶段触发
第三个参数若为false，在事件冒泡阶段触发 */
var btn = document.getElementById('my-btn');
btn.addEventListener('click', function() {
  alert('clicked');
}, false);

// 第二参数不能是匿名函数
var handler = function() {
  alert('clicked');
}

// 绑定事件处理程序
btn.addEventListener('click', handler, false);

// 移除事件处理程序
btn.removeEventListener('click', handler, false);

/* IE事件处理程序，this指的是windows */
btn.attachEvent('onclick', function() {
  // 注意第二个参数是onclick
  // this === windows
  alert('clicked');
});
```

## 编写跨浏览器事件处理代码

```javascript
var EventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  }
}
```

## 事件对象

**DOM中的事件对象中的属性和方法：**

| 属性/方法 | 类型 | 读/写 | 说明 | 
|----------|------|------|------|
| `bubbles`                    | `Boolean` | 只读 | 事件是否冒泡 |
| `cancelable`                 | `Boolean` | 只读 | 是否可以取消默认行为 |
| `currentTarget`              | `Element` | 只读 | 当前绑定事件的元素 |
| `target`                     | `Element` | 只读 | 事件的目标元素 |
| `preventDefault`()           | `Function` | 只读 | 取消事件默认行为 |
| `stopPropagation() `         | `Function` | 只读 | 取消事件进一步捕获或冒泡 |
| `stopImmediatePropagation()` | `Function` | 只读 | 取消事件进一步捕获或冒泡，同时阻止任何事件处理程序被调用（`DOM3`新增）

**IE中的事件对象属性**

| 属性/方法 | 类型 | 读/写 | 说明 | 
|----------|------|------|------|
| `srcElement`   | `Element` | 只读 | 事件的目标元素（同`target`） |
| `cancelBubble` | `Boolean` | 读/写 | 为`false`取消事件冒泡，同`stopPropagation()` |
| `returnValue`  | `Boolean` | 读/写 | 为`false`取消事件默认行为，同`preventDefault()` |

