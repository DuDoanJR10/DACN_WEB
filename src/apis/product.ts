import qs from 'qs';
import { ProductAttributesParams } from 'types/product';
import axiosAdmin from 'utils/http';

export const getListProductAPI = () => {
  return axiosAdmin.get('api/product/get-list');
};

export const getListProductFilterAPI = (params: { name?: string; category_id?: string }) => {
  const queryString = qs.stringify(params, { arrayFormat: 'brackets' });
  return axiosAdmin.get(`api/product/get-list?${queryString}`);
};

export const getDetailProductAPI = (id: string) => {
  return axiosAdmin.get(`api/admin/product/detail/${id}`);
};

export const getDetailProductUserAPI = (id: string) => {
  return axiosAdmin.get(`api/product/detail/${id}`);
};

export const deleteProductAPI = (id: string) => {
  return axiosAdmin.delete(`api/admin/product/delete/${id}`);
};

export const updateProductAPI = (
  params: {
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image_urls: string[];
    category_id: string;
    price_original: number;
    product_attribute: ProductAttributesParams[];
  },
  id: string,
) => {
  return axiosAdmin.put(`api/admin/product/update/${id}`, params);
};

export const createProductAPI = (params: {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  image_urls: string[];
  category_id: string;
  price_original: number;
  product_attribute: ProductAttributesParams[];
}) => {
  return axiosAdmin.post('api/admin/product/create', params);
};
