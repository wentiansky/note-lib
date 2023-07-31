# vue 项目-权限管理组件开发总结

## 1. 给 vue 实例挂载 store 不生效问题

解决方法：手动给 vue 的原型添加 store

```javascript
Vue.prototype.$store = store
```

## 2. 在`setTimeout`中多次修改数组，视图不更新问题

原因：vue 更新视图是异步更新，多次更新将会合并，从而导致是图不更新。
解决是方法：可以先将数组置空，然后在`$nextTick` 的回调中给数组赋值。

```javascript
this.columns = []
this.$nextTick(() => {
  this.columnsX = this.orginColumns.filter(
    (col) => col.type == 'selection' || data.includes(col.key)
  )
})
```

## 3. 其他问题
- 组件加载后再初始化组件，使用script的onload方法；
- el-tab与低版本vue不兼容，导致页面卡死，升级vue版本；
- cdn上面的静态资源有缓存，需动态拼接url，加上时间戳；
