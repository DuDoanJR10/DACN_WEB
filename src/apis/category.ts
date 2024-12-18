import axiosAdmin from 'utils/http';

export const getListCategoryAPI = () => {
  return axiosAdmin.get('api/category/get-list-all');
};

export const deleteCategoryAPI = (id: string) => {
  return axiosAdmin.delete(`api/admin/category/${id}`);
};

export const updateCategoryAPI = (params: { id: string; name: string; description: string }) => {
  return axiosAdmin.put(`api/admin/category/${params?.id}`, {
    name: params?.name,
    description: params?.description,
  });
};

export const createCategoryAPI = (params: { name: string; description: string }) => {
  return axiosAdmin.post('api/admin/category/create', {
    name: params?.name,
    description: params?.description,
  });
};
