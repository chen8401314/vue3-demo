import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './style/index.css'


const app = createApp(App);
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
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

