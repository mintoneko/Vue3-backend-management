import '@/assets/less/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 默认自动去找下面的index.js

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入element-plus样式和图标：参考官网

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 导入pinia持久化插件

import "@/api/mock.js"
// 导入mock

import api from '@/api/api.js'
// 导入api

const app = createApp(App)

app.config.globalProperties.$api = api
// 注册全局属性$api，方便在组件中使用->通过this.$api调用api.js中的方法

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
// 注册和绑定插件

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册所有的图标组件
