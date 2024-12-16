import axiosAdmin from 'utils/http';

export const getListProductAPI = () => {
  return axiosAdmin.get('api/product/get-list');
};
