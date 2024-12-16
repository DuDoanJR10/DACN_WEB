import axiosAdmin from 'utils/http';

export const loginAPI = (params: { email: string; password: string }) => {
  return axiosAdmin.post('/api/user/login', params);
};

export const registerAPI = (params: { email: string; password: string; name: string }) => {
  return axiosAdmin.post('/api/user/register', params);
};

export const verifyAPI = (params: { email: string; code: string }) => {
  return axiosAdmin.post('api/user/verify-email', params);
};
