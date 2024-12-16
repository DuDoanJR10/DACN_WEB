import React, { useState } from 'react';
import '../styles/Login.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerAPI } from 'apis/auth';
import ModalVerifyEmail from '../components/ModalVerifyEmail';
import { handleErrorAPI } from 'utils/helpers';

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const onFinishRegister = async (values: { email: string; password: string; name: string }) => {
    try {
      setLoading(true);
      const res: any = await registerAPI({
        email: values?.email,
        password: values?.password,
        name: values?.name,
      });
      if (res?.success) {
        setEmail(values?.email);
        toast.success(res?.message);
        setOpen(true);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };

  const validatorWhiteSpace = (rule: any, value: any, callback: any) => {
    if (value && value?.trim() === '') {
      callback('Vui lòng nhập tên người dùng hợp lệ không có dấu cách ở đầu!');
    } else {
      callback();
    }
  };
  return (
    <Flex className="Register bg-[#f7e9fc] w-screen h-screen justify-center items-center relative">
      <div className="w-full max-w-[500px]">
        <h2 className="text-primary mb-4 text-center">Đăng ký</h2>
        <Form name="register" className="gap-3 flex flex-col" onFinish={onFinishRegister}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên người dùng!' },
              { min: 6, message: 'Tên người dùng ít nhất 6 ký tự!' },
              { max: 12, message: 'Tên người dùng tối đa 12 ký tự!' },
              {
                validator: validatorWhiteSpace,
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải tối thiểu 6 ký tự!' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Vui lòng xác nhận lại mật khẩu!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu mới bạn nhập không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Xác nhận lại mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} disabled={loading} block type="primary" className="mb-3" htmlType="submit">
              Đăng ký
            </Button>
            hoặc <Link to="/login">Đăng nhập!</Link>
          </Form.Item>
        </Form>
      </div>
      <Modal
        footer={null}
        maskClosable={false}
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <ModalVerifyEmail email={email} setOpen={setOpen} />
      </Modal>
    </Flex>
  );
};

export default Register;
