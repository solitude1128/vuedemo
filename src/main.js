import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 定义一个全局可以使用的$bus总线 --- 需要通过原型为vue添加一个总线属性
Vue.prototype.$bus = new Vue()

// 很多跳转的操作 vuex中定义也可以,jumpPage方法在任何页面或组件中都可以使用
Vue.prototype.jumpPage = (path) => {
  router.push(path)
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
