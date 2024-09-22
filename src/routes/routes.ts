import React from 'react';

const Home = React.lazy(() => import('pages/Home/views/Home'));

const routes = [
  {
    path: '',
    element: Home,
    name: 'Trang chủ',
  },
];

export default routes;
