import React, { Suspense, useCallback, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import routes from 'routes/routesUser';
import { useAppDispatch } from 'store/hooks';
import { getListCategoryAPI } from 'apis/category';
import { setListCategory } from 'store/slices/categorySlice';
import { handleErrorAPI } from 'utils/helpers';
const HeaderUser = React.lazy(() => import('./components/HeaderUser'));
const Footer = React.lazy(() => import('./components/Footer'));
const PermissionContent = React.lazy(() => import('middleware/PermissionContent'));

const { Content } = Layout;

const LayoutUser = () => {
  const dispatch = useAppDispatch();
  const handleGetListCategory = useCallback(async () => {
    try {
      const res: any = await getListCategoryAPI();
      if (res?.success) {
        dispatch(setListCategory(res?.data?.map((category: any, index: number) => ({ ...category, key: index + 1 }))));
      }
    } catch (error: any) {
      handleErrorAPI(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetListCategory();
  }, [handleGetListCategory]);
  return (
    <Layout className="LayoutUser min-h-screen">
      <Suspense fallback={<Spin />}>
        <HeaderUser />
      </Suspense>
      <Content className="container bg-[#f5f5fa]">
        <PermissionContent routes={routes} />
      </Content>
      <Suspense fallback={<Spin />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default LayoutUser;
