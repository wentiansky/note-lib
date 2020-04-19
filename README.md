# note-lib

## 1. 项目描述

Record the learning content

## 2. 发布项目

1. 新增文件
2. 配置`.vuepress`目录下的`config.js`为新增的文件添加侧边栏菜单，如：

```jsx
function genEsSidebar(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'js-basic',
        'object-oriented',
        'BOM',
        'DOM1',
        'DOM2',
        'event',
        'HTML5脚本编程',
        'JSON',
        'Ajax',
        'error-debug',
        'vedio-material', // +++
      ],
    },
  ]
}
```
3. 用`Git Bash`终端运行`yarn deploy`命令进行发布，因为`windows`终端没有`sh`命令
