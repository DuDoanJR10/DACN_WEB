import axiosAdmin from 'utils/http';

export const getReportProduct = () => {
  return axiosAdmin.get('api/admin/report/product');
};
