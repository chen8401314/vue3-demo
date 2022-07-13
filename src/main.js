import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import locale from 'element-plus/lib/locale/lang/zh-cn'
import './style/index.css'
const app = createApp(App);
app.use(store)
app.use(ElementPlus, {
    size: 'small',
    locale: {
        el: {
            ...locale.el,
            pagination: {
                pagesize: '条/页',
                total: `共 {total} 条`,
                goto: '前往第',
                pageClassifier: '页'
            },
        }
    }
})
app.use(locale)
app.use(router)
app.mount('#app')
