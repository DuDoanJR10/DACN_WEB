import axiosAdmin from 'utils/http';

export const orderByNow = (params: {
  productAttrId: string;
  quantity: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  type_payment: string;
}) => {
  return axiosAdmin.post('api/order/buy-now', params);
};

export const orderByCart = (params: {
  name: string;
  phone: string;
  email: string;
  address: string;
  type_payment: string;
  orderItems: Array<{
    productAttrId: string;
    quantity: number;
  }>;
}) => {
  return axiosAdmin.post('api/order/buy-to-cart', params);
};
