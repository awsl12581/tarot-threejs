import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.ts';
import './utils/windowsEvents.ts';

createApp(App).use(router).mount('#app');
