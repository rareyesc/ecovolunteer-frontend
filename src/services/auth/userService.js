import axios from 'axios';

const USER_API_URL = process.env.VUE_APP_USER_API_URL || 'http://localhost:8088/api';

export function registerUser(userData) {
  return axios.post(`${USER_API_URL}/users/register`, userData);
}