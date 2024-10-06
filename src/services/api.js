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

export { userApiClient, companyApiClient };
