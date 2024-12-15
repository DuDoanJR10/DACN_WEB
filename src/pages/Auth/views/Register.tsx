import React from 'react';
import '../styles/Login.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';
import { Link } from 'react-router-dom';

const Register = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Flex className="Register bg-[#f7e9fc] w-screen h-screen justify-center items-center relative">
      <div className="w-full max-w-[500px]">
        <h2 className="text-primary mb-4 text-center">Đăng ký</h2>
        <Form name="register" className="gap-3 flex flex-col" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Vui lòng xác nhập lại mật khẩu!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Xác nhận lại mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" className="mb-3" htmlType="submit">
              Đăng ký
            </Button>
            hoặc <Link to="/login">Đăng nhập!</Link>
          </Form.Item>
        </Form>
      </div>
    </Flex>
  );
};

export default Register;
