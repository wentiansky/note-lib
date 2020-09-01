# v-if+watch 监听\$route+router-view 导致组件重新加载问题

## 1. 问题场景

在从订单页面(一级路由)跳转至申请单组件页面(订单页的子路由)时，浏览器控制台报新成本中心组件的更新方法错误，导致新成本中心组件无法正常加载出来。
![成本中心更新方法报错](https://github.com/wentiansky/note-lib/raw/master/docs/.vuepress/public/assets/imgs/blog/成本中心更新方法报错.png)

## 2. 问题分析

### 2.1 订单页面布局概览

```vue
<template>
  <div class="order">
    <div class="container">
      <!-- ...... -->

      <!-- 申请单入口 -->
      <div
        class="apply-enter next-right-icon"
        v-if="isShowApplyEnter"
        @click="handleApplyEnter"
      >
        <span>申请单</span>
        <span>{{ selectPersonText }}</span>
      </div>

      <cost-center-h5 />
      <distribution-add-tool />
      <router-view />
    </div>
    <div class="footer">
      <!-- ...... -->
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      // 显示申请单组件入口
      if (this.isIncluedeEntnum && this.orderPasList.length > 0) {
        this.isShowApplyEnter = true
      }
    },
  },
}
</script>
```

### 2.2 本地项目对比正式差别

![多的两个请求图片](https://github.com/wentiansky/note-lib/raw/master/docs/.vuepress/public/assets/imgs/blog/多的两个请求图片.png)

页面上多了两个请求,发送请求的位置是在`DistributionAddTool`组件的`mounted`钩子中，说明`DistributionAddTool`组件重新渲染了，正常情况是订单页面加载后，`DistributionAddTool`作为订单页面的子路由不应该重新渲染了

### 2.3 触发 DistributionAddTool 组件重新渲染原因

```vue
<script>
export default {
  watch: {
    $route(to, from) {
      // 显示申请单组件入口
      if (this.isIncluedeEntnum && this.orderPasList.length > 0) {
        this.isShowApplyEnter = true
      }
    },
  },
}
</script>
```

## 3. 本地创建 demo 复现

### 3.1 package.json

```
"vue": "^2.5.2",
"vue-router": "^3.0.1",
```

### 3.2 路由 index.js

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/page/home.vue'),
      children: [
        {
          path: 'about',
          name: 'About',
          component: () => import('@/page/about.vue'),
        },
        {
          path: 'middle',
          name: 'Middle',
          component: () => import('@/page/middle.vue'),
        },
      ],
    },
  ],
})
```

### 3.3 Home.vue

```vue
<template>
  <div class="home">
    <div>
      <div v-if="isShowEnter">入口</div>
      <test :my-name="myName" />
      <!-- <div v-if="isShowOut">出口</div> -->
      <!-- middle页面跳转到about页面，相当于模拟了出口的v-if切换 -->
      <router-view />
    </div>
    <el-button @click="handleJump" type="primary">跳转至about</el-button>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      if (this.$store.state.isSuit) {
        this.isShowEnter = true
      }
    },
  },
}
</script>
```

### 3.4 middle.vue

```vue
<template>
  <div>middle.vue</div>
</template>

<script>
export default {
  created() {
    this.$store.commit('CHANGE_IS_SUIT', true)
    this.$router.push({
      name: 'About',
    })
  },
}
</script>
```

### 3.5 about.vue

```vue
<template>
  <div>about.vue</div>
</template>
```

在`vue@2.5.2`版本下没有复现问题，于是在公司项目中新建以上 demo 页面，得以复现，发现公司项目用的`vue@2.4.2`，于是在本地替换 vue 版本

## 4. 本地安装 vue@2.4.2

### 4.1 通过 npm/yarn 安装

![vue与vue-template版本不一致报错](https://github.com/wentiansky/note-lib/raw/master/docs/.vuepress/public/assets/imgs/blog/vue与vue-template版本不一致报错.png)

如果遇到上图的问题，`vue`和`vue-template-compiler`保持版本一致即可解决

### 4.2 直接引入 vue.js

配置`webpack.base.conf.js`

```javascript
externals: {
  vue: "Vue"
},
```

在 index.html 引入`vue-2.4.2.js`

```javascript
<script src="./static/vue-2.4.2.js" />
```

本地和公司项目 vue 版本一致，复现问题

## 5. 解决问题

### 5.1 安装 vue@2.4.3

本地安装`vue@2.4.3`后，问题不再复现，猜测是`vue@2.4.3`修复了次问题，在 vue 仓库中看`2.4.3`更新日志

![vue@2.4.3更新日志](https://github.com/wentiansky/note-lib/raw/master/docs/.vuepress/public/assets/imgs/blog/vue@2.4.3更新日志.png)

先筛选几个可能的修复

- directive: should invoke unbind & inserted on inner component root element change 538ad20, closes #6513
- vdom: avoid diff de-opt when both head/tail are different 230c6ae, closes #6502
- ensure outer bindings on nested HOC are properly re-applied on inner root element change a744497

### 5.2 点击`hash`编码查看递交记录

![提交记录](https://github.com/wentiansky/note-lib/raw/master/docs/.vuepress/public/assets/imgs/blog/提交记录.png)

按照提交记录将`vue@2.4.3`还原成`vue@2.4.2`，复现问题，即找到根本原因

### 5.3 点击`#`序号查看相关`issue`

![vue-issue](https://github.com/wentiansky/note-lib/raw/master/docs/.vuepress/public/assets/imgs/blog/vue-issue.png)

找到相关问题，组件前后有`v-if`，在页面`mounted`中加入`setTimeout`，2s 后将 v-if 的控制变量置为 true，中间的组件会重新加载，与项目的问题类似，项目组件前面有一个`v-if`，后面有一个`<router-view />`，从差标判断页面跳转到申请单页面相当于`v-if`切换，同时在订单页面的`watch`中监听`$route`，将 v-if 的控制变量置为 true，与 issue 场景类似

## 6. 总结

- 项目遇到问题，首页将本地和正式做对比，找出差异，如本文章`DistributionAddTool`组件多发了两个请求；
- 抽象问题，本地新建 demo 复现，如果本地不能复现，在项目里面新建 demo 复现；
- 注意框架或组件版本是否一致；
- 查看框架`issue`和版本更新日志，找到问题根本原因；
