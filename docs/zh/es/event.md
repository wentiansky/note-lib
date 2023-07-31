# Event 事件

## 事件冒泡（通用事件模型，IE 支持）

事件从具体的元素逐级向上传播到文档。

## 事件捕获（很少用）

事件从文档逐级向下传播到具体的元素。

## 事件流

事件的三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

## 事件处理程序（on + 事件名）

- `HTML`事件处理程序；

  - 缺点 1：才加载页面时，就点击事件，会报错，解决方法：用 try-catch；
  - 缺点 2：HTML 代码和 JavaScript 代码紧密耦合；

- DOM0 级事件处理程序；

  - 在事件流的冒泡阶段处理；
  - `btn.onclick = null`可以删除事件处理程序；

- DOM2 级事件处理程序；

  - 要想删除事件处理程序，则第二参数不能是匿名函数；

- IE 事件处理程序
  - `attachEvent`和`detachEvent`；

```jsx
/* html事件处理程序，this指的是当前元素 */
<button onclick="try{showMessage();}catch(e){}"></button>;

/* DOM0级事件处理程序，this指的是当前元素 */
var btn = document.getElementById("my-btn");
btn.onclick = function() {
  alert("clicked");
};

/* DOM2级事件处理程序
第三个参数若为true，在事件捕获阶段触发
第三个参数若为false，在事件冒泡阶段触发 */
var btn = document.getElementById("my-btn");
btn.addEventListener(
  "click",
  function() {
    alert("clicked");
  },
  false
);

// 第二参数不能是匿名函数
var handler = function() {
  alert("clicked");
};

// 绑定事件处理程序
btn.addEventListener("click", handler, false);

// 移除事件处理程序
btn.removeEventListener("click", handler, false);

/* IE事件处理程序，this指的是windows */
btn.attachEvent("onclick", function() {
  // 注意第二个参数是onclick
  // this === windows
  alert("clicked");
});
```

## 编写跨浏览器事件处理代码

```javascript
var EventUtil = {
  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }
};
```

## 事件对象

**DOM 中的事件对象中的属性和方法：**

| 属性/方法                    | 类型       | 读/写 | 说明                                                                   |
| ---------------------------- | ---------- | ----- | ---------------------------------------------------------------------- |
| `bubbles`                    | `Boolean`  | 只读  | 事件是否冒泡                                                           |
| `cancelable`                 | `Boolean`  | 只读  | 是否可以取消默认行为                                                   |
| `currentTarget`              | `Element`  | 只读  | 当前绑定事件的元素                                                     |
| `target`                     | `Element`  | 只读  | 事件的目标元素                                                         |
| `preventDefault`()           | `Function` | 只读  | 取消事件默认行为                                                       |
| `stopPropagation()`          | `Function` | 只读  | 取消事件进一步捕获或冒泡                                               |
| `stopImmediatePropagation()` | `Function` | 只读  | 取消事件进一步捕获或冒泡，同时阻止任何事件处理程序被调用（`DOM3`新增） |

**IE 中的事件对象属性**

| 属性/方法      | 类型      | 读/写 | 说明                                            |
| -------------- | --------- | ----- | ----------------------------------------------- |
| `srcElement`   | `Element` | 只读  | 事件的目标元素（同`target`）                    |
| `cancelBubble` | `Boolean` | 读/写 | 为`false`取消事件冒泡，同`stopPropagation()`    |
| `returnValue`  | `Boolean` | 读/写 | 为`false`取消事件默认行为，同`preventDefault()` |

## UI 事件

### 1. `load`事件

当页面完全加载后（包括所有图像，js 文件，css 文件等外部资源）触发。

```jsx
  // 第一种绑定方式
  EventUtil.addHandler(window, 'load', function (event) {
    console.log('loaded!')
  })

  var image = document.querySelector('#myImage')
  EventUtil.addHandler(image, 'load', function (event) {
    event = EventUtil.getEvent(event)
    console.log(EventUtil.getTarget(event).src)
  })

  // 第二种方式
  <body onload="console.log('loaded!')"></body>
  <img src="smile.gif" onload="console.log('image loaded!')">
```

### 2. `unload`事件

从一个页面切换到另一个页面，可以清除引用，避免内存泄漏。

### 3. `resize`事件

浏览器窗口被调整到一个新的高度和宽度就会触发 `resize` 事件

```javascript
EventUtil.addHandler(window, "resize", function() {
  console.log("resize");
});
```

### 4. `scroll`事件

在混杂模式下，可以通过 `body` 元素的 `scrollLeft` 和 `scrollTop` 来监控这一变化，在标准模式下除了 `safary` 浏览器的其他浏览器都以 `html` 元素来反映这一变化。

- **常见 bug**
  - 【现象】：`iphone` 手机上输入法弹框关闭时，页面上的元素未回到原位置
  - 【解决方法】：`document.documentElement.scrollTop = document.body.scrollTop = 0;`

```javascript
EventUtil.addHandler(window, "scroll", function() {
  if (document.compatMode === "CSS1Compat") {
    console.log(document.documentElement.scrollTop);
  } else {
    console.log(document.body.scrollTop);
  }
});
```

### 5. 焦点事件

常于 `document.hasFocus()` 和 `document.activeElement` 配合使用。

- `blur` 失去焦点（不冒泡）
- `focus` 获得焦点（不冒泡）
- `focusout` 失去焦点（冒泡）
- `focusin` 获得焦点（冒泡）

### 6. 鼠标和滚轮事件

- `click`
- `dbclick`
- `mousedown`
- `mouseup`
- `mouseenter` 从元素外部移到元素内部（不冒泡），不在后代元素上触发
- `mouseleave` 从元素内部移到元素外部（不冒泡）， 不在后代元素上触发
- `mousemove` 在元素内部移动重复触发
- `mouseover` 从元素外部移到元素内部触发
- `mouseout` 从元素内部移动元素外部或者子元素内部触发

:::warning

1. 阻止某个事件的默认行为很可能影响依赖它的其他事件
2. 事件执行顺序：`mousedown` -> `mouseup` -> `click` -> `mousedown` -> `mouseup` -> `click` -> `dbclick`
   :::

- **客户区坐标位置**

`clientX`代表鼠标指针在视口中的水平位置，`clientY`代表鼠标指针在视口中的垂直位置

```javascript
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  console.log(event.clientX + "," + event.clientY);
});
```

- **页面坐标位置**

`pageX`代表鼠标指针在页面（文档）的水平位置，`pageY`代表鼠标指针在页面（文档）的垂直位置

```javascript
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  console.log(event.pageX + "," + event.pageY);
});
```

_注意：IE8 及以下版本不支持`pageX`和`pageY`_，兼容写法如下：

```javascript
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  var pageX = event.pageX,
    pageY = event.pageY;

  if (pageX === undefined) {
    pageX =
      event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft);
  }

  if (pageY === undefined) {
    pageY =
      event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop);
  }
  console.log(event.pageX + "," + event.pageY);
});
```

- **屏幕坐标位置**

`screenX`代表鼠标相对整个屏幕的水平位置，`screenY`代表鼠标相对于整个屏幕的垂直位置。

```javascript
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
  event = EventUtil.getEvent(event);
  console.log(event.screenX + "," + event.screenY);
});
```

## HTML5 事件

### 1. `contextmenu`右键弹出上下文菜单

网页中菜单的简单实现：

```html
<head>
  <style>
    #menu {
      width: 50px;
      height: 100px;
      border: 1px solid #000;
    }
  </style>
</head>
<body>
  <div id="area">click here</div>
  <ul id="menu">
    <li>菜单一</li>
    <li>菜单二</li>
    <li>菜单三</li>
  </ul>
</body>
```

```javascript
EventUtil.addHandler(window, "load", function(event) {
  var div = document.querySelector("#area");

  EventUtil.addHandler(div, "contextmenu", function(event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);

    var menu = document.querySelector("#menu");
    menu.style.left = event.clientX + "px";
    menu.style.top = event.clientY + "px";
    menu.style.visibility = "visible";
  });

  EventUtil.addHandler(document, "click", function(event) {
    document.querySelector("#menu").style.visibility = "hidden";
  });
});
```

### 2. `beforeunload`事件

询问用户是否真的离开页面：

```javascript
EventUtil.addHandler(window, "beforeunload", function(event) {
  event = EventUtil.getEvent(event);
  var message = "是否关闭网页？";
  event.returnValue = message;
  return message;
});
```

### 3. `DOMContentLoaded`事件

形成完整 DOM 树后触发，比 load 事件更早

```javascript
EventUtil.addHander(document, "DOMContentLoaded", function(event) {
  alert("content loaded!");
});
```

### 4. `readystatechange`事件

提供与文档或元素的加载状态有关的信息，有一个`readyState`属性

- `uninitialized`（未初始化）：对象存在，尚未初始化；
- `loading`（正在加载）：对象正在加载数据；
- `loaded`（加载完毕）：对象加载数据完成；
- `interactive`（交互）：可以操作对象，但没完全加载完；
- `complete`（完成）：对象已经加载完毕；

_注意：这些阶段的顺序不固定_

```javascript
EventUtil.addHandler(document, "readystatechange", function(event) {
  if (document.readyState === "interactive") {
    alert("content loaded!");
  }
});

// 避免顺序不固定
EventUtil.addHandler(document, "readystatechange", function(event) {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    EventUtil.removeHandler(document, "readystatechange", arguments.callee);
    alert("content loaded!");
  }
});
```

### 5. `pageshow`和`pagehide`事件

重新加载页面时`pageshow`在`load`事件后触发
页面卸载时`pagehide`在`unload`事件前触发

```javascript
(function() {
  var showCount = 0;
  EventUtil.addHandler(window, "load", function() {
    alert("load fired");
  });

  EventUtil.addHandler(window, "pageshow", function(event) {
    showCount++;
    // event.persisted { Boolean } 为true表示页面被保存在bfcache中
    alert(showCount + "times" + event.persisted);
  });
})();
```

### 6. `hashchange`

```javascript
EventUtil.addHandler(window, "hashchange", function() {
  alert("current hash: " + location.hash);
});

// 检测浏览器是否支持hashchange事件
var isSupported =
  "onhashchange" in window &&
  (document.documentMode === undefined || document.documentMode > 7);
```

## 设备事件

### 1. `orientationchange`事件

使用`window.orientation`可以获取屏幕的旋转角度

```javascript
EventUtil.addHandler(window, "orientationchange", function(event) {
  console.log(window.orientation);
});
```

## 触摸与手势事件

### 1. 触摸事件

- `touchstart`：手指触摸屏幕触发；
- `touchmove`：手指在屏幕上滑动时连续触发，调用`preventDefault`可以阻止滚动；
- `touchend`：手指从屏幕移开时触发；
- `touchcancel`：系统停止跟踪触摸时触发；

`event`对象提供的关于触摸的属性：

- `touches`：表示当前跟踪的触摸操作的`Touch`对象的数组；
- `targetTouches`：特定于事件目标的`Touch`对象的数组；
- `changedTouches`：表示自上次触摸以来发生了什么改变的`Touch`对象的数组；

每个`Touch`对象包含以下属性：

- `clientX`：触摸目标在视口中的`x`坐标；
- `clientY`：触摸目标在视口中的`y`坐标；
- `pageX`：触摸目标在页面中的`x`坐标；
- `pageY`：触摸目标在页面中的`y`坐标；
- `screenX`：触摸目标在屏幕中的`x`坐标；
- `screenY`：触摸目标在屏幕中的`y`坐标；
- `target`：触摸的 DOM 节点目标；

```javascript
function handleTouchEvent(event) {
  // 只跟踪一次触摸
  if (event.touches.length === 1) {
    switch (event.type) {
      case "touchstart":
        console.log(event.touches[0].clientX, event.touches[0].clientY);
        break;
      case "touchend":
        console.log(
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY
        );
        break;
      case "touchmove":
        event.preventDefault(); // 阻止滚动
        console.log(
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY
        );
        break;
    }
  }
}

EventUtil.addHandler(document, "touchstart", handleTouchEvent);
EventUtil.addHandler(document, "touchend", handleTouchEvent);
EventUtil.addHandler(document, "touchmove", handleTouchEvent);
```

### 2. 手势事件（ios）

- `gesturestart`：当一个手指已经按在屏幕上另一个手指又触摸手指触发；
- `gesturechange`：当触摸屏幕的任何一个手指的位置发生变化时触发；
- `gestureend`：当任何一个手指从屏幕上移开时触发；

手势的额外属性：

- `rotation`：表示手指变化引起的旋转角度；
- `scale`：表示两个手指间距离的变化情况；

```javascript
function handleGestureEvent(event) {
  switch (event.type) {
    case "gesturestart":
      console.log(event.rotation, event.scale);
      break;
    case "gestureend":
      console.log(event.rotation, event.scale);
      break;
    case "gesturechange":
      console.log(event.rotation, event.scale);
      break;
  }
}

EventUtil.addHandler(document, "gesturestart", handleGestureEvent);
EventUtil.addHandler(document, "gestureend", handleGestureEvent);
EventUtil.addHandler(document, "gesturechange", handleGestureEvent);
```

## 模拟事件

### 1. 模拟鼠标事件

创建鼠标事件的方法为`createEvent('MouseEvents')`，返回对象有一个`initMouseEvent()`方法，用于指定与鼠标事件有关的信息有 15 个参数

- `type`：事件类型；
- `bubbles`：是否冒泡；
- `cancelable`：是否可以取消；
- `view`：与事件关联的视图，总设置为`document.defaultView`；
- `detail`：有事件有关的详细信息，通常设置为`0`；
- `screenX`：事件相对于屏幕的`X`坐标；
- `screenY`：事件相对于屏幕的`Y`坐标；
- `clientX`：事件相对于视口的`X`坐标；
- `clientY`：事件相对于视口的`Y`坐标；
- `ctrlKey`：是否按下了`Ctrl`键，默认`false`；
- `altKey`：是否按下了`Alt`键，默认`false`；
- `shiftKey`：是否按下了`Shift`键，默认`false`；
- `metaKey`：是否按下了`Meta`键，默认`false`；
- `button`：按下了哪个鼠标键，默认`0`；
- `relatedTarget`：表示事件相关的对象，在模拟`mouseover`和`mouseout`时使用；

```javascript
var btn = document.getElementById("myBtn");

// 创建事件对象
var event = document.createEvent("MouseEv·ents");

// 初始化事件对象
event.initMouseEvent(
  "click",
  true,
  true,
  document.defaultView,
  0,
  0,
  0,
  0,
  0,
  false,
  false,
  false,
  false,
  0,
  null
);

// 触发事件
btn.dispatchEvent(event);
```

### 2. 自定义事件

DOM3 级还定义了“自定义事件”，让开发人员创建自己的事件，调用`createEvent(CustomEvent)`，返回的对象有一个`initCustomEvent()`方法，接收 4 个参数。

- `type`(string)：时间类型；
- `bubbles`(boolean)：是否冒泡；
- `cancelable`(boolean)：是否可以取消；
- `detail`(对象)：保存在`event`对象的`detail`属性中；

```javascript
var div = document.getElementById("myDiv"),
  event;

EventUtil.addHandler(div, "myevent", function(event) {
  alert("Div:" + event.detail);
});
EventUtil.addHandler(document, "myevent", function(event) {
  alert("Document:" + event.detail);
});

if (document.implementation.hasFeature("CustomEvents", "3.0")) {
  event = document.createEvent("CustomEvent");
  event.initCustomEvent("myevent", true, false, "hello"); 
  div.dispatch(event);
}
```
