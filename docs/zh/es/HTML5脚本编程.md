# HTML5 脚本编程

## 跨文档消息传递

跨文档消息传递(crossing-document messaging)，简称`XDM`，指在不同域名的页面间传递消息，核心是`postMessage(message: string, domain: string)`方法，message：发送的消息，domain：发送消息页面的域名，例如给嵌套的 iframe 框发送消息：

```javascript
var iframeWindow = document.getElementById('myframe').contentWindow

iframeWindow.postMessage('hello world!', 'http://www.test.com')
```

接收到消息时，会触发 window 对象的`message`事件，触发`message`事件后，传递给`onmessage`事件处理程序，事件对象`event`中包含 3 个参数：

- data：消息字符串；
- origin：发送消息的域名；
- source：发送消息的文档的`window`对象的代理；

```javascript
EventUtil.addHandler(window, 'message', function(event) {
  if (event.origin === 'http://www.test.com') {
    console.log(event.data)
    event.source.postMessage('Received!', 'http://www.another.com')
  }
})
```

## 原生拖放

### 1. 拖放事件

拖动的元素：

- dragstart：按下鼠标并开始移动鼠标触发，通过`ondragstart`事件处理；
- drag：类似于`mousemove`事件，元素拖动过程中重复触发；
- dragend：停止拖动触发；

放置目标的元素：

- dragenter：元素被拖动到放置元素上触发，类似`mouseover`；
- dragover：拖动元素在放置目标范围内移动时，会触发；
- dragleave：拖动元素拖出了放置目标触发，类似`mouseout`；
- drop：拖动元素放到了放置目标触发；

### 2. 自定义放置目标

元素默认不允许放置，通过重写`dragenter`和`dragover`事件的默认行为，让元素变成一个放置目标。

```javascript
var droptarget = document.getElementById('droptarget')

EventUtil.addHandler(droptarget, 'dragover', function(event) {
  EventUtil.preventDefault(event)
})

EventUtil.addHandler(droptarget, 'dragenter', function(event) {
  EventUtil.preventDefault(event)
})
```

### 3. `dataTransfer`对象

在拖放操作时用于数据的交换，是事件对象的属性，只能在拖放事件的事件处理程序中访问，主要有两个方法：

- getData('text'|'URL')：是一个字符串；
- setData('text'|'URL', data)：data 是一个字符串；

```javascript
// 设置和接收文本数据
event.dataTransfer.setData('text', 'some text')
var text = event.dataTransfer.getData('text')

// 设置和接收URL
event.dataTransfer.setData('URL', 'http://www.test.com')
var url = event.dataTransfer.getData('URL')

// 兼容用法
var url =
  event.dataTransfer.getData('url') ||
  event.dataTransfer.getData('text/uri-list')

var text = event.dataTransfer.getData('Text')
```
