import React from 'react';
import configs from 'configs';

const Category = React.lazy(() => import('pages/Category/views/Category'));
const Account = React.lazy(() => import('pages/Account/views/Account'));
const ProductAdmin = React.lazy(() => import('pages/ProductAdmin/views/ProductAdmin'));
const OrderAdmin = React.lazy(() => import('pages/OrderAdmin/views/OrderAdmin'));
const Report = React.lazy(() => import('pages/Report/views/Report'));
const NotFound = React.lazy(() => import('pages/NotFound/NotFound'));

const routes = [
  {
    path: configs.routesAdmin.notFound,
    element: NotFound,
    name: 'Not Found',
  },
  {
    path: configs.routesAdmin.report,
    element: Report,
    name: 'Báo cáo',
  },
  {
    path: configs.routesAdmin.productAdmin,
    element: ProductAdmin,
    name: 'Sản phẩm',
  },
  {
    path: configs.routesAdmin.category,
    element: Category,
    name: 'Danh mục',
  },
  {
    path: configs.routesAdmin.account,
    element: Account,
    name: 'Tài khoản',
  },
  {
    path: configs.routesAdmin.orderAdmin,
    element: OrderAdmin,
    name: 'Đơn hàng',
  },
];

export default routes;
