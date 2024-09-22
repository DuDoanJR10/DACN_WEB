import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import routes from 'routes/routes';
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));
const PermissionContent = React.lazy(() => import('middleware/PermissionContent'));

const { Content } = Layout;

const DefaultLayout = () => {
  return (
    <Layout className="DefaultLayout min-h-screen">
      <Suspense fallback={<Spin />}>
        <Header />
      </Suspense>
      <Content>
        <PermissionContent routes={routes} />
      </Content>
      <Suspense fallback={<Spin />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default DefaultLayout;
