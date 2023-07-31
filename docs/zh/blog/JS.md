# JS基础1
* **原生实现-（组合继承）**
缺点：子类继承父类时调用了父类的构造函数，导致子类的原型上多了父类的属性，造成内存浪费
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