# DOM1

## Node类型
* Node.ELEMENT_NODE(1);
* Node.ATTRIBUTE_NODE(2);
* Node.TEXT_NODE(3);
* Node.CDATA_SECTION_NODE(4);
* Node.ENTITY_NODE(6);
* Node.PROCESSING_INSTRUCTION_NODE(7);
* Node.COMMENT_NODE(8);
* Node.DOCUMENT_NODE(9);
* Node.DOCUMENT_TYPE_NODE(10);
* Node.DOCUMENT_FRAGMENT_NODE(11);
* Node.NOTATION.NODE(12);

```javascript
// 判断node类型
if (element.nodeType === 1) {
  console.log('node is an element');
}

name = element.nodeName; // 若是元素，name为标签名
value = element.nodeValue; // 若是元素，value为null

// 访问节点的childNodes属性
element.childNodes[0] === element.childNodes.item(0);

// 伪数组转换成数组，如childNodes
let arrayOfNodes = Array.prototype.slice.call(element.childNodes, 0);
// 注意：IE8及更早版本会报错，将NodeList实现为一个COM对象

// 兼容IE8及以前版本转成数组
function convertToArray(nodes) {
  let array = null;
  try {
    array = Array.prototype.slice.call(nodes, 0); //非IE浏览器
  } catch(e) {
    array = new Array();
    for (let i = 0; i < nodes.length; i++) {
      array.push(nodes[i]);
    }
  }
}
```

## 节点关系
* parentNode
* childNodes
* previousSibling
* nextSibling
* firstChild
* lastChild

## 操作节点
* appendChild()：将节点添加到父节点的最后一个节点
* insertBefore(newNode, childNode)：将节点插入在childNode之前
* replaceChild(newNode, oldNode)：将新节点替换旧节点
* removeChild(childNode)：移除指定的节点
* cloneNode(true)：true可选，为true执行深拷贝，为false执行浅拷贝
* normalize()：删除空文本节点，合并文本节点

## Document类型
document对象是HTMLDocument（继承自Document类型）的一个实例，表示整个HTML页面，document是window对象的一个属性。
* document.documentElement： 指向`<html>`元素；
* document.body：指向`<body>`元素；
* document.title：网页标题；
* document.URL：完整的URL；
* document.domain：取得域名；
* document.referrer；获取来源页面的URL；

注意：在根域名相同的情况下，可以设置子域名页面的domain为根域名，解决跨域问题
```javascript
// 假设页面来自news.qq.com
document.domain = 'qq.com'；// 可以与qq.com域名的页面相互通信
```

## 查找元素
* getElementById('id')：匹配id，返回第一个匹配的元素；
* getElementsByTagName('div')；匹配标签名，返回HTMLCollection集合；
* getElementsByName('name')；

```javascript
// 获取页面所有的<img>元素
let images = document.getElementsByTagName('img');
// 若有<img src="a.jpg" name="myImage">
let myImage = images.namedItem('myImage') = images['myImage'];
```

## 设置/获取特性（常用于自定义特性：如data-id等等）
* getAttribute()：可以取得html元素特性和自定义属性；
* setAttribute()：设置html元素特性和自定义属性；
* removeAttribute()：移除html元素特性和自定义属性；

## attributes
attributes属性中包含一系列节点，每个节点的nodeName就是特性的名称，而节点的nodeValue就是特性的值。
* getNamedItem(name)：返回nodeName属性等于name的节点；
* setNamedItem(node)：向列表中添加节点，以节点的nodeName属性为索引；
* removeNamedItem(name)：从列表中移除nodeName属性等于name的节点；
* item(pos)：返回位于数字pos位置处的节点
```javascript
// 获取元素id属性
var id = element.attributes.getNamedItem('id').nodeValue;
// 或者
var id = element.attributes['id'].nodeValue;
// 设置属性
element.attributes['id'].nodeValue = 'wrapper';

/* attributes常用于遍历元素特性 */
function outputAttibutes(element) {
  var pairs = [],
    attrName = '',
    attrValue = '',
    i = 0,
    len = 0;
  for (var i = 0; i < element.attributes.length; i++) {
    attrName = element.attributes[i].nodeName;
    attrValue = element.attributes[i].nodeValue;
    if (element.attributes[i].specified) {
      // 兼容<=ie7
      pairs.push(`${attrName}="${attrValue}"`)
    }
    
  }
  return pairs.join(' ');
}
```

## Selectors API
兼容性：IE8+
* querySelector()方法
* querySelectorAll()方法

## 元素遍历
兼容性：IE9+
* childElementCount：返回子元素的个数；
* firstElementChild：指向第一个子元素，firstChild的元素版；
* lastElementChild：指向最后一个子元素；
* previousElementSibling：指向前一个同辈子元素；
* nextElementSibling：指向后一个同辈子元素；

## className相关操作
* getElementsByClassName()方法，兼容性：IE9+；
* classList属性，兼容性：IE10+；
  * add(value)：若value已存在，则不添加；
  * remove(value)：删除value；
  * contain(value)：value是否存在；
  * toggle(value)：value存在，则删除；不存在，则添加；

## 焦点管理
* document.activeElement：引用DOM中当前获得了焦点的元素；
* document.hasFocus()方法：确定文档是否获得了焦点；
* focus()方法：元素触焦；

## HTMLDocument变化
* document.readyState："loading:（正在加载文档），"complete"（已经加载完文档）；
* document.compatMode："CSS1Compat"（标准模式），"BackCompat"（混杂模式）；
* document.head：跟document.body类似；

## 字符集属性
* document.charset // "UTF-16"
* document.charset = "UTF-8"

## 自定义数据属性
如data-appid="12345"
获取属性：element.dataset.appid
设置属性：element.dataset.appid = "246810"

## 插入标记
* innerHTML：插入dom树；
* outerHTML：替换自身并插入dom树；
* insertAdjacentHTML：在指定位置插入dom树；

**性能问题**
> 在使用innerHTML，outerHTML和insertAdjacentHTML方法时，最好先手动删除被替换元素的所有事件处理程序和JavaScript对象属性，否则内存占用会明显增加。

## scrollIntoView()方法
* scrollIntoView(true)：调用元素尽可能与视口顶部平齐；
* scrollIntoView(false)：调用元素尽可能全部出现在视口中；

*注意：scrollIntoView()方法的调用对象是元素容器*