import React, { useEffect } from 'react';
import { Spin } from 'antd';
import 'assets/scss/_style.scss';
import { ToastContainer } from 'react-toastify';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setIsLogin, setIsAdmin } from 'store/slices/authSlice';
import { isLogin } from 'utils/jwt';

const Login = loadable(() => import('pages/Auth/views/Login'), {
  fallback: <Spin />,
});
const Register = loadable(() => import('pages/Auth/views/Register'), {
  fallback: <Spin />,
});
const LayoutUser = loadable(() => import('layouts/LayoutUser'), {
  fallback: <Spin />,
});
const LayoutAdmin = loadable(() => import('layouts/LayoutAdmin'), {
  fallback: <Spin />,
});

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAdmin, isLogin: loginStatus } = useAppSelector((state) => state.auth);
  const authLogged = isLogin();

  useEffect(() => {
    if (!authLogged) {
      dispatch(setIsLogin(false));
      dispatch(setIsAdmin(false));
    }
  }, [authLogged, dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={loginStatus ? isAdmin ? <LayoutAdmin /> : <LayoutUser /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};
