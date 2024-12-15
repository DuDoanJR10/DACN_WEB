import React, { Suspense, useEffect } from 'react';
import { ConfigProvider, Layout, Spin } from 'antd';
import routes from 'routes/routesAdmin';
import { isLogin } from 'utils/jwt';
import SidebarAdmin from './components/SidebarAdmin';
import { Navigate, useNavigate } from 'react-router';
const HeaderAdmin = React.lazy(() => import('./components/HeaderAdmin'));
const PermissionContent = React.lazy(() => import('middleware/PermissionContent'));

const { Content } = Layout;

const LayoutAdmin = () => {
  const authLogged = isLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLogged) {
      navigate('/login');
    }
  }, [authLogged, navigate]);

  return authLogged ? (
    <Layout className="min-h-screen flex-row">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1dcbdf',
          },
        }}
      >
        <Suspense fallback={<Spin />}>
          <SidebarAdmin />
        </Suspense>
        <Layout className="ml-[245px]">
          <HeaderAdmin />
          <Content className="mt-[60px] p-6">
            <Suspense fallback={<Spin />}>
              <PermissionContent routes={routes} />
            </Suspense>
          </Content>
        </Layout>
      </ConfigProvider>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default LayoutAdmin;
