const { resolveComponent, mergeConfig } = require('../build/page-utils')

/**
 * 页面配置
 */
module.exports = mergeConfig([
  {
    path: 'pages/page1.vue',
    config: {
      navigationBarTitleText: '',
    }
  },
  {
    path: 'pages/page2.vue',
    config: {
      navigationBarTitleText: '我的作业'
    }
  },
  {
    path: 'pages/page3.vue',
    config: {
      navigationBarTitleText: '我的作业',
      usingComponents: resolveComponent([
        'i-steps',
        'i-step'
      ])
    }
  }
],
  // 全局组件
  resolveComponent([
    'i-row',
    'i-col',
    'i-button',
    'i-input',
    'i-panel',
    'i-card',
    "i-cell-group",
    "i-cell",
    "i-toast",
    "i-icon",
    "i-toast"
  ])
)
