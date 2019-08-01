# BOM对象

## location对象
*  hash--------#后面的哈希值
* host--------服务器名称和端口号，如www.baidu.com:80
* hostname--------服务器名称，如www.baidu.com
* href--------完整的URL
* pathname--------URL中的目录或文件
* port--------端口
* protocol--------协议，如http:或https:
* search--------查询字符串，如"?name=jax"
* assign()--------window.location = url与location.href = url与location.assign("url")等价
* replace()--------不存在历史纪录，不能回到前一个页面location.replace(url)
* reload()--------location.reload()有可能从缓存加载，location.reload(true)从服务器加载

## navigator对象
* appName--------完整的浏览器名称
* onLine--------浏览器是否联网
* plugins--------浏览器中安装插件信息的数组
* userAgent--------浏览器的用户代理字符串

## screen对象
* height--------屏幕的像素高度
* width--------屏幕的像素宽度
* left--------屏幕距左边的像素距离
* top--------屏幕距上边的像素距离

## history对象
* go(-1)--------负数代表后退，正数表示前进几页，或者go('baidu.com')
* back()--------后退
* forward()--------前进
* length--------历史纪录的数量

## 检测浏览器插件
```javascript
function hasPlugin(name) {
  name = name.toLowerCase();
  for(var i = 0; i < navigator.plugins.length; i++) {
    if (navigator.plugins[i].name.toLowerCase().indexof(name) > -1) {
      return true;
    }
  }
  return false;
}

// 检测flash
hasPlugin('Flash'); 
```

## 用setTimeout模拟setInterval
```javascript
let num = 0;
let max = 10;
function countDown() {
  num++;
  if (num < max) {
    setTimeout(countDown, 300);
  } else {
    alert('done!');
  }
}
setTimeout(countDown, 300);
```