import { createApp } from 'vue'
import { initRouter } from '@/router';
import { initStore } from './store'
import '@/styles/index.scss';
import App from './App.vue';
import "virtual:uno.css";
import ECharts from 'vue-echarts'
import * as echarts from "echarts";
async function bootstrapApp() {
  const app = createApp(App);
  initStore(app);
  initRouter(app);
  app.component('e-charts',ECharts)
  app.config.globalProperties.$echarts = echarts
  app.mount('#app');
}
bootstrapApp();
