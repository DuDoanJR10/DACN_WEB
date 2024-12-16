import axios, { AxiosError } from 'axios';
import { getAccessToken } from './jwt';

const axiosAdmin = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache',
    Accept: 'application/json',
  },
});

axiosAdmin.interceptors.request.use(
  function (config) {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  },
);

axiosAdmin.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default axiosAdmin;
