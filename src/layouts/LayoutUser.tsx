import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import routes from 'routes/routesUser';
const HeaderUser = React.lazy(() => import('./components/HeaderUser'));
const Footer = React.lazy(() => import('./components/Footer'));
const PermissionContent = React.lazy(() => import('middleware/PermissionContent'));

const { Content } = Layout;

const LayoutUser = () => {
  return (
    <Layout className="LayoutUser min-h-screen">
      <Suspense fallback={<Spin />}>
        <HeaderUser />
      </Suspense>
      <Content className="container">
        <PermissionContent routes={routes} />
      </Content>
      <Suspense fallback={<Spin />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default LayoutUser;
