import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import IndexC from '@/views/indexCompany.vue';
import IndexAdmin from '@/views/indexAdmin.vue';
import IndexUser from '@/views/indexUser.vue';
import gestionarEventos from '@/views/gestionarEventos.vue';
import misEventosCompany from '@/views/misEventosCompany.vue';

// Función para decodificar el token JWT y obtener los datos
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = JSON.parse(atob(base64));
  return jsonPayload;
}

// Función para verificar si el token ha expirado
function isTokenExpired(token) {
  const payload = parseJwt(token);
  const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  return payload.exp < currentTime;
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
  Company: ['indexCompany', 'misEventosCompany', 'gestionarEventos'],
  Volunteer: ['indexUser'],
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
  // Ruta para el logout
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      // Lógica de logout: eliminar el token y redirigir
      localStorage.removeItem('jwt_token');
      sessionStorage.removeItem('jwt_token');

      // Usar history.pushState para prevenir el retroceso
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', () => {
        window.history.pushState(null, '', window.location.href);
      });

      next({ name: 'Login' }); // Redirigir a la página de Login
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
  const isExpired = token ? isTokenExpired(token) : true;

  if (!isAuthenticated || isExpired) {
    // Si no está autenticado o el token ha expirado, redirigir al Login
    if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Home') {
      showModal('Acceso denegado o sesión expirada. Por favor, inicia sesión de nuevo.');
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    // Si está autenticado y el token es válido
    if (to.name === 'Login' || to.name === 'Register') {
      // Si intenta ir a Login o Register, redirigir al índice correspondiente
      if (userRole === 'Admin') {
        next({ name: 'indexAdmin' });
      } else if (userRole === 'Company') {
        next({ name: 'indexCompany' });
      } else if (userRole === 'Volunteer') {
        next({ name: 'indexUser' });
      } else {
        next({ name: 'Home' });
      }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
      // Verificar permisos de rol
      if (!rolePermissions[userRole] || !rolePermissions[userRole].includes(to.name)) {
        showModal('Acceso denegado. No tienes permiso para esta página.');
        next(false); // Evitar la navegación
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

// Comprobar la expiración del token cada minuto
setInterval(() => {
  const token = localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  if (token && isTokenExpired(token)) {
    showModal('Tu sesión ha expirado. Por favor, refresca el token.');
  }
}, 60000); // 60000 ms = 1 minuto

// Función para mostrar el modal
function showModal(message) {
  const modal = document.getElementById('modal'); // Ajusta esto a tu modal específico
  if (modal) {
    modal.style.display = 'block';
    document.getElementById('modalMessage').innerText = message;
  }
}

export default router;
