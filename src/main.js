import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importar CSS globalmente
import '@/assets/css/estilos.css';
import '@fortawesome/fontawesome-free/css/all.css';


createApp(App)
  .use(router)
  .mount('#app');
