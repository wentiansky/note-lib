# JS基础内容

## 基础数据类型
::: warning
原始数据类型存储的是值，对象存储的是地址
:::

## 实现浅拷贝（对象嵌套对象拷贝的地址）

```javascript
  let a = {
    name: 'ly'
  },
  b = Object.assign({}, a); // 第一种方法
  c = { ...a } // 第二种方法
```

## 实现深拷贝

* 方法一

```javascript
  /* 
    * 1. 会忽略undefined
    * 2. 会忽略函数（function）
    * 3. 会忽略Symbol类型
    * 4. 对象嵌套对象时，普通类型和对象类型互相引用时报错
    */
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
```

* 方法二: 通用的写法

```javascript
function clone(obj) {
  if (!obj || typeof obj !== 'Object')
    return;
  var newObj = obj.constructor === Object ? {} : [];
  for (var key in obj) {
    newObj[key] = (obj[key] && typeof obj[key] === 'object') ? clone(obj[key]) : obj[key];  
  }
  return newObj;
}
```

## call与apply的区别

* call与apply都是改变传入函数的this指向，只是参数上不同;
* call第一个参数是this, 第二个参数是依次传入的参数;
* apply第一个参数是this, 第二个参数是集合对象(数组或类数组);

## 闭包的使用

延长变量周期, 创建局部变量, 防止局部变量被访问修改, 可能造成内存泄漏

```javascript
let add=(function() {
    let now=0;
    return {
        doAdd:function() {
            now++;
            console.log(now);
        }
    }
})()
```

## 判断属性是否存在对象的方法

* in操作符；

```javascript
  function Person() {

  }
  Person.prototype.name = 'jax'
  var person = new Person()
  alert('name' in person) // true
  person.name = 'ly'
  alert('name' in person) // true
```

* obj.hasOwnProperty('prop')；

```javascript
  function Person() {

  }
  Person.prototype.name = 'jax'
  var person = new Person()
  alert(person.hasOwnProperty('name')) // false
  person.name = 'ly'
  alert(person.hasOwnProperty('name')) // true
```

* 判断属性是原型中的属性

```javascript
  function hasPrototypeProperty(object, prop) {
    return !object.hasOwnProperty(prop) && (prop in object);
  }
```

## 获取对象属性

* 获取所有可枚举的属性
```javascript
  Object.keys(obj);
```
* 获取无论是否可枚举的属性
```javascript
  Object.getOwnPropertyNames(obj);
```

## 更简单的原型写法，需要重新指定`constructor`

```javascript
function Person() {

}

Person.prototype = {
  constructor: Person, // 自定义的constructor是可枚举的
  name: 'jax',
  age: 24,
  sayName: function () {
    alert(this.name)
  }
}

// 采用ES5的Object.defineProperty()将constructor设置为不可枚举
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
})
```

## 防抖和节流

* 防抖：触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件重复触发，则重新计算时间。

```javascript
function debounce(fn) {
  let timer = null;
  return function() {
    // 在事件中的匿名函数中，this指向绑定事件的元素
    // 在事件中的匿名函数中，arguments包含事件对象(event)
    clearTimeout(timer);
    timer = setTimeout(() => {
      // 此处用箭头函数，使this指向绑定事件的元素，否则指向window
      fn.apply(this, arguments);
    }, 500);
  };
}

function say() {
  console.log('防抖成功');
}

let elm = document.querySelector('#elm');
elm.addEventListener('input', debounce(say), false); // 防抖
```

* 节流：高频事件触发，在n秒内只会执行一次，节流会稀释函数的执行频率。

```javascript
function throttled(fn) {
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, 500);
  }
}

function say(e) {
  console.log('节流成功');
  console.log(e.target.innerWidth);
}

window.addEventListener('resize', throttled(say), false);
```