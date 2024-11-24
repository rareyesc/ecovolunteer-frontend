import axios from 'axios';

const COMPANY_API_URL = process.env.VUE_APP_COMPANY_API_URL || 'http://localhost:8081/api';

export function registerCompany(companyData) {
  return axios.post(`${COMPANY_API_URL}/companies/register`, companyData);
}