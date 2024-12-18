import axiosAdmin from 'utils/http';

export const getListCartAPI = () => {
  return axiosAdmin.get('api/cart/get-cart');
};

export const deleteItemCartAPI = (id: string) => {
  return axiosAdmin.delete(`api/cart/remove-item-cart/${id}`);
};

export const addCartAPI = (params: { productAttrId: string; quantity: number }) => {
  return axiosAdmin.post('api/cart/add-to-cart', params);
};
