import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 定义一个全局可以使用的$bus总线 --- 需要通过原型为vue添加一个总线属性
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
