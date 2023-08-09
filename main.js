import App from './App'
import './index.css'
// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import store from '@/store/index';
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	 store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif