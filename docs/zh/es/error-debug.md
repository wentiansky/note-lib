# 错误处理与调试

## 使用 try-catch，finally 子句

如果出现`finally`语句，始终会执行

```javascript
function testFinally() {
  try {
    return 2
  } catch (error) {
    return 1
  } finally {
    return 0
  }
}
// return 0
```

## 错误类型与自定义错误类型

常见错误类型有一下 7 种：

- Error
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

```javascript
// 自定义错误类型
function CustomError(message) {
  this.name = 'CustomError'
  this.message = message
}
CustomError.prototype = new Error() 

throw new CustomError('My message')
```

## 合理的抛出错误
```javascript
function process(values) {
  if (!(values instanceof Array)) {
    throw new Error('process(): Argument must be an array.')
  }

  values.sort()
  for (var i = 0; i < values.length; i++) {
    if (values[i] > 100) { 
      return values[i]
    }
  }

  return -1
}
```

## 记录错误信息到服务器日志

```javascript
// 使用Image发送请求的好处是：
// 1. 所有浏览器都支持Image
// 2. 避免跨域限制
// 3. 出错的概率比Ajax低
function logError(sev, msg) {
  var img = new Image()
  img.src = `log.php?sev=${encodeURIComponent(sev)}&msg=${encodeURIComponent(msg)}`
}

// 记录错误日志
for (var i = 0; i < mods.length; i++) {
  try {
    mods[i].init()
  } catch(error) {
    logError('nonfatal', 'module init failed: ' + error.message)
  }
}
```

## 使用assert函数处理错误

```javascript
function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function divide(num1, num2) {
  assert(typeof num1 == 'number' && typeof num2 == 'number', 'divide(): Both arguments must be numbers.')

  return num1 / num2
}
```