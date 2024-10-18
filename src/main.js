import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importar CSS globalmente
import '@/assets/css/core/libs.min.css';
import '@/assets/css/hope-ui.min.css';
import '@/assets/css/custom.min.css';
import '@/assets/css/dark.min.css';
import '@/assets/css/customizer.min.css';
import '@/assets/css/rtl.min.css';
import '@/assets/vendor/flatpickr/dist/flatpickr.min.css';

createApp(App)
  .use(router)
  .mount('#app');
