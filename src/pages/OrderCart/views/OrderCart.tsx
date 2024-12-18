import { Button, Flex, Form, Input } from 'antd';
import { orderByCart } from 'apis/order';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/hooks';
import { formatPrice, handleErrorAPI } from 'utils/helpers';

const OrderCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const data = location.state as { selected: any[] };

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    });
  }, [form, user?.email, user?.name, user?.phone]);

  const handleBuyCart = async (values: any) => {
    try {
      setLoading(true);
      const res: any = await orderByCart({
        name: values?.name,
        email: values?.email,
        phone: values?.phone,
        address: values?.address,
        type_payment: 'CASH',
        orderItems: data?.selected?.map((item) => ({
          productAttrId: item?.productAttrId,
          quantity: item?.quantity,
        })),
      });
      if (res?.success) {
        toast.success(res?.message);
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };
  return (
    <Flex className="OrderCart mt-4 gap-4">
      <div className="bg-white p-4 rounded-xl w-[50%]">
        <Form form={form} className="order-now__form" name="order-now-form" layout="vertical" onFinish={handleBuyCart}>
          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
            <Input />
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              className="m-auto flex  text-white items-center text-xl justify-center min-w-[140px] font-semibold"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Mua
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Flex className="bg-white p-4 rounded-xl flex-grow gap-4">
        <Flex className="flex-col gap-4">
          {data?.selected?.map((product) => (
            <Flex key={product?.key} className="gap-4">
              <Flex className="w-[200px] h-[200px] rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`${process.env.API_URL}uploads/${product?.thumbnail}`}
                  alt=""
                />
              </Flex>
              <Flex className="flex-col gap-2">
                <h2 className="text-primary">{product?.name}</h2>
                <p className="px-3 py-1 rounded-lg border border-primary border-solid text-primary font-semibold text-base self-start">
                  Size: {product.size}
                </p>
                <p className="px-3 py-1 rounded-lg border border-primary border-solid text-primary font-semibold text-base self-start">
                  x {product?.quantity}
                </p>
                <p className="text-[#ff0000] font-semibold text-3xl">{`${formatPrice(product?.quantity * product?.price)} đ`}</p>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrderCart;
