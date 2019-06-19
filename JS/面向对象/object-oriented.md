## 面向对象

### Object.defineProperty
```javascript
/**
 * 数据属性
 * [[Configurable]], 能否修改属性，更改属性, true(默认值)
 * [[Writable]], 能否修改属性, true(默认值)
 * [[Enumerable]], 能否通过fo-in循环返回属性, true(默认值)
 * [[Value]], undefined(默认值)
 */
var person = {};
Object.defineProperty(person, "name", {
  configurable: true, // 默认值: false
  writable: true, // 默认值: false
  enumerable: true, // 默认值: false
  value: 'jax'
});
console.log(person);

/**
 * 访问器属性
 * [[Configurable]], 能否修改属性，更改属性, true(默认值)
 * [[Enumerable]], 能否通过fo-in循环返回属性, true(默认值)
 * [[Get]], 读取属性时调用的函数
 * [[Set]], 写入属性时调用的函数
 */
var book = {
  _year: 2018, // _代表只能通过访问器访问该属性
  count: 1
};
Object.defineProperty(book, "year", {
  get: function() {
    return this._year;
  },
  set: function(newValue) {
    this._year = newValue;
    this.count++;
  }
});
book.year = 2019;
console.log(book);
```

### Object.defineProperties
```javascript
/**
 * ES5定义多个属性
 * Object.defineProperties(obj, {})
 */
var book = {};
Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2018
  },

  count: {
    writable: true,
    value: 1
  },

  year: {
    get: function() {
      return this._year;
    },

    set: function(newVal) {
      this._year = newVal;
    }
  }
});
book.year = 2019
console.log(book);
```

### 组合式继承
```javascript
/**
 * 组合式继承
 * 优点：
 * 1. 构造函数可以传参；
 * 2. 不会与父类共享引用属性；
 * 3. 可以复用父类的方法；
 * 缺点：
 * 1. 继承父类时调用了父类的构造函数，导致子类的原型上多了不需要的父类属性，浪费性能
 */
function Parent(name) {
  this.name = name;
  this.book = {
    name: 'javascript'
  }; // book对象
}

Parent.prototype.sayName = function () {
  console.log(this.name);
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = new Parent(); // 子类的原型指向父类的实例
let parent = new Parent(); // 定义父类实例
let child = new Child('jax', 24); // 定义子类实例
child.sayName();
parent.book.name = 'node'; // 改变父类book对象的属性，子类的book不受影响
console.log(parent);
console.log(child);
```

### 寄生组合继承
```javascript
function Parent(name) {
  this.name = name;
  this.book = {
    name: 'javascript'
  };
}

Parent.prototype.sayName = function () {
  console.log(this.name);
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: Child
  }
});

let parent = new Parent();
let child = new Child('jax', 24);
child.sayName();
parent.book.name = 'node';
console.log(parent);
console.log(child);
```
