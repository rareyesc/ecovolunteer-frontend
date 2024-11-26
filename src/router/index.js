import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import IndexC from '@/views/indexCompany.vue';
import IndexAdmin from '@/views/indexAdmin.vue';
import IndexUser from '@/views/indexUser.vue';
import gestionarEventos from '@/views/gestionarEventos.vue';
import misEventosCompany from '@/views/misEventosCompany.vue';
import misEventosUser from '@/views/misEventosUser.vue';
import profileCompany from '@/views/profileCompany.vue';
import profileUser from '@/views/profileUser.vue';

// Función para decodificar el token JWT y obtener los datos
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

// Función para obtener el rol del token
function getRoleFromToken() {
  const token = localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  if (!token) return null;
  const payload = parseJwt(token);
  return payload.role || null;
}

// Definir permisos para cada rol
const rolePermissions = {
  Admin: ['indexAdmin'],
  Company: ['indexCompany', 'misEventosCompany', 'gestionarEventos', 'profileCompany'],
  Volunteer: ['indexUser', 'profileUser'],
};

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/indexCompany',
    name: 'indexCompany',
    component: IndexC,
    meta: { requiresAuth: true, role: 'Company' },
  },
  {
    path: '/indexAdmin',
    name: 'indexAdmin',
    component: IndexAdmin,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/indexUser',
    name: 'indexUser',
    component: IndexUser,
    meta: { requiresAuth: true, role: 'Volunteer' },
  },
  {
    path: '/gestionarEventos',
    name: 'gestionarEventos',
    component: gestionarEventos,
    meta: { requiresAuth: true, role: 'Company' },
  },
  {
    path: '/misEventosCompany',
    name: 'misEventosCompany',
    component: misEventosCompany,
    meta: { requiresAuth: true, role: 'Company' },
  },
  {
    path: '/misEventosUser',
    name: 'MisEventosUser',
    component: misEventosUser,
    meta: { requiresAuth: true, role: 'Volunteer' },
  },
  {
    path: '/profileCompany',
    name: 'profileCompany',
    component: profileCompany,
    meta: { requiresAuth: true, role: 'Company' },
  },
  {
    path: '/profileUser',
    name: 'profileUser',
    component: profileUser,
    meta: { requiresAuth: true, role: 'Volunteer' },
  },
  
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('jwt_token');
      next({ name: 'Login' });
    },

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guarda de navegación global
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  const isAuthenticated = !!token;
  const userRole = getRoleFromToken();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Si no está autenticado, redirige al login
      next({ name: 'Login', replace: true }); // Usa replace para evitar que se pueda retroceder
    } else if (userRole && rolePermissions[userRole]?.includes(to.name)) {
      // Si el rol coincide con la ruta, permite el acceso
      next();
    } else {
      // Si no tiene permisos, redirige al inicio según su rol
      const defaultRoute = rolePermissions[userRole]?.[0] || 'Home';
      next({ name: defaultRoute, replace: true }); // Usa replace para evitar retrocesos no deseados
    }
  } else {
    // Para rutas públicas
    if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
      // Evita que los usuarios autenticados vuelvan al login o registro
      const defaultRoute = rolePermissions[userRole]?.[0] || 'Home';
      next({ name: defaultRoute, replace: true });
    } else {
      next(); // Permite el acceso a rutas públicas
    }
  }
});

export default router;
