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

export const getListOrderAPI = () => {
  return axiosAdmin.get('api/order/get-order');
};

export const getListOrderAdminAPI = () => {
  return axiosAdmin.get('api/admin/order/get-all-orders');
};

export const cancelOrderUserAPI = (id: string) => {
  return axiosAdmin.post(`api/order/cancel-order/${id}`);
};

export const handleChangeStatusOrderAdminAPI = (id: string, status: string) => {
  return axiosAdmin.post(`api/admin/order/update-order-status/${id}`, {
    status: status,
  });
};
