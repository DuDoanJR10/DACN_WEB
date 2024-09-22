import React from 'react';
import { Spin } from 'antd';
import 'assets/scss/_style.scss';
import { ToastContainer } from 'react-toastify';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

const Login = loadable(() => import('pages/Auth/views/Login'), {
  fallback: <Spin />,
});
const DefaultLayout = loadable(() => import('layouts/DefaultLayout'), {
  fallback: <Spin />,
});

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};
