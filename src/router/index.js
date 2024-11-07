import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import IndexC from '@/views/indexCompany.vue';
import IndexAdmin from '@/views/indexAdmin.vue';
import IndexUser from '@/views/indexUser.vue';
import gestionarEventos from '@/views/gestionarEventos.vue';
import misEventosCompany from '@/views/misEventosCompany.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/indexCompany',
    name: 'indexCompany',
    component: IndexC,
    meta: { requiresAuth: true },
  },
  {
    path: '/indexAdmin',
    name: 'indexAdmin',
    component: IndexAdmin,
    meta: { requiresAuth: true },
  },
  {
    path: '/indexUser',
    name: 'indexUser',
    component: IndexUser,
    meta: { requiresAuth: true },
  },
  {
    path: '/gestionarEventos',
    name: 'gestionarEventos',
    component: gestionarEventos,
    meta: { requiresAuth: true },
  },
  {
    path: '/misEventosCompany',
    name: 'misEventosCompany',
    component: misEventosCompany,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de navegación global
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt_token') || !!sessionStorage.getItem('jwt_token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
