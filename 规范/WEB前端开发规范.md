# WEB前端开发规范

标签（空格分隔）： HTML CSS JavaScript

---

## 1. 命名与注释规范
### &emsp;1.1 文件命名规范
> * 文件及文件夹：全部用英文小写或数字或者连接符“ `-` ”，“ `-` ”，不能出现其他字符
> * 为了醒目，有些说明文件的文件名可以全大写，如： `README` 等
> * 文件：调用 `/libs` 目录下的文件需要包含版本号，压缩文件需要包含 `min` 关键词，如： `/libs/jquery.3.2.1.js` , `/libs/jquery.3.2.1.min.js` , `plugins.js`

### &emsp;1.2 变量或属性的命名规范
**原则： 命名要做到见名知意**
> * id命名方式: 小驼峰命名。（例如： `headerBox`）
> * class命名方式： 英文字母小写，减号连接。(例如： `header-box` ) 
> * html元素上自定义属性命名方式： data-xxx。(例如： `data-id` ) 
> * JavaScript一般变量命名方式: 小驼峰命名。(例如： `isInt` ) 
> * JavaScript常量命名方式: 全大写。(例如： `PI` ) 

### &emsp;1.3 函数的命名规范
> * 命名方式 : 小驼峰方式 ( 构造函数使用大驼峰命名法 )
> * 命名规则 : 前缀为动词
&emsp; &emsp; &emsp;
|   动词   |   含义   |   返回值   |
|   :---:   |   :---:   |   :---:   |
|   can   |   判断是否可执行某个动作 ( 权限控制 )   |   函数返回一个布尔值。true：可执行；false：不可执行   |
|   has   |   判断是否含有某个值   |   	函数返回一个布尔值。true：含有此值；false：不含有此值   |
|   is   |   判断是否为某个值   |   函数返回一个布尔值。true：为某个值；false：不为某个值   |
|   get   |   	获取某个值   |   函数返回一个非布尔值。   |
|   set   |   	设置某个值   |   无返回值、返回是否设置成功或者返回链式对象。   |
例子：
``` javascript
function canWrite() {
  return false;
}
  
function getName() {
  return this.name;
}
```

### &emsp;1.4 类的成员命名规范
> * 公共属性和方法 : 同变量命名方式
> * 私有属性和方法 : 前缀为下划线 "`_`" 后面跟公共属性和方法一样的命名方式
例子：
``` javascript
function Person(name) {
  // 私有成员  
  var _name = name; // 或者this.name = name;
  
  // 公共方法  
  this.eating = function () {
    console.log(_name + "该吃饭了吧!");
  }
}

var boy = new Person('张三');
boy.eating();
```

### &emsp;1.5 注释规范
#### &emsp;&emsp;&emsp;1.5.1 单行注释规范（//）
> * 单独一行：//（双斜线）与注释文字之间保留一个空格
> * 在代码后面添加注释：//（双斜线）与代码之间保留一个空格，并且//(双斜线)与注释文字之间保留一个空格。
> * 注释代码：//（双斜线）与代码之间保留一个空格。
``` javascript
function singleLineComment() {
  // The comment in single line.
  var name = 'jax' // The comment after code.
  // return name
}
```

#### &emsp;&emsp;&emsp;1.5.2 多行注释规范（/* */）
> * 若（`/*` 和 `*/`）都在一行，推荐采用单行注释
> * 若至少三行注释时，第一行为`/*`，最后行为`*/`，其他行以 `*` 开始，并且注释文字与 `*` 保留一个空格。
``` javascript
function multiLineComment() {
  /*
   * this is multi-line comment.
  */
}
```

#### &emsp;&emsp;&emsp;1.5.3 函数注释规范
``` javascript
function multiLineComment() {
  /*
   * @ 关键字
  */
}
```
常用注释的关键字，如下表：
|   注释名   |   语法   |   含义   |   示例   |
|   :---:   |   :---:   |   :---:   |   :---:   |
|   @param   |   @param 参数名 { 参数类型 } 描述信息   |   描述参数的信息   |   @param name { String } 定义名称变量  |
|   @return   |   @return { 返回类型 } 描述信息   |   描述返回值的信息   |   @return { Boolean } true:可执行;false:不可执行  |
|   @author   |   @author 作者信息 [附属信息：如邮箱、日期]   |   描述此函数作者的信息   |   @author jax 2018/05/31   |
|   @version   |   @version xx.xx.xx   |   描述此函数的版本号   |   @version 1.0.0   |
|   @example   |   @example 示例代码  |   举例子   |   如下代码   |
例子：
``` javascript
/*
 * @param name { String } 姓名
 * @return { Boolean } 返回true
 * @author jax 591459256@qq.com 2018/05/31
 * @example
*/
function multiLineComment() {

}
```
---
## 2. HTML规范
### &emsp;2.1 HTML书写规范
> * 标签、属性均为小写字母;
> * 在属性上，使用双引号，不要使用单引号;
> * 单标签（自动闭合标签）不用添加斜线去关闭，如： `<br>`;
> * 尽量用class来渲染样式，避免用id来写样式;
> * 尽可能减少div嵌套;
> * 书写链接地址时,必须避免重定向，例如：href=”http://www.baidu.com/”, 即须在URL地址后面加上“/”;
> * 尽量避免在标签的style中写过多的样式，应该通过class或者id去定义样式;
> * `<img>`标签的alt属性不能为空，当浏览器为能正常加载图片时,会给用户提示信息;


### &emsp;2.2 注释规范
``` html
<!--
@name: Carousel
@description: this is a carousel
@author: jax 2018/05/31
-->
<div class="slider">
  <ul>
    <li>img1</li>
    <li>img2</li>
    <li>img3</li>
  </ul>
</div>
```
### &emsp;2.3 DOCTYPE规范
在每个 HTML 页面开头使用这个简单地 `DOCTYPE` 来启用标准模式，使其每个浏览器中尽可能一致的展现。
``` html
<!DOCTYPE html>
```

### &emsp;2.4  Meta 的使用：（需要根据具体需求按需选择）可参看：[cool-head](https://github.com/hzlzh/cool-head "cool-head")
``` html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Cache-Control" content="max-age=7200" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="your keywords">
<meta name="description" content="your description">
<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="http://feeds.geekpark.net/" />
<link rel="shortcut icon" href="favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<script type="text/javascript" src="/js/xxx.js"></script>
<link rel="stylesheet" href="/css/xxx.css">

<script type="text/javascript">
  //Google 统计代码 的位置在离</head>最近的位置
</script>
```
移动端推荐头部配置
``` html
<meta charset="UTF-8">
<title>title</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=640,user-scalable=no" />
<!--<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">-->
<meta http-equiv="cleartype" content="on">
<meta name="apple-mobile-web-app-title" content="...">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="x-rim-auto-match" content="none">
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
```

### &emsp;2.5 脚本加载
> * 兼容老旧浏览器(IE9及以下)时：脚本引用写在 `body` 结束标签之前。
> * 只需要兼容ie10+或者只是在移动端访问，那么可以使用HTML5的新属性 `async` ，将脚本文件放在 `<head>` 内
建议使用：
``` html
<html>
  <head>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <!-- body goes here -->

    <script src="index.js" async></script>
  </body>
</html>
```

### &emsp;2.6 标签语义化
Web语义化是指使用语义恰当的标签，使页面有良好的结构，页面元素有含义，能够让人和搜索引擎都容易理解。
HTML5常用标签
|   标签   |   含义   |
|   :---:   |   :---:   |
|   header   |   网页的头部   |
|   nav   |   导航栏，外部链接的集合   |
|   section   |   章节或段落   |
|   article   |   类似文章、摘要或留言POST等形式的记录（一般搭配内嵌头部、尾部、底部结构使用）   |
|   aside   |   侧边栏   |
|   address   |   联系信息，一般用在article或body锚元素周围   |
|   footer   |   网页的尾部   |

### &emsp;2.7 结构、表现、行为三者分离
> * 尽量在文档和模板中只包含结构性的HTML；而将所有表现代码，移入样式表中；将所有动作行为，移入脚本之中。

---
## 3. CSS规范
### &emsp;3.1 CSS书写规范
> * 书写代码前, 考虑并提高样式重复使用率;
> * 背景图片尽可能使用sprite技术,减小http请求, 考虑到多人协作开发, sprite按模块制作;
> * 一般情况下ID不应该被用于样式，并且ID的权重很高，所以不推荐使用ID解决样式的问题，而是使用class;
> * 尽可能使用子选择器 `>`,避免影响到其他元素;
> * 尽量使用缩写属性,
如：font: 16px/26px georgia, serif;
&emsp;&emsp;padding: 0 1rem 2rem;
> * 每条语句后面以分号结束，并且换行;
> * 属性名的冒号后面留一个空格;
> * 属性选择器或者属性值使用双括号 `" "` 括起来;
> * 按照一定的顺序写属性：
例如: 
``` css
.box {
  display: block;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: 1em;
  padding-left: 1em;
  background-color: #fff;
  border: 1px solid #000;
  font: 16px/26px sans-serif;
}
```
---
## 4. JavaScript规范
### &emsp;4.1 避免全局命名空间被污染
> 通常使用立即自执行函数表达式IIFE；如下所示：
``` javascript
(function($, w, d) {
  'use strict';
  $(function() {
    w.alert(d.querySelectorAll('div').length);
  });
})(jQuery, window, document);
```
### &emsp;4.2 严格模式
> ECMAScript5严格模式可以在整个脚本或者方法内被激活，对不同的javascript语境做更加严格的错误检查，确保了javascript的健壮性，最好在独立的IIFE使用严格模式，避免在脚本第一行启动严格模式，有可能引发一些第三方类库的问题。

### &emsp;4.3 变量声明
> 声明变量时不要省略var, 否则变量将被隐式地声明为全局变量，定义多个变量时，用一个var就行，例如：
``` javascript
(function() {
  'use strict';
  var a = 1,
      b = 2,
      c = 3;
})()
```

### &emsp;4.4 声明提升
> javascript会自动将函数作用域内的变量和方法的定义提前（只提前声明，赋值还在原处）。
``` javascript
(function() {
  'use strict';
  
  console.log(a);
  var a = 1;
  fn();
  function fn() {
    console.log('aaa');
  }
})()
```

### &emsp;4.5 使用严格判断，'`===`' 代替 '`==`'
> 避免javascript自动的隐式转换类型带来风险。
'`==`' 两边值类型不同的时候，要先进行类型转换，再比较。
'`===`' 不做类型转换，类型不同的一定不等。

### &emsp;4.6 不使用eval()函数
> eval()函数的作用是返回任意字符串，当作js代码来处理, 存在安全隐患。

### &emsp;4.7 this关键字
> * 只在对象构造器、方法和在设定的闭包中使用 this 关键字。this 的语义在此有些误导。它时而指向全局对象（大多数时），时而指向调用者的定义域（在 eval 中），时而指向 DOM 树中的某一节点（当用事件处理绑定到 HTML 属性上时），时而指向一个新创建的对象（在构造器中），还时而指向其它的一些对象（如果函数被 call() 和 apply() 执行和调用时）。
> * 使用场景： 构造函数或者对象方法中。

### &emsp;4.8 使用三元运算符替代简单的if-else语句
``` javascript
a === 100 ? 'good' : 'bad';
```