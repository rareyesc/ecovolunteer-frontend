import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Register.vue';
// Importa otros componentes si los necesitas

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  // Otras rutas...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
