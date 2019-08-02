const { resolve } = require('path')

module.exports = {
  base: '/note-lib/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'note-lib',
      description: 'a learn lib'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'note-lib',
      description: '一个学习仓库'
    }
  },
  head: [
    [
      'link',
      { 
        rel: 'icon',
        href: '/favicon.ico'
       }
    ]
  ],
  serviceWorker: false,
  themeConfig: {
    // displayAllHeaders: true,
    sidebarDepth: 2,
    repo: 'wentiansky/note-lib',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        sidebar: [
          '/'
        ]
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
          }
        },
        nav: [
          {
            text: 'ES',
            link: '/zh/es/'
          },
          {
            text: '博客',
            link: '/zh/blog/'
          }
        ],
        sidebar: {
          '/zh/es/': genEsSidebar('起步'),
          '/zh/blog/': genBlogSidebar('博客'),
        }

      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@as': resolve(__dirname, './assets'),
        '@imgs': resolve(__dirname, './assets/imgs')
      }
    }
  }
}

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
        'vedio-material'
      ]
    }
  ]
}

function genBlogSidebar(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        '进化的倒计时',
        '项目总结'
      ]
    }
  ]
}
