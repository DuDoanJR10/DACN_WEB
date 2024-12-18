import axiosAdmin from 'utils/http';

export const updateUserInfoAPI = (params: { name: string; phone: string }) => {
  return axiosAdmin.put('api/user/update-me', params);
};
