## JS基础内容
### 一、面向对象
####1. 判断属性是否存在对象的方法
* in操作符
```javascript
  function Person() {

  }
  Person.prototype.name = 'jax'
  var person = new Person()
  alert('name' in person) // true
  person.name = 'ly'
  alert('name' in person) // true
```
* obj.hasOwnProperty('prop')
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

####2. 获取对象属性
* 获取所有可枚举的属性
```javascript
  Object.keys(obj);
```
* 获取无论是否可枚举的属性
```javascript
  Object.getOwnPropertyNames(obj);
```

####3. 更简单的原型写法，需要重新指定`constructor`
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
