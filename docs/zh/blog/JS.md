## JS
### 一、js基础
#### 1. 基础数据类型
原始数据类型存储的是值，对象存储的是地址

#### 2. 实现浅拷贝（对象嵌套对象拷贝的地址）
```javascript
  let a = {
    name: 'ly'
  },
  b = Object.assign({}, a); // 第一种方法
  c = { ...a } // 第二种方法
```
#### 3. 实现深拷贝
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

#### 4. 实现继承
* **原生实现-（组合继承）**
缺点：子类继承父类时调用了父类的构造函数，导致子类的原型上多了父类的属性，造成内存浪费
```javascript
function Parent(val) {
  this.value = val;
}

Parent.prototype.getValue = function() {
  console.log(this.value);
}

function Child(val) {
  Parent.call(this, val);
}

Child.prototype = new Parent();

const child = new Child(2);

child.getValue(); // 2
child instanceof Parent; // true
```

* **原生实现-（寄生组合继承）**
```javascript
function Parent(val) {
  this.value = val;
}

Parent.prototype.getValue = function() {
  console.log(this.value);
}  

function Child(val) {
  Parent.call(this, val);
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    // enumerable: false,
    // writable: true,
    // configurable: true
  }
});

const child = new Child(2);

child.getValue(); // 2
child instanceof Parent; // true
```

* **ES6实现-（class）**
```javascript
class Parent {
  constructor(val) {
    this.value = val;
  }
  getValue() {
    console.log(this.value);
  }
}

class Child extends Parent {
  constructor(val) {
    super(val);
    this.value = val;
  }
}

const child = new Child(2);

child.getValue(); // 2
child instanceof Parent; // true
```

### 2. call与apply的区别
> * call与apply都是改变传入函数的this指向，只是参数上不同;
> * call第一个参数是this, 第二个参数是依次传入的参数;
> * apply第一个参数是this, 第二个参数是集合对象(数组或类数组);

### 3. 闭包的使用
* 例子：
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
* 延长变量周期, 创建局部变量, 防止局部变量被访问修改, 可能造成内存泄漏
