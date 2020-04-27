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
        'MSXML.XMLHttp',
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

## 6. 进度事件

### 6.1 load 事件

只要浏览器接收到服务器的响应，就会触发`load`事件

```javascript
var xhr = createXHR()

xhr.onload = function() {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText)
  } else {
    alert('Request was unsuccessful: ' + xhr.status)
  }
}
xhr.open('get', 'example.php', true)
xhr.send(null)
```

### 6.2 progress 事件

- `lengthComputable`：表示进度信息是否可用（Boolean）
- `position`：表示已接收的字节数
- `totalSize`：表示根据`Content-Length`响应头部确定的预期字节数

```javascript
var xhr = createXHR()
var divStatus = document.getElementById('status')

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    divStatus.innerHTML =
      'Received ' + event.position + ' of ' + event.totalSize + 'bytes'
  }
}
xhr.open('get', 'example.php', true)
xhr.send(null)
```

## 7. 跨域资源共享（CORS）

> 默认情况下`XHR`对象只能访问与包含他的页面位于同一个域中的资源，来源于跨域安全策略。`CORS`（Cross-Origin-Resource Sharing，跨域资源共享），使用自定义的`HTTP`头部让浏览器与服务器进行沟通。

如发送一个简单的`GET`或`POST`请求时，需要附加一个额外的`origin`头部，包含页面的源信息（协议、域名和端口），以便服务器根据这个头部信息来决定是否给予响应。

```jsx
// 浏览器的头部信息
origin: http://www.example.com

// 服务端的添加允许的响应头
Access-Control-Allow-Origin: http://www.example.com
```

### 7.1 IE 对 CORS 的实现

`IE8`引入了`XDR`（XDomainRequest）类型，与`XHR`类似，但能实现安全的跨域通信，有一下特点：

- `cookie`不会随请求发送，也不会随响应返回
- 只能设置请求头部信息中的`Content-type`字段
- 不能访问响应头部信息
- 只支持`GET`和`POST`请求
  这些特点有效的缓解了`CSRF`（Cross-Site Request Forgery，跨站点请求伪造）和`XSS`（Cross-Site scripting，跨站点脚本）

```javascript
var xdr = new XDomainRequest()

xdr.onload = function() {
  // 只能访问到响应的原始文本，不能访问响应状态等其他信息
  alert(xdr.responseText)
}
xdr.onerror = function() {
  // 响应错误时触发，没有多余的信息
  alert('An error occurred.')
}

// get请求
xdr.open('get', 'example.php') // 没有第三个参数，只能是异步
xdr.send(null)

// post 请求
xdr.open('post', 'example.php')
xdr.contentType = 'application/x-www-form-urlencoded'
```

### 7.2 其他浏览器对 CORS 的实现

其他浏览器对`CORS`提供了原生支持，在 open()方法中使用绝对 URL 即可，与 IE 的`XDR`不同的是，通过跨域的`XHR`可以访问`status`和`statusText`属性，而且还支持同步请求，但是也有一些限制：

- 不能使用`setRequestHeader()`设置自定义头部
- 不能发送和接受`cookie`
- 调用`getAllResponseHeader()`总是会返回空字符串

### 7.3 Preflighted Requests（预检请求）

支持开发人员自定义头部、GET 或 POST 之外的方法，以及不同类型的主体内容，在使用以下高级选项，会发送一个 preflighted 请求，IE10 及以下版本不支持 preflight 请求。

- `Origin`：与简单请求相同
- `Access-Control-Request-method`：请求自身使用的方法
- `Access-Control-Request-Headers`：自定义头部信息，多个头部以逗号分隔

服务器通过在响应头中发送如下头部与浏览器进行沟通：

- `Access-Control-Allow-Origin`：与简单的请求相同
- `Access-Control-Allow-Methods`：允许的方法，多个方法以逗号隔开
- `Access-Control-Allow-Headers`：允许的头部，多个头部以逗号隔开
- `Access-Control-Max-Age`：应该讲这个`Preflight`请求缓存多长时间

### 7.4 带凭据的请求

默认情况系，跨域请求不提供凭据（cookie、HTTP 认证及客户端 SSL 证明等），设置`withCredentials`为 true 可以指定某个请求应该发送凭据，如果服务器接收带凭据的请求，会用下面的 HTTP 头部来响应：

```jsx
Access-control-Allow-Credentials: true
```

### 7.5 跨浏览器的 CORS

```javascript
function createCORSRequest(method, url) {
  var xhr = createXHR()
  if ('withCredentials' in xhr) {
    // 支持XHR跨域
    xhr.open(method, url, true)
  } else if (typeof XDomainRequest != 'undefined') {
    xhr = new XDomainRequest()
    xhr.open(method, url)
  } else {
    xhr = null
  }
  return xhr
}

var request = createCORSRequest('get', 'example.php')
if (request) {
  request.onload = function() {
    // 对request.responseText进行处理
  }
  request.send()
}
```

### 7.6 其他跨域技术

#### 7.6.1 图像 Ping

使用`<img>`标签，一个网页可以从任何网页中加载图像，动态创建图像经常用于图像 Ping，图像 Ping 是与服务器进行**简单、单向**的跨域通信的一种方式，请求的数据通过查询字符串形式发送，浏览器得不到任何具体的数据，但通过侦听`onload`和`onerror`事件，能知道响应是什么时候接收到的，常用来跟踪用户点击页面或动态广告曝光次数。

```javascript
var img = new Image()

img.onload = img.onerror = function() {
  alert('done!')
}
img.src = 'example.php?name="jax"'
```

#### 7.6.2 JSONP

> JSONP 是 JSON with padding 的简写，是包含在函数中的 JSON。由回调函数和数据两部分组成，回调函数的名字一般在请求中指定，数据就是传入回调函数中的 JSON 数据，如：

```javascript
function handleResponse(response) {
  alert('result: ' + response.data)
}
var script = document.createElement('script')
script.src = 'http://test.com/json/?callback=handleResponse'
document.body.insertBefore(script, document.body.firstChild)
```

与图像 ping 相比的优势是能访问到服务端响应，缺点是其他域可能不安全，没有失败的回调函数。

## 8. Comet 服务端推送

> 实现方式：长轮询和流，长轮询是短轮询的翻版，等待发送响应。流在页面的整个生命周期内只使用一个 HTTP 连接，客户端实现流的方式如下：

```javascript
function createStreamingClient(url, progress, finished) {
  var xhr = new XMLHttpRequest()
  var received = 0

  xhr.open('get', url, true)
  xhr.onreadystatechange = function() {
    var result

    if (xhr.readyState == 3) {
      result = xhr.responseText.subString(received)
      received += result.length
      progress(result)
    } else if (xhr.readyState == 4) {
      finished(xhr.responseText)
    }
  }
  xhr.send(null)
  return xhr
}

var client = createStreamingClient(
  'example.php',
  function(data) {
    alert('Received: ' + data)
  },
  function(fsys) {
    alert('done!')
  }
)
```

## 9. 服务器发送事件
> SSE（Server-Sent Events）服务器发送事件。
API有：
- open：建立连接时触发
- message：从服务器接收到新事件触发
- error：无法建立连接时触发
- close：关闭连接
```javascript
var source = new EventSource('myevents.php')

source.onmessage = function(event) {
  var data = event.data
}
```

## 10. Web Sockets
> 在持久连接上提供全双工、双向通信，建立一个http连接后，从`HTTP`协议升级成`Web Socket`协议，自定义的`ws://`协议传输数据小，适合移动端通信。
```javascript
var socket = new WebSocket('ws://www.example.com/server.php')

// 发送数据
socket.send('hello')

// 获取服务端消息
socket.onmessage = function(event) {
  var data = event.data
}

// 关闭
socket.close()
```
