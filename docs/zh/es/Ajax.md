# Ajax

## 1. XMLHttpRequest 对象

创建 XHR 对象

```javascript
function createXHR() {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = [
        'MSXML2.XMLHttp.6.0',
        'MSXML.XMLHttp.3.0',
        'MSXML.XMLHttp'
      ]

      for (var i = 0; i < versions.length; i++) {
        try {
          new ActiveXObject(versions[i])
          arguments.callee.activeXString = versions[i]
          break
        } catch (e) {
          console.log('跳过循环')
        }
      }
    }

    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('No XHR object available.')
  }
}
```

**XHR**对象的`readyState`属性，表示请求/响应过程的当前活动阶段

- 0：未初始化，尚未调用 open()方法
- 1：启动，已经调用 open()方法，但尚未调用 send()方法
- 2：发送，已经调用 send()方法，但尚未接收到响应
- 3：接收，已经接收到部分响应数据
- 4：完成，已经接收到全部响应数据，而且可以再客户端使用了

`readState`属性的值从一个变成另外一个值，都会触发一次`onreadystatechange`事件

```javascript
var xhr = createXHR()

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText)
    } else {
      alert('request was unsuccessful: ' + xhr.status)
    }
  }
}
xhr.open('get', 'example.txt', true) // true表示异步请求
xhr.send(null)
```

## 2. HTTP 头部信息

每个 HTTP 请求和响应都会有头部信息，在发送`XHR`请求的同时，还会发送以下头部信息

- Accept：浏览器能够处理的内容类型；
- Accept-Charset：浏览器能够显示的字符集；
- Accept-Encoding：浏览器能够处理的压缩编码；
- Accept-Language：浏览器当前设置的语言；
- Connetction：浏览器与服务器之期的连接类型；
- Cookie：当前页面设置的任何 Cookie；
- Host：发出请求的页面所在的域；
- Referer：发出请求页面的 URI，正确写法是`referrer`，HTTP 规范写错了；
- User-Agent：浏览器的用户代理字符串；

> 调用`XHR`的`setRequestHeader()`方法可以设置请求头部信息，需要在`send()`方法前调用

```jsx
xhr.setRequestHeader('MyHeader', 'MyValue')
xhr.send(null)
```

## 3. GET 请求

使用一下函数可以向现有`url`的末尾添加查询参数

```javascript
function addURLParam(url, name, value) {
  url += url.indexOf('?') === -1 ? '?' : '&'
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}

var url = 'example.php'

// 添加参数
url = addURLParam(url, 'username', 'jax')
url = addURLParam(url, 'remark', 'Aa,./=[]{} 123')

// 初始化请求
xhr.open('get', url, true)
```

## 4. POST 请求

```javascript
// 表单序列化
function serialize(form) {
  var parts = [],
    field = null

  for (var i = 0; i < form.elements.length; i++) {
    field = form.elements[i]

    switch (field.type) {
      case 'select-one':
      case 'select-multiple':
        if (field.name.length) {
          for (var j = 0; j < field.options.length; j++) {
            var option = field.options[j]
            if (option.selected) {
              var optValue = ''
              if (option.hasAttribute) {
                optValue = option.hasAttribute('value')
                  ? option.value
                  : option.text
              } else {
                optValue = option.attributes['value'].specified
                  ? option.value
                  : option.text
              }
              parts.push(
                encodeURIComponent(field.name) +
                  '=' +
                  encodeURIComponent(optValue)
              )
            }
          }
        }
        break

      case undefined: // 字段集
      case 'file': // 文件输入
      case 'submit': // 提交按钮
      case 'reset': // 充值按钮
      case 'button': // 自定义按钮
        break

      case 'radio':
      case 'checkbox':
        if (!field.checked) {
          break
        }
      // 执行默认操作

      default:
        // 不包含没有名字的表单字段
        if (field.name.length) {
          parts.push(
            encodeURIComponent(field.name) +
              '=' +
              encodeURIComponent(field.value)
          )
        }
    }
  }

  return parts.join('&')
}

// post请求模仿表单提交
var form = document.getElementById('user-info')

xhr.open('post', 'example.php', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send(serialize(form))
```

## 5. XMLHttpRequest 2 级

### 5.1 FormData

`FormData`为序列化表单以及创建表单相同的数据（用于通过 XHR 传输）提供了便利，可以使用`append()`方法向对象添加键值对，也可以向构造函数传入表单元素，可以直接传入`xhr.send()`方法。

```javascript
var data1 = new FormData(document.form[0])

var data2 = new FormData()

data2.append('name', 'jax')

var form = document.getElementById('user-info')
xhr.open('post', 'example.php', true)
xhr.send(new FormData(form))
```

使用`FormData`的方便之处就是不必在`xhr`对象上设置请求头部

### 5.2 timeout

`IE8+`为`XHR`对象添加了一个`timeout`属性，在设置时间未收到响应会停止请求。

```javascript
var xhr = createXHR()

// 为避免超时终止请求之后再访问xhr.status，使用try-catch
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        alert(xhr.responseText)
      } else {
        alert('Request was unsuccessful: ' + xhr.status)
      }
    } catch (e) {}
  }
}
xhr.open('get', 'example.php', true)
xhr.timeout = 1000
xhr.ontimeout = function() {
  alert('Request did not return in a second.')
}
xhr.send(null)
```

### 5.3 overrideMimeType()方法

通过`overrideMimeType()`方法重写响应类型。

```javascript
var xhr = createXHR()
xhr.open('get', 'example.php', true)
xhr.overrideMimeType('text/xml')
xhr.send(null)
```
