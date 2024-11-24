/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = process.env.VUE_APP_LOGIN_API_URL;

export async function login(email, password, rememberMe) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
      rememberMe,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
