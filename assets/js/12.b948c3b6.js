(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{203:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vue-项目-权限管理组件开发总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-项目-权限管理组件开发总结","aria-hidden":"true"}},[t._v("#")]),t._v(" vue 项目-权限管理组件开发总结")]),t._v(" "),a("h2",{attrs:{id:"_1-给-vue-实例挂载-store-不生效问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-给-vue-实例挂载-store-不生效问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 给 vue 实例挂载 store 不生效问题")]),t._v(" "),a("p",[t._v("解决方法：手动给 vue 的原型添加 store")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$store "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" store\n")])])]),a("h2",{attrs:{id:"_2-在settimeout中多次修改数组，视图不更新问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-在settimeout中多次修改数组，视图不更新问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 在"),a("code",[t._v("setTimeout")]),t._v("中多次修改数组，视图不更新问题")]),t._v(" "),a("p",[t._v("原因：vue 更新视图是异步更新，多次更新将会合并，从而导致是图不更新。\n解决是方法：可以先将数组置空，然后在"),a("code",[t._v("$nextTick")]),t._v(" 的回调中给数组赋值。")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("columns "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$nextTick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("columnsX "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("orginColumns"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("col")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" col"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'selection'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("includes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("col"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"_3-其他问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-其他问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 其他问题")]),t._v(" "),a("ul",[a("li",[t._v("组件加载后再初始化组件，使用script的onload方法；")]),t._v(" "),a("li",[t._v("el-tab与低版本vue不兼容，导致页面卡死，升级vue版本；")]),t._v(" "),a("li",[t._v("cdn上面的静态资源有缓存，需动态拼接url，加上时间戳；")])])])},[],!1,null,null,null);s.default=e.exports}}]);