import { Form, Input, Button } from 'antd';
import { updateUserInfoAPI } from 'apis/user';
import React from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/hooks';
import { handleErrorAPI } from 'utils/helpers';

const UserInfo = () => {
  const [form] = Form.useForm();
  const { user } = useAppSelector((state) => state.auth);

  const handleUpdate = async (values: any) => {
    try {
      const res: any = await updateUserInfoAPI({
        name: values?.name,
        phone: values?.phone,
      });
      if (res?.success) {
        toast.success(res.message);
        console.log('RES === ', res);
      }
    } catch (error) {
      handleErrorAPI(error);
    }
  };
  return (
    <div className="UserInfo mt-4 p-4 bg-white rounded-xl">
      <Form
        form={form}
        initialValues={{
          name: user?.name,
          phone: user?.phone,
          email: user?.email,
        }}
        className="order-now__form"
        name="order-now-form"
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="name"
          label="Tên người dùng"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
          <Input readOnly />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item className="m-0">
          <Button
            className="m-auto flex  text-white items-center text-xl justify-center font-semibold"
            type="primary"
            htmlType="submit"
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserInfo;
