# vue cli3 兼容 IE9+

## 1. package.json

安装包`babel-loader`、`@babel/core`、`@babel/preset-env`、`@vue/babel-preset-app`和`babel-polyfill`

## 2. main.js

最顶部引入 babel-polyfill

```jsx
import 'babel-polyfill'
```

## 3. vue.config.js

增加以下内容

```jsx
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 新增以下配置
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: [
            resolve('src'),
            // 根据项目运行报错，手动配置node_modules目录下需要编译的文件
            resolve('node_modules/vuex-persist/dist'),
            resolve('node_modules/pinyin/lib'),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  },
}
```

## 4. ie 下遇到的错误总结

### 4.1 vuex-persist 包 es6+语法报错

![vuex-persist语法报错](https://github.com/wentiansky/note-lib/blob/master/docs/.vuepress/public/assets/imgs/blog/vuex-persist包语法错.png)

解决方法：手动配置配置`babel-loader`编译`node_modules/vuex-persist`下面相关目录，例如：`resolve('node_modules/pinyin/lib')`

### 4.2 pinyin 包 es6+语法报错

![pinyin包语法错](https://github.com/wentiansky/note-lib/blob/master/docs/.vuepress/public/assets/imgs/blog/pinyin包语法错.png)

解决方法：手动配置配置`babel-loader`编译`node_modules/pinyin`下面相关目录，例如：`resolve('node_modules/pinyin/lib')`

### 4.3 逆向查找`?<=`正则表达式不支持

![`?<=`逆向查找不支持](https://github.com/wentiansky/note-lib/blob/master/docs/.vuepress/public/assets/imgs/blog/正则表达式错误.png)

解决方法：用其他方法替代`?<=`逆向查找正则表达式
