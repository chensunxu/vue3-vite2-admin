import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'normalize.css/normalize.css' // CSS重置
import '@/styles/index.scss' // global css

import 'virtual:svg-icons-register' // 引入注册脚本
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/permission' // permission control

import App from './App.vue'
import store from './store'
import router from './router'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
import { mockXHR } from '../mock'
if (import.meta.env.MODE === 'development') {
  mockXHR()
}

const app = createApp(App)

// 注册el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 为Vue的运行时警告指定一个自定义处理函数,开发模式下有效
app.config.warnHandler = () => null

// 导入自定义指令
import { directive } from '@/directive'
directive(app)

app.component('svg-icon', SvgIcon)
app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
