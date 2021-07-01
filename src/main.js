import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import qs from 'qs';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/global.css'


import VueHighlightJS from 'vue-highlightjs'
// import hljs from 'highlight.js'
// 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件
// import 'highlight.js/styles/github.css'
// import 'highlight.js/styles/monokai-sublime.css'
import('highlight.js/styles/atom-one-dark.css');

axios.defaults.withCredentials = false;
axios.defaults.crossDomain = true;
axios.defaults.timeout = 30000;

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs


Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(hljs)
Vue.use(VueHighlightJS);
Vue.directive('highlight', {
  // 被绑定元素插入父节点时调用
  inserted: function(el) {
      let blocks = el.querySelectorAll('pre code');
      for (let i = 0; i < blocks.length; i++) {
        VueHighlightJS.highlightBlock(blocks[i]);
      }
  },
  // // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  // updated: function(el) {
  //   let blocks = el.querySelectorAll('pre code');
  //   for (let i = 0; i < blocks.length; i++) {
  //     VueHighlightJS.highlightBlock(blocks[i]);
  //   }
  // },
})





new Vue({
  render: h => h(App),
}).$mount('#app')
