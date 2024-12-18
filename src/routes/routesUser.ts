import React from 'react';
import configs from 'configs';
const Home = React.lazy(() => import('pages/Home/views/Home'));
const ProductDetail = React.lazy(() => import('pages/ProductDetail/views/ProductDetail'));
const Explore = React.lazy(() => import('pages/Explore/views/Explore'));
const Cart = React.lazy(() => import('pages/Cart/views/Cart'));
const OrderNow = React.lazy(() => import('pages/OrderNow/views/OrderNow'));
const OrderCart = React.lazy(() => import('pages/OrderCart/views/OrderCart'));
const UserInfo = React.lazy(() => import('pages/UserInfo/views/UserInfo'));
const History = React.lazy(() => import('pages/History/views/History'));
const ProductByCategory = React.lazy(() => import('pages/ProductByCategory/views/ProductByCategory'));

const routes = [
  {
    path: configs.routesUser.home,
    element: Home,
    name: 'Trang chủ',
  },
  {
    path: configs.routesUser.productDetail,
    element: ProductDetail,
    name: 'Chi tiết sản phẩm',
  },
  {
    path: configs.routesUser.productByCategory,
    element: ProductByCategory,
    name: 'Xem sản phẩm theo danh mục',
  },
  {
    path: configs.routesUser.cart,
    element: Cart,
    name: 'Giỏ hàng',
  },
  {
    path: configs.routesUser.explore,
    element: Explore,
    name: 'Khám phá',
  },
  {
    path: configs.routesUser.orderNow,
    element: OrderNow,
    name: 'Đặt ngay',
  },
  {
    path: configs.routesUser.orderCart,
    element: OrderCart,
    name: 'Đặt qua giỏ hàng',
  },
  {
    path: configs.routesUser.userInfo,
    element: UserInfo,
    name: 'Thông tin tài khoản',
  },
  {
    path: configs.routesUser.history,
    element: History,
    name: 'Lịch sử mua hàng',
  },
];

export default routes;
