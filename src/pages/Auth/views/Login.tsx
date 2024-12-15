import React from 'react';
import '../styles/Login.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { saveAccessToken } from 'utils/jwt';
import { useAppDispatch } from 'store/hooks';
import { setIsAdmin, setIsLogin } from 'store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    saveAccessToken(values?.email);
    dispatch(setIsLogin(true));
    if (values?.email === 'admin@gmail.com') {
      dispatch(setIsAdmin(true));
    } else {
      dispatch(setIsAdmin(false));
    }
    navigate('/');
  };
  return (
    <Flex className="Login bg-[#f7e9fc] w-screen h-screen justify-center items-center relative">
      <div className="w-full max-w-[500px]">
        <h2 className="text-primary mb-4 text-center">Đăng nhập</h2>
        <Form name="login" className="gap-3 flex flex-col" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" className="mb-3">
              Đăng nhập
            </Button>
            hoặc <Link to="/register">Đăng ký ngay!</Link>
          </Form.Item>
        </Form>
      </div>
    </Flex>
  );
};

export default Login;
