import axiosAdmin from 'utils/http';

export const getListAccountAPI = () => {
  return axiosAdmin.get('api/admin/user/list');
};
