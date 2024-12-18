import React, { useState } from 'react';
import '../styles/Login.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { saveAccessToken, saveRefreshToken } from 'utils/jwt';
import { useAppDispatch } from 'store/hooks';
import { setIsAdmin, setIsLogin, setUser } from 'store/slices/authSlice';
import { loginAPI } from 'apis/auth';
import { toast } from 'react-toastify';
import { handleErrorAPI } from 'utils/helpers';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinishLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res: any = await loginAPI({
        email: values?.email?.trim(),
        password: values?.password?.trim(),
      });
      if (res?.success) {
        toast.success(res?.message);
        dispatch(setIsAdmin(res?.data?.user?.role === 'ADMIN'));
        dispatch(setIsLogin(true));
        saveAccessToken(res?.data?.tokens?.accessToken?.token);
        saveRefreshToken(res?.data?.tokens?.refreshToken?.token);
        dispatch(setUser(res?.data?.user));
        navigate('/');
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };

  return (
    <Flex className="Login bg-[#f7e9fc] w-screen h-screen justify-center items-center relative">
      <div className="w-full max-w-[500px]">
        <h2 className="text-primary mb-4 text-center">Đăng nhập</h2>
        <Form name="login" className="gap-3 flex flex-col" onFinish={onFinishLogin}>
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
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} disabled={loading} block type="primary" htmlType="submit" className="mb-3">
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
