import { createApp } from 'vue'
import { initRouter } from '@/router';
import { initStore } from './store'
import '@/styles/index.scss';
import App from './App.vue';
import "virtual:uno.css";

async function bootstrapApp() {
  const app = createApp(App);
  initStore(app);
  initRouter(app);
  app.mount('#app');
}
bootstrapApp();
