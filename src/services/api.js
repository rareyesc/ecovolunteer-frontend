import axios from 'axios';

// Cliente para usuarios (voluntarios)
const userApiClient = axios.create({
  baseURL: process.env.VUE_APP_USER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cliente para compañías
const companyApiClient = axios.create({
  baseURL: process.env.VUE_APP_COMPANY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cliente para eventos
const eventApiClient = axios.create({
  baseURL: 'http://localhost:8093/events', // Asegúrate de que esta URL sea correcta
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token
function getToken() {
  return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
}

// Función para refrescar el token
async function refreshToken() {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.post(process.env.VUE_APP_REFRESH_TOKEN_API_URL, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem('jwt_token', response.data.token);
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    window.location.href = '/logout';
  }
}

// Agregar interceptor al userApiClient
userApiClient.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Agregar interceptor al eventApiClient
eventApiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { userApiClient, companyApiClient, eventApiClient, getToken, refreshToken };
