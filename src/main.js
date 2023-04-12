import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './style/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
//暗黑模式 index.html class="dark"
//import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App);
   app.use(store).use(ElementPlus, {
       locale: zhCn,
   }).use(locale).use(router).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

