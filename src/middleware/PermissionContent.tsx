import React, { Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import { RouteProps } from 'types/common';

interface PermissionContentProps {
  routes: RouteProps[];
}

const PermissionContent = ({ routes }: PermissionContentProps) => {
  const generateRoutes = useCallback((routes: RouteProps[]) => {
    return routes?.map((route, index: number) => {
      return (
        <Route
          key={index}
          path={route?.path}
          element={
            <Suspense fallback={<Spin />}>
              <route.element />
            </Suspense>
          }
        >
          {route?.children && generateRoutes(route?.children)}
        </Route>
      );
    });
  }, []);
  return <Routes>{generateRoutes(routes)}</Routes>;
};

export default PermissionContent;
