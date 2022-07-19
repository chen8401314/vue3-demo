import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import GLOBAL from '@/common/global';

import locale from 'element-plus/lib/locale/lang/zh-cn'
import './style/index.css'
const app = createApp(App)
app.use(store).use(ElementPlus, {
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
}
).use(locale).use(router).mount('#app');
app.config.globalProperties.$Global= GLOBAL

