import React from 'react';
import configs from 'configs';

const Home = React.lazy(() => import('pages/Home/views/Home'));

const routes = [
  {
    path: configs.routesUser.home,
    element: Home,
    name: 'Trang chủ',
  },
];

export default routes;
