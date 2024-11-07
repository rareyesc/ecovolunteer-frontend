import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importar CSS globalmente
import '@/assets/css/estilos.css';
//import '@/assets/css/custom.min.css';
//import '@/assets/css/dark.min.css';
//import '@/assets/css/customizer.min.css';
//import '@/assets/css/rtl.min.css';
//import '@/assets/vendor/flatpickr/dist/flatpickr.min.css';
//import '@/assets/vendor/aos/dist/aos.css';

createApp(App)
  .use(router)
  .mount('#app');
