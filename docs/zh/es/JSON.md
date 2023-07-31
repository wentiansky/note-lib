# JSON

## 1. JSON.stringify

JSON.stringify()有两个参数，第一个数组或者函数，是过滤器，第二个表示是否在 JSON 字符串中保留缩进。`JSON.stringify(Array|Function, Number|String)`

### 1.1 第一个参数是数组

序列化的 JSON 字符串将只包含数组中的字段

```javascript
var result = {
  title: 'hello',
  name: ['jax'],
  age: 25,
  gender: '男',
}

var resultStr = JSON.stringify(result, ['title', 'name'])
// "{"title":"hello","name":["jax"]}"
```

### 1.2 第一个参数是函数

可以对匹配到的键值对（`key-value`）做处理

```javascript
var result = {
  title: 'hello',
  name: ['jax'],
  age: 25,
  gender: '男',
}

var resultStr = JSON.stringify(result, function (key, value) {
  switch (key) {
    case 'name':
      return value.join(',')
    case 'age':
      return 24
    case 'gender':
      return undefined
    default:
      return value
  }
})
// "{"title":"hello","name":"jax","age":24}"
```

### 1.3 第二个参数是数字

表示缩进的空格数，最大是 10，超过按 10 处理

```javascript
var result = {
  title: 'hello',
  name: ['jax'],
  age: 25,
  gender: '男',
}

var resultStr = JSON.stringify(result, null, 4)
// "{
//     "title": "hello",
//     "name": [
//         "jax"
//     ],
//     "age": 25,
//     "gender": "男"
// }"
```

### 1.4s 第二个参数是字符串

以指定字符串充当缩进的空格，字符串最长 10 个字符，超过按 10 处理

```javascript
var result = {
  title: 'hello',
  name: ['jax'],
  age: 25,
  gender: '男',
}

var resultStr = JSON.stringify(result, null, '--')
// "{
// --"title": "hello",
// --"name": [
// ----"jax"
// --],
// --"age": 25,
// --"gender": "男"
// }"
```

## 2. toJSON()方法

对某些对象进行自定义序列化的需求，使用`toJSON()`

```javascript
var result = {
  title: 'hello',
  name: ['jax'],
  age: 25,
  gender: '男',
  toJSON: function () {
    return this.title
  },
}

var resultStr = JSON.stringify(result)
// ""hello""
```

## 3. 序列化顺序

1. 存在`toJSON()`且能取到有效值，调用该方法，否则返回本身；
2. 提供了第二个参数（过滤器）；
3. 提供了第三个参数（格式化）；

## 4. JSON.parse()

第二个参数也可以接受一个函数

```javascript
var result = {
  title: 'hello',
  name: ['jax'],
  age: 25,
  gender: '男',
  date: new Date(2020, 4, 5),
}

var resultStr = JSON.stringify(result)
var newResult = JSON.parse(resultStr, function (key, value) {
  if (key === 'date') {
    return new Date(value)
  } else {
    return value
  }
})
```
